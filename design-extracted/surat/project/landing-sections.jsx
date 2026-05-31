// Surat landing page — section components. Indonesian copy, crisp/efficient tone.

// ─── NAV ──────────────────────────────────────────────────────────────
function LandingNav() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={'lp-nav' + (scrolled ? ' scrolled' : '')}>
      <div className="lp-container lp-nav-inner">
        <Wordmark size={24} />
        <div className="lp-nav-links">
          <a className="lp-link" href="#cara-kerja">Cara kerja</a>
          <a className="lp-link" href="#privasi">Privasi</a>
          <a className="lp-link" href="#harga">Harga</a>
          <a className="lp-link" href="#faq">FAQ</a>
        </div>
        <button className="lp-btn lp-btn-primary" style={{ padding: '11px 18px', fontSize: 14.5 }}>
          <LIcon.Puzzle width={17} height={17} />
          Tambahkan ke Chrome
        </button>
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────
function DockPageSkeleton() {
  return (
    <div className="lp-dock-page">
      <div style={{ height: 12, width: 90, background: '#cfc8b7', borderRadius: 4, marginBottom: 16 }} />
      <div style={{ height: 18, width: '85%', background: '#bfb8a3', borderRadius: 5, marginBottom: 20 }} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <div key={i} style={{ marginBottom: 13 }}>
          <div style={{ height: 8, width: 54 + (i % 3) * 14, background: '#cfc8b7', borderRadius: 3, marginBottom: 5 }} />
          <div style={{ height: 28, background: '#f1ece0', borderRadius: 6, border: '1px solid #d9d1be' }} />
        </div>
      ))}
    </div>
  );
}

