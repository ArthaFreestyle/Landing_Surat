import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Pinyon_Script, Plus_Jakarta_Sans, Amiri } from "next/font/google";
import { PilarInvitation } from "./_components/pilar-invitation";
import "./pilar.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  variable: "--font-pinyon",
  weight: "400",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  variable: "--font-amiri",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Undangan Pernikahan — Ratna & Ikhsan · 19 September 2026",
  description:
    "Dengan memohon rahmat dan ridha Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di pernikahan Ratna & Ikhsan, Sabtu 19 September 2026 di Celebes Convention Centre, Makassar.",
};

export const viewport: Viewport = {
  themeColor: "#0c2a20",
};

export default function RatnaIkhsanPage() {
  return (
    <div className={`${cormorant.variable} ${pinyon.variable} ${jakarta.variable} ${amiri.variable}`}>
      <PilarInvitation />
    </div>
  );
}
