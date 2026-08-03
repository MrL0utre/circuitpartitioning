# Reference examples

`mini-pipeline` is an intentionally small synthetic instance used to verify the
initial red-black profile, data contracts, and formulas by hand. It is a contract
test, not a representative benchmark or an endorsement of one research method.

## Circuit

The circuit contains two red-to-red paths:

```text
r-in -> fast -> r-out              cost = 1
r-in -> slow-a -> slow-b -> r-out  cost = 3
```

The second path is the unpartitioned critical path.

## Topology and partition

The topology contains two logical FPGA parts. Every crossing adds `10 ns`. The
assignment cuts:

- `fast -> r-out`;
- `slow-a -> slow-b`.

Each timing path crosses the boundary once. The short path therefore costs `11`
and the critical path costs `13`. Weighted cut size and
connectivity-minus-one both equal `2`.

## Files

| File | Contract |
| --- | --- |
| `circuits/mini-pipeline.circuit.json` | `circuit.schema.json` |
| `data/mini-pipeline.rbh.json` | `red-black-hypergraph.schema.json` |
| `topologies/two-fpga-link.topology.json` | `topology.schema.json` |
| `partitions/mini-pipeline-split.partition.json` | `partition.schema.json` |
| `runs/mini-pipeline-reference.run.json` | `benchmark-run.schema.json` |
| `benchmarks/reference-runs.csv` | `benchmark-runs.csv.md` |

Fingerprints are checked automatically. Any change to a referenced artifact must
update every dependent reference.
