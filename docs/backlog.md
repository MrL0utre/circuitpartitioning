# Development backlog

This backlog turns the roadmap into independently verifiable work packages. It
does not replace GitHub issues; it provides their initial decomposition and
acceptance criteria. Priorities are `P0` (blocking), `P1` (important), and `P2`
(enhancement).

## Milestone 0 — Foundations

| ID | Priority | Work package | Status |
| --- | --- | --- | --- |
| FND-001 | P0 | Charter, audiences, and scope | complete |
| FND-002 | P0 | Architecture and structural decisions | complete |
| FND-003 | P0 | Scientific convention profile | complete |
| FND-004 | P0 | Circuit, topology, partition, and run schemas | complete |
| FND-005 | P0 | Hand-verifiable reference example | complete |
| FND-006 | P0 | Semantic validation and CI | complete |
| FND-007 | P1 | Contribution workflow and GitHub templates | complete |
| FND-008 | P0 | English and editorial-neutrality policy | complete |

Promotion from `1.0.0-draft.1` to `1.0.0` remains conditional on real circuit
imports and belongs to Milestone 3.

## Milestone 1 — Web foundation

### WEB-001 — Select the application foundation

- Priority: P0
- Dependencies: FND-002
- Deliverable: ADR comparing candidates for MDX, English content, deployment,
  search, and visualization.
- Acceptance: a prototype page renders equations, citations, and accessible
  scientific content; alternatives and migration costs are documented.

### WEB-002 — Initialize the application and quality gates

- Priority: P0
- Dependencies: WEB-001
- Deliverable: TypeScript application, formatting, linting, tests, and CI build.
- Acceptance: a clean clone can install, test, and build with documented commands;
  CI blocks regressions.

### WEB-003 — Create navigation and the design system

- Priority: P0
- Dependencies: WEB-002
- Deliverable: header, footer, main navigation, typography, colors, and base
  components.
- Acceptance: complete keyboard navigation, WCAG 2.2 AA contrast, and no mobile
  overflow.

### WEB-004 — Establish the English content architecture

- Priority: P0
- Dependencies: WEB-002
- Deliverable: content collections, stable routes, metadata, terminology rules,
  and revision information.
- Acceptance: every public page has English source content, a stable canonical
  URL, and an identified owner or maintenance policy.

### WEB-005 — Render scientific content

- Priority: P0
- Dependencies: WEB-002
- Deliverable: controlled MDX, equations, figures, pseudocode, notes, and
  bibliography.
- Acceptance: a demonstration page correctly presents `f_c`, `f_lambda`, and
  `f_p`, with accessible alternatives to figures.

### WEB-006 — Add search and scientific metadata

- Priority: P1
- Dependencies: WEB-004, WEB-005
- Deliverable: content index, keyboard search, synonyms, citation metadata, and
  social metadata.
- Acceptance: searches find scientific terms, acronyms, and glossary synonyms.

### WEB-007 — Deploy pull request previews

- Priority: P1
- Dependencies: WEB-002
- Deliverable: preview environment and promotion procedure.
- Acceptance: each application PR receives an ephemeral URL; secrets are not
  exposed to untrusted contribution code.

## Milestone 2 — Interactive course

| ID | Priority | Work package | Summary acceptance criterion |
| --- | --- | --- | --- |
| EDU-001 | P0 | Curriculum and learning outcomes | reviewed scope and prerequisites |
| EDU-002 | P0 | Graphs, hypergraphs, and netlists | definitions, examples, and corrected exercises |
| EDU-003 | P0 | Synchronous circuits and timing | manipulable paths and register boundaries |
| EDU-004 | P0 | Partitions, placement, and metrics | moves update several objectives live |
| EDU-005 | P1 | Multi-device target topologies | compare uniform and non-uniform costs |
| EDU-006 | P1 | Multilevel methods | coarsening, initial partitioning, and refinement visualized |
| EDU-007 | P0 | Modeling alternatives | compare red-black, graph, hypergraph, and relevant netlist abstractions |
| EDU-008 | P1 | English glossary | terms connected to content and search |
| EDU-009 | P2 | Self-assessment | local progress without personal-data collection |

Every chapter cites sources, states learning objectives, includes a minimal
example, distinguishes model-specific claims, and is tested with at least one
reader who does not already work on circuit partitioning.

## Milestone 3 — Circuit catalog and engine

### ENG-001 — Define the engine's internal API

