"""Validate schemas, example manifests, cross-references, and scientific metrics."""

from __future__ import annotations

import csv
import hashlib
import json
import math
import re
import sys
from collections import defaultdict, deque
from datetime import datetime
from pathlib import Path
from typing import Any

from jsonschema import Draft202012Validator, FormatChecker
from referencing import Registry, Resource


ROOT = Path(__file__).resolve().parents[1]
SCHEMAS = ROOT / "schemas"
EXAMPLES = ROOT / "examples"

RESOURCE_ID = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
SEMVER = re.compile(
    r"^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)"
    r"(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?"
    r"(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$"
)
SHA256 = re.compile(r"^[a-f0-9]{64}$")
CSV_COLUMNS = [
    "run_id",
    "circuit_id",
    "circuit_version",
    "circuit_sha256",
    "topology_id",
    "topology_version",
    "topology_sha256",
    "algorithm",
    "algorithm_version",
    "parameters",
    "seed",
    "status",
    "started_at",
    "duration_ms",
    "memory_peak_mb",
    "critical_path",
    "partitioned_critical_path",
    "cut_size",
    "connectivity_minus_one",
    "partition_id",
    "partition_version",
    "partition_sha256",
    "error_message",
]


class Validation:
    def __init__(self) -> None:
        self.errors: list[str] = []

    def require(self, condition: bool, message: str) -> None:
        if not condition:
            self.errors.append(message)

    def equal(self, actual: Any, expected: Any, message: str) -> None:
        self.require(actual == expected, f"{message}: expected {expected!r}, got {actual!r}")

    def close(self, actual: float, expected: float, message: str) -> None:
        self.require(
            math.isclose(actual, expected, rel_tol=1e-9, abs_tol=1e-12),
            f"{message}: expected {expected!r}, got {actual!r}",
        )


def load_json(path: Path) -> dict[str, Any]:
    def reject_non_standard_constant(value: str) -> None:
        raise ValueError(f"non-standard numeric constant {value!r}")

    with path.open("r", encoding="utf-8") as stream:
        value = json.load(stream, parse_constant=reject_non_standard_constant)
    if not isinstance(value, dict):
        raise ValueError(f"{path.relative_to(ROOT)} must contain a JSON object")
    return value


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def load_schemas(validation: Validation) -> tuple[dict[str, dict[str, Any]], Registry]:
    schemas: dict[str, dict[str, Any]] = {}
    registry = Registry()
    for path in sorted(SCHEMAS.glob("*.schema.json")):
        try:
            schema = load_json(path)
            Draft202012Validator.check_schema(schema)
            schema_id = schema["$id"]
            schemas[schema_id] = schema
            registry = registry.with_resource(schema_id, Resource.from_contents(schema))
        except Exception as error:  # report every malformed contract in one run
            validation.errors.append(f"{path.relative_to(ROOT)}: invalid schema: {error}")
    return schemas, registry


def validate_json_examples(
    validation: Validation,
    schemas: dict[str, dict[str, Any]],
    registry: Registry,
) -> list[tuple[Path, dict[str, Any]]]:
    documents: list[tuple[Path, dict[str, Any]]] = []
    for path in sorted(EXAMPLES.rglob("*.json")):
        try:
            document = load_json(path)
        except Exception as error:
            validation.errors.append(f"{path.relative_to(ROOT)}: invalid JSON: {error}")
            continue

        documents.append((path, document))
        schema_id = document.get("$schema")
        schema = schemas.get(schema_id)
        if schema is None:
            validation.errors.append(
                f"{path.relative_to(ROOT)}: unknown or missing $schema {schema_id!r}"
            )
            continue

        validator = Draft202012Validator(
            schema,
            registry=registry,
            format_checker=FormatChecker(),
        )
        for error in sorted(validator.iter_errors(document), key=lambda item: list(item.path)):
            location = "/".join(str(part) for part in error.absolute_path) or "<root>"
            validation.errors.append(
                f"{path.relative_to(ROOT)}:{location}: {error.message}"
            )
    return documents


