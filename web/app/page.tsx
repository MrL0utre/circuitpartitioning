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
    title: "Definitions and models",
    body: "Introduce circuit representations, feasibility conditions, and objective functions before considering algorithms.",
    href: "/learn",
    link: "Consult the course structure",
  },
  {
    index: "02",
    title: "Literature and methods",
    body: "Classify contributions by representation, problem formulation, objective, method, and experimental evidence.",
    href: "/research",
    link: "Consult the research map",
  },
  {
    index: "03",
    title: "Experimental evaluation",
    body: "Compare runs only when their inputs, conventions, parameters, and computational conditions are identified.",
    href: "/benchmarks",
    link: "Consult the benchmark protocol",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow-row">
            <span className="eyebrow">Scientific information system</span>
            <StatusPill tone="available">Foundation available</StatusPill>
          </div>
          <h1 id="hero-title">
            Circuit partitioning: models, methods, and evidence.
          </h1>
          <p className="hero-lede">
            Circuit partitioning assigns the elements of a circuit to a finite
            set of parts under structural, capacity, and timing constraints.
            This portal presents the definitions, research methods, datasets,
            and reproducible results required to study that family of problems.
          </p>
          <div className="button-row">
            <Link className="button button-primary" href="/learn/foundations">
              Read the introductory chapter <span aria-hidden="true">→</span>
            </Link>
            <Link className="button button-secondary" href="/about">
              Scope and editorial policy
            </Link>
          </div>
          <dl className="hero-facts" aria-label="Current foundation">
            <div>
              <dt>4</dt>
              <dd>formal data contracts</dd>
            </div>
            <div>
              <dt>1</dt>
              <dd>implemented model profile</dd>
            </div>
            <div>
              <dt>Open</dt>
              <dd>review and contribution process</dd>
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
          <span className="eyebrow">1 · Scope and organization</span>
          <h2 id="pathway-title">Three coordinated parts of the portal.</h2>
          <p>
            The organization follows the principal activities of scientific
            study: definition of the problem, examination of the literature, and
            evaluation of experimental results. It does not reproduce the
            structure of a single publication.
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
            <span className="eyebrow eyebrow-light">
              2 · Model-dependent interpretation
            </span>
            <h2 id="model-title">
              A result is meaningful only with its representation.
            </h2>
          </div>
          <div className="model-copy">
            <p>
              Graphs, hypergraphs, netlists, timing models, and placement models
              do not preserve the same information. Every definition and result
              must therefore identify the representation to which it applies.
            </p>
            <p>
              The red-black directed hypergraph is the first implemented
              profile. It provides a concrete model for timing-aware examples,
              but it is neither a universal circuit model nor a criterion for
              selecting contributions.
            </p>
            <Link className="text-link text-link-light" href="/research">
              Review the classification method <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section
        className="readiness shell section"
        aria-labelledby="readiness-title"
      >
        <div className="section-heading compact-heading">
          <span className="eyebrow">3 · Present state</span>
          <h2 id="readiness-title">
            Implemented, in preparation, and deferred work.
          </h2>
        </div>
        <div className="readiness-grid">
          <article>
            <StatusPill tone="available">Available now</StatusPill>
            <h3>Conventions and data contracts</h3>
            <p>
              The initial convention profile, versioned schemas, reference
              instance, and semantic validation procedure are available for
              inspection.
            </p>
            <Link className="text-link" href="/circuits">
              Inspect the reference instance <span aria-hidden="true">→</span>
            </Link>
          </article>
          <article>
            <StatusPill tone="progress">In progress</StatusPill>
            <h3>Course and literature protocol</h3>
            <p>
              The introductory chapter is available. The remaining course and
              the systematic literature-review protocol are being prepared.
            </p>
            <Link className="text-link" href="/learn">
              Review the course structure <span aria-hidden="true">→</span>
            </Link>
          </article>
          <article>
            <StatusPill tone="planned">Planned</StatusPill>
            <h3>Catalog analysis and benchmark results</h3>
            <p>
              Circuit downloads, independent metric computation, and algorithm
              comparisons remain deferred until datasets and analysis engines
              have been audited.
            </p>
            <Link className="text-link" href="/benchmarks">
              Review the comparison protocol <span aria-hidden="true">→</span>
            </Link>
          </article>
        </div>
      </section>

      <section
        className="community-cta shell section"
        aria-labelledby="community-title"
      >
        <div>
          <span className="eyebrow">4 · Scientific contributions</span>
          <h2 id="community-title">Contributions are evaluated by method.</h2>
        </div>
        <div>
          <p>
            A proposed model, dataset, correction, or experimental result must
            state its scope and provenance. Review considers reproducibility,
            licensing, accessibility, and compatibility with the declared
            scientific conventions.
          </p>
          <Link className="button button-primary" href="/about#contribute">
            Contribution procedure <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
