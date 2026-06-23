// Catalog data — wedding invitation design themes.
// Each theme is a self-contained look: palette, motif, photo usage, price, category.

export type Theme = {
  id: string;
  name: string;
  cat: string;
  price: number;
  popular?: boolean;
  tpl: string;
  cover?: string;
  accent: string;
  bg: string;
  ink: string;
  ink2: string;
  dark?: boolean;
  motif: string;
  photo: boolean;
  quote: string;
  demoUrl?: string;
};

export type Package = {
  id: string;
  name: string;
  add: number;
  popular?: boolean;
  features: string[];
};

export const INVITE_THEMES: Theme[] = [
  {
    id: "noir", name: "Elegant Magazine", cat: "Modern", price: 129000, popular: true,
    tpl: "magazine", cover: "/catalog-magazine-cover.jpg",
    accent: "#cda24b", bg: "#161310", ink: "#f4ede1", ink2: "#a99c87",
    dark: true, motif: "rule", photo: true,
    demoUrl: "/undangan/anindya-raditya",
    quote: "Dua nama, satu kisah yang baru saja dimulai.",
  },
  {
    id: "boho", name: "Boho Klasik", cat: "Klasik", price: 99000,
    tpl: "boho",
    accent: "#9A5B43", bg: "#FBF7EF", ink: "#4A3F33", ink2: "#7E715F",
    motif: "diamond", photo: true,
    demoUrl: "/undangan/kayla-raka",
    quote: "Kepercayaan membuat semua hal menjadi mungkin, dan cinta membuat semua hal menjadi mudah.",
  },
];

export const INVITE_CATS = ["Semua", "Modern", "Klasik"];

// Order packages (shared across themes; price adds to the theme base)
export const INVITE_PACKAGES: Package[] = [
  { id: "basic", name: "Basic", add: 0, features: ["Undangan digital 1 link", "RSVP kehadiran tamu", "Peta lokasi Google Maps", "Hitung mundur acara"] },
  { id: "plus", name: "Plus", add: 50000, popular: true, features: ["Semua fitur Basic", "Galeri foto & musik", "Amplop digital (gift)", "Ucapan & doa tamu"] },
  { id: "premium", name: "Premium", add: 120000, features: ["Semua fitur Plus", "Video & live streaming", "Buku tamu QR check-in", "Nama link custom", "Revisi tanpa batas"] },
];

export const rupiah = (n: number) => "Rp" + n.toLocaleString("id-ID");
