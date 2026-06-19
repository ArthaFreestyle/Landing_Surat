"use client";
import { useEffect, useRef } from "react";

const SLIDES = [
  "/uploads/pexels-marvin-malmis-ponce-13470064-scaled-1.webp",
  "/uploads/pexels-marvin-malmis-ponce-13470059-scaled-1.webp",
  "/uploads/pexels-marvin-malmis-ponce-13470065-scaled-1.webp",
  "/uploads/pexels-marvin-malmis-ponce-13470063-scaled-1-2.webp",
];

export function HeroSlideshow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const imgs = containerRef.current?.querySelectorAll<HTMLImageElement>("img");
    if (!imgs || imgs.length < 2) return;
    imgs.forEach((img) => img.decode?.().catch(() => {}));
    let i = 0;
    const id = setInterval(() => {
      imgs[i].classList.remove("is-active");
      i = (i + 1) % imgs.length;
      imgs[i].classList.add("is-active");
    }, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canvas || reduce) return;
    const ctx = canvas.getContext("2d")!;
    const hero = canvas.parentElement!;
    let w = 0, h = 0, raf = 0;

    type P = { x: number; y: number; r: number; vy: number; vx: number; a: number; tw: number; tws: number };
    let ps: P[] = [];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = hero.clientWidth; h = hero.clientHeight;
      canvas!.width = w * dpr; canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`; canvas!.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(70, Math.max(34, w / 22)));
      ps = Array.from({ length: count }, make);
    }
    function make(): P {
      const r = Math.random() * 2.2 + 0.6;
      return { x: Math.random() * w, y: Math.random() * h, r, vy: -(Math.random() * 0.25 + 0.08) - r * 0.04, vx: (Math.random() - 0.5) * 0.25, a: Math.random() * 0.5 + 0.15, tw: Math.random() * Math.PI * 2, tws: Math.random() * 0.02 + 0.005 };
    }
    function tick() {
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        p.y += p.vy; p.x += p.vx + Math.sin(p.tw) * 0.15; p.tw += p.tws;
        if (p.y < -6) { p.y = h + 6; p.x = Math.random() * w; }
        if (p.x < -6) p.x = w + 6;
        if (p.x > w + 6) p.x = -6;
        const alpha = p.a * (0.6 + 0.4 * Math.sin(p.tw));
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,232,205,${alpha})`; ctx.shadowBlur = 6; ctx.shadowColor = "rgba(212,175,55,0.4)"; ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <>
      <div ref={containerRef} className="photo has-img hero-slideshow">
        {SLIDES.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={src} src={src} alt="Anindya & Raditya" className={i === 0 ? "is-active" : ""} />
        ))}
      </div>
      <div className="wd-hero-scrim" />
      <canvas ref={canvasRef} className="wd-hero-particles" />
    </>
  );
}
