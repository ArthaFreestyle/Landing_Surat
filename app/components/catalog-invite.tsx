"use client";

import { SURAT } from "@/app/lib/tokens";
import { MiniInviteMagazine } from "./catalog-magazine";
import type { Theme } from "./catalog-data";

// ─── Divider motifs for the classic (non-magazine) preview ────────────
function MiniDivider({ t }: { t: Theme }) {
  if (t.motif === "rule") return <div style={{ width: 46, height: 1.5, background: t.accent, margin: "14px 0" }} />;
  if (t.motif === "arch") return (
    <div style={{ width: 30, height: 16, borderTop: `1.5px solid ${t.accent}`, borderLeft: `1.5px solid ${t.accent}`, borderRight: `1.5px solid ${t.accent}`, borderTopLeftRadius: 16, borderTopRightRadius: 16, margin: "14px 0 12px" }} />
  );
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, width: 84, margin: "13px 0" }}>
      <div style={{ flex: 1, height: 1, background: t.accent, opacity: 0.5 }} />
      <span style={{ width: 7, height: 7, background: t.accent, transform: "rotate(45deg)" }} />
      <div style={{ flex: 1, height: 1, background: t.accent, opacity: 0.5 }} />
    </div>
  );
}

// ─── Mini invitation (card cover preview) ─────────────────────────────
export function MiniInvite({ theme }: { theme: Theme }) {
  if (theme.tpl === "magazine") return <MiniInviteMagazine theme={theme} />;
  const t = theme;
  const sub = t.ink2;
  return (
    <div style={{ width: "100%", height: "100%", background: t.bg, color: t.ink, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 20px", textAlign: "center" }}>
      {/* inset frame */}
      <div style={{ position: "absolute", inset: 14, border: `1px solid ${t.accent}`, opacity: 0.28, borderRadius: 6, pointerEvents: "none" }} />
      <div style={{ fontFamily: SURAT.mono, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: t.accent, fontWeight: 600 }}>The Wedding Of</div>
      <MiniDivider t={t} />
      <div className="cat-serif" style={{ fontSize: 30, fontWeight: 500, lineHeight: 1.06, color: t.ink }}>
        Rangga<br />
        <span style={{ fontStyle: "italic", fontSize: 19, color: t.accent }}>&amp;</span><br />
        Ayu
      </div>
      <MiniDivider t={t} />
      <div className="cat-serif" style={{ fontSize: 13.5, color: t.ink }}>12 · 12 · 2026</div>
      <div style={{ fontSize: 11.5, color: sub, marginTop: 3 }}>Bandung</div>
    </div>
  );
}
