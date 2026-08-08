"use client";

import { useEffect, useState } from "react";

/* ── Shared event data ─────────────────────────────── */
const VENUE_NAME = "No 14, Jalan Orked,";
const VENUE_ADDR = "Kampung seri machap, Johor";
const DATE_LABEL = "Ahad · 12 September 2026";
const TIME_LABEL = "11:00 AM – 4:00 PM";

const CONTACTS = [
  { name: "Zaidi Moin", role: "Bapa Saudara", phone: "60137154006" },
  { name: "Haziq Akmal", role: "Saudara", phone: "6011170290150" },
];

const MAPS_Q = encodeURIComponent(`${VENUE_NAME}, ${VENUE_ADDR}`);
const MAPS_URL = `https://maps.app.goo.gl/TbVM9A96PsAG3EdWA`;
const WAZE_URL = `https://waze.com/ul?q=${MAPS_Q}`;
const GCAL_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  `&text=${encodeURIComponent("Majlis Perkahwinan Aqil & Nadiah")}` +
  `&dates=20260912T030000Z/20260912T080000Z` +
  `&details=${encodeURIComponent("Jemputan majlis perkahwinan Aqil & Nadiah.")}` +
  `&location=${MAPS_Q}`;

/* ── Icons ─────────────────────────────────────────── */
const ICONS: Record<string, React.ReactNode> = {
  hubungi: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
    </svg>
  ),
  kalendar: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
    </svg>
  ),
  rsvp: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z" />
    </svg>
  ),
  ucapan: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  ),
  lokasi: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  ),
};

const NAV = [
  { id: "hubungi", label: "Hubungi" },
  { id: "kalendar", label: "Kalendar" },
  { id: "rsvp", label: "RSVP" },
  { id: "ucapan", label: "Ucapan" },
  { id: "lokasi", label: "Lokasi" },
];

const SHEET_TITLE: Record<string, string> = {
  hubungi: "Hubungi Kami",
  kalendar: "Simpan Tarikh",
  rsvp: "Sahkan Kehadiran",
  ucapan: "Ucapan",
  lokasi: "Lokasi Majlis",
};

/* ── Small UI helpers ──────────────────────────────── */
function PillLink({ href, children, filled = false }: { href: string; children: React.ReactNode; filled?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1 py-2.5 px-3 rounded-full font-lato text-[9px] tracking-[0.28em] uppercase
                 flex items-center justify-center transition-all active:scale-[0.97] min-w-0"
      style={
        filled
          ? { background: "linear-gradient(135deg,#d892a0,#bd6f80)", color: "#fff", boxShadow: "0 4px 16px rgba(189,111,128,0.35)" }
          : { border: "1px solid #ecd9dd", background: "rgba(255,255,255,0.7)", color: "#8c676f" }
      }
    >
      {children}
    </a>
  );
}

