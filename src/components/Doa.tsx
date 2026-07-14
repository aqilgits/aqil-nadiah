import GoldDivider from "./GoldDivider";
import Reveal from "./ScrollReveal";

export default function Doa() {
  return (
    <section className="floral-section overflow-hidden">
      <div className="relative z-10 flex flex-col items-center text-center px-14 py-12">
        <Reveal>
          {/* Opening mark */}
          <p className="font-playfair text-[#7c4fb0] text-5xl italic leading-none opacity-40 mb-2">
            ❝
          </p>
          <p className="font-playfair italic text-[#382650] text-sm leading-none mb-4">
            Ya Allah
          </p>
          <p className="font-lato text-[#6a5688] text-[11px] leading-[2] tracking-wide">
            Berkatilah majlis perkahwinan mereka.<br />
            Satukanlah hati kedua mempelai ini<br />
            seperti mana Engkau satukan hati<br />
            Adam &amp; Hawa dan seperti Engkau<br />
            satukan hati Muhammad S.A.W<br />
            &amp; Siti Khadijah.<br />
            Semoga Allah S.W.T merahmati<br />
            dan memberkati perkahwinan mereka.
          </p>
          <p className="font-playfair text-[#7c4fb0] text-5xl italic leading-none opacity-40 mt-2">
            ❞
          </p>
          <p className="font-lato text-[#7c4fb0] text-[9px] tracking-[0.45em] uppercase mt-5">
            Aamiin Ya Rabbal &lsquo;Alamin
          </p>
          <GoldDivider tight />
        </Reveal>
      </div>
    </section>
  );
}
