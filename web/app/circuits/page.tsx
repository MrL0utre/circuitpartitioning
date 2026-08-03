import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "../components/PageHeader";
import { StatusPill } from "../components/StatusPill";

export const metadata: Metadata = {
  title: "Circuits",
  description:
    "The publication and analysis contract for the future open circuit catalog.",
  alternates: { canonical: "/circuits" },
};

const analyses = [
  [
    "Structure",
    "vertex, hyperarc, degree, component, and connectivity statistics",
  ],
  [
    "Semantics",
    "model profile, vertex roles, direction, resources, and timing units",
  ],
  [
    "Timing",
    "topological regions, path delay, critical paths, and state boundaries",
  ],
  [
    "Provenance",
    "source, license decision, transformations, checksum, and version",
  ],
];

export default function CircuitsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Circuit catalog"
        title="Inspect before you download. Verify after you do."
        intro="Each future catalog entry will pair a downloadable artifact with provenance, model semantics, verified statistics, and analysis limits."
        status={{ label: "Reference fixture available", tone: "progress" }}
      />
      <section
        className="shell section fixture"
        aria-labelledby="fixture-title"
      >
        <div
          className="fixture-visual"
          role="img"
          aria-label="Abstract reference circuit with five black nodes, two coral state nodes, and directed connections."
        >
          <span className="fixture-label">reference / minimal</span>
          <div>
            <i className="black-dot" />
            <b>→</b>
            <i className="black-dot" />
            <b>→</b>
            <i className="red-dot" />
            <b>→</b>
            <i className="black-dot" />
          </div>
          <div>
            <i className="black-dot" />
            <b>↗</b>
            <i className="red-dot" />
          </div>
        </div>
        <div className="fixture-copy">
          <StatusPill tone="available">Schema fixture</StatusPill>
          <span className="eyebrow">Initial red–black profile</span>
          <h2 id="fixture-title">
            A small circuit whose answers fit on paper.
          </h2>
          <p>
            The Milestone 0 fixture exists to test contracts and semantic
            validation. It is intentionally small enough for a contributor to
            verify counts, assignments, cut behavior, and paths independently.
          </p>
          <dl>
            <div>
              <dt>Purpose</dt>
              <dd>contract verification</dd>
            </div>
            <div>
              <dt>Scale</dt>
              <dd>teaching fixture</dd>
            </div>
            <div>
              <dt>License</dt>
              <dd>repository terms</dd>
            </div>
          </dl>
          <a
            className="button button-secondary"
            href="https://github.com/MrL0utre/circuitpartitioning/tree/main/examples"
          >
            View source artifacts <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
      <section
        className="analysis-band section"
        aria-labelledby="analysis-title"
      >
        <div className="shell">
          <div className="section-heading compact-heading">
            <span className="eyebrow eyebrow-light">Analysis surface</span>
            <h2 id="analysis-title">
              Every visualization needs a textual answer.
            </h2>
          </div>
          <div className="analysis-list">
            {analyses.map(([title, text], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        className="shell section catalog-roadmap"
        aria-labelledby="catalog-title"
      >
        <div>
          <span className="eyebrow">Publication pipeline</span>
          <h2 id="catalog-title">From candidate artifact to citable entry.</h2>
        </div>
        <ol>
          <li>
            <b>Audit</b>
            <span>source, diversity, and redistribution rights</span>
          </li>
          <li>
            <b>Normalize</b>
            <span>loss-aware transformation into a declared profile</span>
          </li>
          <li>
            <b>Verify</b>
            <span>schema, invariants, fingerprints, and statistics</span>
          </li>
          <li>
            <b>Publish</b>
            <span>stable metadata, download, and engine version</span>
          </li>
        </ol>
        <p>Dataset import and the interactive catalog begin in Milestone 3.</p>
        <Link className="text-link" href="/about#contribute">
          Propose a dataset source <span aria-hidden="true">→</span>
        </Link>
      </section>
    </>
  );
}
