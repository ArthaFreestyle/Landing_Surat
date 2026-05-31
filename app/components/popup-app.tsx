"use client";

import { useState, useEffect, ReactNode } from "react";
import { SURAT } from "@/app/lib/tokens";
import { PopupFrame } from "./popup-shell";
import { ScreenLogin, ScreenMain, ScreenProcessing, ScreenPreview, ScreenSuccess } from "./popup-screens";

type AppState = "login" | "main" | "processing" | "preview" | "success";

export function InteractivePopup({ initial = "login" }: { initial?: AppState }) {
  const [state, setState] = useState<AppState>(initial);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (state !== "processing") return;
    setStage(0);
    let cur = 0;
    const id = setInterval(() => {
      cur++;
      if (cur > 3) {
        clearInterval(id);
        setState("preview");
      } else {
        setStage(cur);
      }
    }, 900);
    return () => clearInterval(id);
  }, [state]);

  const steps: AppState[] = ["login", "main", "processing", "preview", "success"];

  return (
    <PopupFrame>
      {state === "login"      && <ScreenLogin      onContinue={() => setState("main")} />}
      {state === "main"       && <ScreenMain       onUpload={() => setState("processing")} />}
      {state === "processing" && <ScreenProcessing stage={stage} />}
      {state === "preview"    && <ScreenPreview    onBack={() => setState("main")} onFill={() => setState("success")} />}
      {state === "success"    && <ScreenSuccess    onDone={() => setState("main")} />}

      <div
        style={{
          position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)",
          display: "flex", gap: 6, padding: "5px 8px",
          background: "rgba(42,37,31,0.78)", borderRadius: 999,
          backdropFilter: "blur(6px)",
          zIndex: 10,
          pointerEvents: "auto",
        }}
      >
        {steps.map((s) => (
          <button
            key={s}
            onClick={() => setState(s)}
            title={s}
            style={{
              width: state === s ? 18 : 6, height: 6, borderRadius: 999,
              background: state === s ? "#f5efe0" : "rgba(245,239,224,0.35)",
              border: "none", cursor: "pointer",
              transition: "all .2s",
            }}
          />
        ))}
      </div>
    </PopupFrame>
  );
}

export function BrowserContext({ children, sidebarWidth = 380 }: { children: ReactNode; sidebarWidth?: number }) {
  const W = 1140;
  const H = 720;
  return (
    <div
      style={{
        width: W, height: H,
        borderRadius: 10,
        background: "#e8e3d8",
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 1px 0 rgba(0,0,0,0.04), 0 2px 6px rgba(0,0,0,0.06)",
        fontFamily: SURAT.sans,
        display: "flex", flexDirection: "column",
      }}
    >
      <div
        style={{
          height: 36, background: "#dfd9cb",
          display: "flex", alignItems: "center", gap: 8,
          padding: "0 12px",
          borderBottom: "1px solid #cfc8b7",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: 5 }}>
          <span style={{ width: 11, height: 11, borderRadius: 999, background: "#e8765a" }}/>
          <span style={{ width: 11, height: 11, borderRadius: 999, background: "#e0b13b" }}/>
          <span style={{ width: 11, height: 11, borderRadius: 999, background: "#6db465" }}/>
        </div>
        <div
          style={{
            flex: 1, marginLeft: 14,
            height: 22, borderRadius: 6,
            background: "#f1ece0",
            display: "flex", alignItems: "center",
            padding: "0 10px",
            fontSize: 11, color: SURAT.ink2, fontFamily: SURAT.mono,
          }}
        >
          <span style={{ color: SURAT.ink3 }}>https://</span>app.kredivo.com/onboarding/identitas
        </div>
        <div
          style={{
            width: 24, height: 24, borderRadius: 6,
            background: SURAT.accentSoft, color: SURAT.accent,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 0 1.5px rgba(193,95,60,0.5)",
          }}
          title="Side panel open"
        >
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="16" rx="2"/>
            <line x1="15" y1="4" x2="15" y2="20"/>
          </svg>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        <div style={{ flex: 1, padding: 28, display: "flex", gap: 24, minWidth: 0, overflow: "hidden" }}>
          <div style={{ flex: 1 }}>
            <div style={{ height: 14, width: 130, background: "#cfc8b7", borderRadius: 4, marginBottom: 18 }}/>
            <div style={{ height: 22, width: "70%", background: "#bfb8a3", borderRadius: 5, marginBottom: 22 }}/>
            {[0,1,2,3,4,5,6].map(i => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ height: 9, width: 80 + i*14, background: "#cfc8b7", borderRadius: 3, marginBottom: 5 }}/>
                <div style={{ height: 30, background: "#f1ece0", borderRadius: 6, border: "1px solid #d9d1be" }}/>
              </div>
            ))}
          </div>
          <div style={{ flex: 1 }}>
            {[0,1,2,3,4,5,6].map(i => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ height: 9, width: 60 + i*22, background: "#cfc8b7", borderRadius: 3, marginBottom: 5 }}/>
                <div style={{ height: 30, background: "#f1ece0", borderRadius: 6, border: "1px solid #d9d1be" }}/>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            width: sidebarWidth, flexShrink: 0,
            background: SURAT.popupBg,
            boxShadow: "-1px 0 0 rgba(0,0,0,0.05), -8px 0 20px rgba(60,50,40,0.05)",
            position: "relative",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
