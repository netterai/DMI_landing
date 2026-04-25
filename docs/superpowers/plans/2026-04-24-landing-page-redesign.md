# Landing Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the existing Netter DMI landing page into a "warm editorial" monochrome design with YC orange as the only chromatic accent, replacing the indigo/amber accent system, integrating the real Netter wordmark logo, adding a new Outputs gallery section, trimming use cases 6→4, and folding standalone Problem and Phases sections into adjacent sections.

**Architecture:** Single-file static page. All work happens in `index.html`. No build step, no framework, no JS bundles. Surgical CSS-token swap drives most of the visual change; structural HTML changes happen section-by-section. Each task ends in a working page and a commit.

**Tech Stack:** Vanilla HTML/CSS/JS, Inter (Google Fonts), Newsreader italic (Google Fonts, new), pre-existing PNG logo assets.

**Reference spec:** `docs/superpowers/specs/2026-04-24-landing-page-redesign-design.md` — read this before starting any task. The plan implements the design decisions captured there.

**Verification model (since this is a static UI page):** Each task replaces unit tests with explicit visual + functional verification — open the page in a browser, confirm the criteria stated under "Verification" in each task, and only then commit. For final QA, Lighthouse + keyboard tab-through + reduced-motion test.

---

## File structure

| Action | Path | Why |
|---|---|---|
| Modify | `index.html` | Entire redesign happens here |
| Reference (no change) | `Netter-Logo-Text.png`, `Netter-Symbol-Transparent.png`, `Netter-LinkedIn-Banner.png`, `YC square logo.png`, `YC logo + text.png` | Used by the page |
| Manual / out-of-scope | `favicon.ico`, `favicon.svg`, Apple touch icon | Generated externally; spec lists as open item |

---

## Task ordering rationale

Tasks are sequenced so each commit produces a renderable page. Tokens are updated first so subsequent edits use the new system. Cuts happen *after* their content has been absorbed elsewhere, so we never have orphaned references. Motion overhaul comes near the end so it runs against the final markup, not transitional markup.

```
1.  Foundations: tokens + Newsreader load
2.  Drop unused tokens + utilities (anim-words, reveal-card cascade scaffolding)
3.  Rebuild nav (wordmark + YC chip + CTA)
4.  Rebuild hero (typography-first, serif italic, two CTAs, YC subline)
5.  Delete standalone Problem section
6.  NEW Outputs section ("What you can build")
7.  Trim & restyle Use Cases (6→4, copy scrub)
8.  Refine How it Works + add "Live in 2 weeks" closing line
9.  Delete standalone Phases section
10. NEW YC trust row
11. Refine Contact + Footer
12. Accessibility + meta + perf pass
13. Final QA
```

Ground rules used throughout:
- DRY, YAGNI, frequent commits — one task = one commit
- Every visible color, radius, motion, or font in new code goes through CSS variables
- No inline styles in new markup unless the spec requires a one-off (e.g., hero watermark opacity)
- All new SVGs are inline (no extra HTTP requests) and `aria-hidden="true"` if decorative
- Reference exact line ranges where they matter; expect drift after each task — recompute before each task by re-reading the file

---

## Task 1: Foundations — design tokens + Newsreader font

**Files:**
- Modify: `index.html` — `<head>` font link + `:root` tokens block

**Goal:** Swap the indigo/amber accent system for monochrome warm-neutrals + YC orange. Add Newsreader italic to the Google Fonts request. Add new radius scale.

- [ ] **Step 1: Read the current state**

Open `index.html`. Confirm the current Google Fonts link (~line 10) and the `:root` block (~lines 16–50). Note the line ranges before editing — they are the authoritative source.

- [ ] **Step 2: Replace the Google Fonts link**

Find:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap" rel="stylesheet" />
```

Replace with:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Newsreader:ital@1&display=swap" rel="stylesheet" />
```

Note: drop `1,300` italic Inter (unused after redesign), drop `0,300` (we use 400 minimum). Add Newsreader italic-only (no roman — we never use upright Newsreader). The two preconnects already exist in the file; if duplicated, dedupe.

- [ ] **Step 3: Replace the `:root` token block**

Find the existing `:root { ... }` block (lines ~16–50) and replace its contents with:

```css
:root {
  /* Warm neutrals — monochrome */
  --bg:           #FCFAF7;
  --bg-raised:    #FFFFFF;
  --bg-sunken:    #F4EFE7;
  --text:         #15171C;
  --secondary:    #5A5854;
  --tertiary:     #97938C;
  --border:       #E8E2D8;
  --border-strong: #D7CFC0;

  /* Single chromatic accent — used ONLY for YC moments */
  --yc-orange:    #FF6B00;

  /* Primary CTA = warm-near-black, NOT colored */
  --accent:       #15171C;
  --accent-hover: #000000;

  /* Status (rarely used; kept for any future need) */
  --success:      #16A34A;
  --error:        #DC2626;

  /* Typography */
  --font:         'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --serif:        'Newsreader', Georgia, serif;

  /* Radius — softer than before to honor brand mark roundness */
  --radius:       6px;
  --radius-sm:    6px;
  --radius-md:    10px;
  --radius-lg:    14px;
  --radius-pill:  999px;

  /* Layout */
  --nav-h:        64px;

  /* Motion */
  --ease-spring:  cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out:     cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-in-out:  cubic-bezier(0.65, 0, 0.35, 1);
}
```

This removes: `--accent-pressed`, `--accent-subtle`, `--accent-muted`, `--accent-text`, all `--amber*` tokens, `--border-med`, `--mono`. We will fix downstream references in Task 2.

- [ ] **Step 4: Update body baseline**

Find the `body { ... }` block (~lines 63–70) and update:

```css
body {
  font-family: var(--font);
  background: var(--bg);
  color: var(--text);
  font-size: 16px;
  line-height: 1.55;
  overflow-x: hidden;
  font-weight: 420;
  font-feature-settings: "ss01", "cv11"; /* Inter alt-style numerals & lowercase l */
}
```

- [ ] **Step 5: Update `.container` max-width**

Find `.container` (~line 79). Change `max-width: 1160px;` to `max-width: 1100px;`.

- [ ] **Step 6: Verification**

