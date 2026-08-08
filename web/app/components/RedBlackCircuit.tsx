type RedBlackCircuitDiagramProps = {
  idPrefix: string;
  annotatePaths?: boolean;
  className?: string;
};

export function RedBlackCircuitDiagram({
  idPrefix,
  annotatePaths = false,
  className = "",
}: RedBlackCircuitDiagramProps) {
  const arrowId = `${idPrefix}-arrow`;
  const titleId = `${idPrefix}-title`;
  const descriptionId = `${idPrefix}-description`;

  return (
    <svg
      className={`red-black-circuit ${className}`.trim()}
      viewBox="0 0 640 300"
      role="img"
      aria-labelledby={`${titleId} ${descriptionId}`}
      focusable="false"
    >
      <title id={titleId}>Red-to-red combinational timing paths</title>
      <desc id={descriptionId}>
        A red source register branches to two paths. The short path crosses one
        black combinational vertex. The critical path crosses two black
        combinational vertices. Both paths finish at the same red sink register.
      </desc>
      <defs>
        <marker
          id={arrowId}
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="diagram-arrowhead" />
        </marker>
      </defs>

      <g className="diagram-edges" aria-hidden="true">
        <path d="M 82 138 H 145" className="diagram-edge" />
        <path
          d="M 145 138 C 178 138, 205 78, 274 78"
          className="diagram-edge"
          markerEnd={`url(#${arrowId})`}
        />
        <path
          d="M 145 138 C 178 138, 188 212, 229 212"
          className="diagram-edge diagram-edge-critical"
          markerEnd={`url(#${arrowId})`}
        />
        <path
          d="M 296 78 C 408 78, 478 138, 558 138"
          className="diagram-edge"
          markerEnd={`url(#${arrowId})`}
        />
        <path
          d="M 251 212 H 399"
          className="diagram-edge diagram-edge-critical"
          markerEnd={`url(#${arrowId})`}
        />
        <path
          d="M 421 212 C 492 212, 500 138, 558 138"
          className="diagram-edge diagram-edge-critical"
          markerEnd={`url(#${arrowId})`}
        />
        <circle cx="145" cy="138" r="3.5" className="diagram-junction" />
      </g>

      <g aria-hidden="true">
        <circle
          cx="70"
          cy="138"
          r="12"
          className="diagram-vertex diagram-vertex-red"
          data-vertex-color="red"
          data-path-boundary="source"
        />
        <circle
          cx="285"
          cy="78"
          r="10"
          className="diagram-vertex diagram-vertex-black"
          data-vertex-color="black"
        />
        <circle
          cx="240"
          cy="212"
          r="10"
          className="diagram-vertex diagram-vertex-black"
          data-vertex-color="black"
        />
        <circle
          cx="410"
          cy="212"
          r="10"
          className="diagram-vertex diagram-vertex-black"
          data-vertex-color="black"
        />
        <circle
          cx="570"
          cy="138"
          r="12"
          className="diagram-vertex diagram-vertex-red"
          data-vertex-color="red"
          data-path-boundary="sink"
        />
      </g>

      <g className="diagram-labels" aria-hidden="true">
        <text x="42" y="112" className="diagram-node-label">
          r_in
        </text>
        <text x="30" y="177" className="diagram-role-label">
          source register
        </text>
        <text x="268" y="52" className="diagram-node-label">
          fast
        </text>
        <text x="210" y="245" className="diagram-node-label">
          slow_a
        </text>
        <text x="381" y="245" className="diagram-node-label">
          slow_b
        </text>
        <text x="553" y="112" className="diagram-node-label">
          r_out
        </text>
        <text x="530" y="177" className="diagram-role-label">
          sink register
        </text>
        <text x="151" y="125" className="diagram-arc-label">
          a_input
        </text>
      </g>

      {annotatePaths ? (
        <g className="diagram-annotations" aria-hidden="true">
          <text x="330" y="48" className="diagram-path-label">
            short path · 1 ns
          </text>
          <text x="310" y="278" className="diagram-path-label critical">
            critical path · 3 ns
          </text>
        </g>
      ) : null}
    </svg>
  );
}
