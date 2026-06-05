import Image from "next/image";
import { SURAT } from "@/app/lib/tokens";

export function Wordmark({ size = 22, color = SURAT.ink }: { size?: number; color?: string }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <Image
        src="/surat-icon.webp"
        alt=""
        aria-hidden
        width={size}
        height={size}
        style={{ display: "block", width: size, height: size, objectFit: "contain" }}
      />
      <span
        className="sx-serif"
        style={{ fontSize: size * 0.95, fontWeight: 500, color, letterSpacing: "-0.025em", lineHeight: 1 }}
      >
        Surat
      </span>
    </div>
  );
}
