"use client";

import { ReactNode } from "react";
import { SURAT } from "@/app/lib/tokens";
import { Icon } from "./icons";
import { CatIcon } from "./catalog-icons";
import { FullInviteMagazine } from "./catalog-magazine";
import type { Theme } from "./catalog-data";

function darkCardBg(t: Theme) { return t.dark ? "rgba(255,255,255,0.06)" : "#ffffff"; }
function darkCardBd(t: Theme) { return t.dark ? "rgba(255,255,255,0.12)" : SURAT.border; }

const FullLabel = ({ t, children }: { t: Theme; children: ReactNode }) => (
  <div style={{ fontFamily: SURAT.mono, fontSize: 10.5, letterSpacing: "0.22em", textTransform: "uppercase", color: t.accent, fontWeight: 600, marginBottom: 10 }}>{children}</div>
);
const FullDiamond = ({ t }: { t: Theme }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 9, justifyContent: "center", margin: "16px 0" }}>
    <div style={{ width: 34, height: 1, background: t.accent, opacity: 0.5 }} />
    <span style={{ width: 7, height: 7, background: t.accent, transform: "rotate(45deg)" }} />
    <div style={{ width: 34, height: 1, background: t.accent, opacity: 0.5 }} />
  </div>
);
const FullSection = ({ t, children, alt }: { t: Theme; children: ReactNode; alt?: boolean }) => (
  <div style={{ padding: "38px 26px", textAlign: "center", background: alt ? (t.dark ? "rgba(0,0,0,.18)" : "rgba(0,0,0,.015)") : "transparent", borderTop: `1px solid ${darkCardBd(t)}` }}>{children}</div>
);
const FullEventCard = ({ t, title, date, time, place }: { t: Theme; title: string; date: string; time: string; place: string }) => (
  <div style={{ background: darkCardBg(t), border: `1px solid ${darkCardBd(t)}`, borderRadius: 14, padding: "20px 18px", marginTop: 14 }}>
    <div className="cat-serif" style={{ fontSize: 19, color: t.ink, fontWeight: 500 }}>{title}</div>
    <FullDiamond t={t} />
    <div className="cat-serif" style={{ fontSize: 15, color: t.ink }}>{date}</div>
    <div style={{ fontSize: 13, color: t.ink2, marginTop: 4 }}>{time}</div>
    <div style={{ fontSize: 12.5, color: t.ink2, marginTop: 8, lineHeight: 1.5 }}>{place}</div>
  </div>
);

