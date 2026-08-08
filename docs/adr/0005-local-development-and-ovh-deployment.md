# ADR 0005 — Local development and OVH-controlled deployment

- Status: accepted
- Date: 2026-08-03
- Supersedes: the Sites hosting decision in
  [ADR 0004](0004-vinext-sites-web-foundation.md)

## Context

The project owner needs to control when the website becomes publicly accessible.
GitHub is the collaboration and continuous-integration platform, while an OVH
account is the intended production host. A managed Codex Sites preview would add
a second deployment surface and an access policy outside that boundary.

The exact OVH product, supported runtime, domain configuration, secret handling,
and rollback mechanism have not yet been recorded. Selecting an OVH adapter
before those constraints are known would create an unsupported deployment claim.

## Decision

- Run development servers and release previews on localhost only.
- Use GitHub for source control, pull requests, and CI, without GitHub Pages or a
  public GitHub-hosted deployment.
- Do not connect the repository to Codex Sites or commit Sites project metadata.
- Treat OVH as the only intended public host.
- Add OVH deployment configuration only in a separately approved task after the
  hosting runtime and release requirements have been documented.
- Default canonical metadata to `http://localhost:3000`; override it through
  `NEXT_PUBLIC_SITE_URL` only for an explicitly configured environment.

## Consequences

- Pull requests do not have a public hosted preview; reviewers run the application
  locally and rely on rendered-route tests in CI.
- Merging to `main` does not publish or update a website.
- The repository contains no Codex Sites project identifier or deployment adapter.
- OVH credentials and deployment actions stay outside local development and CI
  until a dedicated release design is accepted.
- The existing Vinext application remains usable locally. Its production adapter
  may change once the OVH hosting product is known.
