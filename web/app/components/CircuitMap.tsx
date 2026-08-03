import { RedBlackCircuitDiagram } from "./RedBlackCircuit";

export function CircuitMap() {
  return (
    <figure className="circuit-map" aria-labelledby="map-title map-caption">
      <div className="map-toolbar">
        <div>
          <span className="map-kicker">Inspectable model</span>
          <strong id="map-title">Red-to-red timing region</strong>
        </div>
        <span className="map-live">
          <span aria-hidden="true" /> contract v1 draft
        </span>
      </div>
      <div className="map-stage">
        <RedBlackCircuitDiagram idPrefix="home-red-black" annotatePaths />
        <ul className="map-legend" aria-label="Vertex color legend">
          <li>
            <i className="legend-red" aria-hidden="true" /> red · register or
            I/O boundary
          </li>
          <li>
            <i className="legend-black" aria-hidden="true" /> black ·
            combinational resource
          </li>
        </ul>
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
        A schematic teaching view derived from the reference fixture. Both paths
        start and end at red boundaries; their internal vertices are black.
        Published analyses will link every metric to its model, input
        fingerprint, and engine version.
      </figcaption>
    </figure>
  );
}
