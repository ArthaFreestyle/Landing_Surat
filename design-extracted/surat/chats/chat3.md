# Product landing page

_Started 2026-05-31 01:42 UTC_

---

## User

create the landing page for selling this product

## Assistant

_[tool: list_files]_

I'll start by exploring the existing project files to understand what Surat is before designing its landing page.I'll explore the project files to understand the product.

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

Let me read the screens and shell files to fully understand the product, its features, and visual system.

_[tool: read_file]_

Let me check the interactive app file to understand the full flow and any pricing details.

_[tool: questions_v2]_

I now have a thorough understanding of the product. **Surat** is a Chrome side-panel extension — an AI form-filler for Indonesian documents (KTP, NPWP, KK, etc.) that reads your uploaded documents and autofills web forms, with a privacy-first stance and a freemium model. The visual system is warm-minimal: cream surfaces, Source Serif 4 display, terracotta accent, Indonesian copy.

Before I design the landing page, a few focused questions so I build the right thing:

## User

Questions answered:
- language: Indonesian (match the product)
- audience: Everyday consumers filling gov/finance forms, HR / admin staff doing bulk data entry, Small businesses & UMKM
- sections: Hero with product shot, How it works (3 steps), Pricing (free + upgrade), Final CTA / install, FAQ, Privacy & security
- pricing: Free + monthly & annual paid plans
- cta: Add to Chrome / install extension
- tone: Crisp & efficient (productivity)
- variations: Just one polished page
- demo_reuse: Yes, show the real UI prominently

## Assistant

_[tool: update_todos]_

Now I have everything I need. Let me set up the plan and build a single polished Indonesian landing page that reuses the real extension UI.I'll let the hero demo start at a chosen state by adding an `initial` prop to `InteractivePopup`.

_[tool: str_replace_edit]_

_[tool: update_todos]_

_[tool: write_file]_

_[tool: update_todos]_

_[tool: write_file]_

_[tool: write_file]_

Now the app file and the HTML shell.

_[tool: write_file]_

_[tool: write_file]_

_[tool: update_todos]_

Let me check it loads cleanly before reviewing.

_[tool: show_html]_

_[tool: show_html]_

_[tool: get_webview_logs]_

Clean load. Let me capture full-page screenshots to review the design.

_[tool: save_screenshot]_

_[tool: save_screenshot]_

_[tool: save_screenshot]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: view_image]_

_[tool: save_screenshot]_

Hero looks strong. The section scrolls didn't take (smooth-scroll timing). Let me capture by scroll position.

_[tool: view_image]_

_[tool: view_image]_

_[tool: view_image]_

_[tool: view_image]_

_[tool: str_replace_edit]_

The page is rendering beautifully and the real product UI is showing prominently. One refinement: in How-it-works the three device shots render full-height (720px), making them very tall with empty space (esp. the success screen). I'll crop them to a tidy uniform height with a soft fade so they read as neat cards. Let me update `ScaledShot` to support cropping.

_[tool: str_replace_edit]_

_[tool: view_image]_

_[tool: view_image]_

Now let me view the pricing and FAQ sections.

_[tool: view_image]_

_[tool: save_screenshot]_

Pricing and privacy look great. The 3-up pricing wraps to 2 only because the preview iframe is ~900px wide; at full desktop width all three sit in a row. Let me verify the how-it-works crop edit landed well.

_[tool: view_image]_

_[tool: delete_file]_

The crop landed — the How-it-works device shots are now uniform, tidy cards showing the most informative top of each screen. The page is polished across all sections. Let me clean up the review screenshots and finalize.

_[tool: update_todos]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Done. **`Surat Landing Page.html`** is a single polished Indonesian landing page that reuses your actual extension UI.

