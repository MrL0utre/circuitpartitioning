# Circuit Partitioning

Circuit Partitioning is an open scientific portal for learning about, studying,
and comparing circuit partitioning methods, with an initial focus on multi-FPGA
systems. The project is intended for the broader research community and is not
organized around a single thesis, algorithm, tool, institution, or research group.

The portal is designed to support five complementary activities:

- learn the foundations of graph and hypergraph partitioning;
- follow the state of the art across competing models and objectives;
- explore and download documented circuit datasets;
- inspect partitions and recompute their structural and timing metrics;
- compare reproducible benchmark results imported from tabular data.

## Project status

The repository is at **Milestone 0 — Foundations**. The web application has not
been implemented yet. This milestone defines the project scope, architecture,
scientific conventions, and versioned data contracts required by later work.

| Resource | Purpose |
| --- | --- |
| [Project charter](docs/project-charter.md) | Mission, audiences, scope, and success criteria |
| [Architecture](docs/architecture.md) | Components, responsibilities, and structural decisions |
| [Scientific conventions](docs/scientific-conventions.md) | Models, paths, partitions, and metrics |
| [Data model](docs/data-model.md) | Identities, versions, artifacts, and relationships |
| [Roadmap](docs/roadmap.md) | Milestones, dependencies, and public releases |
| [Backlog](docs/backlog.md) | Prioritized work packages and acceptance criteria |
| [ADRs](docs/adr/README.md) | Architecture and governance decision log |
| [Schemas](schemas/README.md) | JSON Schema contracts and benchmark CSV format |

## Target repository layout

```text
content/       educational material and state-of-the-art reviews
docs/          scope, architecture, conventions, and decisions
examples/      small validated reference artifacts
schemas/       versioned data contracts
scripts/       validation and import tools
web/           web application (Milestone 1)
engine/        independent scientific analysis engine (Milestone 3)
```

Target directories are created only when they contain a useful artifact.

## Guiding principles

1. **Editorial neutrality** — represent relevant approaches fairly and make
   assumptions, evidence, limitations, and conflicts of interest visible.
2. **Traceability** — every circuit, partition, and result has a provenance,
   version, and content fingerprint.
3. **Reproducibility** — every published metric can be recomputed from referenced
   artifacts and versioned conventions.
4. **Separation of concerns** — the web application presents data, an independent
   engine analyzes it, and schemas are their shared contract.
5. **Scalability** — workflows must remain useful for tiny teaching examples and
   circuits containing more than one million vertices.
6. **Openness** — formats are documented, content is citable, and contributions
   are reviewed in public.

## Research context

The project starts from established work on graph and hypergraph partitioning,
multilevel methods, timing-driven circuit partitioning, placement, and multi-FPGA
prototyping. It is expected to cover multiple formulations, cost functions, tools,
and benchmark families.

Julien Rodriguez's 2024 dissertation,
[*Circuit partitioning for multi-FPGA platforms*](https://theses.hal.science/tel-04731886),
is one useful initial source for red-black hypergraphs, topology-aware critical
path degradation, and the first reference datasets. It is treated as a starting
input to the project, not as its editorial center or the sole definition of the
field.

## Project language

English is the canonical language for source files, documentation, interfaces,
data descriptions, issue templates, and contributions. Translation support may
be considered later, but an English source remains authoritative.

## Development

Changes are developed on dedicated branches and reviewed through pull requests
into `main`. See [CONTRIBUTING.md](CONTRIBUTING.md) for the contribution workflow
and validation commands.
