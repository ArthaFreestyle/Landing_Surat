"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { SURAT } from "@/app/lib/tokens";
import { Icon } from "@/app/components/icons";
import { LIcon } from "@/app/components/landing-icons";
import { Wordmark } from "@/app/components/wordmark";
import {
  EditorSection, Field, FieldRow, ImageField,
  SwatchPicker, FontPicker, SelectField,
} from "./editor-controls";
import { INVITE_PACKAGES, INVITE_THEMES, rupiah } from "@/app/components/catalog-data";
import type { Theme } from "@/app/components/catalog-data";

const STORAGE_KEY = "surat_undangan_editor_v3";

const DEFAULTS = {
  p1Name: "Anindya", p1Full: "Anindya Larasati",
  p1Order: "Bungsu", p1Father: "H. Suryana Wijaya", p1Mother: "Hj. Mariati Salim",
  p2Name: "Raditya", p2Full: "Raditya Wibisana",
  p2Order: "Sulung", p2Father: "Hendarto Pranoto", p2Mother: "Retno Kusumawati",
  isoDate: "2026-09-12",
  city: "Ubud, Bali",
  akadTitle: "Akad Nikah", akadTime: "Pukul 16.00 WITA",
  akadVenue: "Pura Taman Saraswati", akadAddr: "Jl. Kajeng, Ubud, Bali", akadMapUrl: "",
  resepTitle: "Resepsi", resepTime: "Pukul 19.00 WITA",
  resepVenue: "The Garden Pavilion", resepAddr: "Four Seasons, Sayan, Ubud", resepMapUrl: "",
  bank1Name: "Bank BCA", bank1No: "1234 5678 90", bank1Holder: "Anindya Larasati",
  bank2Name: "Bank Mandiri", bank2No: "0987 6543 21", bank2Holder: "Raditya Wibisana",
  accent: "#D4AF37",
  serif: '"Cormorant Garamond", Georgia, serif',
  sans: '"Montserrat", "Helvetica Neue", Helvetica, sans-serif',
  heroImg: "", coupleImg: "", storyImg: "",
  gallery0: "", gallery1: "", gallery2: "", gallery3: "", gallery4: "", gallery5: "",
};

type EditorState = typeof DEFAULTS;
type FieldKey = keyof EditorState;

const META_FIELDS = new Set<FieldKey>(["isoDate", "city", "accent", "serif", "sans", "akadMapUrl", "resepMapUrl"]);
const IMG_FIELDS = new Set<FieldKey>(["heroImg", "coupleImg", "storyImg", "gallery0", "gallery1", "gallery2", "gallery3", "gallery4", "gallery5"]);
const IMG_FIELDS_TARGET: Partial<Record<FieldKey, string>> = {
  heroImg: "heroPhoto", coupleImg: "couplePhoto", storyImg: "storyPhoto",
};
const HOLDER_FIELDS = new Set<FieldKey>(["bank1Holder", "bank2Holder"]);
const MEMPELAI_FIELDS = new Set<FieldKey>(
  (["p1", "p2"] as const).flatMap(p =>
    (["Name", "Full", "Order", "Father", "Mother"] as const).map(k => `${p}${k}` as FieldKey)
  )
);

const BULAN = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
function formatTanggal(iso: string) {
  if (!iso) return "—";
  const p = String(iso).split("-").map(Number);
  if (p.length !== 3 || !p[0]) return iso;
  return p[2] + " " + (BULAN[p[1] - 1] || "") + " " + p[0];
}

const PAY_METHODS = [
  { id: "qris", name: "QRIS", note: "GoPay, OVO, Dana, ShopeePay, m-banking" },
  { id: "va", name: "Transfer Bank (Virtual Account)", note: "BCA, Mandiri, BNI, BRI, Permata" },
  { id: "ewallet", name: "E-Wallet", note: "GoPay · OVO · Dana · ShopeePay" },
];

