# Surat — AI Form Filler
## Product Requirements Document (PRD)
**Version:** 0.1 (MVP)
**Status:** Draft
**Last updated:** May 2026

---

## 1. Overview

### 1.1 Product summary

Surat adalah Chrome Extension yang memungkinkan user mengisi form di browser secara otomatis hanya dengan mengupload foto atau file dokumen (KTP, NPWP, ijazah, invoice, dll). Surat menggunakan Gemini AI untuk membaca dokumen dan memetakan datanya ke field form yang sedang dibuka user — tanpa perlu ketik ulang.

### 1.2 Problem statement

Orang Indonesia menghabiskan waktu berjam-jam setiap bulan untuk mengetik ulang data yang sudah ada di dokumen fisik mereka ke dalam form digital. Proses ini berulang, membosankan, dan rentan kesalahan. Tidak ada solusi lokal yang menangani dokumen Indonesia (KTP, NPWP, dokumen pemerintah) dengan akurasi yang cukup baik.

**Pain point utama:**
- Onboarding fintech/perbankan meminta data KTP, NPWP, dan dokumen pendukung yang harus diketik manual
- Staff HR, agen asuransi, dan notaris sering mendaftarkan data orang lain dan harus input berulang kali
- Form pemerintah dan institusi memiliki banyak field yang datanya sebenarnya sudah ada di dokumen resmi

### 1.3 Solution

Chrome Extension yang:
1. Menerima upload dokumen (foto atau PDF) dari user
2. Mengirim dokumen ke backend untuk diproses oleh Gemini AI
3. Mengekstrak data terstruktur dari dokumen
4. Membaca DOM form yang sedang dibuka di browser
5. Memetakan data dokumen ke field form yang relevan secara otomatis
6. Mengisi field form via JavaScript injection

### 1.4 Target user

**Primary — Individual user:**
- Usia 20–40 tahun, tech-savvy
- Sering mendaftar layanan fintech, pinjaman, asuransi, atau platform digital
- Frustrasi dengan proses onboarding yang panjang dan repetitif

**Secondary — Professional user (B2B opportunity):**
- Staff HR yang onboarding karyawan baru
- Agen asuransi yang mendaftarkan nasabah
- Notaris dan admin koperasi/BPR yang input data anggota

---

## 2. Goals & success metrics

### 2.1 Business goals

| Goal | Target (3 bulan post-launch) |
|---|---|
| Mencapai BEP | Bulan ke-3 |
| Monthly Recurring Revenue | Rp 1.000.000+ |
| Paid users | 25+ |
| Free users | 150+ |

### 2.2 Product metrics

| Metric | Target |
|---|---|
| Scan success rate (data terekstrak benar) | ≥ 85% |
| Autofill accuracy (field terisi benar) | ≥ 80% |
| Time to first successful autofill | < 30 detik |
| Free → paid conversion rate | ≥ 5% |
| Monthly churn rate | < 10% |

### 2.3 Non-goals (MVP)

- Mobile app
- Support browser selain Chrome (Firefox, Safari, Edge)
- Batch processing banyak dokumen sekaligus
- Fine-tuning model sendiri
- Integrasi langsung dengan API platform (Tokopedia, BRI, dll)
- Offline mode / local processing

---

## 3. User stories

### 3.1 Core flow

**US-01:** Sebagai user, saya ingin mengupload foto KTP saya dari popup extension sehingga datanya bisa diisi otomatis ke form yang sedang saya buka.

**US-02:** Sebagai user, saya ingin mengupload file PDF dokumen sehingga saya tidak perlu mengkonversi file terlebih dahulu.

**US-03:** Sebagai user, saya ingin melihat preview data yang diekstrak sebelum form diisi sehingga saya bisa memverifikasi dan mengoreksi jika ada yang salah.

**US-04:** Sebagai user, saya ingin bisa mengedit nilai yang diekstrak sebelum autofill dijalankan sehingga saya punya kontrol penuh atas data yang diisi.

**US-05:** Sebagai user, saya ingin field yang berhasil diisi ditandai secara visual sehingga saya tahu field mana yang sudah terisi dan mana yang perlu diisi manual.

### 3.2 Account & billing

**US-06:** Sebagai user baru, saya mendapatkan 10 scan gratis tanpa harus mendaftar dulu sehingga saya bisa mencoba produk tanpa friction.

**US-07:** Sebagai user yang sudah habis kuota gratis, saya ingin bisa upgrade ke paket berbayar langsung dari popup extension.

**US-08:** Sebagai user berbayar, saya ingin melihat sisa kuota scan saya di popup sehingga saya tahu kapan perlu topup atau perpanjang langganan.

### 3.3 Error handling

