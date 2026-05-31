// Shared helpers + styles for the Surat landing page.
// Reuses SURAT design tokens from popup-shell.jsx.

// ─── Landing-scoped stylesheet ────────────────────────────────────────
if (typeof document !== 'undefined' && !document.getElementById('surat-landing-styles')) {
  const s = document.createElement('style');
  s.id = 'surat-landing-styles';
  s.textContent = `
    .lp, .lp * { box-sizing: border-box; }
    .lp {
      font-family: ${SURAT.sans};
      color: ${SURAT.ink};
      background: ${SURAT.canvasBg};
      letter-spacing: -0.006em;
      font-feature-settings: "ss01", "cv11";
      -webkit-font-smoothing: antialiased;
      line-height: 1.5;
    }
    .lp-serif { font-family: ${SURAT.serif}; letter-spacing: -0.02em; }
    .lp-mono { font-family: ${SURAT.mono}; }
    .lp ::selection { background: ${SURAT.accentSoft}; color: ${SURAT.accentInk}; }

    .lp-container { width: 100%; max-width: 1180px; margin: 0 auto; padding: 0 32px; }
    .lp-container-narrow { width: 100%; max-width: 880px; margin: 0 auto; padding: 0 32px; }

    .lp-section { padding: 104px 0; }
    .lp-eyebrow {
      display: inline-flex; align-items: center; gap: 8px;
      font-size: 12.5px; font-weight: 600; letter-spacing: 0.06em;
      text-transform: uppercase; color: ${SURAT.accentInk};
    }
    .lp-eyebrow .dot { width: 6px; height: 6px; border-radius: 999px; background: ${SURAT.accent}; }

    /* Buttons */
    .lp-btn {
      display: inline-flex; align-items: center; justify-content: center; gap: 10px;
      padding: 14px 22px; border-radius: 12px;
      font-size: 15.5px; font-weight: 500; letter-spacing: -0.01em;
      font-family: inherit; cursor: pointer; border: none;
      transition: transform .14s, background .14s, box-shadow .14s;
      white-space: nowrap;
    }
    .lp-btn-lg { padding: 17px 28px; font-size: 16.5px; border-radius: 13px; }
    .lp-btn-primary {
      background: ${SURAT.accent}; color: #fff;
      box-shadow: 0 1px 2px rgba(122,54,24,.25), inset 0 1px 0 rgba(255,255,255,.18);
    }
    .lp-btn-primary:hover { background: #b3552f; transform: translateY(-1px); box-shadow: 0 8px 20px rgba(122,54,24,.22), inset 0 1px 0 rgba(255,255,255,.18); }
    .lp-btn-secondary {
      background: ${SURAT.card}; color: ${SURAT.ink};
      box-shadow: inset 0 0 0 1px ${SURAT.borderStrong};
    }
    .lp-btn-secondary:hover { background: ${SURAT.cardAlt}; transform: translateY(-1px); }
    .lp-btn-ghost { background: transparent; color: ${SURAT.ink}; }
    .lp-btn-ghost:hover { background: ${SURAT.cardAlt}; }
    .lp-btn-dark { background: #f5efe0; color: ${SURAT.ink}; }
    .lp-btn-dark:hover { background: #fff; transform: translateY(-1px); }

    .lp-link { color: ${SURAT.ink2}; text-decoration: none; transition: color .12s; cursor: pointer; }
    .lp-link:hover { color: ${SURAT.ink}; }

    /* Nav */
    .lp-nav {
      position: sticky; top: 0; z-index: 50;
      background: rgba(240,238,233,0.82);
      backdrop-filter: saturate(140%) blur(12px);
      border-bottom: 1px solid transparent;
      transition: border-color .2s, background .2s;
    }
    .lp-nav.scrolled { border-bottom-color: ${SURAT.border}; background: rgba(240,238,233,0.92); }
    .lp-nav-inner { display: flex; align-items: center; justify-content: space-between; height: 68px; }
    .lp-nav-links { display: flex; align-items: center; gap: 30px; }
    .lp-nav-links a { font-size: 14.5px; }

    /* Cards */
    .lp-card {
      background: ${SURAT.card};
      border: 1px solid ${SURAT.border};
      border-radius: 18px;
    }

    .lp-chip {
      display: inline-flex; align-items: center; gap: 7px;
      padding: 8px 14px; border-radius: 999px;
      background: ${SURAT.card}; border: 1px solid ${SURAT.border};
      font-size: 13.5px; color: ${SURAT.ink2}; font-weight: 500;
    }

    /* Pricing toggle */
    .lp-toggle {
      display: inline-flex; padding: 4px; border-radius: 999px;
      background: ${SURAT.cardAlt}; border: 1px solid ${SURAT.border};
    }
    .lp-toggle button {
      border: none; background: transparent; cursor: pointer;
      font-family: inherit; font-size: 14px; font-weight: 500; color: ${SURAT.ink2};
      padding: 8px 18px; border-radius: 999px; transition: all .15s;
      display: inline-flex; align-items: center; gap: 8px;
    }
    .lp-toggle button.active { background: ${SURAT.card}; color: ${SURAT.ink}; box-shadow: 0 1px 3px rgba(0,0,0,.08); }

    /* FAQ */
    .lp-faq-item { border-bottom: 1px solid ${SURAT.border}; }
    .lp-faq-q {
      display: flex; align-items: center; justify-content: space-between; gap: 16px;
      width: 100%; text-align: left; background: transparent; border: none; cursor: pointer;
      font-family: inherit; padding: 24px 4px; color: ${SURAT.ink};
      font-size: 19px; font-weight: 500; letter-spacing: -0.01em;
    }
    .lp-faq-q:hover { color: ${SURAT.accentInk}; }
    .lp-faq-a { overflow: hidden; transition: height .25s ease; }
    .lp-faq-a-inner { padding: 0 4px 24px; font-size: 16px; line-height: 1.6; color: ${SURAT.ink2}; max-width: 680px; }
    .lp-faq-icon { flex-shrink: 0; color: ${SURAT.accent}; transition: transform .25s ease; }

    /* Feature row */
    .lp-feature-ico {
      width: 46px; height: 46px; border-radius: 12px; flex-shrink: 0;
      background: ${SURAT.accentSoft}; color: ${SURAT.accent};
      display: flex; align-items: center; justify-content: center;
    }

    /* Showcase frame shadow */
    .lp-shot-frame {
      border-radius: 14px;
      box-shadow: 0 2px 4px rgba(60,50,40,.05), 0 30px 60px -20px rgba(60,50,40,.35), 0 12px 24px -12px rgba(60,50,40,.18);
    }

    /* ── HERO (editorial split) ───────────────────────────── */
    .lp-hero { position: relative; overflow: hidden; border-bottom: 1px solid ${SURAT.border}; }
    .lp-hero-bg {
      position: absolute; inset: 0; pointer-events: none;
      background-image: linear-gradient(90deg, rgba(42,37,31,0.04) 1px, transparent 1px);
      background-size: 92px 100%;
      background-position: center;
      -webkit-mask-image: linear-gradient(90deg, transparent, #000 18%, #000 82%, transparent);
              mask-image: linear-gradient(90deg, transparent, #000 18%, #000 82%, transparent);
    }
    .lp-hero-glow {
      position: absolute; top: -180px; right: -120px; width: 760px; height: 620px; border-radius: 50%;
      background: radial-gradient(closest-side, rgba(193,95,60,0.16), transparent); pointer-events: none;
    }
    .lp-hero-grid {
      position: relative; display: grid;
      grid-template-columns: 1.02fr 0.98fr; gap: 48px; align-items: center;
      min-height: 90vh; padding-top: 48px; padding-bottom: 56px;
    }
    .lp-hero-copy { max-width: 560px; }
    .lp-hero-index {
      display: flex; align-items: center; gap: 16px; margin-bottom: 26px;
      font-family: ${SURAT.mono}; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: ${SURAT.ink3};
    }
    .lp-hero-index .rule { height: 1px; width: 56px; background: ${SURAT.borderStrong}; }
    .lp-hero-h1 {
      font-family: ${SURAT.serif}; letter-spacing: -0.025em;
      font-size: clamp(46px, 5.8vw, 88px); line-height: 0.96; font-weight: 500;
      margin: 0; color: ${SURAT.ink};
    }
    .lp-hero-sub { font-size: clamp(16.5px, 1.5vw, 19px); line-height: 1.55; color: ${SURAT.ink2}; margin: 28px 0 0; max-width: 460px; }
    .lp-hero-actions { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; margin-top: 36px; }
    .lp-hero-meta { display: flex; flex-wrap: wrap; gap: 8px 14px; align-items: center; margin-top: 34px; font-family: ${SURAT.mono}; font-size: 12px; color: ${SURAT.ink3}; }
    .lp-hero-meta .sep { width: 3px; height: 3px; border-radius: 999px; background: ${SURAT.borderStrong}; }

    .lp-hero-stage { position: relative; justify-self: end; width: 100%; max-width: 540px; }

    /* Docked-in-Chrome mini frame */
    .lp-dock { background: #e8e3d8; border-radius: 16px 16px 16px 16px; overflow: hidden; }
    .lp-dock-bar { height: 40px; background: #dfd9cb; display: flex; align-items: center; gap: 9px; padding: 0 14px; border-bottom: 1px solid #cfc8b7; }
    .lp-dock-lights { display: flex; gap: 6px; }
    .lp-dock-lights span { width: 11px; height: 11px; border-radius: 999px; }
    .lp-dock-url { flex: 1; margin-left: 12px; height: 24px; border-radius: 7px; background: #f1ece0; display: flex; align-items: center; padding: 0 12px; font-family: ${SURAT.mono}; font-size: 11px; color: ${SURAT.ink2}; }
    .lp-dock-body { display: flex; }
    .lp-dock-page { width: 150px; flex-shrink: 0; padding: 22px 18px; -webkit-mask-image: linear-gradient(90deg, #000 30%, transparent); mask-image: linear-gradient(90deg, #000 30%, transparent); }

    /* Floating annotation pills */
    .lp-anno {
      position: absolute; z-index: 5; display: inline-flex; align-items: center; gap: 9px;
      padding: 9px 13px; border-radius: 12px; background: ${SURAT.card};
      border: 1px solid ${SURAT.border}; box-shadow: 0 14px 30px -12px rgba(60,50,40,.4);
      font-size: 12.5px; font-weight: 500; color: ${SURAT.ink}; white-space: nowrap;
    }
    .lp-anno .lp-mono { font-size: 11px; color: ${SURAT.ink3}; }

    @media (max-width: 900px) {
      .lp-hero-grid { grid-template-columns: 1fr; min-height: auto; gap: 44px; padding-top: 36px; padding-bottom: 8px; }
      .lp-hero-copy { max-width: 620px; }
      .lp-hero-stage { justify-self: center; max-width: 460px; }
      .lp-anno { display: none; }
    }

    @media (max-width: 860px) {
      .lp-section { padding: 72px 0; }
      .lp-container, .lp-container-narrow { padding: 0 22px; }
      .lp-nav-links { display: none; }
      .lp-hero-h1 { font-size: clamp(42px, 12vw, 60px); }
    }
  `;
  document.head.appendChild(s);
}

