"use client";

import { SURAT } from "@/app/lib/tokens";
import { Icon } from "./icons";

// Surat CV — short manual form, ready to generate a PDF
export function ScreenCV() {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderBottom: `1px solid ${SURAT.border}` }}>
        <button className="sx-btn-ghost" style={{ width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon.ArrowLeft width={14} height={14} />
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: SURAT.ink }}>Surat CV</div>
          <div style={{ fontSize: 11, color: SURAT.ink3, marginTop: 1 }}>Langkah 2 dari 3 · Isi data</div>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {[1, 1, 0].map((on, i) => <span key={i} style={{ width: 16, height: 4, borderRadius: 4, background: on ? SURAT.accent : SURAT.border }} />)}
        </div>
      </div>

      <div className="sx-scroll" style={{ flex: 1, padding: "14px 16px 0" }}>
        <div>
          <div className="sx-label" style={{ marginBottom: 6 }}>Posisi yang dituju</div>
          <div className="sx-input" style={{ display: "flex", alignItems: "center", fontWeight: 500 }}>Staf Administrasi</div>
        </div>

        <div style={{ marginTop: 14 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
            <div className="sx-label">Pengalaman kerja</div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10.5, color: SURAT.accentInk }}>
              <Icon.Sparkle width={11} height={11} /> dirapikan
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[["Admin Gudang", "CV Sumber Rejeki · 2021–2024"], ["Kasir", "Toko Berkah · 2019–2021"]].map(([t, sub], i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 9, background: SURAT.card, border: `1px solid ${SURAT.border}` }}>
                <span style={{ width: 26, height: 26, borderRadius: 7, background: SURAT.accentSoft, color: SURAT.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon.User width={13} height={13} />
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: SURAT.ink }}>{t}</div>
                  <div style={{ fontSize: 11, color: SURAT.ink3 }}>{sub}</div>
                </div>
                <Icon.Pencil width={13} height={13} style={{ color: SURAT.ink3 }} />
              </div>
            ))}
            <button className="sx-btn-ghost" style={{ justifyContent: "flex-start", gap: 7, padding: "8px 4px", fontSize: 12, color: SURAT.accentInk, fontWeight: 500 }}>
              <Icon.Upload width={13} height={13} /> Tambah pengalaman
            </button>
          </div>
        </div>

        <div style={{ marginTop: 14 }}>
          <div className="sx-label" style={{ marginBottom: 6 }}>Keahlian</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {["Microsoft Excel", "Arsip", "Input data", "Pelayanan"].map((k) => (
              <span key={k} className="sx-chip active" style={{ fontSize: 11.5 }}>{k}</span>
            ))}
            <span className="sx-chip" style={{ fontSize: 11.5, color: SURAT.ink3 }}>+ tambah</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginTop: 16, padding: "10px 12px", borderRadius: 9, background: SURAT.accentSoft, fontSize: 11.5, lineHeight: 1.45, color: SURAT.accentInk }}>
          <Icon.Sparkle width={13} height={13} style={{ marginTop: 1, flexShrink: 0 }} />
          <span>Surat merapikan tata bahasa &amp; menyusun tata letak CV otomatis.</span>
        </div>
      </div>

      <div style={{ padding: "10px 14px 12px", borderTop: `1px solid ${SURAT.border}`, background: SURAT.popupBg }}>
        <button className="sx-btn sx-btn-primary">
          <Icon.Pdf width={15} height={15} /> Buat CV PDF
        </button>
      </div>
    </>
  );
}

// Surat Dokumen — auto-generated form from an uploaded example, fields by type
export const DOC_FORMS: Record<string, { file: string; fields: [string, string][] }> = {
  "kelompok-tani": { file: "contoh-pengajuan.jpg", fields: [["Nama kelompok", "Tani Makmur Jaya"], ["Ketua kelompok", "Sular Hartono"], ["Alamat sekretariat", "Dusun Sukamaju RT 03/02"], ["Jenis bantuan", "Bibit padi & pupuk"], ["Jumlah anggota", "24 orang"], ["Tanggal surat", "16 Juni 2026"]] },
  "pengantar-kelurahan": { file: "contoh-pengantar.jpg", fields: [["Nama pemohon", "Ratna Dewi"], ["NIK", "3271064305920003"], ["Alamat", "RT 03 RW 02, Cibadak"], ["Keperluan", "Administrasi kependudukan"], ["Tujuan", "Kelurahan Cibadak"], ["Tanggal surat", "16 Juni 2026"]] },
  undangan: { file: "contoh-undangan.jpg", fields: [["Pengirim", "Karang Taruna Bhakti Muda"], ["Acara", "Musyawarah Warga"], ["Hari/Tanggal", "Sabtu, 21 Juni 2026"], ["Waktu", "19.30 WIB"], ["Tempat", "Balai RW 02"], ["Tanggal surat", "16 Juni 2026"]] },
};

