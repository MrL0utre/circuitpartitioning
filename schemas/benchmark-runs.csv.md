# Benchmark run CSV format

Version: `1.0.0-draft.1`.

The file uses UTF-8, comma delimiters, and exactly one header row. Each data row
describes one independent run. JSON cells use standard CSV quote escaping.

## Columns

| Column | Type | Required | Description |
| --- | --- | --- | --- |
| `run_id` | resource-id | yes | Unique run identifier |
| `circuit_id` | resource-id | yes | Circuit identifier |
| `circuit_version` | semver | yes | Circuit manifest version |
| `circuit_sha256` | sha256 | yes | Primary circuit artifact fingerprint |
| `topology_id` | resource-id | yes | Topology identifier |
| `topology_version` | semver | yes | Topology manifest version |
| `topology_sha256` | sha256 | yes | Topology manifest fingerprint |
| `algorithm` | non-empty text | yes | Algorithm name |
| `algorithm_version` | non-empty text | yes | Exact version or commit |
| `parameters` | JSON object | yes | Structured parameters, `{}` when empty |
| `seed` | integer >= 0 | no | Seed for randomized algorithms |
| `status` | enum | yes | `succeeded`, `failed`, `timeout`, `out-of-memory`, or `cancelled` |
| `started_at` | RFC 3339 | yes | Run start time in UTC |
| `duration_ms` | number >= 0 | success | Wall-clock duration |
| `memory_peak_mb` | number >= 0 | no | Observed peak memory |
| `critical_path` | number >= 0 | no | Unpartitioned critical path under the declared profile |
| `partitioned_critical_path` | number >= 0 | success | Critical path after placement |
| `cut_size` | number >= 0 | success | `f_c` under the declared profile |
| `connectivity_minus_one` | number >= 0 | success | `f_lambda` under the declared profile |
| `partition_id` | resource-id | success | Produced partition |
| `partition_version` | semver | success | Partition manifest version |
| `partition_sha256` | sha256 | success | Partition manifest fingerprint |
| `error_message` | text | failure | Short diagnostic |

`success` means required when `status = succeeded`. `failure` means required for
`failed`, `timeout`, and `out-of-memory`.

## Normalization

During import:

- empty strings become missing values, never zero;
- `parameters` is parsed as a JSON object;
- numbers are read without unit suffixes; timing units come from the circuit and
  must match the topology;
- the four metric columns become `declared` metrics under the explicitly recorded
  convention profile;
- references are grouped according to `benchmark-run.schema.json`;
- unknown columns are rejected in this draft version to detect typographical
  errors.

The current CSV projection assumes the initial metric profile. Before importing
runs from another model, the format must gain an explicit profile field or use a
separate compatible exchange definition.
