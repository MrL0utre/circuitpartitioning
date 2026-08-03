import type { Metadata } from "next";
import { PageHeader } from "../components/PageHeader";

export const metadata: Metadata = {
  title: "About",
  description:
    "Scope, editorial policy, and contribution principles for the Circuit Partitioning project.",
  alternates: { canonical: "/about" },
};

const principles = [
  [
    "Plural by design",
    "No thesis, algorithm family, data source, institution, or model profile defines the whole field.",
  ],
  [
    "Inspectability over spectacle",
    "Published numbers retain definitions, inputs, parameters, fingerprints, and verification state.",
  ],
  [
    "Claims have boundaries",
    "General statements, model-specific results, and editorial interpretation remain distinguishable.",
  ],
  [
    "Access is scientific quality",
    "Keyboard use, readable mathematics, textual chart alternatives, and stable URLs are requirements.",
  ],
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About the project"
        title="Infrastructure for a field, not a monument to one result."
        intro="Circuit Partitioning is an open project for teaching the problem, mapping its research, and publishing inspectable datasets and comparisons."
      />
      <section
        id="editorial-policy"
        className="shell section principles"
        aria-labelledby="principles-title"
      >
        <div className="section-heading">
          <span className="eyebrow">Editorial principles</span>
          <h2 id="principles-title">Neutrality comes from visible method.</h2>
          <p>
            Complete neutrality is not asserted. Instead, source selection,
            definitions, model boundaries, review dates, and conflicts are made
            inspectable.
          </p>
        </div>
        <div className="principle-grid">
          {principles.map(([title, text], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="origin-band section" aria-labelledby="origin-title">
        <div className="shell origin-grid">
          <div>
            <span className="eyebrow eyebrow-light">Starting context</span>
            <h2 id="origin-title">
              One useful source among a larger evidence base.
            </h2>
          </div>
          <div>
            <p>
              Julien Rodriguez’s 2024 doctoral thesis supplied terminology and a
              concrete red–black directed hypergraph profile for the initial
              foundation. The project treats that work as a citable source and
              implementation starting point.
            </p>
            <p>
              The literature map, dataset policy, and future model profiles are
              deliberately broader. Community review is expected to challenge
              blind spots and add independent lineages.
            </p>
          </div>
        </div>
      </section>
      <section
        id="contribute"
        className="shell section contribute"
        aria-labelledby="contribute-title"
      >
        <div>
          <span className="eyebrow">Contribute</span>
          <h2 id="contribute-title">
            A precise correction is a first-class contribution.
          </h2>
          <p>
            You can propose a source, identify a modeling ambiguity, add a
            fixture, improve accessibility, review a definition, or implement a
            scoped backlog item.
          </p>
          <a
            className="button button-primary"
            href="https://github.com/MrL0utre/circuitpartitioning/blob/main/CONTRIBUTING.md"
          >
            Read CONTRIBUTING.md <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="contribution-checklist">
          <h3>A strong contribution includes</h3>
          <ul>
            <li>the claim or artifact being changed;</li>
            <li>the applicable model profile and scope;</li>
            <li>primary-source provenance where possible;</li>
            <li>tests or a hand-verifiable example;</li>
            <li>licensing and redistribution information;</li>
            <li>accessible English content.</li>
          </ul>
        </div>
      </section>
      <section className="shell maintenance-note">
        <strong>Maintenance policy</strong>
        <p>
          Foundation pages are versioned in Git. Scientific synthesis pages will
          display their last review date and owner or review policy. Stale
          content remains visible as stale rather than silently current.
        </p>
      </section>
    </>
  );
}
