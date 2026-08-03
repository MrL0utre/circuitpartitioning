# ADR 0002 — Versioned data contracts

- Status: accepted
- Date: 2026-08-03

## Context

Circuits, topologies, partitions, and results come from different sources and
tools. Implicit assumptions about vertex order, units, or objective functions
would make comparisons irreproducible.

## Decision

- Describe manifests as JSON validated with JSON Schema 2020-12.
- Use a long-form CSV format to exchange collections of benchmark runs.
- Include `schema_version` in each root document.
- Identify scientific objects by `id`, `version`, and SHA-256 fingerprints.
- Reserve incompatible changes for new major versions.
- Maintain semantic validation for constraints that JSON Schema cannot express.

Milestone 0 uses `1.0.0-draft.1`. It becomes `1.0.0` only after evaluation
against the first real dataset imports.

## Consequences

- Consumers reject unknown major versions.
- A metadata-only change can update a manifest without changing the fingerprint
  of its scientific artifact.
- Declared and independently verified values can coexist without being confused.
- Incompatible changes require explicit migration tooling or guidance.
