// Surat popup screens: Login, Main (upload), Processing, Preview, Success

// ─── 1. LOGIN ─────────────────────────────────────────────────────────
function ScreenLogin({ onContinue }) {
  const [email, setEmail] = React.useState('');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '28px 24px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Wordmark size={20} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: -12 }}>
        <h1 className="sx-serif" style={{ fontSize: 30, lineHeight: 1.08, fontWeight: 500, margin: 0, color: SURAT.ink }}>
          Isi form,<br />
          <span style={{ fontStyle: 'italic', color: SURAT.accent }}>tanpa</span> ketik ulang.
        </h1>
        <p style={{ fontSize: 13.5, lineHeight: 1.5, color: SURAT.ink2, margin: '14px 0 0', maxWidth: 280 }}>
          Upload KTP, NPWP, atau dokumen lain — Surat baca, lalu isi form yang sedang Anda buka.
        </p>

        <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 10, justifyContent: "center", alignItems: "center" }}>
          <button className="sx-btn sx-btn-secondary" style={{ background: '#fff', height: "32px", width: "2px", textAlign: "center", flexDirection: "row", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" />
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.836.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" />
              <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" />
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" />
            </svg>
            <span>Lanjutkan dengan Google</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0' }}>
            <div style={{ flex: 1, height: 1, background: SURAT.border }} />
            <span style={{ fontSize: 11, color: SURAT.ink3, textTransform: 'uppercase', letterSpacing: '0.08em' }}>atau</span>
            <div style={{ flex: 1, height: 1, background: SURAT.border }} />
          </div>

          <input
            className="sx-input"
            placeholder="email@anda.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          
          <button className="sx-btn sx-btn-primary" onClick={onContinue}>
            <span style={{ height: "30px", padding: "1px" }}>Kirim tautan masuk</span>
            <Icon.ArrowRight width={14} height={14} />
          </button>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 8,
          padding: '10px 12px', borderRadius: 8,
          background: SURAT.cardAlt,
          fontSize: 11.5, lineHeight: 1.45, color: SURAT.ink2
        }}>
          <Icon.Lock width={13} height={13} style={{ marginTop: 2, color: SURAT.ink2, flexShrink: 0 }} />
          <span>Dokumen Anda tidak disimpan di server. Hanya diproses saat itu juga, lalu dihapus.</span>
        </div>
        <p style={{ fontSize: 11, color: SURAT.ink3, textAlign: 'center', margin: '12px 0 0', lineHeight: 1.5 }}>
          Dengan melanjutkan, Anda menyetujui <span className="sx-link">Ketentuan</span> &amp;{' '}
          <span className="sx-link">Kebijakan Privasi</span>.
        </p>
      </div>
    </div>);

}

