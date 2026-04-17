# Nakola Expert Systems

> African-grounded, global-grade technology solutions.

A conversion-optimized, performance-first marketing website for [Nakola Expert Systems](https://nakolaexpertsystems.com) — a software development consultancy based in Nairobi, Kenya. Built with modern tooling, zero frameworks, and a focus on clarity, speed, and credibility.

---

## ✨ Highlights

- **9 fully optimized pages** — Home, About, Services, Work, Insights, Contact, Careers, Privacy Policy, Terms of Service
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
├── insights.html           # Insights — articles, featured post, newsletter signup
├── contact.html            # Contact — 3-step progressive quote form, quick inquiry
├── careers.html            # Careers — open positions, perks, application form
├── privacy.html            # Privacy Policy — 13-section data handling policy
├── terms.html              # Terms of Service — 16-section legal agreement
│
├── src/
│   ├── main.js             # Entry point — module orchestration
│   ├── styles/
│   │   └── main.css        # Design system — @theme tokens, layers, keyframes
│   └── scripts/
│       └── modules/
│           ├── navigation.js   # Sticky header, mobile drawer, focus trap
│           ├── animations.js   # Scroll-reveal, animated counters
│           ├── forms.js        # Validation, multi-step, draft saving
│           ├── filters.js      # Category tabs with arrow-key navigation
│           └── analytics.js    # GA4 loader, conversion & event tracking
│
├── public/
│   ├── robots.txt          # Crawler directives
│   └── sitemap.xml         # XML sitemap (9 pages)
│
├── vite.config.js          # Multi-page build config, terser, lightning CSS
├── package.json            # v2.0 — scripts, devDependencies
└── docs/
    └── NES_STRATEGIC_BLUEPRINT.md  # Full project blueprint & design spec
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18 (tested on v24.12)
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

---

## 📄 Pages

| Page | Path | Purpose |
| ---- | ---- | ------- |
| Home | `/` | Hero, services overview, featured case study, CTA |
| About | `/about.html` | Company story, mission, values, team, timeline |
| Services | `/services.html` | 6 service offerings, engagement models, FAQ |
| Work | `/work.html` | 6 case studies with category filters |
| Insights | `/insights.html` | Articles, featured post, newsletter signup |
| Contact | `/contact.html` | 3-step progressive quote form, quick inquiry |
| Careers | `/careers.html` | Open positions, perks, application form |
| Privacy | `/privacy.html` | 13-section privacy policy |
| Terms | `/terms.html` | 16-section terms of service |

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
- Focus trap in mobile navigation drawer
- Arrow-key navigation on filter tabs (`role="tablist"`)
- Semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`)
- Proper heading hierarchy (h1 → h2 → h3)
- Sufficient color contrast ratios
- Form labels linked to inputs via `for`/`id`

---

## 🔍 SEO

- **JSON-LD** structured data on every page (Organization, LocalBusiness, WebSite, CollectionPage, Blog, JobPosting)
- **Open Graph** meta tags for social sharing
- **XML Sitemap** at `/sitemap.xml` covering all 9 pages
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
