"use client";
import { useCallback, useEffect, useRef, useState } from "react";

/* ── Asset map ──────────────────────────────────────────────
   Signature ornaments imported from the Claude Design project:
     · pillars        left.webp / right.webp
     · corner florals bl.webp / br.webp
     · oval frame     frame-couple.webp
     · marble floor   bm-777bf91f.webp (via pilar.css)
   The design's bg.webp backdrop and 541887 couple photo exceeded the
   256 KiB import cap (truncated), so the project's existing wedding
   photo set stands in for the backgrounds and portraits. */
const P = (n: string) => `/uploads/pexels-marvin-malmis-ponce-${n}-scaled-1.webp`;
const IMG = {
  couple: P("13470063"),
  bg: "/uploads/pexels-marvin-malmis-ponce-13470072-scaled-1-1.webp",
  frame: "/uploads/frame-couple.webp",
  gallery: [P("13470063"), P("13470034"), P("13470037"), P("13470047"), P("13470064")],
};

const TARGET = new Date("2026-09-19T08:00:00+08:00").getTime();
const pad = (n: number) => (n < 10 ? "0" : "") + n;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

type Wish = { name: string; status: string; message: string };
const SEED_WISHES: Wish[] = [
  { name: "Andi Riza", status: "Hadir", message: "Barakallahu lakuma wa baraka ‘alaikuma. Semoga menjadi keluarga sakinah, mawaddah, wa rahmah." },
  { name: "Nurul & Keluarga", status: "Hadir", message: "Selamat menempuh hidup baru, sahabatku. Bahagia selalu untuk kalian berdua." },
  { name: "Muh. Fadel", status: "Masih Ragu", message: "Semoga lancar sampai hari H. Mohon maaf bila berhalangan hadir, doa terbaik selalu menyertai." },
];
const ATTEND_LABEL: Record<string, string> = { hadir: "Hadir", ragu: "Masih Ragu", absen: "Berhalangan" };

