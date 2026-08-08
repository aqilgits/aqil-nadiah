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
          <h2 className="font-script text-[3.2rem] text-[#4a3036] leading-none mb-7 drop-shadow-sm text-center">
            Galeri
          </h2>

          {/* Modern Slide Gallery */}
          <div
            className="relative w-full h-[400px] flex items-center justify-center select-none overflow-hidden rounded-2xl"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {PHOTOS.map((p, i) => {
              const isCenter = i === active;
              const isPrev = i === (active - 1 + n) % n;
              const isNext = i === (active + 1) % n;

              let translate = "translate-x-full opacity-0";
              let zIndex = 0;
              let scale = "scale-95";

              if (isCenter) {
                translate = "translate-x-0 opacity-100";
                zIndex = 10;
                scale = "scale-100";
              } else if (isPrev) {
                translate = "-translate-x-full opacity-0";
                zIndex = 5;
              } else if (isNext) {
                translate = "translate-x-full opacity-0";
                zIndex = 5;
              }

              return (
                <div
                  key={i}
                  className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${translate} ${zIndex > 0 ? "" : "pointer-events-none"}`}
                  style={{ zIndex }}
                >
                  <div
                    className={`w-full h-full overflow-hidden transition-transform duration-700 ${scale}`}
                    style={{
                      boxShadow: isCenter ? "0 20px 50px rgba(44, 54, 45, 0.2)" : "none",
                    }}
                  >
                    <img
                      src={p.src}
                      alt={p.label}
                      className="w-full h-full object-cover rounded-2xl"
                      draggable={false}
                    />
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
                    width: on ? 24 : 8,
                    height: 8,
                    background: on ? "#cf8c9a" : "#ecd9dd",
                    boxShadow: on ? "0 0 0 2px rgba(114, 137, 118, 0.2)" : "none",
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
