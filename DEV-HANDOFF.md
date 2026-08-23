# Vivid Mockups — Developer Handoff

**Date:** July 1, 2026
**Pages covered:** homepage, vivid-trucks, vividx, vivid-classics, vrxover, vr-truck-ymm, wheels-cat, vivid-pdp
**Standard:** WCAG 2.1 AA · Mobile-ready · Valid HTML structure

All eight pages were audited and remediated in place. A pre-change backup of the originals is available (`vivid-mockups-backup-pre-a11y.tar.gz` in the session outputs). Every change below has been applied and verified — the pages are ready to build from.

---

## 1. Changes applied to all 8 pages

### Structure & landmarks
- **Skip link** added as the first element in `<body>` (`.skip-link`, visible on keyboard focus), targeting the new main landmark. *(WCAG 2.4.1)*
- **`<main id="main">`** landmark now wraps all page content between the sticky header stack and the footer. Placed after the header/nav/mobile-YMM wrapper so nesting stays valid. *(WCAG 1.3.1)*
- **`<nav aria-label="Primary">`** on the primary nav.
- **`role="search"`** on the header search container.
- **HTML validity:** a pre-existing unclosed `<div class="wrap">` in the "Our Story" timeline section was fixed on all five homepage-family pages. All 8 pages now parse with zero tag-balance errors.

### Forms & controls
- Header search input: `aria-label="Search parts"`. *(WCAG 3.3.2 — placeholder is not a label)*
- Both newsletter email inputs per page: `aria-label="Email address"`.
- All Year/Make/Model/Trim selects (and every other select): `aria-label` derived from their placeholder option, e.g. `aria-label="Select year"`.
- Hamburger button: `aria-expanded="false"` added (already had `aria-label="Open menu"`).

### Focus, motion, contrast, touch
- **Global `:focus-visible` style** — 3px `--signal` blue outline with 2px offset on links, buttons, inputs, selects, and tabbable elements. Previously only 2 focus styles existed per page. *(WCAG 2.4.7)*
- **`prefers-reduced-motion: reduce`** media query disables all animations/transitions (the pulsing dots, arrow transitions, smooth scroll). *(WCAG 2.3.3)*
- **Touch targets** *(WCAG 2.5.5)*: under `@media (pointer: coarse)`, search/email inputs, selects, and the header search button get `min-height: 44px`; filter labels get `min-height: 36px`; burger padding bumped to 10px.
- **Contrast fix:** `--steel` darkened `#6B7280 → #5F6975`. The original passed on white (4.83:1) but **failed on the bone backgrounds** (4.21:1). New value: 5.58:1 on white, 4.86:1 on bone-2. Visually near-identical.

### SEO / handoff hygiene
- Unique `<meta name="description">` added to every page (none had one).

---

## 2. Page-specific changes

### vivid-pdp.html (heaviest interactivity fixes)
The PDP relied on click-only `<div>`/`<span>`/`<img>` controls — invisible to keyboard and screen-reader users. All are now operable and announced correctly *(WCAG 2.1.1, 4.1.2)*:

| Control | Fix |
|---|---|
| Finish swatches (Satin Bronze / Matte Black / Gunmetal) | `role="button"`, `tabindex="0"`, `aria-label="Finish: …"`, `aria-pressed` synced in `pickFinish()` |
| On-truck gallery thumbnails (×5) | `role="button"`, `tabindex="0"`, descriptive `alt` text (was `alt=""`) |
| Staggered Setup accordion head | `role="button"`, `tabindex="0"`, `aria-expanded` + `aria-controls`, synced in `toggleStag()` |
| Wheel Options accordion head | Same pattern, synced inline |
| Option items (caps, lug kit, TPMS, locks) | `role="button"`, `tabindex="0"`, `aria-pressed` synced in `optToggle()` |
| Financing term pills (6/12/24/36 mo) | `role="button"`, `tabindex="0"`, `aria-pressed` synced in `finTerm()` |
| Financing providers (Affirm/Klarna) | Same pattern, synced in `provider()` |
| Front/rear staggered size selects | `aria-label="Front/Rear wheel size"` |

