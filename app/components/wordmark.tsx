import { SURAT } from "@/app/lib/tokens";

export function Wordmark({ size = 22, color = SURAT.ink }: { size?: number; color?: string }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="5" y="3" width="13" height="16" rx="2" stroke={SURAT.accent} strokeWidth="1.6"/>
        <rect x="7.5" y="5.5" width="13" height="16" rx="2" fill={SURAT.accent}/>
        <path d="M11 11.5h6M11 14.5h4" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
      <span
        className="sx-serif"
        style={{ fontSize: size * 0.95, fontWeight: 500, color, letterSpacing: "-0.025em", lineHeight: 1 }}
      >
        Surat
      </span>
    </div>
  );
}
