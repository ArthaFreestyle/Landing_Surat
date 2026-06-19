"use client";

import { CSSProperties, useState, useEffect } from "react";
import Link from "next/link";
import { SURAT } from "@/app/lib/tokens";
import { Icon } from "./icons";
import { CatIcon } from "./catalog-icons";
import { Wordmark } from "./wordmark";
import { MiniInvite } from "./catalog-invite";
import { INVITE_THEMES, INVITE_CATS, INVITE_PACKAGES, rupiah, type Theme } from "./catalog-data";

function field(): CSSProperties {
  return { width: "100%", padding: "11px 13px", borderRadius: 10, background: SURAT.popupBg, border: `1px solid ${SURAT.border}`, fontFamily: "inherit", fontSize: 14, color: SURAT.ink, outline: "none" };
}

// ─── Order modal ──────────────────────────────────────────────────────
function OrderModal({ theme, onClose }: { theme: Theme; onClose: () => void }) {
  const [pkg, setPkg] = useState("plus");
  const [form, setForm] = useState({ nama: "", tanggal: "", wa: "" });
  const selected = INVITE_PACKAGES.find((p) => p.id === pkg)!;
  const total = theme.price + selected.add;
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });

  const waText = encodeURIComponent(
    `Halo Surat, saya mau pesan undangan digital:\n\n` +
    `Desain: ${theme.name}\nPaket: ${selected.name} — ${rupiah(total)}\n` +
    `Nama pemesan: ${form.nama || "-"}\nTanggal acara: ${form.tanggal || "-"}\nNo. WhatsApp: ${form.wa || "-"}`
  );
  const waHref = `https://wa.me/6281234567890?text=${waText}`;

  return (
    <div className="cat-overlay" onClick={onClose}>
      <div className="cat-modal" onClick={(e) => e.stopPropagation()} style={{ background: SURAT.card, borderRadius: 22, width: "100%", maxWidth: 468, maxHeight: "90vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px 20px", borderBottom: `1px solid ${SURAT.border}` }}>
          <div style={{ width: 44, height: 56, borderRadius: 8, overflow: "hidden", flexShrink: 0, boxShadow: `inset 0 0 0 1px ${SURAT.border}` }}>
            <MiniInvite theme={theme} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: SURAT.ink3 }}>Pesan undangan</div>
            <div className="cat-serif" style={{ fontSize: 21, fontWeight: 500, color: SURAT.ink }}>{theme.name}</div>
          </div>
          <button className="cat-btn cat-btn-ghost" onClick={onClose} style={{ width: 36, height: 36, padding: 0, borderRadius: 10 }}>
            <Icon.X width={18} height={18} />
          </button>
        </div>

        {/* Body */}
        <div className="cat-scroll" style={{ padding: "20px", overflowY: "auto" }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: SURAT.ink3, marginBottom: 12 }}>Pilih paket</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {INVITE_PACKAGES.map((p) => {
              const on = p.id === pkg;
              return (
                <button key={p.id} onClick={() => setPkg(p.id)} style={{ textAlign: "left", cursor: "pointer", background: on ? SURAT.accentSoft : SURAT.card, border: `1.5px solid ${on ? theme.accent : SURAT.border}`, borderRadius: 14, padding: "14px 16px", fontFamily: "inherit", transition: "all .12s" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ width: 18, height: 18, borderRadius: 999, flexShrink: 0, border: `1.5px solid ${on ? theme.accent : SURAT.borderStrong}`, background: on ? theme.accent : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {on && <Icon.Check width={11} height={11} style={{ color: "#fff" }} />}
                    </span>
                    <span style={{ fontSize: 15, fontWeight: 600, color: SURAT.ink }}>{p.name}</span>
                    {p.popular && <span style={{ fontSize: 10.5, fontWeight: 600, color: "#fff", background: theme.accent, padding: "2px 7px", borderRadius: 999 }}>Populer</span>}
                    <span className="cat-serif" style={{ marginLeft: "auto", fontSize: 17, fontWeight: 500, color: SURAT.ink }}>{rupiah(theme.price + p.add)}</span>
                  </div>
                  {on && (
                    <ul style={{ listStyle: "none", padding: 0, margin: "12px 0 0 28px", display: "flex", flexDirection: "column", gap: 7 }}>
                      {p.features.map((f, i) => (
                        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: SURAT.ink2 }}>
                          <Icon.Check width={14} height={14} style={{ color: theme.accent, flexShrink: 0, marginTop: 2 }} />{f}
                        </li>
                      ))}
                    </ul>
                  )}
                </button>
              );
            })}
          </div>

          <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: SURAT.ink3, margin: "22px 0 12px" }}>Data pemesan</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <input style={field()} placeholder="Nama pemesan" value={form.nama} onChange={set("nama")} />
            <input style={field()} placeholder="Tanggal acara (mis. 12 Des 2026)" value={form.tanggal} onChange={set("tanggal")} />
            <input style={field()} placeholder="No. WhatsApp aktif" value={form.wa} onChange={set("wa")} />
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "14px 20px", borderTop: `1px solid ${SURAT.border}`, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: SURAT.ink3 }}>Total ({selected.name})</div>
            <div className="cat-serif" style={{ fontSize: 22, fontWeight: 500, color: SURAT.ink }}>{rupiah(total)}</div>
          </div>
          <a className="cat-btn cat-btn-primary" href={waHref} target="_blank" rel="noopener" style={{ background: "#1fa855", padding: "13px 20px", textDecoration: "none" }}>
            <CatIcon.Wa width={17} height={17} /> Pesan via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}


// ─── Card ─────────────────────────────────────────────────────────────
function DesignCard({ theme, onOrder }: { theme: Theme; onOrder: (t: Theme) => void }) {
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
          <button className="cat-btn cat-btn-primary" style={{ flex: 1, background: SURAT.accent }} onClick={() => onOrder(theme)}>
            <CatIcon.Cart width={15} height={15} /> Pesan
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────
export function Catalog() {
  const [cat, setCat] = useState("Semua");
  const [order, setOrder] = useState<Theme | null>(null);

  useEffect(() => {
    document.body.style.overflow = order ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [order]);

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
            <DesignCard key={t.id} theme={t} onOrder={setOrder} />
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

      {order && <OrderModal theme={order} onClose={() => setOrder(null)} />}
    </div>
  );
}