// ─── 2. MAIN — Upload ─────────────────────────────────────────────────
function ScreenMain({ dragOver = false, onUpload }) {
  const [activeType, setActiveType] = React.useState(null);
  const types = [
  { id: 'ktp', label: 'KTP' },
  { id: 'npwp', label: 'NPWP' },
  { id: 'kk', label: 'KK' },
  { id: 'ijazah', label: 'Ijazah' },
  { id: 'invoice', label: 'Invoice' },
  { id: 'lain', label: 'Lain…' }];


  return (
    <>
      <TopBar scansLeft={8} scansTotal={10} />
      <div className="sx-scroll" style={{ flex: 1, padding: '16px 16px 0' }}>
        {/* Context strip — shows which form Surat will fill */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 11px',
          borderRadius: 8,
          background: SURAT.successSoft,
          marginBottom: 14,
          fontSize: 11.5,
          color: '#3d5a2e',
          lineHeight: 1.3
        }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: SURAT.success, flexShrink: 0 }} />
          <span style={{ flex: 1 }}>
            Siap mengisi <strong style={{ fontWeight: 600 }}>kredivo.com</strong> — terdeteksi 14 field.
          </span>
        </div>

        {/* Drop zone */}
        <div className={"sx-drop " + (dragOver ? 'over' : '')}
        style={{ padding: '28px 18px', textAlign: 'center' }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: dragOver ? SURAT.accent : SURAT.accentSoft,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: dragOver ? '#fff' : SURAT.accent,
            transition: 'all .15s'
          }}>
            <Icon.Upload width={20} height={20} />
          </div>
          <h2 className="sx-serif" style={{ fontSize: 18, fontWeight: 500, margin: '12px 0 4px', color: SURAT.ink }}>
            {dragOver ? 'Lepaskan untuk mengunggah' : 'Letakkan dokumen di sini'}
          </h2>
          <p style={{ fontSize: 12, color: SURAT.ink2, margin: 0, lineHeight: 1.4 }}>
            atau <span className="sx-link" onClick={onUpload}>pilih file</span> · JPG, PNG, PDF · maks 10 MB
          </p>

          <div style={{
            display: 'flex', justifyContent: 'center', gap: 14,
            marginTop: 14, paddingTop: 12,
            borderTop: `1px dashed ${SURAT.border}`,
            color: SURAT.ink3, fontSize: 11
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Icon.Camera width={12} height={12} /> Foto
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Icon.Pdf width={12} height={12} /> PDF
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Icon.Image width={12} height={12} /> Gambar
            </span>
          </div>
        </div>

        {/* Tipe dokumen */}
        <div style={{ marginTop: 18 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
            <div className="sx-label">Tipe dokumen</div>
            <span style={{ fontSize: 10.5, color: SURAT.ink3 }}>opsional — bantu akurasi</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {types.map((t) =>
            <button
              key={t.id}
              className={"sx-chip " + (activeType === t.id ? 'active' : '')}
              onClick={() => setActiveType(activeType === t.id ? null : t.id)}>
              {t.label}</button>
            )}
          </div>
        </div>

        {/* Recent — hint of state */}
        <div style={{ marginTop: 18, marginBottom: 12 }}>
          <div className="sx-label" style={{ marginBottom: 8 }}>Terakhir digunakan</div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 12px',
            borderRadius: 10,
            background: SURAT.card,
            border: `1px solid ${SURAT.border}`
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 6,
              background: 'repeating-linear-gradient(135deg, #f0e9d8 0 6px, #ece4cf 6px 12px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0
            }}>
              <Icon.File width={14} height={14} style={{ color: SURAT.ink2 }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, color: SURAT.ink, fontWeight: 500 }}>KTP — Budi Santoso</div>
              <div style={{ fontSize: 11, color: SURAT.ink3 }}>3 hari lalu · 12 field</div>
            </div>
            <button className="sx-btn-ghost" style={{ padding: '5px 8px', borderRadius: 6, fontSize: 11.5 }}>
              Pakai ulang
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        padding: '10px 16px 12px',
        borderTop: `1px solid ${SURAT.border}`,
        background: SURAT.popupBg,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 12
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: SURAT.ink2 }}>
            <span>8 dari 10 scan gratis tersisa</span>
          </div>
          <div style={{ height: 4, borderRadius: 4, background: SURAT.border, marginTop: 5, overflow: 'hidden' }}>
            <div style={{ width: '80%', height: '100%', background: SURAT.accent }} />
          </div>
        </div>
        <button className="sx-btn-ghost" style={{
          padding: '6px 11px', borderRadius: 8, fontSize: 12,
          background: SURAT.accentSoft, color: SURAT.accentInk, fontWeight: 500
        }}>
          Upgrade
        </button>
      </div>
    </>);

}

