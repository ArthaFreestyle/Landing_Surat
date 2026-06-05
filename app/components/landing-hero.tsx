"use client";

import { useState, useEffect } from "react";
import { SURAT } from "@/app/lib/tokens";
import { Icon } from "./icons";
import { LIcon } from "./landing-icons";
import { ScaledShot } from "./scaled-shot";
import { PopupFrame } from "./popup-shell";
import { InteractivePopup } from "./popup-app";

function DockPageSkeleton() {
  return (
    <div className="lp-dock-page">
      <div style={{ height: 12, width: 90, background: "#cfc8b7", borderRadius: 4, marginBottom: 16 }} />
      <div style={{ height: 18, width: "85%", background: "#bfb8a3", borderRadius: 5, marginBottom: 20 }} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <div key={i} style={{ marginBottom: 13 }}>
          <div style={{ height: 8, width: 54 + (i % 3) * 14, background: "#cfc8b7", borderRadius: 3, marginBottom: 5 }} />
          <div style={{ height: 28, background: "#f1ece0", borderRadius: 6, border: "1px solid #d9d1be" }} />
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <header className="lp-hero">
      <div className="lp-hero-bg" />
      <div className="lp-hero-glow" />
      <div className="lp-container lp-hero-grid">
        <div className="lp-hero-copy">
          <div className="lp-hero-index">
            <span>Surat</span>
            <span className="rule" />
            <span>Ekstensi Chrome</span>
          </div>
          <h1 className="lp-hero-h1">
            Isi formulir<br />
            apa pun, <span style={{ fontStyle: "italic", color: SURAT.accent }}>tanpa</span><br />
            ketik ulang.
          </h1>
          <p className="lp-hero-sub">
            Unggah KTP, NPWP, atau dokumen apa saja. Surat membacanya dengan AI lalu
            mengisi form yang sedang Anda buka — dalam hitungan detik.
          </p>
          <div className="lp-hero-actions">
            <button className="lp-btn lp-btn-primary lp-btn-lg">
              <LIcon.Puzzle width={19} height={19} />
              Tambahkan ke Chrome
            </button>
            <a
              href="#cara-kerja"
              className="lp-link lp-hero-link"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 15.5, fontWeight: 500, color: SURAT.ink }}
            >
              Lihat cara kerja
              <Icon.ArrowRight width={16} height={16} />
            </a>
          </div>
          <div className="lp-hero-meta">
            <span>Gratis 10 scan</span>
            <span className="sep" />
            <span>Tanpa kartu kredit</span>
            <span className="sep" />
            <span>Dokumen tidak disimpan</span>
          </div>
        </div>

        <div className="lp-hero-stage">
          {isMobile ? (
            <ScaledShot w={380} h={640} frame={true} align="center" cropH={640}>
              <PopupFrame width={380} height={640}>
                <InteractivePopup initial="preview" />
              </PopupFrame>
            </ScaledShot>
          ) : (
            <ScaledShot w={530} h={760} maxW={486} frame={true} align="center">
              <div className="lp-dock" style={{ width: 530, height: 760 }}>
                <div className="lp-dock-bar">
                  <div className="lp-dock-lights">
                    <span style={{ background: "#e8765a" }} />
                    <span style={{ background: "#e0b13b" }} />
                    <span style={{ background: "#6db465" }} />
                  </div>
                  <div className="lp-dock-url">
                    <span style={{ color: SURAT.ink3 }}>https://</span>app.kredivo.com/identitas
                  </div>
                  <div
                    style={{
                      width: 24, height: 24, borderRadius: 6,
                      background: SURAT.accentSoft, color: SURAT.accent,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: "0 0 0 1.5px rgba(193,95,60,0.5)",
                    }}
                  >
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="16" rx="2" />
                      <line x1="15" y1="4" x2="15" y2="20" />
                    </svg>
                  </div>
                </div>
                <div className="lp-dock-body" style={{ height: 720 }}>
                  <DockPageSkeleton />
                  <div style={{ width: 380, flexShrink: 0, boxShadow: "-8px 0 24px rgba(60,50,40,0.08)" }}>
                    <InteractivePopup initial="preview" />
                  </div>
                </div>
              </div>
            </ScaledShot>
          )}

          <div className="lp-anno" style={{ top: 92, left: -30 }}>
            <span
              style={{
                width: 18, height: 18, borderRadius: 999,
                background: SURAT.success, color: "#fff",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <Icon.Check width={11} height={11} />
            </span>
            KTP terbaca
            <span className="lp-mono">conf 0,98</span>
          </div>
          <div className="lp-anno" style={{ bottom: 108, left: -44 }}>
            <LIcon.Bolt width={16} height={16} style={{ color: SURAT.accent }} />
            11 field terisi
            <span className="lp-mono">2,4 dtk</span>
          </div>
        </div>
      </div>
    </header>
  );
}