const ACCENTS = ["#D4AF37", "#C15F3C", "#9C7A54", "#7C8C6A", "#8A6E8C", "#4A6670", "#2C2C2C"];
const SERIFS = [
  { value: '"Cormorant Garamond", Georgia, serif', label: "Cormorant", css: '"Cormorant Garamond", serif', sample: "Aa" },
  { value: '"Playfair Display", Georgia, serif', label: "Playfair", css: '"Playfair Display", serif', sample: "Aa" },
  { value: '"Marcellus", Georgia, serif', label: "Marcellus", css: '"Marcellus", serif', sample: "Aa" },
  { value: '"EB Garamond", Georgia, serif', label: "EB Garamond", css: '"EB Garamond", serif', sample: "Aa" },
];
const SANS = [
  { value: '"Montserrat", Helvetica, sans-serif', label: "Montserrat", css: '"Montserrat", sans-serif', sample: "Ag" },
  { value: '"Jost", Helvetica, sans-serif', label: "Jost", css: '"Jost", sans-serif', sample: "Ag" },
];
const ORDERS = ["Sulung", "Pertama", "Kedua", "Ketiga", "Keempat", "Kelima", "Keenam", "Ketujuh", "Bungsu", "Tunggal"];
const BANKS = [
  "Bank BCA", "Bank Mandiri", "Bank BRI", "Bank BNI", "Bank BTN", "Bank BSI",
  "Bank CIMB Niaga", "Bank Danamon", "Bank Permata", "Bank Mega", "Bank OCBC NISP",
  "Bank Maybank", "Bank Panin", "Bank Jago", "Bank Jenius", "SeaBank", "blu by BCA Digital",
];

function escapeHtml(s: string) {
  return String(s).replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c] ?? c));
}

function persons(s: EditorState) {
  return {
    wanita: { name: s.p1Name, full: s.p1Full, order: s.p1Order, father: s.p1Father, mother: s.p1Mother },
    pria:   { name: s.p2Name, full: s.p2Full, order: s.p2Order, father: s.p2Father, mother: s.p2Mother },
  };
}

function roleText(p: { order: string }, female: boolean) {
  return (female ? "Putri" : "Putra") + " " + p.order + " dari";
}

function slugFor(s: EditorState) {
  const { wanita, pria } = persons(s);
  return (wanita.name + "-" + pria.name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function loadState(): EditorState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return Object.assign({}, DEFAULTS, JSON.parse(raw));
  } catch {}
  return { ...DEFAULTS };
}

