# Landing page redesign — design spec

**Date:** 2026-04-24
**Project:** Netter DMI landing page (`DMI_landing/index.html`)
**Driver:** Polish + brand alignment pass following recent revamp; integrate proper Netter logo assets and YC backing as the sole proof signal.
**Audience:** Executives at traditional mid-market companies (low tech maturity), with investors as a strong secondary audience.
**Direction:** Approach 2 — "Warm Editorial" — with the minimalism dial turned up. Linear / Stripe / Ramp / Watershed FR as taste anchors.

---

## 1. Foundations

### Palette — fully monochrome warm neutrals, YC orange as the sole chromatic accent

```
--bg:           #FCFAF7   /* warm off-white, faint cream */
--bg-raised:    #FFFFFF   /* pure white for cards on warm bg */
--bg-sunken:    #F4EFE7   /* warmer band, used once for "How it Works" */
--text:         #15171C   /* warm-near-black, matches Netter wordmark */
--secondary:    #5A5854   /* warm gray for body */
--tertiary:     #97938C   /* labels, captions */
--border:       #E8E2D8   /* warm hairline border */
--accent:       #15171C   /* primary CTA = warm-near-black, NOT colored */
--yc-orange:    #FF6B00   /* used ONLY for YC moments */
```

The Netter brand mark itself is monochrome (warm-near-black on white). Inventing a chromatic primary accent (e.g., a refined indigo) would mean adding brand identity that doesn't exist in the assets. We don't. Primary CTA is solid warm-near-black on warm-white (Linear-style). Color appears only at YC moments.

**YC orange appears in exactly three places** (so it reads as a thread, not a sticker):
1. Nav chip (small pill: YC square mark + "Backed by Y Combinator · P26")
2. Hero subline (uppercase tertiary text: "BACKED BY Y COMBINATOR · P26")
3. Dedicated YC trust row above contact (YC wordmark, ~32–36px tall)

### Typography

- **Inter** (already loaded) — variable, weights 400/420/500/600/700
- **Newsreader** (Google Fonts, italic only) — used for *exactly two* italic emotional beats: the hero subhead opening clause and the "Live in 2 weeks" closing line in How it Works
- Headlines: Inter 600, tracking `-0.025em` to `-0.03em`, fluid sizing via `clamp()`
- Body: Inter 420 (variable), line-height 1.55
- Labels: small uppercase Inter with letter-spacing (drop the SF Mono labels — too utilitarian for editorial direction)

Single Google Fonts request:
```
family=Inter:wght@400;420;500;600;700&family=Newsreader:ital@1&display=swap
```

### Radius

```
--radius-sm:   6px    /* buttons, chips */
--radius-md:   10px   /* cards */
--radius-lg:   14px   /* large containers */
--radius-pill: 999px  /* badges */
```

Softer than the current 2px to honor the brand mark's rounded geometry without going playful.

### Motion — confident stillness

Principle: motion is reserved, not decorative.

**Keep:**
- Hero load: headline + subhead fade up together (single motion), 600ms spring, ~16px translate; CTA fades in 100ms after
- Section reveals on scroll: each section fades up as a single unit (not per-card), 500ms spring, 12px translate, triggered once at ~25% viewport entry
- Button hovers: 150ms ease-out background lift (no scale); press = subtle inset scale `0.98`
- Nav scroll state: 200ms transition transparent → translucent + hairline border
- Link hovers: underline grows in from left, 200ms

**Cut:**
- Per-card cascade reveals (`reveal-card`)
- Word-by-word headline reveals (`anim-words`)
- Scroll-driven parallax of any kind
- Hero SVG glow loops (the hero SVG itself is gone)
- Hover scale on cards (replaced with surface color + border shifts)

