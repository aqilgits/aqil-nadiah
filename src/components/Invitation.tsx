import GoldDivider from "./GoldDivider";
import Reveal from "./ScrollReveal";

function PortraitFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="relative"
      style={{
        width: 128,
        padding: 7,
        borderRadius: 8,
        background:
          "linear-gradient(135deg,#f3e2a8 0%,#c8a04e 28%,#efd589 52%,#b5893a 76%,#e2c877 100%)",
        boxShadow: "0 2px 0 #8a6a2c",
      }}
    >
      {/* White mat + bevel line */}
      <div
        style={{
          padding: 4,
          borderRadius: 4,
          background: "#ffffff",
          boxShadow: "inset 0 0 0 1px rgba(138,106,44,0.35)",
        }}
      >
        <div
          className="overflow-hidden"
          style={{ borderRadius: 2, aspectRatio: "5 / 6", background: "#ffffff" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            style={{ objectPosition: "50% 20%" }}
          />
        </div>
      </div>

      {/* Corner ornaments */}
      {(
        [
          ["-5px", "-5px", "auto", "auto"],
          ["-5px", "auto", "auto", "-5px"],
          ["auto", "-5px", "-5px", "auto"],
          ["auto", "auto", "-5px", "-5px"],
        ] as [string, string, string, string][]
      ).map(([top, left, bottom, right], i) => (
        <span
          key={i}
          className="absolute"
          style={{
            top,
            left,
            bottom,
            right,
            width: 11,
            height: 11,
            transform: "rotate(45deg)",
            background:
              "linear-gradient(135deg,#f3e2a8,#c8a04e)",
            border: "1px solid #8a6a2c",
            borderRadius: 2,
          }}
        />
      ))}
    </div>
  );
}

export default function Invitation() {
  return (
    <section className="floral-section overflow-hidden">
      <div className="relative z-10 flex flex-col items-center text-center px-8 py-10">

        <Reveal>
          <p className="font-playfair italic text-[#a87bc4] text-sm leading-relaxed">
            Assalamualaikum dan Selamat Sejahtera
          </p>
          <p className="font-lato text-[#6a5688] text-[11px] leading-loose mt-2 tracking-wide">
            Dengan nama Allah yang Maha Pengasih lagi Maha Penyayang
          </p>
        </Reveal>

        <Reveal delay={80}>
          <GoldDivider />
        </Reveal>

        <Reveal delay={120}>
          <p className="font-playfair text-[#382650] text-sm tracking-wide">Iskandar Syah Bin Samigon</p>
          <p className="text-[#7c4fb0] text-xs my-1 italic font-playfair">&amp;</p>
          <p className="font-playfair text-[#382650] text-sm tracking-wide">Nazriha Binti Bonnijan</p>

          <p className="font-lato text-[#6a5688] text-[11px] leading-loose mt-5">
            Dengan penuh rasa kesyukuran, kami ingin<br />
            menjemput{" "}
            <span className="text-[#382650] font-lato">
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

          {/* Bride — frame left, name right */}
          <Reveal delay={200}>
            <div className="flex items-center gap-4">
              <div className="shrink-0" style={{ transform: "rotate(-4deg)", filter: "drop-shadow(0 10px 18px rgba(88,54,140,0.28))" }}>
                <PortraitFrame src="/bride.png" alt="Nadiah" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-script text-[2.2rem] text-[#382650] leading-[1.02] drop-shadow-sm">
                  Nur Izzah Nadiah
                </p>
                <p className="font-lato text-[#7c4fb0] text-[10px] tracking-[0.32em] uppercase mt-1.5">
                  Binti Iskandar Syah
                </p>
              </div>
            </div>
          </Reveal>

          {/* connecting ampersand */}
          <Reveal delay={240}>
            <p className="font-script text-[#a87bc4] text-4xl text-center -my-3 relative z-10 drop-shadow-sm">
              &amp;
            </p>
          </Reveal>

          {/* Groom — frame right, name left */}
          <Reveal delay={280}>
            <div className="flex items-center gap-4 flex-row-reverse">
              <div className="shrink-0" style={{ transform: "rotate(4deg)", filter: "drop-shadow(0 10px 18px rgba(88,54,140,0.28))" }}>
                <PortraitFrame src="/groom.png" alt="Muhammad Harris" />
              </div>
              <div className="flex-1 text-right">
                <p className="font-script text-[2.2rem] text-[#382650] leading-[1.02] drop-shadow-sm">
                  Muhammad Lukman Aqil
                </p>
                <p className="font-lato text-[#7c4fb0] text-[10px] tracking-[0.32em] uppercase mt-1.5">
                  Bin Mohamed Laile
                </p>
              </div>
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
