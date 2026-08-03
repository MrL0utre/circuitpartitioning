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
        eyebrow="Research map"
        title="Organize the literature by questions, not allegiance."
        intro="The research area spans several model lineages and evaluation traditions. This map exposes the dimensions needed to compare them responsibly."
        status={{ label: "Protocol in preparation", tone: "progress" }}
      />
      <section
        className="shell section research-map"
        aria-labelledby="map-heading"
      >
        <div className="section-heading compact-heading">
          <span className="eyebrow">Classification frame</span>
          <h2 id="map-heading">Five questions for every contribution.</h2>
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
            <span className="eyebrow eyebrow-light">Evidence policy</span>
            <h2 id="evidence-title">
              “State of the art” is a maintained claim.
            </h2>
          </div>
          <div>
            <p>
              Before publishing broad coverage claims, the project will record
              databases, search strings, dates, inclusion criteria, exclusion
              reasons, and review intervals. Each synthesis page will show its
              last review date.
            </p>
            <ol>
              <li>
                <span>01</span> Search protocol before selection
              </li>
              <li>
                <span>02</span> Structured records before interpretation
              </li>
              <li>
                <span>03</span> Independent review for contested claims
              </li>
              <li>
                <span>04</span> Visible gaps and conflicts of interest
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
          <span className="eyebrow">Current coverage</span>
          <h2 id="research-status-title">
            What this foundation can—and cannot—say.
          </h2>
        </div>
        <div className="two-column-text">
          <article>
            <StatusPill tone="available">Available</StatusPill>
            <h3>Stable orientation points</h3>
            <p>
              The learning prototype cites foundational graph-partitioning
              heuristics and names common representation, objective, and method
              families.
            </p>
          </article>
          <article>
            <StatusPill tone="planned">Not yet claimed</StatusPill>
            <h3>Comprehensive current coverage</h3>
            <p>
              A systematic update beyond the initial source set belongs to
              Milestone 7. Until then, this site does not label its bibliography
              exhaustive or current.
            </p>
          </article>
        </div>
        <Link className="button button-secondary" href="/learn/foundations">
          Read the model-aware introduction <span aria-hidden="true">→</span>
        </Link>
      </section>
    </>
  );
}
