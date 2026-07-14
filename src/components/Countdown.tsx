"use client";

import { useEffect, useState } from "react";
import GoldDivider from "./GoldDivider";
import Reveal from "./ScrollReveal";

const TARGET = new Date("2026-09-12T11:00:00+08:00").getTime();
function pad(n: number) { return String(n).padStart(2, "0"); }

export default function Countdown() {
  const [diff, setDiff] = useState<number | null>(null);

  useEffect(() => {
    setDiff(TARGET - Date.now());
    const id = setInterval(() => setDiff(TARGET - Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const total   = Math.max(0, diff ?? TARGET - Date.now());
  const days    = Math.floor(total / 86400000);
  const hours   = Math.floor((total % 86400000) / 3600000);
  const minutes = Math.floor((total % 3600000) / 60000);
  const seconds = Math.floor((total % 60000) / 1000);
  const done    = diff !== null && diff <= 0;

  return (
    <section className="floral-section overflow-hidden" id="countdown">
      <div className="relative z-10 flex flex-col items-center text-center px-10 py-10">
        <Reveal>
          <p className="font-lato text-[#7c4fb0] text-[9px] tracking-[0.5em] uppercase mb-6">
            {done ? "Majlis Telah Bermula" : "Majlis Akan Bermula"}
          </p>

          {diff === null && (
            <div className="flex gap-3 justify-center opacity-0 pointer-events-none select-none">
              {["Hari","Jam","Minit","Saat"].map(l => (
                <div key={l} className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl" style={{ background: "linear-gradient(145deg,#fff,#f0e8fa)", border: "1px solid #e6dcf3" }} />
                  <span className="font-lato text-[9px] tracking-widest uppercase mt-1.5 text-[#6a5688]">{l}</span>
                </div>
              ))}
            </div>
          )}
          {diff !== null && !done && (
            <div className="flex gap-3 justify-center">
              {[
                { val: days,    label: "Hari" },
                { val: hours,   label: "Jam" },
                { val: minutes, label: "Minit" },
                { val: seconds, label: "Saat" },
              ].map(({ val, label }, i) => (
                <div key={label} className="flex flex-col items-center">
                  {/* Separator dot between blocks */}
                  {i > 0 && (
                    <span className="absolute text-[#7c4fb0] opacity-40 font-playfair text-xl"
                      style={{ marginTop: "1.1rem", marginLeft: "-0.9rem" }}>
                    </span>
                  )}
                  <div
                    className="w-16 h-16 flex items-center justify-center rounded-2xl shadow-sm"
                    style={{
                      background: "linear-gradient(145deg, #fff 0%, #f0e8fa 100%)",
                      border: "1px solid #e6dcf3",
                    }}
                  >
                    <span
                      className="font-playfair text-[#382650] text-2xl font-semibold"
                      style={{ fontVariantNumeric: "tabular-nums" }}
                    >
                      {pad(val)}
                    </span>
                  </div>
                  <span className="font-lato text-[#6a5688] text-[9px] tracking-widest uppercase mt-1.5">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          )}

          <GoldDivider tight />
        </Reveal>
      </div>
    </section>
  );
}
