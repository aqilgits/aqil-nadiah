/* ── Monogram ─────────────────────────────────────── */
function Monogram() {
  return (
    <div className="relative w-28 h-28 flex items-center justify-center cover-enter cover-enter-2">
      {/* Modern Diamond Border */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[84px] h-[84px] rotate-45 border border-[#cf8c9a] opacity-40 absolute" />
        <div className="w-[76px] h-[76px] rotate-45 border border-[#cf8c9a] absolute" />
      </div>

      <div className="relative z-10 text-center leading-none mt-2">
        <p className="font-playfair text-[#4a3036] text-[2.4rem] italic font-light tracking-widest flex items-center gap-1.5">
          A<span className="text-[#cf8c9a] text-xl not-italic font-lato">&amp;</span>N
        </p>
      </div>
    </div>
  );
}

/* ── Thin ruled line ────────────────────────────── */
function ThinRule() {
  return (
    <div className="flex items-center gap-3 w-full max-w-[180px] mx-auto">
      <div className="flex-1 h-px bg-[#cf8c9a] opacity-30" />
      <div className="w-1 h-1 rounded-full bg-[#cf8c9a] opacity-60" />
      <div className="flex-1 h-px bg-[#cf8c9a] opacity-30" />
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
          "radial-gradient(ellipse 90% 60% at 50% 22%, #faeff1 0%, #ffffff 55%, #fdf6f7 100%)",
      }}
    >
      <div className="relative z-10 flex flex-col items-center text-center px-12 pt-30 pb-4 w-full">

        {/* Eyebrow */}
        <p className="cover-enter cover-enter-1 text-[#cf8c9a] tracking-[0.55em] text-[8.5px] uppercase font-lato mb-5">
          Raikan Cinta
        </p>

        <div className="cover-enter cover-enter-1 w-full flex justify-center mb-6">
          <ThinRule />
        </div>

        <Monogram />

        {/* Names — letterpress scale */}
        <h1
          className="cover-enter cover-enter-3 font-script text-[#4a3036] mt-5 leading-[0.88]"
          style={{ fontSize: "clamp(3.8rem, 18vw, 5.6rem)" }}
        >
          Aqil
        </h1>
        <p className="cover-enter cover-enter-3 font-playfair text-[#cf8c9a] text-xl italic tracking-wide my-1">
          &amp;
        </p>
        <h1
          className="cover-enter cover-enter-3 font-script text-[#4a3036] leading-[0.88]"
          style={{ fontSize: "clamp(3.8rem, 18vw, 5.6rem)" }}
        >
          Nadiah
        </h1>

        <div className="cover-enter cover-enter-4 w-full flex justify-center mt-5 mb-4">
          <ThinRule />
        </div>

        {/* Date */}
        <p className="cover-enter cover-enter-4 font-lato text-[#4a3036] text-[10px] tracking-[0.38em] uppercase">
          Ahad &nbsp;·&nbsp; 12 September 2026
        </p>
        <p className="cover-enter cover-enter-5 text-[#cf8c9a] text-[8px] tracking-[0.42em] mt-2 font-lato">
          #AqilLoveNadiah
        </p>
      </div>
    </section>
  );
}
