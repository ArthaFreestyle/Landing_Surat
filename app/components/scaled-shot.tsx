"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import { SURAT } from "@/app/lib/tokens";

interface ScaledShotProps {
  w: number;
  h: number;
  maxW?: number;
  children: ReactNode;
  frame?: boolean;
  align?: "center" | "left";
  cropH?: number;
  fade?: boolean;
}

export function ScaledShot({
  w, h, maxW, children, frame = true, align = "center", cropH, fade = false,
}: ScaledShotProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(maxW ? Math.min(1, maxW / w) : 1);

  useEffect(() => {
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
    <div ref={ref} style={{ width: "100%", maxWidth: maxW || w, margin: align === "center" ? "0 auto" : 0 }}>
      <div
        className={frame ? "lp-shot-frame" : ""}
        style={{
          position: "relative",
          width: Math.round(w * scale),
          height: Math.round(shownH * scale),
          margin: align === "center" ? "0 auto" : 0,
          overflow: "hidden",
          borderRadius: frame ? 14 : 0,
        }}
      >
        <div style={{ width: w, height: h, transform: `scale(${scale})`, transformOrigin: "top left" }}>
          {children}
        </div>
        {fade && (
          <div
            style={{
              position: "absolute", left: 0, right: 0, bottom: 0, height: 72,
              background: `linear-gradient(transparent, ${SURAT.popupBg})`,
              pointerEvents: "none",
            }}
          />
        )}
      </div>
    </div>
  );
}