**What's on it**
- **Hero** — "Isi formulir apa pun, *tanpa* ketik ulang" with a live, interactive browser+side-panel demo (starts on the extracted-fields state; click the dots to step through the whole flow)
- **Doc-types strip** — KTP, NPWP, KK, Ijazah, SIM, Paspor, Invoice, Rekening koran
- **Cara kerja** (3 steps) — each illustrated with the real Upload / Preview / Success screens, cropped to neat uniform cards
- **Privasi & keamanan** — four reassurance cards built on your "diproses lalu dihapus" promise
- **Harga** — Gratis / Pro / Tim, with a Bulanan↔Tahunan toggle (Tim tier targets HR & UMKM)
- **FAQ** accordion, dark **final CTA**, and footer

It carries your warm-minimal system throughout (cream surfaces, Source Serif 4 display, terracotta accent) and the CTA is "Tambahkan ke Chrome" everywhere.

A couple of notes:
- The "Add to Chrome" buttons use a generic extension/puzzle glyph rather than the Chrome logo — say the word if you'd prefer the real Chrome mark.
- Pricing figures (Rp49k/39k Pro, Rp35k/29k Tim) are placeholders — easy to swap for your real numbers.

## User

hero page nya ubah donk, terlalu template

## Assistant

_[tool: read_file]_

The user wants the hero redesigned — it's too generic/template-y. Let me re-read the current files first since they may have edited something.

_[tool: read_file]_

The current hero is the textbook centered-SaaS layout (eyebrow pill → centered headline → two buttons → centered screenshot). I'll redesign it into something editorial and on-brand: an asymmetric left-aligned split, with the Surat panel shown **docked in a Chrome frame** on the right (true to the product), warm hairline-grid background, and floating annotation callouts. Let me add the styles first.Now I'll add the hero-specific styles to the stylesheet, inserting before the existing media query.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now I'll rewrite the `Hero` component into the editorial docked-in-Chrome composition.Let me check it loads cleanly and screenshot the new hero.

_[tool: show_html]_

_[tool: get_webview_logs]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: eval_js]_

The left column looks sharp and editorial, but the docked panel on the right isn't showing. Let me inspect what's happening.

_[tool: str_replace_edit]_

The panel is rendering fine — it's just that the preview pane (924px) is below my 980px breakpoint, so it stacks. Most desktops are wider, but I'll lower the breakpoint to 900px so the intended side-by-side shows here too, then verify.

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: eval_js]_

_[tool: show_html]_

The CSS was stale (screenshots don't reload the page). Let me reload first, then capture.

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: eval_js]_

_[tool: screenshot_user_view]_

The DOM is correct now (2 columns, dock at y=117, in view) — but the html-to-image capture is dropping the masked/transformed subtree. Let me grab an accurate pixel capture of the actual preview pane.

_[tool: delete_file]_

The redesign works. The hero is now editorial and distinctly on-brand — left-aligned ragged serif headline with an index label and mono trust line, and on the right **Surat shown live, docked in a Chrome frame** (page fading into the panel) with two floating annotation callouts. Much less generic than the centered-template version. Let me clean up and finalize.

_[tool: done]_

_[tool: fork_verifier_agent]_

Hero-nya sudah dirombak total — bukan template lagi.

**Yang berubah:**
- **Layout asimetris/editorial** — judul serif besar rata kiri (bukan center), dengan label indeks mono "Surat — Ekstensi Chrome" dan garis rambut.
- **Surat tampil "live", terpasang di dalam Chrome** di kanan — ada bar browser (URL kredivo, ikon side-panel aktif), halaman form yang memudar masuk ke panel, jadi terasa benar-benar sedang dipakai, bukan sekadar screenshot mengambang di tengah.
- **Dua callout mengambang** — "KTP terbaca · conf 0,98" dan "11 field terisi · 2,4 dtk" — memberi sentuhan custom & menonjolkan nilai produk.
- Background cream dengan grid garis halus + glow hangat di belakang panel.

Panel-nya tetap interaktif (klik titik di bawahnya untuk menelusuri flow). Sisanya (cara kerja, privasi, harga, FAQ) tidak berubah. Beri tahu kalau mau saya geser komposisinya, ganti annotasi, atau coba arah lain.