// ─── Scaled product shot (fits fixed-size React UI into a fluid column) ─
function ScaledShot({ w, h, maxW, children, frame = true, align = 'center', cropH, fade = false }) {
  const ref = React.useRef(null);
  const [scale, setScale] = React.useState(maxW ? Math.min(1, maxW / w) : 1);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const avail = el.clientWidth;
      setScale(Math.min(maxW ? maxW / w : 1, avail / w));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [w, maxW]);
  const shownH = cropH ? Math.min(h, cropH) : h;
  return (
    <div ref={ref} style={{ width: '100%', maxWidth: maxW || w, margin: align === 'center' ? '0 auto' : 0 }}>
      <div
        className={frame ? 'lp-shot-frame' : ''}
        style={{ position: 'relative', width: Math.round(w * scale), height: Math.round(shownH * scale), margin: align === 'center' ? '0 auto' : 0, overflow: 'hidden', borderRadius: frame ? 14 : 0 }}>
        <div style={{ width: w, height: h, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          {children}
        </div>
        {fade && (
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 72, background: `linear-gradient(transparent, ${SURAT.popupBg})`, pointerEvents: 'none' }} />
        )}
      </div>
    </div>
  );
}

// ─── Landing icons (1.6px stroke) ─────────────────────────────────────
const LIcon = {
  Puzzle: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M9 3a1.8 1.8 0 0 1 3.6 0c0 .5-.2 1 .2 1.4.3.3.8.3 1.2.3H17a1 1 0 0 1 1 1v3.1c0 .4 0 .9.3 1.2.4.4.9.2 1.4.2a1.8 1.8 0 0 1 0 3.6c-.5 0-1-.2-1.4.2-.3.3-.3.8-.3 1.2V19a1 1 0 0 1-1 1h-3.1c-.4 0-.9 0-1.2.3-.4.4-.2.9-.2 1.4a1.8 1.8 0 0 1-3.6 0c0-.5.2-1-.2-1.4-.3-.3-.8-.3-1.2-.3H5a1 1 0 0 1-1-1v-3.1c0-.4 0-.9-.3-1.2-.4-.4-.9-.2-1.4-.2a1.8 1.8 0 0 1 0-3.6c.5 0 1 .2 1.4-.2.3-.3.3-.8.3-1.2V6a1 1 0 0 1 1-1h3.1c.4 0 .9 0 1.2-.3.4-.4.2-.9.2-1.4z"/>
    </svg>
  ),
  Shield: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3l7 3v5c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6l7-3z"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  ),
  Eye: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Trash: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"/>
    </svg>
  ),
  Bolt: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z"/>
    </svg>
  ),
  Upload: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 16V4M12 4l-4 4M12 4l4 4"/>
      <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>
    </svg>
  ),
  Scan: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 7V5a1 1 0 0 1 1-1h2M17 4h2a1 1 0 0 1 1 1v2M20 17v2a1 1 0 0 1-1 1h-2M7 20H5a1 1 0 0 1-1-1v-2"/>
      <path d="M4 12h16"/>
    </svg>
  ),
  Wand: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 19l9-9M14 6l1.5-1.5M19 11l1.5-1.5M14.5 4.5L16 3M9 4l.6 1.8L11.4 6.4 9.6 7 9 8.8 8.4 7 6.6 6.4 8.4 5.8 9 4z"/>
    </svg>
  ),
  Plus: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 5v14M5 12h14"/>
    </svg>
  ),
  Globe: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9"/>
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/>
    </svg>
  ),
  Clock: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 7v5l3 2"/>
    </svg>
  ),
};

Object.assign(window, { ScaledShot, LIcon });
