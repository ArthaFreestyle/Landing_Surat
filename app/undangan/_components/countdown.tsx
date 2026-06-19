"use client";
import { useEffect, useState } from "react";

const TARGET = new Date("2026-09-12T16:00:00+08:00").getTime();

function calc() {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff % 86400000 / 3600000),
    mins: Math.floor(diff % 3600000 / 60000),
    secs: Math.floor(diff % 60000 / 1000),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function Countdown() {
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { v: String(t.days), l: "Hari" },
    { v: pad(t.hours), l: "Jam" },
    { v: pad(t.mins), l: "Menit" },
    { v: pad(t.secs), l: "Detik" },
  ];

  return (
    <div className="countdown reveal">
      {units.map(({ v, l }) => (
        <div key={l} className="cd-unit">
          <div className="cd-num">{v}</div>
          <div className="cd-label">{l}</div>
        </div>
      ))}
    </div>
  );
}
