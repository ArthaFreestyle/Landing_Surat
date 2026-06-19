import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WeddingNav } from "../_components/wedding-nav";
import { HeroSlideshow } from "../_components/hero-slideshow";
import { Countdown } from "../_components/countdown";
import { CopyBtn } from "../_components/copy-btn";
import { WishesSection } from "../_components/wishes";
import { Reveals } from "../_components/reveals";

const GALLERY = [
  { src: "/uploads/pexels-marvin-malmis-ponce-13470034-scaled-1.webp", label: "persiapan" },
  { src: "/uploads/pexels-marvin-malmis-ponce-13470072-scaled-1-1.webp", label: "momen sakral" },
  { src: "/uploads/pexels-marvin-malmis-ponce-13470037-scaled-1.webp", label: "first look" },
  { src: "/uploads/pexels-marvin-malmis-ponce-13470047-scaled-1.webp", label: "tawa" },
  { src: "/uploads/pexels-marvin-malmis-ponce-13470064-scaled-1.webp", label: "golden hour" },
  { src: "/uploads/pexels-marvin-malmis-ponce-13470063-scaled-1.webp", label: "berdua" },
];

export function generateStaticParams() {
  return [{ slug: "anindya-raditya" }];
}

export async function generateMetadata(props: PageProps<"/undangan/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  if (slug !== "anindya-raditya") return {};
  return {
    title: "Pernikahan Anindya & Raditya — 12 September 2026",
    description: "Dengan memohon rahmat dan rido Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menyaksikan pernikahan kami di Ubud, Bali.",
  };
}

