import type { Metadata } from "next";
import { LandingNav } from "@/app/components/landing-nav";
import { Footer } from "@/app/components/landing-footer";
import { LIcon } from "@/app/components/landing-icons";

export const metadata: Metadata = {
  title: "Kebijakan Privasi — Surat",
  description:
    "Surat memproses dokumen sensitif. Halaman ini menjelaskan apa yang kami terima, kemana data dikirim, berapa lama disimpan, dan kontrol apa saja yang Anda miliki.",
};

const SECTIONS = [
  { n: "01", id: "pendahuluan",    title: "Pendahuluan" },
  { n: "02", id: "data",           title: "Data yang kami kumpulkan" },
  { n: "03", id: "pemrosesan",     title: "Bagaimana dokumen Anda diproses" },
  { n: "04", id: "sub-processor",  title: "Pihak ketiga (sub-processor)" },
  { n: "05", id: "retensi",        title: "Penyimpanan & retensi" },
  { n: "06", id: "hak-anda",       title: "Hak Anda" },
  { n: "07", id: "keamanan",       title: "Keamanan" },
  { n: "08", id: "cookies",        title: "Cookies & analitik" },
  { n: "09", id: "anak",           title: "Anak-anak" },
  { n: "10", id: "perubahan",      title: "Perubahan kebijakan" },
  { n: "11", id: "kontak",         title: "Kontak" },
];