def unique_ids(
    validation: Validation,
    values: list[dict[str, Any]],
    key: str,
    context: str,
) -> set[str]:
    identifiers = [value[key] for value in values]
    validation.equal(len(identifiers), len(set(identifiers)), f"{context}: duplicate {key}")
    return set(identifiers)


def validate_artifacts(validation: Validation, documents: list[tuple[Path, dict[str, Any]]]) -> None:
    for document_path, document in documents:
        artifacts = list(document.get("artifacts", []))
        assignment = document.get("assignment", {})
        if assignment.get("mode") == "artifact":
            artifacts.append(assignment["artifact"])

        for artifact in artifacts:
            location = artifact["location"]
            if location["kind"] != "relative-path":
                continue
            artifact_path = ROOT / Path(location["path"])
            context = f"{document_path.relative_to(ROOT)} -> {location['path']}"
            validation.require(artifact_path.is_file(), f"{context}: artifact does not exist")
            if not artifact_path.is_file():
                continue
            validation.equal(artifact_path.stat().st_size, artifact["byte_size"], f"{context}: byte size")
            validation.equal(sha256(artifact_path), artifact["sha256"], f"{context}: SHA-256")


def validate_graph(validation: Validation, path: Path, graph: dict[str, Any]) -> None:
    context = str(path.relative_to(ROOT))
    vertices = graph["vertices"]
    hyperarcs = graph["hyperarcs"]
    vertex_ids = unique_ids(validation, vertices, "id", context)
    unique_ids(validation, hyperarcs, "id", context)
    dimensions = set(graph["resource_dimensions"])

    for vertex in vertices:
        unknown = set(vertex["weights"]) - dimensions
        validation.require(
            not unknown,
            f"{context}: vertex {vertex['id']} uses unknown resources {sorted(unknown)}",
        )

    black_ids = {vertex["id"] for vertex in vertices if vertex["color"] == "black"}
    black_indegree = {identifier: 0 for identifier in black_ids}
    black_successors: dict[str, list[str]] = defaultdict(list)

    for hyperarc in hyperarcs:
        source = hyperarc["source"]
        sinks = hyperarc["sinks"]
        validation.require(source in vertex_ids, f"{context}: unknown source {source}")
        for sink in sinks:
            validation.require(sink in vertex_ids, f"{context}: unknown sink {sink}")
            validation.require(sink != source, f"{context}: hyperarc {hyperarc['id']} is a loop")
            if source in black_ids and sink in black_ids:
                black_successors[source].append(sink)
                black_indegree[sink] += 1
        unknown_delays = set(hyperarc.get("sink_delays", {})) - set(sinks)
        validation.require(
            not unknown_delays,
            f"{context}: hyperarc {hyperarc['id']} has delays for non-sinks {sorted(unknown_delays)}",
        )

    queue = deque(identifier for identifier, degree in black_indegree.items() if degree == 0)
    visited = 0
    while queue:
        source = queue.popleft()
        visited += 1
        for sink in black_successors[source]:
            black_indegree[sink] -= 1
            if black_indegree[sink] == 0:
                queue.append(sink)
    validation.equal(visited, len(black_ids), f"{context}: black-only subgraph must be acyclic")