function Hero() {
  return (
    <header className="lp-hero">
      <div className="lp-hero-bg" />
      <div className="lp-hero-glow" />
      <div className="lp-container lp-hero-grid">
        {/* Left — editorial copy */}
        <div className="lp-hero-copy">
          <div className="lp-hero-index">
            <span>Surat</span>
            <span className="rule" />
            <span>Ekstensi Chrome</span>
          </div>
          <h1 className="lp-hero-h1">
            Isi formulir<br />
            apa pun, <span style={{ fontStyle: 'italic', color: SURAT.accent }}>tanpa</span><br />
            ketik ulang.
          </h1>
          <p className="lp-hero-sub">
            Unggah KTP, NPWP, atau dokumen apa saja. Surat membacanya dengan AI lalu
            mengisi form yang sedang Anda buka — dalam hitungan detik.
          </p>
          <div className="lp-hero-actions">
            <button className="lp-btn lp-btn-primary lp-btn-lg">
              <LIcon.Puzzle width={19} height={19} />
              Tambahkan ke Chrome
            </button>
            <a href="#cara-kerja" className="lp-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 15.5, fontWeight: 500, color: SURAT.ink }}>
              Lihat cara kerja
              <Icon.ArrowRight width={16} height={16} />
            </a>
          </div>
          <div className="lp-hero-meta">
            <span>Gratis 10 scan</span>
            <span className="sep" />
            <span>Tanpa kartu kredit</span>
            <span className="sep" />
            <span>Dokumen tidak disimpan</span>
          </div>
        </div>

        {/* Right — Surat docked in Chrome, with annotations */}
        <div className="lp-hero-stage">
          <ScaledShot w={530} h={760} maxW={486} frame={true} align="center">
            <div className="lp-dock" style={{ width: 530, height: 760 }}>
              <div className="lp-dock-bar">
                <div className="lp-dock-lights">
                  <span style={{ background: '#e8765a' }} />
                  <span style={{ background: '#e0b13b' }} />
                  <span style={{ background: '#6db465' }} />
                </div>
                <div className="lp-dock-url"><span style={{ color: SURAT.ink3 }}>https://</span>app.kredivo.com/identitas</div>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: SURAT.accentSoft, color: SURAT.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 1.5px rgba(193,95,60,0.5)' }}>
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <line x1="15" y1="4" x2="15" y2="20" />
                  </svg>
                </div>
              </div>
              <div className="lp-dock-body" style={{ height: 720 }}>
                <DockPageSkeleton />
                <div style={{ width: 380, flexShrink: 0, boxShadow: '-8px 0 24px rgba(60,50,40,0.08)' }}>
                  <InteractivePopup initial="preview" />
                </div>
              </div>
            </div>
          </ScaledShot>

          {/* Annotations */}
          <div className="lp-anno" style={{ top: 92, left: -30 }}>
            <span style={{ width: 18, height: 18, borderRadius: 999, background: SURAT.success, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon.Check width={11} height={11} />
            </span>
            KTP terbaca
            <span className="lp-mono">conf 0,98</span>
          </div>
          <div className="lp-anno" style={{ bottom: 108, left: -44 }}>
            <LIcon.Bolt width={16} height={16} style={{ color: SURAT.accent }} />
            11 field terisi
            <span className="lp-mono">2,4 dtk</span>
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── DOC TYPES STRIP ──────────────────────────────────────────────────
function DocStrip() {
  const docs = ['KTP', 'NPWP', 'Kartu Keluarga', 'Ijazah', 'SIM', 'Paspor', 'Invoice', 'Rekening koran'];
  return (
    <section style={{ borderTop: `1px solid ${SURAT.border}`, borderBottom: `1px solid ${SURAT.border}`, background: SURAT.popupBg }}>
      <div className="lp-container" style={{ padding: '34px 32px', textAlign: 'center' }}>
        <div className="lp-label" style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: SURAT.ink3, marginBottom: 18 }}>
          Dikenali otomatis
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
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

// ─── HOW IT WORKS ─────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      n: '01', icon: <LIcon.Upload width={22} height={22} />,
      title: 'Unggah dokumen',
      body: 'Tarik KTP, NPWP, atau PDF ke side panel — atau pilih file. Mendukung JPG, PNG, dan PDF hingga 10 MB.',
      shot: <ScreenMain />,
    },
    {
      n: '02', icon: <LIcon.Scan width={22} height={22} />,
      title: 'Surat membaca & mengenali',
      body: 'AI mengekstrak setiap field, mencocokkannya dengan formulir di halaman, dan memberi skor keyakinan agar Anda tahu mana yang perlu dicek.',
      shot: <ScreenPreview />,
    },
    {
      n: '03', icon: <LIcon.Wand width={22} height={22} />,
      title: 'Form terisi otomatis',
      body: 'Tinjau hasilnya, sesuaikan bila perlu, lalu isi semua field dengan satu klik. Ada tombol undo bila Anda berubah pikiran.',
      shot: <ScreenSuccess />,
    },
  ];
  return (
    <section id="cara-kerja" className="lp-section">
      <div className="lp-container">
        <div style={{ maxWidth: 640, marginBottom: 56 }}>
          <div className="lp-eyebrow" style={{ marginBottom: 16 }}><span className="dot" />Cara kerja</div>
          <h2 className="lp-serif" style={{ fontSize: 'clamp(32px, 4.4vw, 50px)', fontWeight: 500, lineHeight: 1.06, margin: 0, color: SURAT.ink }}>
            Tiga langkah dari dokumen ke form terisi.
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: SURAT.ink2, margin: '18px 0 0' }}>
            Tidak ada penyiapan, tidak ada salin-tempel. Surat bekerja di panel samping browser,
            di sisi formulir yang sedang Anda isi.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28 }}>
          {steps.map((s) => (
            <div key={s.n} style={{ display: 'flex', flexDirection: 'column' }}>
              <ScaledShot w={380} h={720} maxW={380} cropH={470} fade={true}>
                <PopupFrame>{s.shot}</PopupFrame>
              </ScaledShot>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 26 }}>
                <span className="lp-feature-ico">{s.icon}</span>
                <span className="lp-mono" style={{ fontSize: 13, color: SURAT.ink3 }}>{s.n}</span>
              </div>
              <h3 className="lp-serif" style={{ fontSize: 23, fontWeight: 500, margin: '16px 0 0', color: SURAT.ink }}>{s.title}</h3>
              <p style={{ fontSize: 15.5, lineHeight: 1.6, color: SURAT.ink2, margin: '8px 0 0' }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PRIVACY ──────────────────────────────────────────────────────────
function Privacy() {
  const points = [
    { icon: <LIcon.Trash width={20} height={20} />, title: 'Tidak disimpan di server', body: 'Dokumen Anda diproses saat itu juga lalu langsung dihapus. Tidak ada arsip, tidak ada cadangan.' },
    { icon: <LIcon.Eye width={20} height={20} />, title: 'Anda meninjau setiap field', body: 'Surat tidak pernah mengisi diam-diam. Setiap nilai bisa Anda cek, edit, atau matikan sebelum dikirim.' },
    { icon: <LIcon.Bolt width={20} height={20} />, title: 'Diproses real-time', body: 'Ekstraksi berjalan sekali jalan, hanya saat Anda memintanya — bukan pemantauan terus-menerus.' },
    { icon: <Icon.Undo width={20} height={20} />, title: 'Selalu bisa dibatalkan', body: 'Salah isi? Satu ketukan mengembalikan form ke kondisi semula dalam beberapa detik.' },
  ];
  return (
    <section id="privasi" className="lp-section" style={{ background: SURAT.popupBg, borderTop: `1px solid ${SURAT.border}`, borderBottom: `1px solid ${SURAT.border}` }}>
      <div className="lp-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.1fr)', gap: 64, alignItems: 'start' }}>
        <div style={{ position: 'sticky', top: 100 }}>
          <div className="lp-eyebrow" style={{ marginBottom: 16 }}><span className="dot" />Privasi & keamanan</div>
          <h2 className="lp-serif" style={{ fontSize: 'clamp(32px, 4.4vw, 50px)', fontWeight: 500, lineHeight: 1.06, margin: 0, color: SURAT.ink }}>
            Data Anda tetap milik Anda.
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: SURAT.ink2, margin: '18px 0 0' }}>
            Dokumen identitas itu sensitif. Surat dirancang agar Anda mendapat kecepatan AI
            tanpa menyerahkan kendali atas data pribadi.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginTop: 28, padding: '14px 18px', borderRadius: 14, background: SURAT.card, border: `1px solid ${SURAT.border}` }}>
            <span style={{ width: 40, height: 40, borderRadius: 10, background: SURAT.successSoft, color: SURAT.success, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LIcon.Shield width={22} height={22} />
            </span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: SURAT.ink }}>Diproses, lalu dihapus</div>
              <div style={{ fontSize: 12.5, color: SURAT.ink3 }}>Tidak ada dokumen yang tersimpan</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {points.map((p, i) => (
            <div key={i} className="lp-card" style={{ padding: 24 }}>
              <span className="lp-feature-ico" style={{ width: 42, height: 42 }}>{p.icon}</span>
              <h3 style={{ fontSize: 17, fontWeight: 600, margin: '18px 0 0', color: SURAT.ink, letterSpacing: '-0.01em' }}>{p.title}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.55, color: SURAT.ink2, margin: '7px 0 0' }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { LandingNav, Hero, DocStrip, HowItWorks, Privacy });
