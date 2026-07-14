/* ── Monogram ─────────────────────────────────────── */
function Monogram() {
  return (
    <div className="relative w-28 h-28 flex items-center justify-center cover-enter cover-enter-2">
      <svg viewBox="0 0 112 112" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <circle cx="56" cy="56" r="53" fill="white" />
        <circle cx="56" cy="56" r="51" fill="none" stroke="#7c4fb0" strokeWidth="1" />
        <circle cx="56" cy="56" r="47" fill="none" stroke="#7c4fb0" strokeWidth="0.4" opacity="0.5" />
        {/* Small corner dots */}
        {[45, 135, 225, 315].map((deg, i) => {
          const r = 49;
          const x = 56 + r * Math.cos((deg * Math.PI) / 180);
          const y = 56 + r * Math.sin((deg * Math.PI) / 180);
          return <circle key={i} cx={x} cy={y} r="1.5" fill="#7c4fb0" opacity="0.7" />;
        })}
      </svg>
      <div className="relative z-10 text-center leading-none">
        <p className="font-playfair text-[#382650] text-[2.6rem] italic font-light tracking-tight">
          N<span className="text-[#7c4fb0] text-base not-italic mx-0.5">&amp;</span>A
        </p>
        {/* Wheat sprig */}
        <svg viewBox="0 0 40 14" width="40" height="14" className="mx-auto mt-0.5">
          <line x1="20" y1="14" x2="20" y2="0" stroke="#7c4fb0" strokeWidth="1" />
          {[-7, -4, -1, 2, 5].map((y, i) => (
            <ellipse key={i} cx={i % 2 === 0 ? 16 : 24} cy={14 + y}
              rx="3" ry="5" fill="#7c4fb0" opacity="0.75"
              transform={`rotate(${i % 2 === 0 ? -35 : 35},${i % 2 === 0 ? 16 : 24},${14 + y})`} />
          ))}
        </svg>
      </div>
    </div>
  );
}

/* ── Thin ruled line ────────────────────────────── */
function ThinRule() {
  return (
    <div className="flex items-center gap-3 w-full max-w-[180px] mx-auto">
      <div className="flex-1 h-px bg-[#7c4fb0] opacity-30" />
      <div className="w-1 h-1 rounded-full bg-[#7c4fb0] opacity-60" />
      <div className="flex-1 h-px bg-[#7c4fb0] opacity-30" />
    </div>
  );
}

/* ── Cover ─────────────────────────────────────── */
export default function Cover() {
  return (
    <section
      className="floral-section min-h-dvh flex flex-col items-center overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 90% 60% at 50% 22%, #efe4fb 0%, #f7f3fb 55%, #efe8f7 100%)",
      }}
    >
      <div className="relative z-10 flex flex-col items-center text-center px-12 pt-30 pb-4 w-full">

        {/* Eyebrow */}
        <p className="cover-enter cover-enter-1 text-[#7c4fb0] tracking-[0.55em] text-[8.5px] uppercase font-lato mb-5">
          Raikan Cinta
        </p>

        <div className="cover-enter cover-enter-1 w-full flex justify-center mb-6">
          <ThinRule />
        </div>

        <Monogram />

        {/* Names — letterpress scale */}
        <h1
          className="cover-enter cover-enter-3 font-script text-[#382650] mt-5 leading-[0.88]"
          style={{ fontSize: "clamp(3.8rem, 18vw, 5.6rem)" }}
        >
          Nadiah
        </h1>
        <p className="cover-enter cover-enter-3 font-playfair text-[#7c4fb0] text-xl italic tracking-wide my-1">
          &amp;
        </p>
        <h1
          className="cover-enter cover-enter-3 font-script text-[#382650] leading-[0.88]"
          style={{ fontSize: "clamp(3.8rem, 18vw, 5.6rem)" }}
        >
          Aqil
        </h1>

        <div className="cover-enter cover-enter-4 w-full flex justify-center mt-5 mb-4">
          <ThinRule />
        </div>

        {/* Date */}
        <p className="cover-enter cover-enter-4 font-lato text-[#382650] text-[10px] tracking-[0.38em] uppercase">
          Ahad &nbsp;·&nbsp; 30 Ogos 2026
        </p>
        <p className="cover-enter cover-enter-5 text-[#7c4fb0] text-[8px] tracking-[0.42em] mt-2 font-lato">
          #AqilLoveNadiah
        </p>
      </div>
    </section>
  );
}