def validate_circuit_graph_pair(
    validation: Validation,
    circuit_path: Path,
    circuit: dict[str, Any],
    graph_path: Path,
    graph: dict[str, Any],
) -> None:
    context = str(circuit_path.relative_to(ROOT))
    validation.equal(graph["circuit"]["id"], circuit["id"], f"{context}: graph circuit id")
    validation.equal(graph["circuit"]["version"], circuit["version"], f"{context}: graph circuit version")
    validation.equal(graph["timing_unit"], circuit["timing_unit"], f"{context}: timing unit")
    validation.equal(
        graph["resource_dimensions"],
        circuit["resource_dimensions"],
        f"{context}: resource dimensions",
    )
    red = sum(vertex["color"] == "red" for vertex in graph["vertices"])
    black = sum(vertex["color"] == "black" for vertex in graph["vertices"])
    expected_counts = {
        "vertices": len(graph["vertices"]),
        "red_vertices": red,
        "black_vertices": black,
        "hyperarcs": len(graph["hyperarcs"]),
    }
    validation.equal(circuit["counts"], expected_counts, f"{context}: declared counts")

    critical_path = compute_critical_path(graph, assignment=None, topology=None)
    validation.require(
        math.isfinite(critical_path),
        f"{context}: circuit must contain at least one red-red path",
    )
    verify_metric(validation, circuit, "critical-path", critical_path, context)


def validate_topology(validation: Validation, path: Path, topology: dict[str, Any]) -> None:
    context = str(path.relative_to(ROOT))
    parts = topology["parts"]
    part_ids = unique_ids(validation, parts, "id", context)
    matrix_ids = topology["routing_costs"]["part_ids"]
    matrix = topology["routing_costs"]["matrix"]
    validation.equal(set(matrix_ids), part_ids, f"{context}: routing part ids")
    validation.equal(len(matrix), len(matrix_ids), f"{context}: matrix row count")
    for row_index, row in enumerate(matrix):
        validation.equal(len(row), len(matrix_ids), f"{context}: matrix row {row_index} length")
        if row_index < len(row):
            validation.close(row[row_index], 0, f"{context}: matrix diagonal {row_index}")
    if topology["symmetric"] and len(matrix) == len(matrix_ids):
        for row in range(len(matrix_ids)):
            if len(matrix[row]) != len(matrix_ids):
                continue
            for column in range(row + 1, len(matrix_ids)):
                validation.close(
                    matrix[row][column],
                    matrix[column][row],
                    f"{context}: symmetric costs {row},{column}",
                )

    capacity_dimensions = [set(part["capacity"]) for part in parts]
    if capacity_dimensions:
        for index, dimensions in enumerate(capacity_dimensions[1:], start=1):
            validation.equal(
                dimensions,
                capacity_dimensions[0],
                f"{context}: capacity dimensions of part {index}",
            )
    for link in topology.get("links", []):
        validation.require(link["source"] in part_ids, f"{context}: unknown link source")
        validation.require(link["target"] in part_ids, f"{context}: unknown link target")


def routing_lookup(topology: dict[str, Any]) -> dict[tuple[str, str], float]:
    part_ids = topology["routing_costs"]["part_ids"]
    matrix = topology["routing_costs"]["matrix"]
    return {
        (source, target): matrix[source_index][target_index]
        for source_index, source in enumerate(part_ids)
        for target_index, target in enumerate(part_ids)
    }


def graph_edges(graph: dict[str, Any]) -> list[tuple[str, str, float]]:
    edges: list[tuple[str, str, float]] = []
    for hyperarc in graph["hyperarcs"]:
        delays = hyperarc.get("sink_delays", {})
        for sink in hyperarc["sinks"]:
            edges.append((hyperarc["source"], sink, float(delays.get(sink, 0))))
    return edges


