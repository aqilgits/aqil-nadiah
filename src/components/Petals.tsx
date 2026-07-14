/* ── Drifting petals — global fixed overlay ─────────── */
const PETALS = [
  { left: "6%",  size: 9,  dur: 12, delay: 0 },
  { left: "17%", size: 6,  dur: 15, delay: 3.5 },
  { left: "29%", size: 11, dur: 10, delay: 6.5 },
  { left: "41%", size: 7,  dur: 14, delay: 1.5 },
  { left: "52%", size: 9,  dur: 11, delay: 8 },
  { left: "63%", size: 6,  dur: 16, delay: 4 },
  { left: "74%", size: 10, dur: 12, delay: 2 },
  { left: "85%", size: 7,  dur: 14, delay: 7 },
  { left: "93%", size: 8,  dur: 13, delay: 5 },
];

export default function Petals() {
  return (
    <div className="petal-layer" aria-hidden="true">
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: p.left,
            top: 0,
            width: p.size,
            height: p.size * 1.2,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
