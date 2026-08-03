import type { Metadata } from "next";
import Link from "next/link";
import Content from "./content.mdx";

export const metadata: Metadata = {
  title: "Circuit partitioning foundations",
  description:
    "An accessible introduction to circuit partitioning models, feasibility, and objective functions.",
  alternates: { canonical: "/learn/foundations" },
};

export default function FoundationsPage() {
  return (
    <div className="lesson-layout shell">
      <aside className="lesson-sidebar" aria-label="Lesson information">
        <Link href="/learn">← Course map</Link>
        <span className="eyebrow">Module 01</span>
        <strong>Foundations</strong>
        <dl>
          <div>
            <dt>Level</dt>
            <dd>Introductory</dd>
          </div>
          <div>
            <dt>Reading</dt>
            <dd>12 minutes</dd>
          </div>
          <div>
            <dt>Reviewed</dt>
            <dd>2026-08-03</dd>
          </div>
        </dl>
        <nav aria-label="On this page">
          <a href="#problem">The problem</a>
          <a href="#model">Model boundary</a>
          <a href="#objectives">Objectives</a>
          <a href="#references">References</a>
        </nav>
      </aside>
      <article className="lesson prose">
        <Content />
      </article>
    </div>
  );
}
