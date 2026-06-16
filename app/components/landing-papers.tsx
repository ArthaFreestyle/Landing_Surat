"use client";

import { CSSProperties } from "react";
import { SURAT } from "@/app/lib/tokens";
import { Icon } from "./icons";
import { ScaledShot } from "./scaled-shot";

// ═══ OUTPUT DOCUMENTS ═══════════════════════════════════════════════════

// CV — clean one-page résumé (PDF output)
export function CVPaper({ w = 300, cls = "lp-prod-paper", style }: { w?: number; cls?: string; style?: CSSProperties }) {
  const h = Math.round(w * 1.414);
  const pad = Math.round(w * 0.085);
  const sectionLabel = (t: string) => (
    <div style={{ fontFamily: SURAT.sans, fontSize: w * 0.032, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: SURAT.accent, margin: `${w * 0.04}px 0 ${w * 0.022}px` }}>{t}</div>
  );
  const line = (width: string, c = "#d8d2c6", mt = 4) => (
    <div style={{ height: w * 0.018, width, background: c, borderRadius: 2, marginTop: mt }} />
  );
  return (
    <div className={cls} style={{ width: w, height: h, padding: pad, overflow: "hidden", ...style }}>
      <div style={{ fontFamily: SURAT.serif, fontSize: w * 0.082, fontWeight: 600, color: SURAT.ink, lineHeight: 1.05, letterSpacing: "-0.01em" }}>Ratna Dewi</div>
      <div style={{ fontFamily: SURAT.sans, fontSize: w * 0.04, color: SURAT.accentInk, fontWeight: 500, marginTop: w * 0.01 }}>Staf Administrasi</div>
      <div style={{ fontFamily: SURAT.mono, fontSize: w * 0.03, color: SURAT.ink3, marginTop: w * 0.02 }}>ratna.dewi@email.com · 0812-3456-7890 · Sukabumi</div>
      <div style={{ height: 1, background: SURAT.borderStrong, margin: `${w * 0.05}px 0 0` }} />

      {sectionLabel("Ringkasan")}
      {line("100%")}{line("94%")}{line("62%")}

      {sectionLabel("Pengalaman")}
      <div style={{ fontFamily: SURAT.sans, fontSize: w * 0.038, fontWeight: 600, color: SURAT.ink }}>Admin Gudang — CV Sumber Rejeki</div>
      <div style={{ fontFamily: SURAT.mono, fontSize: w * 0.028, color: SURAT.ink3, marginTop: 2 }}>2021 — 2024 · Sukabumi</div>
      {line("96%", "#e0dace", 6)}{line("72%", "#e0dace")}
      <div style={{ fontFamily: SURAT.sans, fontSize: w * 0.038, fontWeight: 600, color: SURAT.ink, marginTop: w * 0.03 }}>Kasir — Toko Berkah</div>
      <div style={{ fontFamily: SURAT.mono, fontSize: w * 0.028, color: SURAT.ink3, marginTop: 2 }}>2019 — 2021 · Cibadak</div>
      {line("88%", "#e0dace", 6)}

      {sectionLabel("Pendidikan")}
      <div style={{ fontFamily: SURAT.sans, fontSize: w * 0.038, fontWeight: 600, color: SURAT.ink }}>SMK Negeri 1 Sukabumi</div>
      <div style={{ fontFamily: SURAT.mono, fontSize: w * 0.028, color: SURAT.ink3, marginTop: 2 }}>Akuntansi · Lulus 2019</div>

      {sectionLabel("Keahlian")}
      <div style={{ display: "flex", flexWrap: "wrap", gap: w * 0.018 }}>
        {["Microsoft Excel", "Arsip & dokumen", "Input data", "Pelayanan"].map((k) => (
          <span key={k} style={{ fontFamily: SURAT.sans, fontSize: w * 0.03, color: SURAT.ink2, background: SURAT.cardAlt, border: `1px solid ${SURAT.border}`, padding: `${w * 0.012}px ${w * 0.028}px`, borderRadius: 999 }}>{k}</span>
        ))}
      </div>
    </div>
  );
}

// Formal Indonesian letter (Word .docx output) — content varies by type
type SuratDoc = {
  short: string;
  kop: string[] | null;
  place: string;
  meta: [string, string][];
  to: string[];
  body: string[];
  detail?: [string, string][];
  close: string;
  signs: [string, string][];
};