Open `index.html` in a browser. Expected:
- Page background is warm cream (`#FCFAF7`), not pure white
- Body text reads warm-near-black, slightly less harsh than pure black
- Newsreader has loaded (open DevTools → Network → confirm `Newsreader` woff2 appears)
- Buttons that were indigo are now showing as warm-near-black (some inline indigo references will be broken; that's fixed in Task 2)
- Layout is slightly tighter (1100px container)

DO NOT commit yet — page will have visual breakage from old indigo references; Task 2 fixes that.

- [ ] **Step 7: Commit (after Task 2)**

Skip — this task and Task 2 commit together at the end of Task 2.

---

## Task 2: Scrub indigo/amber references and remove unused motion utilities

**Files:**
- Modify: `index.html` — CSS body and JS

**Goal:** Replace all references to deleted tokens (`--accent-subtle`, `--amber-*`, `--mono`, etc.) and remove the unused `anim-words` + per-card `reveal-card` cascade systems. Page should render cleanly after this task.

- [ ] **Step 1: Find all references to deleted tokens**

In `index.html`, search for each of these strings and resolve every occurrence:

```
--accent-pressed     → use var(--accent-hover) or var(--accent)
--accent-subtle      → use var(--bg-sunken)
--accent-muted       → use var(--border)
--accent-text        → use var(--text)
--amber              → DELETE the entire rule (problem section uses these; section is removed in Task 5 anyway)
--amber-subtle       → DELETE
--amber-muted        → DELETE
--amber-text         → DELETE
--mono               → use var(--font) (we now use uppercase Inter for labels)
--border-med         → use var(--border-strong)
```

For amber/problem-section CSS, leave as-is for now (it'll be deleted with the section in Task 5). The point of this step is non-amber references only — buttons, nav, links, etc.

- [ ] **Step 2: Update `.label` to use Inter uppercase, not SF Mono**

Find the `.label` rule (~lines 95–102). Replace with:

```css
.label {
  font-family: var(--font);
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--tertiary);
  font-weight: 600;
}
```

- [ ] **Step 3: Update `.btn-primary` and `.btn` for new accent system**

Find `.btn-primary` (~lines 121–130). Replace the whole block with:

```css
.btn-primary {
  background: var(--accent);
  color: var(--bg-raised);
  border-color: var(--accent);
}

.btn-primary:hover {
  background: var(--accent-hover);
  border-color: var(--accent-hover);
}

.btn-primary:active {
  transform: scale(0.98);
}
```

Update `.btn` itself (~lines 106–119) to use `--radius-sm`:

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: -0.005em;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background 0.15s var(--ease-out), color 0.15s var(--ease-out), border-color 0.15s var(--ease-out), transform 0.1s var(--ease-out);
  border: 1px solid transparent;
  white-space: nowrap;
  text-decoration: none;
}
```

- [ ] **Step 4: Remove the `anim-words` + word-split system**

Find these CSS rules and **delete them entirely**:

```css
.word-outer { ... }
.word-inner { ... }
.anim-words.animated .word-inner { ... }
```

(They're around lines 181–194.)

Find the corresponding JS at the bottom of the file. Search for `anim-words` and `word-inner`. Delete the IntersectionObserver + word-splitting block. The exact block looks roughly like:

```js
// Word split animation
document.querySelectorAll('.anim-words').forEach(el => {
  const text = el.textContent;
  // ... wraps each word in spans ...
});
```

Delete it completely. Then in the HTML (for now leave any `class="anim-words"` references in place — they'll be removed when each section is rewritten in subsequent tasks).

- [ ] **Step 5: Replace `.reveal-card` per-card cascade with section-level fade**

Find:
```css
.reveal-card {
  opacity: 0;
  transform: translateY(32px) scale(0.97);
  transition: opacity 0.65s var(--ease-spring), transform 0.65s var(--ease-spring);
}

.reveal-card.visible { opacity: 1; transform: translateY(0) scale(1); }

.reveal-group > .reveal-card:nth-child(1) { transition-delay: 0s; }
.reveal-group > .reveal-card:nth-child(2) { transition-delay: 0.1s; }
.reveal-group > .reveal-card:nth-child(3) { transition-delay: 0.2s; }
.reveal-group > .reveal-card:nth-child(4) { transition-delay: 0.3s; }
```

Replace with:
```css
/* Section-level reveal — single unit fade-up, no per-child cascade */
.reveal-card {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s var(--ease-spring), transform 0.5s var(--ease-spring);
}

.reveal-card.visible { opacity: 1; transform: translateY(0); }

.reveal-group {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s var(--ease-spring), transform 0.5s var(--ease-spring);
}

.reveal-group.visible { opacity: 1; transform: translateY(0); }
```

In the JS at the bottom, find the IntersectionObserver that adds `.visible` to `.reveal-card` elements. Update it to also observe `.reveal-group` and `.reveal` (single-element fades):

```js
// Section-level reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

document.querySelectorAll('.reveal, .reveal-card, .reveal-group').forEach(el => {
  revealObserver.observe(el);
});
```

If a similar observer already exists, replace its body; do not duplicate.

- [ ] **Step 6: Reduced-motion guard**

Find or add this rule (place near the bottom of the CSS, before any `@media` blocks):

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .reveal, .reveal-card, .reveal-group { opacity: 1 !important; transform: none !important; }
}
```

- [ ] **Step 7: Verification**

Open the page in a browser. Expected:
- No console errors
- Buttons render warm-near-black with proper hover state
- Page content is visible (some sections may still look ugly — they get rewritten in later tasks — but nothing should be invisible or unstyled)
- Refreshing the page: sections fade in once as units, no per-card cascade
- Headlines no longer have the word-by-word reveal — they appear immediately or fade with their section
- macOS Accessibility → Reduce Motion → reload: motion is suppressed

- [ ] **Step 8: Commit**

```bash
git add index.html
git commit -m "Update design tokens to monochrome warm palette and consolidate motion

- Replace indigo/amber accent system with warm-neutral palette
- Add Newsreader italic font for editorial moments
- Remove word-by-word headline reveal and per-card cascade
- Add prefers-reduced-motion guard"
```

---

## Task 3: Rebuild nav

**Files:**
- Modify: `index.html` — nav HTML (~lines 1089–1116) + nav CSS (~lines 199–313)

**Goal:** Replace the "N + Netter + DMI" three-part logo with the wordmark image, add a YC chip pill, refine the CTA.

- [ ] **Step 1: Replace nav HTML**

Find the existing nav block (between `<!-- 1. NAVIGATION -->` and the matching `</nav>` plus the mobile drawer that follows). Replace from `<nav id="nav"` through the closing `</div>` of `<div class="nav-mobile" id="nav-mobile">` with:

```html
<nav id="nav" role="navigation" aria-label="Main navigation">
  <div class="container nav-inner">

    <a href="#hero" class="nav-logo" aria-label="Netter home">
      <img src="Netter-Logo-Text.png" alt="Netter" class="nav-wordmark" width="96" height="24" />
    </a>

    <div class="nav-links" id="nav-links">
      <a href="#use-cases">Use Cases</a>
      <a href="#how-it-works">How it Works</a>
      <a href="#contact">Contact</a>

      <span class="yc-chip" aria-label="Backed by Y Combinator, P26 batch">
        <img src="YC square logo.png" alt="" width="14" height="14" />
        <span>Backed by Y Combinator · P26</span>
      </span>

      <a href="https://calendly.com/samuel-netterai/30min?month=2026-03" target="_blank" rel="noopener" class="btn btn-primary btn-sm">Book a Demo</a>
    </div>

    <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<div class="nav-mobile" id="nav-mobile">
  <a href="#use-cases">Use Cases</a>
  <a href="#how-it-works">How it Works</a>
  <a href="#contact">Contact</a>
  <a href="https://calendly.com/samuel-netterai/30min?month=2026-03" target="_blank" rel="noopener" class="btn btn-primary btn-sm">Book a Demo</a>
</div>
```

- [ ] **Step 2: Replace nav CSS**

Find the entire nav CSS block (`#nav` through `.nav-mobile .btn`, ~lines 199–313). Replace with:

```css
/* ============================================================
   1. NAVIGATION
   ============================================================ */
#nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  height: var(--nav-h);
  background: rgba(252, 250, 247, 0.85);
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s var(--ease-out), background 0.2s var(--ease-out);
}

#nav.scrolled {
  border-bottom-color: var(--border);
  background: rgba(252, 250, 247, 0.92);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  gap: 1.5rem;
}

.nav-logo {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

.nav-wordmark {
  height: 22px;
  width: auto;
  display: block;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.75rem;
}

.nav-links a:not(.btn) {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--secondary);
  transition: color 0.15s var(--ease-out);
  position: relative;
}

.nav-links a:not(.btn):hover { color: var(--text); }

.yc-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.75rem 0.35rem 0.5rem;
  background: var(--bg-raised);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--secondary);
  white-space: nowrap;
  letter-spacing: 0.005em;
}

.yc-chip img {
  border-radius: 3px;
  display: block;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 4px;
}

.nav-toggle span {
  display: block;
  width: 22px;
  height: 1.5px;
  background: var(--text);
  transition: transform 0.25s, opacity 0.25s;
}

.nav-toggle.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.nav-toggle.open span:nth-child(2) { opacity: 0; }
.nav-toggle.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

.nav-mobile {
  display: none;
  position: fixed;
  top: var(--nav-h); left: 0; right: 0;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  padding: 1.5rem 2rem;
  flex-direction: column;
  gap: 1rem;
  z-index: 99;
}

.nav-mobile.open { display: flex; }

.nav-mobile a {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--secondary);
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}

.nav-mobile .btn { align-self: flex-start; margin-top: 0.25rem; }

@media (max-width: 880px) {
  .nav-links { display: none; }
  .nav-toggle { display: flex; }
}
```

- [ ] **Step 3: Add nav scroll-state JS**

In the JS at the bottom of the file, add (or update) the scroll listener:

```js
// Nav scroll state
const nav = document.getElementById('nav');
const updateNavState = () => {
  if (window.scrollY > 8) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
window.addEventListener('scroll', updateNavState, { passive: true });
updateNavState();
```

If the file already has a similar listener, replace the body to match the above.

- [ ] **Step 4: Verification**

- The Netter wordmark appears at the left of the nav at exactly 22px tall — no "DMI" subtext, no "N" mark
- The YC chip pill is visible, with the small Y-square icon and "Backed by Y Combinator · P26" text
- "Book a Demo" CTA is solid warm-near-black, hovers to pure black
- On scroll, the nav grows a hairline bottom border and slightly more opaque background — smooth
- At <880px width, nav links collapse to the hamburger toggle
- Mobile drawer opens, has the four items, closes correctly

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "Rebuild nav with wordmark logo and YC chip"
```

---

## Task 4: Rebuild hero (typography-first)

**Files:**
- Modify: `index.html` — hero HTML (~lines 1120–1668) + hero CSS (~lines 315–500ish)

**Goal:** Replace the elaborate SVG hero with a typography-first treatment: editorial headline, Newsreader italic subhead opener, two CTAs, YC trust subline.

- [ ] **Step 1: Locate the hero block**

In `index.html`, find the hero `<section id="hero">` (starts ~line 1123) and its closing `</section>` (~line 1668). The whole block is ~545 lines, mostly the SVG visualization.

- [ ] **Step 2: Replace the hero markup**

Replace the entire `<section id="hero">...</section>` block with:

```html
<section id="hero" aria-label="Hero">
  <img src="Netter-Symbol-Transparent.png" alt="" class="hero-watermark" aria-hidden="true" width="900" height="900" />

  <div class="container hero-inner">

    <h1 class="hero-title">Switch on your data.</h1>

    <p class="hero-sub">
      <span class="serif-italic">Most of your data sits in silos.</span>
      Netter centralizes it, structures it, and turns it into dashboards, workflows, apps, and AI agents — without an engineering team.
    </p>

    <div class="hero-actions">
      <a href="https://calendly.com/samuel-netterai/30min?month=2026-03" target="_blank" rel="noopener" class="btn btn-primary btn-arrow">Book a Demo</a>
      <a href="#how-it-works" class="btn btn-text">See how it works <span aria-hidden="true">↓</span></a>
    </div>

    <p class="hero-trust">Backed by Y Combinator · P26</p>

  </div>
</section>
```

- [ ] **Step 3: Replace the hero CSS**

Find the hero CSS block (everything from `#hero {` through the last `.hero-*` rule — approximately lines 315 through 500ish; it includes `.hero-title`, `.hero-sub`, `.hero-tagline`, `.hero-label`, `.hero-actions`, `.hero-visual`, and a `@keyframes fadeUp`). Replace the entire block with:

```css
/* ============================================================
   2. HERO
   ============================================================ */
#hero {
  position: relative;
  padding-top: calc(var(--nav-h) + clamp(4rem, 10vh, 7rem));
  padding-bottom: clamp(5rem, 12vh, 9rem);
  overflow: hidden;
  isolation: isolate;
}

.hero-watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  width: clamp(560px, 80vw, 880px);
  height: auto;
  transform: translate(-50%, -50%);
  opacity: 0.04;
  pointer-events: none;
  z-index: -1;
  filter: grayscale(1);
}

@media (max-width: 720px) {
  .hero-watermark { display: none; }
}

.hero-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.05;
  color: var(--text);
  max-width: 18ch;
  margin: 0 auto;
  opacity: 0;
  animation: heroIn 0.8s var(--ease-spring) 0.15s forwards;
}

.hero-sub {
  font-size: clamp(1.05rem, 1.5vw, 1.2rem);
  color: var(--secondary);
  max-width: 640px;
  line-height: 1.55;
  margin: clamp(1.25rem, 2.5vw, 2rem) auto 0;
  opacity: 0;
  animation: heroIn 0.8s var(--ease-spring) 0.3s forwards;
}

.serif-italic {
  font-family: var(--serif);
  font-style: italic;
  color: var(--text);
  font-weight: 400;
  font-size: 1.05em;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: clamp(1.75rem, 3vw, 2.5rem);
  opacity: 0;
  animation: heroIn 0.8s var(--ease-spring) 0.45s forwards;
}

.btn-text {
  background: transparent;
  color: var(--secondary);
  border-color: transparent;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.btn-text:hover { color: var(--text); }

.hero-trust {
  margin-top: clamp(2.5rem, 5vw, 4rem);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--tertiary);
  opacity: 0;
  animation: heroIn 0.8s var(--ease-spring) 0.6s forwards;
}

@keyframes heroIn {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .hero-title, .hero-sub, .hero-actions, .hero-trust {
    opacity: 1 !important;
    animation: none !important;
    transform: none !important;
  }
}
```

- [ ] **Step 4: Verification**

- Hero renders with no SVG diagram — just text on warm cream background
- The phrase *"Most of your data sits in silos."* renders in italic Newsreader serif (visually distinct from surrounding Inter)
- "Switch on your data." is large, tight, single line on desktop
- Two CTAs: solid black "Book a Demo →", and a quieter text link "See how it works ↓"
- Tertiary uppercase line "BACKED BY Y COMBINATOR · P26" appears below the CTAs
- Watermark is faintly visible behind the text on desktop, hidden on mobile
- On reload, headline → subhead → CTAs → trust line stagger in over ~750ms

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "Rebuild hero as typography-first with serif italic moment"
```

---

## Task 5: Delete standalone Problem section

**Files:**
- Modify: `index.html` — remove problem section markup (~lines 1672–1733 before any prior edits; recompute) + problem CSS

**Goal:** The hero subhead now carries the problem statement. Remove the standalone Problem section + its CSS + amber color tokens still in the file.

- [ ] **Step 1: Find and remove the Problem section markup**

Find the comment `<!-- 3. THE PROBLEM -->` and the `<section id="problem" class="section">...</section>` block that follows. Remove the comment + the entire `<section id="problem">` block (closing `</section>` included). Leave one blank line between the surrounding sections.

- [ ] **Step 2: Remove the Problem section CSS**

Search for `#problem`, `.problem-`, `.problem-list`, `.problem-item`, `.problem-icon`, `.problem-num`, `.problem-title`, `.problem-text`, `.problem-statement`, `.problem-header`, `.section-label-row`. Delete all rules using these selectors.

- [ ] **Step 3: Remove now-unused amber CSS variables**

If any `--amber*` references remain (declarations in `:root` or any rule body), delete them.

- [ ] **Step 4: Verification**

- Page no longer has the orange problem cards section ("Siloed data / Ideas stuck / Painful tools")
- Use Cases section now follows directly after the Hero
- No console errors, no missing-asset 404s
- Search the file for `--amber` and `problem-` — zero results

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "Drop standalone Problem section (folded into hero subhead)"
```

---

## Task 6: Add Outputs section ("What you can build")

**Files:**
- Modify: `index.html` — insert new section between Hero and Use Cases + new CSS

**Goal:** Add the new section: 4 illustrative tile previews (Dashboards, Workflows, Apps, AI Agents) with one-line outcome copy each.

- [ ] **Step 1: Insert the section markup**

Locate the closing `</section>` of the Hero (`#hero`). Immediately after it, before the Use Cases section, insert:

```html
<!-- ============================================================
     OUTPUTS — What you can build
     ============================================================ -->
<section id="outputs" class="section reveal">
  <div class="container">

    <div class="section-header">
      <p class="label">What you can build</p>
      <h2 class="section-title">Four shapes for your data.</h2>
    </div>

    <div class="outputs-grid">

      <article class="output-tile">
        <div class="output-preview output-preview-dashboards" aria-hidden="true">
          <svg viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="220" height="140" rx="8" fill="var(--bg-raised)" stroke="var(--border)" />
            <text x="16" y="32" font-family="Inter" font-size="22" font-weight="700" fill="var(--text)">2.4k</text>
            <text x="62" y="32" font-family="Inter" font-size="10" font-weight="600" fill="#16A34A">+12%</text>
            <text x="16" y="48" font-family="Inter" font-size="9" font-weight="500" fill="var(--tertiary)" letter-spacing="0.1em">REVENUE · WTD</text>
            <polyline points="16,90 36,80 56,86 76,68 96,76 116,60 136,66 156,52 176,58 196,40" fill="none" stroke="var(--text)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            <polyline points="16,90 36,80 56,86 76,68 96,76 116,60 136,66 156,52 176,58 196,40 196,116 16,116" fill="var(--text)" opacity="0.06"/>
            <line x1="16" y1="116" x2="204" y2="116" stroke="var(--border)" stroke-width="1"/>
            <rect x="16" y="124" width="40" height="6" rx="3" fill="var(--text)" opacity="0.18"/>
            <rect x="60" y="124" width="24" height="6" rx="3" fill="var(--text)" opacity="0.10"/>
          </svg>
        </div>
        <h3 class="output-title">Dashboards</h3>
        <p class="output-desc">Real-time KPIs and operational metrics, built without engineering.</p>
      </article>

      <article class="output-tile">
        <div class="output-preview output-preview-workflows" aria-hidden="true">
          <svg viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="220" height="140" rx="8" fill="var(--bg-raised)" stroke="var(--border)" />
            <rect x="20" y="55" width="44" height="30" rx="6" fill="var(--bg)" stroke="var(--border-strong)"/>
            <path d="M 36,68 l -3,5 h 4 l -3,5" fill="none" stroke="var(--text)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="64" y1="70" x2="84" y2="70" stroke="var(--text)" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.5"/>
            <rect x="84" y="55" width="44" height="30" rx="6" fill="var(--bg)" stroke="var(--border-strong)"/>
            <circle cx="106" cy="70" r="6" fill="none" stroke="var(--text)" stroke-width="1.4"/>
            <circle cx="106" cy="70" r="2" fill="var(--text)"/>
            <line x1="128" y1="70" x2="148" y2="70" stroke="var(--text)" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.5"/>
            <polygon points="146,67 152,70 146,73" fill="var(--text)"/>
            <rect x="148" y="55" width="44" height="30" rx="6" fill="var(--text)" stroke="var(--text)"/>
            <path d="M 161,70 l 3,4 l 8,-8" fill="none" stroke="var(--bg-raised)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            <text x="20" y="40" font-family="Inter" font-size="9" font-weight="600" fill="var(--tertiary)" letter-spacing="0.1em">3 STEPS · LIVE</text>
          </svg>
        </div>
        <h3 class="output-title">Workflows</h3>
        <p class="output-desc">Automate cross-system operations end to end.</p>
      </article>

      <article class="output-tile">
        <div class="output-preview output-preview-apps" aria-hidden="true">
          <svg viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="220" height="140" rx="8" fill="var(--bg-raised)" stroke="var(--border)" />
            <text x="16" y="28" font-family="Inter" font-size="11" font-weight="600" fill="var(--text)">New supplier</text>
            <rect x="16" y="40" width="120" height="14" rx="4" fill="var(--bg)" stroke="var(--border)"/>
            <text x="22" y="50" font-family="Inter" font-size="9" fill="var(--tertiary)">Acme Logistics</text>
            <rect x="16" y="62" width="120" height="14" rx="4" fill="var(--bg)" stroke="var(--border)"/>
            <text x="22" y="72" font-family="Inter" font-size="9" fill="var(--tertiary)">Net 60</text>
            <rect x="16" y="84" width="80" height="14" rx="4" fill="var(--bg)" stroke="var(--border)"/>
            <text x="22" y="94" font-family="Inter" font-size="9" fill="var(--tertiary)">€ 42,000</text>
            <rect x="16" y="108" width="60" height="20" rx="5" fill="var(--text)"/>
            <text x="46" y="121" font-family="Inter" font-size="9" font-weight="600" fill="var(--bg-raised)" text-anchor="middle">Submit</text>
            <rect x="160" y="40" width="44" height="44" rx="6" fill="var(--bg)" stroke="var(--border)"/>
            <text x="182" y="60" font-family="Inter" font-size="9" font-weight="600" fill="var(--tertiary)" text-anchor="middle" letter-spacing="0.1em">DOC</text>
            <line x1="170" y1="68" x2="194" y2="68" stroke="var(--text)" stroke-width="1.2" opacity="0.3"/>
            <line x1="170" y1="74" x2="190" y2="74" stroke="var(--text)" stroke-width="1.2" opacity="0.3"/>
          </svg>
        </div>
        <h3 class="output-title">Apps</h3>
        <p class="output-desc">Internal tools your teams actually want to use.</p>
      </article>

      <article class="output-tile">
        <div class="output-preview output-preview-agents" aria-hidden="true">
          <svg viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="220" height="140" rx="8" fill="var(--bg-raised)" stroke="var(--border)" />
            <circle cx="24" cy="32" r="10" fill="var(--bg)" stroke="var(--border-strong)"/>
            <path d="M19 32 h10 M24 27 v10" stroke="var(--text)" stroke-width="1.4" stroke-linecap="round"/>
            <rect x="42" y="22" width="160" height="22" rx="6" fill="var(--bg)" stroke="var(--border)"/>
            <text x="52" y="36" font-family="Inter" font-size="10" fill="var(--text)">Find unpaid invoices over 60 days</text>
            <rect x="22" y="56" width="180" height="32" rx="6" fill="var(--text)" opacity="0.05"/>
            <text x="32" y="70" font-family="Inter" font-size="10" font-weight="500" fill="var(--text)">14 invoices · €128k outstanding</text>
            <text x="32" y="82" font-family="Inter" font-size="9" fill="var(--secondary)">Drafted 14 reminder emails. Send all?</text>
            <rect x="22" y="98" width="68" height="22" rx="5" fill="var(--text)"/>
            <text x="56" y="112" font-family="Inter" font-size="9" font-weight="600" fill="var(--bg-raised)" text-anchor="middle">Send all</text>
            <rect x="98" y="98" width="68" height="22" rx="5" fill="var(--bg)" stroke="var(--border-strong)"/>
            <text x="132" y="112" font-family="Inter" font-size="9" font-weight="600" fill="var(--text)" text-anchor="middle">Review</text>
          </svg>
        </div>
        <h3 class="output-title">AI Agents</h3>
        <p class="output-desc">Autonomous operators that act on your data.</p>
      </article>

    </div>
  </div>
</section>
```

- [ ] **Step 2: Add the section CSS**

Add this block to the CSS (place it between the hero CSS and any later section CSS, or at the end of the section-styles block):

```css
/* ============================================================
   3. OUTPUTS
   ============================================================ */
#outputs {
  padding: clamp(5rem, 9vw, 8rem) 0;
  border-top: 1px solid var(--border);
}

.section-header {
  text-align: center;
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
}

.section-header .label {
  margin-bottom: 0.75rem;
  display: block;
}

.section-title {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: var(--text);
  max-width: 22ch;
  margin: 0 auto;
}

.outputs-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1000px) {
  .outputs-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 540px) {
  .outputs-grid { grid-template-columns: 1fr; }
}

.output-tile {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.output-preview {
  width: 100%;
  aspect-ratio: 220 / 140;
  border-radius: var(--radius-md);
  background: var(--bg-raised);
  border: 1px solid var(--border);
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(21,23,28,0.04);
}

.output-preview svg {
  display: block;
  width: 100%;
  height: 100%;
}

.output-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
  margin-top: 0.5rem;
}

.output-desc {
  font-size: 0.9rem;
  color: var(--secondary);
  line-height: 1.5;
}
```

- [ ] **Step 3: Verification**

- New section "What you can build" / "Four shapes for your data." appears between hero and use cases
- 4 tiles in a row on desktop, 2×2 on tablet, stacked on mobile
- Each tile has a small designed preview, then a heading word, then a one-line description
- All tile internals are monochrome — no indigo, no chromatic color
- Section fades up as a unit when scrolled into view

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Add Outputs gallery section with four illustrative tile previews"
```

---

## Task 7: Trim and restyle Use Cases

**Files:**
- Modify: `index.html` — use-cases HTML (~6 cards) + use-cases CSS

**Goal:** Cut Customer Enrichment + Data Monetization. Restyle the remaining 4 with monochrome icons, refined card hover, and copy-scrubbed bullets.

- [ ] **Step 1: Locate the use-cases section**

Find `<section id="use-cases" class="section">` and its closing `</section>`. There are 6 `<article class="case-card">` blocks inside.

- [ ] **Step 2: Replace the section content**

Replace from the opening `<section id="use-cases"` through its closing `</section>` with:

```html
<section id="use-cases" class="section reveal">
  <div class="container">
    <div class="section-header">
      <p class="label">Use Cases</p>
      <h2 class="section-title">Real operations. Real impact.</h2>
    </div>

    <div class="cases-grid">

      <article class="case-card">
        <svg class="case-icon" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <path d="M20 36S4 26 4 16a8 8 0 0116-1 8 8 0 0116 1c0 10-16 20-16 20z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
          <path d="M10 20h5l3-5 4 10 3-5h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p class="case-tag">Healthcare</p>
        <h3 class="case-title">Cash Collection</h3>
        <ul class="case-bullets">
          <li>Centralize invoices and payments in real time</li>
          <li>Structure receivables into a single control layer</li>
          <li>Automate reminders, task routing, and recovery</li>
        </ul>
        <p class="case-outcome"><span class="serif-italic">Reduce time-to-payment</span> and free up working capital.</p>
      </article>

      <article class="case-card">
        <svg class="case-icon" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <rect x="2" y="14" width="22" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/>
          <path d="M24 19h8l5 6v3H24v-9z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
          <circle cx="10" cy="30" r="3" stroke="currentColor" stroke-width="1.5"/>
          <circle cx="31" cy="30" r="3" stroke="currentColor" stroke-width="1.5"/>
        </svg>
        <p class="case-tag">Logistics</p>
        <h3 class="case-title">Route &amp; Load Optimization</h3>
        <ul class="case-bullets">
          <li>Unify your transport, ERP, and fleet systems into one model</li>
          <li>Optimize routes, loads, and costs automatically</li>
          <li>Eliminate manual planning</li>
        </ul>
        <p class="case-outcome"><span class="serif-italic">Lower fuel costs,</span> higher margins.</p>
      </article>

      <article class="case-card">
        <svg class="case-icon" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <circle cx="14" cy="34" r="2.5" stroke="currentColor" stroke-width="1.5"/>
          <circle cx="30" cy="34" r="2.5" stroke="currentColor" stroke-width="1.5"/>
          <path d="M2 4h5l4 18h22l4-13H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p class="case-tag">Retail &amp; FMCG</p>
        <h3 class="case-title">Market Intelligence</h3>
        <ul class="case-bullets">
          <li>Consolidate channel sales data from every source</li>
          <li>Forecast demand by SKU, region, and channel</li>
          <li>Alert on stockouts and market-share shifts</li>
        </ul>
        <p class="case-outcome"><span class="serif-italic">Protect revenue</span> and react faster to the market.</p>
      </article>

      <article class="case-card">
        <svg class="case-icon" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <circle cx="20" cy="16" r="8" stroke="currentColor" stroke-width="1.5"/>
          <path d="M20 8V4M20 24v4M12 16H8M32 16h-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <circle cx="20" cy="16" r="3" stroke="currentColor" stroke-width="1.4"/>
          <rect x="6" y="30" width="28" height="6" rx="2" stroke="currentColor" stroke-width="1.5"/>
          <path d="M13 33h5M22 33h5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
        </svg>
        <p class="case-tag">Manufacturing</p>
        <h3 class="case-title">Scheduling Optimization</h3>
        <ul class="case-bullets">
          <li>Ingest every constraint — supply, capacity, deadlines</li>
          <li>Generate optimized schedules automatically</li>
          <li>Push directly into your existing planning tools</li>
        </ul>
        <p class="case-outcome"><span class="serif-italic">Maximize utilization,</span> reduce waste.</p>
      </article>

    </div>
  </div>
</section>
```

- [ ] **Step 3: Replace the use-cases CSS**

Find the existing use-cases CSS block (selectors `.cases-grid`, `.case-card`, `.case-icon`, `.case-tag`, `.case-title`, `.case-bullets`, `.case-outcome`). Replace with:

```css
/* ============================================================
   4. USE CASES
   ============================================================ */
.cases-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

@media (max-width: 720px) {
  .cases-grid { grid-template-columns: 1fr; }
}

.case-card {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: clamp(1.5rem, 3vw, 2.25rem);
  background: var(--bg-raised);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: var(--text);
  transition: border-color 0.2s var(--ease-out), background 0.2s var(--ease-out);
}

.case-card:hover {
  border-color: var(--border-strong);
  background: #FFFFFF;
}

.case-icon {
  width: 32px;
  height: 32px;
  color: var(--text);
}

.case-tag {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--tertiary);
}