A small keyboard-helper script before `</body>` makes every `[role="button"][tabindex]` respond to Enter and Space.

### vr-truck-ymm.html & wheels-cat.html
- FAQ accordion buttons: `aria-expanded` initialized to match open/closed state and kept in sync on toggle.
- All fitment-tier pills and scroll arrows were already native `<button>`s with labels — no change needed.
- wheels-cat filter checkboxes were already properly wrapped in `<label>`s — confirmed compliant; touch-target sizing added via the coarse-pointer rules.

---

## 2b. New section: "The VR Standard" band (added July 1)

The generic trust strip (Free Shipping / Easy Returns / Expert Support) was replaced on all five homepage-family pages with a bone-gray value-prop band (`.vrstd`, `--bone` background with a 3px heat top rule), containing:

- **Headline row** — "We don't just ship parts. We mount, balance, tune & back every one." + Tempe/install-bay and 4.9★/14k-review meta.
- **Five service pillars** — $0 Mount & Balance (Hunter Road Force Elite), 1:1 Human-Verified Fitment, Free Shipping $499+, 60-Day Fitment Guarantee, 25-Year Enthusiast Experts.
- **VR family rail** — cross-links between the five vertical mockup pages (`homepage` / `vivid-trucks` / `vrxover` / `vivid-classics` / `vividx`), current brand highlighted per page. Update these relative hrefs to production routes.

Accessibility is built in: real `h2`, `nav aria-label="VR family of brands"`, `aria-hidden` decorative watermark, responsive 5→3→2 column grid, coarse-pointer link padding. Contrast on bone: ink/steel text passes AA; large red numerals use `--heat` (large-text threshold), while small red text (eyebrow, star rating, current-brand link) uses `--heat-deep` to clear 4.5:1. The old `.trust-strip` CSS was removed (no dead code).

---

## 2c. New page: vivid-wholesale.html (added July 1)

Full B2B rebuild of the legacy /wholesale-auto-parts-sales page, assembled from homepage chrome (header, nav, footer, and all accessibility fixes inherited). Sections: dark typographic hero with stat block (2M+ SKUs / 200+ brands / 25 yrs / 24-7 portal), a wholesale edition of the VR Standard band (tiered pricing, named account manager, line card depth, portal + blind dropship, same-day ship), four buyer-segment cards, a three-step onboarding strip, quote band, fully labeled application form (`<label for>` on every field, autocomplete attributes, required markers), FAQ accordion with `aria-expanded` sync, and a line-card CTA band.

Dev notes: the form posts nowhere (`action="#"`) — wire to the wholesale application endpoint and add server-side validation plus an `aria-live` success/error message. The portal sign-in and line-card links are placeholders. Phone number (1-480-966-3040) and desk hours (M–F 8a–5p MST) were carried over from the live page.

---

## 3. Verified clean (no action needed)

- **Images:** every `<img>` on all 8 pages has an `alt` attribute (decorative ones use `alt=""`).
- **Headings:** single `<h1>` per page, logical h2/h3 structure.
- **Document basics:** `lang="en"`, viewport meta, unique titles on all pages.
- **Icon buttons:** gallery arrows, search, burger all carry `aria-label`s.
- **Responsive:** 34–37 media queries per page; layouts adapt through tablet and phone breakpoints.
- **Tag balance:** all 8 pages parse with zero structural errors.

---

## 4. Remaining items for the build team

These are things a static mockup can't fully resolve — carry them into production:

