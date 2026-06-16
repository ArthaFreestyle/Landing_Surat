"use client";

import { SURAT } from "@/app/lib/tokens";
import { Icon } from "./icons";
import { HeroDocs } from "./landing-papers";

export function Hero() {
  return (
    <header className="lp-hero">
      <div className="lp-hero-bg" />
      <div className="lp-hero-glow" />
      <div className="lp-container lp-hero-grid">
        {/* Left — editorial copy */}
        <div className="lp-hero-copy">
          <div className="lp-hero-index">
            <span>Surat</span>
            <span className="rule" />
            <span>Generator Dokumen</span>
          </div>
          <h1 className="lp-hero-h1">
            CV &amp; surat resmi,<br />
            jadi dalam <span style={{ fontStyle: "italic", color: SURAT.accent }}>menit</span>.
          </h1>
          <p className="lp-hero-sub">
            Isi form singkat — atau ikuti satu contoh surat. Surat menyusunnya jadi
            CV PDF dan dokumen Word yang rapi, siap dicetak dan ditandatangani.
            Semua dari browser, tanpa aplikasi desain.
          </p>
          <div className="lp-hero-actions">
            <a className="lp-btn lp-btn-primary lp-btn-lg" href="#produk" style={{ textDecoration: "none" }}>
              Coba sekarang
            </a>
            <a
              href="#produk"
              className="lp-link lp-hero-link"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 15.5, fontWeight: 500, color: SURAT.ink }}
            >
              Lihat contoh
              <Icon.ArrowRight width={16} height={16} />
            </a>
          </div>
          <div className="lp-hero-meta">
            <span>Gratis untuk mulai</span>
            <span className="sep" />
            <span>Tanpa instalasi</span>
            <span className="sep" />
            <span>Langsung di browser</span>
          </div>
        </div>

        {/* Right — output documents as the star */}
        <div className="lp-hero-stage">
          <HeroDocs docType="kelompok-tani" />
        </div>
      </div>
    </header>
  );
}
