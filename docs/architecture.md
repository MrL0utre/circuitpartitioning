# Reference architecture

## Architecture goals

The platform must support three very different workloads: mostly static
educational pages, catalog search, and potentially expensive graph analysis.
These responsibilities must not depend on one process or a format owned by the
web interface.

```text
Versioned content ───────┐
                         ├──> build / indexing ──> web application
Validated metadata ─────┘             │
                                      │ analysis requests
Immutable artifacts ──> storage <──── scientific engine / workers
                                      │
Validated results and partitions <────┘
```

The JSON Schemas in `schemas/` are the shared contract between these components.

## Components

### 1. Editorial content

Courses, glossaries, state-of-the-art reviews, and institutional pages are stored
in Git, with MDX as a likely implementation format from Milestone 1. This allows
scientific review through pull requests, stable citations, and precise history.

Bibliographic records separate structured metadata—authors, DOI, year, taxonomy,
review date—from editorial interpretation. Content organization follows research
questions and explicit classification criteria rather than the outline of one
publication.

### 2. Web application

Responsibilities:

- navigation, search, and English content delivery;
- rendering courses, equations, figures, and citations;
- browsing catalogs;
- interactive visualizations;
- requesting analyses without owning scientific computation logic.

The likely Milestone 1 direction is TypeScript with a hybrid web framework that
supports static content generation and data-driven server rendering. The exact
framework is deliberately deferred to a Milestone 1 ADR.

### 3. Scientific engine

An independent library and command-line tool loads artifacts, verifies invariants,
and computes metrics such as:

- topological orders for acyclic combinational regions;
- vertex and hyperarc statistics;
- timing paths and critical paths;
- cut, boundary, and connectivity metrics;
- resource capacity and balance;
- topology-aware placement cost.

The engine must support clearly identified model variants. Red-black directed
hypergraphs are the first implemented model, not an assumption that every future
dataset must use the same representation.

A network API is added only when an actual use case requires it. Computations
remain locally testable and reusable in CI or workers.

### 4. Catalog and index

Validated JSON manifests are the descriptive source of truth. A search index or
relational database may be generated from them for the site, but remains
reconstructible and never becomes an independent scientific authority.

### 5. Artifact storage

Small teaching examples remain in Git. Large netlists, hypergraphs, and partitions
are stored in object storage or a scientific repository. Every reference records
a URL or relative path, SHA-256 fingerprint, byte size, media type, and license
status.

A URL does not imply that the project has permission to redistribute its target.

### 6. Ingestion pipeline

The future ingestion pipeline follows explicit steps:

1. receive the submission and scan it outside the analysis engine;
2. validate manifests and licensing information;
3. verify fingerprints;
4. parse within configured resource limits;
5. validate scientific invariants;
6. compute statistics with an identified engine version;
7. publish manifests and artifacts atomically.

## Data flows

### Catalog browsing

The browser receives compact metadata. It downloads a complete graph or selected
subgraph only when required. Expensive statistics are precomputed and labeled
with the engine version that produced them.

### Partition analysis

The engine loads a circuit, target topology, and vertex assignment. It verifies
coverage, uniqueness, and capacity before recomputing metrics. A submitted value
is retained as declared; it is published as verified only after independent
recomputation.

### Benchmark CSV import

One CSV row describes one run. Complex fields use canonical JSON encoded in a
cell. Import converts rows into validated `benchmark-run` objects; the CSV is not
used directly as the website database.

## Non-functional requirements

### Performance

- No view assumes that the full graph fits in browser memory.
- Tables use pagination and server-side or compact-index filtering.
- Long analyses are asynchronous and cancellable.
- Derived results are cached by input fingerprints and engine version.

### Security

- Submitted files are never interpreted as code.
- Parsers enforce size, element count, memory, and time limits.
- Future executions are isolated, network-disabled by default, and quota-bound.
- Editorial content does not allow unsanitized arbitrary HTML.

### Reproducibility

- Scientific references include versions and fingerprints.
- Timestamps use UTC and RFC 3339.
- Tabular numbers use a dot as decimal separator.
- Algorithm parameters remain structured data.
- Source selection and benchmark inclusion criteria are recorded.

### Accessibility and longevity

- WCAG 2.2 AA is the interface target.
- Charts provide tabular or textual alternatives.
- Important public URLs remain stable.
- Essential artifacts can be exported independently of the application.

## Initial deployment direction

The first deployment may colocate the web application and generated index on a
managed web platform, with external storage for large artifacts. Heavy analysis
can later move to separate workers. This avoids deploying compute infrastructure
before static catalogs require it.

## Deferred decisions

- exact web framework and hosting provider;
- scientific engine implementation language;
- database or search engine;
- object storage provider;
- contributor authentication mechanism;
- execution infrastructure for external partitioning tools;
- representation and interoperability policy for models beyond red-black
  hypergraphs.

Each decision is made from measurements or a milestone-specific requirement and
recorded in `docs/adr/`.