def compute_critical_path(
    graph: dict[str, Any],
    assignment: dict[str, str] | None,
    topology: dict[str, Any] | None,
) -> float:
    vertices = {vertex["id"]: vertex for vertex in graph["vertices"]}
    red = {identifier for identifier, vertex in vertices.items() if vertex["color"] == "red"}
    black = set(vertices) - red
    edges = graph_edges(graph)
    outgoing: dict[str, list[tuple[str, float]]] = defaultdict(list)
    indegree = {identifier: 0 for identifier in black}
    for source, sink, delay in edges:
        outgoing[source].append((sink, delay))
        if source in black and sink in black:
            indegree[sink] += 1

    routing = routing_lookup(topology) if topology is not None else {}

    def route(source: str, sink: str) -> float:
        if assignment is None:
            return 0
        return float(routing[(assignment[source], assignment[sink])])

    best = {identifier: -math.inf for identifier in black}
    maximum = -math.inf
    for source in red:
        for sink, edge_delay in outgoing[source]:
            candidate = (
                float(vertices[source]["delay"])
                + edge_delay
                + route(source, sink)
                + float(vertices[sink]["delay"])
            )
            if sink in red:
                maximum = max(maximum, candidate)
            else:
                best[sink] = max(best[sink], candidate)

    queue = deque(identifier for identifier, degree in indegree.items() if degree == 0)
    while queue:
        source = queue.popleft()
        for sink, edge_delay in outgoing[source]:
            if best[source] != -math.inf:
                candidate = (
                    best[source]
                    + edge_delay
                    + route(source, sink)
                    + float(vertices[sink]["delay"])
                )
                if sink in red:
                    maximum = max(maximum, candidate)
                else:
                    best[sink] = max(best[sink], candidate)
            if sink in black:
                indegree[sink] -= 1
                if indegree[sink] == 0:
                    queue.append(sink)
    return maximum


def compute_cut_metrics(
    graph: dict[str, Any], assignment: dict[str, str]
) -> tuple[float, float]:
    cut_size = 0.0
    connectivity = 0.0
    for hyperarc in graph["hyperarcs"]:
        parts = {assignment[hyperarc["source"]]}
        parts.update(assignment[sink] for sink in hyperarc["sinks"])
        if len(parts) > 1:
            cut_size += float(hyperarc.get("weight", 1))
        connectivity += len(parts) - 1
    return cut_size, connectivity


def metric_values(document: dict[str, Any]) -> dict[str, float]:
    return {metric["metric_id"]: float(metric["value"]) for metric in document.get("metrics", [])}


def verify_metric(
    validation: Validation,
    document: dict[str, Any],
    metric_id: str,
    expected: float,
    context: str,
) -> None:
    metrics = document.get("metrics", [])
    identifiers = [metric["metric_id"] for metric in metrics]
    validation.equal(len(identifiers), len(set(identifiers)), f"{context}: duplicate metrics")
    values = metric_values(document)
    if metric_id in values:
        validation.close(values[metric_id], expected, f"{context}: metric {metric_id}")


def validate_partition(
    validation: Validation,
    path: Path,
    partition: dict[str, Any],
    graph: dict[str, Any],
    topology: dict[str, Any],
) -> None:
    context = str(path.relative_to(ROOT))
    assignment_block = partition["assignment"]
    if assignment_block["mode"] != "inline":
        return
    items = assignment_block["items"]
    vertex_assignment = {item["vertex_id"]: item["part_id"] for item in items}
    validation.equal(len(vertex_assignment), len(items), f"{context}: duplicate vertex assignment")
    vertex_ids = {vertex["id"] for vertex in graph["vertices"]}
    validation.equal(set(vertex_assignment), vertex_ids, f"{context}: exhaustive assignment")
    part_ids = {part["id"] for part in topology["parts"]}
    validation.require(
        set(vertex_assignment.values()) <= part_ids,
        f"{context}: assignment references unknown parts",
    )
    if set(vertex_assignment) != vertex_ids or not set(vertex_assignment.values()) <= part_ids:
        return

    capacities = {part["id"]: part["capacity"] for part in topology["parts"]}
    loads: dict[str, dict[str, float]] = {
        part_id: defaultdict(float) for part_id in part_ids
    }
    dimensions = set(graph["resource_dimensions"])
    for part_id, capacity in capacities.items():
        validation.require(
            dimensions <= set(capacity),
            f"{context}: part {part_id} lacks circuit resource dimensions",
        )
    for vertex in graph["vertices"]:
        part_id = vertex_assignment[vertex["id"]]
        for dimension, weight in vertex["weights"].items():
            loads[part_id][dimension] += float(weight)

    feasible = True
    for part_id in part_ids:
        for dimension in dimensions:
            capacity = capacities[part_id].get(dimension, -math.inf)
            feasible = feasible and loads[part_id][dimension] <= capacity
    if partition["feasibility"] == "feasible":
        validation.require(feasible, f"{context}: declared feasible but capacities are exceeded")
    elif partition["feasibility"] == "infeasible":
        validation.require(not feasible, f"{context}: declared infeasible but capacities are respected")

    critical_path = compute_critical_path(graph, assignment=None, topology=None)
    partitioned_path = compute_critical_path(graph, vertex_assignment, topology)
    cut_size, connectivity = compute_cut_metrics(graph, vertex_assignment)
    verify_metric(validation, partition, "critical-path", critical_path, context)
    verify_metric(validation, partition, "partitioned-critical-path", partitioned_path, context)
    verify_metric(validation, partition, "cut-size", cut_size, context)
    verify_metric(validation, partition, "connectivity-minus-one", connectivity, context)


