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
    title: "Foundations",
    text: "From circuits to partitioning instances, feasibility, and objective families.",
    status: "Available",
    tone: "available" as const,
    href: "/learn/foundations",
  },
  {
    number: "02",
    title: "Graphs, hypergraphs & netlists",
    text: "Compare what each representation preserves and hides.",
    status: "Planned",
    tone: "planned" as const,
  },
  {
    number: "03",
    title: "Synchronous timing",
    text: "Follow paths through combinational regions and state boundaries.",
    status: "Planned",
    tone: "planned" as const,
  },
  {
    number: "04",
    title: "Objectives & constraints",
    text: "Cut, balance, timing, capacity, placement, and multi-objective trade-offs.",
    status: "Planned",
    tone: "planned" as const,
  },
  {
    number: "05",
    title: "Algorithm families",
    text: "Constructive, iterative, multilevel, evolutionary, and exact approaches.",
    status: "Planned",
    tone: "planned" as const,
  },
  {
    number: "06",
    title: "Reproducible evaluation",
    text: "Turn an algorithm run into inspectable scientific evidence.",
    status: "Planned",
    tone: "planned" as const,
  },
];

export default function LearnPage() {
  return (
    <>
      <PageHeader
        eyebrow="Course"
        title="Learn the problem before comparing solutions."
        intro="A progressive, model-aware course for students, engineers, and researchers entering circuit partitioning from different backgrounds."
        status={{ label: "First lesson available", tone: "progress" }}
      />
      <section
        className="shell section course-intro"
        aria-labelledby="course-design-title"
      >
        <div>
          <span className="eyebrow">Course design</span>
          <h2 id="course-design-title">
            Definitions stay close to their assumptions.
          </h2>
        </div>
        <div className="prose-summary">
          <p>
            Every module states prerequisites, learning outcomes, model scope,
            and sources. Exercises and interactive diagrams will be added only
            when their answers can be independently checked.
          </p>
          <p>
            The course begins with general partitioning concepts, then
            introduces the red–black directed hypergraph profile as one concrete
            lens.
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
          <span className="eyebrow eyebrow-light">Suggested prerequisites</span>
          <h2>Enough graph theory to ask precise questions.</h2>
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
