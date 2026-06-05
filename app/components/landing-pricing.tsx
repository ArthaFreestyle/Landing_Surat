"use client";

import { useState } from "react";
import { SURAT } from "@/app/lib/tokens";
import { Icon } from "./icons";

export function Pricing() {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: "Gratis",
      tagline: "Untuk kebutuhan sesekali",
      price: { m: 0, y: 0 },
      cta: "Mulai gratis",
      primary: false,
      features: ["15 scan per bulan", "Semua tipe dokumen", "Mode form, spreadsheet & export", "Preview & edit sebelum isi", "Undo dalam 10 detik"],
    },
    {
      name: "Pro",
      tagline: "Untuk yang sering isi form & nota",
      price: { m: 49000, y: 39000 },
      cta: "Pilih Pro",
      primary: true,
      badge: "Paling populer",
      features: ["200 scan per bulan", "Akurasi prioritas", "Template kolom spreadsheet tersimpan", "Riwayat dokumen", "Dukungan prioritas"],
    },
    {
      name: "Tim",
      tagline: "Untuk HR, koperasi, UMKM & toko",
      price: { m: 149000, y: 119000 },
      cta: "Hubungi kami",
      primary: false,
      features: ["Scan tak terbatas", "Akses API", "Penagihan terpusat", "Dashboard admin", "Onboarding tim"],
    },
  ];

  const fmt = (n: number) =>
    n === 0 ? "Rp0" : "Rp" + n.toLocaleString("id-ID");

  return (
    <section id="harga" className="lp-section">
      <div className="lp-container">
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 44px" }}>
          <div className="lp-eyebrow" style={{ marginBottom: 16 }}><span className="dot" />Harga</div>
          <h2
            className="lp-serif"
            style={{ fontSize: "clamp(32px, 4.4vw, 50px)", fontWeight: 500, lineHeight: 1.06, margin: 0, color: SURAT.ink }}
          >
            Mulai gratis. Tingkatkan saat butuh.
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: SURAT.ink2, margin: "18px 0 28px" }}>
            Tanpa kartu kredit untuk memulai. Batalkan kapan saja.
          </p>

          <div className="lp-toggle">
            <button className={!annual ? "active" : ""} onClick={() => setAnnual(false)}>Bulanan</button>
            <button className={annual ? "active" : ""} onClick={() => setAnnual(true)}>
              Tahunan
              <span
                style={{
                  fontSize: 11.5, fontWeight: 600, color: SURAT.success,
                  background: SURAT.successSoft, padding: "2px 7px", borderRadius: 999,
                }}
              >
                Hemat 20%
              </span>
            </button>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20, alignItems: "stretch",
            maxWidth: 1040, margin: "0 auto",
          }}
        >
          {plans.map((p) => {
            const price = annual ? p.price.y : p.price.m;
            const isPro = p.primary;
            return (
              <div
                key={p.name}
                className="lp-card"
                style={{
                  padding: "30px 28px", display: "flex", flexDirection: "column",
                  position: "relative",
                  background: isPro ? SURAT.ink : SURAT.card,
                  border: isPro ? `1px solid ${SURAT.ink}` : `1px solid ${SURAT.border}`,
                  boxShadow: isPro ? "0 24px 48px -20px rgba(42,37,31,.45)" : "none",
                  color: isPro ? "#f5efe0" : SURAT.ink,
                }}
              >
                {"badge" in p && p.badge && (
                  <span
                    style={{
                      position: "absolute", top: 20, right: 20,
                      fontSize: 11.5, fontWeight: 600, letterSpacing: "0.02em",
                      color: "#fff", background: SURAT.accent, padding: "4px 11px", borderRadius: 999,
                    }}
                  >
                    {p.badge}
                  </span>
                )}
                <div className="lp-serif" style={{ fontSize: 26, fontWeight: 500, color: isPro ? "#fff" : SURAT.ink }}>{p.name}</div>
                <div style={{ fontSize: 14, color: isPro ? "rgba(245,239,224,.6)" : SURAT.ink3, marginTop: 3 }}>{p.tagline}</div>

                <div style={{ display: "flex", alignItems: "baseline", gap: 6, margin: "24px 0 4px" }}>
                  <span className="lp-serif" style={{ fontSize: 42, fontWeight: 500, color: isPro ? "#fff" : SURAT.ink, letterSpacing: "-0.02em" }}>
                    {fmt(price)}
                  </span>
                  {price > 0 && (
                    <span style={{ fontSize: 14, color: isPro ? "rgba(245,239,224,.6)" : SURAT.ink3 }}>
                      /bln
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 12.5, color: isPro ? "rgba(245,239,224,.5)" : SURAT.ink3, minHeight: 18 }}>
                  {price === 0 ? "Selamanya" : annual ? "Ditagih tahunan" : "Ditagih bulanan"}
                </div>

                <button
                  className={"lp-btn " + (isPro ? "lp-btn-primary" : "lp-btn-secondary")}
                  style={{ width: "100%", marginTop: 24 }}
                >
                  {p.cta}
                </button>

                <div style={{ height: 1, background: isPro ? "rgba(245,239,224,.14)" : SURAT.border, margin: "26px 0 20px" }} />
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 13 }}>
                  {p.features.map((f, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 11, fontSize: 14.5, color: isPro ? "rgba(245,239,224,.9)" : SURAT.ink2 }}>
                      <Icon.Check width={16} height={16} style={{ color: isPro ? "#e8a07f" : SURAT.success, flexShrink: 0, marginTop: 2 }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
