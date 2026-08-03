# Contributing

Circuit Partitioning welcomes documentation, scientific data, analysis, and
software contributions. During Milestone 0, data contracts are still drafts;
feedback based on real datasets is especially valuable.

## Project language

Write source files, documentation, commit messages, issues, pull requests, data
descriptions, and user-facing text in English. Identifiers, schema fields, and
APIs also use English. A future translation layer must preserve English as the
canonical source unless a later governance decision changes this rule.

## Editorial neutrality

Contributions must not present one publication, thesis, tool, laboratory,
institution, or algorithm as the default authority for the entire field.

When reviewing research, contributors should:

- cite primary sources for substantive claims;
- distinguish established results from interpretation;
- state model assumptions, objectives, datasets, and limitations;
- include relevant competing approaches when making comparisons;
- disclose affiliations or conflicts that could affect editorial judgment;
- avoid rankings that collapse multi-objective results without justification.

The project may use individual publications as implementation starting points,
but this must not determine the long-term taxonomy or benchmark narrative.

## Git workflow

1. Start from an up-to-date `main` branch.
2. Create a descriptive branch, for example `dev/milestone-1-web-foundation`.
3. Keep each commit focused on one coherent intention.
4. Run the local validation suite.
5. Open a pull request that explains context, decisions, and trade-offs.
6. Wait for review before merging into `main`.

Direct changes to `main` are discouraged. Changes to schemas or scientific
conventions must explain compatibility and update the affected examples.

## Commit style

Use short messages inspired by Conventional Commits:

```text
docs: establish editorial neutrality policy
feat(data): add partition manifest schema
fix(validation): reject duplicate vertex assignments
```

Do not mix an unrelated editorial change with a data format redesign.

## Pull requests

Every pull request should describe:

- the need being addressed;
- the contracts or components affected;
- the validation performed;
- reproducibility and compatibility effects;
- unresolved questions and relevant trade-offs.

## Data contributions

Do not add a third-party circuit or artifact until the following are documented:

- primary source and citation;
- license and redistribution rights;
- transformations applied;
- SHA-256 content fingerprint;
- software version and command used to produce derived data.

Personal, confidential, export-controlled, or non-disclosable data is not
accepted.

## Changing a scientific convention

A change to a formula or scientific meaning must:

1. cite the scientific motivation;
2. identify affected metrics;
3. state whether existing results require recomputation;
4. update the convention version;
5. add an ADR when the decision is structural;
6. include a test case that distinguishes the old and new definitions.

## Local validation

Create a Python environment, install the dependencies, and run:

```text
python -m pip install --requirement requirements-dev.txt
python scripts/validate_data.py
python -m unittest discover -s tests
git diff --check
```

The validator checks schemas, examples, fingerprints, cross-references, and
scientific metrics. Component-specific test suites and documentation link checks
will be added as the repository grows.
