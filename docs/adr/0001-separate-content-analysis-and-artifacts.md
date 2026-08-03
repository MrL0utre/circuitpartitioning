# ADR 0001 — Separate content, analysis, and artifacts

- Status: accepted
- Date: 2026-08-03

## Context

The project must serve educational content, present structured metadata, and
analyze hypergraphs ranging from a few vertices to more than one million. A
single web project containing all data and scientific logic would couple the
editorial workflow to analysis costs and make the analysis tools difficult to
reuse.

## Decision

Separate four responsibilities:

1. editorial content versioned in Git;
2. a presentation-focused web application;
3. an independent scientific engine;
4. immutable artifact storage addressed by content fingerprint.

The contracts in `schemas/` form the interface between these responsibilities.

## Consequences

- The engine provides a library or CLI before any network API.
- The web index is derived from manifests and can be rebuilt.
- Large artifacts do not have to inflate Git history.
- Additional deployment components are introduced only when workload requires
  them.