**US-09:** Sebagai user, jika dokumen saya tidak terbaca dengan baik, saya ingin mendapat pesan error yang jelas dan saran untuk upload ulang dengan kualitas lebih baik.

**US-10:** Sebagai user, jika ada field yang tidak bisa diisi otomatis (field DOM-nya tidak dikenali), saya ingin tahu field mana yang perlu diisi manual.

---

## 4. Features

### 4.1 MVP features (v1.0)

#### F-01: Document upload
- Mendukung format: JPG, PNG, WEBP, HEIC (foto), PDF (single dan multi-page)
- Upload via drag-and-drop atau file picker di popup
- Maksimal ukuran file: 10MB
- Preview thumbnail dokumen setelah upload

#### F-02: Document parsing
- Ekstraksi data menggunakan Gemini AI (smart routing: 3.1 Flash-Lite → 3.5 Flash fallback)
- Dokumen yang didukung MVP:
  - KTP (Kartu Tanda Penduduk)
  - NPWP
  - Kartu Keluarga
  - Ijazah / transkrip nilai
  - Invoice / faktur
- Output: structured JSON dengan key-value pairs
- Confidence score per field untuk trigger smart routing

#### F-03: DOM field detection
- Content script scan semua `<input>`, `<select>`, `<textarea>` di halaman aktif
- Ekstrak: `name`, `id`, `placeholder`, `label` yang berasosiasi, `type`, `aria-label`
- Kirim field metadata ke backend untuk LLM mapping

#### F-04: AI field mapping
- LLM memetakan data dokumen ke field form berdasarkan konteks field
- Zero-shot mapping untuk form dengan HTML yang deskriptif
- Curated mapping (database) untuk form high-value yang field-nya tidak deskriptif
- Confidence threshold: field dengan score rendah tidak diisi, di-flag untuk input manual

#### F-05: Autofill execution
- Inject nilai ke field form via JavaScript
- Trigger DOM events (`input`, `change`, `blur`) agar framework frontend (React, Vue, Angular) mengenali perubahan
- Visual highlight field yang berhasil diisi (outline hijau) dan yang di-skip (outline kuning)
- Undo button: batalkan semua autofill dalam 10 detik setelah eksekusi

#### F-06: Data preview & edit
- Sebelum autofill dijalankan, tampilkan tabel data yang diekstrak
- User bisa edit nilai di tabel sebelum konfirmasi
- Toggle per-field: aktifkan/nonaktifkan field tertentu untuk diisi

#### F-07: Auth & usage tracking
- Supabase Auth (email + Google OAuth)
- Free tier: 10 scan/bulan tanpa login, 15 scan/bulan dengan akun gratis
- Usage counter tersimpan di Supabase, di-sync ke extension
- Gate di backend: request ditolak jika kuota habis

#### F-08: Subscription & payment
- Paket Pro: Rp 49.000/bulan — 200 scan, semua tipe dokumen
- Paket Tim: Rp 149.000/bulan — unlimited scan, API access
- Payment via Midtrans (kartu kredit, transfer bank, QRIS)
- Upgrade flow langsung dari popup extension

### 4.2 Post-MVP features (v1.x)

| Feature | Priority | Alasan ditunda |
|---|---|---|
| Curated mapping crowdsourcing (user submit koreksi) | High | Butuh moderation system |
| Multi-document session (simpan beberapa dokumen sekaligus) | High | Kompleksitas UX |
| Riwayat dokumen (re-use data dokumen yang pernah diupload) | Medium | Isu privasi dan storage |
| Firefox support | Medium | Manifest v3 perbedaan |
| Batch mode untuk B2B | Medium | Butuh UI berbeda |
| Local processing option (privasi) | Low | Butuh model kecil yang akurat |

---

## 5. Technical architecture

### 5.1 Tech stack

| Layer | Technology | Alasan |
|---|---|---|
| Extension framework | Plasmo + TypeScript | Hot reload, manifest v3 abstraction, DX cepat |
| Extension UI | React + Tailwind CSS | Built-in di Plasmo |
| PDF processing | pdf.js | Extract teks dari PDF text-based di client |
| Backend | Supabase Edge Functions (Deno/TypeScript) | Single platform, region Singapore, free tier cukup untuk MVP |
| Database | Supabase Postgres | Usage tracking, user data, curated form mappings |
| Auth | Supabase Auth | Terintegrasi dengan DB dan Edge Functions |
| AI model | Gemini 3.1 Flash-Lite (primary) + Gemini 3.5 Flash (fallback) | Cost-efficient dengan smart routing |
| Payment | Midtrans | Lokal, support QRIS dan transfer bank |
| Analytics | Plausible (self-hosted) atau Umami | Privacy-friendly, tidak butuh cookie banner |

### 5.2 Request flow

