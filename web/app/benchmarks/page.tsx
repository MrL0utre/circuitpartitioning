import type { Metadata } from "next";
import { PageHeader } from "../components/PageHeader";
import { StatusPill } from "../components/StatusPill";

export const metadata: Metadata = {
  title: "Benchmarks",
  description:
    "The reproducibility contract for future circuit partitioning benchmark results.",
  alternates: { canonical: "/benchmarks" },
};

const columns = [
  "Algorithm",
  "Circuit",
  "Model",
  "Feasible",
  "Cut",
  "Path",
  "Runtime",
];

export default function BenchmarksPage() {
  return (
    <>
      <PageHeader
        eyebrow="Benchmarks"
        title="A result is more than one number."
        intro="Future comparisons will preserve inputs, parameters, feasibility, metric definitions, runtime context, and uncertainty—not just a winning score."
        status={{ label: "Data UI planned", tone: "planned" }}
      />
      <section
        className="shell section benchmark-principles"
        aria-labelledby="benchmark-title"
      >
        <div>
          <span className="eyebrow">Comparison contract</span>
          <h2 id="benchmark-title">
            Comparable only where assumptions overlap.
          </h2>
          <p>
            Filtering happens before ranking. Runs with different model
            profiles, objective definitions, resource limits, or hardware
            contexts are never silently placed on one leaderboard.
          </p>
        </div>
        <ol>
          <li>
            <b>01</b>
            <span>
              <strong>Identify</strong>Input fingerprints and dataset provenance
            </span>
          </li>
          <li>
            <b>02</b>
            <span>
              <strong>Validate</strong>Feasibility and metric semantics
            </span>
          </li>
          <li>
            <b>03</b>
            <span>
              <strong>Contextualize</strong>Parameters, seed, budget, and
              machine
            </span>
          </li>
          <li>
            <b>04</b>
            <span>
              <strong>Compare</strong>Distributions, trade-offs, and baselines
            </span>
          </li>
        </ol>
      </section>
      <section
        className="benchmark-preview section"
        aria-labelledby="preview-title"
      >
        <div className="shell">
          <div className="section-heading compact-heading">
            <div>
              <span className="eyebrow eyebrow-light">Interface preview</span>
              <h2 id="preview-title">
                The table shape is ready; results are not fabricated.
              </h2>
            </div>
            <StatusPill tone="planned">Awaiting audited runs</StatusPill>
          </div>
          <div
            className="table-shell"
            role="region"
            aria-label="Planned benchmark table preview"
            tabIndex={0}
          >
            <table>
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th scope="col" key={column}>
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={columns.length}>
                    <strong>No published runs yet.</strong>
                    <span>
                      Milestone 6 will ingest validated CSV rows into canonical
                      benchmark-run records.
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section
        className="shell section metric-grid"
        aria-labelledby="metric-title"
      >
        <div className="section-heading compact-heading">
          <span className="eyebrow">Reported dimensions</span>
          <h2 id="metric-title">Keep the trade-off surface visible.</h2>
        </div>
        <div>
          <article>
            <span>Quality</span>
            <h3>Cut & communication</h3>
            <p>
              Declared definitions, topology assumptions, and recomputed values.
            </p>
          </article>
          <article>
            <span>Timing</span>
            <h3>Critical path</h3>
            <p>Path scope, delay model, units, and engine version.</p>
          </article>
          <article>
            <span>Resources</span>
            <h3>Balance & capacity</h3>
            <p>Per-resource utilization and explicit feasibility margins.</p>
          </article>
          <article>
            <span>Cost</span>
            <h3>Runtime & budget</h3>
            <p>Wall time, CPU time, memory, stopping rule, and repetitions.</p>
          </article>
        </div>
      </section>
    </>
  );
}
