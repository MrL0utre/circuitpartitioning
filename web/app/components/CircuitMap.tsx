const columns = [
  { label: "Inputs", nodes: ["a", "b", "c"] },
  { label: "Logic", nodes: ["u₁", "u₂", "u₃"] },
  { label: "State", nodes: ["r₁", "r₂"] },
];

export function CircuitMap() {
  return (
    <figure className="circuit-map" aria-labelledby="map-title map-caption">
      <div className="map-toolbar">
        <div>
          <span className="map-kicker">Inspectable model</span>
          <strong id="map-title">Signal-flow profile</strong>
        </div>
        <span className="map-live">
          <span aria-hidden="true" /> contract v1 draft
        </span>
      </div>
      <div className="map-stage">
        {columns.map((column, columnIndex) => (
          <div className="map-column" key={column.label}>
            <span>{column.label}</span>
            {column.nodes.map((node, nodeIndex) => (
              <div
                className={`map-node ${columnIndex === 2 ? "map-node-state" : ""}`}
                key={node}
              >
                {node}
                {columnIndex < columns.length - 1 && nodeIndex < 2 ? (
                  <span className="map-arrow" aria-hidden="true">
                    →
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div
        className="map-metrics"
        aria-label="Illustrative analysis dimensions"
      >
        <span>
          <b>cut</b> boundary flow
        </span>
        <span>
          <b>timing</b> path delay
        </span>
        <span>
          <b>balance</b> resource load
        </span>
      </div>
      <figcaption id="map-caption">
        A schematic teaching view. Published analyses will link every metric to
        its model, input fingerprint, and engine version.
      </figcaption>
    </figure>
  );
}
