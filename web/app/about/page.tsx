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
    "Scope is explicit",
    "No thesis, algorithm family, dataset, institution, or model profile is treated as a definition of the complete field.",
  ],
  [
    "Results are traceable",
    "Published quantities retain their definitions, inputs, parameters, fingerprints, and verification state.",
  ],
  [
    "Claims are qualified",
    "General statements, model-specific results, and editorial interpretations are presented separately.",
  ],
  [
    "Access supports verification",
    "Keyboard navigation, readable mathematics, textual figure alternatives, and stable URLs are treated as scientific requirements.",
  ],
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Project statement"
        title="Scope, governance, and contribution policy"
        intro="Circuit Partitioning is an open scientific project for presenting definitions, maintaining a structured literature map, and publishing traceable datasets, partitions, and experimental comparisons."
      />
      <section
        id="editorial-policy"
        className="shell section principles"
        aria-labelledby="principles-title"
      >
        <div className="section-heading">
          <span className="eyebrow">1 · Editorial method</span>
          <h2 id="principles-title">
            Principles applied to scientific content
          </h2>
          <p>
            The project does not claim an absence of editorial judgment. It
            records source-selection methods, definitions, model boundaries,
            review dates, and conflicts of interest so that these judgments can
            be examined.
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
            <span className="eyebrow eyebrow-light">
              2 · Initial scientific context
            </span>
            <h2 id="origin-title">Relation to the initial source material</h2>
          </div>
          <div>
            <p>
              Julien Rodriguez&apos;s 2024 doctoral thesis supplied terminology
              and a concrete red-black directed hypergraph profile for the
              initial foundation. The project treats that work as a cited source
              and an implementation starting point.
            </p>
            <p>
              The literature map, dataset policy, and future profiles extend
              beyond that source. Independent model lineages and contradictory
              evidence are included when they satisfy the documented review
              criteria.
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
          <span className="eyebrow">3 · Contribution procedure</span>
          <h2 id="contribute-title">Forms of scientific contribution</h2>
          <p>
            Contributions may propose a primary source, identify a modeling
            ambiguity, add a validated instance, review a definition, improve
            accessibility, or implement a bounded work package.
          </p>
          <a
            className="button button-primary"
            href="https://github.com/MrL0utre/circuitpartitioning/blob/main/CONTRIBUTING.md"
          >
            Read CONTRIBUTING.md <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="contribution-checklist">
          <h3>Required information</h3>
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
