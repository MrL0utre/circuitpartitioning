export function Note({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <aside className="science-note" aria-label={title}>
      <strong>{title}</strong>
      <div>{children}</div>
    </aside>
  );
}

export function Pseudocode({ steps }: { steps: string[] }) {
  return (
    <figure className="pseudocode">
      <figcaption>Feasibility-first evaluation</figcaption>
      <ol>
        {steps.map((step, index) => (
          <li key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {step}
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function ModelProfileFigure() {
  return (
    <figure className="model-figure">
      <div
        className="model-figure-stage"
        role="img"
        aria-label="A directed hypergraph schematic with three black combinational vertices and two coral red state vertices connected from left to right."
      >
        <span className="figure-node black-node">v₁</span>
        <span className="figure-edge" aria-hidden="true">
          →
        </span>
        <span className="figure-node black-node">v₂</span>
        <span className="figure-edge" aria-hidden="true">
          →
        </span>
        <span className="figure-node red-node">r₁</span>
        <span className="figure-edge" aria-hidden="true">
          →
        </span>
        <span className="figure-node black-node">v₃</span>
        <span className="figure-edge" aria-hidden="true">
          →
        </span>
        <span className="figure-node red-node">r₂</span>
      </div>
      <figcaption>
        <b>Figure 1.</b> The initial red–black profile distinguishes
        combinational vertices from state boundaries. Other model profiles may
        encode these semantics differently.
      </figcaption>
    </figure>
  );
}
