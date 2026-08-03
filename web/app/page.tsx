import type { Metadata } from "next";
import Link from "next/link";
import { CircuitMap } from "./components/CircuitMap";
import { StatusPill } from "./components/StatusPill";

export const metadata: Metadata = {
  title: "Circuit Partitioning",
  alternates: { canonical: "/" },
};

const pathways = [
  {
    index: "01",
    title: "Learn the models",
    body: "Build from graph and hypergraph basics to timing-aware, multi-device partitioning objectives.",
    href: "/learn",
    link: "Open the course map",
  },
  {
    index: "02",
    title: "Inspect the evidence",
    body: "Trace definitions, modeling choices, sources, and the scope of every scientific claim.",
    href: "/research",
    link: "View the research map",
  },
  {
    index: "03",
    title: "Compare reproducibly",
    body: "Use versioned contracts for circuits, partitions, targets, and algorithm runs.",
    href: "/benchmarks",
    link: "See the benchmark design",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow-row">
            <span className="eyebrow">Open research infrastructure</span>
            <StatusPill tone="available">Foundation available</StatusPill>
          </div>
          <h1 id="hero-title">Circuit partitioning, made inspectable.</h1>
          <p className="hero-lede">
            A community-oriented knowledge base connecting theory, models,
            datasets, algorithms, and reproducible evidence—without treating one
            representation or publication as the whole field.
          </p>
          <div className="button-row">
            <Link className="button button-primary" href="/learn/foundations">
              Start with the foundations <span aria-hidden="true">→</span>
            </Link>
            <Link className="button button-secondary" href="/about">
              Read the project principles
            </Link>
          </div>
          <dl className="hero-facts" aria-label="Current foundation">
            <div>
              <dt>4</dt>
              <dd>versioned data contracts</dd>
            </div>
            <div>
              <dt>1</dt>
              <dd>initial model profile</dd>
            </div>
            <div>
              <dt>Open</dt>
              <dd>review and contribution</dd>
            </div>
          </dl>
        </div>
        <CircuitMap />
      </section>

      <section
        className="pathways shell section"
        aria-labelledby="pathway-title"
      >
        <div className="section-heading">
          <span className="eyebrow">One field, connected views</span>
          <h2 id="pathway-title">Move from concepts to evidence.</h2>
          <p>
            The platform is organized around research tasks—not around the
            chapter order of any single source.
          </p>
        </div>
        <div className="pathway-list">
          {pathways.map((pathway) => (
            <article className="pathway" key={pathway.title}>
              <span className="pathway-index">{pathway.index}</span>
              <div>
                <h3>{pathway.title}</h3>
                <p>{pathway.body}</p>
              </div>
              <Link href={pathway.href}>
                {pathway.link} <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="model-band section" aria-labelledby="model-title">
        <div className="shell model-band-grid">
          <div>
            <span className="eyebrow eyebrow-light">Model awareness</span>
            <h2 id="model-title">The representation is part of the result.</h2>
          </div>
          <div className="model-copy">
            <p>
              Graph, hypergraph, netlist, timing, placement, and resource models
              expose different structure. We label the active model profile and
              separate model-specific claims from general ones.
            </p>
            <p>
              The red–black directed hypergraph profile is the first implemented
              contract. It is a starting point for interoperability work, not an
              editorial boundary.
            </p>
            <Link className="text-link text-link-light" href="/research">
              See how evidence is classified <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section
        className="readiness shell section"
        aria-labelledby="readiness-title"
      >
        <div className="section-heading compact-heading">
          <span className="eyebrow">Delivery status</span>
          <h2 id="readiness-title">A useful foundation, with honest edges.</h2>
        </div>
        <div className="readiness-grid">
          <article>
            <StatusPill tone="available">Available now</StatusPill>
            <h3>Shared vocabulary and contracts</h3>
            <p>
              Scientific conventions, schemas, a hand-verifiable fixture, and
              automated semantic validation are ready for review.
            </p>
            <Link className="text-link" href="/circuits">
              Inspect the circuit foundation <span aria-hidden="true">→</span>
            </Link>
          </article>
          <article>
            <StatusPill tone="progress">In progress</StatusPill>
            <h3>Pedagogy and literature protocol</h3>
            <p>
              The first lesson demonstrates the publishing system. A broader
              course and systematic literature review follow in later
              milestones.
            </p>
            <Link className="text-link" href="/learn">
              Review the learning path <span aria-hidden="true">→</span>
            </Link>
          </article>
          <article>
            <StatusPill tone="planned">Planned</StatusPill>
            <h3>Interactive analysis and benchmarks</h3>
            <p>
              Catalog downloads, critical-path inspection, partition metrics,
              and algorithm comparisons require audited datasets and engines.
            </p>
            <Link className="text-link" href="/benchmarks">
              Understand the comparison contract{" "}
              <span aria-hidden="true">→</span>
            </Link>
          </article>
        </div>
      </section>

      <section
        className="community-cta shell section"
        aria-labelledby="community-title"
      >
        <div>
          <span className="eyebrow">Built in the open</span>
          <h2 id="community-title">
            Bring another model, dataset, or objection.
          </h2>
        </div>
        <div>
          <p>
            Contributions are reviewed for reproducibility, provenance,
            licensing, accessibility, and the limits of their claims.
            Disagreement is useful when its assumptions remain visible.
          </p>
          <Link className="button button-primary" href="/about#contribute">
            How to contribute <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
