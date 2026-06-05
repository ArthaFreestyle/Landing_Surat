"use client";

import { useState } from "react";
import { SURAT } from "@/app/lib/tokens";
import { LIcon } from "./landing-icons";

export function FAQ() {
  const items = [
    { q: "Apakah dokumen saya aman?", a: "Ya. Dokumen Anda diproses saat itu juga lalu langsung dihapus — tidak disimpan di server kami. Selain itu, Anda meninjau dan menyetujui setiap field sebelum dimasukkan ke formulir." },
    { q: "Dokumen apa saja yang didukung?", a: "KTP, NPWP, Kartu Keluarga, Ijazah, SIM, paspor, invoice, rekening koran, dan banyak lagi. Surat membaca tata letak dokumen secara umum, jadi sebagian besar dokumen identitas dan keuangan Indonesia bisa dikenali." },
    { q: "Apakah Surat bekerja di semua situs?", a: "Surat bekerja pada formulir web standar — termasuk situs pemerintah, fintech, perbankan, dan portal HR. Panel samping mendeteksi field di halaman yang sedang aktif dan mencocokkannya dengan data dokumen Anda." },
    { q: "Format file apa yang bisa diunggah?", a: "JPG, PNG, dan PDF hingga 10 MB. Anda bisa memotret dokumen langsung atau mengunggah pindaian dan berkas digital." },
    { q: "Apakah benar-benar gratis?", a: "Paket gratis memberi 10 scan setiap bulan tanpa kartu kredit. Bila Anda sering mengisi formulir, paket Pro membuka scan tak terbatas dan riwayat dokumen." },
    { q: "Seberapa akurat hasilnya?", a: "Setiap field diberi skor keyakinan. Field dengan keyakinan tinggi diisi otomatis; yang rendah ditandai \"perlu cek\" agar Anda verifikasi sebelum mengirim. Anda selalu memegang kendali penuh." },
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
