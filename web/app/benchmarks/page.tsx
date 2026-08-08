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
        eyebrow="Experimental evaluation"
        title="Protocol for reproducible algorithm comparison"
        intro="A benchmark result is interpreted from its circuit, model, target topology, parameters, feasibility status, metric definitions, and computational environment. These elements are retained with every published run."
        status={{ label: "Data UI planned", tone: "planned" }}
      />
      <section
        className="shell section benchmark-principles"
        aria-labelledby="benchmark-title"
      >
        <div>
          <span className="eyebrow">1 · Comparability conditions</span>
          <h2 id="benchmark-title">Conditions applied before comparison</h2>
          <p>
            Runs are grouped only when their model profiles, objective
            definitions, resource constraints, and computational contexts permit
            direct comparison. Incompatible runs remain available but are not
            combined in an unqualified ranking.
          </p>
        </div>
        <ol>
          <li>
            <b>01</b>
            <span>
              <strong>Identify</strong> input fingerprints and dataset
              provenance
            </span>
          </li>
          <li>
            <b>02</b>
            <span>
              <strong>Validate</strong> feasibility and metric semantics
            </span>
          </li>
          <li>
            <b>03</b>
            <span>
              <strong>Contextualize</strong> parameters, seed, budget, and
              machine
            </span>
          </li>
          <li>
            <b>04</b>
            <span>
              <strong>Compare</strong> distributions, trade-offs, and baselines
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
              <span className="eyebrow eyebrow-light">2 · Results table</span>
              <h2 id="preview-title">Current publication state</h2>
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
                      Validated CSV rows will be converted into canonical
                      benchmark-run records when the benchmark pipeline is
                      implemented.
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
          <span className="eyebrow">3 · Reported quantities</span>
          <h2 id="metric-title">Metrics retained for each run</h2>
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
