import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "../components/PageHeader";
import { RedBlackCircuitDiagram } from "../components/RedBlackCircuit";
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
        eyebrow="Circuit data"
        title="Circuits, representations, and derived analyses"
        intro="Each catalog entry identifies the source circuit, the representation used by the project, the permitted distribution mode, the artifact fingerprint, and the analyses that can be independently recomputed."
        status={{ label: "Reference fixture available", tone: "progress" }}
      />
      <section
        className="shell section fixture"
        aria-labelledby="fixture-title"
      >
        <figure className="fixture-visual">
          <span className="fixture-label">reference / minimal</span>
          <RedBlackCircuitDiagram
            idPrefix="catalog-mini-pipeline"
            annotatePaths
            className="fixture-diagram"
          />
          <figcaption>
            The canonical fixture contains two red-to-red paths. The 3 ns path
            through <code>slow_a</code> and <code>slow_b</code> is critical.
          </figcaption>
        </figure>
        <div className="fixture-copy">
          <StatusPill tone="available">Schema fixture</StatusPill>
          <span className="eyebrow">1 · Initial red-black profile</span>
          <h2 id="fixture-title">Reference instance and expected values</h2>
          <p>
            The reference instance is used to test the data contracts and the
            semantic validation procedure. Its size permits independent manual
            verification of vertex counts, assignments, cut metrics, and
            red-to-red path costs.
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
            <span className="eyebrow eyebrow-light">2 · Analysis contract</span>
            <h2 id="analysis-title">Quantities associated with a circuit</h2>
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
          <span className="eyebrow">3 · Publication procedure</span>
          <h2 id="catalog-title">From source artifact to catalog entry</h2>
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
        <p>
          Dataset import and the interactive catalog are scheduled for Milestone
          3.
        </p>
        <Link className="text-link" href="/about#contribute">
          Submit a candidate dataset source <span aria-hidden="true">→</span>
        </Link>
      </section>
    </>
  );
}
