"use client";

import { useState, useRef } from "react";
import { SURAT } from "@/app/lib/tokens";
import { Icon } from "@/app/components/icons";

// ── Collapsible section ──────────────────────────────────────────────
export function EditorSection({
  title, icon, count, defaultOpen = false, children,
}: {
  title: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  count?: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const IconComp = icon;
  return (
    <div style={{ borderBottom: `1px solid ${SURAT.border}` }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: "100%", display: "flex", alignItems: "center", gap: 11, padding: "15px 18px", textAlign: "left" }}
      >
        <span style={{
          width: 30, height: 30, borderRadius: 8, flexShrink: 0,
          background: open ? SURAT.accentSoft : SURAT.cardAlt,
          color: open ? SURAT.accent : SURAT.ink2,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all .15s",
        }}>
          {IconComp && <IconComp width={15} height={15} />}
        </span>
        <span style={{ flex: 1, minWidth: 0 }}>
          <span className="sx-serif" style={{ display: "block", fontSize: 15, fontWeight: 500, color: SURAT.ink, lineHeight: 1.2 }}>
            {title}
          </span>
        </span>
        {count != null && (
          <span className="sx-mono" style={{ fontSize: 11, color: SURAT.ink3 }}>{count}</span>
        )}
        <span style={{ color: SURAT.ink3, transform: open ? "rotate(180deg)" : "none", transition: "transform .18s" }}>
          <Icon.ChevronDown width={16} height={16} />
        </span>
      </button>
      <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows .2s ease" }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{ padding: "2px 18px 20px" }}>{children}</div>
        </div>
      </div>
    </div>
  );
}

// ── Labeled text field ────────────────────────────────────────────────
export function Field({
  label, value, onChange, onFocus, placeholder, hint, mono,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onFocus?: () => void;
  placeholder?: string;
  hint?: string;
  mono?: boolean;
}) {
  return (
    <label style={{ display: "block", marginBottom: 14 }}>
      <span className="sx-label" style={{ display: "block", marginBottom: 6 }}>{label}</span>
      <input
        className="sx-input"
        style={mono ? { fontFamily: SURAT.mono, fontSize: 13, letterSpacing: "0.02em" } : undefined}
        value={value}
        placeholder={placeholder}
        onFocus={onFocus}
        onChange={e => onChange(e.target.value)}
      />
      {hint && <span style={{ display: "block", marginTop: 5, fontSize: 11, color: SURAT.ink3 }}>{hint}</span>}
    </label>
  );
}

// ── Two fields on a row ───────────────────────────────────────────────
export function FieldRow({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>{children}</div>;
}

// ── Image upload field ────────────────────────────────────────────────
export function ImageField({
  label, value, onChange, onFocus, ratio = "4 / 3",
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  onFocus?: () => void;
  ratio?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  function handleFile(file: File | null | undefined) {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  }

  return (
    <div style={{ marginBottom: 14 }}>
      {label && <span className="sx-label" style={{ display: "block", marginBottom: 6 }}>{label}</span>}
      <div
        className={"sx-drop" + (over ? " over" : "")}
        onClick={() => { onFocus?.(); inputRef.current?.click(); }}
        onDragOver={e => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={e => { e.preventDefault(); setOver(false); handleFile(e.dataTransfer.files[0]); }}
        style={{
          aspectRatio: ratio, borderRadius: 11, overflow: "hidden", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", padding: 0,
        }}
      >
        {value
          ? <img src={value} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : (
            <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7, color: SURAT.ink3 }}>
              <Icon.Image width={20} height={20} />
              <span style={{ fontSize: 11.5 }}>Seret foto / klik unggah</span>
            </span>
          )}
        {value && (
          <span style={{
            position: "absolute", right: 8, bottom: 8,
            display: "inline-flex", alignItems: "center", gap: 5,
            padding: "5px 9px", borderRadius: 7,
            background: "rgba(255,255,255,0.92)", backdropFilter: "blur(4px)",
            fontSize: 11, fontWeight: 500, color: SURAT.ink,
            boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
          }}>
            <Icon.Upload width={12} height={12} /> Ganti
          </span>
        )}
      </div>
      <input
        ref={inputRef} type="file" accept="image/*" hidden
        onChange={e => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}

// ── Color swatch picker ───────────────────────────────────────────────
export function SwatchPicker({
  label, value, options, onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <span className="sx-label" style={{ display: "block", marginBottom: 8 }}>{label}</span>
      <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
        {options.map(c => {
          const active = value.toLowerCase() === c.toLowerCase();
          return (
            <button
              key={c}
              onClick={() => onChange(c)}
              title={c}
              style={{
                width: 30, height: 30, borderRadius: 999, background: c,
                boxShadow: active
                  ? `0 0 0 2px ${SURAT.popupBg}, 0 0 0 4px ${SURAT.ink}`
                  : "inset 0 0 0 1px rgba(0,0,0,0.12)",
                transition: "box-shadow .12s",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

// ── Font option picker ────────────────────────────────────────────────
interface FontOption {
  value: string;
  label: string;
  css: string;
  sample: string;
}

export function FontPicker({
  label, value, options, onChange,
}: {
  label: string;
  value: string;
  options: FontOption[];
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <span className="sx-label" style={{ display: "block", marginBottom: 8 }}>{label}</span>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {options.map(o => {
          const active = value === o.value;
          return (
            <button
              key={o.value}
              onClick={() => onChange(o.value)}
              style={{
                padding: "10px 12px", borderRadius: 9, textAlign: "left",
                background: active ? SURAT.accentSoft : SURAT.card,
                boxShadow: active
                  ? `inset 0 0 0 1.5px ${SURAT.accent}`
                  : `inset 0 0 0 1px ${SURAT.border}`,
                transition: "all .12s",
              }}
            >
              <span style={{ display: "block", fontFamily: o.css, fontSize: 19, color: SURAT.ink, lineHeight: 1.1 }}>{o.sample}</span>
              <span style={{ display: "block", fontSize: 10.5, color: SURAT.ink3, marginTop: 3 }}>{o.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Native select field ───────────────────────────────────────────────
export function SelectField({
  label, value, options, onChange, onFocus,
}: {
  label: string;
  value: string;
  options: string[] | { value: string; label: string }[];
  onChange: (v: string) => void;
  onFocus?: () => void;
}) {
  return (
    <label style={{ display: "block", marginBottom: 14 }}>
      <span className="sx-label" style={{ display: "block", marginBottom: 6 }}>{label}</span>
      <div style={{ position: "relative" }}>
        <select
          className="sx-input"
          style={{ appearance: "none", WebkitAppearance: "none", paddingRight: 32, cursor: "pointer" }}
          value={value}
          onFocus={onFocus}
          onChange={e => onChange(e.target.value)}
        >
          {options.map(o => {
            const val = typeof o === "string" ? o : o.value;
            const lbl = typeof o === "string" ? o : o.label;
            return <option key={val} value={val}>{lbl}</option>;
          })}
        </select>
        <span style={{ position: "absolute", right: 11, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: SURAT.ink3 }}>
          <Icon.ChevronDown width={15} height={15} />
        </span>
      </div>
    </label>
  );
}