/* ── Modal content per tab ─────────────────────────── */
function SheetBody({ id, onClose }: { id: string; onClose: () => void }) {
  const [rName, setRName] = useState("");
  const [rCount, setRCount] = useState(1);
  const [rSent, setRSent] = useState(false);
  const [rLoading, setRLoading] = useState(false);
  const [wName, setWName] = useState("");
  const [wMsg, setWMsg] = useState("");
  const [wSent, setWSent] = useState(false);
  const [wLoading, setWLoading] = useState(false);

  async function handleRSVPSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rName.trim()) return;

    setRLoading(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: rName.trim(), count: rCount }),
      });

      if (res.ok) {
        setRSent(true);
        setTimeout(() => {
          onClose();
          setRSent(false);
          setRName("");
          setRCount(1);
        }, 1500);
      }
    } catch (err) {
      console.error("Error submitting RSVP:", err);
    } finally {
      setRLoading(false);
    }
  }

  async function handleWishSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!wName.trim() || !wMsg.trim()) return;

    setWLoading(true);
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: wName.trim(), msg: wMsg.trim() }),
      });

      if (res.ok) {
        setWSent(true);
        setTimeout(() => {
          onClose();
          setWSent(false);
          setWName("");
          setWMsg("");
        }, 1500);
      }
    } catch (err) {
      console.error("Error submitting wish:", err);
    } finally {
      setWLoading(false);
    }
  }

  if (id === "hubungi") {
    return (
      <div className="flex flex-col gap-3">
        <p className="font-lato text-[#8c676f] text-[11px] text-center leading-relaxed mb-1">
          Untuk sebarang pertanyaan, hubungi kami.
        </p>
        {CONTACTS.map(c => (
          <div key={c.phone} className="rounded-2xl px-4 py-3 flex items-center justify-between gap-3"
            style={{ background: "rgba(255,255,255,0.7)", border: "1px solid #ecd9dd" }}>
            <div className="text-left">
              <p className="font-playfair text-[#4a3036] text-sm">{c.name}</p>
              <p className="font-lato text-[#cf8c9a] text-[9px] tracking-[0.2em] uppercase">{c.role}</p>
            </div>
            <a
              href={`https://wa.me/${c.phone.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp ${c.name}`}
              className="shrink-0 flex items-center gap-1.5 pl-3 pr-4 py-2 rounded-full active:scale-95 transition"
              style={{ background: "linear-gradient(135deg,#28c15a,#1da850)", color: "#fff", boxShadow: "0 4px 14px rgba(29,168,80,0.35)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2s-.8.9-.9 1.1c-.2.2-.3.2-.6.1-1.7-.9-2.8-1.6-4-3.5-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5s-.7-1.6-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6 1.9.8 2.7.9 3.6.8.6-.1 1.7-.7 1.9-1.4.2-.6.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 00-8.6 15L2 22l5.1-1.3A10 10 0 1012 2z" /></svg>
              <span className="font-lato text-[10px] tracking-[0.18em] uppercase">WhatsApp</span>
            </a>
          </div>
        ))}
      </div>
    );
  }

  if (id === "kalendar") {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="rounded-2xl px-6 py-5 w-full"
          style={{ background: "rgba(255,255,255,0.7)", border: "1px solid #ecd9dd" }}>
          <p className="font-lato text-[#cf8c9a] text-[9px] tracking-[0.4em] uppercase mb-1">Tarikh Majlis</p>
          <p className="font-playfair text-[#4a3036] text-lg tracking-wide">{DATE_LABEL}</p>
          <div className="w-8 h-px bg-[#ecd9dd] mx-auto my-3" />
          <p className="font-lato text-[#cf8c9a] text-[9px] tracking-[0.4em] uppercase mb-1">Masa</p>
          <p className="font-playfair text-[#4a3036] text-base">{TIME_LABEL}</p>
        </div>
        <PillLink href={GCAL_URL} filled>Tambah ke Google Kalendar</PillLink>
      </div>
    );
  }

  if (id === "rsvp") {
    if (rSent) {
      return (
        <div className="text-center py-4">
          <p className="font-script text-3xl text-[#cf8c9a] mb-1">Terima kasih</p>
          <p className="font-lato text-[#8c676f] text-[11px] leading-relaxed">
            Kehadiran anda telah disahkan.<br />Kami menantikan kedatangan anda.
          </p>
        </div>
      );
    }
    return (
      <form
        onSubmit={handleRSVPSubmit}
        className="flex flex-col gap-5 text-left"
      >
        <div>
          <label className="font-lato text-[#cf8c9a] text-[9px] tracking-[0.32em] uppercase">Nama anda</label>
          <input value={rName} onChange={e => setRName(e.target.value)} required disabled={rLoading}
            className="w-full bg-transparent border-b-2 border-[#ecd9dd] py-2 mt-1 text-[#4a3036] font-playfair text-base focus:outline-none focus:border-[#cf8c9a] transition-colors disabled:opacity-60" />
        </div>
        <div className="flex gap-10 items-center">
          <div>
            <label className="font-lato text-[#cf8c9a] text-[9px] tracking-[0.32em] uppercase">Bilangan kehadiran</label>
          </div>
          <div className="flex items-center gap-5 mt-2">
            <button type="button" onClick={() => setRCount(c => Math.max(1, c - 1))} disabled={rLoading}
              className="w-8 h-8 rounded-full border border-[#ecd9dd] bg-white/70 text-[#8c676f] text-lg flex items-center justify-center active:scale-95 transition disabled:opacity-60">−</button>
            <span className="font-playfair text-[#4a3036] text-xl w-8 text-center" style={{ fontVariantNumeric: "tabular-nums" }}>{rCount}</span>
            <button type="button" onClick={() => setRCount(c => Math.min(15, c + 1))} disabled={rLoading}
              className="w-8 h-8 rounded-full border border-[#ecd9dd] bg-white/70 text-[#8c676f] text-lg flex items-center justify-center active:scale-95 transition disabled:opacity-60">+</button>
            <span className="font-lato text-[#8c676f] text-[10px]">orang</span>
          </div>
        </div>
        <button type="submit" disabled={rLoading}
          className="w-full py-3.5 rounded-full font-lato text-[10px] tracking-[0.34em] uppercase active:scale-[0.98] transition disabled:opacity-60"
          style={{ background: "linear-gradient(135deg,#d892a0,#bd6f80)", color: "#fff", boxShadow: "0 4px 18px rgba(189,111,128,0.35)" }}>
          {rLoading ? "Menghantar..." : "Hantar"}
        </button>
      </form>
    );
  }

  if (id === "ucapan") {
    if (wSent) {
      return (
        <div className="text-center py-4">
          <p className="font-script text-3xl text-[#cf8c9a] mb-1">Terima kasih</p>
          <p className="font-lato text-[#8c676f] text-[11px] leading-relaxed">
            Ucapan anda amat kami hargai.
          </p>
        </div>
      );
    }
    return (
      <form
        onSubmit={handleWishSubmit}
        className="flex flex-col gap-5 text-left"
      >
        <p className="font-lato text-[#8c676f] text-[11px] text-center leading-relaxed">
          Tinggalkan ucapan &amp; doa untuk pasangan.
        </p>
        <div>
          <label className="font-lato text-[#cf8c9a] text-[9px] tracking-[0.32em] uppercase">Nama anda</label>
          <input value={wName} onChange={e => setWName(e.target.value)} required disabled={wLoading}
            className="w-full bg-transparent border-b-2 border-[#ecd9dd] py-2 mt-1 text-[#4a3036] font-playfair text-base focus:outline-none focus:border-[#cf8c9a] transition-colors disabled:opacity-60" />
        </div>
        <div>
          <label className="font-lato text-[#cf8c9a] text-[9px] tracking-[0.32em] uppercase">Ucapan</label>
          <textarea value={wMsg} onChange={e => setWMsg(e.target.value)} required rows={3} disabled={wLoading}
            className="w-full bg-transparent border-b-2 border-[#ecd9dd] py-2 mt-1 text-[#4a3036] font-lato text-sm resize-none focus:outline-none focus:border-[#cf8c9a] transition-colors disabled:opacity-60" />
        </div>
        <button type="submit" disabled={wLoading}
          className="w-full py-3.5 rounded-full font-lato text-[10px] tracking-[0.34em] uppercase active:scale-[0.98] transition disabled:opacity-60"
          style={{ background: "linear-gradient(135deg,#d892a0,#bd6f80)", color: "#fff", boxShadow: "0 4px 18px rgba(189,111,128,0.35)" }}>
          {wLoading ? "Menghantar..." : "Hantar Ucapan"}
        </button>
      </form>
    );
  }

  // lokasi
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div>
        <p className="font-playfair text-[#4a3036] text-base">{VENUE_NAME}</p>
        <p className="font-lato text-[#8c676f] text-[11px] leading-relaxed mt-1">{VENUE_ADDR}</p>
      </div>
      <div
        className="w-full overflow-hidden shadow-sm"
        style={{ height: 180, borderRadius: 16, border: "1px solid #ecd9dd" }}
      >
        <iframe
          title="Location Map"
          className="w-full h-full border-0"
          loading="lazy"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.6827004158977!2d103.26901097492869!3d1.874745959663987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d0641eced7a395%3A0x46548fc5ef0c9cac!2s14%2C%20Jalan%20Orked%2C%20Kampung%20Perak%2C%2086200%20Simpang%20Renggam%2C%20Johor%20Darul%20Ta'zim!5e0!3m2!1sen!2smy!4v1786150372860!5m2!1sen!2smy"
        />
      </div>
      <div className="flex gap-2 w-full">
        <PillLink href={MAPS_URL}>Google Maps</PillLink>
      </div>
    </div>
  );
}

