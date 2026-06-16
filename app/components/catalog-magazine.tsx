"use client";

import { CSSProperties, ReactNode } from "react";
import { SURAT } from "@/app/lib/tokens";
import { CatIcon } from "./catalog-icons";
import type { Theme } from "./catalog-data";

// "Elegant Magazine" template (cat: Modern).
// A dark, photo-forward, editorial invitation style. Selected via theme.tpl === 'magazine'.

// Moody photo placeholder — reads as photography behind the type.
function magPhoto(t: Theme, { soft = false }: { soft?: boolean } = {}): CSSProperties {
  const a = t.accent;
  return {
    backgroundColor: t.bg,
    backgroundImage: [
      `linear-gradient(180deg, rgba(0,0,0,${soft ? 0.15 : 0.42}) 0%, rgba(0,0,0,${soft ? 0.25 : 0.58}) 100%)`,
      `radial-gradient(120% 90% at 72% 18%, ${a}3a 0%, rgba(0,0,0,0) 52%)`,
      `radial-gradient(100% 80% at 18% 95%, ${a}26 0%, rgba(0,0,0,0) 55%)`,
      `repeating-linear-gradient(128deg, rgba(255,255,255,.045) 0 11px, rgba(255,255,255,.085) 11px 22px)`,
    ].join(","),
    backgroundBlendMode: "normal",
  };
}

const MagLabel = ({ children, t, style }: { children: ReactNode; t: Theme; style?: CSSProperties }) => (
  <div className="cat-mono" style={{ fontSize: 10, letterSpacing: "0.34em", textTransform: "uppercase", color: t.accent, fontWeight: 600, ...style }}>{children}</div>
);

// Thin rule with a centered hairline diamond — refined, not the chunky classic one.
const MagRule = ({ t, w = 60 }: { t: Theme; w?: number }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
    <div style={{ width: w, height: 1, background: `linear-gradient(90deg, transparent, ${t.accent})`, opacity: 0.7 }} />
    <span style={{ width: 5, height: 5, border: `1px solid ${t.accent}`, transform: "rotate(45deg)", flexShrink: 0 }} />
    <div style={{ width: w, height: 1, background: `linear-gradient(90deg, ${t.accent}, transparent)`, opacity: 0.7 }} />
  </div>
);

// ─── Mini cover (catalog card preview) ────────────────────────────────
export function MiniInviteMagazine({ theme }: { theme: Theme }) {
  const t = theme;
  if (t.cover) {
    return (
      <div style={{ width: "100%", height: "100%", background: t.bg, position: "relative", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={t.cover} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
      </div>
    );
  }
  return (
    <div style={{ width: "100%", height: "100%", position: "relative", color: t.ink, ...magPhoto(t), display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "22px 18px", textAlign: "center", overflow: "hidden" }}>
      {/* corner monogram */}
      <div className="mag-serif" style={{ position: "absolute", top: 16, left: 18, fontSize: 16, letterSpacing: "0.12em", color: t.ink, opacity: 0.92 }}>A &amp; R</div>
      {/* hairline editorial frame */}
      <div style={{ position: "absolute", left: 12, right: 12, top: 12, bottom: 12, border: `1px solid ${t.accent}`, opacity: 0.22, pointerEvents: "none" }} />

      <MagLabel t={t} style={{ fontSize: 8.5, letterSpacing: "0.3em" }}>The Wedding Of</MagLabel>
      <div className="mag-serif" style={{ fontSize: 40, fontWeight: 500, lineHeight: 0.92, margin: "12px 0 10px", color: t.ink, letterSpacing: "-0.01em" }}>
        Rangga
        <div className="mag-serif" style={{ fontStyle: "italic", fontSize: 22, color: t.accent, lineHeight: 1, margin: "2px 0" }}>&amp;</div>
        Ayu
      </div>
      <MagRule t={t} w={28} />
      <div className="cat-mono" style={{ fontSize: 9.5, letterSpacing: "0.26em", textTransform: "uppercase", color: t.ink2, marginTop: 12 }}>12 · 12 · 2026</div>
    </div>
  );
}

const MAG_LINE = "rgba(255,255,255,0.13)";
const MAG_CARD_BG = "rgba(255,255,255,0.05)";

const MagSection = ({ children, pad = "46px 26px" }: { children: ReactNode; pad?: string }) => (
  <div style={{ padding: pad, borderTop: `1px solid ${MAG_LINE}` }}>{children}</div>
);
const MagPhotoBox = ({ t, h, label, style }: { t: Theme; h: number; label: string; style?: CSSProperties }) => (
  <div style={{ height: h, position: "relative", overflow: "hidden", ...magPhoto(t, { soft: true }), ...style }}>
    <span className="cat-mono" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", fontSize: 8.5, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,.5)", whiteSpace: "nowrap" }}>{label}</span>
  </div>
);

