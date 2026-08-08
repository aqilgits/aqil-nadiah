import GoldDivider from "./GoldDivider";
import Reveal from "./ScrollReveal";

export default function Location() {
  const q = encodeURIComponent("No 14, Jalan Orked, Kampung seri machap, Johor");
  const mapsUrl = `https://maps.app.goo.gl/TbVM9A96PsAG3EdWA`;
  const wazeUrl = `https://waze.com/ul?q=${q}`;

  return (
    <section className="floral-section overflow-hidden" id="lokasi">
      <div className="relative z-10 flex flex-col items-center text-center px-12 py-10">
        <Reveal>
          <h2 className="font-script text-[3.2rem] text-[#4a3036] leading-none mb-4 drop-shadow-sm">
            Lokasi
          </h2>
          <p className="font-playfair text-[#4a3036] text-sm">No 14, Jalan Orked,</p>
          <p className="font-lato text-[#8c676f] text-[11px] leading-relaxed mt-1">
            Kampung seri machap, Johor
          </p>

          {/* Map placeholder */}
          <div
            className="w-full mt-5 overflow-hidden shadow-sm"
            style={{
              height: 170,
              borderRadius: "1rem",
              border: "1px solid #ecd9dd",
              background: "linear-gradient(145deg, #fcf2f4, #f9f0f5)",
            }}
          >
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              <iframe
                title="Map"
                className="w-full h-full border-0"
                loading="lazy"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.6827004158977!2d103.26901097492869!3d1.874745959663987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d0641eced7a395%3A0x46548fc5ef0c9cac!2s14%2C%20Jalan%20Orked%2C%20Kampung%20Perak%2C%2086200%20Simpang%20Renggam%2C%20Johor%20Darul%20Ta'zim!5e0!3m2!1sen!2smy!4v1786150372860!5m2!1sen!2smy"
              />
            </div>
          </div>

          {/* Nav buttons */}
          <div className="flex gap-3 mt-4 w-full">
            {[
              { href: mapsUrl, label: "Google Maps" }
            ].map(btn => (
              <a
                key={btn.label}
                href={btn.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-full font-lato text-[9px] tracking-[0.35em]
                           uppercase border border-[#ecd9dd] bg-white/70 text-[#8c676f]
                           flex items-center justify-center active:bg-[#fcf2f4] transition-colors"
              >
                {btn.label}
              </a>
            ))}
          </div>

          <GoldDivider />

          {/* Sign-off */}
          <p className="font-lato text-[#8c676f]/50 text-[9px] tracking-widest uppercase mb-2">
            Dengan Kasih Sayang
          </p>
          <p className="font-script text-[#4a3036] text-[2.6rem] drop-shadow-sm mb-2">
            Aqil &amp; Nadiah
          </p>
          <p className="font-lato text-[#cf8c9a] text-[8px] tracking-[0.45em] uppercase mt-3">
            #AqilLoveNadiah &nbsp;·&nbsp; 12.09.2026
          </p>
        </Reveal>
      </div>
    </section>
  );
}
