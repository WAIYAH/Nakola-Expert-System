# Nakola Expert Systems

> African-grounded, global-grade technology solutions.

A conversion-optimized, performance-first marketing website for [Nakola Expert Systems](https://nakolaexpertsystems.com) — a software development consultancy based in Nairobi, Kenya. Built with modern tooling, zero frameworks, and a focus on clarity, speed, and credibility.

---

## ✨ Highlights

- **10 pages + a 404** — Home, About, Services, Work, Insights, Contact, Careers, Affiliate Application, Privacy Policy, Terms of Service
- **Light on mobile data** — hero videos are poster-only on phones, Data Saver and reduced motion; on a phone, 9 of 10 pages first load under 0.7 MB
- **Performance-first architecture** — Vite 7 build pipeline, Tailwind CSS 4 utility engine, vanilla ES6+ modules
- **Conversion-focused design** — Multi-step quote form, strategic CTAs, trust signals, case studies with measurable outcomes
- **Accessible by default** — Skip-to-content links, focus traps, keyboard-navigable filter tabs, semantic HTML
- **SEO-ready** — JSON-LD structured data on every page, Open Graph meta tags, XML sitemap, robots.txt

---

## 🛠 Tech Stack

| Layer        | Technology                        |
| ------------ | --------------------------------- |
| Build        | Vite 7.3                          |
| Styling      | Tailwind CSS 4.1 (v4 `@theme`)   |
| JavaScript   | Vanilla ES6+ modules              |
| Fonts        | Inter (body/headings), JetBrains Mono (code) |
| Minification | Terser (JS), Lightning CSS (CSS)  |
| Analytics    | Google Analytics 4 (event-driven) |

No React. No Vue. No jQuery. Just fast, maintainable HTML/CSS/JS.

---

## 📁 Project Structure

```
├── index.html              # Home — hero, services overview, case study, CTA
├── about.html              # About — story, mission/vision, values, team, timeline
├── services.html           # Services — 6 offerings, engagement models, FAQ accordion
├── work.html               # Work — 6 case studies with filterable categories
├── insights.html           # Insights — upcoming articles ("coming soon"), newsletter signup
├── contact.html            # Contact — 3-step progressive quote form, quick inquiry
├── careers.html            # Careers — hiring status, affiliate program, Tech Pulse Insider
├── affiliate-application.html  # Affiliate program application form
├── privacy.html            # Privacy Policy — 13-section data handling policy
├── terms.html              # Terms of Service — 16-section legal agreement
├── 404.html                # Not-found page (minimal layout)
│
├── partials/               # Shared markup, inlined at build time (see below)
│   ├── head.html           # Icons, manifest, fonts, main.js, no-JS fallback
│   ├── header.html         # Skip link, header, mobile menu
│   └── footer.html         # Site footer
│
├── src/
│   ├── main.js             # Entry point — module orchestration, hero videos
│   ├── styles/
│   │   └── main.css        # Design system — @theme tokens, layers, keyframes
│   └── scripts/
│       └── modules/
│           ├── navigation.js     # Sticky header, mobile menu, current-page highlight
│           ├── animations.js     # Scroll-reveal (with fallbacks), animated counters
│           ├── forms.js          # Validation, multi-step quote form, submit + errors
│           ├── affiliateForm.js  # Affiliate application submit
│           ├── filters.js        # Category tabs with arrow-key navigation
│           ├── effects.js        # Visual effects (parallax, tilt cards, magnetic buttons, blobs)
│           ├── cookieConsent.js  # Consent banner that gates analytics
│           ├── analytics.js      # GA4 loader, conversion & event tracking
│           └── protection.js     # Content-copy deterrents
│
├── public/                 # Copied to dist/ as-is
│   ├── _headers            # Security headers (CSP, HSTS, …) for Cloudflare
│   ├── _redirects          # .html → clean-URL 301s, retired-page redirects
│   ├── brand/              # Logo, favicons, app icons, social share image
│   ├── videos/             # Compressed hero background videos
│   ├── robots.txt          # Crawler directives
│   ├── site.webmanifest    # Install/app-icon metadata
│   └── sitemap.xml         # XML sitemap
│
├── vite.config.js          # Multi-page build config, partials plugin, terser
├── wrangler.toml           # Cloudflare Workers static-assets config
├── package.json            # Scripts, devDependencies
└── docs/
    └── NES_STRATEGIC_BLUEPRINT.md  # Full project blueprint & design spec
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20.19 (required by Vite 7; tested on v24)
- **npm** ≥ 9

### Install

```bash
git clone https://github.com/WAIYAH/Nakola-Expert-System.git
cd Nakola-Expert-System
npm install
```

### Development

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000) with hot module replacement.

### Production Build

```bash
npm run build
```

Outputs optimized assets to `dist/`. All HTML, CSS, and JS are minified. Assets are content-hashed for cache-busting.

### Preview Build

```bash
npm run preview
```

Serves the `dist/` folder locally to verify the production build.

### Shared header, menu and footer

The header, mobile menu, footer and common `<head>` tags are written once in `partials/`. A page includes them with a comment, and a small plugin in `vite.config.js` inlines the file in both `npm run dev` and `npm run build`:

```html
<!-- @include header -->
```

Edit `partials/header.html` once and every page updates (the dev server reloads automatically). The 404 page keeps its own minimal header and footer.

### Deployment

The site runs on Cloudflare (Workers static assets, configured in `wrangler.toml`). Cloudflare's GitHub integration builds every push: a push to `main` deploys to nakolaexpertsystems.com, and other branches get a preview URL (shown in the commit's checks on GitHub). Pages are served at clean URLs such as `/about`; `public/_redirects` sends old `.html` links there with a permanent redirect, and `public/_headers` sets the security headers.

---

## 📄 Pages

| Page | Path | Purpose |
| ---- | ---- | ------- |
| Home | `/` | Hero, services overview, featured case study, CTA |
| About | `/about` | Company story, mission, values, team, timeline |
| Services | `/services` | 6 service offerings, engagement models, FAQ |
| Work | `/work` | 6 case studies with category filters |
| Insights | `/insights` | Upcoming articles ("coming soon"), newsletter signup |
| Contact | `/contact` | 3-step progressive quote form, quick inquiry |
| Careers | `/careers` | Hiring status (no open roles), affiliate program, Tech Pulse Insider |
| Affiliate Application | `/affiliate-application` | Affiliate program application form |
| Privacy | `/privacy` | 13-section privacy policy |
| Terms | `/terms` | 16-section terms of service |

---

## 🎨 Design System

The design system lives in `src/styles/main.css` using Tailwind CSS v4's `@theme` directive:

- **Colors** — Midnight (`#0a0f1a`), Charcoal (`#1a1f2e`), Electric Blue (`#2563eb`), Amber accent (`#f59e0b`), semantic success/warning/error
- **Typography** — Inter for body/headings, JetBrains Mono for code, modular scale from `0.75rem` to `4.5rem`
- **Spacing** — 8px base grid with named tokens (`--spacing-xs` through `--spacing-3xl`)
- **Animations** — `fade-in`, `slide-up`, `slide-in-right` keyframes with scroll-triggered reveal via IntersectionObserver
- **Layers** — `@layer base`, `@layer components`, `@layer utilities` for predictable specificity

---

## ♿ Accessibility

- Skip-to-content links on all pages
- Focus trap in the open mobile menu; the closed menu is `inert`, so keyboard focus never lands on hidden links
- Current page marked in the nav with `aria-current="page"`
- Arrow-key navigation on filter tabs (`role="tablist"`)
- Semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`)
- Proper heading hierarchy (h1 → h2 → h3), no skipped levels
- Text contrast meets WCAG AA (4.5:1) on every page
- Content stays readable without JavaScript, and when the script loads late or fails
- Form labels linked to inputs via `for`/`id`; failed form sends announce an error with fallback contacts

---

## 🔍 SEO

- **JSON-LD** structured data on every page (Organization, LocalBusiness, WebSite, CollectionPage, Blog)
- **Open Graph** meta tags for social sharing
- **XML Sitemap** at `/sitemap.xml` covering every page, at its clean URL
- **Clean, canonical URLs** (`/about`) everywhere: links, canonicals, `og:url`, structured data and sitemap agree
- **robots.txt** with crawler directives
- Semantic HTML for search engine comprehension
- Descriptive `<title>` and `<meta name="description">` per page

---

## 📊 Analytics

The `analytics.js` module provides:

- GA4 script injection (replace `G-XXXXXXXXXX` in `analytics.js` with your Measurement ID)
- Form submission conversion tracking
- Newsletter signup event tracking
- Outbound link click tracking

---

## 🗺 Roadmap

- [x] **Phase 1** — Foundation & Design System
- [x] **Phase 2** — Core Conversion Pages (Services, Contact)
- [x] **Phase 3** — Proof & Credibility (About, Work, Insights, Careers)
- [x] **Phase 4** — Polish & Optimization (SEO, a11y, analytics, build tuning)
- [x] **Phase 5** — Legal Pages & Documentation
- [ ] **Phase 6** — CMS integration, blog backend, form API endpoints
- [ ] **Phase 7** — Internationalization, dark mode toggle, performance monitoring

---

## 📜 License

This project is licensed under the [ISC License](LICENSE).

---

## 🤝 Contributing

This is a private project solely built and maintained by **Lucky Nakola**. No external contributions are accepted. For inquiries, visit [nakolaexpertsystems.com](https://nakolaexpertsystems.com) or reach out via the [contact page](https://nakolaexpertsystems.com/contact.html).

---

<p align="center">
  <strong>Nakola Expert Systems</strong><br>
  Built by Lucky Nakola<br>
  Nairobi, Kenya 🇰🇪<br>
  <em>Building technology that matters.</em>
</p>