// ─── 3. PROCESSING ────────────────────────────────────────────────────
function ScreenProcessing({ stage = 1 }) {
  const stages = [
  { label: 'Membaca dokumen', desc: 'Mengekstrak teks dengan OCR' },
  { label: 'Mengenali field', desc: 'Memetakan ke form di halaman' },
  { label: 'Menyiapkan preview', desc: 'Memvalidasi confidence score' }];

  return (
    <>
      <TopBar scansLeft={8} scansTotal={10} />
      <div style={{ flex: 1, padding: '20px 20px 0', display: 'flex', flexDirection: 'column' }}>
        {/* Thumbnail of uploaded doc — KTP placeholder */}
        <div style={{
          position: 'relative',
          height: 138,
          borderRadius: 10,
          background: 'linear-gradient(135deg, #d8c8a3 0%, #c4b083 100%)',
          overflow: 'hidden',
          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.08)'
        }}>
          {/* KTP-like layout in placeholder colors */}
          <div style={{ position: 'absolute', top: 10, left: 12, right: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: SURAT.mono, fontSize: 9, color: 'rgba(0,0,0,0.5)' }}>
            <span>PROVINSI · KOTA</span>
            <span>KTP</span>
          </div>
          <div style={{ position: 'absolute', top: 28, left: 12, right: 70 }}>
            {[60, 90, 75, 85, 70, 80, 65].map((w, i) =>
            <div key={i} style={{ height: 6, width: `${w}%`, background: 'rgba(0,0,0,0.18)', borderRadius: 2, marginBottom: 4 }} />
            )}
          </div>
          <div style={{ position: 'absolute', top: 28, right: 12, width: 46, height: 60, background: 'rgba(0,0,0,0.2)', borderRadius: 3 }} />
          {/* Scan beam */}
          <div style={{
            position: 'absolute', left: 0, right: 0, top: 0,
            height: 3, background: 'linear-gradient(90deg, transparent, rgba(193,95,60,0.9), transparent)',
            animation: 'sx-scan 1.8s ease-in-out infinite',
            boxShadow: '0 0 12px rgba(193,95,60,0.7)'
          }} />
          <style>{`@keyframes sx-scan { 0% { top: 0 } 50% { top: 100% } 100% { top: 0 } }`}</style>
        </div>

        <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="sx-mono" style={{ fontSize: 11, color: SURAT.ink2 }}>ktp-budi.jpg · 1.2 MB</div>
          <button className="sx-btn-ghost" style={{ fontSize: 11, padding: '4px 8px', borderRadius: 6 }}>Batalkan</button>
        </div>

        <div style={{ marginTop: 24 }}>
          {stages.map((s, i) => {
            const done = i < stage;
            const active = i === stage;
            return (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0' }}>
                <div style={{
                  width: 22, height: 22, borderRadius: 999,
                  background: done ? SURAT.success : active ? SURAT.accent : SURAT.cardAlt,
                  color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: active ? '0 0 0 4px rgba(193,95,60,0.12)' : 'none',
                  transition: 'all .2s'
                }}>
                  {done ? <Icon.Check width={12} height={12} /> : active ?
                  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" className="sx-spin">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg> :

                  <div style={{ width: 5, height: 5, borderRadius: 999, background: SURAT.ink3 }} />
                  }
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: done || active ? SURAT.ink : SURAT.ink3 }}>
                    {s.label}
                    {active &&
                    <span style={{ marginLeft: 4, color: SURAT.ink2 }}>
                        <span className="sx-dot" style={{ animationDelay: '0s' }}>·</span>
                        <span className="sx-dot" style={{ animationDelay: '.2s' }}>·</span>
                        <span className="sx-dot" style={{ animationDelay: '.4s' }}>·</span>
                      </span>
                    }
                  </div>
                  <div style={{ fontSize: 11.5, color: SURAT.ink3, marginTop: 1 }}>{s.desc}</div>
                </div>
                {done && <span className="sx-mono" style={{ fontSize: 10.5, color: SURAT.ink3, alignSelf: 'center' }}>1.2s</span>}
              </div>);

          })}
        </div>
      </div>
      <div style={{
        padding: '10px 16px 12px',
        borderTop: `1px solid ${SURAT.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontSize: 11, color: SURAT.ink3
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon.Sparkle width={12} height={12} style={{ color: SURAT.accent }} />
          <span>Gemini 3.1 Flash-Lite</span>
        </div>
        <span className="sx-mono">~2.4s</span>
      </div>
    </>);

}

// ─── 4. PREVIEW (extracted fields) ────────────────────────────────────
function ScreenPreview({ onFill, onBack }) {
  const [fields, setFields] = React.useState([
  { key: 'nama', label: 'Nama lengkap', value: 'BUDI SANTOSO', conf: 0.98, on: true },
  { key: 'nik', label: 'NIK', value: '3271064305920003', conf: 0.96, on: true },
  { key: 'ttl', label: 'Tempat, tgl lahir', value: 'Bandung, 05-03-1992', conf: 0.94, on: true },
  { key: 'gender', label: 'Jenis kelamin', value: 'Laki-laki', conf: 0.99, on: true },
  { key: 'alamat', label: 'Alamat', value: 'Jl. Merdeka No. 42, RT 03/RW 05', conf: 0.88, on: true },
  { key: 'kel', label: 'Kelurahan', value: 'Cihapit', conf: 0.91, on: true },
  { key: 'agama', label: 'Agama', value: 'Islam', conf: 0.72, on: true },
  { key: 'pekerjaan', label: 'Pekerjaan', value: 'Karyawan Swasta', conf: 0.62, on: true }]
  );
  const [editing, setEditing] = React.useState(null);

  const enabled = fields.filter((f) => f.on).length;

  const toggle = (i) => setFields(fields.map((f, idx) => idx === i ? { ...f, on: !f.on } : f));

  return (
    <>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 14px',
        borderBottom: `1px solid ${SURAT.border}`
      }}>
        <button onClick={onBack} className="sx-btn-ghost" style={{
          width: 28, height: 28, borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Icon.ArrowLeft width={14} height={14} />
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: SURAT.ink, fontWeight: 500 }}>
            <span style={{
              width: 16, height: 16, borderRadius: 999,
              background: SURAT.success, color: '#fff',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
            }}><Icon.Check width={10} height={10} /></span>
            KTP terbaca
          </div>
          <div style={{ fontSize: 11, color: SURAT.ink3, marginTop: 1 }}>
            {enabled} field aktif · confidence rata-rata 0.88
          </div>
        </div>
        <button className="sx-btn-ghost" style={{ padding: '5px 8px', fontSize: 11, borderRadius: 6 }}>JSON</button>
      </div>

      <div className="sx-scroll" style={{ flex: 1, padding: '6px 8px' }}>
        {fields.map((f, i) => {
          const low = f.conf < 0.75;
          const med = f.conf < 0.9 && !low;
          return (
            <div key={f.key} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 10px',
              borderRadius: 8,
              opacity: f.on ? 1 : 0.45,
              background: editing === i ? SURAT.accentSoft : 'transparent',
              transition: 'background .12s'
            }}>
              {/* Toggle */}
              <button
                onClick={() => toggle(i)}
                style={{
                  width: 16, height: 16, borderRadius: 4,
                  background: f.on ? SURAT.accent : 'transparent',
                  border: f.on ? 'none' : `1.5px solid ${SURAT.borderStrong}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  color: '#fff'
                }}>
                {f.on && <Icon.Check width={10} height={10} />}
              </button>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10.5, color: SURAT.ink3, marginBottom: 1 }}>
                  <span>{f.label}</span>
                  {low &&
                  <span style={{
                    padding: '1px 5px', borderRadius: 3,
                    fontSize: 9, fontWeight: 600,
                    background: SURAT.warningSoft, color: SURAT.warning,
                    textTransform: 'uppercase', letterSpacing: '0.04em'
                  }}>perlu cek</span>
                  }
                  {med &&
                  <span className="sx-mono" style={{ fontSize: 9, color: SURAT.ink3 }}>
                      {f.conf.toFixed(2)}
                    </span>
                  }
                </div>
                <div style={{ fontSize: 12.5, color: SURAT.ink, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {f.value}
                </div>
              </div>
              <button
                onClick={() => setEditing(editing === i ? null : i)}
                className="sx-btn-ghost"
                style={{
                  width: 26, height: 26, borderRadius: 6,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: editing === i ? SURAT.accent : SURAT.ink3
                }}
                aria-label="Edit">
                <Icon.Pencil width={12} height={12} />
              </button>
            </div>);

        })}
      </div>

      <div style={{
        padding: '10px 14px 12px',
        borderTop: `1px solid ${SURAT.border}`,
        background: SURAT.popupBg,
        display: 'flex', flexDirection: 'column', gap: 6
      }}>
        <button className="sx-btn sx-btn-primary" onClick={onFill}>
          Isi {enabled} field di kredivo.com
          <Icon.ArrowRight width={14} height={14} />
        </button>
        <button className="sx-btn sx-btn-ghost" style={{ fontSize: 12, padding: '7px 12px' }}>
          Ubah dokumen
        </button>
      </div>
    </>);

}

