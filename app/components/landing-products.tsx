"use client";

import { CSSProperties, Fragment, ReactNode } from "react";
import { SURAT } from "@/app/lib/tokens";
import { Icon } from "./icons";
import { LIcon } from "./landing-icons";
import { ScaledShot } from "./scaled-shot";
import { PopupFrame } from "./popup-shell";
import { ScreenCV, ScreenDocForm, ScreenWedding } from "./landing-product-screens";
import { CVPaper, SuratPaper, InvitePhone } from "./landing-papers";

type Step = { t: string; d: string };

function ProductBlock({
  flip,
  name,
  title,
  desc,
  steps,
  meta,
  stage,
  ctaHref = "#produk",
  ctaLabel = "Coba sekarang",
}: {
  flip?: boolean;
  name: string;
  title: string;
  desc: string;
  steps: Step[];
  meta: string;
  stage: ReactNode;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <div className={"lp-prod-block" + (flip ? " flip" : "")}>
      <div className="lp-prod-copy">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <span className="lp-prod-badge">Baru</span>
          <span className="lp-mono" style={{ fontSize: 12.5, color: SURAT.ink3, letterSpacing: "0.04em" }}>{name}</span>
        </div>
        <h3 className="lp-serif" style={{ fontSize: "clamp(28px, 3.6vw, 42px)", fontWeight: 500, lineHeight: 1.06, margin: 0, color: SURAT.ink }}>{title}</h3>
        <p style={{ fontSize: 17, lineHeight: 1.58, color: SURAT.ink2, margin: "16px 0 0" }}>{desc}</p>
        <div className="lp-prod-steps">
          {steps.map((s, i) => (
            <div key={i} className="lp-prod-step">
              <span className="lp-prod-step-n">{i + 1}</span>
              <div>
                <div style={{ fontSize: 14.5, fontWeight: 600, color: SURAT.ink }}>{s.t}</div>
                <div style={{ fontSize: 13.5, color: SURAT.ink3, marginTop: 2, lineHeight: 1.45 }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <a className="lp-btn lp-btn-primary" href={ctaHref} style={{ textDecoration: "none", background: "var(--pa)" }}>
            <Icon.Sparkle width={18} height={18} /> {ctaLabel}
          </a>
          <span className="lp-mono" style={{ fontSize: 12, color: SURAT.ink3 }}>{meta}</span>
        </div>
      </div>
      <div className="lp-prod-stage">{stage}</div>
    </div>
  );
}

export function ProductSuite({ docType = "kelompok-tani", accent = SURAT.accent }: { docType?: string; accent?: string }) {
  const tabs = [
    { ico: <Icon.User width={20} height={20} />, name: "Surat CV", desc: "Form singkat jadi CV PDF profesional", tag: "Baru", primary: true },
    { ico: <Icon.File width={20} height={20} />, name: "Surat Dokumen", desc: "Contoh surat jadi dokumen Word resmi", tag: "Baru", primary: true },
    { ico: <Icon.Image width={20} height={20} />, name: "Surat Undangan", desc: "Undangan pernikahan digital, bagikan lewat link", tag: "Baru", primary: true },
    { ico: <LIcon.Wand width={20} height={20} />, name: "Surat Autofill", desc: "Isi form online otomatis — ekstensi Chrome", tag: "Bonus", primary: false },
  ];

  return (
    <section id="produk" className="lp-prod lp-section" style={{ "--pa": accent } as CSSProperties}>
      <div className="lp-container">
        {/* Intro */}
        <div className="lp-prod-intro" style={{ marginBottom: 88 }}>
          <div>
            <div className="lp-eyebrow" style={{ marginBottom: 16, color: "var(--pa)" }}>
              <span className="dot" style={{ background: "var(--pa)" }} />Produk
            </div>
            <h2 className="lp-serif" style={{ fontSize: "clamp(32px, 4.4vw, 50px)", fontWeight: 500, lineHeight: 1.06, margin: 0, color: SURAT.ink }}>
              Bukan ngetik dari nol —<br />Surat yang menyusun.
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.55, color: SURAT.ink2, margin: "18px 0 0", maxWidth: 440 }}>
              Pilih produk, isi datanya, dan Surat menyusun hasil yang rapi: CV untuk melamar
              kerja, surat resmi untuk keperluan desa &amp; usaha, hingga undangan pernikahan digital.
            </p>
          </div>
          <div className="lp-prod-tabs">
            {tabs.map((t) => (
              <div key={t.name} className={"lp-prod-tab" + (t.primary ? " new" : "")}>
                <span className="lp-prod-tab-ico" style={{ background: t.primary ? "color-mix(in srgb, var(--pa) 14%, transparent)" : SURAT.cardAlt, color: t.primary ? "var(--pa)" : SURAT.ink2 }}>
                  {t.ico}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 15.5, fontWeight: 600, color: SURAT.ink }}>{t.name}</span>
                    <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: t.primary ? "#fff" : SURAT.ink2, background: t.primary ? "var(--pa)" : SURAT.cardAlt, padding: "2px 7px", borderRadius: 999 }}>{t.tag}</span>
                  </div>
                  <div style={{ fontSize: 13, color: SURAT.ink3, marginTop: 2 }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product 1 — Surat CV */}
        <div style={{ marginBottom: 104 }}>
          <ProductBlock
            name="Surat CV"
            title="CV profesional dalam lima menit."
            desc="Isi satu form singkat — Surat menyusun jadi CV rapi, merapikan tata bahasanya, lalu mengeluarkan PDF siap kirim. Tanpa aplikasi desain, tanpa template ruwet."
            meta="Output PDF · siap kirim"
            steps={[
              { t: "Isi form singkat", d: "Posisi, pengalaman, pendidikan, keahlian." },
              { t: "Surat menyusun & merapikan", d: "Kalimat dirapikan, tata letak diatur otomatis." },
              { t: "Unduh PDF", d: "Langsung kirim ke pemberi kerja atau cetak." },
            ]}
            stage={
              <Fragment>
                <ScaledShot w={380} h={720} maxW={332} cropH={544} fade={true}>
                  <PopupFrame><ScreenCV /></PopupFrame>
                </ScaledShot>
                <CVPaper w={206} />
                <div className="lp-prod-pill" style={{ top: 18, left: -18 }}>
                  <Icon.Sparkle width={14} height={14} style={{ color: "var(--pa)" }} />
                  Kalimat dirapikan
                </div>
                <div className="lp-prod-pill" style={{ bottom: 16, right: -26 }}>
                  <span style={{ width: 16, height: 16, borderRadius: 999, background: SURAT.success, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon.Check width={10} height={10} />
                  </span>
                  CV.pdf
                  <span className="lp-mono">1 halaman</span>
                </div>
              </Fragment>
            }
          />
        </div>

        {/* Product 2 — Surat Dokumen */}
        <ProductBlock
          flip={true}
          name="Surat Dokumen"
          title="Surat resmi dari satu contoh."
          desc="Punya contoh surat? Unggah sekali. Surat membaca formatnya, menyiapkan form berisi data yang dibutuhkan, dan setelah Anda lengkapi — jadilah dokumen Word siap dicetak dan ditandatangani."
          meta="Output .docx · siap cetak"
          steps={[
            { t: "Unggah contoh dokumen", d: "Foto atau scan surat yang formatnya ingin diikuti." },
            { t: "Lengkapi form otomatis", d: "Surat tahu data apa yang dibutuhkan dari contoh itu." },
            { t: "Unduh dokumen Word", d: "Surat pengajuan, pengantar, atau undangan — rapi & resmi." },
          ]}
          stage={
            <Fragment>
              <ScaledShot w={380} h={720} maxW={332} cropH={544} fade={true}>
                <PopupFrame><ScreenDocForm type={docType} /></PopupFrame>
              </ScaledShot>
              <SuratPaper type={docType} w={206} />
              <div className="lp-prod-pill" style={{ top: 18, left: -22 }}>
                <LIcon.Scan width={14} height={14} style={{ color: "var(--pa)" }} />
                Data terdeteksi
                <span className="lp-mono">dari contoh</span>
              </div>
              <div className="lp-prod-pill" style={{ bottom: 16, right: -30 }}>
                <Icon.File width={14} height={14} style={{ color: "var(--pa)" }} />
                Surat.docx
                <span className="lp-mono">siap cetak</span>
              </div>
            </Fragment>
          }
        />

        {/* Product 3 — Surat Undangan */}
        <div style={{ marginTop: 104 }}>
          <ProductBlock
            name="Surat Undangan"
            title="Undangan pernikahan digital, sebar lewat link."
            desc="Isi nama mempelai, tanggal, dan lokasi — Surat menyusun undangan digital yang elegan. Bagikan lewat WhatsApp, lengkap dengan peta lokasi dan RSVP tamu."
            meta="Output link · bisa dibagikan"
            ctaLabel="Coba sekarang"
            steps={[
              { t: "Isi detail acara", d: "Nama mempelai, tanggal, lokasi akad & resepsi." },
              { t: "Pilih tema & foto", d: "Beberapa tema elegan, tambah foto prewedding." },
              { t: "Bagikan link atau QR", d: "Sebar ke tamu lewat WhatsApp — RSVP masuk otomatis." },
            ]}
            stage={
              <Fragment>
                <ScaledShot w={380} h={720} maxW={332} cropH={544} fade={true}>
                  <PopupFrame><ScreenWedding /></PopupFrame>
                </ScaledShot>
                <div className="lp-prod-device"><InvitePhone w={208} /></div>
                <div className="lp-prod-pill" style={{ top: 18, left: -20 }}>
                  <Icon.Sparkle width={14} height={14} style={{ color: "var(--pa)" }} />
                  Tema elegan
                </div>
                <div className="lp-prod-pill" style={{ bottom: 16, right: -28 }}>
                  <Icon.ArrowRight width={14} height={14} style={{ color: "var(--pa)" }} />
                  Link undangan
                  <span className="lp-mono">+ RSVP</span>
                </div>
              </Fragment>
            }
          />
        </div>
      </div>
    </section>
  );
}