```
[User upload dokumen di popup]
        ↓
[Extension: client-side PDF text extraction jika PDF text-based]
        ↓
[Extension → Supabase Edge Function]
  Header: Authorization Bearer {supabase_jwt}
  Body: { file: base64, formFields: [...], documentType: "ktp" }
        ↓
[Edge Function: auth check + usage gate]
  - Verifikasi JWT
  - Cek kuota user di DB
  - Tolak jika kuota habis (402)
        ↓
[Edge Function: smart routing]
  - Coba Gemini 3.1 Flash-Lite
  - Jika confidence < 0.75 → retry dengan Gemini 3.5 Flash
        ↓
[Gemini API: OCR + field mapping]
  - Input: image/PDF + form field metadata + system prompt
  - Output: JSON { field_name: value, confidence: 0.0-1.0 }
        ↓
[Edge Function: increment usage counter di DB]
        ↓
[Response ke Extension]
        ↓
[Extension: render preview → user konfirmasi → autofill DOM]
```

### 5.3 Data yang dikirim ke server

Untuk menjaga kepercayaan user, perlu transparansi penuh:

- Gambar/dokumen dikirim ke Edge Function untuk diproses oleh Gemini
- **Gambar/dokumen tidak disimpan di server manapun setelah request selesai**
- Hanya usage metadata yang disimpan: user ID, timestamp, tipe dokumen, jumlah scan
- Data yang diekstrak dari dokumen tidak disimpan di server

Catatan: dokumen tetap melewati Gemini API (Google). Ini harus diungkapkan jelas di privacy policy.

### 5.4 Curated form mapping schema