// ─── Full demo invitation ─────────────────────────────────────────────
export function FullInviteMagazine({ theme }: { theme: Theme }) {
  const t = theme;
  const line = MAG_LINE;
  const cardBg = MAG_CARD_BG;

  return (
    <div className="mag-root" style={{ background: t.bg, color: t.ink, fontFamily: SURAT.sans }}>
      {/* 1. Cover — full bleed real photo (composed hero) */}
      {t.cover ? (
        <div style={{ minHeight: 620, position: "relative", background: t.bg, overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={t.cover} alt={t.name} style={{ width: "100%", height: "100%", minHeight: 620, objectFit: "cover", objectPosition: "center", display: "block" }} />
        </div>
      ) : (
        <div style={{ minHeight: 620, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "54px 26px", textAlign: "center", ...magPhoto(t) }}>
          {/* top bar: monogram + faux nav */}
          <div style={{ position: "absolute", top: 20, left: 22, right: 22, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span className="mag-serif" style={{ fontSize: 17, letterSpacing: "0.14em", color: t.ink }}>A &amp; R</span>
            <div style={{ display: "flex", gap: 12 }} className="cat-mono">
              {["Kisah", "Galeri", "Acara"].map((n) => (
                <span key={n} style={{ fontSize: 8, letterSpacing: "0.18em", textTransform: "uppercase", color: t.ink2 }}>{n}</span>
              ))}
            </div>
          </div>

          <MagLabel t={t} style={{ fontSize: 9 }}>Dengan penuh syukur</MagLabel>
          <div className="mag-serif" style={{ fontSize: 62, fontWeight: 500, lineHeight: 0.9, margin: "18px 0", color: t.ink, letterSpacing: "-0.015em" }}>
            Rangga
            <div className="mag-serif" style={{ fontStyle: "italic", fontSize: 30, color: t.accent, lineHeight: 1, margin: "4px 0" }}>&amp;</div>
            Ayu
          </div>
          <MagRule t={t} w={34} />
          <div className="cat-mono" style={{ fontSize: 10, letterSpacing: "0.26em", textTransform: "uppercase", color: t.ink, marginTop: 16, opacity: 0.92 }}>Sabtu · 12 Desember 2026</div>
          <div className="cat-mono" style={{ fontSize: 9.5, letterSpacing: "0.22em", textTransform: "uppercase", color: t.ink2, marginTop: 5 }}>Bandung, Indonesia</div>

          {/* scroll cue */}
          <div style={{ position: "absolute", bottom: 22, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
            <span className="cat-mono" style={{ fontSize: 8.5, letterSpacing: "0.3em", textTransform: "uppercase", color: t.ink2 }}>Geser</span>
            <div style={{ width: 1, height: 26, background: `linear-gradient(${t.accent}, transparent)` }} />
          </div>
        </div>
      )}

      {/* 2. Kisah — editorial opener */}
      <MagSection pad="52px 30px">
        <MagLabel t={t} style={{ textAlign: "center" }}>Bismillah</MagLabel>
        <p className="mag-serif" style={{ fontSize: 25, fontStyle: "italic", lineHeight: 1.45, color: t.ink, textAlign: "center", margin: "16px auto 0", maxWidth: 280, fontWeight: 400 }}>
          &quot;{t.quote}&quot;
        </p>
        <div style={{ marginTop: 22 }}><MagRule t={t} w={40} /></div>
      </MagSection>

      {/* 3. Mempelai — asymmetric editorial pairs */}
      <MagSection>
        <MagLabel t={t} style={{ textAlign: "center", marginBottom: 26 }}>Mempelai</MagLabel>
        {[
          { n: "Anindya Larasati", sub: "Putri", d: "Putri dari Bapak Suryana\n& Ibu Wulan" },
          { n: "Raditya Pratama", sub: "Putra", d: "Putra dari Bapak Hidayat\n& Ibu Sari" },
        ].map((p, i) => (
          <div key={i} style={{ display: "flex", gap: 16, alignItems: "center", marginTop: i ? 24 : 0, flexDirection: i ? "row-reverse" : "row", textAlign: i ? "right" : "left" }}>
            <MagPhotoBox t={t} h={108} label="Foto" style={{ width: 90, flexShrink: 0, borderRadius: 2 }} />
            <div style={{ flex: 1 }}>
              <div className="cat-mono" style={{ fontSize: 8.5, letterSpacing: "0.24em", textTransform: "uppercase", color: t.accent }}>{p.sub}</div>
              <div className="mag-serif" style={{ fontSize: 30, fontWeight: 500, color: t.ink, lineHeight: 1.05, margin: "4px 0 6px" }}>{p.n}</div>
              <div style={{ fontSize: 11.5, color: t.ink2, lineHeight: 1.5, whiteSpace: "pre-line" }}>{p.d}</div>
            </div>
          </div>
        ))}
      </MagSection>

      {/* 4. Galeri — magazine photo grid */}
      <MagSection pad="46px 0 46px">
        <div style={{ padding: "0 26px" }}><MagLabel t={t}>Galeri</MagLabel>
          <div className="mag-serif" style={{ fontSize: 26, color: t.ink, margin: "6px 0 18px", fontWeight: 500 }}>Momen kami</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, padding: "0 26px" }}>
          <MagPhotoBox t={t} h={150} label="Foto 01" style={{ gridRow: "span 2" }} />
          <MagPhotoBox t={t} h={72} label="Foto 02" />
          <MagPhotoBox t={t} h={72} label="Foto 03" />
        </div>
      </MagSection>

      {/* 5. Acara — editorial event entries */}
      <MagSection>
        <MagLabel t={t} style={{ textAlign: "center", marginBottom: 8 }}>Waktu &amp; Tempat</MagLabel>
        {[
          { title: "Akad Nikah", time: "08.00 – 10.00 WITA", place: "Pura Taman Saraswati, Ubud" },
          { title: "Resepsi", time: "11.00 – 14.00 WITA", place: "The Royal Pita Maha, Ubud" },
        ].map((e, i) => (
          <div key={i} style={{ background: cardBg, border: `1px solid ${line}`, padding: "22px 20px", marginTop: 14, textAlign: "center" }}>
            <div className="mag-serif" style={{ fontSize: 23, color: t.ink, fontWeight: 500 }}>{e.title}</div>
            <div style={{ margin: "12px 0" }}><MagRule t={t} w={26} /></div>
            <div className="cat-mono" style={{ fontSize: 9.5, letterSpacing: "0.2em", textTransform: "uppercase", color: t.accent }}>Sabtu, 12 Sep 2026</div>
            <div style={{ fontSize: 12.5, color: t.ink, marginTop: 7 }}>{e.time}</div>
            <div style={{ fontSize: 11.5, color: t.ink2, marginTop: 5, lineHeight: 1.5 }}>{e.place}</div>
          </div>
        ))}
        <a className="cat-btn" href="#" onClick={(e) => e.preventDefault()} style={{ marginTop: 16, width: "100%", background: "transparent", color: t.ink, border: `1px solid ${t.accent}`, borderRadius: 0, letterSpacing: "0.04em" }}>
          <CatIcon.Pin width={14} height={14} style={{ color: t.accent }} /> Lihat Lokasi
        </a>
      </MagSection>

      {/* 6. Ucapan / RSVP */}
      <MagSection>
        <MagLabel t={t} style={{ textAlign: "center" }}>Ucapan &amp; Konfirmasi</MagLabel>
        <div style={{ maxWidth: 280, margin: "16px auto 0", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: cardBg, border: `1px solid ${line}`, padding: "12px 14px", fontSize: 12.5, color: t.ink2 }}>Nama Anda</div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1, padding: "11px 0", textAlign: "center", background: t.accent, color: t.bg, fontSize: 12.5, fontWeight: 600, letterSpacing: "0.02em" }}>Hadir</div>
            <div style={{ flex: 1, padding: "11px 0", textAlign: "center", background: "transparent", border: `1px solid ${line}`, color: t.ink2, fontSize: 12.5 }}>Berhalangan</div>
          </div>
          <div style={{ background: cardBg, border: `1px solid ${line}`, padding: "12px 14px", fontSize: 12.5, color: t.ink2, minHeight: 58 }}>Ucapan &amp; doa…</div>
          <button className="cat-btn" style={{ width: "100%", background: t.ink, color: t.bg, borderRadius: 0, letterSpacing: "0.04em" }}>Kirim Ucapan</button>
        </div>
      </MagSection>

      {/* 7. Closing */}
      <div style={{ padding: "54px 30px", textAlign: "center", borderTop: `1px solid ${line}`, ...magPhoto(t, { soft: true }) }}>
        <MagLabel t={t}>Sampai jumpa</MagLabel>
        <p style={{ fontSize: 12.5, lineHeight: 1.65, color: t.ink2, margin: "14px auto 0", maxWidth: 270 }}>
          Suatu kehormatan bagi kami apabila Bapak/Ibu berkenan hadir dan memberikan doa restu.
        </p>
        <div className="mag-serif" style={{ fontSize: 38, fontWeight: 500, color: t.ink, margin: "20px 0 4px", letterSpacing: "-0.01em" }}>Anindya &amp; Raditya</div>
        <div style={{ marginTop: 18 }}><MagRule t={t} w={30} /></div>
        <div className="cat-mono" style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: t.ink2, marginTop: 18 }}>Dibuat dengan Surat</div>
      </div>
    </div>
  );
}
