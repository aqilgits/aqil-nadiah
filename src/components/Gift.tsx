"use client";

import { useState } from "react";
import GoldDivider from "./GoldDivider";
import Reveal from "./ScrollReveal";

const ACCOUNTS = [
  { bank: "Maybank", name: "Nur Sarah Binti Rizman",    number: "1234 5678 9012" },
  { bank: "CIMB",    name: "Muhammad Harris Bin Azman", number: "8765 4321 0987" },
];

export default function Gift() {
  const [copied, setCopied] = useState<number | null>(null);

  function copy(i: number, num: string) {
    navigator.clipboard?.writeText(num.replace(/\s/g, ""));
    setCopied(i);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <section className="floral-section overflow-hidden" id="hadiah">
      <div className="relative z-10 flex flex-col items-center text-center px-12 py-10">
        <Reveal>
          <h2 className="font-script text-[3.2rem] text-[#4a3036] leading-none mb-2 drop-shadow-sm">
            Hadiah
          </h2>
          <p className="font-lato text-[#8c676f] text-[10px] tracking-widest uppercase mb-7">
            Kiriman wang tunai dialu-alukan
          </p>

          <div className="w-full flex flex-col gap-4">
            {ACCOUNTS.map((a, i) => (
              <div
                key={i}
                className="rounded-2xl px-6 py-5 text-left"
                style={{
                  background: "rgba(255,255,255,0.72)",
                  border: "1px solid #ecd9dd",
                }}
              >
                <p className="font-lato text-[#cf8c9a] text-[9px] tracking-[0.4em] uppercase mb-1">
                  {a.bank}
                </p>
                <p className="font-playfair text-[#4a3036] text-sm">{a.name}</p>
                <p
                  className="font-playfair text-[#4a3036] text-xl tracking-widest mt-2"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {a.number}
                </p>
                <button
                  onClick={() => copy(i, a.number)}
                  className="mt-3 font-lato text-[9px] tracking-[0.35em] uppercase px-4 py-1.5
                             rounded-full border border-[#ecd9dd] transition-colors"
                  style={{ color: copied === i ? "#cf8c9a" : "#8c676f" }}
                >
                  {copied === i ? "✓ Disalin" : "Salin Nombor"}
                </button>
              </div>
            ))}
          </div>

          <GoldDivider tight />
        </Reveal>
      </div>
    </section>
  );
}
