# Project charter

## Mission

Circuit Partitioning aims to become an open, community-oriented reference for
learning about, evaluating, and advancing circuit partitioning methods. The
initial application domain is rapid prototyping on multi-FPGA platforms, while
the taxonomy and architecture must remain broad enough to represent related
placement, mapping, and partitioning formulations.

The portal brings together four activities that are commonly fragmented across
papers, repositories, and institutional websites: education, literature review,
dataset exploration, and reproducible algorithm comparison.

## Audiences

### Students and new readers

They should be able to progress from graphs and hypergraphs to complete circuit
partitioning formulations through manipulable examples, without prior expertise
in electronic design automation.

### Researchers

They should be able to identify a study's assumptions and objective functions,
find suitable instances, verify a partition, and compare methods under a shared
experimental protocol.

### Algorithm and tool developers

They should have stable formats, minimal examples, validators, and a documented
process for publishing reproducible results.

### Dataset maintainers and experimentalists

They should be able to publish provenance, licensing, transformations, metrics,
and downloadable artifacts without losing the relationship to original sources.

## Functional scope

The long-term project scope includes:

- a progressive course on graphs, hypergraphs, synchronous circuits, timing,
  partitions, placement, and multilevel methods;
- a structured, dated, and citable state of the art;
- a circuit catalog with metadata, downloads, and independent analyses;
- a partition catalog with recomputed metrics;
- a benchmark dashboard driven by validated tabular data;
- a visual explorer suitable for both small and large instances;
- contribution and experiment reproduction workflows;
- eventually, isolated execution of approved analysis and partitioning tools.

Red-black hypergraphs are an important initial model, but the portal must be able
to document and compare other graph, hypergraph, netlist, and timing models.

## Initial exclusions

Milestone 0 explicitly excludes:

- implementation of the web interface;
- hosting or execution of user-supplied code;
- redistribution of benchmarks whose licenses have not been reviewed;
- claims of automatically covering the entire literature;
- a universal scalar ranking for multi-objective algorithms;
- treating one dissertation or software package as the definitive scope of the
  research field.

## Project language

English is the canonical language for the interface, educational content,
documentation, schemas, data descriptions, and community workflows. Translation
support is out of scope for the initial milestones. If translations are added
later, they must identify their source revision and may not silently override a
newer English source.

## Editorial and scientific principles

- Important literature claims cite primary sources.
- State-of-the-art entries show their last review date.
- Derived data is distinguished from author-provided data.
- Computed metrics identify their convention version and unit.
- Experiments retain algorithm, version, parameters, seed, and environment.
- Redistributed artifacts identify their license and origin.
- Multi-objective results expose trade-offs rather than hiding them in an
  arbitrary score.
- Reviews cover relevant competing approaches and state selection criteria.
- Contributor affiliations and potential conflicts can be disclosed.

## Neutrality policy

The project is not an advocacy site for a particular method. Editorial structure
is based on research questions and explicit taxonomies, not on the chapter order
of a source document or the architecture of one tool.

An individual publication may supply an initial definition, dataset, or example.
That role must be labeled locally and must not elevate the publication to a
project-wide authority. Comparative pages should represent models and methods on
their own terms before discussing benchmark outcomes.

## Success criteria

### End of Milestone 0

- A circuit, topology, partition, and benchmark run can be described without
  ambiguity.
- Minimal examples pass structural and semantic validation.
- Architecture choices and open questions are visible.
- Every later milestone has explicit exit criteria.
- Project language and editorial neutrality are documented and reviewable.

### First useful public release

- A reader can complete an introductory learning path.
- At least one legally redistributable circuit family is published.
- Core statistics are independently recomputed by the engine.
- Published artifacts are downloadable and citable.
- The literature section includes sources from multiple authors and institutions.

### Community release

- An external contribution can be validated and integrated.
- A published experiment can be reproduced from its record.
- Data contract changes follow a visible versioning policy.
- Editorial reviews have documented scope and maintenance ownership.

## Principal risks

| Risk | Planned response |
| --- | --- |
| Heterogeneous circuit licenses | Provenance registry and redistribution denied by default |
| Graphs too large for browsers | Aggregation, subgraphs, background computation, and precomputation |
| Divergent metric definitions | Version conventions and recompute metrics independently |
| Incomplete benchmark rows | Strict schemas, run status, and artifact references |
| Rapidly outdated state of the art | Review dates, maintainers, and Git history |
| Prematurely frozen formats | Keep `1.0.0-draft.1` until real imports are evaluated |
| Perceived institutional or methodological bias | Neutral taxonomy, transparent selection criteria, and diverse review |
