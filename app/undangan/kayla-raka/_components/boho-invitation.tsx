"use client";
import { useCallback, useEffect, useRef, useState } from "react";

/* ── Asset map ──────────────────────────────────────────────
   Authentic assets imported from the Claude Design project:
     · corner florals  PC-AKR / PC-AKN / PC-BKR / PC-BKN
     · groom portrait  1679297306foto_pria.jpeg
   The couple's other demo photos exceeded the import size cap, so the
   project's existing wedding photo set stands in for them. */
const P = (n: string) => `/uploads/pexels-marvin-malmis-ponce-${n}-scaled-1.webp`;
const IMG = {
  couple: P("13470063"),
  bride: P("13470037"),
  groom: "/uploads/1679297306foto_pria.jpeg",
  gate: [P("13470064"), P("13470065"), "/uploads/pexels-marvin-malmis-ponce-13470072-scaled-1-1.webp"],
  hero: [P("13470059"), P("13470034"), P("13470047")],
  ayat: P("13470037"),
  mempelai: P("13470065"),
  date: [P("13470064"), P("13470063"), P("13470059")],
  acara: P("13470034"),
  galeriBg: "/uploads/pexels-marvin-malmis-ponce-13470072-scaled-1-1.webp",
  rsvpBg: P("13470065"),
  penutup: [P("13470034"), P("13470047"), "/uploads/1679297306foto_pria.jpeg"],
};

const CORNERS = [
  { cls: "tl", src: "/uploads/PC-AKR.webp" },
  { cls: "tr", src: "/uploads/PC-AKN.webp" },
  { cls: "bl", src: "/uploads/PC-BKR.webp" },
  { cls: "br", src: "/uploads/PC-BKN.webp" },
];

const TARGET = new Date("2026-11-14T10:00:00+07:00").getTime();
const pad = (n: number) => (n < 10 ? "0" : "") + n;

function Sprig({ className = "ornament", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} aria-hidden="true">
      <use href="#bk-sprig" />
    </svg>
  );
}

/* eslint-disable @next/next/no-img-element */
function Corners({ topOnly = false }: { topOnly?: boolean }) {
  const cells = topOnly ? CORNERS.filter((c) => c.cls === "tl" || c.cls === "tr") : CORNERS;
  return (
    <div className={`corners${topOnly ? " top-only" : ""}`}>
      {cells.map((c) => (
        <img key={c.cls} className={`c ${c.cls}`} src={c.src} alt="" />
      ))}
    </div>
  );
}

type Wish = { name: string; status: string; message: string };
const SEED_WISHES: Wish[] = [
  { name: "Sahabat Kayla", status: "Hadir", message: "Barakallahu lakuma. Semoga menjadi keluarga sakinah, mawaddah, wa rahmah." },
  { name: "Keluarga Besar", status: "Hadir", message: "Selamat menempuh hidup baru. Bahagia selalu untuk kalian berdua." },
];
const ATTEND_LABEL: Record<string, string> = { hadir: "Hadir", ragu: "Masih Ragu", absen: "Berhalangan" };