.case-title {
  font-size: 1.35rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--text);
}

.case-bullets {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin: 0.25rem 0 0.5rem;
}

.case-bullets li {
  font-size: 0.95rem;
  color: var(--secondary);
  line-height: 1.5;
  padding-left: 1.25rem;
  position: relative;
}

.case-bullets li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.65em;
  width: 6px;
  height: 1px;
  background: var(--tertiary);
}

.case-outcome {
  font-size: 0.95rem;
  color: var(--text);
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}
```

- [ ] **Step 4: Verification**

- 4 case cards in a 2×2 grid (was 6 in 3×2)
- Customer Enrichment and Data Monetization are gone
- All icons render in warm-near-black (no amber)
- No "DSO", "INSEE", "TMS", "sell-in/sell-out" anywhere on the page (Cmd+F to confirm)
- Hover on a card: subtle background lift + border darken, no scale, no shadow bloom
- Outcome line: italic serif on the first phrase, regular Inter for the rest

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "Trim use cases 6 to 4 and scrub jargon for non-technical readers"
```

---

## Task 8: Refine How it Works + add "Live in 2 weeks" closing line

**Files:**
- Modify: `index.html` — how-it-works HTML + CSS

**Goal:** Restyle step icons to monochrome, update sunken background to warm tone, add the absorbed Phases content as a single closing confidence line.

