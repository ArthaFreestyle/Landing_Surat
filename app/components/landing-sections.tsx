"use client";

import { SURAT } from "@/app/lib/tokens";
import { Icon } from "./icons";
import { LIcon } from "./landing-icons";
import { ScaledShot } from "./scaled-shot";
import { PopupFrame } from "./popup-shell";
import { ScreenPreview } from "./popup-screens";

export function DocStrip() {
  const docs = ["CV lamaran kerja", "Surat pengajuan kelompok tani", "Pengantar kelurahan", "Undangan pernikahan", "Surat undangan resmi", "Proposal bantuan", "Surat keterangan usaha"];
  return (
    <section style={{ borderTop: `1px solid ${SURAT.border}`, borderBottom: `1px solid ${SURAT.border}`, background: SURAT.popupBg }}>
      <div className="lp-container" style={{ padding: "34px 32px", textAlign: "center" }}>
        <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: SURAT.ink3, marginBottom: 18 }}>
          Yang bisa Anda buat
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          {docs.map((d) => (
            <span key={d} className="lp-chip">
              <Icon.File width={14} height={14} style={{ color: SURAT.accent }} />{d}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const feats = [
    "Isi form pemerintah, fintech, atau HR otomatis",
    "Tambah baris ke Google Sheets dari foto nota",
    "Tinjau tiap field sebelum dikirim — undo 10 detik",
  ];

  return (
    <section
      id="autofill"
      className="lp-section"
      style={{ background: SURAT.popupBg, borderTop: `1px solid ${SURAT.border}`, borderBottom: `1px solid ${SURAT.border}` }}
    >
      <div className="lp-container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 56, alignItems: "center" }}>
        <div style={{ maxWidth: 480 }}>
          <div className="lp-eyebrow" style={{ marginBottom: 16 }}><span className="dot" />Bonus · Ekstensi Chrome</div>
          <h2 className="lp-serif" style={{ fontSize: "clamp(28px, 3.8vw, 44px)", fontWeight: 500, lineHeight: 1.07, margin: 0, color: SURAT.ink }}>
            Masih sering isi form online? Biar Surat yang mengetik.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.58, color: SURAT.ink2, margin: "16px 0 0" }}>
            Selain membuat dokumen, Surat punya ekstensi Chrome gratis yang membaca foto
            dokumen Anda lalu mengisi formulir online dan spreadsheet — tanpa ketik ulang.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: "22px 0 28px", display: "flex", flexDirection: "column", gap: 12 }}>
            {feats.map((f, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 11, fontSize: 15, color: SURAT.ink2 }}>
                <Icon.Check width={18} height={18} style={{ color: SURAT.success, flexShrink: 0, marginTop: 2 }} />{f}
              </li>
            ))}
          </ul>
          <a
            className="lp-btn lp-btn-secondary"
            href="https://chromewebstore.google.com/detail/surat/onhacfcgnfldpomdcomiakcpnlembphj?hl=en-US&utm_source=ext_sidebar"
            target="_blank"
            rel="noopener"
            style={{ textDecoration: "none" }}
          >
            <LIcon.Puzzle width={18} height={18} /> Tambahkan ekstensi ke Chrome
          </a>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ScaledShot w={380} h={720} maxW={340} cropH={500} fade={true}>
            <PopupFrame><ScreenPreview /></PopupFrame>
          </ScaledShot>
        </div>
      </div>
    </section>
  );
}

export function Privacy() {
  const points = [
    { icon: <LIcon.Trash width={20} height={20} />, title: "Dokumen tidak disimpan", body: "Foto dan dokumen Anda hanya dipakai sesaat untuk mengisi data, lalu langsung dilepas. Tidak ada arsip, tidak ada cadangan, tidak ada riwayat." },
    { icon: <LIcon.Eye width={20} height={20} />,   title: "Anda meninjau setiap nilai", body: "Surat tidak pernah mengisi diam-diam. Setiap field atau baris bisa Anda cek, edit, atau matikan sebelum dikirim ke form maupun spreadsheet." },
    { icon: <LIcon.Bolt width={20} height={20} />,  title: "Hanya saat Anda meminta", body: "Surat bekerja sekali jalan setiap kali Anda menekan tombolnya. Tidak ada pemantauan terus-menerus terhadap apa yang Anda buka di browser." },
    { icon: <Icon.Undo width={20} height={20} />,   title: "Selalu bisa dibatalkan", body: "Salah isi atau salah baris? Tombol undo dalam 10 detik mengembalikan form atau spreadsheet ke kondisi semula." },
  ];

  return (
    <section
      id="privasi"
      className="lp-section"
      style={{ background: SURAT.popupBg, borderTop: `1px solid ${SURAT.border}`, borderBottom: `1px solid ${SURAT.border}` }}
    >
      <div
        className="lp-container lp-privacy-grid"
        style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.1fr)", gap: 64, alignItems: "start" }}
      >
        <div className="lp-privacy-sticky" style={{ position: "sticky", top: 100 }}>
          <div className="lp-eyebrow" style={{ marginBottom: 16 }}><span className="dot" />Privasi &amp; keamanan</div>
          <h2
            className="lp-serif"
            style={{ fontSize: "clamp(32px, 4.4vw, 50px)", fontWeight: 500, lineHeight: 1.06, margin: 0, color: SURAT.ink }}
          >
            Data Anda tetap milik Anda.
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: SURAT.ink2, margin: "18px 0 0" }}>
            Foto nota toko, struk kasir, dan dokumen identitas itu sensitif. Surat dirancang agar Anda
            mendapat kecepatan otomatis tanpa menyerahkan kendali atas data pribadi maupun bisnis.
          </p>
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: 12, marginTop: 28,
              padding: "14px 18px", borderRadius: 14,
              background: SURAT.card, border: `1px solid ${SURAT.border}`,
            }}
          >
            <span
              style={{
                width: 40, height: 40, borderRadius: 10,
                background: SURAT.successSoft, color: SURAT.success,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <LIcon.Shield width={22} height={22} />
            </span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: SURAT.ink }}>Diproses, lalu dihapus</div>
              <div style={{ fontSize: 12.5, color: SURAT.ink3 }}>Tidak ada dokumen yang tersimpan</div>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {points.map((p, i) => (
            <div key={i} className="lp-card" style={{ padding: 24 }}>
              <span className="lp-feature-ico" style={{ width: 42, height: 42 }}>{p.icon}</span>
              <h3 style={{ fontSize: 17, fontWeight: 600, margin: "18px 0 0", color: SURAT.ink, letterSpacing: "-0.01em" }}>{p.title}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.55, color: SURAT.ink2, margin: "7px 0 0" }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
