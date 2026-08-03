# Data contracts

Current version: `1.0.0-draft.1`.

Schemas use JSON Schema Draft 2020-12. They validate structure;
`scripts/validate_data.py` adds cross-object and scientific invariant checks that
JSON Schema cannot express.

## Schemas

| File | Object |
| --- | --- |
| `common.schema.json` | Shared references, artifacts, provenance, and metrics |
| `circuit.schema.json` | Circuit manifest |
| `red-black-hypergraph.schema.json` | Canonical JSON for the initial red-black profile |
| `topology.schema.json` | Part capacities and inter-part cost matrix |
| `partition.schema.json` | Vertex assignment and partition metrics |
| `benchmark-run.schema.json` | One normalized algorithm run |
| `benchmark-runs.csv.md` | CSV projection of multiple runs |

These contracts define the initial red-black hypergraph profile. They are not a
claim that all circuit partitioning research uses this model. Additional model
profiles may extend compatible metadata or introduce separate versioned schemas.

## Compatibility

- Consumers reject an unknown major version.
- Undocumented fields are rejected except in explicitly open objects such as
  `parameters` and `environment.details`.
- The draft version may still receive incompatible changes before `1.0.0`.
- Examples in `examples/` are part of the contract: changes migrate them or add a
  new version.
- Metrics from different convention profiles are not assumed comparable.

## Structural and semantic validation

JSON Schema checks types, required fields, and formats. Semantic validation also
checks:

- `red_vertices + black_vertices = vertices`;
- unique vertex and hyperarc identifiers;
- existence of vertices referenced by hyperarcs;
- consistent resource dimensions;
- square topology matrices, zero diagonals, and declared symmetry;
- unique and complete inline partition assignments;
- matching identities and fingerprints across examples;
- CSV headers, types, and conditional requirements;
- independently recomputed reference metrics.

## Artifact locations

An artifact location is either a POSIX relative path or an HTTPS URL. Absolute
paths, `..`, and unencrypted URLs are forbidden. A SHA-256 fingerprint covers the
bytes read from the specified path or downloaded from the URL.

Availability at a URL does not imply redistribution permission. License and
redistribution status remain explicit provenance fields.