- [ ] **Step 1: Locate the section**

Find `<section id="how-it-works" class="section section-sunken">`.

- [ ] **Step 2: Replace the inner content**

Inside the section (keep the `<section>` opening and closing tags as-is, including `class="section section-sunken"`), replace the content. The full new section block:

```html
<section id="how-it-works" class="section section-sunken reveal">
  <div class="container">
    <div class="section-header">
      <p class="label">How it Works</p>
      <h2 class="section-title">From raw data to autonomous operations.</h2>
    </div>

    <div class="steps-grid">

      <div class="step-card">
        <svg class="step-icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <circle cx="24" cy="24" r="10" stroke="currentColor" stroke-width="1.5"/>
          <path d="M18 24h-12M30 24h12M24 18v-12M24 30v12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <circle cx="6" cy="24" r="3" stroke="currentColor" stroke-width="1.3"/>
          <circle cx="42" cy="24" r="3" stroke="currentColor" stroke-width="1.3"/>
          <circle cx="24" cy="6" r="3" stroke="currentColor" stroke-width="1.3"/>
          <circle cx="24" cy="42" r="3" stroke="currentColor" stroke-width="1.3"/>
        </svg>
        <p class="step-num">01</p>
        <h3 class="step-title">Connect</h3>
        <p class="step-desc">Plug any source (CRM, ERP, data lake) or simply upload raw files.</p>
        <svg class="step-connector" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M6 10h8M11 6l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>

      <div class="step-card">
        <svg class="step-icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <path d="M24 6L4 16l20 10 20-10L24 6z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
          <path d="M4 24l20 10 20-10" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
          <path d="M4 32l20 10 20-10" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
        </svg>
        <p class="step-num">02</p>
        <h3 class="step-title">Structure</h3>
        <p class="step-desc">Netter cleans, normalizes, and organizes everything into a unified ontology — automatically.</p>
        <svg class="step-connector" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M6 10h8M11 6l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>

      <div class="step-card">
        <svg class="step-icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="18" height="14" rx="3" stroke="currentColor" stroke-width="1.5"/>
          <rect x="26" y="4" width="18" height="14" rx="3" stroke="currentColor" stroke-width="1.5"/>
          <rect x="4" y="30" width="18" height="14" rx="3" stroke="currentColor" stroke-width="1.5"/>
          <rect x="26" y="30" width="18" height="14" rx="3" stroke="currentColor" stroke-width="1.5"/>
          <path d="M13 18v12M35 18v12M22 11h4M22 37h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="3 2"/>
        </svg>
        <p class="step-num">03</p>
        <h3 class="step-title">Build</h3>
        <p class="step-desc">Create dashboards, workflows, apps, and AI agents. No code.</p>
        <svg class="step-connector" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M6 10h8M11 6l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>

      <div class="step-card">
        <svg class="step-icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <path d="M24 4c-6 8-8 16-8 24h16c0-8-2-16-8-24z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
          <circle cx="24" cy="22" r="3" stroke="currentColor" stroke-width="1.5"/>
          <path d="M16 28c-4 0-8 2-10 6h10" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
          <path d="M32 28c4 0 8 2 10 6H32" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
          <path d="M20 42h8M22 38h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <p class="step-num">04</p>
        <h3 class="step-title">Operate</h3>
        <p class="step-desc">Netter runs, monitors, and optimizes. Your team stays focused on the business.</p>
      </div>

    </div>

    <p class="how-confidence">
      <span class="serif-italic">Live in 2 weeks.</span>
      No consulting. No engineering dependency.
    </p>

  </div>
</section>
```

