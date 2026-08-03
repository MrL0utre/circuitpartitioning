# Scientific conventions

This document fixes the semantics of the first data contract profile. Version
`1.0.0-draft.1` covers timing-aware partitioning of directed red-black
hypergraphs on a target topology.

This is one model profile within the broader circuit partitioning field. Future
profiles may represent different netlist abstractions, timing models, replication
rules, placement objectives, or partitioning constraints. A new profile must state
how its metrics relate—or do not relate—to those defined here.

Any change that alters a metric result requires a new convention version.

## Directed red-black hypergraph profile

A circuit is represented by a directed hypergraph `H = (V, A)`:

- `V = V_R ∪ V_B` is the vertex set;
- `V_R` contains red vertices, typically registers and I/O ports;
- `V_B` contains black vertices, typically combinational cells;
- each canonical hyperarc has one source and at least one sink.

The red and black sets are disjoint. Every vertex has a circuit-wide unique
identifier.

A combinational region between red vertices is a directed acyclic hypergraph.
Consequently, every cycle in the complete circuit contains at least one red
vertex. This property allows critical paths to be computed by topological
propagation over combinational regions.

The initial profile and examples draw on the red-black formulation described in
Julien Rodriguez's 2024 dissertation. The project treats this formulation as an
explicitly identified model source, not as a universal definition of circuit
partitioning.

## Red-to-red paths

Only combinational paths that start and end at red vertices are considered for
the timing metric in this profile. Internal path vertices are black. Encountering
another red vertex ends the current path and starts a new combinational region.

The unpartitioned cost of a path `p` is:

```text
d(p) = sum of vertex delays along p
     + sum of intrinsic connection delays traversed by p
```

An unspecified intrinsic connection delay is zero. Delays are finite,
non-negative real numbers expressed in the unit declared by the circuit.

The unpartitioned critical path is:

```text
d_max(H) = max { d(p) | p is a red-to-red path in H }
```

In this profile, vertex criticality is the maximum cost of a red-to-red path that
passes through the vertex under the declared computation method. Imported
criticality is a declared value; an engine may publish a separate independently
computed value.

## Partition

A `k`-way partition is a total assignment of vertices to `k` parts such that:

- every vertex belongs to exactly one part;
- every referenced part exists in the target topology;
- for every resource dimension, the sum of vertex weights does not exceed the
  part capacity unless the partition is explicitly marked `infeasible`.

Vertex replication is not part of the `1.x` partition contract. A future profile
that supports replication requires distinct semantics and a major contract
revision or separate schema.

## Connectivity and cut

For a partition `Π`, hyperarc connectivity `lambda_Π(a)` is the number of distinct
parts containing its source or sinks.

A hyperarc is cut when `lambda_Π(a) > 1`. The set of cut hyperarcs is the cut
`omega(Π)`. The partition boundary contains every vertex incident to at least one
cut hyperarc.

The weighted cut size is:

```text
f_c(Π) = sum of weight(a) for every cut hyperarc a
```

The default hyperarc weight is `1`. The connectivity-minus-one cost is:

```text
f_lambda(Π) = sum of (lambda_Π(a) - 1) for every hyperarc a
```

A weighted variant must use another metric identifier and document its formula;
it cannot be published as `connectivity-minus-one`.

## Topology-aware timing cost

A topology associates each logical part with a target device and provides a cost
matrix `D`. `D(i, i) = 0`. Costs may be asymmetric when the topology declares
that property.

The post-partition cost of a path is:

```text
d_Π(p) = d(p) + sum of D(part(u), part(v))
```

The sum covers each source-to-sink relation followed by the path. The partitioned
critical path for this profile is:

```text
f_p(H, Π, D) = max { d_Π(p) | p is a red-to-red path in H }
```

In manifests, `critical-path` denotes `d_max(H)` without inter-part cost and
`partitioned-critical-path` denotes `f_p`. Absolute and relative degradation are
derived from these values and are not authoritative inputs.

Other timing-driven partitioning formulations may use different penalties,
multiplexing models, path sets, or placement integration. They must receive
distinct metric identifiers when results are not directly comparable.

## Capacity and balance

Resources are named dimensions such as `logic`, `registers`, `dsp`, or `bram`.
Every vertex has a non-negative weight per used dimension. A missing vertex
dimension means zero; every used dimension must exist in all target part
capacities.

The portal exposes at least, for every dimension:

- absolute load per part;
- utilization ratio `load / capacity`;
- maximum utilization ratio;
- feasibility.

There is no single universal definition of multi-constraint imbalance. Every
published balance value therefore identifies its `metric_id` and version. The
first engine implementation will select and document a definition in a dedicated
ADR.

## Units and numerical precision

- Initial timing units are `ps`, `ns`, and `us`.
- A circuit and its target topology use the same timing unit.
- Validation performs no implicit unit conversion.
- Computation uses at least IEEE 754 double precision.
- Recomputed value comparisons use an engine-documented tolerance.
- `NaN`, infinite, and negative metric inputs are forbidden.

## Initial datasets under consideration

Candidate families include ITC99, Titan, Chipyard-generated circuits, neural
network accelerators, and other datasets used by the circuit partitioning
community. Inclusion in a publication or dissertation does not itself grant
redistribution rights. Every import requires a license review, primary citation,
transformation version, and source-data fingerprint.

Dataset selection must not be limited to the instances used by the first model
source. Later literature review should identify additional public benchmarks and
document differences in synthesis technology, resource models, and objectives.

## Metric traceability

Every published metric is accompanied by:

- stable metric identifier;
- convention profile and version;
- engine name and version;
- circuit, topology, and partition fingerprints;
- computation timestamp.

This separates engine evolution, data changes, and scientific definition changes.

## Comparability rule

Two values may be compared directly only when their metric identifier,
convention profile, units, and relevant model assumptions match. The interface
must warn users when a chart combines results that require normalization or are
only qualitatively comparable.