function PrivacyHero() {
  return (
    <header className="lp-pp-hero">
      <div className="lp-container">
        <div className="lp-pp-index">
          <span>Dokumen Legal</span>
          <span className="rule" />
          <span>02 / 04</span>
        </div>
        <h1 className="lp-pp-h1">Kebijakan Privasi.</h1>
        <p className="lp-pp-lede">
          Surat memproses dokumen sensitif — KTP, NPWP, nota, invoice. Halaman ini
          menjelaskan apa yang kami terima, kemana data dikirim, berapa lama disimpan,
          dan kontrol apa saja yang Anda miliki. Tanpa istilah berbelit.
        </p>
        <div className="lp-pp-meta">
          <span>Berlaku 1 Juni 2026</span>
          <span className="sep" />
          <span>Versi 1.0</span>
          <span className="sep" />
          <span>Untuk pengguna di Indonesia</span>
        </div>

        <aside className="lp-pp-tldr">
          <div className="lp-pp-tldr-head">
            <span className="lp-pp-tldr-eyebrow">Ringkasan</span>
            <h2 className="lp-pp-tldr-title">Empat hal yang perlu Anda tahu.</h2>
          </div>
          <div className="lp-pp-tldr-grid">
            <div className="lp-pp-tldr-item">
              <span className="lp-pp-tldr-num">01</span>
              <p><strong>Dokumen tidak disimpan.</strong> Foto dan PDF Anda diproses sesaat, lalu dilepas dari memori begitu hasil ekstraksi dikirim balik ke ekstensi.</p>
            </div>
            <div className="lp-pp-tldr-item">
              <span className="lp-pp-tldr-num">02</span>
              <p><strong>Hanya satu mesin AI.</strong> Kami meneruskan dokumen ke Google Gemini API. Tidak ada layanan AI lain yang menerima data Anda.</p>
            </div>
            <div className="lp-pp-tldr-item">
              <span className="lp-pp-tldr-num">03</span>
              <p><strong>Hanya metadata yang tersimpan.</strong> Jumlah scan, tipe dokumen, dan mode — tidak ada isi dokumen yang pernah dilihat manusia.</p>
            </div>
            <div className="lp-pp-tldr-item">
              <span className="lp-pp-tldr-num">04</span>
              <p><strong>Anda bisa hapus kapan saja.</strong> Akun dan semua data terkait dapat dihapus dari pengaturan ekstensi dalam satu klik.</p>
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
}

function PrivacyTOC() {
  return (
    <aside className="lp-pp-toc">
      <div className="lp-pp-toc-label">Isi halaman</div>
      <ol>
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`}>
              <span className="n">{s.n}</span>
              <span>{s.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}

function PrivacyBody() {
  return (
    <main className="lp-pp-content">
      {/* 01 */}
      <section id="pendahuluan" className="lp-pp-section">
        <div className="lp-pp-section-num">01 — Pendahuluan</div>
        <h2>Tentang kebijakan ini.</h2>
        <p>
          Surat adalah ekstensi Chrome yang membantu Anda mengisi formulir dan
          spreadsheet otomatis dari foto dokumen — KTP, NPWP, Kartu Keluarga,
          ijazah, invoice, nota barang masuk, struk kasir, dan catatan stok harian.
          Karena pekerjaan ini menyentuh dokumen yang sangat pribadi, kami menulis
          kebijakan privasi ini agar Anda tahu persis apa yang terjadi pada data Anda.
        </p>
        <p>
          Kebijakan ini berlaku untuk ekstensi Surat di Chrome Web Store, situs{" "}
          <span className="lp-mono">surat.id</span>, dan layanan terkait. Dengan
          memasang atau menggunakan Surat, Anda menyetujui praktik yang dijelaskan
          di sini.
        </p>
        <p>
          Pengendali data (<em>data controller</em>) adalah tim Surat. Penyedia
          infrastruktur kami bertindak sebagai pemroses data (<em>processor</em>) —
          rincian ada di Bagian 04.
        </p>
      </section>

      {/* 02 */}
      <section id="data" className="lp-pp-section">
        <div className="lp-pp-section-num">02 — Data</div>
        <h2>Data yang kami kumpulkan.</h2>
        <p>Kami berusaha mengumpulkan seminimal mungkin. Berikut daftar lengkapnya:</p>

        <table className="lp-pp-table">
          <thead>
            <tr>
              <th>Jenis data</th>
              <th>Disimpan?</th>
              <th>Tujuan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gambar / PDF dokumen yang Anda unggah</td>
              <td><span className="lp-pp-pill no">Tidak</span></td>
              <td>Diteruskan ke Gemini untuk ekstraksi, lalu dilepas dari memori.</td>
            </tr>
            <tr>
              <td>Hasil ekstraksi (nama, NIK, item nota, dll.)</td>
              <td><span className="lp-pp-pill no">Tidak</span></td>
              <td>Dikirim langsung ke ekstensi Anda — tidak diarsipkan di server.</td>
            </tr>
            <tr>
              <td>Metadata penggunaan (timestamp, tipe dokumen, mode, jumlah scan)</td>
              <td><span className="lp-pp-pill yes">Ya</span></td>
              <td>Menghitung kuota, mendeteksi penyalahgunaan, perbaikan produk.</td>
            </tr>
            <tr>
              <td>Akun: email, nama tampilan, ID Google (jika OAuth)</td>
              <td><span className="lp-pp-pill yes">Ya</span></td>
              <td>Autentikasi, kontak terkait layanan, billing.</td>
            </tr>
            <tr>
              <td>Template kolom spreadsheet (jika Anda menyimpannya)</td>
              <td><span className="lp-pp-pill yes">Ya</span></td>
              <td>Memetakan dokumen ke spreadsheet Anda di sesi berikutnya.</td>
            </tr>
            <tr>
              <td>Data billing (4 digit terakhir kartu, ID transaksi Midtrans)</td>
              <td><span className="lp-pp-pill yes">Ya</span></td>
              <td>Pembuktian pembayaran, invoice, dukungan pelanggan.</td>
            </tr>
            <tr>
              <td>JWT auth token</td>
              <td><span className="lp-pp-pill local">Lokal</span></td>
              <td>Disimpan di <span className="lp-mono">chrome.storage</span> hingga Anda logout.</td>
            </tr>
          </tbody>
        </table>

        <h3>Yang tidak kami kumpulkan.</h3>
        <ul>
          <li>Riwayat penjelajahan, URL yang Anda kunjungi, atau isi tab lain di luar tab tempat Anda mengaktifkan Surat.</li>
          <li>Password atau kredensial dari form yang sedang Anda isi.</li>
          <li>Konten form atau spreadsheet yang sudah ada sebelum Surat menambahkan datanya.</li>
          <li>Data biometrik, lokasi geografis presisi, atau identitas perangkat.</li>
        </ul>
      </section>

      {/* 03 */}
      <section id="pemrosesan" className="lp-pp-section">
        <div className="lp-pp-section-num">03 — Pemrosesan</div>
        <h2>Bagaimana dokumen Anda diproses.</h2>
        <p>
          Alur singkatnya: dokumen Anda masuk ke ekstensi, dikirim sekali jalan ke
          backend, diteruskan ke Gemini, dan hasil ekstraksi dikirim balik ke Anda.
          Tidak ada penyimpanan di antaranya.
        </p>

        <h3>Langkah demi langkah.</h3>
        <ul>
          <li><strong>Klien.</strong> Untuk PDF berbasis teks, ekstensi mengambil teks di sisi klien menggunakan <span className="lp-mono">pdf.js</span> — tanpa mengunggah file mentah jika tidak perlu.</li>
          <li><strong>Transport.</strong> File dikirim via HTTPS ke Supabase Edge Function di region Singapura. Token JWT diverifikasi sebelum permintaan diproses.</li>
          <li><strong>Inference.</strong> Edge Function meneruskan gambar/PDF ke Gemini API beserta daftar field formulir atau kolom spreadsheet target. Kami menggunakan smart routing: Gemini 3.1 Flash-Lite terlebih dulu, fallback ke 3.5 Flash jika confidence rendah.</li>
          <li><strong>Response.</strong> Gemini mengembalikan JSON terstruktur. Edge Function menambahkan satu hitungan ke kuota Anda, lalu mengirim JSON ke ekstensi.</li>
          <li><strong>Pembuangan.</strong> Begitu response terkirim, buffer file di Edge Function dilepas. Tidak ada salinan file yang ditulis ke disk atau penyimpanan blob.</li>
          <li><strong>Eksekusi lokal.</strong> Pengisian form, penambahan baris di Google Sheets, atau pengunduhan CSV/XLSX/JSON terjadi di browser Anda — bukan di server kami.</li>
        </ul>

        <div className="lp-pp-callout">
          <div className="ico"><LIcon.Eye width={20} height={20} /></div>
          <p>
            <strong>Anda selalu mengontrol langkah akhir.</strong> Sebelum Surat mengisi
            form atau menambahkan baris ke spreadsheet, hasil ekstraksi ditampilkan
            dalam tabel yang bisa Anda edit, tambah, atau batalkan. Tombol Undo
            tersedia 10 detik setelah autofill atau insert.
          </p>
        </div>
      </section>

      {/* 04 */}
      <section id="sub-processor" className="lp-pp-section">
        <div className="lp-pp-section-num">04 — Sub-processor</div>
        <h2>Pihak ketiga yang terlibat.</h2>
        <p>
          Kami menggunakan beberapa vendor untuk menjalankan layanan. Mereka menerima
          data Anda hanya sebatas yang diperlukan dan terikat oleh perjanjian
          pemrosesan data mereka sendiri.
        </p>

        <div className="lp-pp-vendors">
          <div className="lp-pp-vendor">
            <div className="name"><span>Google Gemini API</span><span className="region">US / Global</span></div>
            <div className="role">AI inference</div>
            <p>Menerima gambar/PDF Anda untuk OCR dan pemetaan data. Sesuai kebijakan Google, prompt dari Gemini API berbayar tidak digunakan untuk melatih model.</p>
          </div>
          <div className="lp-pp-vendor">
            <div className="name"><span>Supabase</span><span className="region">SG (Singapore)</span></div>
            <div className="role">Backend, DB, auth</div>
            <p>Menjalankan Edge Functions, menyimpan akun &amp; metadata penggunaan di Postgres. Data berada di region Asia Tenggara.</p>
          </div>
          <div className="lp-pp-vendor">
            <div className="name"><span>Midtrans</span><span className="region">ID (Indonesia)</span></div>
            <div className="role">Pembayaran</div>
            <p>Memproses pembayaran kartu, transfer bank, dan QRIS. Kami tidak pernah menyimpan nomor kartu lengkap atau detail rekening.</p>
          </div>
          <div className="lp-pp-vendor">
            <div className="name"><span>Plausible / Umami</span><span className="region">EU</span></div>
            <div className="role">Analitik web</div>
            <p>Hanya untuk situs <span className="lp-mono">surat.id</span>. Tanpa cookie, tanpa pelacakan lintas situs, tanpa fingerprint perangkat.</p>
          </div>
        </div>

        <p>
          Karena Gemini API berjalan di luar yurisdiksi Indonesia, sebagian
          pemrosesan terjadi <strong>lintas batas (cross-border)</strong>. Dengan menggunakan
          Surat, Anda menyetujui transfer ini sebagaimana diperbolehkan UU Pelindungan
          Data Pribadi (UU PDP) Pasal 56.
        </p>
      </section>

      {/* 05 */}
      <section id="retensi" className="lp-pp-section">
        <div className="lp-pp-section-num">05 — Retensi</div>
        <h2>Berapa lama data disimpan.</h2>
        <ul>
          <li><strong>Dokumen mentah &amp; hasil ekstraksi:</strong> 0 detik di server kami — tidak ada salinan setelah response terkirim.</li>
          <li><strong>Metadata penggunaan:</strong> Selama akun Anda aktif, plus 12 bulan untuk keperluan akuntansi dan audit.</li>
          <li><strong>Akun &amp; template kolom:</strong> Hingga Anda menghapusnya. Penghapusan akun memicu pembersihan data terkait dalam 30 hari.</li>
          <li><strong>Data billing:</strong> 10 tahun sesuai kewajiban arsip pajak Indonesia (UU KUP).</li>
          <li><strong>Log keamanan Edge Function:</strong> 30 hari, lalu dihapus otomatis.</li>
        </ul>
      </section>

      {/* 06 */}
      <section id="hak-anda" className="lp-pp-section">
        <div className="lp-pp-section-num">06 — Hak Anda</div>
        <h2>Hak Anda sebagai pemilik data.</h2>
        <p>Berdasarkan UU PDP, Anda berhak untuk:</p>
        <ul>
          <li><strong>Akses</strong> — melihat data yang kami simpan tentang Anda.</li>
          <li><strong>Koreksi</strong> — memperbaiki data yang keliru atau usang.</li>
          <li><strong>Penghapusan</strong> — meminta kami menghapus akun dan data terkait.</li>
          <li><strong>Portabilitas</strong> — meminta export data dalam format yang bisa dibaca mesin (JSON).</li>
          <li><strong>Penarikan persetujuan</strong> — berhenti memberi izin Surat memproses dokumen Anda kapan saja dengan mencopot ekstensi.</li>
          <li><strong>Keberatan</strong> — menolak pemrosesan tertentu, termasuk komunikasi pemasaran.</li>
        </ul>
        <p>
          Permintaan dapat dikirim ke{" "}
          <a href="mailto:privasi@surat.id">privasi@surat.id</a>.
          Kami berusaha merespons dalam 7 hari kerja, paling lambat 30 hari sebagaimana
          diatur UU PDP.
        </p>
      </section>

      {/* 07 */}
      <section id="keamanan" className="lp-pp-section">
        <div className="lp-pp-section-num">07 — Keamanan</div>
        <h2>Bagaimana kami menjaga data.</h2>
        <ul>
          <li>Semua komunikasi ekstensi ↔ backend menggunakan <strong>HTTPS / TLS 1.2+</strong>.</li>
          <li>Setiap permintaan ke Edge Function diverifikasi dengan JWT yang ditandatangani Supabase Auth.</li>
          <li><strong>Rate limit</strong> 60 permintaan per jam per pengguna untuk mencegah penyalahgunaan.</li>
          <li>Kunci API Gemini disimpan sebagai secret di Edge Function — tidak pernah ter-expose ke ekstensi atau klien.</li>
          <li>Manifest ekstensi menerapkan <strong>Content Security Policy</strong> yang ketat dan hanya meminta izin minimal: <span className="lp-mono">activeTab</span>, <span className="lp-mono">storage</span>, <span className="lp-mono">identity</span>, <span className="lp-mono">downloads</span>.</li>
          <li><span className="lp-mono">host_permissions</span> dibatasi pada domain yang relevan saja: backend kami, <span className="lp-mono">docs.google.com</span>, dan <span className="lp-mono">officeapps.live.com</span>.</li>
          <li>Tidak ada karyawan Surat yang dapat melihat isi dokumen Anda — yang ada hanya dasbor agregat metadata penggunaan.</li>
        </ul>
        <p>
          Meskipun begitu, tidak ada sistem online yang sepenuhnya kebal. Jika kami
          mengetahui adanya pelanggaran data yang memengaruhi Anda, kami akan
          memberitahukan dalam <strong>3 × 24 jam</strong> sesuai ketentuan UU PDP Pasal 46.
        </p>
      </section>

      {/* 08 */}
      <section id="cookies" className="lp-pp-section">
        <div className="lp-pp-section-num">08 — Analitik</div>
        <h2>Cookies &amp; analitik.</h2>
        <p>
          Ekstensi Surat tidak menggunakan cookie pelacak. Situs{" "}
          <span className="lp-mono">surat.id</span> menggunakan analitik bebas-cookie
          (Plausible atau Umami) yang hanya mengukur jumlah kunjungan dan halaman
          populer secara agregat — tanpa profil individu, tanpa fingerprinting,
          tanpa pelacakan lintas situs.
        </p>
        <p>
          Cookie esensial digunakan hanya untuk menjaga sesi login Anda saat membuka
          dasbor langganan di situs.
        </p>
      </section>

      {/* 09 */}
      <section id="anak" className="lp-pp-section">
        <div className="lp-pp-section-num">09 — Anak-anak</div>
        <h2>Anak-anak.</h2>
        <p>
          Surat tidak ditujukan untuk pengguna di bawah usia 17 tahun. Kami tidak
          secara sengaja mengumpulkan data anak. Jika Anda mengetahui anak di bawah
          umur menggunakan Surat dengan dokumen mereka, mohon hubungi kami dan kami
          akan menghapus akun terkait.
        </p>
      </section>

      {/* 10 */}
      <section id="perubahan" className="lp-pp-section">
        <div className="lp-pp-section-num">10 — Perubahan</div>
        <h2>Perubahan kebijakan.</h2>
        <p>
          Kami dapat memperbarui kebijakan ini seiring perubahan produk atau hukum.
          Versi terbaru selalu tersedia di halaman ini, dengan tanggal berlaku di bagian
          atas. Perubahan material akan diumumkan melalui email ke akun terdaftar
          dan/atau notifikasi di dalam ekstensi minimal 14 hari sebelum berlaku.
        </p>
      </section>

      {/* 11 */}
      <section id="kontak" className="lp-pp-section">
        <div className="lp-pp-section-num">11 — Kontak</div>
        <h2>Hubungi kami.</h2>
        <p>Pertanyaan, keberatan, atau permintaan terkait data Anda dapat dikirim ke:</p>
        <div className="lp-pp-contact">
          <div>
            <div className="label">Email privasi</div>
            <div className="val">privasi@surat.id</div>
          </div>
          <div>
            <div className="label">Dukungan umum</div>
            <div className="val">halo@surat.id</div>
          </div>
          <div>
            <div className="label">Penanggung jawab data</div>
            <div className="val">Tim Surat — Data Protection Officer</div>
          </div>
          <div>
            <div className="label">Alamat</div>
            <div className="val">Jakarta, Indonesia</div>
          </div>
        </div>
        <p style={{ marginTop: 20 }}>
          Jika Anda merasa permintaan tidak ditangani dengan baik, Anda berhak
          mengajukan pengaduan ke Lembaga Pelindungan Data Pribadi setelah lembaga
          tersebut beroperasi penuh, atau ke Kementerian Komunikasi dan Digital
          Republik Indonesia.
        </p>
      </section>
    </main>
  );
}

export default function PrivacyPage() {
  return (
    <div className="lp">
      <LandingNav />
      <PrivacyHero />
      <section className="lp-pp-body">
        <div className="lp-container">
          <div className="lp-pp-grid">
            <PrivacyTOC />
            <PrivacyBody />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
