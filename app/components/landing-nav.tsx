"use client";

import { useState, useEffect } from "react";
import { Wordmark } from "./wordmark";
import { LIcon } from "./landing-icons";

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={"lp-nav" + (scrolled ? " scrolled" : "")}>
      <div className="lp-container lp-nav-inner">
        <Wordmark size={24} />
        <div className="lp-nav-links">
          <a className="lp-link" href="#cara-kerja">Cara kerja</a>
          <a className="lp-link" href="#privasi">Privasi</a>
          <a className="lp-link" href="#harga">Harga</a>
          <a className="lp-link" href="#faq">FAQ</a>
        </div>
        <button className="lp-btn lp-btn-primary lp-nav-cta" style={{ padding: "11px 18px", fontSize: 14.5 }}>
          <LIcon.Puzzle width={17} height={17} />
          <span className="lp-nav-cta-label">Tambahkan ke Chrome</span>
        </button>
      </div>
    </nav>
  );
}
