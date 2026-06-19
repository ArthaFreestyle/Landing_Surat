"use client";
import { useState } from "react";

export function CopyBtn({ accountNum }: { accountNum: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try { await navigator.clipboard.writeText(accountNum); } catch { /* ignore */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button className={`copy-btn${copied ? " copied" : ""}`} type="button" onClick={copy}>
      {copied ? "Tersalin ✓" : "Salin Nomor"}
    </button>
  );
}
