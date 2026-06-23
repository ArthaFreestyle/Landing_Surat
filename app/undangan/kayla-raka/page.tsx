import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Pinyon_Script, Plus_Jakarta_Sans, Amiri } from "next/font/google";
import { BohoInvitation } from "./_components/boho-invitation";
import "./boho.css";

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
  title: "Undangan Pernikahan — Kayla & Raka · 14 November 2026",
  description:
    "Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di pernikahan Kayla & Raka, Sabtu 14 November 2026 di Pendopo Kayangan, Yogyakarta.",
};

export const viewport: Viewport = {
  themeColor: "#FBF7EF",
};

export default function KaylaRakaPage() {
  return (
    <div className={`${cormorant.variable} ${pinyon.variable} ${jakarta.variable} ${amiri.variable}`}>
      <BohoInvitation />
    </div>
  );
}
