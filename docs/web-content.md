# Web content guide

The canonical website source lives under `web/app/`. English is the authoritative
editorial language. Stable routes are organized by reader task:

| Route | Purpose | Maintenance policy |
| --- | --- | --- |
| `/` | project orientation and current delivery status | reviewed each milestone |
| `/learn` | course map and module status | course editors |
| `/learn/foundations` | first controlled-MDX lesson | scientific and editorial review |
| `/research` | taxonomy and literature-review protocol | reviewed before coverage claims |
| `/benchmarks` | comparison contract and future results UI | benchmark maintainers |
| `/circuits` | artifact publication and analysis contract | data and engine maintainers |
| `/about` | scope, neutrality, and contribution policy | project maintainers |

## Add or revise a page

1. Choose a stable, task-oriented route. Avoid organizing content around one
   publication, laboratory, or implementation.
2. Export page metadata with an English title, description, and canonical route.
3. State whether capabilities are available, in progress, or planned.
4. Distinguish general claims from model-profile-specific claims.
5. Cite primary sources for scientific definitions and results.
6. Add the page and relevant synonyms to `web/app/data/site.ts`.
7. Add or update a server-rendered route assertion under `web/tests/`.
8. Run the web validation commands documented in `web/README.md`.

## Controlled MDX

Lessons may use `.mdx` files processed by the repository's fixed remark and
rehype plugins. Arbitrary user-submitted MDX is not executed. The current
scientific components provide:

- accessible KaTeX mathematics with MathML;
- semantic notes and warnings;
- figures with textual alternatives and captions;
- line-addressable pseudocode;
- regular links for citations and persistent identifiers.

Every figure must include a useful text alternative. Every table must use header
cells. Color cannot be the only carrier of scientific meaning. Interactive charts
added later must include a textual or tabular equivalent.

## Revision and ownership

Foundation pages are versioned through Git history. Literature synthesis pages
must also display a last-reviewed date and either a named owner or a documented
review policy. Content that misses its review interval is labeled stale rather
than silently presented as current.
