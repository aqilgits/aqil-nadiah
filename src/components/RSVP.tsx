"use client";

import { useState } from "react";
import GoldDivider from "./GoldDivider";
import Reveal from "./ScrollReveal";

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="w-full relative">
      <label className="block font-lato text-[#7c4fb0] text-[9px] tracking-[0.35em] uppercase mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-white/75 border-b-2 border-[#e6dcf3] px-0 py-2.5
                   text-[#382650] font-playfair text-base placeholder-[#a87bc4]/40
                   focus:outline-none focus:border-[#7c4fb0] transition-colors"
        style={{ borderRadius: 0, background: "transparent" }}
      />
    </div>
  );
}

export default function RSVP() {
  const [name, setName] = useState("");
  const [count, setCount] = useState(1);
  const [status, setStatus] = useState<"idle" | "sent" | "loading">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), count }),
      });

      if (res.ok) {
        setStatus("sent");
        setName("");
        setCount(1);
      } else {
        setStatus("idle");
      }
    } catch (err) {
      console.error("Error submitting RSVP:", err);
      setStatus("idle");
    }
  }

  return (
    <section className="floral-section overflow-hidden" id="rsvp">
      <div className="relative z-10 flex flex-col items-center text-center px-12 py-10">
        <Reveal>
          <h2 className="font-script text-[3.2rem] text-[#382650] leading-none mb-6 drop-shadow-sm">
            Kehadiran
          </h2>

          {status === "sent" ? (
            <div className="py-6">
              <p className="font-playfair italic text-[#a87bc4] text-lg">Terima kasih ✦</p>
              <p className="font-lato text-[#6a5688] text-[11px] leading-loose mt-2">
                Kehadiran anda telah disahkan.<br />Kami menantikan kedatangan anda.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 text-left">
              <Field label="Nama anda" value={name} onChange={setName} />

              <div>
                <label className="block font-lato text-[#7c4fb0] text-[9px] tracking-[0.35em] uppercase mb-1.5">
                  Bilangan kehadiran
                </label>
                <div className="flex items-center gap-5 border-b-2 border-[#e6dcf3] pb-2.5">
                  <button
                    type="button"
                    onClick={() => setCount(c => Math.max(1, c - 1))}
                    className="w-7 h-7 rounded-full border border-[#e6dcf3] bg-white/80
                               flex items-center justify-center text-[#6a5688] text-base
                               active:bg-[#f0e8fa] transition-colors"
                  >
                    −
                  </button>
                  <span
                    className="font-playfair text-[#382650] text-xl w-8 text-center"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {count}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCount(c => Math.min(10, c + 1))}
                    className="w-7 h-7 rounded-full border border-[#e6dcf3] bg-white/80
                               flex items-center justify-center text-[#6a5688] text-base
                               active:bg-[#f0e8fa] transition-colors"
                  >
                    +
                  </button>
                  <span className="font-lato text-[#6a5688] text-[10px]">orang</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 rounded-full font-lato text-[10px] tracking-[0.4em]
                           uppercase transition-all active:opacity-70"
                style={{
                  background: "linear-gradient(135deg, #7c4fb0, #a87bc4)",
                  color: "white",
                  boxShadow: "0 4px 20px rgba(124,79,176,0.3)",
                }}
              >
                Sahkan Kehadiran
              </button>
            </form>
          )}

          <GoldDivider tight />
        </Reveal>
      </div>
    </section>
  );
}
