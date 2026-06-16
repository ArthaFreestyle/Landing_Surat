import type { Metadata } from "next";
import { Catalog } from "../components/catalog-app";

export const metadata: Metadata = {
  title: "Katalog Undangan — Surat",
  description: "Pilih desain undangan pernikahan digital, lihat demonya secara utuh, lalu pesan. Bisa dibagikan lewat link, lengkap dengan RSVP dan peta lokasi.",
};

export default function KatalogPage() {
  return <Catalog />;
}