export default async function WeddingPage(props: PageProps<"/undangan/[slug]">) {
  const { slug } = await props.params;
  if (slug !== "anindya-raditya") notFound();

  return (
    <div className="wd">
      <Reveals />
      <WeddingNav />

      {/* ── HERO ── */}
      <header className="wd-hero">
        <HeroSlideshow />
        <div className="wd-hero-inner">
          <p className="wd-eyebrow-hero hero-anim d1">Dengan memohon rahmat dan rido Tuhan Yang Maha Esa</p>
          <h1 className="wd-hero-title">
            <span className="line">Anindya</span>
            <span className="amp">&amp;</span>
            <span className="line">Raditya</span>
          </h1>
          <p className="wd-hero-date hero-anim d3">
            Sabtu <span>·</span> 12 September 2026 <span>·</span> Ubud, Bali
          </p>
        </div>
        <div className="wd-scroll-cue">
          <span>Geser</span>
          <div className="wd-scroll-line" />
        </div>
      </header>

      {/* ── MEMPELAI ── */}
      <section id="couple" className="pad">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">The Bride &amp; The Groom</span>
            <h2>Mempelai</h2>
          </div>
          <div className="couple-photo reveal">
            <div className="photo has-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/uploads/pexels-marvin-malmis-ponce-13470034-scaled-1.webp" alt="Anindya & Raditya" loading="lazy" />
            </div>
          </div>
          <div className="couple-names reveal">
            <div className="person">
              <h3>Anindya Larasati</h3>
              <p className="role">Putri Bungsu dari</p>
              <p className="parents">Bapak H. Suryana Wijaya<br />&amp; Ibu Hj. Mariati Salim</p>
            </div>
            <div className="couple-amp">&amp;</div>
            <div className="person">
              <h3>Raditya Wibisana</h3>
              <p className="role">Putra Sulung dari</p>
              <p className="parents">Bapak Hendarto Pranoto<br />&amp; Ibu Retno Kusumawati</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── KISAH KAMI ── */}
      <section id="story" className="pad">
        <div className="wrap">
          <div className="story">
            <div className="photo has-img reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/uploads/pexels-marvin-malmis-ponce-13470063-scaled-1.webp" alt="Anindya & Raditya" />
            </div>
            <div className="story-text reveal">
              <span className="eyebrow">QS. Ar-Rum : 21</span>
              <p className="story-quote">
                &ldquo;Dan di antara tanda-tanda kekuasaan-Nya, Dia menciptakan untukmu pasangan dari jenismu sendiri, agar kamu cenderung dan merasa{" "}
                <span className="gold">tenteram</span> kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.&rdquo;
              </p>
              <p className="story-body">
                Dengan memohon rahmat dan rido Allah Subhanahu wa Ta&apos;ala, kami bermaksud menyelenggarakan pernikahan kami.
                Merupakan suatu kebahagiaan dan kehormatan bagi kami sekeluarga apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALERI ── */}
      <section id="gallery" className="gallery-band pad">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Galeri</span>
            <h2>Momen</h2>
            <p className="sub">Kumpulan bingkai dari perjalanan kami berdua.</p>
          </div>
          <div className="masonry">
            {GALLERY.map((item) => (
              <div key={item.src} className="photo has-img" data-label={item.label}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="ph-fill" src={item.src} alt={item.label} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACARA ── */}
      <section id="details" className="pad">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Acara</span>
            <h2>Waktu &amp; Tempat</h2>
            <p className="sub">Dengan penuh suka cita, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan menjadi saksi di hari bahagia kami.</p>
          </div>
          <div className="details-grid reveal">
            <div className="event">
              <h3>Akad Nikah</h3>
              <p className="when">Sabtu, 12 September 2026</p>
              <div className="hairline" />
              <p className="line">Pukul 16.00 WITA</p>
              <p className="venue">Pura Taman Saraswati</p>
              <p className="line">Jl. Kajeng, Ubud, Bali</p>
              <a className="map-btn" href="https://www.google.com/maps/dir/?api=1&destination=Pura+Taman+Saraswati+Ubud+Bali" target="_blank" rel="noopener noreferrer">
                Petunjuk Arah
              </a>
            </div>
            <div className="v-divider" />
            <div className="event">
              <h3>Resepsi</h3>
              <p className="when">Sabtu, 12 September 2026</p>
              <div className="hairline" />
              <p className="line">Pukul 19.00 WITA</p>
              <p className="venue">The Garden Pavilion</p>
              <p className="line">Four Seasons, Sayan, Ubud</p>
              <a className="map-btn" href="https://www.google.com/maps/dir/?api=1&destination=Four+Seasons+Resort+Bali+at+Sayan+Ubud" target="_blank" rel="noopener noreferrer">
                Petunjuk Arah
              </a>
            </div>
          </div>
          <Countdown />
        </div>
      </section>

      {/* ── TANDA KASIH ── */}
      <section id="gift" className="gift-band pad">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Tanda Kasih</span>
            <h2>Wedding Gift</h2>
            <p className="sub">Doa restu Bapak/Ibu/Saudara/i merupakan karunia yang sangat berarti bagi kami. Namun apabila memberi adalah ungkapan tanda kasih, dengan senang hati kami menerimanya melalui rekening berikut.</p>
          </div>
          <div className="gift-grid reveal">
            <div className="bank-card">
              <span className="bank-name">Bank BCA</span>
              <div className="bank-no">1234 5678 90</div>
              <span className="bank-holder">a.n. Anindya Larasati</span>
              <CopyBtn accountNum="1234567890" />
            </div>
            <div className="bank-card">
              <span className="bank-name">Bank Mandiri</span>
              <div className="bank-no">0987 6543 21</div>
              <span className="bank-holder">a.n. Raditya Wibisana</span>
              <CopyBtn accountNum="0987654321" />
            </div>
          </div>
        </div>
      </section>

      {/* ── UCAPAN & DOA ── */}
      <section id="ucapan" className="pad">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Ucapan &amp; Doa</span>
            <h2>Kirim Ucapan</h2>
            <p className="sub">Untaian doa dan ucapan dari Bapak/Ibu/Saudara/i akan menjadi hadiah terindah bagi kami berdua. Mohon konfirmasi kehadiran melalui formulir di bawah ini.</p>
          </div>
          <WishesSection />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <p className="foot-quote">&ldquo;Atas kehadiran dan doa restu Bapak/Ibu/Saudara/i, kami sekeluarga menghaturkan terima kasih.&rdquo;</p>
        <div className="monofoot">Anindya <span className="amp">&amp;</span> Raditya</div>
        <p className="foot-date">12 · 09 · 2026 — Ubud, Bali</p>
        <p className="hashtag">#AnindyaRaditya</p>
        <div className="foot-divider" />
        <a className="watermark" href="https://surat.pro" target="_blank" rel="noopener noreferrer">
          Undangan oleh <b>surat.pro</b>
        </a>
      </footer>
    </div>
  );
}
