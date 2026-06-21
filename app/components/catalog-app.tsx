"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SURAT } from "@/app/lib/tokens";
import { Icon } from "./icons";
import { CatIcon } from "./catalog-icons";
import { Wordmark } from "./wordmark";
import { MiniInvite } from "./catalog-invite";
import { FullInvite } from "./catalog-full";
import { INVITE_THEMES, INVITE_CATS, rupiah, type Theme } from "./catalog-data";

// ─── Demo modal ───────────────────────────────────────────────────────
function DemoModal({ theme, onClose }: { theme: Theme; onClose: () => void }) {
  return (
    <div className="cat-overlay" onClick={onClose}>
      <button
        className="cat-btn cat-btn-secondary"
        onClick={onClose}
        style={{ position: "fixed", top: 20, right: 20, width: 42, height: 42, padding: 0, borderRadius: 12 }}
      >
        <Icon.X width={20} height={20} />
      </button>
      <div onClick={(e) => e.stopPropagation()} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div className="cat-phone">
          <div className="cat-phone-screen cat-scroll">
            <FullInvite theme={theme} />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, background: SURAT.card, borderRadius: 999, padding: "8px 8px 8px 20px", boxShadow: "0 16px 40px -16px rgba(0,0,0,.5)" }}>
          <div>
            <div className="cat-serif" style={{ fontSize: 16, fontWeight: 500, color: SURAT.ink, lineHeight: 1.1 }}>{theme.name}</div>
            <div style={{ fontSize: 12, color: SURAT.ink3 }}>mulai {rupiah(theme.price)}</div>
          </div>
          <Link
            className="cat-btn cat-btn-primary"
            href={`/editor?desain=${theme.id}`}
            style={{ background: SURAT.accent, padding: "12px 20px", textDecoration: "none" }}
          >
            <CatIcon.Cart width={16} height={16} /> Buat undangan ini
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────
function DesignCard({ theme, onDemo }: { theme: Theme; onDemo: (t: Theme) => void }) {
  return (
    <div className="cat-card">
      <div className="cat-preview">
        {theme.popular && (
          <span className="cat-badge"><CatIcon.Star width={11} height={11} style={{ color: SURAT.accent }} /> Populer</span>
        )}
        <MiniInvite theme={theme} />
      </div>
      <div className="cat-info">
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10 }}>
          <h3 className="cat-serif" style={{ fontSize: 19, fontWeight: 500, margin: 0, color: SURAT.ink }}>{theme.name}</h3>
          <span className="cat-serif" style={{ fontSize: 17, fontWeight: 500, color: SURAT.ink }}>{rupiah(theme.price)}</span>
        </div>
        <div style={{ fontSize: 12.5, color: SURAT.ink3, marginTop: 3 }}>{theme.cat} · undangan digital</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: "auto", paddingTop: 16 }}>
          <a className="cat-btn cat-btn-secondary" style={{ flex: 1, textDecoration: "none" }} href={theme.demoUrl || "#"} target="_blank" rel="noopener noreferrer">
            <CatIcon.Eye width={15} height={15} /> Lihat demo
          </a>
          <Link className="cat-btn cat-btn-primary" href={`/editor?desain=${theme.id}`} style={{ flex: 1, background: SURAT.accent, textDecoration: "none" }}>
            <CatIcon.Cart width={15} height={15} /> Pesan
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────
export function Catalog() {
  const [cat, setCat] = useState("Semua");
  const [demo, setDemo] = useState<Theme | null>(null);

  useEffect(() => {
    document.body.style.overflow = demo ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [demo]);

  const list = cat === "Semua" ? INVITE_THEMES : INVITE_THEMES.filter((t) => t.cat === cat);

  return (
    <div className="cat">
      {/* Nav */}
      <nav className="cat-nav">
        <div className="cat-container cat-nav-inner">
          <Link href="/" style={{ textDecoration: "none" }}><Wordmark size={22} /></Link>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }} className="cat-nav-links">
            <Link className="cat-link" href="/">Beranda</Link>
            <Link className="cat-link" href="/#produk">Produk</Link>
            <Link className="cat-link" href="/#harga">Harga</Link>
          </div>
          <Link className="cat-btn cat-btn-secondary" href="/#produk" style={{ textDecoration: "none", padding: "9px 14px" }}>
            <Icon.ArrowLeft width={15} height={15} /> Kembali
          </Link>
        </div>
      </nav>

      {/* Header */}
      <header className="cat-container" style={{ padding: "56px 28px 36px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12.5, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: SURAT.accentInk, marginBottom: 16 }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: SURAT.accent }} />Surat Undangan
        </div>
        <h1 className="cat-serif" style={{ fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 500, lineHeight: 1.04, margin: 0, color: SURAT.ink }}>
          Katalog desain undangan
        </h1>
        <p style={{ fontSize: "clamp(16px, 2vw, 18px)", lineHeight: 1.55, color: SURAT.ink2, margin: "16px auto 0", maxWidth: 540 }}>
          Pilih desain favorit, lihat demonya secara utuh, lalu pesan. Semua undangan
          digital — bisa dibagikan lewat link, lengkap dengan RSVP dan peta lokasi.
        </p>
      </header>

      {/* Filters */}
      <div className="cat-container" style={{ display: "flex", gap: 9, flexWrap: "wrap", justifyContent: "center", marginBottom: 36 }}>
        {INVITE_CATS.map((c) => (
          <button key={c} className={"cat-chip" + (cat === c ? " active" : "")} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      {/* Grid */}
      <div className="cat-container" style={{ paddingBottom: 80 }}>
        <div className="cat-grid">
          {list.map((t) => (
            <DesignCard key={t.id} theme={t} onDemo={setDemo} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${SURAT.border}`, background: SURAT.popupBg }}>
        <div className="cat-container" style={{ padding: "32px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <Wordmark size={20} />
          <span style={{ fontSize: 13, color: SURAT.ink3 }}>© 2026 Surat · Undangan pernikahan digital</span>
        </div>
      </footer>

      {demo && <DemoModal theme={demo} onClose={() => setDemo(null)} />}
    </div>
  );
}
