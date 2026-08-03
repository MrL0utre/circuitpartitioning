# Data model

This document describes objects exchanged between the catalog, scientific
engine, and web application. Executable constraints live in `schemas/`.

## Shared principles

### Identity

Every scientific resource has:

- `id`: stable identifier independent of filenames;
- `version`: SemVer version of the manifest;
- `schema_version`: version of the contract used;
- one or more SHA-256 fingerprints for artifacts containing scientific data.

A complete scientific reference is the triplet `(id, version, sha256)`. The `id`
alone is convenient for URLs but insufficient for reproducing an experiment.

To prevent circular references, `sha256` identifies the primary hypergraph
artifact for a circuit and the JSON manifest for a topology or partition. A
hypergraph embeds only the `(id, version)` identity of its circuit.

Identifiers use lowercase ASCII letters, digits, and hyphens and are unique
within their resource type. Examples: `itc99-b01`, `cycle-4`,
`b01-k4-dkfm-seed-42`.

### Versioning

Manifest versions evolve as follows:

- `major`: incompatible change to published meaning or structure;
- `minor`: compatible addition of metadata or artifacts;
- `patch`: correction that does not change referenced scientific data.

A netlist-to-hypergraph transformation carries its own version in provenance.
Different transformations must not silently reuse the same circuit version.

### Artifact

An artifact is a local or remote file containing scientific data. It records:

- a role such as `red-black-hypergraph`, `partition-assignment`, or
  `source-netlist`;
- format and media type;
- relative location or HTTPS URL;
- lowercase hexadecimal SHA-256 fingerprint;
- byte size;
- optional compression method.

The fingerprint covers the bytes that are downloaded. For a compressed file it
therefore covers the compressed representation, not its decompressed contents. A
manifest may expose another artifact for the decompressed form.

### Provenance and license

Provenance distinguishes:

- primary source and citation;
- retrieval URL;
- license declared by the source;
- explicit redistribution status;
- transformation chain that produced the published artifact.

`redistribution = unknown` prevents copying an artifact into public project
storage until human review resolves the status.

Provenance records where a model or artifact comes from without assigning that
source project-wide editorial authority.

## Circuit

A `circuit` manifest describes one instance and references its graph or netlist
artifact. It includes:

- identity, title, and description;
- provenance and license;
- model profile and timing unit;
- resource dimensions;
- declared counts;
- available artifacts;
- declared or verified statistics with computation provenance.

The graph is separate from the manifest so metadata stays compact. The canonical
`red-black-hypergraph` JSON format supports examples and interchange. Large
datasets may use a documented text representation derived from `hygr` or another
profile-specific format referenced by the same catalog conventions.

Future circuit model profiles may add compatible artifact roles or separate
schemas. The catalog must make the active model explicit rather than inferring it
from a dataset family.

### Vertex in the red-black profile

A vertex has an identifier, color, delay, and resource-weight vector.
`criticality` is optional because it can be recomputed. A human label or cell type
is informative and does not affect metrics without an additional convention.

### Hyperarc in the red-black profile

A canonical hyperarc has:

- unique identifier;
- exactly one source;
- at least one sink distinct from the source;
- cut weight, defaulting to `1`;
- optional intrinsic delay per source-to-sink relation.

The `1.x` profile does not support multiple sources. An importer must normalize
or reject such input and document any transformation.

## Topology

A topology describes the physical parts available to a partition:

- ordered list of logical devices and resource capacities;
- complete communication cost matrix `D`;
- timing unit;
- symmetric or asymmetric cost semantics;
- optional physical links and link capacities for visualization.

The complete matrix is authoritative for `f_p`. Links explain or reconstruct a
platform, but the engine does not guess whether their cost represents a direct
link or a shortest path.

The `part_ids` array defines matrix row and column order.

## Partition

A partition references exactly one circuit and one topology by identity, version,
and fingerprint. Its assignment is either:

- an inline list of `(vertex_id, part_id)` pairs for small examples; or
- an artifact for large instances.

The two forms are mutually exclusive. Assignment order has no meaning. Semantic
validation checks uniqueness and complete coverage.

A manifest may contain declared metrics. Each records a `metric_id`, value, and
`declared` or `verified` status. Only an identified engine can produce `verified`
status together with its version and input fingerprints.

## Benchmark run

A benchmark run connects:

- circuit, topology, and optional produced partition;
- algorithm and exact version;
- structured parameters and seed;
- software and hardware environment;
- runtime, memory, status, and optional error information;
- declared or verified metrics;
- logs and output artifacts.

A failed run remains useful data. It records a non-success status and may omit an
unavailable partition or metrics.

## Benchmark CSV

CSV is a flat exchange form for run collections. It uses:

- UTF-8 encoding;
- comma delimiter;
- mandatory header;
- dot decimal separator;
- empty strings for missing values;
- compact JSON for `parameters` and other structured cells;
- UTC RFC 3339 timestamps.

Identifiers and versions remain in separate columns to avoid implicit joins.
Import converts each row into a `benchmark-run` object and validates it.

## Relationships

```text
Circuit 1 <──── n Partition n ────> 1 Topology
   │                  │
   │                  └──── produced by ──── BenchmarkRun
   └────────────────────────────────────────┘
```

A partition does not duplicate circuit or topology metadata. Complete references
prevent catalog updates from retroactively changing experiment meaning.

## Source of truth

| Information | Authoritative source |
| --- | --- |
| Metadata and provenance | Versioned manifest |
| Circuit structure | Fingerprinted graph or netlist artifact |
| Inter-part costs | Topology cost matrix |
| Vertex assignment | Inline assignment or partition artifact |
| Submitted result | Run value with `declared` status |
| Independently checked result | Engine output with `verified` status |
| Website pages and search index | Reconstructible derived data |

## Model extension policy

A model extension must answer:

- Can existing consumers safely ignore it?
- Are current metric identifiers still scientifically equivalent?
- Does it require a new artifact role, profile, schema, or major version?
- Can old and new results appear in one comparison without qualification?

This policy allows the portal to start with red-black hypergraphs while growing
to represent other work in the circuit partitioning community.