def find_primary_graph_artifact(circuit: dict[str, Any]) -> dict[str, Any] | None:
    for artifact in circuit["artifacts"]:
        if artifact["role"] == "red-black-hypergraph":
            return artifact
    return None


def validate_relations(
    validation: Validation,
    documents: list[tuple[Path, dict[str, Any]]],
) -> None:
    by_type: dict[str, list[tuple[Path, dict[str, Any]]]] = defaultdict(list)
    for path, document in documents:
        by_type[document["type"]].append((path, document))

    graphs_by_identity = {
        (document["circuit"]["id"], document["circuit"]["version"]): (path, document)
        for path, document in by_type["red-black-hypergraph"]
    }
    topologies = {
        (document["id"], document["version"]): (path, document)
        for path, document in by_type["topology"]
    }
    partitions = {
        (document["id"], document["version"]): (path, document)
        for path, document in by_type["partition"]
    }

    graph_hashes: dict[tuple[str, str], str] = {}
    for circuit_path, circuit in by_type["circuit"]:
        identity = (circuit["id"], circuit["version"])
        graph_entry = graphs_by_identity.get(identity)
        validation.require(graph_entry is not None, f"{circuit_path.relative_to(ROOT)}: graph not found")
        artifact = find_primary_graph_artifact(circuit)
        validation.require(artifact is not None, f"{circuit_path.relative_to(ROOT)}: primary graph artifact missing")
        if graph_entry is None or artifact is None:
            continue
        graph_path, graph = graph_entry
        graph_hashes[identity] = artifact["sha256"]
        validation.equal(sha256(graph_path), artifact["sha256"], f"{circuit_path.relative_to(ROOT)}: graph reference")
        validate_circuit_graph_pair(validation, circuit_path, circuit, graph_path, graph)

    for partition_path, partition in by_type["partition"]:
        circuit_identity = (partition["circuit"]["id"], partition["circuit"]["version"])
        topology_identity = (partition["topology"]["id"], partition["topology"]["version"])
        graph_entry = graphs_by_identity.get(circuit_identity)
        topology_entry = topologies.get(topology_identity)
        validation.require(graph_entry is not None, f"{partition_path.relative_to(ROOT)}: circuit not found")
        validation.require(topology_entry is not None, f"{partition_path.relative_to(ROOT)}: topology not found")
        if graph_entry is None or topology_entry is None:
            continue
        topology_path, topology = topology_entry
        validation.equal(
            partition["circuit"]["sha256"],
            graph_hashes.get(circuit_identity),
            f"{partition_path.relative_to(ROOT)}: circuit SHA-256 reference",
        )
        validation.equal(
            partition["topology"]["sha256"],
            sha256(topology_path),
            f"{partition_path.relative_to(ROOT)}: topology SHA-256 reference",
        )
        validate_partition(validation, partition_path, partition, graph_entry[1], topology)

    for run_path, run in by_type["benchmark-run"]:
        circuit_identity = (run["circuit"]["id"], run["circuit"]["version"])
        topology_identity = (run["topology"]["id"], run["topology"]["version"])
        validation.equal(
            run["circuit"]["sha256"],
            graph_hashes.get(circuit_identity),
            f"{run_path.relative_to(ROOT)}: circuit SHA-256 reference",
        )
        topology_entry = topologies.get(topology_identity)
        validation.require(topology_entry is not None, f"{run_path.relative_to(ROOT)}: topology not found")
        if topology_entry is not None:
            validation.equal(
                run["topology"]["sha256"],
                sha256(topology_entry[0]),
                f"{run_path.relative_to(ROOT)}: topology SHA-256 reference",
            )
        partition_ref = run.get("partition")
        if partition_ref:
            identity = (partition_ref["id"], partition_ref["version"])
            partition_entry = partitions.get(identity)
            validation.require(partition_entry is not None, f"{run_path.relative_to(ROOT)}: partition not found")
            if partition_entry is not None:
                validation.equal(
                    partition_ref["sha256"],
                    sha256(partition_entry[0]),
                    f"{run_path.relative_to(ROOT)}: partition SHA-256 reference",
                )
                for metric_id, value in metric_values(partition_entry[1]).items():
                    verify_metric(validation, run, metric_id, value, str(run_path.relative_to(ROOT)))