- [ ] **Step 3: Update the section CSS**

Find existing how-it-works CSS (`.steps-grid`, `.step-card`, `.step-icon`, `.step-num`, `.step-title`, `.step-desc`, `.step-connector`, and `.section-sunken`). Replace with:

```css
/* ============================================================
   5. HOW IT WORKS
   ============================================================ */
.section-sunken {
  background: var(--bg-sunken);
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  align-items: start;
}

@media (max-width: 980px) {
  .steps-grid { grid-template-columns: repeat(2, 1fr); }
  .step-connector { display: none; }
}
@media (max-width: 540px) {
  .steps-grid { grid-template-columns: 1fr; }
}

.step-card {
  position: relative;
  padding: 1.5rem;
  background: var(--bg-raised);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: var(--text);
}

.step-icon {
  width: 32px;
  height: 32px;
  color: var(--text);
  margin-bottom: 0.5rem;
}

.step-num {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  color: var(--tertiary);
}

.step-title {
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--text);
}

.step-desc {
  font-size: 0.9rem;
  color: var(--secondary);
  line-height: 1.5;
}

.step-connector {
  position: absolute;
  top: 50%;
  right: -16px;
  transform: translateY(-50%);
  color: var(--tertiary);
  z-index: 1;
}

.how-confidence {
  text-align: center;
  font-size: clamp(1.1rem, 1.8vw, 1.35rem);
  color: var(--text);
  margin-top: clamp(2.5rem, 5vw, 4rem);
  max-width: 50ch;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.5;
}
```