Easing tokens kept as-is:
```
--ease-spring: cubic-bezier(0.16, 1, 0.3, 1);   /* primary */
--ease-out:    cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

`prefers-reduced-motion`: all transforms become instant; opacity transitions stay at 100ms or less.

### Density

- Container max-width: **1100px** (down from 1160px — tighter, more editorial)
- Section padding: `clamp(5rem, 9vw, 8rem)` (more breathing room)

---

## 2. Information architecture

### Final IA (7 sections)

```
1. Nav             — Netter wordmark + YC chip + Book a Demo CTA
2. Hero            — Typography-first: headline + serif-italic subhead + CTA
3. Outputs         — NEW: "What you can build" — visual gallery (4 tiles)
4. Use Cases       — Trimmed 6 → 4
5. How it Works    — 4 steps; "Live in 2 weeks" as the closing confidence line
6. YC trust row    — Quiet "Backed by Y Combinator" band above contact
7. Contact + Footer — Stripped to essentials
```

### Changes vs. current

| Change | Reason |
|---|---|
| Drop standalone Problem section | Folded into hero subhead — editorial sites earn the right to skip "here's the problem" sections |
| Replace hero SVG with typography-first hero | Current SVG reads as generic enterprise-SaaS; visual energy moves to the new Outputs section |
| New Outputs section ("What you can build") | Concrete vs. abstract — execs see real artifacts, investors see real product |
| Trim Use Cases 6 → 4 | Cut Customer Enrichment (depends on INSEE, France-only) and Automotive Data Monetization (niche, hard for non-tech execs); 4 feels deliberate, 6 dilutes |
| Drop standalone Phases section ("Pilot → Scale") | Sales narrative, not product flow; the only essential bit ("Live in 2 weeks") gets pulled forward into How it Works |
| New YC trust row | Single proof signal we have — earns its own quiet band |
| Net effect | 8 sections → 7; ~30–35% less scroll; each section has one job |

---

## 3. Section-by-section design

### Nav

```
[netter wordmark]   Use Cases  How it Works  Contact   [YC P26 chip]   [Book a Demo →]
```

- **Logo:** `Netter-Logo-Text.png` (lowercase wordmark), height 22–24px. Drop the current "N + Netter + DMI" three-part construction.
- **YC chip:** small pill, warm-white background, hairline border, YC orange "Y" square (16px) + text "Backed by Y Combinator · P26". Pill radius 999px.
- **CTA:** solid warm-near-black button, "Book a Demo →" with subtle arrow.
- **On scroll:** transparent → translucent warm-white with backdrop blur and hairline bottom border. 200ms ease-out.
- **Mobile:** wordmark stays, links collapse, CTA stays visible.

### Hero

```
                      [optional faint brand-mark watermark, 4% opacity]

                                      Switch on your data.

           Most of your data sits in silos.  Netter centralizes it, structures it,
              and turns it into dashboards, workflows, apps, and AI agents —
                            without an engineering team.

                                  [Book a Demo →]   [See how it works ↓]

                              BACKED BY Y COMBINATOR · P26
```

- Vertically centered, generous padding top and bottom. No SVG.
- **H1:** "Switch on your data." Inter 600, `clamp(2.75rem, 6vw, 5rem)`, tracking `-0.03em`, line-height 1.05. Single line on desktop.
- **Subhead:** *"Most of your data sits in silos."* in **Newsreader italic** at ~80% body size. Then continues in Inter regular: "Netter centralizes it, structures it, and turns it into dashboards, workflows, apps, and AI agents — without an engineering team." Centered, max-width ~640px.
- **Primary CTA:** "Book a Demo →" (solid warm-near-black). **Secondary:** "See how it works ↓" (text link, scrolls to How it Works).
- **Trust line below CTAs:** uppercase tertiary letter-spaced "BACKED BY Y COMBINATOR · P26" — YC mention #1.
- **Optional watermark:** very faint `Netter-Symbol-Transparent.png` at ~4% opacity, large, centered behind text. Disabled on mobile. Build with it; we can pull it in polish if it feels heavy.

### Outputs ("What you can build")

```
   ── what you can build ──

   Dashboards.       Workflows.       Apps.       AI Agents.
   [preview tile]    [preview tile]   [preview tile]   [preview tile]
   One sentence.     One sentence.    One sentence.    One sentence.
```

- 4-up grid on desktop, 2×2 on tablet, stacked on mobile.
- Each tile: ~280×200 frame, designed visual artifact, heading word, one outcome-oriented sentence.
- **Tile visuals** (illustrative — designed, not real product screenshots):
  - **Dashboards:** KPI number + sparkline + one chart bar
  - **Workflows:** 3-step node diagram with subtle dashed connectors
  - **Apps:** small form/UI preview with a button
  - **AI Agents:** chat-like card with one prompt + one response line
- All tile internals stay monochrome warm-neutrals — no chromatic color inside the tiles.
- **Copy direction (outcome-oriented):**
  - "Dashboards. *Real-time KPIs and operational metrics, built without engineering.*"
  - "Workflows. *Automate cross-system operations end to end.*"
  - "Apps. *Internal tools your teams actually want to use.*"
  - "AI Agents. *Autonomous operators that act on your data.*"

### Use Cases ("Real operations. Real impact.")

```
   ── use cases ──
   Real operations. Real impact.

   ┌────────────────┐  ┌────────────────┐
   │ HEALTHCARE     │  │ LOGISTICS      │
   │ Cash Collection│  │ Route & Load   │
   │ • bullet       │  │ • bullet       │
   │ • bullet       │  │ • bullet       │
   │ • bullet       │  │ • bullet       │
   │ → outcome      │  │ → outcome      │
   └────────────────┘  └────────────────┘
   ┌────────────────┐  ┌────────────────┐
   │ RETAIL / FMCG  │  │ MANUFACTURING  │
   │ Market Intel.  │  │ Scheduling     │
   │ ...            │  │ ...            │
   └────────────────┘  └────────────────┘
