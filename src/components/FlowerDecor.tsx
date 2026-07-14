/* Floral side decorations — rendered as absolute SVG overlays */

function WhiteLily({ x, y, rotate = 0, scale = 1 }: { x: number; y: number; rotate?: number; scale?: number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate}) scale(${scale})`}>
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <ellipse key={a} cx={0} cy={-18} rx={4} ry={18} fill="white" opacity={0.88}
          transform={`rotate(${a})`} />
      ))}
      <circle cx={0} cy={0} r={5} fill="#f0d060" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <line key={a} x1={0} y1={0}
          x2={Math.cos((a - 90) * Math.PI / 180) * 8}
          y2={Math.sin((a - 90) * Math.PI / 180) * 8}
          stroke="#d4a017" strokeWidth={0.8} />
      ))}
    </g>
  );
}

function RedOrchid({ x, y, rotate = 0, scale = 1 }: { x: number; y: number; rotate?: number; scale?: number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate}) scale(${scale})`}>
      <ellipse cx={0} cy={0} rx={14} ry={9} fill="#7a1422" opacity={0.92} />
      <ellipse cx={0} cy={0} rx={9} ry={14} fill="#7a1422" opacity={0.92} />
      <ellipse cx={-8} cy={-8} rx={7} ry={4} fill="#6b1020" opacity={0.85} transform="rotate(-45)" />
      <ellipse cx={8} cy={-8} rx={7} ry={4} fill="#6b1020" opacity={0.85} transform="rotate(45)" />
      <circle cx={0} cy={0} r={4} fill="#c0392b" />
      <circle cx={0} cy={0} r={2} fill="#e74c3c" />
    </g>
  );
}

function Leaf({ x, y, rotate = 0, scale = 1 }: { x: number; y: number; rotate?: number; scale?: number }) {
  return (
    <ellipse cx={x} cy={y} rx={5} ry={18} fill="#3a5a10" opacity={0.7}
      transform={`rotate(${rotate},${x},${y}) scale(${scale})`} />
  );
}

function HydrangeaCluster({ x, y }: { x: number; y: number }) {
  const offsets = [
    [0, 0], [8, -6], [-6, -8], [10, 8], [-8, 6], [2, -14],
  ];
  return (
    <g transform={`translate(${x},${y})`}>
      {offsets.map(([dx, dy], i) => (
        <circle key={i} cx={dx} cy={dy} r={7} fill="#c8d5a0" opacity={0.55} />
      ))}
    </g>
  );
}

/* Left-side flower cluster */
export function FlowerLeft({ top = true }: { top?: boolean }) {
  return (
    <svg
      width="90" height="220"
      viewBox="0 0 90 220"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute left-0 ${top ? "top-0" : "bottom-0"} pointer-events-none select-none`}
      style={{ zIndex: 2 }}
    >
      <Leaf x={30} y={50} rotate={-20} />
      <Leaf x={15} y={90} rotate={10} />
      <Leaf x={45} y={130} rotate={-30} />
      <HydrangeaCluster x={50} y={170} />
      <RedOrchid x={55} y={60} scale={0.9} />
      <RedOrchid x={30} y={120} scale={0.75} rotate={15} />
      <WhiteLily x={20} y={30} scale={0.9} rotate={-10} />
      <WhiteLily x={55} y={100} scale={0.8} rotate={10} />
      <WhiteLily x={35} y={180} scale={0.7} rotate={5} />
      {/* Vine */}
      <path d="M5,0 Q20,60 10,120 Q0,180 15,220" stroke="#4a7a20" strokeWidth={1.5}
        fill="none" opacity={0.6} />
    </svg>
  );
}

/* Right-side flower cluster (mirrored) */
export function FlowerRight({ top = true }: { top?: boolean }) {
  return (
    <svg
      width="90" height="220"
      viewBox="0 0 90 220"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute right-0 ${top ? "top-0" : "bottom-0"} pointer-events-none select-none`}
      style={{ zIndex: 2, transform: "scaleX(-1)" }}
    >
      <Leaf x={30} y={50} rotate={-20} />
      <Leaf x={15} y={90} rotate={10} />
      <Leaf x={45} y={130} rotate={-30} />
      <HydrangeaCluster x={50} y={170} />
      <RedOrchid x={55} y={60} scale={0.9} />
      <RedOrchid x={30} y={120} scale={0.75} rotate={15} />
      <WhiteLily x={20} y={30} scale={0.9} rotate={-10} />
      <WhiteLily x={55} y={100} scale={0.8} rotate={10} />
      <WhiteLily x={35} y={180} scale={0.7} rotate={5} />
      <path d="M5,0 Q20,60 10,120 Q0,180 15,220" stroke="#4a7a20" strokeWidth={1.5}
        fill="none" opacity={0.6} />
    </svg>
  );
}