export function ScreenDocForm({ type = "kelompok-tani" }: { type?: string }) {
  const d = DOC_FORMS[type] || DOC_FORMS["kelompok-tani"];
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderBottom: `1px solid ${SURAT.border}` }}>
        <button className="sx-btn-ghost" style={{ width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon.ArrowLeft width={14} height={14} />
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: SURAT.ink }}>Surat Dokumen</div>
          <div style={{ fontSize: 11, color: SURAT.ink3, marginTop: 1 }}>Lengkapi data dokumen</div>
        </div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 9px", borderRadius: 999, background: SURAT.cardAlt, fontSize: 11, color: SURAT.ink2 }}>
          <Icon.Image width={12} height={12} style={{ color: SURAT.ink3 }} /> {d.file}
        </span>
      </div>

      <div className="sx-scroll" style={{ flex: 1, padding: "14px 16px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", borderRadius: 9, background: SURAT.successSoft, marginBottom: 14, fontSize: 11.5, color: "#3d5a2e", lineHeight: 1.35 }}>
          <span style={{ width: 16, height: 16, borderRadius: 999, background: SURAT.success, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon.Check width={10} height={10} />
          </span>
          <span>Format contoh terbaca — <strong style={{ fontWeight: 600 }}>{d.fields.length} data</strong> perlu Anda isi.</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          {d.fields.map(([label, value], i) => (
            <div key={i}>
              <div className="sx-label" style={{ marginBottom: 5, display: "flex", alignItems: "center", gap: 6 }}>
                {label}
                <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: SURAT.accentInk, background: SURAT.accentSoft, padding: "1px 5px", borderRadius: 3 }}>auto</span>
              </div>
              <div className="sx-input" style={{ display: "flex", alignItems: "center", fontWeight: 500 }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "10px 14px 12px", borderTop: `1px solid ${SURAT.border}`, background: SURAT.popupBg }}>
        <button className="sx-btn sx-btn-primary">
          <Icon.File width={15} height={15} /> Buat dokumen Word
        </button>
      </div>
    </>
  );
}

// Surat Undangan — wedding invitation detail form
export function ScreenWedding() {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderBottom: `1px solid ${SURAT.border}` }}>
        <button className="sx-btn-ghost" style={{ width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon.ArrowLeft width={14} height={14} />
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: SURAT.ink }}>Surat Undangan</div>
          <div style={{ fontSize: 11, color: SURAT.ink3, marginTop: 1 }}>Langkah 1 dari 3 · Detail acara</div>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {[1, 0, 0].map((on, i) => <span key={i} style={{ width: 16, height: 4, borderRadius: 4, background: on ? SURAT.accent : SURAT.border }} />)}
        </div>
      </div>

      <div className="sx-scroll" style={{ flex: 1, padding: "14px 16px 0" }}>
        <div className="sx-label" style={{ marginBottom: 6 }}>Mempelai</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div className="sx-input" style={{ display: "flex", alignItems: "center", fontWeight: 500 }}>Rangga Pratama</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: SURAT.ink3 }}>
            <div style={{ flex: 1, height: 1, background: SURAT.border }} />
            <span style={{ fontFamily: SURAT.serif, fontStyle: "italic", fontSize: 14, color: SURAT.accent }}>&amp;</span>
            <div style={{ flex: 1, height: 1, background: SURAT.border }} />
          </div>
          <div className="sx-input" style={{ display: "flex", alignItems: "center", fontWeight: 500 }}>Ayu Lestari</div>
        </div>

        <div style={{ marginTop: 14 }}>
          <div className="sx-label" style={{ marginBottom: 6 }}>Tanggal &amp; waktu</div>
          <div className="sx-input" style={{ display: "flex", alignItems: "center", fontWeight: 500 }}>Sabtu, 12 Des 2026 · 10.00 WIB</div>
        </div>

        <div style={{ marginTop: 14 }}>
          <div className="sx-label" style={{ marginBottom: 6 }}>Lokasi</div>
          <div className="sx-input" style={{ display: "flex", alignItems: "center", fontWeight: 500 }}>Graha Saba, Bandung</div>
        </div>

        <div style={{ marginTop: 14 }}>
          <div className="sx-label" style={{ marginBottom: 8 }}>Tema</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {["Klasik", "Bunga", "Minimal", "Hijau"].map((th, i) => (
              <span key={th} className={"sx-chip" + (i === 0 ? " active" : "")} style={{ fontSize: 11.5 }}>{th}</span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14, padding: "10px 12px", borderRadius: 9, background: SURAT.card, border: `1px dashed ${SURAT.borderStrong}` }}>
          <span style={{ width: 30, height: 30, borderRadius: 7, background: SURAT.cardAlt, color: SURAT.ink2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon.Camera width={15} height={15} />
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12.5, fontWeight: 500, color: SURAT.ink }}>Foto prewedding</div>
            <div style={{ fontSize: 11, color: SURAT.ink3 }}>opsional · tarik foto ke sini</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginTop: 14, padding: "10px 12px", borderRadius: 9, background: SURAT.accentSoft, fontSize: 11.5, lineHeight: 1.45, color: SURAT.accentInk }}>
          <Icon.Sparkle width={13} height={13} style={{ marginTop: 1, flexShrink: 0 }} />
          <span>Surat menata undangan, peta lokasi, &amp; RSVP otomatis.</span>
        </div>
      </div>

      <div style={{ padding: "10px 14px 12px", borderTop: `1px solid ${SURAT.border}`, background: SURAT.popupBg }}>
        <button className="sx-btn sx-btn-primary">
          <Icon.Sparkle width={15} height={15} /> Buat undangan
        </button>
      </div>
    </>
  );
}