- [ ] **Step 4: Verification**

- Section background is warm beige (`#F4EFE7`), not the previous gray
- 4 step cards in a row (Connect → Structure → Build → Operate), each with a monochrome stroked icon
- Arrow connectors between cards on desktop
- Below the cards, a centered confidence line: italic serif "Live in 2 weeks." then "No consulting. No engineering dependency."
- Cards stack to 2×2 at tablet, single column on mobile
- No "Phase 01 / 02 / Pilot / Scale" content is duplicated below — the standalone Phases section still exists at this point but will be deleted in Task 9

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "Refine How it Works section and add 'Live in 2 weeks' closing line"
```

---

## Task 9: Delete standalone Phases section

**Files:**
- Modify: `index.html` — remove `#get-started` section markup + CSS

**Goal:** The "Live in 2 weeks" promise now lives in How it Works. Remove the redundant Phases section.

- [ ] **Step 1: Locate the section**

Find the `<!-- GET STARTED -->` comment and `<section id="get-started" class="section">` and its closing `</section>`.

- [ ] **Step 2: Delete the section**

Remove the comment and the entire `<section id="get-started">...</section>` block.

- [ ] **Step 3: Remove the section CSS**

Search for and delete all rules for: `.phases-grid`, `.phase-card`, `.phase-header`, `.phase-icon`, `.phase-num`, `.phase-title`, `.phase-subtitle`, `.phase-body`, `.phase-bullets`, `.phase-footer`.

- [ ] **Step 4: Verification**

- After How it Works (with confidence line), the page goes directly to Contact (or the new YC trust row, once Task 10 lands)
- No "Phase 01 / Phase 02 / Pilot / Scale" content remains
- Search the file: zero matches for `phase-` or `phases-`

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "Drop standalone Phases section (folded into How it Works confidence line)"
```

---

## Task 10: Add YC trust row

**Files:**
- Modify: `index.html` — insert new section before `#contact` + new CSS