- Priority: P0
- Dependencies: FND-003, FND-004
- Acceptance: loading and analysis work through a library and CLI without a web
  framework dependency; model profile is explicit.

### ENG-002 — Parse canonical red-black JSON

- Priority: P0
- Dependencies: ENG-001
- Acceptance: localized errors, configurable limits, and consistency with
  Milestone 0 validation.

### ENG-003 — Specify and parse a red-black text format

- Priority: P0
- Dependencies: ENG-001
- Acceptance: normative specification, edge-case tests, and lossless conversion
  to the initial internal model.

### ENG-004 — Evaluate additional community formats

- Priority: P0
- Dependencies: ENG-001, SOTA-000
- Acceptance: document at least two relevant formats, their semantics, license,
  information loss, and whether adapters or separate profiles are required.

### ENG-005 — Compute structural statistics

- Priority: P0
- Dependencies: ENG-002
- Acceptance: counts, degrees, connectivity, and components match independently
  hand-computable results.

### ENG-006 — Compute critical paths

- Priority: P0
- Dependencies: ENG-002
- Acceptance: topological implementation tested on multiple combinational
  regions, cycles through red vertices, vertex delays, and connection delays.

### SOTA-000 — Define literature search and inclusion protocol

- Priority: P0
- Dependencies: FND-008
- Acceptance: databases, queries, date range, inclusion criteria, exclusion
  reasons, review frequency, and conflict handling are documented before broad
  state-of-the-art claims are published.

### DATA-001 — Audit benchmark licenses and diversity

- Priority: P0
- Dependencies: SOTA-000
- Acceptance: candidate families including, but not limited to, ITC99, Titan,
  Chipyard, and accelerator circuits receive `redistributable`, `link-only`, or
  `not-publishable` decisions with evidence; coverage gaps are recorded.

### DATA-002 — Import the first dataset family

- Priority: P0
- Dependencies: DATA-001, ENG-003, ENG-005, ENG-006
- Acceptance: provenance, transformation command, fingerprints, and statistics
  reproduce on a clean machine.

### DATA-003 — Import or evaluate a second independent source

- Priority: P0
- Dependencies: DATA-001, ENG-004
- Acceptance: a dataset from another publication, group, or model lineage is
  imported or receives a documented incompatibility and licensing assessment.

### CAT-001 — Generate the catalog index

- Priority: P0
- Dependencies: DATA-002, WEB-002
- Acceptance: the index is fully reconstructible from manifests and rejects
  invalid data.

### CAT-002 — Build catalog list and detail pages

- Priority: P0
- Dependencies: CAT-001, WEB-003
- Acceptance: URL-shareable filters, visible provenance, declared/verified metric
  distinction, model labels, and fingerprinted downloads.

### DATA-004 — Stabilize contracts as `1.0.0`

- Priority: P0
- Dependencies: DATA-002, DATA-003
- Acceptance: documented feedback, stabilization ADR, migrated examples, and no
  known blocking issue across evaluated data sources.

## Milestones 4–9 — Preparatory epics

| ID | Milestone | Epic |
| --- | ---: | --- |
| PART-001 | 4 | Partition validation and metric computation |
| PART-002 | 4 | Topology and partition catalogs |
| VIZ-001 | 5 | Multi-resolution rendering prototype |
| VIZ-002 | 5 | Subgraph and critical-path inspection |
| BENCH-001 | 6 | Transactional CSV import |
| BENCH-002 | 6 | Statistical comparisons and Pareto fronts |
| SOTA-001 | 7 | Taxonomy and bibliographic model |
| SOTA-002 | 7 | Systematic update beyond the initial 2024 sources |
| SOTA-003 | 7 | Editorial review and conflict-of-interest workflow |
| COMM-001 | 8 | Submission and license-review pipeline |
| COMM-002 | 8 | Citable data releases |
| LAB-001 | 9 | Threat model and execution isolation |
| LAB-002 | 9 | Job queue and multiple tool integrations |

These epics are decomposed when their dependencies approach delivery so current
assumptions do not prematurely freeze later implementation details.

## Open questions

- Which first dataset family offers the clearest redistribution rights and source
  material?
- Which additional public datasets best reduce bias toward the initial model and
  source lineage?
- Should the verification engine reuse an existing tool or begin with an
  independent reference implementation?
- Which resource dimensions support meaningful comparisons across synthesis
  technologies?
- What numerical tolerance separates a verified metric from a divergence?
- Which persistent identifiers should be used before a possible Zenodo release?
- What review structure best supports balanced state-of-the-art maintenance?
