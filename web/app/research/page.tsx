import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "../components/PageHeader";
import { StatusPill } from "../components/StatusPill";

export const metadata: Metadata = {
  title: "Research map",
  description:
    "A model-aware map of circuit partitioning research and the protocol for maintaining its evidence.",
  alternates: { canonical: "/research" },
};

const families = [
  [
    "Representation",
    "Graphs · hypergraphs · netlists · timing and placement models",
    "What structure is preserved?",
  ],
  [
    "Problem form",
    "Bi-partition · k-way · recursive · multi-device · constrained placement",
    "What constitutes a feasible solution?",
  ],
  [
    "Objective",
    "Cut · communication · balance · timing · power · reliability",
    "Which costs are measured together?",
  ],
  [
    "Method",
    "Constructive · local refinement · multilevel · evolutionary · mathematical optimization",
    "What guarantees and budgets apply?",
  ],
  [
    "Evidence",
    "Synthetic · public suites · industrial · generated · transformed",
    "Can another group reproduce it?",
  ],
];

export default function ResearchPage() {
  return (
    <>
      <PageHeader
        eyebrow="Literature classification"
        title="Classification of circuit-partitioning research"
        intro="Contributions to circuit partitioning differ in their representations, feasibility constraints, objective functions, algorithms, and experimental protocols. The literature map records these dimensions before attempting comparison."
        status={{ label: "Protocol in preparation", tone: "progress" }}
      />
      <section
        className="shell section research-map"
        aria-labelledby="map-heading"
      >
        <div className="section-heading compact-heading">
          <span className="eyebrow">1 · Classification dimensions</span>
          <h2 id="map-heading">Information recorded for each contribution</h2>
        </div>
        <div
          className="research-table"
          role="table"
          aria-label="Research classification dimensions"
        >
          {families.map(([dimension, scope, question]) => (
            <div className="research-row" role="row" key={dimension}>
              <strong role="cell">{dimension}</strong>
              <span role="cell">{scope}</span>
              <em role="cell">{question}</em>
            </div>
          ))}
        </div>
      </section>
      <section
        className="evidence-band section"
        aria-labelledby="evidence-title"
      >
        <div className="shell evidence-grid">
          <div>
            <span className="eyebrow eyebrow-light">
              2 · Review methodology
            </span>
            <h2 id="evidence-title">Procedure for maintaining the review</h2>
          </div>
          <div>
            <p>
              A claim of literature coverage requires a reproducible search
              protocol. The project will record the databases, queries, search
              dates, inclusion criteria, exclusion reasons, and review interval.
              Every synthesis page will identify its last review date.
            </p>
            <ol>
              <li>
                <span>01</span> Define the search protocol
              </li>
              <li>
                <span>02</span> Record sources before interpretation
              </li>
              <li>
                <span>03</span> Review contested claims independently
              </li>
              <li>
                <span>04</span> Report coverage gaps and conflicts of interest
              </li>
            </ol>
          </div>
        </div>
      </section>
      <section
        className="shell section research-status"
        aria-labelledby="research-status-title"
      >
        <div className="section-heading compact-heading">
          <span className="eyebrow">3 · Present limits</span>
          <h2 id="research-status-title">
            Current scope of the literature map
          </h2>
        </div>
        <div className="two-column-text">
          <article>
            <StatusPill tone="available">Available</StatusPill>
            <h3>Initial classification</h3>
            <p>
              The current material identifies foundational partitioning
              heuristics and the principal dimensions used to classify models,
              objectives, methods, and evidence.
            </p>
          </article>
          <article>
            <StatusPill tone="planned">Not established</StatusPill>
            <h3>Comprehensive coverage</h3>
            <p>
              The systematic review has not yet been completed. Consequently,
              the present bibliography must not be interpreted as exhaustive or
              as a complete account of current research.
            </p>
          </article>
        </div>
        <Link className="button button-secondary" href="/learn/foundations">
          Read the introductory definitions <span aria-hidden="true">→</span>
        </Link>
      </section>
    </>
  );
}
