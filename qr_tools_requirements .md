# QR Tools Platform — Requirements (MVP v1, no DB, no login)

This document defines **all requirements** for a coding agent to build a “cooler than qr.io” QR-code web app **optimized for SEO + AdSense**, starting with **static QR codes only** (no database, no accounts). It is written to be directly actionable.

---

## 0) Product goals

### Primary goals
- **Ship fast**: MVP that is genuinely useful and production-grade.
- **Rank with SEO**: target high-intent longtail queries (use-case pages).
- **Monetize with AdSense**: maximize pageviews and session depth without hurting UX.
- **Trust-first**: “Static QR codes never expire” and privacy-by-design.

### Out of scope (v1)
- Dynamic QR codes (redirect links), scan analytics, link editing
- User accounts, payments, subscriptions
- Server-side image processing pipelines (optional later)

---

## 1) Core concept: “Never expires” static QR codes

### Definition
A **static QR code** encodes the final payload (URL/WiFi/vCard/etc.) inside the QR itself.
- It does **not** depend on your service after creation.
- It can’t be “expired” by you. (Only the real-world destination might change.)

### Messaging requirement
- Every relevant page must contain a clear statement:
  - **Static QR codes do not expire** because the data is encoded in the QR image.
  - Dynamic QR codes (edit/track) are not offered in v1.

---

## 2) Functional requirements (MVP)

### 2.1 QR types to support (v1)
Implement generators for:

1) **URL QR**
- Input: URL (http/https; optional `mailto:`/`tel:` are separate types)
- Validation: must be valid URL; allow query params; normalize whitespace.

2) **Text QR**
- Input: arbitrary text (UTF-8)
- Warning: very long text increases QR density; show estimate and suggest URL if too long.

3) **WiFi QR**
- Inputs: SSID, password, encryption type (WPA/WPA2, WEP, None), hidden network boolean
- Output format (standard):
  - `WIFI:T:WPA;S:<SSID>;P:<PASSWORD>;H:<true/false>;;`
- Escaping: handle `\`, `;`, `,`, `:` safely.

4) **vCard QR**
- Inputs: First name, last name, phone, email, company, title, website, address, notes (optional)
- Output: vCard 3.0 (or 4.0 if you prefer, but be consistent)
- Provide a live preview of generated text.

5) **WhatsApp QR**
- Inputs: phone (E.164), optional prefilled message
- Output: `https://wa.me/<number>?text=<urlencoded message>`

6) **Email QR**
- Inputs: email, subject, body
- Output: `mailto:...`

7) **Phone QR**
- Input: phone
- Output: `tel:...`

8) **SMS QR**
- Inputs: phone, message
- Output: `smsto:<phone>:<message>` (or `sms:` variant, pick one and test on iOS/Android)

### 2.2 QR customization (v1)
- Error correction level: L / M / Q / H (default: M)
- Size: slider or preset (e.g., 256 / 512 / 1024)
- Quiet zone (margin): default 4 modules; allow adjustments
- Colors:
  - Foreground + background (color pickers)
  - Enforce contrast: warn if low contrast
- Optional **logo overlay**:
  - Upload image (PNG/SVG), auto-center
  - Auto-scale to safe size (e.g., ≤ 18–22% of QR width)
  - Force error correction ≥ Q when logo is enabled
  - Provide “safe mode” toggle (adds white pad behind logo)

### 2.3 Output formats (v1)
- **PNG** download (required)
- **SVG** download (required)
- **PDF for printing** (recommended):
  - A4 & Letter
  - Optional labels grid template (basic 2×5 or 3×8)

### 2.4 Client-side generation requirement
- The entire QR generation must work **client-side** (in-browser) for:
  - privacy, speed, and zero infrastructure costs
- No payload must be sent to the server by default.
- Any “logo upload” is processed locally.

### 2.5 Presets & helpers (high conversion)
Add preset buttons:
- “Print (high-res)” → 1024px PNG + SVG
- “Stickers” → 512px + larger quiet zone
- “Dark mode safe” → high contrast scheme

Add a “Scan test” section:
- show a preview and “tips if scanning fails”
- common fixes: increase margin, increase error correction, increase size, reduce logo.

### 2.6 UX flow
- Each generator page has:
  - Inputs → live preview → customization → download buttons
- Keep the “download” CTA above the fold on desktop.
- Provide a “Copy payload” button to copy the underlying encoded text.

---

## 3) SEO requirements (critical)

### 3.1 SEO architecture
Build as a **tools hub** + **use-case landing pages**.

Required pages:
- `/` — hub + navigation to core generators
- `/tools` — index of all tools and use cases
- Tool pages (generators):
  - `/qr-code-generator` (general landing)
  - `/url-qr-code`
  - `/wifi-qr-code`
  - `/vcard-qr-code`
  - `/whatsapp-qr-code`
  - `/email-qr-code`
  - `/phone-qr-code`
  - `/sms-qr-code`