export const SURAT_DOCS: Record<string, SuratDoc> = {
  "kelompok-tani": {
    short: "Kelompok tani",
    kop: ["KELOMPOK TANI MAKMUR JAYA", "Dusun Sukamaju RT 03 RW 02, Desa Sukamaju", "Kec. Cibadak, Kab. Sukabumi"],
    place: "Sukamaju, 16 Juni 2026",
    meta: [["Nomor", "014/KTMJ/VI/2026"], ["Lampiran", "1 berkas"], ["Perihal", "Permohonan Bantuan Sarana Pertanian"]],
    to: ["Kepada Yth.", "Bapak Kepala Desa Sukamaju", "di Tempat"],
    body: [
      "Dengan hormat,",
      "Sehubungan dengan persiapan musim tanam tahun ini, kami selaku pengurus Kelompok Tani Makmur Jaya bermaksud mengajukan permohonan bantuan bibit padi dan pupuk bagi 24 orang anggota kelompok.",
    ],
    close: "Demikian permohonan ini kami sampaikan. Atas perhatian dan bantuan Bapak, kami ucapkan terima kasih.",
    signs: [["Ketua Kelompok", "Sular Hartono"], ["Sekretaris", "Asep Nugraha"]],
  },
  "pengantar-kelurahan": {
    short: "Pengantar",
    kop: null,
    place: "Sukabumi, 16 Juni 2026",
    meta: [["Nomor", "—"], ["Lampiran", "—"], ["Perihal", "Permohonan Surat Pengantar"]],
    to: ["Kepada Yth.", "Bapak Lurah Cibadak", "di Tempat"],
    body: [
      "Dengan hormat,",
      "Saya yang bertanda tangan di bawah ini, Ratna Dewi, warga RT 03 RW 02, dengan ini memohon diterbitkan surat pengantar untuk keperluan pengurusan administrasi kependudukan.",
    ],
    close: "Demikian permohonan ini saya sampaikan. Atas perhatian Bapak, saya ucapkan terima kasih.",
    signs: [["Hormat saya", "Ratna Dewi"]],
  },
  undangan: {
    short: "Undangan",
    kop: ["KARANG TARUNA BHAKTI MUDA", "Desa Sukamaju, Kec. Cibadak, Kab. Sukabumi"],
    place: "Sukamaju, 16 Juni 2026",
    meta: [["Nomor", "021/KT-BM/VI/2026"], ["Lampiran", "—"], ["Perihal", "Undangan Musyawarah Warga"]],
    to: ["Kepada Yth.", "Bapak/Ibu Warga RT 03 RW 02", "di Tempat"],
    body: [
      "Dengan hormat,",
      "Mengharap kehadiran Bapak/Ibu pada musyawarah warga yang akan diselenggarakan pada:",
    ],
    detail: [["Hari/Tanggal", "Sabtu, 21 Juni 2026"], ["Waktu", "19.30 WIB — selesai"], ["Tempat", "Balai Pertemuan RW 02"]],
    close: "Mengingat pentingnya acara tersebut, kami mohon kehadiran tepat waktu. Atas perhatiannya, kami ucapkan terima kasih.",
    signs: [["Ketua Panitia", "Dimas Prakoso"], ["Sekretaris", "Yuni Lestari"]],
  },
};

