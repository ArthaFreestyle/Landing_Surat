"use client";

import { ReactNode } from "react";
import { SURAT } from "@/app/lib/tokens";
import { Icon } from "./icons";
import { Wordmark } from "./wordmark";

export function PopupFrame({ children, width = 380, height = 720 }: { children: ReactNode; width?: number; height?: number }) {
  return (
    <div
      style={{
        width, height,
        background: SURAT.popupBg,
        overflow: "hidden",
        position: "relative",
        boxShadow: `inset 1px 0 0 ${SURAT.border}, -1px 0 0 rgba(0,0,0,0.04)`,
      }}
    >
      <div className="sx">{children}</div>
    </div>
  );
}

export { Wordmark };

export function TopBar({
  scansLeft = 8,
  scansTotal = 10,
  onAccount,
}: {
  scansLeft?: number;
  scansTotal?: number;
  onAccount?: () => void;
}) {
  return (
    <div
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 16px 10px",
        borderBottom: `1px solid ${SURAT.border}`,
        background: SURAT.popupBg,
      }}
    >
      <Wordmark size={20} />
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "4px 8px 4px 10px",
            borderRadius: 999,
            background: SURAT.cardAlt,
            fontSize: 11.5, color: SURAT.ink2,
          }}
        >
          <span className="sx-mono" style={{ color: SURAT.ink, fontWeight: 500 }}>{scansLeft}</span>
          <span style={{ opacity: 0.6 }}>/ {scansTotal}</span>
        </div>
        <button
          onClick={onAccount}
          style={{
            width: 28, height: 28, borderRadius: 999,
            background: SURAT.cardAlt,
            display: "flex", alignItems: "center", justifyContent: "center",
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