1. **Convert `role="button"` divs to native `<button>` elements** on the PDP when componentizing. The ARIA pattern in the mockup is correct and functional, but native buttons are more robust (free focus handling, form semantics).
2. **Mobile nav drawer:** the burger button toggles nothing yet (mockup-level). Implement the drawer with focus trapping, `Esc` to close, and `aria-expanded` sync — the attribute is already in place.
3. **Brand red on tinted backgrounds:** `--heat` (#E10600) passes AA on white (4.97:1) but **fails for small text on bone backgrounds** (4.33:1). Rule of thumb: on `--bone`/`--bone-2`, use `--heat` only for text ≥ 18.66px bold / 24px regular, or swap to `--heat-deep` (#B30500, 7.15:1) for small text.
4. **Search/email inputs** should become real `<form>`s with visually-hidden `<label>` elements in production (aria-label is compliant but labels are more resilient).
5. **YMM selects** need real cascading behavior + a labeled `<fieldset>`; announce results updates with a polite live region.
6. **Placeholder images:** Unsplash and CDN hotlinks must be replaced with owned, optimized assets (WebP/AVIF, `srcset`, explicit width/height to prevent CLS). Most below-fold images already use `loading="lazy"` — keep that.
7. **Live-region feedback:** cart count, accessories subtotal, and financing amount changes should be wrapped in `aria-live="polite"` regions in production.
8. **Testing:** run axe DevTools + manual VoiceOver/NVDA passes and a real-device sweep (iOS Safari, Android Chrome) after the production build — automated checks catch only ~30% of issues.

---

## 5. Contrast reference (verified values)

| Token | Value | On white | On bone-2 (#EFEFF1) | Notes |
|---|---|---|---|---|
| `--ink` #0A0A0A | body text | 20.4:1 ✅ | 18.7:1 ✅ | |
| `--steel` #5F6975 | secondary text | 5.58:1 ✅ | 4.86:1 ✅ | darkened from #6B7280 |
| `--heat` #E10600 | brand red | 4.97:1 ✅ | 4.33:1 ⚠️ | large/bold text only on bone |
| `--heat-deep` #B30500 | dark red | 7.15:1 ✅ | 6.2:1 ✅ | safe everywhere |
| `--signal` #0066CC | links/focus | 5.6:1 ✅ | 4.9:1 ✅ | used for focus outlines |


## vr-content.css is load-bearing on every page (added Aug 2026)

`assets/vr-content.css` is now linked from all pages, not only the content
pages. Beyond the content-page design system it carries site-wide repairs:

- **Footer mobile layout** — the template's inline CSS declares its 6-column
  `.footer__cols` / `.footer__top` base rules *after* their own mobile media
  queries, so phones rendered the right columns off-viewport (untappable).
  The overrides at the bottom of vr-content.css force 1/2/3/6-column behavior
  at 375/700/1100/1200. If you refactor the inline CSS, fix the rule order and
  these overrides can be deleted.
- **Dark-surface accent contrast** — brand heat #E10600 passes WCAG on light
  (4.97:1) but not on the #0a0a0a panels (3.99:1). Dark containers use
  #FF2E22 (5.3:1). Scoped per container because the same classes appear on
  light surfaces (platform zones are light on the homepage, dark on landers).
- **Star glyphs** #F59E0B → #B45309 (2.15:1 → 5.0:1 on white cards).
- **Link-visibility guards** — the template's global `a{color:inherit}` made
  unclassed links in panels look like plain text; `.vc__prose a` outranked
  `.vc__btn` on color (invisible white-on-heat button text).

Known accepted residue: the legacy homepage was deleted from the package on 2026-08-06 and
`homepage.html` renamed to `homepage.html`;
`brand-guide.html` shows heat-on-dark as a color *specimen*, which fails 4.5:1
by definition of what it documents.

## Imagery convention (uniform as of Aug 2026)

Every content photo on the site is real photography: hotlinked Unsplash images
(the original template pages' convention, now also used by blog.html and
gallery.html) or attributed Wikimedia files in `real-photos/`. The flat vector renders formerly under `truck-photos/` were deleted from
the package on 2026-08-06; license real photography or collect customer
submissions before production.


## YMM placement (changed Aug 2026)

The persistent vehicle chip was removed from the global header (desktop
nav__ymm and the mobile ymm-mobile bar) to match the CO pattern: vehicle
context lives on shop surfaces only - the vehicle picker page, the vp picker
blocks on home/category pages, the vfb fitment bar on listing pages, and the
garage. Header CSS for the removed elements remains inert in page styles.