// Full scrollable invitation shown in the "Lihat demo" modal.
export function FullInvite({ theme }: { theme: Theme }) {
  if (theme.tpl === "magazine") return <FullInviteMagazine theme={theme} />;
  const t = theme;
  const cardBg = darkCardBg(t);
  const cardBd = darkCardBd(t);
  const photoBg = t.dark
    ? "repeating-linear-gradient(135deg, rgba(255,255,255,.05) 0 9px, rgba(255,255,255,.09) 9px 18px)"
    : "repeating-linear-gradient(135deg, rgba(0,0,0,.04) 0 9px, rgba(0,0,0,.07) 9px 18px)";

  return (
    <div style={{ background: t.bg, color: t.ink, fontFamily: SURAT.sans }}>
      {/* 1. Cover */}
      <div style={{ minHeight: 560, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 26px", textAlign: "center", background: t.photo ? photoBg : t.bg }}>
        <div style={{ position: "absolute", inset: 16, border: `1px solid ${t.accent}`, opacity: 0.3, borderRadius: 10, pointerEvents: "none" }} />
        <div style={{ width: 84, height: 84, borderRadius: 999, border: `1.5px solid ${t.accent}`, color: t.accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SURAT.serif, fontSize: 30, background: t.dark ? "rgba(0,0,0,.25)" : "rgba(255,255,255,.6)", marginBottom: 22 }}>R&amp;A</div>
        <div style={{ fontFamily: SURAT.mono, fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: t.accent, fontWeight: 600 }}>The Wedding Of</div>
        <div className="cat-serif" style={{ fontSize: 46, fontWeight: 500, lineHeight: 1.02, margin: "14px 0", color: t.ink }}>
          Rangga<br /><span style={{ fontStyle: "italic", fontSize: 28, color: t.accent }}>&amp;</span><br />Ayu
        </div>
        <div className="cat-serif" style={{ fontSize: 16, color: t.ink }}>Sabtu, 12 Desember 2026</div>
        <div style={{ position: "absolute", bottom: 18, left: 0, right: 0, fontSize: 11, color: t.ink2, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <span>geser ke bawah</span>
          <Icon.ChevronDown width={16} height={16} style={{ color: t.accent }} />
        </div>
      </div>

      {/* 2. Quote */}
      <FullSection t={t}>
        <FullLabel t={t}>Bismillah</FullLabel>
        <p className="cat-serif" style={{ fontSize: 18, fontStyle: "italic", lineHeight: 1.6, color: t.ink, margin: "0 auto", maxWidth: 260 }}>&quot;{t.quote}&quot;</p>
      </FullSection>

      {/* 3. Mempelai */}
      <FullSection t={t} alt>
        <FullLabel t={t}>Mempelai</FullLabel>
        {[
          { n: "Ayu Lestari", d: "Putri dari Bapak Suryana & Ibu Wulan" },
          { n: "Rangga Pratama", d: "Putra dari Bapak Hidayat & Ibu Sari" },
        ].map((p, i) => (
          <div key={i} style={{ marginTop: i ? 22 : 6 }}>
            <div style={{ width: 64, height: 64, borderRadius: 999, margin: "0 auto 12px", background: photoBg, border: `1px solid ${cardBd}` }} />
            <div className="cat-serif" style={{ fontSize: 24, fontWeight: 500, color: t.ink }}>{p.n}</div>
            <div style={{ fontSize: 12.5, color: t.ink2, marginTop: 4, lineHeight: 1.5 }}>{p.d}</div>
            {i === 0 && <div className="cat-serif" style={{ fontSize: 18, fontStyle: "italic", color: t.accent, marginTop: 18 }}>&amp;</div>}
          </div>
        ))}
      </FullSection>

      {/* 4. Acara */}
      <FullSection t={t}>
        <FullLabel t={t}>Waktu &amp; Tempat</FullLabel>
        <FullEventCard t={t} title="Akad Nikah" date="Sabtu, 12 Desember 2026" time="08.00 – 10.00 WIB" place="Masjid Al-Hikmah, Jl. Merdeka No. 12, Bandung" />
        <FullEventCard t={t} title="Resepsi" date="Sabtu, 12 Desember 2026" time="11.00 – 14.00 WIB" place="Graha Saba, Jl. Setiabudi No. 88, Bandung" />
      </FullSection>

      {/* 5. Lokasi */}
      <FullSection t={t} alt>
        <FullLabel t={t}>Lokasi</FullLabel>
        <div style={{ height: 150, borderRadius: 14, background: photoBg, border: `1px solid ${cardBd}`, display: "flex", alignItems: "center", justifyContent: "center", color: t.ink2, marginBottom: 14 }}>
          <CatIcon.Pin width={26} height={26} style={{ color: t.accent }} />
        </div>
        <button className="cat-btn cat-btn-primary" style={{ background: t.accent, width: "100%" }}>
          <CatIcon.Pin width={15} height={15} /> Buka Google Maps
        </button>
      </FullSection>

      {/* 6. RSVP */}
      <FullSection t={t}>
        <FullLabel t={t}>Konfirmasi Kehadiran</FullLabel>
        <div style={{ maxWidth: 260, margin: "0 auto", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: cardBg, border: `1px solid ${cardBd}`, borderRadius: 10, padding: "11px 13px", fontSize: 13, color: t.ink2, textAlign: "left" }}>Nama Anda</div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1, padding: "10px 0", borderRadius: 10, background: t.accent, color: "#fff", fontSize: 13, fontWeight: 500 }}>Hadir</div>
            <div style={{ flex: 1, padding: "10px 0", borderRadius: 10, background: cardBg, border: `1px solid ${cardBd}`, color: t.ink2, fontSize: 13 }}>Tidak hadir</div>
          </div>
          <div style={{ background: cardBg, border: `1px solid ${cardBd}`, borderRadius: 10, padding: "11px 13px", fontSize: 13, color: t.ink2, textAlign: "left", minHeight: 56 }}>Ucapan &amp; doa…</div>
          <button className="cat-btn cat-btn-primary" style={{ background: t.accent, width: "100%" }}>Kirim ucapan</button>
        </div>
      </FullSection>

      {/* 7. Closing */}
      <FullSection t={t} alt>
        <p style={{ fontSize: 13.5, lineHeight: 1.65, color: t.ink2, margin: "0 auto", maxWidth: 270 }}>
          Merupakan suatu kebahagiaan &amp; kehormatan bagi kami apabila Bapak/Ibu berkenan hadir
          dan memberikan doa restu.
        </p>
        <div className="cat-serif" style={{ fontSize: 26, fontWeight: 500, color: t.ink, margin: "18px 0 6px" }}>Rangga &amp; Ayu</div>
        <div style={{ fontFamily: SURAT.mono, fontSize: 10.5, letterSpacing: "0.16em", textTransform: "uppercase", color: t.ink2, marginTop: 18 }}>Dibuat dengan Surat</div>
      </FullSection>
    </div>
  );
}
