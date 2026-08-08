import { RedBlackCircuitDiagram } from "./RedBlackCircuit";

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
      <div className="model-figure-stage">
        <RedBlackCircuitDiagram idPrefix="foundation-red-black" />
      </div>
      <figcaption>
        <b>Figure 1.</b> Every combinational timing path in the initial profile
        starts at a red register boundary, crosses only black internal vertices,
        and ends at the next red register boundary. Other profiles may encode
        these semantics differently.
      </figcaption>
    </figure>
  );
}