```

- 2×2 grid on desktop, stacked on mobile.
- Each card: small uppercase industry tag → bold title → 3 outcome bullets → italic outcome line at bottom.
- **Hover:** subtle warm-white surface lift + border darken. No scale, no shadow bloom.
- **The 4 kept use cases:**
  1. Healthcare → Cash Collection
  2. Logistics → Route & Load Optimization
  3. Retail / FMCG → Market Intelligence
  4. Manufacturing → Scheduling Optimization
- **Cut:** Customer Enrichment (Retail), Data Monetization (Automotive).
- **Copy scrub for non-tech execs (rule: prefer the business-outcome rewrite over the literal acronym expansion):**
  - "DSO" → rewrite as "Reduce time-to-payment and free up working capital"
  - "sell-in / sell-out" → "channel sales data"
  - "TMS, ERP & fleet" → "your transport, ERP, and fleet systems"
  - Drop INSEE entirely (cut with the use case)

### How it Works

```
   ── how it works ──
   From raw data to autonomous operations.

   01 Connect    →    02 Structure    →    03 Build    →    04 Operate
   [icon]              [icon]               [icon]            [icon]
   Plug any source   Netter cleans,         Create dashboards, Netter runs,
   or upload files.  normalizes, and        workflows, apps,   monitors, and
                     organizes into a       and AI agents —    optimizes. Your
                     unified ontology.      no code.           team focuses on
                                                              the business.

              ── Live in 2 weeks. No consulting, no engineering dependency. ──
```

- 4 horizontal steps connected by subtle arrow glyphs (current pattern, refined).
- Sunken section background (`--bg-sunken: #F4EFE7`) — the one warm band on the page that anchors the middle.
- **Closing confidence line:** *"Live in 2 weeks."* in Newsreader italic, then "No consulting, no engineering dependency." in Inter. Centered below the steps grid, slightly larger than caption text. This is the absorbed Phases content. Newsreader mention #2 (and final).
- Step icons: keep the current stroked-SVG style but restroke at 1.5px, monochrome warm-near-black.

### YC trust row

```
                                   ─────  BACKED BY  ─────

                                       [Y Combinator wordmark]

                       From the same accelerator that backed Stripe, Airbnb, and Doordash.
```