**Goal:** Add the third and final YC moment: a quiet full-bleed band with the Y Combinator wordmark and one supporting line.

- [ ] **Step 1: Insert the section markup**

Find the contact section opening: `<section id="contact" class="section">`. Immediately before that section's comment block (or the section itself), insert:

```html
<!-- ============================================================
     YC TRUST ROW
     ============================================================ -->
<section class="yc-row reveal" aria-label="Backed by Y Combinator">
  <div class="container yc-row-inner">
    <p class="label yc-row-label">Backed by</p>
    <img src="YC logo + text.png" alt="Y Combinator" class="yc-row-mark" width="220" height="60" loading="lazy" />
    <p class="yc-row-supporting">From the same accelerator that backed Stripe, Airbnb, and Doordash.</p>
  </div>
</section>
```

- [ ] **Step 2: Add the section CSS**

Add at the appropriate place (before contact, or near other section styles):

```css
/* ============================================================
   6. YC TRUST ROW
   ============================================================ */
.yc-row {
  padding: clamp(3.5rem, 7vw, 5.5rem) 0;
  border-top: 1px solid var(--border);
  background: var(--bg);
}

.yc-row-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.25rem;
}

.yc-row-label {
  color: var(--tertiary);
}

.yc-row-mark {
  height: 36px;
  width: auto;
  display: block;
  filter: none;
}

.yc-row-supporting {
  font-size: 0.95rem;
  color: var(--secondary);
  max-width: 50ch;
  line-height: 1.55;
}
```

- [ ] **Step 3: Verification**

- A new quiet band appears between How it Works and Contact
- Center-aligned: small uppercase "BACKED BY" → Y Combinator wordmark (~36px tall) → supporting sentence
- The wordmark is the only orange element in this section — and one of only three orange moments on the entire page (nav chip, hero subline, this row)
- Mark image is lazy-loaded (DevTools → Network → image only loads as you scroll near it)

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Add YC trust row above contact section"
```

---

## Task 11: Refine Contact + Footer

**Files:**
- Modify: `index.html` — `#contact` section + footer

**Goal:** Strip the contact section to the essentials with a hero callback. Refine the footer to wordmark + copyright + links.

- [ ] **Step 1: Replace contact section content**

Find `<section id="contact" class="section">`. Replace its inner content (keep the `<section>` tag with class) with:

```html
<section id="contact" class="section reveal">
  <div class="container">
    <div class="contact-simple">
      <p class="label">Book a Demo</p>
      <h2 class="contact-title">Ready to switch on your data?</h2>
      <p class="contact-sub">
        Tell us about your operation. We'll show you what's possible.
      </p>
      <a href="https://calendly.com/samuel-netterai/30min?month=2026-03" target="_blank" rel="noopener"
         class="btn btn-primary btn-arrow">Book a Demo</a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Update contact CSS**

Find the existing `.contact-simple`, `.contact-title`, `.contact-sub` rules. Replace with:

```css
/* ============================================================
   7. CONTACT
   ============================================================ */
.contact-simple {
  text-align: center;
  max-width: 640px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.contact-simple .label { margin-bottom: 0.25rem; }

.contact-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1.1;
  color: var(--text);
}

.contact-sub {
  font-size: 1.05rem;
  color: var(--secondary);
  line-height: 1.55;
}

.contact-simple .btn { margin-top: 1.5rem; }
```

- [ ] **Step 3: Replace footer**

Find the existing footer (after `</main>`, look for `<!-- 8. FOOTER -->` or similar). Replace the entire footer block with:

```html
<!-- ============================================================
     8. FOOTER
     ============================================================ -->
<footer class="footer">
  <div class="container footer-inner">
    <a href="#hero" class="footer-logo" aria-label="Netter home">
      <img src="Netter-Logo-Text.png" alt="Netter" width="80" height="20" />
    </a>
    <p class="footer-copy">© 2026 Netter</p>
    <ul class="footer-links">
      <li><a href="#contact">Contact</a></li>
      <li><a href="https://www.linkedin.com/company/netterai" target="_blank" rel="noopener">LinkedIn</a></li>
    </ul>
  </div>
</footer>
```

- [ ] **Step 4: Replace footer CSS**

Find existing footer rules and replace with:

```css
/* ============================================================
   8. FOOTER
   ============================================================ */