// ─── 5. SUCCESS ───────────────────────────────────────────────────────
function ScreenSuccess({ onDone, secondsLeft = 8 }) {
  return (
    <>
      <TopBar scansLeft={7} scansTotal={10} />
      <div style={{ flex: 1, padding: '24px 20px 0', display: 'flex', flexDirection: 'column' }}>
        <div style={{
          width: 56, height: 56, borderRadius: 999,
          background: SURAT.successSoft, color: SURAT.success,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '4px 0 14px',
          boxShadow: '0 0 0 6px rgba(91,124,74,0.08)'
        }}>
          <Icon.Check width={24} height={24} strokeWidth={2.2} />
        </div>
        <h2 className="sx-serif" style={{ fontSize: 22, fontWeight: 500, margin: 0, color: SURAT.ink }}>
          11 field terisi.
        </h2>
        <p style={{ fontSize: 13, color: SURAT.ink2, margin: '6px 0 0', lineHeight: 1.5 }}>
          2 field di-skip karena confidence rendah — silakan periksa langsung di form.
        </p>

        <div style={{
          marginTop: 18,
          borderRadius: 10,
          background: SURAT.card,
          border: `1px solid ${SURAT.border}`,
          overflow: 'hidden'
        }}>
          {[
          { dot: SURAT.success, label: 'Terisi otomatis', n: 11 },
          { dot: SURAT.warning, label: 'Di-skip (perlu manual)', n: 2 },
          { dot: SURAT.ink3, label: 'Field tidak dikenali', n: 1 }].
          map((r, i, arr) =>
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '11px 14px',
            borderBottom: i < arr.length - 1 ? `1px solid ${SURAT.border}` : 'none'
          }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: r.dot }} />
              <span style={{ flex: 1, fontSize: 12.5, color: SURAT.ink }}>{r.label}</span>
              <span className="sx-mono" style={{ fontSize: 12, color: SURAT.ink2 }}>{r.n}</span>
            </div>
          )}
        </div>

        {/* Undo bar */}
        <div style={{
          marginTop: 16,
          padding: '10px 12px',
          borderRadius: 10,
          background: SURAT.ink,
          color: '#f5efe0',
          display: 'flex', alignItems: 'center', gap: 10
        }}>
          <Icon.Undo width={14} height={14} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 500 }}>Batalkan autofill?</div>
            <div style={{ fontSize: 10.5, opacity: 0.65 }}>{secondsLeft} detik tersisa</div>
          </div>
          <button style={{
            padding: '5px 10px', borderRadius: 6,
            background: 'rgba(255,255,255,0.1)',
            color: '#fff', fontSize: 11.5, fontWeight: 500
          }}>
            Undo
          </button>
        </div>
      </div>

      <div style={{
        padding: '10px 16px 12px',
        borderTop: `1px solid ${SURAT.border}`,
        display: 'flex', gap: 8
      }}>
        <button className="sx-btn sx-btn-secondary" style={{ flex: 1 }}>
          Scan lagi
        </button>
        <button className="sx-btn sx-btn-primary" style={{ flex: 1 }} onClick={onDone}>
          Selesai
        </button>
      </div>
    </>);

}

Object.assign(window, { ScreenLogin, ScreenMain, ScreenProcessing, ScreenPreview, ScreenSuccess });