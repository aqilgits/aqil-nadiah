import GoldDivider from "./GoldDivider";
import Reveal from "./ScrollReveal";

function InfoBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="text-center">
      <p className="font-lato text-[#7c4fb0] text-[8.5px] tracking-[0.4em] uppercase mb-1">
        {label}
      </p>
      {children}
    </div>
  );
}

export default function EventDetails() {
  return (
    <section className="floral-section overflow-hidden">
      <div className="relative z-10 flex flex-col items-center text-center px-12 py-10">

        <Reveal>
          <GoldDivider tight />
          <h2 className="font-script text-[3.2rem] text-[#382650] leading-none mb-6 drop-shadow-sm">
            Tarikh
          </h2>
          <InfoBlock label="">
            <p className="font-playfair text-[#382650] text-sm tracking-[0.25em] uppercase">Sabtu</p>
            <p className="font-playfair text-[#382650] text-2xl tracking-widest mt-0.5">30.08.2026</p>
          </InfoBlock>
        </Reveal>

        <Reveal delay={80}>
          <div className="w-px h-8 bg-[#e6dcf3] mx-auto my-4" />
          <InfoBlock label="Masa">
            <p className="font-playfair text-[#382650] text-lg">11:00 AM – 4:00 PM</p>
          </InfoBlock>
          <div className="w-px h-8 bg-[#e6dcf3] mx-auto my-4" />
          <InfoBlock label="Lokasi Majlis">
            <p className="font-playfair text-[#382650] text-base">Dewan Serbaguna</p>
            <p className="font-lato text-[#6a5688] text-[11px] leading-relaxed mt-1">
              Labis, Johor
            </p>
          </InfoBlock>
        </Reveal>

        {/* <Reveal delay={140}>
          <GoldDivider />
          <h2 className="font-script text-[3.2rem] text-[#382650] leading-none mb-6 drop-shadow-sm">
            Atur Cara Majlis
          </h2>
          <div className="flex flex-col items-center gap-0">
            {[
              { time: "11:00 AM", event: "Majlis Bermula" },
              { time: "1:30 PM", event: "Ketibaan Pengantin" },
              { time: "4:00 PM", event: "Majlis Bersurai" },
            ].map((item, i, arr) => (
              <div key={i} className="flex flex-col items-center">
                <div className="bg-white/70 border border-[#e6dcf3] rounded-2xl px-8 py-3 text-center">
                  <p className="font-lato text-[#7c4fb0] text-[9px] tracking-[0.3em] uppercase">{item.time}</p>
                  <p className="font-playfair text-[#382650] text-sm mt-0.5">{item.event}</p>
                </div>
                {i < arr.length - 1 && (
                  <div className="flex flex-col items-center py-1">
                    <div className="w-px h-5 bg-[#e6dcf3]" />
                    <div className="w-1.5 h-1.5 rounded-full border border-[#7c4fb0] opacity-50" />
                    <div className="w-px h-5 bg-[#e6dcf3]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Reveal> */}

        {/* <Reveal delay={180}>
          <GoldDivider />
          <h2 className="font-script text-[3.2rem] text-[#382650] leading-none mb-2 drop-shadow-sm">
            Tema Pakaian
          </h2>
          <p className="font-lato text-[#6a5688] text-[11px] tracking-widest uppercase">
            Berpakaian tradisional dan sopan
          </p>
          <GoldDivider tight />
        </Reveal> */}

      </div>
    </section>
  );
}
