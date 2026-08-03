# ADR 0004 — Vinext and Sites for the web foundation

- Status: superseded by [ADR 0005](0005-local-development-and-ovh-deployment.md)
- Date: 2026-08-03

## Context

Milestone 1 needs a TypeScript web application that can publish English editorial
content, controlled MDX, accessible mathematics, citations, local search, and
future interactive graph views. The presentation layer must stay separate from
the scientific engine and versioned data contracts.

The first deployment should provide managed previews without introducing a
database, authentication system, or long-running application server before the
catalog and analysis workloads require them.

## Considered options

### Vinext with the Next.js application model and Sites

Advantages:

- file-based routes and React server/client component boundaries;
- Vite-based builds with controlled MDX and KaTeX integration;
- a direct path to managed previews and deployment through Sites;
- React support for future table, graph, and analysis interfaces;
- static-first pages without coupling content to the future engine.

Costs:

- Vinext is a younger compatibility layer than the other candidates;
- some Next.js features may not yet be classified or implemented;
- moving away later requires replacing the routing and deployment adapter.

### Astro

Astro offers strong content collections, Markdown ergonomics, and a small client
runtime. It was not selected because the later milestones are expected to contain
many coordinated React interactions. Astro remains a credible migration target
for content-heavy pages if the interactive surface stays smaller than expected.

Migration would preserve Markdown/MDX source and most CSS, but replace route
components, metadata exports, the search client boundary, and deployment files.

### Standalone Next.js on a general-purpose host

Next.js has broad ecosystem support and familiar content patterns. A standalone
deployment was not selected because it adds hosting and preview configuration
that Sites already provides for this milestone. Moving to it would be relatively
low-cost because the current route and component model is intentionally close to
Next.js, but worker-specific build files and deployment metadata would change.

## Decision

Use a Vinext TypeScript application under `web/`, deployed with Sites.

- Keep scientific computation outside the web application.
- Store canonical editorial content in Git; use controlled MDX for lessons.
- Render mathematics with `remark-math`, `rehype-katex`, and accessible MathML.
- Build the first search index at compile time and search it in the browser.
- Add a separate data-backed index only when catalog scale requires it.
- Use React client components only for interactions that require browser state.
- Treat Sites and Vinext as replaceable presentation infrastructure; the schemas,
  content semantics, and future engine API remain framework-independent.

## Prototype evidence

The foundations lesson demonstrates headings, notes, a semantic figure,
pseudocode, citations, inline mathematics, and the objective functions `f_c`,
`f_lambda`, and `f_p`. Server-rendered tests verify stable routes, English
document language, navigation, and KaTeX MathML output.

## Consequences

- Node.js and pnpm become required for web contributions.
- Pull requests run formatting, linting, type checking, production build, and
  rendered-route tests in addition to the Python data-contract checks.
- The initial search is intentionally small and dependency-free. A generated
  index can replace it without changing public URLs.
- Vinext limitations are reviewed before adopting framework-specific server APIs.
- A future migration must preserve canonical URLs and accessible scientific
  output even if the rendering framework changes.

## Supersession

ADR 0005 retains the Vinext application foundation but supersedes the Sites
hosting decision. Development is local and any future public deployment is
controlled through the project owner's OVH account.
