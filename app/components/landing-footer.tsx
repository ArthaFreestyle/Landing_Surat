"use client";

import { SURAT } from "@/app/lib/tokens";
import { LIcon } from "./landing-icons";
import { Wordmark } from "./wordmark";

export function FinalCTA() {
  return (
    <section className="lp-section" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <div className="lp-container">
        <div
          style={{
            position: "relative", overflow: "hidden",
            borderRadius: 28, background: SURAT.ink, color: "#f5efe0",
            padding: "clamp(48px, 7vw, 88px) clamp(28px, 6vw, 80px)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              position: "absolute", bottom: -200, left: "50%", transform: "translateX(-50%)",
              width: 800, height: 500, borderRadius: "50%",
              background: "radial-gradient(closest-side, rgba(193,95,60,0.35), transparent)",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative" }}>
            <h2
              className="lp-serif"
              style={{
                fontSize: "clamp(34px, 5vw, 60px)", fontWeight: 500, lineHeight: 1.05,
                margin: 0, color: "#fff", maxWidth: 720, marginInline: "auto",
              }}
            >
              Berhenti mengetik ulang<br />data yang itu-itu saja.
            </h2>
            <p style={{ fontSize: "clamp(16px, 2vw, 19px)", lineHeight: 1.55, color: "rgba(245,239,224,.7)", margin: "20px auto 0", maxWidth: 520 }}>
              Pasang Surat, foto satu dokumen, dan biarkan form berikutnya — atau spreadsheet stok Anda — terisi sendiri.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 34 }}>
              <button className="lp-btn lp-btn-dark lp-btn-lg">
                <LIcon.Puzzle width={19} height={19} />
                Tambahkan ke Chrome — Gratis
              </button>
            </div>
            <p style={{ fontSize: 13.5, color: "rgba(245,239,224,.5)", marginTop: 18 }}>
              Gratis 15 scan per bulan · Tanpa kartu kredit
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const cols = [
    { h: "Produk",    items: ["Cara kerja", "Harga", "Tipe dokumen", "Unduh ekstensi"] },
    { h: "Use case",  items: ["Form fintech & KYC", "Nota → Google Sheets", "Foto struk → CSV", "Onboarding HR"] },
    { h: "Bantuan",   items: ["Pusat bantuan", "Privasi", "Ketentuan", "Status"] },
  ];

  return (
    <footer style={{ borderTop: `1px solid ${SURAT.border}`, background: SURAT.canvasBg }}>
      <div className="lp-container" style={{ padding: "56px 32px 40px" }}>
        <div
          className="lp-footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(220px, 1.4fr) repeat(3, minmax(120px, 1fr))",
            gap: 40,
          }}
        >
          <div className="lp-footer-brand">
            <Wordmark size={24} />
            <p style={{ fontSize: 14, lineHeight: 1.6, color: SURAT.ink2, margin: "16px 0 0", maxWidth: 260 }}>
              Asisten pengisian form &amp; spreadsheet untuk dokumen Indonesia.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <div style={{ fontSize: 13, fontWeight: 600, color: SURAT.ink, marginBottom: 14 }}>{c.h}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 11 }}>
                {c.items.map((it) => (
                  <li key={it}>
                    <a className="lp-link" style={{ fontSize: 14 }}>{it}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: 12,
            marginTop: 48, paddingTop: 24,
            borderTop: `1px solid ${SURAT.border}`,
            fontSize: 13, color: SURAT.ink3,
          }}
        >
          <span>© 2026 Surat. Dibuat untuk Indonesia.</span>
          <span className="lp-mono" style={{ fontSize: 12 }}>surat.id</span>
        </div>
      </div>
    </footer>
  );
}