function CheckoutModal({
  state, slug, theme, onClose,
}: {
  state: EditorState;
  slug: string;
  theme: Theme | null;
  onClose: () => void;
}) {
  const [pkg, setPkg] = useState<string>("plus");
  const [method, setMethod] = useState<string>("qris");
  const [phase, setPhase] = useState<"review" | "paying" | "done">("review");
  const { wanita, pria } = persons(state);
  const selected = INVITE_PACKAGES.find(p => p.id === pkg) ?? INVITE_PACKAGES[0];
  const base = theme?.price ?? 129000;
  const total = base + selected.add;

  const pay = () => {
    setPhase("paying");
    setTimeout(() => setPhase("done"), 1500);
  };

  const overlay: React.CSSProperties = {
    position: "fixed", inset: 0, zIndex: 200,
    background: "rgba(33,29,24,.55)", backdropFilter: "blur(4px)",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: 20, animation: "sx-fade .2s ease",
  };
  const card: React.CSSProperties = {
    background: SURAT.card, borderRadius: 22, width: "100%", maxWidth: 480,
    maxHeight: "92vh", display: "flex", flexDirection: "column",
    overflow: "hidden", animation: "sx-pop .24s ease",
    boxShadow: "0 40px 90px -30px rgba(0,0,0,.6)",
  };

  if (phase === "done") {
    return (
      <div className="sx" style={overlay} onClick={onClose}>
        <div style={card} onClick={e => e.stopPropagation()}>
          <div style={{ padding: "40px 28px 32px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: 999, background: SURAT.success, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
              <Icon.Check width={32} height={32} style={{ color: "#fff" }} />
            </div>
            <div className="sx-serif" style={{ fontSize: 26, fontWeight: 500, color: SURAT.ink }}>Undangan terbit!</div>
            <p style={{ fontSize: 14, color: SURAT.ink2, lineHeight: 1.6, margin: "10px 0 22px", maxWidth: 340 }}>
              Pembayaran <b>{rupiah(total)}</b> berhasil. Undangan {wanita.name} &amp; {pria.name} sudah aktif dan siap dibagikan.
            </p>
            <div style={{ width: "100%", background: SURAT.popupBg, border: `1px solid ${SURAT.border}`, borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <Icon.Lock width={14} height={14} style={{ color: SURAT.ink3, flexShrink: 0 }} />
              <span className="sx-mono" style={{ fontSize: 13, color: SURAT.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>surat.id/{slug || "undangan"}</span>
              <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 600, color: SURAT.success }}>● Aktif</span>
            </div>
            <button className="sx-btn sx-btn-primary" style={{ width: "100%" }} onClick={onClose}>Selesai</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sx" style={overlay} onClick={phase === "paying" ? undefined : onClose}>
      <div style={card} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "18px 20px", borderBottom: `1px solid ${SURAT.border}` }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: SURAT.ink3 }}>Terbitkan undangan</div>
            <div className="sx-serif" style={{ fontSize: 20, fontWeight: 500, color: SURAT.ink }}>{theme?.name ?? "Undangan digital"}</div>
          </div>
          <button className="sx-btn-ghost" onClick={onClose} disabled={phase === "paying"} style={{ width: 34, height: 34, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: SURAT.ink2 }}>
            <Icon.X width={18} height={18} />
          </button>
        </div>

        <div className="sx-scroll" style={{ padding: 20, overflowY: "auto" }}>
          <div style={{ background: SURAT.popupBg, border: `1px solid ${SURAT.border}`, borderRadius: 14, padding: "16px 18px", marginBottom: 22 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: SURAT.accentInk, marginBottom: 10 }}>Undangan kamu sudah siap</div>
            <div className="sx-serif" style={{ fontSize: 22, fontWeight: 500, color: SURAT.ink, lineHeight: 1.15 }}>{wanita.name} &amp; {pria.name}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px", marginTop: 8, fontSize: 13, color: SURAT.ink2 }}>
              <span>{formatTanggal(state.isoDate)}</span>
              <span style={{ color: SURAT.ink3 }}>·</span>
              <span>{state.city}</span>
            </div>
            <div className="sx-mono" style={{ fontSize: 11.5, color: SURAT.ink3, marginTop: 8 }}>surat.id/{slug || "undangan"}</div>
          </div>

          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: SURAT.ink3, marginBottom: 12 }}>Pilih paket</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {INVITE_PACKAGES.map(p => {
              const on = p.id === pkg;
              return (
                <button key={p.id} onClick={() => setPkg(p.id)} style={{ textAlign: "left", cursor: "pointer", background: on ? SURAT.accentSoft : SURAT.card, border: `1.5px solid ${on ? SURAT.accent : SURAT.border}`, borderRadius: 14, padding: "13px 15px", fontFamily: "inherit", transition: "all .12s" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ width: 18, height: 18, borderRadius: 999, flexShrink: 0, border: `1.5px solid ${on ? SURAT.accent : SURAT.borderStrong}`, background: on ? SURAT.accent : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {on && <Icon.Check width={11} height={11} style={{ color: "#fff" }} />}
                    </span>
                    <span style={{ fontSize: 15, fontWeight: 600, color: SURAT.ink }}>{p.name}</span>
                    {p.popular && <span style={{ fontSize: 10.5, fontWeight: 600, color: "#fff", background: SURAT.accent, padding: "2px 7px", borderRadius: 999 }}>Populer</span>}
                    <span className="sx-serif" style={{ marginLeft: "auto", fontSize: 16, fontWeight: 500, color: SURAT.ink }}>{rupiah(base + p.add)}</span>
                  </div>
                  {on && (
                    <ul style={{ listStyle: "none", padding: 0, margin: "11px 0 0 28px", display: "flex", flexDirection: "column", gap: 6 }}>
                      {p.features.map((ft, i) => (
                        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12.5, color: SURAT.ink2 }}>
                          <Icon.Check width={13} height={13} style={{ color: SURAT.accent, flexShrink: 0, marginTop: 2 }} />{ft}
                        </li>
                      ))}
                    </ul>
                  )}
                </button>
              );
            })}
          </div>

          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: SURAT.ink3, margin: "22px 0 12px" }}>Metode pembayaran</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {PAY_METHODS.map(m => {
              const on = m.id === method;
              return (
                <button key={m.id} onClick={() => setMethod(m.id)} style={{ textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: 11, background: SURAT.card, border: `1.5px solid ${on ? SURAT.accent : SURAT.border}`, borderRadius: 12, padding: "12px 14px", fontFamily: "inherit", transition: "all .12s" }}>
                  <span style={{ width: 16, height: 16, borderRadius: 999, flexShrink: 0, border: `1.5px solid ${on ? SURAT.accent : SURAT.borderStrong}`, background: on ? SURAT.accent : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {on && <span style={{ width: 6, height: 6, borderRadius: 999, background: "#fff" }} />}
                  </span>
                  <span>
                    <span style={{ display: "block", fontSize: 14, fontWeight: 600, color: SURAT.ink }}>{m.name}</span>
                    <span style={{ display: "block", fontSize: 11.5, color: SURAT.ink3, marginTop: 1 }}>{m.note}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ padding: "14px 20px", borderTop: `1px solid ${SURAT.border}`, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: SURAT.ink3 }}>Total ({selected.name})</div>
            <div className="sx-serif" style={{ fontSize: 22, fontWeight: 500, color: SURAT.ink }}>{rupiah(total)}</div>
          </div>
          <button className="sx-btn sx-btn-primary" onClick={pay} disabled={phase === "paying"} style={{ padding: "13px 22px", opacity: phase === "paying" ? 0.75 : 1 }}>
            {phase === "paying"
              ? <><span className="sx-spin" style={{ width: 15, height: 15, borderRadius: 999, border: "2px solid rgba(255,255,255,.4)", borderTopColor: "#fff", display: "inline-block" }} /> Memproses…</>
              : <><Icon.Lock width={15} height={15} /> Bayar {rupiah(total)}</>}
          </button>
        </div>
      </div>
    </div>
  );
}

export function EditorApp() {
  const [state, setState] = useState<EditorState>(() =>
    typeof window === "undefined" ? { ...DEFAULTS } : loadState()
  );
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sheetH, setSheetH] = useState(400);
  const [dragging, setDragging] = useState(false);
  const sheetHRef = useRef(sheetH);
  sheetHRef.current = sheetH;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const stateRef = useRef(state);
  stateRef.current = state;
  const orderTheme = useRef<Theme | null>(null);
  if (orderTheme.current === null && typeof window !== "undefined") {
    const id = new URLSearchParams(window.location.search).get("desain");
    orderTheme.current = INVITE_THEMES.find(t => t.id === id) ?? INVITE_THEMES[0];
  }

  const win = () => iframeRef.current?.contentWindow ?? null;

  const post = useCallback((field: FieldKey, value: string) => {
    const w = win();
    if (!w) return;
    if (HOLDER_FIELDS.has(field)) {
      w.postMessage({ type: "surat-set", field, value: "a.n. " + escapeHtml(value) }, "*");
      return;
    }
    if (META_FIELDS.has(field) || IMG_FIELDS.has(field)) {
      w.postMessage({ type: "surat-set", field, value }, "*");
    } else {
      w.postMessage({ type: "surat-set", field, value: escapeHtml(value) }, "*");
    }
  }, []);

  const postHtml = useCallback((field: string, html: string) => {
    const w = win();
    if (w) w.postMessage({ type: "surat-set", field, value: html }, "*");
  }, []);

  const syncMempelai = useCallback((s: EditorState) => {
    const { wanita, pria } = persons(s);
    const esc = escapeHtml;
    postHtml("groom", esc(wanita.name));
    postHtml("bride", esc(pria.name));
    postHtml("footGroom", esc(wanita.name));
    postHtml("footBride", esc(pria.name));
    postHtml("brideFull", esc(wanita.full));
    postHtml("groomFull", esc(pria.full));
    postHtml("brideRole", esc(roleText(wanita, true)));
    postHtml("groomRole", esc(roleText(pria, false)));
    postHtml("brideParents", "Bapak " + esc(wanita.father) + "<br />&amp; Ibu " + esc(wanita.mother));
    postHtml("groomParents", "Bapak " + esc(pria.father) + "<br />&amp; Ibu " + esc(pria.mother));
    const ini = (n: string) => (String(n).trim()[0] ?? "").toUpperCase();
    const w = win();
    if (w) w.postMessage({ type: "surat-monogram", value: ini(wanita.name) + "&nbsp;&amp;&nbsp;" + ini(pria.name) }, "*");
    const tag = "#" + wanita.name.replace(/[^A-Za-z0-9]/g, "") + pria.name.replace(/[^A-Za-z0-9]/g, "");
    postHtml("hashtag", esc(tag));
  }, [postHtml]);

  const syncAll = useCallback(() => {
    const s = stateRef.current;
    (Object.keys(DEFAULTS) as FieldKey[]).forEach(k => {
      if (MEMPELAI_FIELDS.has(k)) return;
      if (IMG_FIELDS.has(k) && !s[k]) return;
      post(k, s[k]);
    });
    syncMempelai(s);
  }, [post, syncMempelai]);

  useEffect(() => {
    function onMsg(e: MessageEvent) {
      if (e.data?.type === "surat-preview-ready") { setReady(true); syncAll(); }
    }
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [syncAll]);

  useEffect(() => {
    const t = setTimeout(() => {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
    }, 400);
    return () => clearTimeout(t);
  }, [state]);

  const update = useCallback((field: FieldKey, value: string) => {
    const next = { ...stateRef.current, [field]: value };
    stateRef.current = next;
    setState(next);
    if (MEMPELAI_FIELDS.has(field)) syncMempelai(next);
    else post(field, value);
  }, [post, syncMempelai]);

  const flash = useCallback((field: string) => {
    const w = win();
    if (w) w.postMessage({ type: "surat-flash", field }, "*");
  }, []);

  const save = () => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  };

  const reset = () => {
    if (!window.confirm("Kembalikan semua isian ke contoh awal?")) return;
    setState({ ...DEFAULTS });
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    const fr = iframeRef.current;
    if (fr) fr.src = fr.src;
    setReady(false);
  };

  useEffect(() => {
    setIsMobile(window.innerWidth < 880);
    setSheetH(Math.round(window.innerHeight * 0.52));
  }, []);

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < 880);
      setSheetH(h => Math.min(h, Math.round(window.innerHeight * 0.9)));
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function snapPoints() {
    const h = typeof window !== "undefined" ? window.innerHeight : 800;
    return { peek: 104, mid: Math.round(h * 0.52), full: Math.round(h * 0.9) };
  }
  function clampH(v: number) {
    const s = snapPoints();
    return Math.max(s.peek, Math.min(s.full, v));
  }
  function startSheetDrag(e: React.PointerEvent) {
    e.preventDefault();
    const startY = e.clientY;
    const startH = sheetHRef.current;
    setDragging(true);
    function move(ev: PointerEvent) { setSheetH(clampH(startH + (startY - ev.clientY))); }
    function up(ev: PointerEvent) {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      setDragging(false);
      const h = clampH(startH + (startY - ev.clientY));
      const sp = snapPoints();
      const arr = [sp.peek, sp.mid, sp.full];
      setSheetH(arr.reduce((a, b) => Math.abs(b - h) < Math.abs(a - h) ? b : a));
    }
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  }

  const slug = slugFor(state);
  const checkoutEl = checkout
    ? <CheckoutModal state={state} slug={slug} theme={orderTheme.current} onClose={() => setCheckout(false)} />
    : null;

  const f = (field: FieldKey) => ({
    value: state[field],
    onChange: (v: string) => update(field, v),
    onFocus: () => flash(field as string),
  });
  const img = (field: FieldKey) => ({
    value: state[field],
    onChange: (v: string) => update(field, v),
    onFocus: () => flash(IMG_FIELDS_TARGET[field] ?? (field as string)),
  });
  const pf = (field: FieldKey) => ({
    value: state[field],
    onChange: (v: string) => update(field, v),
    onFocus: () => flash("couple"),
  });

  function PersonFields(prefix: "p1" | "p2", label: string) {
    return (
      <div style={{ marginBottom: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "2px 0 10px" }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: SURAT.accentInk }}>
            Mempelai {label}
          </span>
          <span style={{ flex: 1, height: 1, background: SURAT.border }} />
        </div>
        <FieldRow>
          <Field label="Nama Panggilan" {...pf(`${prefix}Name` as FieldKey)} />
          <Field label="Nama Lengkap" {...pf(`${prefix}Full` as FieldKey)} />
        </FieldRow>
        <SelectField label="Anak ke-" options={ORDERS} {...pf(`${prefix}Order` as FieldKey)} />
        <FieldRow>
          <Field label="Nama Ayah" {...pf(`${prefix}Father` as FieldKey)} />
          <Field label="Nama Ibu" {...pf(`${prefix}Mother` as FieldKey)} />
        </FieldRow>
      </div>
    );
  }

  const templateChip = (
    <div style={{ padding: "12px 18px", display: "flex", alignItems: "center", gap: 10, borderBottom: `1px solid ${SURAT.border}` }}>
      <div style={{ width: 38, height: 38, borderRadius: 8, flexShrink: 0, overflow: "hidden", background: "#3a352e" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/uploads/pexels-marvin-malmis-ponce-13470064-scaled-1.webp" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="sx-serif" style={{ fontSize: 14.5, fontWeight: 500, color: SURAT.ink, lineHeight: 1.2 }}>
          Tema — Editorial Bali
        </div>
        <div className="sx-mono" style={{ fontSize: 11, color: SURAT.ink3, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          surat.id/{slug || "undangan"}
        </div>
      </div>
    </div>
  );

  const footerActions = (
    <div style={{ padding: 14, borderTop: `1px solid ${SURAT.border}`, display: "flex", gap: 10, background: SURAT.popupBg }}>
      <button className="sx-btn sx-btn-secondary" style={{ flex: 1, padding: "14px 18px", fontSize: 14, borderRadius: 11 }} onClick={save}>
        {saved ? <><Icon.Check width={15} height={15} /> Tersimpan</> : "Simpan Draf"}
      </button>
      <button className="sx-btn sx-btn-primary" style={{ flex: 1.2, padding: "14px 18px", fontSize: 14, borderRadius: 11 }} onClick={() => setCheckout(true)}>
        <Icon.ArrowRight width={15} height={15} /> Terbitkan
      </button>
    </div>
  );

  const scrollSections = (
    <div className="sx-scroll" style={{ flex: 1, overflowY: "auto", touchAction: "pan-y" }}>
      <EditorSection title="Mempelai" icon={Icon.User} defaultOpen>
        <p style={{ margin: "0 0 14px", fontSize: 11.5, color: SURAT.ink3, lineHeight: 1.5, display: "flex", gap: 6 }}>
          <span style={{ color: SURAT.accent, flexShrink: 0 }}><Icon.Info width={13} height={13} /></span>
          Mempelai wanita ditampilkan lebih dulu, sesuai adat penulisan undangan.
        </p>
        {PersonFields("p1", "Wanita")}
        {PersonFields("p2", "Pria")}
      </EditorSection>

      <EditorSection title="Tanggal & Acara" icon={LIcon.Clock}>
        <FieldRow>
          <label style={{ display: "block", marginBottom: 14 }}>
            <span className="sx-label" style={{ display: "block", marginBottom: 6 }}>Tanggal</span>
            <input
              className="sx-input" type="date" value={state.isoDate}
              onFocus={() => flash("heroDate")}
              onChange={e => update("isoDate", e.target.value)}
            />
          </label>
          <Field label="Lokasi / Kota" {...f("city")} />
        </FieldRow>
        <div style={{ height: 1, background: SURAT.border, margin: "6px 0 16px" }} />
        <Field label="Judul Acara 1" {...f("akadTitle")} />
        <Field label="Waktu Acara 1" {...f("akadTime")} />
        <Field label="Tempat Acara 1" {...f("akadVenue")} />
        <Field label="Alamat Acara 1" {...f("akadAddr")} />
        <Field label="Link Google Maps 1" {...f("akadMapUrl")} mono hint="Tempel link 'Bagikan' dari Google Maps untuk tombol Petunjuk Arah." />
        <div style={{ height: 1, background: SURAT.border, margin: "6px 0 16px" }} />
        <Field label="Judul Acara 2" {...f("resepTitle")} />
        <Field label="Waktu Acara 2" {...f("resepTime")} />
        <Field label="Tempat Acara 2" {...f("resepVenue")} />
        <Field label="Alamat Acara 2" {...f("resepAddr")} />
        <Field label="Link Google Maps 2" {...f("resepMapUrl")} mono hint="Kosongkan untuk mencari otomatis dari nama tempat." />
      </EditorSection>

      <EditorSection title="Foto" icon={Icon.Image}>
        <ImageField label="Foto Sampul" ratio="16 / 10" {...img("heroImg")} />
        <FieldRow>
          <ImageField label="Foto Mempelai" ratio="3 / 4" {...img("coupleImg")} />
          <ImageField label="Foto Kisah" ratio="3 / 4" {...img("storyImg")} />
        </FieldRow>
        <span className="sx-label" style={{ display: "block", margin: "4px 0 8px" }}>Galeri Momen</span>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {([0, 1, 2, 3, 4, 5] as const).map(i => (
            <ImageField key={i} ratio="1 / 1" {...img(`gallery${i}` as FieldKey)} />
          ))}
        </div>
      </EditorSection>

      <EditorSection title="Tanda Kasih" icon={LIcon.Bolt}>
        <SelectField label="Bank 1" options={BANKS} {...f("bank1Name")} />
        <Field label="Nomor Rekening 1" {...f("bank1No")} mono />
        <Field label="Atas Nama 1" {...f("bank1Holder")} hint="Cukup tulis nama, 'a.n.' otomatis ditambahkan." />
        <div style={{ height: 1, background: SURAT.border, margin: "6px 0 16px" }} />
        <SelectField label="Bank 2" options={BANKS} {...f("bank2Name")} />
        <Field label="Nomor Rekening 2" {...f("bank2No")} mono />
        <Field label="Atas Nama 2" {...f("bank2Holder")} hint="Cukup tulis nama, 'a.n.' otomatis ditambahkan." />
      </EditorSection>

      <EditorSection title="Tema" icon={Icon.Settings}>
        <SwatchPicker label="Warna Aksen" value={state.accent} options={ACCENTS} onChange={v => update("accent", v)} />
        <FontPicker label="Huruf Judul" value={state.serif} options={SERIFS} onChange={v => update("serif", v)} />
        <FontPicker label="Huruf Teks" value={state.sans} options={SANS} onChange={v => update("sans", v)} />
      </EditorSection>

      <div style={{ height: 8 }} />
    </div>
  );

  const iframeEl = (
    <iframe
      ref={iframeRef}
      src="/undangan-preview.html"
      title="Pratinjau Undangan"
      style={{ flex: 1, width: "100%", height: "100%", border: "none", background: "#FDFBF7" }}
    />
  );

  // ── MOBILE: full-screen preview + draggable bottom sheet ──────────────
  if (isMobile) {
    const sp = snapPoints();
    return (
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", background: "#000" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex" }}>{iframeEl}</div>

        <div className="sx" style={{ position: "absolute", top: 0, left: 0, right: 0, display: "flex", justifyContent: "center", padding: 12, pointerEvents: "none" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 14px", borderRadius: 999, background: "rgba(253,251,247,0.92)", backdropFilter: "blur(8px)", boxShadow: "0 2px 12px rgba(40,33,25,0.18)" }}>
            <span style={{ width: 7, height: 7, borderRadius: 999, background: ready ? SURAT.success : SURAT.ink3 }} />
            <span className="sx-mono" style={{ fontSize: 11.5, color: SURAT.ink2 }}>surat.id/{slug || "undangan"}</span>
          </div>
        </div>

        <aside className="sx" style={{
          position: "absolute", left: 0, right: 0, bottom: 0,
          height: sheetH, maxHeight: sp.full,
          background: SURAT.popupBg, borderTopLeftRadius: 20, borderTopRightRadius: 20,
          boxShadow: "0 -12px 44px -14px rgba(40,33,25,0.5)",
          display: "flex", flexDirection: "column", overflow: "hidden",
          transition: dragging ? "none" : "height .26s cubic-bezier(.22,.7,.3,1)",
          touchAction: "none",
        }}>
          <div
            onPointerDown={startSheetDrag}
            style={{ flexShrink: 0, cursor: "grab", touchAction: "none", padding: "9px 16px 10px", borderBottom: `1px solid ${SURAT.border}` }}
          >
            <div style={{ width: 42, height: 5, borderRadius: 999, background: "rgba(60,50,40,0.2)", margin: "0 auto 10px" }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <Wordmark size={18} />
                <span style={{ fontSize: 11.5, color: SURAT.ink3 }}>Editor</span>
              </div>
              <button className="sx-btn-ghost" onClick={reset} title="Reset" style={{ width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: SURAT.ink2 }}>
                <Icon.Undo width={14} height={14} />
              </button>
            </div>
          </div>
          {scrollSections}
          {footerActions}
        </aside>
        {checkoutEl}
      </div>
    );
  }

  // ── DESKTOP: sidebar left, preview right ──────────────────────────────
  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden", background: SURAT.canvasBg }}>
      <aside className="sx" style={{ width: 396, height: "100%", flexShrink: 0, borderRight: `1px solid ${SURAT.border}`, background: SURAT.popupBg, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderBottom: `1px solid ${SURAT.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Wordmark size={20} />
            <span style={{ fontSize: 12, color: SURAT.ink3, paddingLeft: 10, marginLeft: 2, borderLeft: `1px solid ${SURAT.border}` }}>Editor</span>
          </div>
          <button className="sx-btn-ghost" onClick={reset} title="Reset" style={{ width: 30, height: 30, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: SURAT.ink2 }}>
            <Icon.Undo width={15} height={15} />
          </button>
        </div>
        {templateChip}
        {scrollSections}
        {footerActions}
      </aside>

      <main style={{ flex: 1, height: "100%", display: "flex", flexDirection: "column", minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", borderBottom: `1px solid ${SURAT.border}`, background: SURAT.popupBg }}>
          <div className="sx" style={{ display: "flex", alignItems: "center", gap: 8, color: SURAT.ink2 }}>
            <span style={{ width: 7, height: 7, borderRadius: 999, background: ready ? SURAT.success : SURAT.ink3, transition: "background .2s" }} />
            <span className="sx-mono" style={{ fontSize: 11.5, color: SURAT.ink2 }}>{ready ? "Pratinjau langsung" : "Memuat…"}</span>
          </div>
          <div className="sx" style={{ display: "inline-flex", padding: 3, borderRadius: 999, background: SURAT.cardAlt, border: `1px solid ${SURAT.border}` }}>
            {(["desktop", "mobile"] as const).map(k => (
              <button
                key={k}
                onClick={() => setDevice(k)}
                style={{
                  padding: "6px 16px", borderRadius: 999, fontSize: 12.5, fontWeight: 500,
                  background: device === k ? SURAT.card : "transparent",
                  color: device === k ? SURAT.ink : SURAT.ink2,
                  boxShadow: device === k ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                  transition: "all .14s",
                }}
              >
                {k === "desktop" ? "Desktop" : "Ponsel"}
              </button>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflow: "hidden", padding: device === "mobile" ? "28px 20px" : "26px", display: "flex", justifyContent: "center", alignItems: "stretch" }}>
          <div style={{
            width: device === "mobile" ? 400 : "100%",
            maxWidth: device === "mobile" ? 400 : 1280,
            height: "100%", background: "#fff", borderRadius: 16, overflow: "hidden",
            boxShadow: "0 2px 4px rgba(60,50,40,.05), 0 30px 60px -24px rgba(60,50,40,.4), 0 12px 24px -14px rgba(60,50,40,.2)",
            display: "flex", flexDirection: "column", transition: "width .25s ease, max-width .25s ease",
          }}>
            <div style={{ height: 42, flexShrink: 0, background: "#e8e3d8", borderBottom: "1px solid #d6cdba", display: "flex", alignItems: "center", gap: 10, padding: "0 14px" }}>
              <div style={{ display: "flex", gap: 6 }}>
                <span style={{ width: 11, height: 11, borderRadius: 999, background: "#e0a39a" }} />
                <span style={{ width: 11, height: 11, borderRadius: 999, background: "#e6cf9a" }} />
                <span style={{ width: 11, height: 11, borderRadius: 999, background: "#a9c6a0" }} />
              </div>
              <div style={{ flex: 1, height: 26, borderRadius: 7, background: "#f1ece0", display: "flex", alignItems: "center", gap: 7, padding: "0 12px", maxWidth: 460, margin: "0 auto", fontFamily: SURAT.mono, fontSize: 11.5, color: SURAT.ink2 }}>
                <Icon.Lock width={11} height={11} />
                <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>surat.id/{slug || "undangan"}</span>
              </div>
              <div style={{ width: 44 }} />
            </div>
            {iframeEl}
          </div>
        </div>
      </main>
      {checkoutEl}
    </div>
  );
}
