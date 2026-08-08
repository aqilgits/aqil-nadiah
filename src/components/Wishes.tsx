"use client";

import { useState, useEffect } from "react";
import GoldDivider from "./GoldDivider";
import Reveal from "./ScrollReveal";

interface Wish {
  name: string;
  msg: string;
  timestamp?: string;
}

const PER_PAGE = 3;

export default function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishes();
  }, []);

  async function fetchWishes() {
    try {
      const res = await fetch("/api/wishes");
      const data = await res.json();
      setWishes(data);
    } catch (err) {
      console.error("Error fetching wishes:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) return;

    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), msg: msg.trim() }),
      });

      if (res.ok) {
        const newWish = await res.json();
        setWishes(w => [{ name: name.trim(), msg: msg.trim() }, ...w]);
        setName("");
        setMsg("");
      }
    } catch (err) {
      console.error("Error submitting wish:", err);
    }
  }

  return (
    <section className="floral-section overflow-hidden" id="ucapan">
      <div className="relative z-10 flex flex-col items-center px-10 py-10">
        <Reveal>
          <h2 className="font-script text-[3.2rem] text-[#4a3036] leading-none mb-6 drop-shadow-sm text-center">
            Ucapan
          </h2>

          {/* Submit form */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 mb-7">
            <div className="flex flex-col gap-1">
              <label className="font-lato text-[#cf8c9a] text-[9px] tracking-[0.35em] uppercase">
                Nama anda
              </label>
              <input
                required type="text" value={name} onChange={e => setName(e.target.value)}
                className="w-full bg-transparent border-b-2 border-[#ecd9dd] py-2
                           text-[#4a3036] font-playfair text-base
                           focus:outline-none focus:border-[#cf8c9a] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-lato text-[#cf8c9a] text-[9px] tracking-[0.35em] uppercase">
                Ucapan
              </label>
              <textarea
                required rows={2} value={msg} onChange={e => setMsg(e.target.value)}
                className="w-full bg-transparent border-b-2 border-[#ecd9dd] py-2
                           text-[#4a3036] font-lato text-sm resize-none
                           focus:outline-none focus:border-[#cf8c9a] transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-full border border-[#cf8c9a] text-[#cf8c9a]
                         font-lato text-[9px] tracking-[0.4em] uppercase
                         active:bg-[#fcf2f4] transition-colors mt-1"
            >
              Hantar Ucapan
            </button>
          </form>

          {/* Wish cards — paginated */}
          {wishes.length > 0 && (() => {
            const totalPages = Math.ceil(wishes.length / PER_PAGE);
            const slice = wishes.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);
            return (
              <div className="w-full flex flex-col gap-3">
                {slice.map((w, i) => (
                  <div
                    key={page * PER_PAGE + i}
                    className="text-center py-4 px-5 rounded-2xl"
                    style={{
                      background: "rgba(255,255,255,0.65)",
                      border: "1px solid #ecd9dd",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <p className="font-playfair italic text-[#4a3036]/70 text-sm leading-relaxed">
                      &ldquo;{w.msg}&rdquo;
                    </p>
                    <p className="font-lato text-[#cf8c9a] text-[9px] tracking-[0.35em] uppercase mt-2.5">
                      {w.name}
                    </p>
                  </div>
                ))}

                {/* Pagination controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-2 px-1">
                    <button
                      onClick={() => setPage(p => Math.max(0, p - 1))}
                      disabled={page === 0}
                      className="w-8 h-8 rounded-full pb-1 border border-[#ecd9dd] flex items-center justify-center
                                 text-[#cf8c9a] text-sm transition-colors
                                 disabled:opacity-30 active:bg-[#fcf2f4]"
                    >
                      ‹
                    </button>

                    <p className="font-lato text-[#cf8c9a] text-[9px] tracking-[0.3em] uppercase">
                      {page + 1} / {totalPages}
                    </p>

                    <button
                      onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                      disabled={page === totalPages - 1}
                      className="w-8 h-8 rounded-full pb-1 border border-[#ecd9dd] flex items-center justify-center
                                 text-[#cf8c9a] text-sm transition-colors
                                 disabled:opacity-30 active:bg-[#fcf2f4]"
                    >
                      ›
                    </button>
                  </div>
                )}
              </div>
            );
          })()}

          <GoldDivider tight />
        </Reveal>
      </div>
    </section>
  );
}
