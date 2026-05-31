// Shared shell + icons + tokens for the Surat extension popup
// Warm minimal aesthetic — cream surfaces, serif display, terracotta accent.

const SURAT = {
  // surfaces
  canvasBg: '#f0eee9',
  popupBg: '#faf9f5',
  card: '#ffffff',
  cardAlt: '#f5f2ea',
  // ink
  ink: '#2a251f',
  ink2: '#6b6358',
  ink3: '#9c9489',
  // accent (warm terracotta)
  accent: '#c15f3c',
  accentInk: '#7a3618',
  accentSoft: '#f4e6dd',
  // borders
  border: '#e8e2d6',
  borderStrong: '#d6cebd',
  // semantic
  success: '#5b7c4a',
  successSoft: '#e8efe1',
  warning: '#b8893d',
  warningSoft: '#f5ecd9',
  danger: '#a8463a',
  // type
  serif: '"Source Serif 4", "Source Serif Pro", Iowan, "Times New Roman", serif',
  sans: '"Söhne", "Inter", "Helvetica Neue", Helvetica, system-ui, sans-serif',
  mono: '"JetBrains Mono", "SF Mono", ui-monospace, Menlo, monospace',
};

// One-time global CSS for the popup styling
if (typeof document !== 'undefined' && !document.getElementById('surat-styles')) {
  const s = document.createElement('style');
  s.id = 'surat-styles';
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;1,8..60,400&display=swap');
    .sx, .sx * { box-sizing: border-box; }
    .sx {
      font-family: ${SURAT.sans};
      color: ${SURAT.ink};
      background: ${SURAT.popupBg};
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      letter-spacing: -0.005em;
      font-feature-settings: "ss01", "cv11";
    }
    .sx-serif { font-family: ${SURAT.serif}; letter-spacing: -0.015em; }
    .sx-mono { font-family: ${SURAT.mono}; }
    .sx button { font-family: inherit; cursor: pointer; border: none; background: transparent; color: inherit; padding: 0; }
    .sx input, .sx textarea { font-family: inherit; color: inherit; }
    .sx-divider { height: 1px; background: ${SURAT.border}; }
    .sx .sx-chip, .sx button.sx-chip {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 5px 10px; border-radius: 999px;
      background: ${SURAT.card}; border: 1px solid ${SURAT.border};
      font-size: 12px; color: ${SURAT.ink};
      transition: all .12s;
    }
    .sx .sx-chip:hover, .sx button.sx-chip:hover { border-color: ${SURAT.borderStrong}; background: ${SURAT.cardAlt}; }
    .sx .sx-chip.active, .sx button.sx-chip.active {
      background: ${SURAT.accent}; color: #fff; border-color: ${SURAT.accent};
    }
    .sx-btn {
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      padding: 11px 16px; border-radius: 10px;
      font-size: 13.5px; font-weight: 500; letter-spacing: -0.005em;
      transition: all .12s;
      width: 100%;
    }
    .sx-btn-primary {
      background: ${SURAT.accent}; color: #fff;
      box-shadow: 0 1px 0 rgba(0,0,0,.08), inset 0 1px 0 rgba(255,255,255,.15);
    }
    .sx-btn-primary:hover { background: #b3552f; }
    .sx-btn-secondary {
      background: ${SURAT.card}; color: ${SURAT.ink};
      box-shadow: inset 0 0 0 1px ${SURAT.border};
    }
    .sx-btn-secondary:hover { background: ${SURAT.cardAlt}; box-shadow: inset 0 0 0 1px ${SURAT.borderStrong}; }
    .sx-btn-ghost { color: ${SURAT.ink2}; }
    .sx-btn-ghost:hover { color: ${SURAT.ink}; background: ${SURAT.cardAlt}; }
    .sx-link { color: ${SURAT.accentInk}; text-decoration: underline; text-underline-offset: 2px; text-decoration-thickness: 1px; text-decoration-color: rgba(122,54,24,.35); cursor: pointer; }
    .sx-link:hover { text-decoration-color: ${SURAT.accentInk}; }
    .sx-input {
      width: 100%; padding: 11px 12px;
      border-radius: 9px; background: ${SURAT.card};
      box-shadow: inset 0 0 0 1px ${SURAT.border};
      font-size: 13.5px; color: ${SURAT.ink};
      transition: box-shadow .12s;
      outline: none;
    }
    .sx-input:focus { box-shadow: inset 0 0 0 1.5px ${SURAT.accent}; }
    .sx-input::placeholder { color: ${SURAT.ink3}; }
    .sx-label { font-size: 11.5px; color: ${SURAT.ink2}; font-weight: 500; letter-spacing: 0.01em; }
    .sx-scroll { overflow-y: auto; }
    .sx-scroll::-webkit-scrollbar { width: 0; }

    /* Pulse / shimmer */
    @keyframes sx-shimmer {
      0% { background-position: -120px 0; }
      100% { background-position: 120px 0; }
    }
    .sx-shimmer {
      background: linear-gradient(90deg, ${SURAT.cardAlt} 0%, #fff 50%, ${SURAT.cardAlt} 100%);
      background-size: 240px 100%;
      animation: sx-shimmer 1.4s linear infinite;
    }
    @keyframes sx-spin { to { transform: rotate(360deg); } }
    .sx-spin { animation: sx-spin 1s linear infinite; }
    @keyframes sx-dot { 0%, 60%, 100% { opacity: .2 } 30% { opacity: 1 } }
    .sx-dot { animation: sx-dot 1.4s infinite; }

    /* Drop zone */
    .sx-drop {
      border: 1.5px dashed ${SURAT.borderStrong};
      border-radius: 14px;
      background: ${SURAT.card};
      transition: all .15s;
      position: relative;
    }
    .sx-drop:hover { border-color: ${SURAT.accent}; background: #fffaf6; }
    .sx-drop.over {
      border-color: ${SURAT.accent};
      background: ${SURAT.accentSoft};
      box-shadow: 0 0 0 4px rgba(193, 95, 60, 0.08);
    }
  `;
  document.head.appendChild(s);
}

// ─── Icons (inline SVG, 1.5px stroke) ─────────────────────────────────
const Icon = {
  Upload: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 16V4M12 4l-4 4M12 4l4 4"/>
      <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>
    </svg>
  ),
  Camera: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 8a2 2 0 0 1 2-2h2l2-2h6l2 2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z"/>
      <circle cx="12" cy="13" r="3.5"/>
    </svg>
  ),
  File: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z"/>
      <path d="M14 3v5h5"/>
    </svg>
  ),
  Pdf: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z"/>
      <path d="M14 3v5h5"/>
      <text x="7" y="17" fontSize="5" fill="currentColor" stroke="none" fontFamily="ui-monospace, monospace" fontWeight="700">PDF</text>
    </svg>
  ),
  Image: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="4" width="18" height="16" rx="2"/>
      <circle cx="9" cy="10" r="1.5"/>
      <path d="M21 16l-4-4-8 8"/>
    </svg>
  ),
  Pencil: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 20h9"/>
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>
    </svg>
  ),
  Check: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  ),
  X: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
  ),
  ArrowRight: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14M13 6l6 6-6 6"/>
    </svg>
  ),
  ArrowLeft: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M19 12H5M11 6l-6 6 6 6"/>
    </svg>
  ),
  Sparkle: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>
    </svg>
  ),
  Lock: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="4" y="11" width="16" height="10" rx="2"/>
      <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
    </svg>
  ),
  User: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
    </svg>
  ),
  Settings: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9c.2.6.7 1 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>
    </svg>
  ),
  Info: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 16v-4M12 8h.01"/>
    </svg>
  ),
  Undo: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 7v6h6"/>
      <path d="M21 17a9 9 0 0 0-15-6.7L3 13"/>
    </svg>
  ),
  ChevronDown: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="m6 9 6 6 6-6"/>
    </svg>
  ),
};

// Surat wordmark — drawn small text in serif with subtle ligature dot
function Wordmark({ size = 22, color = SURAT.ink }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      {/* Geometric mark: stacked-sheet glyph */}
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="5" y="3" width="13" height="16" rx="2" stroke={SURAT.accent} strokeWidth="1.6"/>
        <rect x="7.5" y="5.5" width="13" height="16" rx="2" fill={SURAT.accent}/>
        <path d="M11 11.5h6M11 14.5h4" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
      <span className="sx-serif" style={{ fontSize: size * 0.95, fontWeight: 500, color, letterSpacing: '-0.025em', lineHeight: 1 }}>
        Surat
      </span>
    </div>
  );
}

// Sidebar frame — Chrome side-panel dimensions (docked, full browser height)
function PopupFrame({ children, width = 380, height = 720 }) {
  return (
    <div style={{
      width, height,
      background: SURAT.popupBg,
      overflow: 'hidden',
      position: 'relative',
      // Subtle left edge — as if docked to the side of the browser
      boxShadow: 'inset 1px 0 0 ' + SURAT.border + ', -1px 0 0 rgba(0,0,0,0.04)',
    }}>
      <div className="sx">{children}</div>
    </div>
  );
}

// Alias for clarity in new code
const SidebarFrame = PopupFrame;

// Top bar used in main-app states
function TopBar({ scansLeft = 8, scansTotal = 10, onAccount }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 16px 10px',
      borderBottom: `1px solid ${SURAT.border}`,
      background: SURAT.popupBg,
    }}>
      <Wordmark size={20} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '4px 8px 4px 10px',
          borderRadius: 999,
          background: SURAT.cardAlt,
          fontSize: 11.5, color: SURAT.ink2,
        }}>
          <span className="sx-mono" style={{ color: SURAT.ink, fontWeight: 500 }}>{scansLeft}</span>
          <span style={{ opacity: .6 }}>/ {scansTotal}</span>
        </div>
        <button
          onClick={onAccount}
          style={{
            width: 28, height: 28, borderRadius: 999,
            background: SURAT.cardAlt,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: SURAT.ink2,
          }}
          aria-label="Account"
        >
          <Icon.User width={14} height={14} />
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { SURAT, Icon, Wordmark, PopupFrame, SidebarFrame, TopBar });
