import type { Metadata } from "next";
import Link from "next/link";
import Content from "./content.mdx";

export const metadata: Metadata = {
  title: "Definitions and objectives for circuit partitioning",
  description:
    "Definitions of circuit partitioning instances, the initial red-black model profile, feasibility, and objective functions.",
  alternates: { canonical: "/learn/foundations" },
};

export default function FoundationsPage() {
  return (
    <div className="lesson-layout shell">
      <aside className="lesson-sidebar" aria-label="Lesson information">
        <Link href="/learn">← Course map</Link>
        <span className="eyebrow">Module 01</span>
        <strong>Definitions and objectives</strong>
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
            <dd>2026-08-08</dd>
          </div>
        </dl>
        <nav aria-label="On this page">
          <a href="#problem">Partitioning instance</a>
          <a href="#model">Initial model profile</a>
          <a href="#objectives">Feasibility and objectives</a>
          <a href="#references">References and scope</a>
        </nav>
      </aside>
      <article className="lesson prose">
        <Content />
      </article>
    </div>
  );
}
