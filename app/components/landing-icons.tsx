import { SVGProps } from "react";

type SvgProps = SVGProps<SVGSVGElement>;

export const LIcon = {
  Puzzle: (p: SvgProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M9 3a1.8 1.8 0 0 1 3.6 0c0 .5-.2 1 .2 1.4.3.3.8.3 1.2.3H17a1 1 0 0 1 1 1v3.1c0 .4 0 .9.3 1.2.4.4.9.2 1.4.2a1.8 1.8 0 0 1 0 3.6c-.5 0-1-.2-1.4.2-.3.3-.3.8-.3 1.2V19a1 1 0 0 1-1 1h-3.1c-.4 0-.9 0-1.2.3-.4.4-.2.9-.2 1.4a1.8 1.8 0 0 1-3.6 0c0-.5.2-1-.2-1.4-.3-.3-.8-.3-1.2-.3H5a1 1 0 0 1-1-1v-3.1c0-.4 0-.9-.3-1.2-.4-.4-.9-.2-1.4-.2a1.8 1.8 0 0 1 0-3.6c.5 0 1 .2 1.4-.2.3-.3.3-.8.3-1.2V6a1 1 0 0 1 1-1h3.1c.4 0 .9 0 1.2-.3.4-.4.2-.9.2-1.4z"/>
    </svg>
  ),
  Shield: (p: SvgProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3l7 3v5c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6l7-3z"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  ),
  Eye: (p: SvgProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Trash: (p: SvgProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"/>
    </svg>
  ),
  Bolt: (p: SvgProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z"/>
    </svg>
  ),
  Upload: (p: SvgProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 16V4M12 4l-4 4M12 4l4 4"/>
      <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>
    </svg>
  ),
  Scan: (p: SvgProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 7V5a1 1 0 0 1 1-1h2M17 4h2a1 1 0 0 1 1 1v2M20 17v2a1 1 0 0 1-1 1h-2M7 20H5a1 1 0 0 1-1-1v-2"/>
      <path d="M4 12h16"/>
    </svg>
  ),
  Wand: (p: SvgProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 19l9-9M14 6l1.5-1.5M19 11l1.5-1.5M14.5 4.5L16 3M9 4l.6 1.8L11.4 6.4 9.6 7 9 8.8 8.4 7 6.6 6.4 8.4 5.8 9 4z"/>
    </svg>
  ),
  Plus: (p: SvgProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 5v14M5 12h14"/>
    </svg>
  ),
  Globe: (p: SvgProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9"/>
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/>
    </svg>
  ),
  Clock: (p: SvgProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 7v5l3 2"/>
    </svg>
  ),
};
