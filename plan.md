# Nakola Expert Systems — Site Hardening & Launch Plan

**Goal:** ship a robust, secure, mobile-responsive production site at **nakolaexpertsystems.com** (registered on Cloudflare) today, then continue polishing in phases.

This plan is based on a full read-through of the codebase (10 pages, `src/`, `vite.config.js`, build output, git history, repo visibility) plus an actual `npm run build` + asset trace to confirm the bugs below are real, not theoretical.

---

## Findings

### 🔴 Blocking bugs (site is currently broken in production builds)

1. **Logo/favicon/hero-video paths resolve to the wrong files after build.**
   Every page references brand assets as root-absolute paths (`/images/Logos/NES logo-with Wording.png`, `/videos/hero background.mp4`), but `images/` and `videos/` live at the repo root, **not** inside `public/` (Vite's actual static dir). Confirmed by building: the header logo becomes a random client-testimonial PNG (`/assets/client2-B4j8foMJ.png`) and the favicon becomes a different one (`/assets/client1-1qzKzEaA.png`) in `dist/index.html`. This affects **every page** — logo, favicon, apple-touch-icon, `site.webmanifest` icon, and all 7 hero background videos.
2. **`404.html` never ships.** It's missing from `vite.config.js`'s `rollupOptions.input`, so `npm run build` silently drops it — `dist/` has no 404 page at all.
3. **4 of 5 forms were fake.** `src/scripts/modules/forms.js#handleSubmit()` (used by the quote form, quick inquiry, careers application, and newsletter signup) always called `e.preventDefault()`, waited 1.5s, and showed a fake success state — it never sent data anywhere. *Correction from initial read:* the affiliate application form was **not** part of this bug — it has its own independent inline handler that already posts correctly to FormSubmit's AJAX endpoint; it just needed extracting into a proper module for the CSP work in Phase 3. **Net effect prior to the fix: quote requests, quick inquiries, job applications, and newsletter signups never reached you.**

### 🟠 Deploy blockers / performance

4. **7 hero/background videos totaling 228MB**, all raw 1080p (10–89MB each), referenced directly with no compression. Cloudflare Pages rejects any deployed file over **25MB** — `videos/Ambience..mp4` (89MB), `Forest.mp4` (44MB), `Nature.mp4` (30MB), `coding.mp4` (28MB), and `Marketing.mp4` (21MB) would all **fail to deploy** even after fixing bug #1. They also hurt mobile load time and data cost for your target market.
5. **256MB `.git` folder** — these videos plus 18MB of unoptimized images are committed straight into git history (not gitignored), making every clone/push heavy and permanently bloating the repo even after future files are optimized.

### 🟠 Security

6. **No security headers** — no CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, or X-Frame-Options anywhere. Cloudflare Pages supports a `_headers` file for this at zero cost.
7. ~~`protection.js` disables right-click/copy/print sitewide~~ — **reviewed, keeping as-is per your call.**
8. **No spam protection on forms** (no honeypot/rate-limit) — once forms actually send (fix #3), they'll be open to bot spam without it.
9. ~~`templates/` and `docs/NES_STRATEGIC_BLUEPRINT.md` are tracked in the public repo~~ — **reviewed, keeping tracked; you're converting these to Word docs separately.**
10. GA4 is still a placeholder ID (`G-XXXXXXXXXX`) — analytics is effectively off — and there's no cookie-consent gate before any future tracking script loads.

### 🟡 Correctness / SEO polish

11. `sitemap.xml` omits `privacy.html` and `terms.html`.
12. Social preview image (`og:image`/`twitter:image`) is a logo file, not a purpose-built 1200×630 share card.

### 🟢 Already solid (verified, no action needed)
- No secrets/API keys/credentials found anywhere in the codebase.
- `npm audit` — 0 vulnerabilities in dependencies.
- Tailwind responsive coverage is broad (243 `lg:`, 55 `sm:`, 50 `md:` utility instances) — real device testing in Phase 4 will confirm rather than assume.
- Accessibility fundamentals already present: skip links, focus trap in mobile drawer, `aria-live` form errors, semantic landmarks.
- `npm run dev` / `npm run build` pipeline itself (Vite 7 + Tailwind 4 + Terser) is a sound, modern, framework-free setup — keeping it as-is.

---

## Phases

### Phase 1 — Critical fixes (blocks everything else) ✅ DONE
- Move brand assets (logo, favicon, apple-touch-icon source, manifest icon) into `public/brand/` and reference them consistently as root-absolute paths everywhere (favicons, `site.webmanifest`, header/footer logos) so Vite copies them byte-identically instead of mis-resolving them.
- Fix hero video references to resolve correctly (paired with compression in Phase 2).
- Add `404.html` to `vite.config.js` build inputs; verify it appears in `dist/`.
- Rewrite `forms.js#handleSubmit()` to actually submit via `fetch()`/native POST to each form's real endpoint, keeping the existing loading/success UI. Standardize all 5 forms (quote, quick inquiry, careers application, affiliate application, newsletter) on FormSubmit.co → `luckiesdabwoy@gmail.com` (one already uses this; extending it needs no new backend). Add a honeypot field to each for spam protection.
- Rebuild (`npm run build`) and manually verify every page's logo/favicon/video/form in the built output.

### Phase 2 — Media optimization ✅ DONE
- Transcode all 7 hero videos with ffmpeg (available locally): downscale to 1280×720, H.264 CRF ~28–30, strip the audio track (they're `muted loop` anyway). Target: each file under ~5MB, all comfortably under Cloudflare's 25MB limit.
- Sweep `images/` for any oversized/unoptimized files feeding the build and convert to WebP where it isn't already.
- Rename any asset filenames containing spaces or special characters (e.g. `hero background.mp4`, `NES logo-with Wording.png`) to kebab-case — likely contributor to the path-resolution bug in Phase 1 and safer for URLs generally.

### Phase 3 — Security hardening ✅ HEADERS + HONEYPOTS DONE
- Add a `public/_headers` file (Cloudflare Pages native): CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options.
- Add a honeypot field to each form for spam protection now that they'll actually deliver mail.
- Add a lightweight cookie-consent gate before GA4 loads (once activated).
- `protection.js` and `templates/`/`docs/` stay as-is (your call — noted above).

### Phase 4 — Mobile responsiveness & accessibility pass ✅ DONE
- Screenshot swept all 11 pages at 375px (automated: zero horizontal overflow, zero console errors on any page).
- Found and fixed a real recurring bug: the WhatsApp float button's text label made it wide enough to overlap page content (pricing, headings, article excerpts) at various scroll positions on mobile, confirmed on 3+ pages via screenshot. Fixed by making it icon-only under 640px — standard mobile pattern, verified fixed via re-screenshot.
- Also fixed the same fixed-corner collision between the WhatsApp float and the new cookie consent banner (Phase 5) by hiding the float while the banner is showing.

### Phase 5 — SEO & compliance polish ✅ DONE (pending your GA4 ID)
- Added `privacy.html`/`terms.html` to `sitemap.xml` (done in Phase 1).
- Generated a proper 1200×630 OG/Twitter share card (dark brand background, logo, headline, domain) — replaces the old plain-logo-file share image on every page.
- Built a cookie consent banner (accept/decline, stored in localStorage) that gates GA4 behind explicit consent — verified end-to-end: accepting fires `loadGA4()` immediately, declining/ignoring never loads it.
- GA4 Measurement ID is still the placeholder (`G-XXXXXXXXXX`) — tell me your real ID whenever you have one and I'll wire it in; until then analytics stays inactive by design, which is safe, just not collecting data yet.

### Phase 6 — Deploy to Cloudflare Pages + connect the domain ✅ DONE
- Live at `https://nakolaexpertsystems.com` and `https://www.nakolaexpertsystems.com`, both returning 200 over HTTPS.
- Turned out to be a **Workers with static assets** project (not classic Pages) — deploys via `npx wrangler deploy`. Added `wrangler.toml` (assets directory + `not_found_handling = "404-page"`) since without it, unmatched routes were silently falling back to `index.html` with a 200 instead of the real 404 page. Confirmed fixed live.
- Note: the dashboard showed "Error fetching GitHub User or Organization details" — worth re-authorizing the GitHub App connection (GitHub → Settings → Applications → Installed GitHub Apps → Cloudflare Workers and Pages → Configure) so future `git push`es auto-deploy without a manual trigger.

### Phase 7 — Optional, deferred (needs your explicit go-ahead separately)
- Rewriting git history to purge the old 228MB of large media blobs permanently (they'll still bloat `.git` even after Phase 2 replaces them going forward). This requires a force-push and rewrites shared history — not doing this without a direct ask.

---

## Decisions (locked in)

1. **Deploy method:** GitHub → Cloudflare Pages dashboard integration (auto-deploy on push), driven by you in the dashboard with my step-by-step guidance.
2. **Forms:** standardize all 5 on FormSubmit.co → `luckiesdabwoy@gmail.com`.
3. **Content protection:** keep `protection.js` as-is.
4. **Confidential docs:** keep `templates/` and `docs/NES_STRATEGIC_BLUEPRINT.md` tracked and public — being converted to Word docs separately.

---

## Action needed from you

- ~~Check `luckiesdabwoy@gmail.com` for FormSubmit "Activate Form" emails~~ — **done, you've activated them.**
- **Old `videos/` folder (228MB, now unused) is still tracked in git** — deleting it requires a destructive bulk operation the environment blocks me from running unattended. It's fully superseded by the compressed files in `public/videos/`; delete it yourself (`git rm -r videos` + commit) whenever convenient, or tell me to do it and I'll ask for confirmation at that step.
- Same applies to `images/Logos/NES-Symbols Only.png` and `NES logo-with Wording.png` (originals, now duplicated by `public/brand/`) — harmless to leave, tiny (~250KB), no action needed unless you want it tidy.
- **Re-authorize the Cloudflare ↔ GitHub App connection** (see Phase 6 note) so pushes auto-deploy.
- **Decide on the old Vercel deployment** — you asked about this; my take was to remove it since Cloudflare is now the live domain and the Vercel copy is a stale pre-fix build sitting at its own public URL. Your call, not urgent.
- **Send me a real GA4 Measurement ID whenever you have one**, or say to skip analytics for now.
