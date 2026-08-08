# Web content guide

The canonical website source lives under `web/app/`. English is the authoritative
editorial language. Stable routes are organized by reader task:

| Route                | Purpose                                         | Maintenance policy              |
| -------------------- | ----------------------------------------------- | ------------------------------- |
| `/`                  | project orientation and current delivery status | reviewed each milestone         |
| `/learn`             | course map and module status                    | course editors                  |
| `/learn/foundations` | first controlled-MDX lesson                     | scientific and editorial review |
| `/research`          | taxonomy and literature-review protocol         | reviewed before coverage claims |
| `/benchmarks`        | comparison contract and future results UI       | benchmark maintainers           |
| `/circuits`          | artifact publication and analysis contract      | data and engine maintainers     |
| `/about`             | scope, neutrality, and contribution policy      | project maintainers             |

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

## Academic prose

The public site is written for researchers, engineers, and graduate students.
Its editorial structure adapts conventions used in scientific dissertations and
articles, including the initial 2024 source, while remaining independent of any
single publication.

- Begin a page or chapter by stating its subject, scope, and organization.
- Introduce notation and definitions before algorithms, results, or comparisons.
- Use descriptive section titles and number the principal sections of extended
  scientific pages.
- State the representation, assumptions, units, and feasibility conditions that
  delimit a claim.
- Separate established definitions, project decisions, available evidence, and
  future work.
- Prefer precise declarative sentences to promotional slogans, superlatives, or
  unexplained calls to action.
- Use complete, descriptive captions for figures and tables.
- Identify review dates and avoid present-tense claims of completeness when the
  literature or data review is unfinished.

Web paragraphs remain shorter than dissertation paragraphs to preserve scanning
and accessibility. The scientific meaning, qualification of claims, and order of
exposition take precedence over reproducing the typography or sentence length of
the source material.

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

## Scientific visual language

Figures for the initial red-black profile use the dissertation's restrained
diagram grammar as a starting point: thin directed connections, circular filled
vertices, black for combinational resources, and red for register or I/O
boundaries. Labels and captions must state the roles so that color is never the
only distinction.

Every illustrated combinational timing path must begin at a red source boundary,
contain only black internal vertices, and end at the next red sink boundary. A
red vertex encountered along a signal flow terminates the current path and starts
a new combinational region. Other model profiles may adopt another visual
language, but their semantics and legend must be explicit.

## Revision and ownership

Foundation pages are versioned through Git history. Literature synthesis pages
must also display a last-reviewed date and either a named owner or a documented
review policy. Content that misses its review interval is labeled stale rather
than silently presented as current.