.footer {
  border-top: 1px solid var(--border);
  padding: 2.5rem 0;
  background: var(--bg);
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.footer-logo img {
  height: 20px;
  width: auto;
  display: block;
}

.footer-copy {
  font-size: 0.85rem;
  color: var(--tertiary);
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-links a {
  font-size: 0.85rem;
  color: var(--secondary);
  transition: color 0.15s var(--ease-out);
}

.footer-links a:hover { color: var(--text); }
```

- [ ] **Step 5: Verification**

- Contact section reads "Ready to switch on your data?" with a single CTA
- Clicking the CTA opens the Calendly link in a new tab
- Footer has wordmark left, copyright center, two links right
- Footer wordmark is exactly 20px tall

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "Refine Contact and Footer to essentials with hero callback"
```

---

## Task 12: Accessibility, meta, performance pass

**Files:**
- Modify: `index.html` — `<head>`, `<body>` preamble, focus styles

**Goal:** Add skip link, refine focus rings, update title and meta, add font preload, image lazy-loading where appropriate.

- [ ] **Step 1: Update title and meta tags**

In `<head>`, find and replace:

```html
<title>Netter DMI | Data × Machine Intelligence</title>
<meta name="description" content="Netter is a Data-AI platform that connects, structures and activates your company's data, without requiring an engineering team." />
```

Replace with:

```html
<title>Netter — Switch on your data</title>
<meta name="description" content="Netter centralizes and structures your company's data, then turns it into dashboards, workflows, apps, and AI agents — without an engineering team. Backed by Y Combinator." />

<!-- Open Graph -->
<meta property="og:title" content="Netter — Switch on your data" />
<meta property="og:description" content="Netter centralizes and structures your company's data, then turns it into dashboards, workflows, apps, and AI agents — without an engineering team." />
<meta property="og:image" content="Netter-LinkedIn-Banner.png" />
<meta property="og:type" content="website" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Netter — Switch on your data" />
<meta name="twitter:description" content="Netter centralizes and structures your company's data, then turns it into dashboards, workflows, apps, and AI agents." />
<meta name="twitter:image" content="Netter-LinkedIn-Banner.png" />
```

- [ ] **Step 2: Preload the wordmark**

Add to `<head>` after the meta block:

```html
<link rel="preload" as="image" href="Netter-Logo-Text.png" />
```

- [ ] **Step 3: Add skip link**

Immediately after `<body>` opens, before the nav, insert:

```html
<a href="#hero" class="skip-link">Skip to content</a>
```

Add CSS for it (place near the top of the CSS, after the reset):

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 8px;
  background: var(--text);
  color: var(--bg-raised);
  padding: 0.5rem 0.85rem;
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  font-weight: 500;
  z-index: 200;
  transition: top 0.15s var(--ease-out);
}

.skip-link:focus { top: 8px; }
```

- [ ] **Step 4: Add visible focus ring**

Append to the global styles (near the reset):

```css
:focus-visible {
  outline: 2px solid var(--text);
  outline-offset: 3px;
  border-radius: 2px;
}

button:focus-visible,
.btn:focus-visible {
  outline-offset: 4px;
}
```

- [ ] **Step 5: Audit alt text on all images**

Search the file for `<img`. For each image confirm:
- `Netter-Logo-Text.png` → `alt="Netter"`
- `Netter-Symbol-Transparent.png` (hero watermark) → `alt=""` and `aria-hidden="true"`
- `YC square logo.png` (nav chip) → `alt=""` (the chip's surrounding `<span>` carries the `aria-label`)
- `YC logo + text.png` (trust row) → `alt="Y Combinator"`

- [ ] **Step 6: Verification**

- Tab from page top: first focus lands on the skip link (it pops down from above), Enter scrolls to hero
- Continue tabbing: nav links, then YC chip skipped (it's a span), then CTA, then hero CTAs, etc. Every interactive element shows a visible warm-near-black focus ring
- View page source: title is "Netter — Switch on your data"
- DevTools → Network: `Netter-Logo-Text.png` request shows `Initiator: Preload`
- DevTools → Lighthouse → Run report. Targets: Performance ≥ 95, Accessibility = 100, Best Practices ≥ 95, SEO = 100. Investigate and fix any 100→<100 issues that surface.

- [ ] **Step 7: Commit**

```bash
git add index.html
git commit -m "Accessibility, meta, and performance pass

- Update title, description, OG, Twitter cards
- Preload nav wordmark
- Add skip link and visible focus ring
- Audit alt text on all images"
```

---

## Task 13: Final QA

**Files:**
- Modify: `index.html` only if QA finds issues

**Goal:** End-to-end visual + functional QA. Document any defects, fix them in a final commit.

- [ ] **Step 1: Desktop QA at three widths**

Open the page in a browser. Resize to each of these widths and confirm visually:

| Width | Expected |
|---|---|
| 1920 | Hero centered, wordmark crisp at 22px, all sections render correctly with comfortable margins |
| 1440 | No layout shifts vs. 1920; container at 1100px is centered with breathing room |
| 1280 | Nav still horizontal, all use case + step grids intact |

- [ ] **Step 2: Mobile QA at three widths**

Use DevTools device emulation or actual devices:

| Width | Expected |
|---|---|
| 375 (iPhone SE) | Nav collapses to hamburger, hero text scales down, all CTAs reachable, watermark hidden |
| 390 (iPhone 14) | Same as 375; small differences in font scaling are fine |
| 768 (iPad) | Outputs grid is 2×2, use cases are 2×2, steps are 2×2 (or 4-up if wide enough) |

- [ ] **Step 3: Keyboard tab-through**

From the very top of the page, press Tab repeatedly. Confirm in this exact order:

1. Skip link (pops down)
2. Nav: Netter logo
3. Nav: Use Cases
4. Nav: How it Works
5. Nav: Contact
6. Nav: Book a Demo CTA
7. Hero: Book a Demo CTA
8. Hero: See how it works link
9. (skip through Outputs section - no interactives)
10. Use Cases: any internal links if present (none in current spec)
11. (skip through How it Works - no interactives)
12. Contact: Book a Demo CTA
13. Footer: Netter logo, Contact, LinkedIn

Every focused element must show a visible 2px outline.

- [ ] **Step 4: Reduced-motion test**

macOS: System Settings → Accessibility → Display → Reduce Motion ON. Reload the page. Expected:
- No fade-up animations on initial load
- No section reveals on scroll (sections appear immediately)
- Smooth scroll is disabled (anchor clicks jump instantly)

Linux/Windows: emulate via DevTools → Rendering → Emulate CSS prefers-reduced-motion: reduce.

- [ ] **Step 5: Lighthouse run**

DevTools → Lighthouse → Mobile + Desktop reports. Capture scores. Targets:

| Metric | Target |
|---|---|
| Performance | ≥ 95 |
| Accessibility | 100 |
| Best Practices | ≥ 95 |
| SEO | 100 |

Common issues and fixes:
- Image without explicit dimensions → add `width`/`height` attributes
- Image not lazy-loaded → add `loading="lazy"` (skip for above-fold images and the wordmark)
- Color contrast warning → check with the spec's contrast table; tertiary text on background only meets AA-large, never use it for body copy
- "Heading levels skipped" → ensure each section has `h2` as the section heading, no jumps

- [ ] **Step 6: Browser sweep**

Open in Chrome, Safari, Firefox (last 2 versions each). Confirm:
- Backdrop-filter on nav works (Safari: yes; Firefox: yes since v103)
- Newsreader italic renders correctly
- Variable font weight 420 falls back gracefully if needed (it should appear identical to 400 on browsers that don't support sub-100 increments)

- [ ] **Step 7: Confirm no console errors**

DevTools → Console. Should be empty after page load and on scroll.

- [ ] **Step 8: Final search for cleanup**

Grep the file for any remaining red flags:
- `--accent-pressed`, `--accent-subtle`, `--accent-muted`, `--accent-text`, `--amber`, `--mono`, `--border-med` — should all be zero hits
- `anim-words`, `word-outer`, `word-inner` — should all be zero hits
- `phase-`, `problem-` — should all be zero hits (note: avoid matching unrelated words; use precise terms)
- `INSEE`, `DSO`, `sell-in`, `sell-out`, `TMS, ERP` — should all be zero hits

- [ ] **Step 9: Commit fixes (if any)**

If any issues were found and fixed:

```bash
git add index.html
git commit -m "Final QA fixes: <list specific issues>"
```

If no fixes needed, no commit needed; the redesign is complete.

- [ ] **Step 10: Document QA results**

In `docs/superpowers/plans/2026-04-24-landing-page-redesign.md`, append a brief QA results note at the very bottom:

```markdown
---

## QA Results (filled by implementer)

- Lighthouse desktop: Performance __ / Accessibility __ / Best Practices __ / SEO __
- Lighthouse mobile:  Performance __ / Accessibility __ / Best Practices __ / SEO __
- Issues found and fixed: (list, or "none")
- Outstanding issues to address later: (list, or "none")
```

Commit the plan update:

```bash
git add docs/superpowers/plans/2026-04-24-landing-page-redesign.md
git commit -m "Record QA results for landing page redesign"
```

---

## Self-review (writer)

**Spec coverage check:** Each spec section has at least one task implementing it.
- Foundations (palette, type, radius, motion, density) → Task 1, Task 2
- IA changes (problem dropped, outputs added, use cases trimmed, phases dropped, YC row added) → Tasks 5, 6, 7, 9, 10
- Section-by-section design (nav, hero, outputs, use cases, how it works, YC row, contact, footer) → Tasks 3, 4, 6, 7, 8, 10, 11
- Brand integration (wordmark, YC chip, YC row, watermark, OG) → Tasks 3, 4, 10, 11, 12
- Motion principles (cuts, single section reveal, reduced-motion) → Task 2 + per-section reveals
- Implementation notes (single file, asset directory, action items, accessibility, performance, code-to-delete, browser support, testing) → Tasks 1, 2, 5, 7, 9, 12, 13

**Placeholder scan:** No "TBD" / "implement later" / "similar to Task N" / unspecified handlers in the plan. Where the plan refers to existing JS observers, it specifies the replacement body.

**Type/identifier consistency:** Class names used in the plan are consistent across tasks. The two new spans `.serif-italic` (Task 4 hero, Task 7 case-outcome, Task 8 confidence line) all share the same definition from Task 4. The variable `--border-strong` is introduced in Task 1 and referenced in Tasks 6, 7, 8.

**Out-of-scope items honored:** No A/B testing, no analytics changes, no real product screenshots, no internationalization, no blog. Favicon generation noted as manual / external.
