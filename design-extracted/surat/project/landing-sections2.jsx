// Surat landing page — pricing, FAQ, final CTA, footer.

// ─── PRICING ──────────────────────────────────────────────────────────
function Pricing() {
  const [annual, setAnnual] = React.useState(true);

  const plans = [
    {
      name: 'Gratis',
      tagline: 'Untuk kebutuhan sesekali',
      price: { m: 0, y: 0 },
      cta: 'Mulai gratis', primary: false,
      features: ['10 scan per bulan', 'Semua tipe dokumen', 'Preview & edit field', 'Undo autofill'],
    },
    {
      name: 'Pro',
      tagline: 'Untuk yang sering isi form',
      price: { m: 49000, y: 39000 },
      cta: 'Pilih Pro', primary: true, badge: 'Paling populer',
      features: ['Scan tak terbatas', 'Akurasi prioritas', 'Riwayat dokumen', 'Template form tersimpan', 'Dukungan prioritas'],
    },
    {
      name: 'Tim',
      tagline: 'Untuk HR, admin & UMKM',
      price: { m: 35000, y: 29000 }, perUser: true,
      cta: 'Hubungi kami', primary: false,
      features: ['Semua fitur Pro', 'Penagihan terpusat', 'Dashboard admin', 'Kontrol akses anggota', 'Onboarding tim'],
    },
  ];

  const fmt = (n) => n === 0 ? 'Rp0' : 'Rp' + n.toLocaleString('id-ID');

  return (
    <section id="harga" className="lp-section">
      <div className="lp-container">
        <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 44px' }}>
          <div className="lp-eyebrow" style={{ marginBottom: 16 }}><span className="dot" />Harga</div>
          <h2 className="lp-serif" style={{ fontSize: 'clamp(32px, 4.4vw, 50px)', fontWeight: 500, lineHeight: 1.06, margin: 0, color: SURAT.ink }}>
            Mulai gratis. Tingkatkan saat butuh.
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: SURAT.ink2, margin: '18px 0 28px' }}>
            Tanpa kartu kredit untuk memulai. Batalkan kapan saja.
          </p>

          <div className="lp-toggle">
            <button className={!annual ? 'active' : ''} onClick={() => setAnnual(false)}>Bulanan</button>
            <button className={annual ? 'active' : ''} onClick={() => setAnnual(true)}>
              Tahunan
              <span style={{ fontSize: 11.5, fontWeight: 600, color: SURAT.success, background: SURAT.successSoft, padding: '2px 7px', borderRadius: 999 }}>Hemat 20%</span>
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, alignItems: 'stretch', maxWidth: 1040, margin: '0 auto' }}>
          {plans.map((p) => {
            const price = annual ? p.price.y : p.price.m;
            const isPro = p.primary;
            return (
              <div key={p.name} className="lp-card" style={{
                padding: '30px 28px', display: 'flex', flexDirection: 'column',
                position: 'relative',
                background: isPro ? SURAT.ink : SURAT.card,
                border: isPro ? `1px solid ${SURAT.ink}` : `1px solid ${SURAT.border}`,
                boxShadow: isPro ? '0 24px 48px -20px rgba(42,37,31,.45)' : 'none',
                color: isPro ? '#f5efe0' : SURAT.ink,
              }}>
                {p.badge && (
                  <span style={{
                    position: 'absolute', top: 20, right: 20,
                    fontSize: 11.5, fontWeight: 600, letterSpacing: '0.02em',
                    color: '#fff', background: SURAT.accent, padding: '4px 11px', borderRadius: 999,
                  }}>{p.badge}</span>
                )}
                <div className="lp-serif" style={{ fontSize: 26, fontWeight: 500, color: isPro ? '#fff' : SURAT.ink }}>{p.name}</div>
                <div style={{ fontSize: 14, color: isPro ? 'rgba(245,239,224,.6)' : SURAT.ink3, marginTop: 3 }}>{p.tagline}</div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, margin: '24px 0 4px' }}>
                  <span className="lp-serif" style={{ fontSize: 42, fontWeight: 500, color: isPro ? '#fff' : SURAT.ink, letterSpacing: '-0.02em' }}>{fmt(price)}</span>
                  {price > 0 && (
                    <span style={{ fontSize: 14, color: isPro ? 'rgba(245,239,224,.6)' : SURAT.ink3 }}>
                      /{p.perUser ? 'pengguna/' : ''}bln
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 12.5, color: isPro ? 'rgba(245,239,224,.5)' : SURAT.ink3, minHeight: 18 }}>
                  {price === 0 ? 'Selamanya' : annual ? 'Ditagih tahunan' : 'Ditagih bulanan'}
                </div>

                <button className={'lp-btn ' + (isPro ? 'lp-btn-primary' : 'lp-btn-secondary')} style={{ width: '100%', marginTop: 24 }}>
                  {p.cta}
                </button>

                <div style={{ height: 1, background: isPro ? 'rgba(245,239,224,.14)' : SURAT.border, margin: '26px 0 20px' }} />
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 13 }}>
                  {p.features.map((f, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 11, fontSize: 14.5, color: isPro ? 'rgba(245,239,224,.9)' : SURAT.ink2 }}>
                      <Icon.Check width={16} height={16} style={{ color: isPro ? '#e8a07f' : SURAT.success, flexShrink: 0, marginTop: 2 }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────
function FAQ() {
  const items = [
    { q: 'Apakah dokumen saya aman?', a: 'Ya. Dokumen Anda diproses saat itu juga lalu langsung dihapus — tidak disimpan di server kami. Selain itu, Anda meninjau dan menyetujui setiap field sebelum dimasukkan ke formulir.' },
    { q: 'Dokumen apa saja yang didukung?', a: 'KTP, NPWP, Kartu Keluarga, Ijazah, SIM, paspor, invoice, rekening koran, dan banyak lagi. Surat membaca tata letak dokumen secara umum, jadi sebagian besar dokumen identitas dan keuangan Indonesia bisa dikenali.' },
    { q: 'Apakah Surat bekerja di semua situs?', a: 'Surat bekerja pada formulir web standar — termasuk situs pemerintah, fintech, perbankan, dan portal HR. Panel samping mendeteksi field di halaman yang sedang aktif dan mencocokkannya dengan data dokumen Anda.' },
    { q: 'Format file apa yang bisa diunggah?', a: 'JPG, PNG, dan PDF hingga 10 MB. Anda bisa memotret dokumen langsung atau mengunggah pindaian dan berkas digital.' },
    { q: 'Apakah benar-benar gratis?', a: 'Paket gratis memberi 10 scan setiap bulan tanpa kartu kredit. Bila Anda sering mengisi formulir, paket Pro membuka scan tak terbatas dan riwayat dokumen.' },
    { q: 'Seberapa akurat hasilnya?', a: 'Setiap field diberi skor keyakinan. Field dengan keyakinan tinggi diisi otomatis; yang rendah ditandai "perlu cek" agar Anda verifikasi sebelum mengirim. Anda selalu memegang kendali penuh.' },
  ];
  const [open, setOpen] = React.useState(0);
  return (
    <section id="faq" className="lp-section" style={{ background: SURAT.popupBg, borderTop: `1px solid ${SURAT.border}` }}>
      <div className="lp-container-narrow">
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div className="lp-eyebrow" style={{ marginBottom: 16 }}><span className="dot" />FAQ</div>
          <h2 className="lp-serif" style={{ fontSize: 'clamp(32px, 4.4vw, 50px)', fontWeight: 500, lineHeight: 1.06, margin: 0, color: SURAT.ink }}>
            Pertanyaan yang sering muncul.
          </h2>
        </div>
        <div>
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="lp-faq-item">
                <button className="lp-faq-q" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
                  <span>{it.q}</span>
                  <span className="lp-faq-icon" style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}>
                    <LIcon.Plus width={20} height={20} />
                  </span>
                </button>
                <div className="lp-faq-a" style={{ height: isOpen ? 'auto' : 0 }}>
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

// ─── FINAL CTA ────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="lp-section" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <div className="lp-container">
        <div style={{
          position: 'relative', overflow: 'hidden',
          borderRadius: 28, background: SURAT.ink, color: '#f5efe0',
          padding: 'clamp(48px, 7vw, 88px) clamp(28px, 6vw, 80px)', textAlign: 'center',
        }}>
          <div style={{
            position: 'absolute', bottom: -200, left: '50%', transform: 'translateX(-50%)',
            width: 800, height: 500, borderRadius: '50%',
            background: 'radial-gradient(closest-side, rgba(193,95,60,0.35), transparent)', pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative' }}>
            <h2 className="lp-serif" style={{ fontSize: 'clamp(34px, 5vw, 60px)', fontWeight: 500, lineHeight: 1.05, margin: 0, color: '#fff', maxWidth: 720, marginInline: 'auto' }}>
              Berhenti mengetik ulang<br />data yang itu-itu saja.
            </h2>
            <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', lineHeight: 1.55, color: 'rgba(245,239,224,.7)', margin: '20px auto 0', maxWidth: 520 }}>
              Pasang Surat, unggah satu dokumen, dan biarkan formulir berikutnya terisi sendiri.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 34 }}>
              <button className="lp-btn lp-btn-dark lp-btn-lg">
                <LIcon.Puzzle width={19} height={19} />
                Tambahkan ke Chrome — Gratis
              </button>
            </div>
            <p style={{ fontSize: 13.5, color: 'rgba(245,239,224,.5)', marginTop: 18 }}>
              Gratis 10 scan per bulan · Tanpa kartu kredit
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────
function Footer() {
  const cols = [
    { h: 'Produk', items: ['Cara kerja', 'Harga', 'Tipe dokumen', 'Unduh ekstensi'] },
    { h: 'Perusahaan', items: ['Tentang', 'Blog', 'Karier', 'Kontak'] },
    { h: 'Bantuan', items: ['Pusat bantuan', 'Privasi', 'Ketentuan', 'Status'] },
  ];
  return (
    <footer style={{ borderTop: `1px solid ${SURAT.border}`, background: SURAT.canvasBg }}>
      <div className="lp-container" style={{ padding: '56px 32px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 1.4fr) repeat(3, minmax(120px, 1fr))', gap: 40 }}>
          <div>
            <Wordmark size={24} />
            <p style={{ fontSize: 14, lineHeight: 1.6, color: SURAT.ink2, margin: '16px 0 0', maxWidth: 260 }}>
              Asisten pengisian formulir bertenaga AI untuk dokumen Indonesia.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <div style={{ fontSize: 13, fontWeight: 600, color: SURAT.ink, marginBottom: 14 }}>{c.h}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
                {c.items.map((it) => (
                  <li key={it}><a className="lp-link" style={{ fontSize: 14 }}>{it}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginTop: 48, paddingTop: 24, borderTop: `1px solid ${SURAT.border}`, fontSize: 13, color: SURAT.ink3 }}>
          <span>© 2026 Surat. Dibuat untuk Indonesia.</span>
          <span className="lp-mono" style={{ fontSize: 12 }}>surat.id</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Pricing, FAQ, FinalCTA, Footer });
