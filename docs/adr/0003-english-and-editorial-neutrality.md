# ADR 0003 — English and editorial neutrality

- Status: accepted
- Date: 2026-08-03

## Context

The repository initially used both French and English and drew much of its first
scientific framing from one dissertation. That source is relevant to the initial
red-black hypergraph model, but circuit partitioning is a broad research field
with many formulations, objectives, tools, datasets, and communities.

A bilingual canonical repository increases maintenance cost and creates ambiguity
about which version is authoritative. Organizing the portal around one source
would also create a reasonable perception of editorial or institutional bias.

## Decision

- English is the canonical language for the repository, interface, documentation,
  structured data descriptions, issues, and pull requests.
- The project taxonomy is organized around research problems and explicit model
  dimensions, not around a single publication's structure.
- Sources are cited where they directly support a definition, dataset, or result.
- Comparative content documents scope, selection criteria, assumptions,
  limitations, and relevant competing work.
- Individual publications may be initial implementation sources without becoming
  project-wide authorities.

## Consequences

- Existing French material is translated to English.
- Translation support is deferred; future translations must track an English
  source revision.
- State-of-the-art maintenance requires broader literature review and potentially
  reviewers from different affiliations.
- The initial red-black contracts remain useful, but future milestones must test
  whether additional circuit models require compatible extensions or separate
  contracts.
