# Circuit Partitioning web application

The web application is the presentation layer for the Circuit Partitioning
project. It publishes English, model-aware educational and research content while
keeping scientific computation in a future independent engine.

## Stack

- TypeScript, React, and the Next.js application model through Vinext;
- Vite and the Sites deployment adapter;
- controlled MDX with remark-math, rehype-katex, and accessible MathML;
- a small compile-time content index with a keyboard-accessible client search;
- CSS design tokens and semantic components without a runtime UI framework.

The framework choice and migration costs are recorded in
[`docs/adr/0004-vinext-sites-web-foundation.md`](../docs/adr/0004-vinext-sites-web-foundation.md).

## Requirements

- Node.js 22.13 or newer;
- pnpm 11.7 (the version declared in `package.json`).

## Commands

```text
pnpm install --frozen-lockfile
pnpm dev
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
```

`pnpm test` builds the production worker and verifies the server-rendered HTML for
every stable route. Run the development server from this directory and open
`http://localhost:3000` unless the CLI reports another port.

## Routes

| Route                | Current purpose                                  |
| -------------------- | ------------------------------------------------ |
| `/`                  | orientation, model position, and delivery status |
| `/learn`             | course map                                       |
| `/learn/foundations` | MDX and mathematics publishing prototype         |
| `/research`          | research taxonomy and evidence policy            |
| `/benchmarks`        | reproducibility contract and honest empty state  |
| `/circuits`          | catalog contract and reference fixture           |
| `/about`             | scope, editorial policy, and contribution paths  |

See [`docs/web-content.md`](../docs/web-content.md) for metadata, accessibility,
review, search-index, and scientific-content requirements.

## Configuration

Set `NEXT_PUBLIC_SITE_URL` to override the canonical deployment origin. Builds
default to the private Sites origin recorded for Milestone 1. No database,
authentication secret, or scientific engine is required for this milestone.

Sites resource bindings are declared in `.openai/hosting.json`. The foundation
uses neither D1 nor R2; later milestones should add a binding only after its data
flow and source of truth are documented.

## Status language

Public pages use three labels consistently:

- **Available**: implemented and linked to inspectable source or evidence;
- **In progress**: a bounded foundation exists, but the complete feature does not;
- **Planned**: architecture or interface intent only, with no fabricated data.
