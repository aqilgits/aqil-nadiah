import GoldDivider from "./GoldDivider";
import Reveal from "./ScrollReveal";



export default function Invitation() {
  return (
    <section className="floral-section overflow-hidden">
      <div className="relative z-10 flex flex-col items-center text-center px-8 py-10">

        <Reveal>
          <p className="font-playfair italic text-[#d69ea9] text-sm leading-relaxed">
            Assalamualaikum dan Selamat Sejahtera
          </p>
          <p className="font-lato text-[#8c676f] text-[11px] leading-loose mt-2 tracking-wide">
            Dengan nama Allah yang Maha Pengasih lagi Maha Penyayang
          </p>
        </Reveal>

        <Reveal delay={80}>
          <GoldDivider />
        </Reveal>

        <Reveal delay={120}>
          <p className="font-playfair text-[#4a3036] text-sm tracking-wide">Latifah Binti Moain (Ibu)</p>
          <p className="text-[#cf8c9a] text-xs my-1 italic font-playfair">&amp;</p>
          <p className="font-playfair text-[#4a3036] text-sm tracking-wide">Zaidi Bin Moin (Bapa Saudara)</p>

          <p className="font-lato text-[#8c676f] text-[11px] leading-loose mt-5">
            Dengan penuh rasa kesyukuran, kami ingin<br />
            menjemput{" "}
            <span className="text-[#4a3036] font-lato">
              Dato | Datin | Tuan | Puan | Encik | Cik
            </span>
            <br />
            ke majlis perkahwinan anakanda kami
          </p>
        </Reveal>

        <Reveal delay={160}>
          <GoldDivider />
        </Reveal>

        {/* ── Staggered portraits ── */}
        <div className="w-full relative mt-2 mb-1">

          {/* Groom */}
          <Reveal delay={200}>
            <div className="flex flex-col items-center justify-center text-center">
              <p className="font-script text-[2.6rem] text-[#4a3036] leading-[1.02] drop-shadow-sm">
                Muhammad Lukman Aqil
              </p>
              <p className="font-lato text-[#cf8c9a] text-[10px] tracking-[0.32em] uppercase mt-2">
                Bin Mohamed Laile
              </p>
            </div>
          </Reveal>

          {/* connecting ampersand */}
          <Reveal delay={240}>
            <p className="font-script text-[#d69ea9] text-4xl text-center my-5 relative z-10 drop-shadow-sm">
              &amp;
            </p>
          </Reveal>

          {/* Bride */}
          <Reveal delay={280}>
            <div className="flex flex-col items-center justify-center text-center">
              <p className="font-script text-[2.6rem] text-[#4a3036] leading-[1.02] drop-shadow-sm">
                Nur Izzah Nadiah
              </p>
              <p className="font-lato text-[#cf8c9a] text-[10px] tracking-[0.32em] uppercase mt-2">
                Binti Iskandar Syah
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={320}>
          <GoldDivider />
        </Reveal>
      </div>
    </section>
  );
}
