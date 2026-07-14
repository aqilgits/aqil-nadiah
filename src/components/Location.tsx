import GoldDivider from "./GoldDivider";
import Reveal from "./ScrollReveal";

export default function Location() {
  const q = encodeURIComponent("Dewan Serbaguna MDL, Labis, Johor");
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${q}`;
  const wazeUrl = `https://waze.com/ul?q=${q}`;

  return (
    <section className="floral-section overflow-hidden" id="lokasi">
      <div className="relative z-10 flex flex-col items-center text-center px-12 py-10">
        <Reveal>
          <h2 className="font-script text-[3.2rem] text-[#382650] leading-none mb-4 drop-shadow-sm">
            Lokasi
          </h2>
          <p className="font-playfair text-[#382650] text-sm">Dewan Serbaguna Labis</p>
          <p className="font-lato text-[#6a5688] text-[11px] leading-relaxed mt-1">
            Labis, Johor
          </p>

          {/* Map placeholder */}
          <div
            className="w-full mt-5 overflow-hidden shadow-sm"
            style={{
              height: 170,
              borderRadius: "1rem",
              border: "1px solid #e6dcf3",
              background: "linear-gradient(145deg, #f0e8fa, #f9f0f5)",
            }}
          >
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              <iframe
                title="Map"
                className="w-full h-full border-0"
                loading="lazy"
                src="https://www.google.com/maps?q=92J9%2BPJ+Labis,+Johor&output=embed"
              />
            </div>
          </div>

          {/* Nav buttons */}
          <div className="flex gap-3 mt-4 w-full">
            {[
              { href: mapsUrl, label: "Google Maps" },
              { href: wazeUrl, label: "Waze" },
            ].map(btn => (
              <a
                key={btn.label}
                href={btn.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-full font-lato text-[9px] tracking-[0.35em]
                           uppercase border border-[#e6dcf3] bg-white/70 text-[#6a5688]
                           flex items-center justify-center active:bg-[#f0e8fa] transition-colors"
              >
                {btn.label}
              </a>
            ))}
          </div>

          <GoldDivider />

          {/* Sign-off */}
          <p className="font-lato text-[#6a5688]/50 text-[9px] tracking-widest uppercase mb-2">
            Dengan Kasih Sayang
          </p>
          <p className="font-script text-[2.8rem] text-[#382650] leading-none drop-shadow-sm">
            Nadiah &amp; Aqil
          </p>
          <p className="font-lato text-[#7c4fb0] text-[8px] tracking-[0.45em] uppercase mt-3">
            #AqilLoveNadiah &nbsp;·&nbsp; 12.09.2026
          </p>
        </Reveal>
      </div>
    </section>
  );
}
