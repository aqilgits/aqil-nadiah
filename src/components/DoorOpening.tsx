"use client";

import { useState, useEffect } from "react";

export default function DoorOpening({ onOpen }: { onOpen?: () => void }) {
  const [phase, setPhase] = useState<"closed" | "opening" | "done">("closed");

  useEffect(() => {
    // Prevent body scroll while door is shown
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  function open() {
    if (phase !== "closed") return;
    setPhase("opening");
    onOpen?.();
    setTimeout(() => setPhase("done"), 950);
  }

  if (phase === "done") return null;

  const sliding = phase === "opening";

  return (
    /* Full-viewport overlay — above everything including BottomNav */
    <div
      onClick={open}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        cursor: "pointer",
        overflow: "hidden",
      }}
    >
      {/* ── Top door panel ── */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0,
          width: "100%", height: "50%",
          backgroundColor: "#e6c1c8",
          backgroundImage: "url('/floral-border.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 200%",
          backgroundPosition: "0% 0%",
          willChange: "transform",
          transformOrigin: "top center",
          transform: sliding ? "translateY(-100%)" : "translateY(0)",
          transition: sliding ? "transform 0.85s cubic-bezier(0.76,0,0.24,1)" : "none",
        }}
      />

      {/* ── Bottom door panel ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0, left: 0,
          width: "100%", height: "50%",
          backgroundColor: "#e6c1c8",
          backgroundImage: "url('/floral-border.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 200%",
          backgroundPosition: "0% 100%",
          willChange: "transform",
          transformOrigin: "bottom center",
          transform: sliding ? "translateY(100%)" : "translateY(0)",
          transition: sliding ? "transform 0.85s cubic-bezier(0.76,0,0.24,1)" : "none",
        }}
      />

      {/* ── Center seam ── */}
      <div
        style={{
          position: "absolute",
          left: "12%",
          top: "50%", width: "76%",
          height: 1,
          transform: "translateY(-50%)",
          background: "linear-gradient(to right, transparent, rgba(207,140,154,0.3) 20%, rgba(207,140,154,0.3) 80%, transparent)",
          pointerEvents: "none",
          opacity: sliding ? 0 : 1,
          transition: "opacity 0.15s",
        }}
      />

      {/* ── Center content ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 22,
          pointerEvents: "none",
          opacity: sliding ? 0 : 1,
          transition: "opacity 0.18s",
        }}
      >
        {/* Monogram diamond */}
        <div
          style={{
            width: 104,
            height: 104,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Diamond Border */}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 84, height: 84, transform: "rotate(45deg)", border: "1px solid #cf8c9a", opacity: 0.4, position: "absolute", background: "rgba(255,255,255,0.94)", boxShadow: "0 6px 32px rgba(207,140,154,0.2)" }} />
            <div style={{ width: 76, height: 76, transform: "rotate(45deg)", border: "1px solid #cf8c9a", position: "absolute" }} />
          </div>

          <p
            style={{
              position: "relative",
              zIndex: 10,
              fontFamily: "var(--font-playfair), serif",
              fontSize: "2.1rem",
              fontStyle: "italic",
              fontWeight: 300,
              color: "#4a3036",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginTop: 6
            }}
          >
            A<span style={{ color: "#cf8c9a", fontSize: "0.88rem", fontStyle: "normal", fontFamily: "var(--font-lato)" }}>&amp;</span>N
          </p>
        </div>

        {/* Names */}
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontFamily: "var(--font-script), cursive",
              fontSize: "clamp(2.4rem,10vw,3rem)",
              color: "#fff",
              lineHeight: 0.9,
              textShadow: "0 2px 16px rgba(82,60,68,0.45)",
              filter: "drop-shadow(0 1px 3px rgba(82,60,68,0.5))",
            }}
          >
            Aqil &amp; Nadiah
          </p>
          <p
            style={{
              fontFamily: "var(--font-lato), sans-serif",
              fontSize: "0.52rem",
              letterSpacing: "0.42em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.82)",
              marginTop: 10,
            }}
          >
            12 September 2026
          </p>
        </div>

        {/* Tap hint */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <TapRipple />
          <p
            style={{
              fontFamily: "var(--font-lato), sans-serif",
              fontSize: "0.5rem",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            Buka
          </p>
        </div>
      </div>

      <style>{`
        @keyframes tapRipple {
          0%   { transform: scale(0.6); opacity: 0.8; }
          100% { transform: scale(2.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function TapRipple() {
  return (
    <div style={{ position: "relative", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {[0, 1].map(i => (
        <span
          key={i}
          style={{
            position: "absolute",
            width: "100%", height: "100%",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.5)",
            animation: `tapRipple 2s ease-out ${i * 0.7}s infinite`,
          }}
        />
      ))}
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.9)", display: "block" }} />
    </div>
  );
}
