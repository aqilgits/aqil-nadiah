"use client";

import { useRef, useState } from "react";
import GoldDivider from "./GoldDivider";
import Reveal from "./ScrollReveal";

const PHOTOS = [
  { bg: "linear-gradient(135deg,#c9a8e8,#f0e8fa)", label: "Foto 1" },
  { bg: "linear-gradient(135deg,#d8b8e8,#efe4fb)", label: "Foto 2" },
  { bg: "linear-gradient(135deg,#b8bce8,#e6e8f9)", label: "Foto 3" },
  { bg: "linear-gradient(135deg,#c0cfa8,#eef3e0)", label: "Foto 4" },
];

export default function Gallery() {
  const [active, setActive] = useState(0);
  const n = PHOTOS.length;
  const touchX = useRef<number | null>(null);

  const go = (dir: number) => setActive(a => (a + dir + n) % n);

  function onTouchStart(e: React.TouchEvent) {
    touchX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  }

  return (
    <section className="floral-section overflow-hidden">
      <div className="relative z-10 flex flex-col items-center px-4 py-10">
        <Reveal>
          <h2 className="font-script text-[3.2rem] text-[#382650] leading-none mb-7 drop-shadow-sm text-center">
            Galeri
          </h2>

          {/* Coverflow stage */}
          <div
            className="relative w-full h-[300px] flex items-center justify-center select-none"
            style={{ perspective: "1100px" }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {PHOTOS.map((p, i) => {
              // shortest circular distance from active
              let offset = i - active;
              if (offset > n / 2) offset -= n;
              if (offset < -n / 2) offset += n;
              const abs = Math.abs(offset);
              if (abs > 1) return null; // render center + immediate neighbours only

              const isCenter = offset === 0;
              return (
                <div
                  key={i}
                  onClick={() => !isCenter && setActive(i)}
                  className="absolute transition-all duration-500 ease-out"
                  style={{
                    width: 190,
                    height: 262,
                    transform: `translateX(${offset * 122}px) scale(${
                      isCenter ? 1 : 0.82
                    }) rotateY(${offset * -26}deg)`,
                    opacity: isCenter ? 1 : 0.5,
                    zIndex: 10 - abs,
                    cursor: isCenter ? "default" : "pointer",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="w-full h-full overflow-hidden flex flex-col items-center justify-center"
                    style={{
                      background: p.bg,
                      borderRadius: "1.25rem",
                      border: isCenter
                        ? "5px solid #ffffff"
                        : "3px solid rgba(255,255,255,0.7)",
                      boxShadow: isCenter
                        ? "0 16px 40px rgba(88,54,140,0.30)"
                        : "0 8px 20px rgba(88,54,140,0.16)",
                    }}
                  >
                    {/* Replace this block with a real <img> */}
                    <p className="font-lato text-white/70 text-xs tracking-[0.3em] uppercase">
                      {p.label}
                    </p>
                    {isCenter && (
                      <p className="font-lato text-white/45 text-[8.5px] tracking-widest mt-1.5">
                        Ganti dengan foto sebenar
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots */}
          <div className="flex gap-2.5 mt-7 justify-center items-center">
            {PHOTOS.map((_, i) => {
              const on = i === active;
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Foto ${i + 1}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: on ? 9 : 7,
                    height: on ? 9 : 7,
                    background: on ? "#7c4fb0" : "#e6dcf3",
                    boxShadow: on ? "0 0 0 3px rgba(124,79,176,0.22)" : "none",
                  }}
                />
              );
            })}
          </div>

          <GoldDivider tight />
        </Reveal>
      </div>
    </section>
  );
}