/* eslint-disable @next/next/no-img-element */
export function PilarInvitation() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pillarLRef = useRef<HTMLDivElement>(null);
  const pillarRRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [open, setOpen] = useState(false);
  const [guest, setGuest] = useState("Tamu Undangan");
  const [playing, setPlaying] = useState(false);
  const [cd, setCd] = useState({ d: "00", h: "00", m: "00", s: "00" });
  const [attend, setAttend] = useState("hadir");
  const [wishes, setWishes] = useState<Wish[]>(SEED_WISHES);
  const [sent, setSent] = useState(false);

  /* ── Guest name from query ── */
  useEffect(() => {
    try {
      const p = new URLSearchParams(location.search);
      const g = p.get("kpd") || p.get("kepada") || p.get("to");
      if (g) setGuest(decodeURIComponent(g.replace(/\+/g, " ")));
    } catch {}
  }, []);

  /* ── Lock scroll while gate is closed ── */
  useEffect(() => {
    document.body.style.overflow = open ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* ── Countdown ── */
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, TARGET - Date.now());
      setCd({
        d: pad(Math.floor(diff / 86400000)),
        h: pad(Math.floor((diff % 86400000) / 3600000)),
        m: pad(Math.floor((diff % 3600000) / 60000)),
        s: pad(Math.floor((diff % 60000) / 1000)),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* ── Pillar dolly + bg layer parallax + reveal ── */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pL = pillarLRef.current;
    const pR = pillarRRef.current;

    const updatePillars = () => {
      if (!pL || !pR) return;
      if (reduce) {
        pL.style.transform = pR.style.transform = "none";
        pL.style.opacity = pR.style.opacity = "1";
        pL.style.filter = pR.style.filter = "none";
        return;
      }
      const vh = window.innerHeight || 1;
      const vw = window.innerWidth || 1;
      const p = Math.min(Math.max(window.scrollY / (vh * 1.15), 0), 1);
      const e = easeOutCubic(p);
      const scale = 0.4 + e * 0.6; // jauh (kecil) -> dekat (penuh)
      const dx = (1 - e) * vw * 0.42; // jauh: merapat ke tengah -> dekat: ke tepi
      const op = String(0.45 + e * 0.55); // atmospheric perspective
      const blur = `blur(${(1 - e) * 2.4}px)`;
      pL.style.transform = `translateX(${dx}px) scale(${scale})`;
      pR.style.transform = `translateX(${-dx}px) scale(${scale})`;
      pL.style.opacity = pR.style.opacity = op;
      pL.style.filter = pR.style.filter = blur;
    };

    const layers = Array.prototype.slice.call(root.querySelectorAll<HTMLElement>(".layer[data-depth]"));
    const updateLayers = () => {
      if (reduce) return;
      const vh = window.innerHeight;
      layers.forEach((layer) => {
        const sec = layer.parentElement;
        if (!sec) return;
        const r = sec.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const depth = parseFloat(layer.dataset.depth || "0.2") || 0.2;
        const prog = (r.top + r.height / 2 - vh / 2) / vh;
        layer.style.transform = `translateY(${prog * depth * 100}px)`;
      });
    };

    const reveals = Array.prototype.slice.call(root.querySelectorAll<HTMLElement>(".reveal"));
    const checkReveals = () => {
      const vh = window.innerHeight;
      for (let i = reveals.length - 1; i >= 0; i--) {
        const r = reveals[i].getBoundingClientRect();
        if (r.top < vh * 0.86 && r.bottom > 0) {
          reveals[i].classList.add("in");
          reveals.splice(i, 1);
        }
      }
    };

    let ticking = false;
    const onScroll = () => {
      checkReveals();
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          updatePillars();
          updateLayers();
          ticking = false;
        });
      }
    };

    updatePillars();
    updateLayers();
    checkReveals();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const t = setTimeout(checkReveals, 250);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(t);
    };
  }, []);

  /* ── Audio ── */
  const tryPlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audio.src) { setPlaying(true); return; }
    audio.play().then(() => setPlaying(true)).catch(() => {});
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    const next = !playing;
    setPlaying(next);
    if (!audio || !audio.src) return;
    if (next) audio.play().catch(() => {});
    else audio.pause();
  };

  const openGate = () => {
    setOpen(true);
    window.scrollTo({ top: 0 });
    tryPlay();
  };

  const saveCalendar = (e: React.MouseEvent) => {
    e.preventDefault();
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT",
      "SUMMARY:Pernikahan Ratna & Ikhsan",
      "DTSTART:20260919T000000Z", "DTEND:20260919T060000Z",
      "LOCATION:Celebes Convention Centre, Makassar", "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");
    const a = document.createElement("a");
    a.href = "data:text/calendar;charset=utf-8," + encodeURIComponent(ics);
    a.download = "undangan-ratna-ikhsan.ics";
    a.click();
  };

  const submitRsvp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("nama") as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("pesan") as HTMLTextAreaElement).value.trim();
    if (name && message) {
      setWishes((prev) => [{ name, status: ATTEND_LABEL[attend] || "Hadir", message }, ...prev]);
    }
    setSent(true);
  };

  return (
    <div className="pilar" ref={rootRef}>
      {/* ===================== PILAR FRAME (fixed) ===================== */}
      <div className="pillar left" ref={pillarLRef}><img src="/uploads/left.webp" alt="" /></div>
      <div className="pillar right" ref={pillarRRef}><img src="/uploads/right.webp" alt="" /></div>
      <div className="floor"><div className="img" /></div>

      {/* ===================== GERBANG ===================== */}
      <div className={`opening${open ? " is-open" : ""}`} style={open ? { display: "none" } : undefined} aria-hidden={open}>
        <div className="op-wreath">
          <div className="photo" data-label="Foto berdua"><img src={IMG.couple} alt="" /></div>
          <img src={IMG.frame} alt="" />
        </div>
        <div className="op-eyebrow">The Wedding Of</div>
        <div className="op-names">Ratna<span className="amp">&amp;</span>Ikhsan</div>
        <div className="divider"><span className="ln" /><span className="dot fill" /><span className="ln r" /></div>
        <div className="op-to">
          <span className="label">Kepada Yth. Bapak / Ibu / Saudara/i</span>
          <span className="guest">{guest}</span>
        </div>
        <button className="btn openBtn" onClick={openGate}>Buka Undangan</button>
      </div>

      {/* ===================== HERO ===================== */}
      <section className="hero stage">
        <div className="layer bg" data-depth="0.28"><img src={IMG.bg} alt="" /></div>
        <div className="hero-scrim" />
        <div className="hero-inner reveal">
          <div className="hero-bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
          <div className="hero-eyebrow">The Wedding Of</div>
          <div className="hero-portrait"><div className="photo"><img src={IMG.couple} alt="Ratna & Ikhsan" /></div></div>
          <h1 className="hero-names">Ratna<span className="amp">and</span>Ikhsan</h1>
          <div className="divider" style={{ marginBottom: "1rem" }}><span className="ln" /><span className="dot fill" /><span className="ln r" /></div>
          <div className="hero-date">Sabtu, <b>19 September 2026</b> · Makassar</div>
        </div>
        <div className="scroll-cue"><span>Geser</span><div className="scroll-line" /></div>
      </section>

      {/* ===================== AYAT ===================== */}
      <section className="doa pad">
        <div className="wrap reveal">
          <div className="eyebrow">Firman Allah SWT</div>
          <p className="ayat">وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً</p>
          <p className="terjemah">&ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram, dan dijadikan-Nya di antaramu rasa kasih dan sayang.&rdquo;</p>
          <div className="ref">Q.S. Ar-Rūm : 21</div>
        </div>
      </section>

      {/* ===================== PORTRAIT (wreath) ===================== */}
      <section className="portrait pad">
        <img className="corner bl" src="/uploads/bl.webp" alt="" />
        <img className="corner br" src="/uploads/br.webp" alt="" />
        <div className="wrap reveal">
          <div className="wreath-wrap">
            <div className="photo" data-label="Foto pre-wedding"><img src={IMG.couple} alt="" /></div>
            <img src={IMG.frame} alt="" />
          </div>
          <p className="lead">Dengan memohon rahmat dan ridha Allah Subhanahu wa Ta‘ala, kami bermaksud menyelenggarakan pernikahan putra-putri kami.</p>
        </div>
      </section>

      {/* ===================== MEMPELAI ===================== */}
      <section className="mempelai pad">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Bismillāhirraḥmānirraḥīm</span>
            <h2>Mempelai</h2>
          </div>
          <div className="couple">
            <div className="person reveal">
              <div className="role">Mempelai Wanita</div>
              <h3>Andi Ratna Sari</h3>
              <div className="bin">binti H. Andi Mappanyukki</div>
              <p className="parents">Putri kedua dari pasangan<br />H. Andi Mappanyukki, S.E. &amp; Hj. Andi Besse Kuneng</p>
            </div>
            <div className="couple-amp reveal">&amp;</div>
            <div className="person reveal">
              <div className="role">Mempelai Pria</div>
              <h3>Muh. Ikhsan</h3>
              <div className="bin">bin H. Abdul Rahman</div>
              <p className="parents">Putra pertama dari pasangan<br />H. Abdul Rahman &amp; Hj. Sitti Maryam</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SAVE THE DATE ===================== */}
      <section className="savedate pad stage">
        <div className="layer bg" data-depth="0.22"><img src={IMG.bg} alt="" /></div>
        <div className="veil" />
        <div className="wrap reveal">
          <div className="eyebrow" style={{ marginBottom: "1rem" }}>Save the Date</div>
          <h2>Menuju Hari Bahagia</h2>
          <div className="big-date">19 · 09 · 2026</div>
          <div className="place">Sabtu · Celebes Convention Centre, Makassar</div>
          <div className="countdown">
            <div className="cd-unit"><div className="cd-num">{cd.d}</div><div className="cd-label">Hari</div></div>
            <div className="cd-unit"><div className="cd-num">{cd.h}</div><div className="cd-label">Jam</div></div>
            <div className="cd-unit"><div className="cd-num">{cd.m}</div><div className="cd-label">Menit</div></div>
            <div className="cd-unit"><div className="cd-num">{cd.s}</div><div className="cd-label">Detik</div></div>
          </div>
          <a className="btn btn--ghost cal-btn" href="#" onClick={saveCalendar}>Simpan ke Kalender</a>
        </div>
      </section>

      {/* ===================== ACARA ===================== */}
      <section className="acara pad">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Waktu &amp; Tempat</span>
            <h2>Rangkaian Acara</h2>
            <p className="sub">Merupakan suatu kehormatan apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.</p>
          </div>
          <div className="events reveal">
            <div className="event">
              <div className="kicker">Akad Nikah</div>
              <h3>Ijab &amp; Qabul</h3>
              <div className="when">Sabtu, 19 September 2026</div>
              <p className="detail"><b>08.00 – 10.00 WITA</b><br />Masjid Raya Makassar<br />Jl. Masjid Raya No. 57, Makassar</p>
            </div>
            <div className="v-divider" />
            <div className="event">
              <div className="kicker">Resepsi · Mappabotting</div>
              <h3>Walîmatul ‘Urs</h3>
              <div className="when">Sabtu, 19 September 2026</div>
              <p className="detail"><b>11.00 – 14.00 WITA</b><br />Celebes Convention Centre<br />Jl. Metro Tanjung Bunga, Makassar</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== GALERI ===================== */}
      <section className="galeri pad">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Galeri</span>
            <h2>Sekeping Kisah</h2>
            <p className="sub">Beberapa momen kebersamaan dalam perjalanan menuju hari yang dinanti.</p>
          </div>
          <div className="gal-grid reveal">
            <div className="photo g1"><img src={IMG.gallery[0]} alt="" /></div>
            <div className="photo g2"><img src={IMG.gallery[1]} alt="" /></div>
            <div className="photo g3"><img src={IMG.gallery[2]} alt="" /></div>
            <div className="photo g4"><img src={IMG.gallery[3]} alt="" /></div>
            <div className="photo g5"><img src={IMG.gallery[4]} alt="" /></div>
          </div>
        </div>
      </section>

      {/* ===================== LOKASI ===================== */}
      <section className="lokasi pad">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Lokasi Acara</span>
            <h2>Petunjuk Arah</h2>
          </div>
          <div className="map-card reveal">
            <div className="mapbg" />
            <div className="pin">
              <div className="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg></div>
              <div className="nm">Celebes Convention Centre</div>
              <div className="ad">Jl. Metro Tanjung Bunga, Makassar</div>
            </div>
          </div>
          <div className="actions">
            <a className="btn" href="https://maps.google.com/?q=Celebes+Convention+Centre+Makassar" target="_blank" rel="noopener noreferrer">Buka Google Maps</a>
          </div>
        </div>
      </section>

      {/* ===================== RSVP ===================== */}
      <section className="rsvp pad stage">
        <div className="layer bg" data-depth="0.22"><img src={IMG.bg} alt="" /></div>
        <div className="veil" />
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Konfirmasi Kehadiran</span>
            <h2>RSVP</h2>
            <p className="sub">Mohon konfirmasi kehadiran Bapak/Ibu/Saudara/i sebelum 5 September 2026.</p>
          </div>
          {!sent && (
            <form className="form reveal" onSubmit={submitRsvp}>
              <div className="field"><label>Nama Lengkap</label><input type="text" name="nama" placeholder="Nama Anda" required /></div>
              <div className="field">
                <label>Konfirmasi Kehadiran</label>
                <div className="attend">
                  {(["hadir", "ragu", "absen"] as const).map((v) => (
                    <button key={v} type="button" className={attend === v ? "sel" : ""} onClick={() => setAttend(v)}>
                      {v === "hadir" ? "Hadir" : v === "ragu" ? "Masih Ragu" : "Berhalangan"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="field"><label>Ucapan &amp; Doa</label><textarea name="pesan" placeholder="Tuliskan ucapan dan doa restu Anda…" /></div>
              <button className="btn" type="submit">Kirim Konfirmasi</button>
            </form>
          )}
          {sent && (
            <div className="rsvp-thanks in">
              <div className="sc">Terima kasih</div>
              <p>Doa &amp; kehadiran Anda sangat berarti bagi kami.</p>
            </div>
          )}
        </div>
      </section>

      {/* ===================== UCAPAN ===================== */}
      <section className="wishes pad">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Doa &amp; Ucapan</span>
            <h2>Dari Sahabat</h2>
          </div>
          <div className="wish-list">
            {wishes.map((w, i) => (
              <div className="wish reveal in" key={`${w.name}-${i}`}>
                <div className="w-name">{w.name} <span>{w.status}</span></div>
                <div className="w-msg">{w.message}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PENUTUP ===================== */}
      <section className="penutup pad stage">
        <div className="layer bg" data-depth="0.25"><img src={IMG.bg} alt="" /></div>
        <div className="scrim" />
        <div className="wrap reveal">
          <p className="salam">وَالسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ</p>
          <p className="msg">Atas kehadiran dan doa restu Bapak/Ibu/Saudara/i, kami sekeluarga mengucapkan terima kasih yang sebesar-besarnya. Semoga Allah SWT membalas kebaikan Anda.</p>
          <div className="divider" style={{ margin: "2.2rem 0 0" }}><span className="ln" /><span className="dot fill" /><span className="ln r" /></div>
          <div className="names">Ratna <span className="amp">&amp;</span> Ikhsan</div>
          <div className="fam">Kel. Bapak H. Andi Mappanyukki &amp; Kel. Bapak H. Abdul Rahman</div>
          <div className="credit">Dibuat dengan <b>Surat</b> · Undangan Digital</div>
        </div>
      </section>

      {/* ===================== AUDIO ===================== */}
      <button className={`musicBtn${open ? " show" : ""}${playing ? " playing" : ""}`} aria-label="Putar musik" onClick={toggleMusic}>
        <div className="bars"><i /><i /><i /><i /></div>
      </button>
      {/* Ganti src dengan lagu pilihan. Dibiarkan kosong pada template. */}
      <audio ref={audioRef} loop preload="none" />
    </div>
  );
}
