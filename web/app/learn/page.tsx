import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "../components/PageHeader";
import { StatusPill } from "../components/StatusPill";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "A structured learning path through circuit partitioning models, objectives, algorithms, and evidence.",
  alternates: { canonical: "/learn" },
};

const modules = [
  {
    number: "01",
    title: "Definitions and objectives",
    text: "Circuit representations, partitioning instances, feasibility conditions, and objective functions.",
    status: "Available",
    tone: "available" as const,
    href: "/learn/foundations",
  },
  {
    number: "02",
    title: "Graphs, hypergraphs, and netlists",
    text: "Definitions, directed connectivity, incidence, and information preserved by each representation.",
    status: "Planned",
    tone: "planned" as const,
  },
  {
    number: "03",
    title: "Synchronous circuits and timing",
    text: "Registers, combinational regions, red-to-red paths, delays, and critical-path computation.",
    status: "Planned",
    tone: "planned" as const,
  },
  {
    number: "04",
    title: "Partitions, mappings, and metrics",
    text: "Capacity constraints, cut, connectivity, balance, timing, placement, and multi-objective formulations.",
    status: "Planned",
    tone: "planned" as const,
  },
  {
    number: "05",
    title: "Partitioning algorithms",
    text: "Initial partitioning, local refinement, multilevel schemes, metaheuristics, and exact methods.",
    status: "Planned",
    tone: "planned" as const,
  },
  {
    number: "06",
    title: "Experimental methodology",
    text: "Instances, parameters, computational budgets, repeated runs, metrics, and reproducibility records.",
    status: "Planned",
    tone: "planned" as const,
  },
];

export default function LearnPage() {
  return (
    <>
      <PageHeader
        eyebrow="Course structure"
        title="Course on circuit partitioning"
        intro="This course introduces the mathematical representations, constraints, objective functions, algorithms, and experimental methods used in circuit partitioning. Each chapter states the model to which its definitions apply."
        status={{ label: "First lesson available", tone: "progress" }}
      />
      <section
        className="shell section course-intro"
        aria-labelledby="course-design-title"
      >
        <div>
          <span className="eyebrow">1 · Scope and method</span>
          <h2 id="course-design-title">Notation precedes interpretation.</h2>
        </div>
        <div className="prose-summary">
          <p>
            Each chapter states its purpose, prerequisites, notation, learning
            objectives, model assumptions, and primary sources. Definitions are
            introduced before algorithms or comparative statements.
          </p>
          <p>
            The course begins with general partitioning concepts. The red-black
            directed hypergraph is then used as one explicit profile for timing
            examples and is compared with alternative circuit representations.
          </p>
        </div>
      </section>
      <section className="shell module-list" aria-label="Course modules">
        {modules.map((module) => (
          <article className="module-row" key={module.number}>
            <span className="module-number">{module.number}</span>
            <div>
              <h2>{module.title}</h2>
              <p>{module.text}</p>
            </div>
            <StatusPill tone={module.tone}>{module.status}</StatusPill>
            {module.href ? (
              <Link
                className="module-link"
                href={module.href}
                aria-label={`Open ${module.title}`}
              >
                Open <span aria-hidden="true">→</span>
              </Link>
            ) : (
              <span className="module-link module-link-muted">Queued</span>
            )}
          </article>
        ))}
      </section>
      <section className="shell section prerequisite-band">
        <div>
          <span className="eyebrow eyebrow-light">2 · Prerequisites</span>
          <h2>Recommended preliminary knowledge</h2>
        </div>
        <ul>
          <li>directed graphs and hypergraphs</li>
          <li>basic synchronous circuit timing</li>
          <li>optimization objectives and constraints</li>
        </ul>
      </section>
    </>
  );
}