```sql
CREATE TABLE form_mappings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_hostname TEXT NOT NULL,        -- e.g. "app.kredivo.com"
  form_selector TEXT,                  -- CSS selector form jika ada banyak form
  field_name TEXT NOT NULL,            -- name/id attribute dari input
  document_key TEXT NOT NULL,          -- key dari extracted JSON, e.g. "nik"
  confidence FLOAT DEFAULT 1.0,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 6. UX & design requirements

### 6.1 Popup layout

```
┌─────────────────────────────┐
│  🗂 Surat          [Akun ↗] │
├─────────────────────────────┤
│                             │
│   [ Upload dokumen ]        │
│   Drag & drop atau klik     │
│                             │
│   atau pilih tipe:          │
│   [KTP] [NPWP] [KK] [Lain] │
│                             │
├─────────────────────────────┤
│  Sisa scan: 8/10  [Upgrade] │
└─────────────────────────────┘
```

**Setelah dokumen diupload dan diproses:**

```
┌─────────────────────────────┐
│  ✓ KTP terbaca              │
├─────────────────────────────┤
│  Nama      Budi Santoso  ✎  │
│  NIK       3271xxxx...   ✎  │
│  TTL       Bandung, 05... ✎  │
│  Alamat    Jl. Merdeka... ✎  │
│                             │
│  [Isi form sekarang →]      │
│  [Ubah dokumen]             │
└─────────────────────────────┘
```

### 6.2 Design principles

- Popup maksimal lebar 360px
- Semua aksi utama reachable dengan 1 klik
- Loading state yang jelas saat dokumen sedang diproses (estimasi 2–5 detik)
- Error message harus actionable — bukan "terjadi kesalahan" tapi "foto terlalu gelap, coba foto ulang di tempat terang"
- Tidak ada dark pattern di upgrade flow

### 6.3 Onboarding first-time user

1. Install extension → popup terbuka otomatis dengan walkthrough singkat (3 langkah)
2. Demo dengan dokumen contoh (KTP dummy) agar user bisa coba tanpa risiko
3. Setelah demo berhasil → prompt untuk coba dengan dokumen asli

---

## 7. Privacy & security

### 7.1 Data handling

| Data | Disimpan? | Retensi |
|---|---|---|
| Gambar/dokumen asli | Tidak | Tidak disimpan, hanya diproses in-memory |
| Data terekstrak (nama, NIK, dll) | Tidak | Tidak disimpan di server |
| Usage metadata (jumlah scan, tipe dokumen) | Ya | Selama akun aktif |
| JWT auth token | Di extension storage (lokal) | Sampai user logout |

### 7.2 Security requirements

- HTTPS wajib untuk semua komunikasi extension ↔ backend
- JWT diverifikasi di setiap request ke Edge Function
- Rate limiting di Edge Function: maksimal 60 request/jam per user
- API key Gemini tidak pernah di-expose ke client/extension
- Content Security Policy yang ketat di manifest.json

### 7.3 Chrome Web Store compliance

- Tidak meminta permission yang tidak diperlukan — hanya `activeTab`, `storage`, `identity`
- `host_permissions` dibatasi hanya untuk domain yang diperlukan
- Privacy policy harus live sebelum submit ke Chrome Web Store
- Tidak ada kata "autofill password" di deskripsi (akan kena reject)

---

## 8. Go-to-market

### 8.1 Launch sequence

| Fase | Timing | Aktivitas |
|---|---|---|
| Soft launch | Minggu 5–6 | Submit Chrome Web Store, share ke circle pribadi, minta 10 beta tester |
| Public launch | Minggu 7–8 | Post di komunitas (r/indonesia, grup Facebook fintech, IndieHackers) |
| Growth push | Bulan 3 | Product Hunt launch, TikTok demo, cold outreach ke fintech/koperasi |

### 8.2 Pricing

| Tier | Harga | Kuota | Target user |
|---|---|---|---|
| Free | Rp 0 | 15 scan/bulan | Akuisisi & trial |
| Pro | Rp 49.000/bulan | 200 scan/bulan, semua dokumen | Individual power user |
| Tim | Rp 149.000/bulan | Unlimited scan, API access | Staff HR, agen, admin B2B |

### 8.3 Distribution channels

- Chrome Web Store organic (SEO pada judul dan deskripsi)
- Komunitas online: Reddit, grup Facebook, Discord komunitas startup Indonesia
- Content: demo video singkat di TikTok/Instagram Reels ("cara isi form KTP otomatis")
- Product Hunt (bulan 3)
- Direct outreach ke fintech dan koperasi untuk paket Tim

---

## 9. Risks & mitigations

| Risiko | Likelihood | Dampak | Mitigasi |
|---|---|---|---|
| Chrome Web Store reject saat review | Medium | High | Baca policy detail, siapkan privacy policy, hindari kata sensitif di deskripsi |
| Akurasi OCR rendah untuk dokumen kualitas jelek | High | High | Smart routing ke model lebih kuat, set ekspektasi user via UI, minta foto ulang jika confidence rendah |
| User tidak percaya upload dokumen sensitif | High | High | Transparansi penuh soal data handling, opsi "lihat apa yang dikirim ke server", privacy policy yang jelas |
| Harga Gemini API naik | Low | Medium | Abstraction layer di backend, bisa ganti model tanpa update extension |
| Kompetitor besar (Google, Copilot) tambah fitur serupa | Medium | High | Fokus pada coverage form lokal Indonesia sebagai moat, pivot ke B2B embedded jika perlu |
| Agentic AI (Operator, Computer Use) jadi mainstream | Medium | High | Window 12–18 bulan, fokus monetisasi cepat, pivot ke MCP server / data layer jika traction bagus |

---

## 10. Open questions

- [ ] Apakah perlu simpan "profil dokumen" user untuk re-use di sesi berikutnya? Tradeoff antara convenience vs privasi.
- [ ] Berapa confidence threshold yang tepat untuk trigger fallback dari Flash-Lite ke 3.5 Flash? Perlu ditest dengan dataset dokumen Indonesia nyata.
- [ ] Untuk paket Tim, apakah access API perlu dokumentasi terpisah atau cukup via extension?
- [ ] Nama domain yang tersedia: surat.ai vs usesurat.com vs suratapp.com?
- [ ] Apakah perlu moderasi untuk submission curated form mapping dari user?

---

## 11. Appendix

### 11.1 Dokumen tipe yang akan didukung (roadmap)

| Dokumen | MVP | v1.1 | v1.2 |
|---|---|---|---|
| KTP | ✓ | | |
| NPWP | ✓ | | |
| Kartu Keluarga | ✓ | | |
| Ijazah / Transkrip | ✓ | | |
| Invoice / Faktur | ✓ | | |
| Paspor | | ✓ | |
| SIM | | ✓ | |
| Akta kelahiran | | ✓ | |
| Sertifikat tanah (SHM) | | | ✓ |
| Laporan keuangan | | | ✓ |

### 11.2 Form high-priority untuk curated mapping

Form-form berikut diprioritaskan untuk curated mapping karena traffic tinggi dan HTML-nya sering tidak deskriptif:

- Form KYC fintech (Kredivo, Akulaku, Kredit Pintar)
- Pengajuan KUR di BRI/BNI online
- Form registrasi BPJS Kesehatan online
- Form pendaftaran NPWP online (DJP)
- Form onboarding Neo Bank (Jenius, Jago, Blu)

### 11.3 Referensi

- [Plasmo documentation](https://docs.plasmo.com)
- [Gemini API pricing](https://ai.google.dev/pricing)
- [Chrome Web Store developer policies](https://developer.chrome.com/docs/webstore/program-policies/)
- [Supabase Edge Functions docs](https://supabase.com/docs/guides/functions)
- [Midtrans integration docs](https://docs.midtrans.com)