- Use-case pages (programmatic SEO starters):
  - `/qr-code-for-wedding-invitation`
  - `/qr-code-for-restaurant-menu`
  - `/qr-code-for-business-card`
  - `/qr-code-for-instagram`
  - `/qr-code-for-pdf`
  - `/qr-code-for-google-review`
  - `/qr-code-for-paypal` (or payment link)
  - `/qr-code-for-event-checkin`
  - `/qr-code-for-forms` (Google Forms)
  - `/qr-code-for-whatsapp-business`

Minimum: **25–50 pages** at launch, each with unique content.

### 3.2 On-page SEO rules (per page)
Each SEO page must include:
- Unique `<title>` with primary keyword near front
- Unique `<meta name="description">` with clear benefit + CTA
- Exactly one `<h1>` matching intent
- A “How it works” section (steps)
- A “Best settings / tips” section (concrete)
- A FAQ section (5–8 Q&As)
- Internal links to related tools + hub pages
- A “Try it now” CTA linking to the relevant generator

### 3.3 Structured data (Schema.org)
- Add `FAQPage` JSON-LD on every page that has FAQs
- Add `SoftwareApplication` or `WebApplication` JSON-LD on generator pages
- Add `BreadcrumbList` JSON-LD site-wide

### 3.4 Indexing & crawlability
- Generate `sitemap.xml` automatically
- Provide `robots.txt` with sitemap reference
- Ensure canonical URLs
- Avoid duplicate pages (no “/tool” and “/tool/landing” for same intent)
- Add Open Graph + Twitter cards

### 3.5 Multilingual strategy (optional)
If doing DE + EN:
- Use `/de/...` and `/en/...`
- Correct `hreflang` tags
- Translations must be human-quality and not identical boilerplate

---

## 4) Performance requirements (Core Web Vitals)

### 4.1 Load strategy
- Make landing pages **static / server-rendered** and lightweight.
- Use dynamic imports for heavy QR rendering libs only on pages that need them.
- Avoid blocking scripts above the fold.
- Images:
  - Use next/image or proper responsive images
  - Preload the hero/preview only if it improves LCP

### 4.2 Core Web Vitals targets
- LCP < 2.5s on mobile
- INP < 200ms
- CLS < 0.1
- Avoid layout shifts around AdSense slots (reserve space).

### 4.3 Caching
- Static pages with long cache headers (CDN)
- Ensure immutable asset caching with content hashes

---

## 5) AdSense requirements (monetization without hurting SEO)

### 5.1 Placement strategy
- Do **not** clutter the editor area.
- Recommended slots:
  - One slot after “How it works”
  - One slot after FAQ
  - Optional sticky footer banner on mobile (test carefully)

### 5.2 Policy & UX
- No deceptive UI
- Ads must never overlap download buttons
- Reserve space to avoid CLS
- Ensure cookie consent (EU) if required by your setup

---

## 6) Privacy, security, compliance

### 6.1 Privacy
- Default: client-side generation, no payload sent to server
- Provide a privacy page explaining this in simple terms

### 6.2 Security
- Sanitize all user inputs shown in UI (prevent XSS in previews)
- If logo upload exists:
  - File type allowlist (png, jpg, svg with sanitization)
  - Max file size (e.g., 5MB)
- Rate limiting not needed if no upload endpoints exist

### 6.3 Legal pages
Required:
- `/privacy`
- `/terms`
- `/imprint` (important for Germany / EU context)
- `/contact`

---

## 7) Accessibility requirements (a11y)
- Keyboard navigable forms
- Proper labels, aria descriptions
- Color picker accessible alternative (text input)
- Contrast warnings must be text + icon (not color only)

---

## 8) Analytics & instrumentation (rank learning)

### 8.1 Minimal analytics events (privacy-friendly)
Track (without sending payload):
- page_view
- generator_type_selected
- download_png / download_svg / download_pdf
- logo_enabled
- error_correction_changed

### 8.2 Search Console readiness
- Add site verification instructions
- Ensure clean canonical and sitemap

---

## 9) Tech stack & implementation notes

### 9.1 Required stack (v1)
- **TypeScript** (strict mode)
- **Next.js (latest, App Router)**  
  - Use **Server Components** by default; isolate interactive QR UI in **Client Components**
  - Prefer **static rendering** for SEO pages; only hydrate what’s necessary
- **Tailwind CSS** for styling
- **shadcn/ui** for UI primitives (forms, tabs, accordions, dialogs, dropdowns)
- **React Hook Form + Zod** for form state + validation
- **next-sitemap** or a custom `app/sitemap.ts` implementation for `sitemap.xml`
- **next/metadata** API for SEO meta + canonical + OG/Twitter cards

### 9.2 Libraries (recommended)
QR generation (client-side, must support SVG + PNG):
- `qrcode` **or** `@nuintun/qrcode` (pick one; write an adapter so it’s swappable)

SVG → PNG / canvas export:
- Use the QR lib’s canvas renderer if available
- If needed: `canvg` (as a fallback) for SVG-to-canvas conversion (keep optional)