/* ── Bottom nav + sheet ────────────────────────────── */
export default function BottomNav() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!openId) return;
    const r = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(r);
  }, [openId]);

  function close() {
    setVisible(false);
    setTimeout(() => setOpenId(null), 320);
  }

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId]);

  return (
    <>
      <nav
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-0.5 px-2 py-2 rounded-[28px]"
        style={{
          width: "calc(100% - 2.5rem)",
          maxWidth: 390,
          background: "rgba(255,255,255,0.45)",
          backdropFilter: "blur(18px) saturate(160%)",
          WebkitBackdropFilter: "blur(18px) saturate(160%)",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow: "0 10px 34px rgba(114,80,88,0.22), inset 0 1px 0 rgba(255,255,255,0.55)",
        }}
      >
        {NAV.map(item => {
          const isActive = openId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setOpenId(item.id)}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-1.5 rounded-[20px] transition-all duration-300"
              style={{ color: isActive ? "#ffffff" : "#ccaab1" }}
            >
              <span
                className="flex items-center justify-center rounded-2xl transition-all duration-300"
                style={{
                  width: 40,
                  height: 34,
                  background: isActive ? "linear-gradient(145deg, #d892a0, #bd6f80)" : "transparent",
                  boxShadow: isActive ? "0 6px 16px rgba(189,111,128,0.42)" : "none",
                  transform: isActive ? "translateY(-2px)" : "none",
                }}
              >
                {ICONS[item.id]}
              </span>
              <span
                className="font-lato text-[8px] tracking-[0.15em] uppercase transition-colors duration-300"
                style={{ color: isActive ? "#bd6f80" : "#d1b6bc" }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom sheet modal */}
      {openId && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[59]"
            onClick={close}
            style={{
              background: "rgba(71,50,56,0.42)",
              backdropFilter: "blur(3px)",
              WebkitBackdropFilter: "blur(3px)",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          />
          {/* Sheet */}
          <div className="fixed inset-x-0 bottom-0 z-[60] flex justify-center pointer-events-none">
            <div
              role="dialog"
              aria-modal="true"
              className="w-full max-w-[430px] pointer-events-auto px-6 pt-3 pb-9"
              style={{
                background: "linear-gradient(180deg,#fffafb 0%,#fdf6f7 100%)",
                borderTopLeftRadius: 28,
                borderTopRightRadius: 28,
                borderTop: "1px solid #ecd9dd",
                boxShadow: "0 -14px 44px rgba(114,80,88,0.24)",
                transform: visible ? "translateY(0)" : "translateY(100%)",
                transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {/* Drag handle */}
              <div className="w-10 h-1.5 rounded-full mx-auto mb-4" style={{ background: "#eed3d9" }} />

              {/* Header */}
              <div className="flex items-center justify-center relative mb-5">
                <h3 className="font-script text-[2.3rem] leading-none text-[#4a3036] drop-shadow-sm">
                  {SHEET_TITLE[openId]}
                </h3>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Tutup"
                  className="absolute right-0 top-1 w-7 h-7 rounded-full flex items-center justify-center active:scale-90 transition"
                  style={{ background: "rgba(207,140,154,0.1)", color: "#cf8c9a" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              <SheetBody key={openId} id={openId} onClose={close} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
