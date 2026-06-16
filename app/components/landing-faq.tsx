"use client";

import { useState } from "react";
import { SURAT } from "@/app/lib/tokens";
import { LIcon } from "./landing-icons";

export function FAQ() {
  const items = [
    { q: "Apakah dokumen saya aman?", a: "Ya. Foto dan dokumen Anda hanya dipakai sesaat untuk mengisi data, lalu langsung dilepas — tidak disimpan di server kami. Anda juga selalu meninjau setiap field atau baris sebelum dimasukkan ke form atau spreadsheet. Detail lengkapnya ada di privacy policy." },
    { q: "Apa saja produk Surat?", a: "Tiga produk untuk membuat dokumen, semuanya lewat browser: Surat CV — isi form singkat jadi CV PDF profesional; Surat Dokumen — unggah satu contoh surat (pengajuan kelompok tani, pengantar kelurahan, undangan resmi) lalu lengkapi form yang disiapkan otomatis hingga jadi file Word; dan Surat Undangan — undangan pernikahan digital yang dibagikan lewat link beserta peta lokasi dan RSVP. Autofill form online tersedia terpisah sebagai ekstensi Chrome gratis." },
    { q: "Apakah CV dan surat hasilnya bisa diedit lagi?", a: "Bisa. Surat CV menghasilkan PDF yang siap kirim, sementara Surat Dokumen mengeluarkan file Word (.docx) yang bisa Anda buka dan sunting di Microsoft Word, Google Docs, atau WPS sebelum dicetak dan ditandatangani." },
    { q: "Dokumen apa saja yang didukung?", a: "Untuk autofill — dokumen identitas: NPWP, Kartu Keluarga, ijazah, transkrip nilai; dan dokumen transaksional: invoice, nota barang masuk, struk kasir, catatan stok. Untuk Surat Dokumen — surat pengajuan kelompok tani, surat permohonan / pengantar ke kelurahan, dan surat undangan; jenis lain menyusul karena Surat belajar dari contoh yang Anda unggah." },
    { q: "Autofill — bisakah mengisi Google Sheets?", a: "Bisa. Saat tab aktif adalah Google Sheets atau Excel Online, Surat mendeteksi header kolom Anda, memetakan data dokumen ke kolom yang relevan, lalu menambahkannya sebagai baris baru. Cocok untuk memindahkan nota barang masuk, struk kasir, atau catatan stok ke spreadsheet — sekali foto, langsung jadi baris." },
    { q: "Autofill — bekerja di situs apa saja?", a: "Surat bekerja pada formulir web standar — situs pemerintah, fintech, perbankan, portal HR — dan pada Google Sheets serta Excel Online untuk mode spreadsheet. Bila tidak ada target yang terdeteksi, Anda tetap bisa mengunduh hasilnya sebagai CSV, XLSX, atau JSON." },
    { q: "Format file apa yang bisa diunggah?", a: "JPG, PNG, WEBP, HEIC, dan PDF (single atau multi-page) hingga 10 MB. Anda bisa memotret dokumen langsung dengan kamera ponsel atau mengunggah pindaian dan berkas digital." },
    { q: "Apakah benar-benar gratis?", a: "Paket gratis memberi 3 dokumen atau CV setiap bulan tanpa kartu kredit — cukup untuk kebutuhan sesekali. Bila Anda sering membuat surat atau CV, paket Pro membuka dokumen tanpa batas dan menyimpan template surat Anda." },
    { q: "Seberapa akurat hasilnya?", a: "Setiap field dan baris diberi skor keyakinan. Yang tinggi diisi otomatis; yang rendah ditandai \"perlu cek\" agar Anda verifikasi sebelum mengirim. Untuk nota tulisan tangan, Anda selalu bisa edit baris sebelum insert." },
  ];

  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="lp-section" style={{ background: SURAT.popupBg, borderTop: `1px solid ${SURAT.border}` }}>
      <div className="lp-container-narrow">
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div className="lp-eyebrow" style={{ marginBottom: 16 }}><span className="dot" />FAQ</div>
          <h2
            className="lp-serif"
            style={{ fontSize: "clamp(32px, 4.4vw, 50px)", fontWeight: 500, lineHeight: 1.06, margin: 0, color: SURAT.ink }}
          >
            Pertanyaan yang sering muncul.
          </h2>
        </div>
        <div>
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="lp-faq-item">
                <button
                  className="lp-faq-q"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span>{it.q}</span>
                  <span className="lp-faq-icon" style={{ transform: isOpen ? "rotate(45deg)" : "none" }}>
                    <LIcon.Plus width={20} height={20} />
                  </span>
                </button>
                <div className="lp-faq-a" style={{ height: isOpen ? "auto" : 0 }}>
                  {isOpen && <div className="lp-faq-a-inner">{it.a}</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