export function SuratPaper({ type = "kelompok-tani", w = 300, cls = "lp-prod-paper", style }: { type?: string; w?: number; cls?: string; style?: CSSProperties }) {
  const d = SURAT_DOCS[type] || SURAT_DOCS["kelompok-tani"];
  const h = Math.round(w * 1.414);
  const pad = Math.round(w * 0.085);
  const fs = w * 0.034;
  const serif: CSSProperties = { fontFamily: SURAT.serif, color: SURAT.ink };
  return (
    <div className={cls} style={{ width: w, height: h, padding: pad, overflow: "hidden", ...serif, lineHeight: 1.5, ...style }}>
      {d.kop && (
        <div style={{ textAlign: "center", borderBottom: `2px solid ${SURAT.ink}`, paddingBottom: w * 0.03, marginBottom: w * 0.04 }}>
          <div style={{ fontSize: w * 0.046, fontWeight: 700, letterSpacing: "0.01em" }}>{d.kop[0]}</div>
          {d.kop.slice(1).map((l, i) => (
            <div key={i} style={{ fontSize: w * 0.03, color: SURAT.ink2, marginTop: 2 }}>{l}</div>
          ))}
        </div>
      )}

      <div style={{ textAlign: "right", fontSize: fs, marginBottom: w * 0.03 }}>{d.place}</div>

      <div style={{ display: "flex", flexDirection: "column", gap: w * 0.008, marginBottom: w * 0.035 }}>
        {d.meta.map(([k, v], i) => (
          <div key={i} style={{ display: "flex", fontSize: fs }}>
            <span style={{ width: w * 0.2 }}>{k}</span>
            <span style={{ marginRight: 6 }}>:</span>
            <span style={{ flex: 1, fontWeight: k === "Perihal" ? 700 : 400 }}>{v}</span>
          </div>
        ))}
      </div>

      <div style={{ fontSize: fs, marginBottom: w * 0.035 }}>
        {d.to.map((l, i) => <div key={i} style={{ fontWeight: i === 1 ? 600 : 400 }}>{l}</div>)}
      </div>

      {d.body.map((p, i) => (
        <p key={i} style={{ fontSize: fs, margin: `0 0 ${w * 0.022}px`, textAlign: "justify", textIndent: i === 0 ? 0 : w * 0.05 }}>{p}</p>
      ))}

      {d.detail && (
        <div style={{ display: "flex", flexDirection: "column", gap: w * 0.008, margin: `0 0 ${w * 0.022}px ${w * 0.08}px` }}>
          {d.detail.map(([k, v], i) => (
            <div key={i} style={{ display: "flex", fontSize: fs }}>
              <span style={{ width: w * 0.24 }}>{k}</span><span style={{ marginRight: 6 }}>:</span><span style={{ fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>
      )}

      <p style={{ fontSize: fs, margin: 0, textAlign: "justify", textIndent: w * 0.05 }}>{d.close}</p>

      <div style={{ display: "flex", justifyContent: d.signs.length > 1 ? "space-between" : "flex-end", marginTop: w * 0.05 }}>
        {d.signs.map(([role, name], i) => (
          <div key={i} style={{ textAlign: "center", fontSize: fs }}>
            <div>{role},</div>
            <div style={{ height: w * 0.13 }} />
            <div style={{ fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 2 }}>{name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Output: real digital invitation embedded in a phone ──────────────
// Loads the actual wedding website in a scaled iframe so the mockup is real.
export function InvitePhone({ w = 210, src = "/wedding-website.html", logicalW = 390 }: { w?: number; src?: string; logicalW?: number }) {
  const sw = w;
  const sh = Math.round(w * 1.96);
  const bezel = Math.round(w * 0.03);
  const scale = sw / logicalW;
  return (
    <div style={{
      width: sw + bezel * 2, height: sh + bezel * 2, padding: bezel,
      background: "#211d18", borderRadius: w * 0.13,
      boxShadow: "0 2px 6px rgba(60,50,40,.1), 0 40px 70px -24px rgba(60,50,40,.55)",
    }}>
      <div style={{ width: sw, height: sh, borderRadius: w * 0.1, overflow: "hidden", background: SURAT.popupBg, position: "relative" }}>
        <iframe
          src={src}
          title="Undangan digital Surat"
          scrolling="no"
          style={{
            width: logicalW, height: Math.round(sh / scale), border: "none",
            transform: `scale(${scale})`, transformOrigin: "top left",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}

// Hero star — the two output documents fanned, with annotation pills.
export function HeroDocs({ docType = "kelompok-tani" }: { docType?: string }) {
  const shadow = "0 2px 6px rgba(60,50,40,.08), 0 40px 70px -26px rgba(60,50,40,.5)";
  return (
    <ScaledShot w={460} h={540} maxW={500} frame={false}>
      <div style={{ position: "relative", width: 460, height: 540 }}>
        {/* Back — official Word letter */}
        <SuratPaper
          type={docType}
          w={242}
          cls=""
          style={{ position: "absolute", top: 30, left: 6, borderRadius: 6, transform: "rotate(-3.5deg)", boxShadow: shadow, border: "1px solid rgba(60,50,40,.07)" }} />
        {/* Front — CV PDF */}
        <CVPaper
          w={226}
          cls=""
          style={{ position: "absolute", top: 156, right: 6, borderRadius: 6, transform: "rotate(3.5deg)", boxShadow: shadow, border: "1px solid rgba(60,50,40,.07)" }} />

        {/* Pills */}
        <div className="lp-prod-pill" style={{ position: "absolute", top: 4, right: 52, transform: "none" }}>
          <Icon.Sparkle width={14} height={14} style={{ color: SURAT.accent }} />
          Dari form singkat
        </div>
        <div className="lp-prod-pill" style={{ position: "absolute", bottom: 14, left: 18, transform: "none" }}>
          <span style={{ width: 16, height: 16, borderRadius: 999, background: SURAT.success, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <Icon.Check width={10} height={10} />
          </span>
          PDF &amp; Word siap kirim
        </div>
      </div>
    </ScaledShot>
  );
}