export function BohoInvitation() {
  const rootRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [open, setOpen] = useState(false);
  const [guest, setGuest] = useState("Bapak / Ibu / Saudara/i");
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

  /* ── Reveal on scroll + active nav state + subtle parallax ── */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ups = Array.prototype.slice.call(root.querySelectorAll<HTMLElement>(".up"));
    const revealInView = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      for (let i = ups.length - 1; i >= 0; i--) {
        if (ups[i].getBoundingClientRect().top < vh * 0.9) {
          ups[i].classList.add("in");
          ups.splice(i, 1);
        }
      }
    };

    const navSecs = Array.prototype.slice.call(root.querySelectorAll<HTMLElement>("[data-nav]"));
    const navBtns = Array.prototype.slice.call(root.querySelectorAll<HTMLButtonElement>("#nav [data-go]"));
    const syncNav = () => {
      const y = window.scrollY + window.innerHeight * 0.4;
      let cur = navSecs[0];
      navSecs.forEach((s) => { if (s.offsetTop <= y) cur = s; });
      navBtns.forEach((b) => b.classList.toggle("active", !!cur && b.dataset.go === cur.id));
    };

    const bgs = Array.prototype.slice
      .call(root.querySelectorAll<HTMLElement>(".screen .bg"))
      .map((el: HTMLElement) => ({ el, host: el.closest(".screen") as HTMLElement }));
    const parallax = () => {
      if (reduce) return;
      const vh = window.innerHeight;
      bgs.forEach((p) => {
        const r = p.host.getBoundingClientRect();
        if (r.bottom < -vh * 0.4 || r.top > vh * 1.4) return;
        const c = r.top + r.height / 2 - vh / 2;
        p.el.style.transform = `translate3d(0,${(-c * 0.07).toFixed(1)}px,0)`;
      });
    };

    let tick = false;
    const onScroll = () => {
      revealInView();
      syncNav();
      if (!tick) {
        requestAnimationFrame(() => { parallax(); tick = false; });
        tick = true;
      }
    };

    revealInView();
    syncNav();
    parallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const t = setTimeout(revealInView, 250);
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

  const goTo = (id: string) => {
    const el = rootRef.current?.querySelector<HTMLElement>(`#${id}`);
    if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
  };

  const saveCalendar = () => {
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT", "SUMMARY:Pernikahan Kayla & Raka",
      "DTSTART:20261114T030000Z", "DTEND:20261114T080000Z", "LOCATION:Pendopo Kayangan, Yogyakarta",
      "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");
    const a = document.createElement("a");
    a.href = "data:text/calendar;charset=utf-8," + encodeURIComponent(ics);
    a.download = "undangan-kayla-raka.ics";
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
    <div className="boho" ref={rootRef}>
      {/* shared sprig ornament */}
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
        <symbol id="bk-sprig" viewBox="0 0 220 28">
          <g stroke="currentColor" strokeWidth="1.1" fill="none" strokeLinecap="round">
            <path d="M8 14 H94" /><path d="M212 14 H126" />
            <path d="M94 14 q9 -10 22 -10" /><path d="M94 14 q9 10 22 10" />
            <path d="M126 14 q-9 -10 -22 -10" /><path d="M126 14 q-9 10 -22 10" />
            <path d="M70 14 q5 -7 14 -7" /><path d="M150 14 q-5 -7 -14 -7" />
          </g>
          <g fill="currentColor">
            <rect x="105.5" y="9.5" width="9" height="9" transform="rotate(45 110 14)" />
            <circle cx="10" cy="14" r="1.7" /><circle cx="210" cy="14" r="1.7" />
          </g>
        </symbol>
      </svg>

      {/* ===================== GERBANG ===================== */}
      <div id="gate" className={open ? "is-open" : ""} style={open ? { display: "none" } : undefined} aria-hidden={open}>
        <div className="bg bg--gate slide">
          {IMG.gate.map((src) => <img key={src} src={src} alt="" />)}
        </div>
        <div className="gate-corners">
          {CORNERS.map((c) => <img key={c.cls} className={`c ${c.cls}`} src={c.src} alt="" />)}
        </div>
        <div className="gate-inner">
          <div className="gate-eyebrow">We Invite You To</div>
          <div className="gate-names script">Kayla &amp; Raka</div>
          <Sprig className="ornament sage" style={{ width: 160, margin: "0.4rem auto 1.4rem" }} />
          <p className="gate-sub">Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami.</p>
          <div className="gate-to">
            <span className="lbl">Kepada Yth.</span>
            <span className="guest">{guest}</span>
          </div>
          <button className="btn" id="openBtn" onClick={openGate}>Buka Undangan</button>
        </div>
      </div>

      {/* ===================== HERO / QUOTE ===================== */}
      <section className="screen hero" id="home" data-nav>
        <Corners />
        <div className="bg slide">
          {IMG.hero.map((src) => <img key={src} src={src} alt="" />)}
        </div>
        <div className="inner">
          <div className="bismillah up">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
          <div className="eyebrow up d1">The Wedding Of</div>
          <h1 className="names script up d1">Kayla &amp; Raka</h1>
          <Sprig className="ornament up d2" style={{ marginTop: "0.6rem" }} />
          <div className="hero-photo up d2"><div className="hp-in"><img src={IMG.couple} alt="Kayla & Raka" /></div></div>
          <p className="quote up d2">&ldquo;Kepercayaan membuat semua hal menjadi mungkin, dan cinta membuat semua hal menjadi mudah.&rdquo;</p>
        </div>
        <div className="scroll-cue"><span>Geser</span><div className="scroll-line" /></div>
      </section>

      {/* ===================== AYAT ===================== */}
      <section className="screen ayat tint">
        <Corners />
        <div className="bg"><img src={IMG.ayat} alt="" /></div>
        <div className="inner">
          <p className="salam up">Assalamu&lsquo;alaikum Warahmatullahi Wabarakatuh</p>
          <p className="arab up d1">وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً</p>
          <p className="terjemah up d2">&ldquo;Di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu merasa tenteram, dan Dia menjadikan di antaramu rasa kasih dan sayang.&rdquo;</p>
          <div className="ref up d2">Q.S. Ar-Rūm : 21</div>
        </div>
      </section>

      {/* ===================== MEMPELAI ===================== */}
      <section className="screen couple" id="couple" data-nav>
        <Corners />
        <div className="bg"><img src={IMG.mempelai} alt="" /></div>
        <div className="inner">
          <div className="eyebrow up">Bismillahirrahmanirrahim</div>
          <h2 className="up d1">Mempelai</h2>
          <p className="intro up d1">Dengan memohon rahmat dan ridha Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami.</p>

          <div className="person up d1">
            <div className="ph"><div className="photo"><img src={IMG.bride} alt="Mempelai Wanita" style={{ objectPosition: "58% 22%" }} /></div></div>
            <div className="role">Mempelai Wanita</div>
            <div className="nm">Kayla Andini</div>
            <p className="par">Putri kedua dari pasangan<br />Bapak Hendra Wijaya &amp; Ibu Sri Wahyuni</p>
          </div>

          <div className="couple-amp up d1">&amp;</div>

          <div className="person up d1">
            <div className="ph"><div className="photo"><img src={IMG.groom} alt="Mempelai Pria" style={{ objectPosition: "33% 28%" }} /></div></div>
            <div className="role">Mempelai Pria</div>
            <div className="nm">Raka Pratama</div>
            <p className="par">Putra pertama dari pasangan<br />Bapak Agus Santoso &amp; Ibu Dewi Lestari</p>
          </div>
        </div>
      </section>

      {/* ===================== SAVE THE DATE ===================== */}
      <section className="screen date tint" id="date" data-nav>
        <Corners />
        <div className="bg slide">
          {IMG.date.map((src) => <img key={src} src={src} alt="" />)}
        </div>
        <div className="inner">
          <div className="eyebrow up">Save The Date</div>
          <h2 className="up d1">Menuju Hari Bahagia</h2>
          <Sprig className="ornament sage up d1" style={{ margin: "1.2rem auto" }} />
          <div className="big up d1">Sabtu, 14 November 2026</div>
          <div className="time up d1">Pukul 10.00 WIB — selesai</div>
          <div className="place up d1">Pendopo Kayangan, Yogyakarta</div>
          <div className="countdown up d2">
            <div className="cd-unit"><div className="cd-num">{cd.d}</div><div className="cd-label">Hari</div></div>
            <div className="cd-unit"><div className="cd-num">{cd.h}</div><div className="cd-label">Jam</div></div>
            <div className="cd-unit"><div className="cd-num">{cd.m}</div><div className="cd-label">Menit</div></div>
            <div className="cd-unit"><div className="cd-num">{cd.s}</div><div className="cd-label">Detik</div></div>
          </div>
          <div className="btns up d2">
            <button type="button" className="btn btn--ghost" onClick={saveCalendar}>Simpan ke Kalender</button>
          </div>
        </div>
      </section>

      {/* ===================== ACARA ===================== */}
      <section className="screen acara">
        <Corners topOnly />
        <div className="bg"><img src={IMG.acara} alt="" /></div>
        <div className="inner">
          <div className="eyebrow up">Waktu &amp; Tempat</div>
          <h2 className="up d1">Rangkaian Acara</h2>
          <div className="ev-cards">
            <div className="ev up d1">
              <div className="kicker">Akad Nikah</div>
              <h3>Ijab &amp; Qabul</h3>
              <p className="meta"><b>Sabtu, 14 November 2026</b><br />Pukul 10.00 – 11.00 WIB<br />Pendopo Kayangan, Yogyakarta</p>
            </div>
            <div className="ev up d2">
              <div className="kicker">Resepsi</div>
              <h3>Walîmatul &lsquo;Urs</h3>
              <p className="meta"><b>Sabtu, 14 November 2026</b><br />Pukul 12.00 – 15.00 WIB<br />Pendopo Kayangan, Yogyakarta</p>
            </div>
          </div>
          <a className="btn btn--terra map-btn up d2" href="https://maps.google.com/?q=Yogyakarta" target="_blank" rel="noopener noreferrer">Buka Google Maps</a>
        </div>
      </section>

      {/* ===================== GALERI ===================== */}
      <section className="screen galeri tint" id="gallery" data-nav>
        <Corners topOnly />
        <div className="bg bg--soft"><img src={IMG.galeriBg} alt="" /></div>
        <div className="inner">
          <div className="eyebrow up">Galeri</div>
          <h2 className="up d1">Sekeping Kisah</h2>
          <div className="gal-grid up d1">
            <div className="photo wide"><img src={IMG.date[1]} alt="" /></div>
            <div className="photo"><img src={IMG.ayat} alt="" /></div>
            <div className="photo"><img src={IMG.mempelai} alt="" /></div>
            <div className="photo"><img src={IMG.acara} alt="" /></div>
            <div className="photo"><img src={IMG.groom} alt="" style={{ objectPosition: "33% 28%" }} /></div>
            <div className="photo wide"><img src={IMG.couple} alt="" style={{ objectPosition: "60% 32%" }} /></div>
          </div>
        </div>
      </section>

      {/* ===================== RSVP ===================== */}
      <section className="screen rsvp" id="rsvp" data-nav>
        <Corners />
        <div className="bg bg--soft"><img src={IMG.rsvpBg} alt="" /></div>
        <div className="inner">
          <div className="eyebrow up">Konfirmasi Kehadiran</div>
          <h2 className="up d1">Kehadiran</h2>
          <p className="sub up d1">Mohon konfirmasi kehadiran Anda untuk membantu kami mempersiapkan acara.</p>
          {!sent && (
            <form className="form up d1" onSubmit={submitRsvp}>
              <div className="field"><label>Nama</label><input type="text" name="nama" placeholder="Nama Anda" required /></div>
              <div className="field">
                <label>Konfirmasi</label>
                <div className="attend">
                  {(["hadir", "ragu", "absen"] as const).map((v) => (
                    <button key={v} type="button" className={attend === v ? "sel" : ""} onClick={() => setAttend(v)}>
                      {v === "hadir" ? "Hadir" : v === "ragu" ? "Masih Ragu" : "Berhalangan"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="field"><label>Jumlah yang Hadir</label>
                <select name="jumlah" defaultValue="1 Orang">
                  <option>1 Orang</option><option>2 Orang</option><option>3 Orang</option><option>4 Orang</option><option>5 Orang</option>
                </select>
              </div>
              <div className="field"><label>Ucapan &amp; Doa</label><textarea name="pesan" placeholder="Tuliskan ucapan dan doa restu Anda…" /></div>
              <button className="btn" type="submit">Kirim Konfirmasi</button>
            </form>
          )}
          {sent && (
            <div className="rsvp-thanks in">
              <div className="script">Terima Kasih</div>
              <p>Doa &amp; kehadiran Anda sangat berarti bagi kami.</p>
            </div>
          )}
          <div className="wish-list">
            {wishes.map((w, i) => (
              <div className="wish" key={`${w.name}-${i}`}>
                <div className="wn">{w.name} <span>{w.status}</span></div>
                <div className="wm">{w.message}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PENUTUP ===================== */}
      <section className="screen penutup tint">
        <Corners />
        <div className="bg slide">
          {IMG.penutup.map((src) => <img key={src} src={src} alt="" />)}
        </div>
        <div className="inner">
          <Sprig className="ornament up" style={{ marginBottom: "1.6rem" }} />
          <p className="msg up d1">Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas kehadiran dan doa restunya, kami mengucapkan terima kasih.</p>
          <p className="salam up d1" style={{ marginTop: "1.4rem" }}>Wassalamu&lsquo;alaikum Warahmatullahi Wabarakatuh</p>
          <div className="names script up d2">Kayla &amp; Raka</div>
          <div className="fam up d2">Kel. Bapak Hendra Wijaya &amp; Kel. Bapak Agus Santoso</div>
          <div className="credit up d2">Dibuat dengan <b>Surat</b> · Undangan Digital</div>
        </div>
      </section>

      {/* ===================== BOTTOM NAV ===================== */}
      <nav id="nav" className={open ? "show" : ""}>
        <button data-go="home" title="Sampul" className="active" onClick={() => goTo("home")}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /></svg>
        </button>
        <button data-go="couple" title="Mempelai" onClick={() => goTo("couple")}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="9" r="3" /><circle cx="16" cy="9" r="3" /><path d="M3 20c0-2.8 2.2-5 5-5M16 15c2.8 0 5 2.2 5 5" /></svg>
        </button>
        <button data-go="date" title="Tanggal" onClick={() => goTo("date")}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /></svg>
        </button>
        <button data-go="gallery" title="Galeri" onClick={() => goTo("gallery")}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="M21 16l-5-5-7 7" /></svg>
        </button>
        <button data-go="rsvp" title="RSVP" onClick={() => goTo("rsvp")}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h16v14H4z" /><path d="M4 7l8 6 8-6" /></svg>
        </button>
        <button className={`music${playing ? " playing" : ""}`} title="Musik" onClick={toggleMusic}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l10-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="16" cy="16" r="3" /></svg>
        </button>
      </nav>
      {/* Ganti src dengan lagu pilihan. Dibiarkan kosong pada template. */}
      <audio ref={audioRef} loop preload="none" />
    </div>
  );
}
