import type { Metadata } from "next";
import { EditorApp } from "./_components/editor-app";

export const metadata: Metadata = {
  title: "Editor Undangan — Surat",
  description: "Sesuaikan nama, tanggal, foto, dan tema undangan pernikahan digital Anda secara langsung.",
};

export default function EditorPage() {
  return <EditorApp />;
}