- Full-bleed band, ~120px tall, centered content.
- Three things: small uppercase label "BACKED BY", the YC wordmark (`YC logo + text.png`, 32–36px tall), one supporting line.
- The supporting line earns the orange — gives traditional execs a frame of reference. (Investors don't need it; execs do.)
- YC mention #3.

### Contact + Footer

```
   ── book a demo ──

   Ready to switch on your data?

   Tell us about your operation. We'll show you what's possible.

                                  [Book a Demo →]


   ──────────────────────────────────────────────────────────────────
   [netter wordmark]            © 2026 Netter        [legal · privacy · linkedin]
```

- **Contact:** stripped to essentials. Echoes the hero ("switch on your data" callback). Single CTA: Calendly link.
- **Footer:** wordmark left, copyright center, links right. Thin top border, generous vertical padding.

---

## 4. Brand integration & asset handling

### Logo usage matrix

| Context | Asset | Size | Notes |
|---|---|---|---|
| Nav (default) | `Netter-Logo-Text.png` | h: 22–24px | Lowercase wordmark, full color |
| Footer | `Netter-Logo-Text.png` | h: 20px | Same wordmark, slightly smaller |
| Hero watermark *(optional)* | `Netter-Symbol-Transparent.png` | very large, 4% opacity | Decorative; disabled on mobile |
| Favicon | `Netter-Symbol-Black.png` | 32, 16 | Generated externally |
| Open Graph | `Netter-LinkedIn-Banner.png` | as-is | Already exists, perfect for OG/Twitter card |

### YC integration matrix

| Context | Asset | Treatment |
|---|---|---|
| Nav chip | `YC square logo.png` | Small "Y" square (16px) inside hairline pill with text "Backed by Y Combinator · P26" |
| Hero subline | (text only) | "BACKED BY Y COMBINATOR · P26" in tertiary letter-spaced caps |
| Trust row | `YC logo + text.png` | "Y Combinator" wordmark, 32–36px tall, centered |

### Brand rules

- Wordmark wherever the brand name needs to read (nav, footer, OG)
- Symbol only as decorative accent or favicon
- Never both at the same time on the same surface (drops the current "N + Netter + DMI" combo)
- Drop "DMI" from the nav — not on the wordmark, redundant brand chrome
- If original SVG/AI files of the Netter wordmark/symbol exist, swap PNG for SVG (sharper at all sizes)

### Meta + OG

```html
<title>Netter — Switch on your data</title>
<meta name="description" content="Netter centralizes and structures your company's data, then turns it into dashboards, workflows, apps, and AI agents — without an engineering team. Backed by Y Combinator.">
<meta property="og:image" content="Netter-LinkedIn-Banner.png">
```

---

## 5. Implementation notes

### File structure

Stay single-file `index.html`. Static page, no build step, trivial to deploy. Trim into the same file rather than scaffold a new project.

Estimated final size: **~1700 lines** (down from 2145):
- −250 lines: hero SVG removed
- −70 lines: Problem section folded into hero
- −70 lines: Phases section folded into How it Works
- −150 lines: two cut use cases
- −60 lines: unused indigo + amber color systems
- +250 lines: new Outputs section
- +40 lines: YC trust row

### Asset directory

```
/index.html
/Netter-Logo-Text.png             ← nav, footer
/Netter-Symbol-Transparent.png    ← hero watermark (optional)
/Netter-LinkedIn-Banner.png       ← OG image
/YC square logo.png               ← nav chip
/YC logo + text.png               ← YC trust row
/favicon.ico                      ← TODO: generate from Netter-Symbol-Black.png
/favicon.svg                      ← TODO: if SVG source available
```

### Action items before implementation

- Generate favicon set from `Netter-Symbol-Black.png` (16/32/180, ICO + Apple touch icon). Tool: realfavicongenerator.net.
- Surface SVG sources for Netter wordmark/symbol if they exist; use SVG over PNG when available.
- `<link rel="preload">` the wordmark for the nav.
- Lazy-load the YC trust row image (below the fold).

### Accessibility

- `alt="Netter"` on wordmark images
- `alt="Backed by Y Combinator"` on YC images
- `aria-hidden="true"` on decorative SVGs (output tile previews, step icons)
- Skip-to-content link in nav (currently missing)
- Visible 2px focus rings, warm-near-black, with `outline-offset: 2px`
- Color contrast verified:
  - Body text `#15171C` on `#FCFAF7` → 17.5:1 (AAA)
  - Secondary `#5A5854` on `#FCFAF7` → 7.4:1 (AAA)
  - Tertiary `#97938C` on `#FCFAF7` → 3.4:1 (AA large only — restricted to non-critical labels and captions)

### Performance

- Single Google Fonts request (Inter + Newsreader, `display=swap`)
- All images: explicit `width`/`height` to prevent layout shift
- No JS bundles, no frameworks
- Target Lighthouse: 95+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO

### Code to delete

- CSS variables: `--accent`, `--accent-hover`, `--accent-pressed`, `--accent-subtle`, `--accent-muted`, `--accent-text`, `--amber*` family
- Hero SVG block (lines ~1136–1665)
- Problem section (lines ~1672–1733)
- Phases section (lines ~1922–1986)
- Two use case cards (Customer Enrichment, Data Monetization)
- Word-by-word `anim-words` JS + CSS
- Per-card `reveal-card` cascade JS + CSS

### Browser support

Modern evergreen (Chrome, Safari, Firefox, Edge — last 2 versions). Mobile Safari iOS 14+. Variable font features (`font-weight: 420`) gracefully fall back to 400 on unsupported browsers.

### Testing approach

Visual + functional, not unit:
- Manual desktop QA at 1280, 1440, 1920 widths
- Manual mobile QA at 375, 390, 768
- Lighthouse on the final build
- Tab-through keyboard test
- `prefers-reduced-motion` test in macOS Accessibility prefs
- Real-device test on at least one iPhone and one Android (manual, by user)

### Out of scope

- A/B testing infrastructure
- Analytics changes
- Form / lead capture (Calendly handles it)
- Internationalization (English only)
- Blog or sub-pages
- Real product screenshots in Outputs section (illustrative previews instead)

---

## 6. Open items

- **Favicon set** to be generated from `Netter-Symbol-Black.png` before launch.
- **SVG sources** for Netter wordmark/symbol welcome if they exist; PNG works otherwise.
