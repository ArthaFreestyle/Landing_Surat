"use client";

import { SURAT } from "@/app/lib/tokens";
import { Icon } from "./icons";
import { LIcon } from "./landing-icons";
import { ScaledShot } from "./scaled-shot";
import { PopupFrame } from "./popup-shell";
import { ScreenMain, ScreenPreview, ScreenSuccess } from "./popup-screens";

export function DocStrip() {
  const docs = ["Invoice", "Nota barang", "Struk kasir", "Catatan stok", "NPWP", "Kartu Keluarga", "Ijazah", "Transkrip nilai"];
  return (
    <section style={{ borderTop: `1px solid ${SURAT.border}`, borderBottom: `1px solid ${SURAT.border}`, background: SURAT.popupBg }}>
      <div className="lp-container" style={{ padding: "34px 32px", textAlign: "center" }}>
        <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: SURAT.ink3, marginBottom: 18 }}>
          Dikenali otomatis
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
  const steps = [
    {
      n: "01", icon: <LIcon.Upload width={22} height={22} />,
      title: "Unggah dokumen",
      body: "Tarik foto nota belanja, struk, ijazah, atau PDF apa pun ke panel Surat. Mendukung JPG, PNG, HEIC, WEBP, dan PDF hingga 10 MB.",
      shot: <ScreenMain />,
    },
    {
      n: "02", icon: <LIcon.Scan width={22} height={22} />,
      title: "Surat membaca isinya",
      body: "Field dari dokumen identitas — atau baris demi baris dari nota dan struk — dikenali dan dicocokkan dengan form atau kolom spreadsheet yang sedang Anda buka.",
      shot: <ScreenPreview />,
    },
    {
      n: "03", icon: <LIcon.Wand width={22} height={22} />,
      title: "Form atau spreadsheet terisi",
      body: "Tinjau hasilnya, lalu isi form dengan satu klik — atau tambahkan baris ke Google Sheets. Bisa juga unduh sebagai CSV/XLSX. Ada tombol undo dalam 10 detik.",
      shot: <ScreenSuccess />,
    },
  ];

  return (
    <section id="cara-kerja" className="lp-section">
      <div className="lp-container">
        <div style={{ maxWidth: 640, marginBottom: 56 }}>
          <div className="lp-eyebrow" style={{ marginBottom: 16 }}><span className="dot" />Cara kerja</div>
          <h2
            className="lp-serif"
            style={{ fontSize: "clamp(32px, 4.4vw, 50px)", fontWeight: 500, lineHeight: 1.06, margin: 0, color: SURAT.ink }}
          >
            Tiga langkah dari dokumen ke data terisi.
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: SURAT.ink2, margin: "18px 0 0" }}>
            Tidak ada penyiapan, tidak ada salin-tempel. Surat bekerja di panel samping browser,
            di sisi form atau spreadsheet yang sedang Anda isi.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28 }}>
          {steps.map((s) => (
            <div key={s.n} style={{ display: "flex", flexDirection: "column" }}>
              <ScaledShot w={380} h={720} maxW={380} cropH={470} fade={true}>
                <PopupFrame>{s.shot}</PopupFrame>
              </ScaledShot>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 26 }}>
                <span className="lp-feature-ico">{s.icon}</span>
                <span className="lp-mono" style={{ fontSize: 13, color: SURAT.ink3 }}>{s.n}</span>
              </div>
              <h3 className="lp-serif" style={{ fontSize: 23, fontWeight: 500, margin: "16px 0 0", color: SURAT.ink }}>{s.title}</h3>
              <p style={{ fontSize: 15.5, lineHeight: 1.6, color: SURAT.ink2, margin: "8px 0 0" }}>{s.body}</p>
            </div>
          ))}
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
