"use client";
import { useEffect, useRef, useState } from "react";

const WISH_KEY = "anindya_raditya_wishes";

type Wish = { name: string; msg: string; attend: string; ts: number };

function loadWishes(): Wish[] {
  try { return JSON.parse(localStorage.getItem(WISH_KEY) ?? "null") ?? []; } catch { return []; }
}
function saveWishes(arr: Wish[]) {
  try { localStorage.setItem(WISH_KEY, JSON.stringify(arr)); } catch { /* ignore */ }
}
function timeAgo(ts: number) {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return "Baru saja";
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
  return new Date(ts).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

const SEEDS: Wish[] = [
  { name: "Keluarga Besar Pranoto", msg: "Selamat menempuh hidup baru. Semoga menjadi keluarga yang sakinah, mawaddah, warahmah, serta dilimpahi keberkahan. Aamiin.", attend: "Hadir", ts: Date.now() - 7200000 },
  { name: "Dinda & Reza", msg: "Turut berbahagia atas pernikahan kalian berdua. Semoga langgeng sampai kakek-nenek ya. Sampai jumpa di Ubud!", attend: "Hadir", ts: Date.now() - 3600000 },
];

export function WishesSection() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const stored = loadWishes();
    if (stored.length === 0) { saveWishes(SEEDS); setWishes(SEEDS); }
    else setWishes(stored);
  }, []);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("wname") as HTMLInputElement).value.trim();
    const msg = (form.elements.namedItem("wmsg") as HTMLTextAreaElement).value.trim();
    const attend = (form.elements.namedItem("wattend") as HTMLSelectElement).value;
    if (!name || !msg || !attend) return;
    const updated = [{ name, msg, attend, ts: Date.now() }, ...wishes];
    saveWishes(updated);
    setWishes(updated);
    form.reset();
  };

  return (
    <>
      <div className="wishes-card reveal">
        <form onSubmit={submit} ref={formRef}>
          <div className="field">
            <label htmlFor="wname">Nama</label>
            <input type="text" id="wname" name="wname" required />
          </div>
          <div className="field">
            <label htmlFor="wattend">Konfirmasi Kehadiran</label>
            <select id="wattend" name="wattend" required defaultValue="">
              <option value="" disabled>Pilih salah satu</option>
              <option value="Hadir">Hadir</option>
              <option value="Tidak Hadir">Tidak Hadir</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="wmsg">Ucapan &amp; Doa</label>
            <textarea id="wmsg" name="wmsg" required placeholder="Tuliskan ucapan untuk mempelai…" />
          </div>
          <button type="submit" className="btn">Kirim Ucapan &amp; RSVP</button>
        </form>
      </div>
      {wishes.length > 0 && (
        <div className="wishes-list">
          <p className="wishes-count">{wishes.length} Ucapan</p>
          {wishes.map((w, i) => (
            <div key={i} className="wish">
              <div className="wish-name">
                {w.name}
                {w.attend && (
                  <span className={`wish-rsvp ${w.attend === "Hadir" ? "rsvp-yes" : "rsvp-no"}`}>
                    {w.attend}
                  </span>
                )}
              </div>
              <div className="wish-meta">{timeAgo(w.ts)}</div>
              <div className="wish-msg">{w.msg}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
