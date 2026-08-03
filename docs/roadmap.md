# Roadmap

Durations are indicative for a small team. Each milestone ends with a reviewed
pull request and a demonstration of its exit criteria.

## Milestone 0 — Foundations

**Goal:** make the project and its scientific data unambiguous before web
development.

Deliverables:

- project charter, audiences, scope, and success criteria;
- reference architecture and ADR log;
- versioned scientific convention profile;
- contracts for circuits, topologies, partitions, and runs;
- minimal examples and automated validation;
- contribution governance and prioritized backlog;
- English-language and editorial-neutrality policies.

Exit criterion: all examples pass validation, each data object has an explicit
source of truth, and no single publication is treated as the project-wide
authority.

## Milestone 1 — Web foundation

**Goal:** deliver a navigable and deployable website.

- framework, design system, navigation, and English content architecture;
- Markdown/MDX, mathematics, figures, and reference rendering;
- initial search;
- accessibility, tests, and pull request previews.

Exit criterion: the home page and documentation pages work on mobile and desktop,
and the content contribution workflow is documented.

## Milestone 2 — Interactive course

**Goal:** guide a new reader from fundamentals to multiple circuit partitioning
problem formulations.

- graphs, hypergraphs, netlists, and synchronous circuits;
- timing, critical paths, and resource constraints;
- partition, placement, mapping, cut, and topology objectives;
- multilevel schemes and representative algorithm families;
- exercises and interactive visualizations;
- explicit comparison of modeling choices, including the red-black profile.

Exit criterion: readers can explain why a minimum-cut solution may be poor for a
timing objective and can distinguish major circuit representation choices.

## Milestone 3 — Circuit catalog

**Goal:** publish the first legally distributable circuit families with
independent analysis.

- parsers for the initial red-black format and selected community formats;
- structural statistics and critical-path engine;
- filterable catalog and circuit detail pages;
- downloads, licenses, citations, and fingerprints;
- aggregated visualization strategy for large instances;
- evaluation and stabilization of the draft contracts against real data.

Exit criterion: at least one small and one large circuit use the same ingestion
pipeline, and datasets from more than one source are represented or formally
assessed for inclusion.

## Milestone 4 — Partitions and topologies

**Goal:** analyze and compare valid partitions across target platforms.

- topology catalog;
- assignment and capacity validation;
- cut, connectivity, boundary, timing, and placement metrics;
- before/after views and side-by-side partition comparison;
- support for clearly identified metric profiles.

Exit criterion: every metric of a published partition is recomputed from its
artifacts and labeled with its convention profile.

## Milestone 5 — Visual explorer

**Goal:** inspect circuits and partitions without assuming small graphs.

- coloring by model role, part, resource, and criticality;
- critical paths and cut hyperarcs;
- selection-centered subgraphs;
- aggregation, levels of detail, and background computation;
- accessible summaries for every visual view.

Exit criterion: representative catalog sizes remain usable through aggregated
views and bounded queries.

## Milestone 6 — Benchmark dashboard

**Goal:** compare reproducible multi-objective runs.

- strict CSV import;
- tables, filters, distributions, and uncertainty summaries;
- Pareto fronts for timing, cut, balance, memory, and runtime;
- links from every run to its artifacts and environment;
- export of the current selection;
- comparability warnings when conventions differ.

Exit criterion: a displayed figure can be reproduced from an export and the
referenced artifacts.

## Milestone 7 — Living state of the art

**Goal:** maintain a balanced literature map that extends beyond the project's
initial sources.

- taxonomy of models, objectives, constraints, and algorithmic phases;
- publication and tool records;
- comparison matrices and BibTeX export;
- explicit search scope and inclusion criteria;
- review dates and maintenance ownership;
- periodic review involving diverse sources and, where possible, affiliations.

Exit criterion: each entry identifies its primary source, last review date, model,
objectives, available code, datasets, and reproducibility status.

## Milestone 8 — Community contributions

**Goal:** integrate external contributions through an auditable process.

- submission templates;
- license and provenance review;
- automated validation and independent metric recomputation;
- reproducibility records and citable releases;
- editorial conflict-of-interest and dispute handling.

Exit criterion: one complete external contribution is integrated without an
undocumented manual step.

## Milestone 9 — Online laboratory

**Goal:** execute approved analyses and partitioners on bounded instances.

- job queue, quotas, and isolation;
- circuit, topology, objective, and algorithm selection;
- progress, results, and artifact download;
- initial integrations chosen from multiple relevant tools when licensing and
  interfaces allow;
- reproducible execution records.

Exit criterion: an online run produces a reproducible record without risking
project data or infrastructure.

## Proposed public releases

| Version | Milestones | Promise |
| --- | --- | --- |
| `0.1` | 0–2 | Learn and understand the problem space |
| `0.5` | 3–7 | Explore datasets, literature, and results |
| `1.0` | 8–9 | Contribute and reproduce experiments |

## Critical dependencies

- Milestone 3 depends on draft circuit contracts from Milestone 0.
- Milestone 4 depends on the Milestone 3 engine and topology contracts.
- Milestone 6 depends on stable identities from Milestones 3 and 4.
- Milestone 7 begins with a literature review protocol before comparative claims
  are presented publicly.
- Milestone 8 requires validation robust enough for untrusted data.
- Milestone 9 starts only after threat modeling and quota design.

## Cross-cutting governance checkpoints

At the end of each milestone, reviewers verify:

- all canonical project text is in English;
- citations and dataset sources are correctly scoped;
- no single approach is implicitly framed as the field-wide baseline;
- comparisons expose assumptions and convention compatibility;
- new architecture decisions are recorded in ADRs.