PDF export (client-side):
- `pdf-lib` (recommended) **or** `jspdf`  
  - Generate A4/Letter print sheets and optionally label templates

Input helpers:
- `libphonenumber-js` for phone validation/formatting (WhatsApp/tel/sms)
- `nanoid` (optional) for client-only IDs (e.g., temp filenames)

Analytics (privacy-friendly):
- `@vercel/analytics` (simple) **or** Plausible/Umami (if you self-host later)
- Log only non-sensitive events (never store payload)

### 9.3 Project structure (opinionated)
- `app/`
  - `(seo)/...` for static landing pages and use-case pages
  - `(app)/...` for interactive generator routes (client components)
- `components/`
  - `qr/` (renderer, downloads, presets)
  - `seo/` (FAQ, JSON-LD, breadcrumbs)
  - `ui/` (shadcn components)
- `lib/`
  - `payload/` (pure builders + escaping)
  - `validation/` (zod schemas)
  - `schema/` (JSON-LD generators)
  - `presets/` (use-case settings maps)

### 9.4 Component architecture (must-have)
- `QrPayloadBuilder` per type (**pure functions**, fully unit-tested)
- `QrRenderer`
  - takes `{ payload, eccLevel, size, margin, colors, logo }`
  - outputs `{ svgString, canvasRef? }`
- `QrDownload`
  - `downloadPng()`, `downloadSvg()`, `downloadPdf()`
- `PresetManager`
  - maps “use case” → recommended settings + prefilled fields
- `SeoHead` helper
  - uses Next.js metadata API; sets canonical, OG/Twitter, robots directives

### 9.5 Testing & quality gates
- Unit tests: **Vitest** (payload builders, escaping, validation)
- E2E tests: **Playwright** (generate → download smoke tests)
- Lint/format:
  - **ESLint** (next/core-web-vitals)
  - **Prettier**
- CI (GitHub Actions):
  - `lint`, `typecheck`, `test`, `playwright` (smoke)
- Performance:
  - Run Lighthouse CI (optional but recommended) with budgets for LCP/CLS/INP

### 9.6 Deployment & hosting (low-cost)
- Deploy on **Vercel** (fastest) or any Node host with CDN in front
- Ensure:
  - gzip/brotli enabled
  - immutable caching for static assets
  - image optimization (Next.js) enabled

---

## 10) Content templates (SEO pages)

### 10.1 Tool page template sections (order)
1) H1 + 2-line value prop
2) Embedded generator (inputs + preview)
3) “Best settings” presets
4) “How to create a QR code for X” steps
5) “Common issues & fixes”
6) FAQ (5–8)
7) Related tools

### 10.2 Use-case page template sections
- H1 for use case (“QR Code for Restaurant Menu”)
- Why it’s useful (short)
- Recommended payload type (usually URL)
- Best settings (print vs digital)
- CTA button to generator with preselected presets
- FAQ + schema
- Related use cases

---

## 11) Future-proofing (v2+ without rewriting)

Even though v1 has no DB/login, code must be structured to allow:
- Dynamic QR service:
  - `/r/<slug>` redirect endpoint
  - slug → target mapping store (KV/DB)
- Projects:
  - saved QR configurations per user
- Scan analytics:
  - event ingestion endpoint + aggregation

Implementation requirement:
- Keep a clean separation:
  - **payload/rendering** (client)
  - **routing/landing** (server/static)
  - **future services** (API routes, not used in v1)

---

## 12) Definition of Done (v1)

A release is “done” when:
- All 8 QR types work client-side
- PNG + SVG downloads work reliably
- Logo overlay is safe (error correction auto-adjusts)
- Sitemap + robots + canonical + OG are correct
- At least 25 SEO pages exist with unique copy and FAQs + schema
- Lighthouse mobile scores are strong (no obvious CWV issues)
- Legal pages exist and are linked in footer
- AdSense slots are placed with reserved space (no CLS)
- Basic analytics events are logged (without payload)

---

## 13) Deliverables checklist

- [ ] Next.js project scaffold with routes
- [ ] QR generator pages (8 types)
- [ ] Use-case pages (≥ 15)
- [ ] `/tools` hub page
- [ ] `sitemap.xml` + `robots.txt`
- [ ] JSON-LD (FAQ, Breadcrumb, WebApp)
- [ ] Privacy / Terms / Imprint / Contact
- [ ] AdSense components (lazy + reserved space)
- [ ] Tests (payload unit tests + e2e smoke)
- [ ] Deployment config (CDN caching, compression)

---

## 14) Notes on “cooler than qr.io” (differentiators to include in v1)

Pick at least 3:
- “Static QR codes never expire” promise (front and center)
- True client-side privacy (no uploads, no tracking by default)
- Better output: SVG + Print PDF (A4/Letter) as first-class
- Bulk generation (CSV) **later** as Pro (v2)
- Label sheet templates
- Presets for scanning reliability + contrast warnings
- Lightweight + fast (CWV) compared to heavy competitors

---

**End of requirements.**
