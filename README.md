# Landing Surat

A modern landing page built with Next.js 16, React 19, and Tailwind CSS 4.

## Tech Stack

- **Framework**: Next.js 16.2.6
- **UI**: React 19, Tailwind CSS 4
- **Language**: TypeScript
- **Linting**: ESLint

## Project Structure

```
app/
├── components/
│   ├── landing-nav.tsx       # Navigation bar
│   ├── landing-hero.tsx      # Hero section
│   ├── landing-sections.tsx  # DocStrip, HowItWorks, Privacy sections
│   ├── landing-pricing.tsx   # Pricing section
│   ├── landing-faq.tsx       # FAQ section
│   ├── landing-footer.tsx    # FinalCTA & Footer
│   ├── popup-app.tsx         # Popup app component
│   ├── popup-screens.tsx     # Popup screens
│   ├── popup-shell.tsx       # Popup shell wrapper
│   ├── scaled-shot.tsx       # Scaled screenshot component
│   ├── wordmark.tsx          # Wordmark/logo
│   ├── icons.tsx             # General icons
│   └── landing-icons.tsx     # Landing-specific icons
├── lib/                      # Utility functions
├── globals.css               # Global styles
├── layout.tsx                # Root layout
└── page.tsx                  # Home page
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
