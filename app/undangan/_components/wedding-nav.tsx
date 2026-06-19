"use client";
import { useEffect, useRef } from "react";

export function WeddingNav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onScroll = () =>
      nav.classList.toggle("scrolled", window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav ref={navRef} className="wd-nav">
      <div className="wd-monogram">A&nbsp;&amp;&nbsp;R</div>
      <div className="wd-nav-links">
        <a href="#story" className="nav-hide">Kisah</a>
        <a href="#gallery" className="nav-hide">Galeri</a>
        <a href="#details">Acara</a>
        <a href="#ucapan" className="nav-cta">Ucapan</a>
      </div>
    </nav>
  );
}
