export default function GoldDivider({ tight = false }: { tight?: boolean }) {
  return (
    <div className={`flex items-center justify-center w-full ${tight ? "py-4" : "py-7"}`}>
      <div className="flex items-center gap-2.5 w-full max-w-[220px]">
        <div className="flex-1 h-px bg-[#7d8a4e] opacity-40" />
        <svg width="30" height="14" viewBox="0 0 30 14" xmlns="http://www.w3.org/2000/svg">
          {/* olive leaf sprig flanking an amethyst bud — echoes the border */}
          <path d="M4,7 Q7,3 10,7 Q7,11 4,7 Z" fill="#7d8a4e" opacity="0.55" />
          <path d="M26,7 Q23,3 20,7 Q23,11 26,7 Z" fill="#7d8a4e" opacity="0.55" />
          <circle cx="15" cy="7" r="2.4" fill="#cf8c9a" />
          <circle cx="15" cy="7" r="4.2" fill="none" stroke="#cf8c9a" strokeWidth="0.5" opacity="0.4" />
        </svg>
        <div className="flex-1 h-px bg-[#7d8a4e] opacity-40" />
      </div>
    </div>
  );
}