def parse_non_negative(
    validation: Validation, value: str, context: str, required: bool = False
) -> float | None:
    if value == "":
        validation.require(not required, f"{context}: value is required")
        return None
    try:
        parsed = float(value)
    except ValueError:
        validation.errors.append(f"{context}: expected a number, got {value!r}")
        return None
    validation.require(math.isfinite(parsed) and parsed >= 0, f"{context}: must be finite and non-negative")
    return parsed


def validate_csv(
    validation: Validation,
    documents: list[tuple[Path, dict[str, Any]]],
) -> int:
    row_count = 0
    graph_hashes = {
        (document["circuit"]["id"], document["circuit"]["version"]): sha256(path)
        for path, document in documents
        if document["type"] == "red-black-hypergraph"
    }
    topology_hashes = {
        (document["id"], document["version"]): sha256(path)
        for path, document in documents
        if document["type"] == "topology"
    }
    partition_entries = {
        (document["id"], document["version"]): (sha256(path), document)
        for path, document in documents
        if document["type"] == "partition"
    }
    successful_required = [
        "duration_ms",
        "partitioned_critical_path",
        "cut_size",
        "connectivity_minus_one",
        "partition_id",
        "partition_version",
        "partition_sha256",
    ]
    for path in sorted(EXAMPLES.rglob("*.csv")):
        with path.open("r", encoding="utf-8", newline="") as stream:
            reader = csv.DictReader(stream)
            validation.equal(reader.fieldnames, CSV_COLUMNS, f"{path.relative_to(ROOT)}: header")
            if reader.fieldnames != CSV_COLUMNS:
                continue
            for line_number, row in enumerate(reader, start=2):
                row_count += 1
                context = f"{path.relative_to(ROOT)}:{line_number}"
                validation.require(bool(RESOURCE_ID.fullmatch(row["run_id"])), f"{context}: invalid run_id")
                for field in ("circuit_id", "topology_id"):
                    validation.require(bool(RESOURCE_ID.fullmatch(row[field])), f"{context}: invalid {field}")
                for field in ("circuit_version", "topology_version"):
                    validation.require(bool(SEMVER.fullmatch(row[field])), f"{context}: invalid {field}")
                for field in ("circuit_sha256", "topology_sha256"):
                    validation.require(bool(SHA256.fullmatch(row[field])), f"{context}: invalid {field}")
                validation.equal(
                    row["circuit_sha256"],
                    graph_hashes.get((row["circuit_id"], row["circuit_version"])),
                    f"{context}: circuit reference",
                )
                validation.equal(
                    row["topology_sha256"],
                    topology_hashes.get((row["topology_id"], row["topology_version"])),
                    f"{context}: topology reference",
                )
                validation.require(bool(row["algorithm"]), f"{context}: algorithm is required")
                validation.require(bool(row["algorithm_version"]), f"{context}: algorithm_version is required")
                try:
                    parameters = json.loads(row["parameters"])
                    validation.require(isinstance(parameters, dict), f"{context}: parameters must be an object")
                except json.JSONDecodeError as error:
                    validation.errors.append(f"{context}: invalid parameters JSON: {error}")
                if row["seed"]:
                    validation.require(row["seed"].isdigit(), f"{context}: seed must be a non-negative integer")
                status = row["status"]
                validation.require(
                    status in {"succeeded", "failed", "timeout", "out-of-memory", "cancelled"},
                    f"{context}: invalid status {status!r}",
                )
                try:
                    datetime.fromisoformat(row["started_at"].replace("Z", "+00:00"))
                except ValueError:
                    validation.errors.append(f"{context}: invalid started_at")
                for field in (
                    "duration_ms",
                    "memory_peak_mb",
                    "critical_path",
                    "partitioned_critical_path",
                    "cut_size",
                    "connectivity_minus_one",
                ):
                    parse_non_negative(validation, row[field], f"{context}: {field}")
                if status == "succeeded":
                    for field in successful_required:
                        validation.require(bool(row[field]), f"{context}: {field} is required on success")
                    validation.require(not row["error_message"], f"{context}: success cannot have an error message")
                if status in {"failed", "timeout", "out-of-memory"}:
                    validation.require(bool(row["error_message"]), f"{context}: error_message is required on failure")
                if row["partition_id"]:
                    validation.require(bool(RESOURCE_ID.fullmatch(row["partition_id"])), f"{context}: invalid partition_id")
                    validation.require(bool(SEMVER.fullmatch(row["partition_version"])), f"{context}: invalid partition_version")
                    validation.require(bool(SHA256.fullmatch(row["partition_sha256"])), f"{context}: invalid partition_sha256")
                    partition_entry = partition_entries.get(
                        (row["partition_id"], row["partition_version"])
                    )
                    validation.require(partition_entry is not None, f"{context}: partition not found")
                    if partition_entry is not None:
                        validation.equal(
                            row["partition_sha256"],
                            partition_entry[0],
                            f"{context}: partition reference",
                        )
                        csv_metrics = {
                            "critical-path": row["critical_path"],
                            "partitioned-critical-path": row["partitioned_critical_path"],
                            "cut-size": row["cut_size"],
                            "connectivity-minus-one": row["connectivity_minus_one"],
                        }
                        expected_metrics = metric_values(partition_entry[1])
                        for metric_id, raw_value in csv_metrics.items():
                            if raw_value and metric_id in expected_metrics:
                                validation.close(
                                    float(raw_value),
                                    expected_metrics[metric_id],
                                    f"{context}: metric {metric_id}",
                                )
    return row_count


def main() -> int:
    validation = Validation()
    schemas, registry = load_schemas(validation)
    documents = validate_json_examples(validation, schemas, registry)
    validate_artifacts(validation, documents)
    for path, document in documents:
        if document["type"] == "red-black-hypergraph":
            validate_graph(validation, path, document)
        elif document["type"] == "topology":
            validate_topology(validation, path, document)
    validate_relations(validation, documents)
    csv_rows = validate_csv(validation, documents)

    if validation.errors:
        print(f"Validation failed with {len(validation.errors)} error(s):", file=sys.stderr)
        for error in validation.errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    print(
        f"Validated {len(schemas)} schemas, {len(documents)} JSON examples, "
        f"and {csv_rows} CSV row(s)."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
