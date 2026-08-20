# Vivid pages — shared chrome instructions

**Reference page: `index.html`.** Its header is the canonical one. Every other page
copies from it. When the header needs to change, change it in `index.html` first,
then re-cut the partials (see [Re-cutting](#re-cutting-the-partials)) — never the
other way round.

Status: **header done, footer not yet.** The footer section at the bottom of this
file is a placeholder.

> **Every line number in this file is a snapshot**, taken from `index.html` at
> 5067 lines (2026-08-20 10:26). `index.html` is under active edit and any change
> above the header shifts them — it moved twice, by +7 then by −1, in the half hour
> these partials were being cut. **The header content was identical each time**, so
> a shifted number is not evidence of a changed header. Locate blocks with the
> `grep` commands in [Re-cutting](#re-cutting-the-partials) and treat the numbers
> as a sanity check only.

---

## Files

| File | What it is |
|---|---|
| `index.html` | Source of truth. The header lives at markup lines **1603–1719**, its CSS at **18–83** (prerequisites) and **85–182** (header), plus header rules inside the media queries at **1470–1594**. |
| `_partials/header.html` | The header markup, cut verbatim from `index.html`. Paste source only — **not a viewable page** (its `logos/…` paths are written relative to the page root, so it renders broken if you open it from inside `_partials/`). |
| `_partials/header.css` | The header CSS in three labelled sections: prerequisites, header, responsive. |
| `_partials/footer.html` | The footer markup (132 lines). Paste it inside `<body>` before `</body>`, or at the end of the page after all `<main>` content. |
| `_partials/footer.css` | The footer CSS: base rules + responsive overrides for ≤1180 and ≤900 breakpoints. |
| `_partials/footer-script.js` | The `<details>` sync script (60 lines). Paste it at the very end of the page, just before `</body>`. It runs once on load and keeps disclosure state in sync with breakpoint. Degrades gracefully (columns stay open without it). |
| `_page-template.html` | A blank page with the header already in place, sitting at the root so its relative paths work. **Start new pages by copying this.** Open it in a browser to see the header on its own. |
| `_partials/template-head.html`<br>`_partials/template-mid.html`<br>`_partials/template-tail.html` | The doctype/head, the `</style>`→`<body>` seam, and the `<main>`/footer-placeholder tail of the template. Only needed to rebuild `_page-template.html`; ignore them otherwise. |

### Why copy-paste and not an include

These pages are opened over `file://` with no build step. A JS `fetch()`-based
include cannot work there — browsers block `file://` XHR as cross-origin — and
`<iframe>` breaks the sticky/full-bleed layout and the tab order. So: copy-paste,
with these partials as the single place to copy *from*.

---

## Quick start

### A new page

```sh
cd ~/Documents/ViViD/vivid_pages
cp _page-template.html your-page.html
```

Then fill in the two values between the `EDIT PER PAGE` markers in `<head>`
(`<title>` and the meta description), and apply the per-page header rules below.
The template has the header in place and an `<!-- PAGE CONTENT GOES HERE -->` 
placeholder inside `<main id="main">`. The footer is not yet in the template — 
paste it in when your page is ready (see retrofit section). Page CSS goes under 
the `PAGE CSS` banner inside `<style>`; content goes inside `<main id="main">`.

### An existing page (retrofit)

The other 44 pages carry the **old** header — `<header class="header">` with
`.header__inner` / `.header__burger` / `.header__util…`, a separate `<!-- NAV ROW -->`
below it, and no brand switcher. To bring one in line:

1. Delete the whole old `<header class="header">…</header>` block **and** the nav
   row that follows it. In `about.html` that is lines 4976–5031 plus the nav row
   starting at 5033 — the line numbers differ per page, so locate it by
   `grep -n 'class="header"'`, don't trust a number from another page.
2. Paste `_partials/header.html` in its place — it must be the **first** thing
   inside `<body>`, because it begins with the skip link.
3. Delete the old `.header__*` and nav-row CSS from that page's `<style>`.
4. Paste `_partials/header.css` sections 2 and 3. Paste section 1 **only** if the
   page has no `:root` block yet — a second `:root` fights the first one.
5. Delete the page's existing `<a class="skip-link">`; the new header has its own.
6. Paste the footer: `_partials/footer.html` before `</body>`, `_partials/footer.css`
   in `<style>`, and `_partials/footer-script.js` just before `</body>` (after
   the footer markup).
7. Read "Retrofit conflicts" immediately below — the shared stylesheet overrides
   part of the header.
8. Work through the per-page table and the invariants below.

> Read the `html-retrofit` skill first if the page has any wired-up JS or forms.
> Several pages (`cart.html`, `signin.html`, `tire-calculator.html`,
> `wheel-fitment.html`, `build-builder.html`) have working behaviour attached to
> their markup.

### Retrofit conflicts with `assets/vr-content.css`

`index.html` is fully self-contained — it links no stylesheet at all. **All 45
other pages link `assets/vr-content.css`**, and in those pages that `<link>` sits
*after* the inline `<style>` (in `about.html`: `<style>` at line 12, the `<link>`
at 4948). So the shared sheet wins every equal-specificity conflict. Four things
to handle:

1. **Two skip links.** Legacy pages already have
   `<a class="skip-link" href="#main">`. The new header brings its own `.skip`.
   **Delete the old one** — two skip links to the same target is a defect, not
   redundancy. (`vr-content.css` also defines an unused `.vc__skip`; no page uses
   it, leave it be.)
2. **`--gutter` is overridden.** `vr-content.css` declares `:root{--gutter:16px}`
   plus `@media (min-width:600px){:root{--gutter:24px}}`. Being later in the
   cascade, it beats both the header's `28px` base and the header's own
   `@media (max-width:900px){--gutter:16px}`. Net effect on a retrofitted page:
   the header insets 24px on desktop and at tablet widths instead of 28/16.
   **Recommended: leave it.** 24px is what the page's own content uses, so the
   header lines up with it — forcing 28px would misalign the header against
   everything below it. Just know why the number differs from `index.html`.
3. **`--ink` is declared in both** — same value (`#0a0a0a`), so it is harmless.
   No other token names collide.
4. **Container widths do not match.** The header's `.shell` is **1320px**;
   30 legacy pages lay their content out in `.vc__wrap`, which is
   **1120px + gutters**. The header will therefore be visibly wider than the
   content beneath it. This needs a decision — widen `.vc__wrap` to 1320px, or
   accept the step — and it is the same decision for all 30 pages, so make it
   once, not per page.

`vr-content.css` has no `body`/`*`/`html` reset rules, so the header's reset lines
are safe to paste. It does carry two legacy-header rules
(`.header__util--cart`, `.header__cart-count`) which become dead once the old
header is gone — harmless, but worth sweeping at the end of the migration.

Once a page has been fully rebuilt on the new system, drop its `vr-content.css`
link entirely; the goal is every page self-contained like `index.html`.

---

## Header anatomy

Four rows inside one `<header>`, each one a `.shell`-wrapped band:

| Row | Element | Height | Ground | Notes |
|---|---|---|---|---|
| 1 | `<nav class="brandbar">` | 40px | black | The five Vivid family brands. `min-height:34px` on the list, but the links' 11/13px padding + 14px line-height + 2px underline make the row 40px. Scrolls sideways ≤1024px. |
| 2 | `.masthead` | 80px | white | Logo · search · utilities (phone, account, wishlist, cart). 52px ≤1024px. |
| 3 | `<nav class="subnav">` | 50px | white | Six categories · promo · Affirm/Katapult financing lockup. Hidden ≤1024px. |
| 4 | `.mobrow` | 50px | black | Live Chat + hamburger. `display:none` until ≤1024px. |

Immediately before it: `<a class="skip" href="#main">`. Immediately after it:
`<main id="main">`. Both are required — the skip link has nothing to target
otherwise (WCAG 2.4.1).

---

## What you change per page

| Thing | Rule |
|---|---|
| `<title>`, `<meta description>` | Page-specific, obviously. |
| `aria-current="page"` in the brandbar | It belongs on the link that **is** the current page. On `vivid-trucks.html` move it to the VR Trucks link; on `vrxover.html` to VR Crossover; and so on. On a page that is not one of the five (`suspension.html`, `cart.html`, `about.html`, …) **delete the attribute entirely** — a page must not claim to be a page it isn't. The red underline and lit dot follow the attribute automatically. |
| Logo, on sub-brand pages | See below. On every ordinary Vivid Racing page leave `vivid-master-red.svg` at `width="183" height="38"` alone. |
| Nothing else | Genuinely. Everything else in the header is identical on every page. |

### Sub-brand logos (open decision — confirm before applying)

`index.html` only ships the master logo. If the four sub-brand pages should swap
in their own wordmark, the assets exist in `logos/flat-system/` and these are the
aspect-correct widths at the header's 38px height:

| Page | File | `width` / `height` |
|---|---|---|
| `vivid-trucks.html` | `vr-trucks-red.png` | `168` / `38` |
| `vrxover.html` | `vr-crossover-red.png` | `201` / `38` |
| `vivid-classics.html` | `vr-muscle-red.png` | `166` / `38` |
| `vividx.html` | `vr-powersports-red.png` | `211` / `38` |

These are pure arithmetic off each PNG's pixel dimensions, not an optical pass —
the four wordmarks have different x-heights, so they may not *look* the same size
at a shared 38px. Worth eyeballing before it ships, the same way the
Affirm/Katapult lockup already needed (see the long comment at `header.css`
section 2).

### The `index.html` vs `homepage.html` split — flagging this

The new header points the logo and the "Vivid Racing" brandbar link at
`index.html`. The 37 legacy pages point their logo at `homepage.html`, which is
the *old* homepage and still carries the old header. Both files exist and have
nearly the same title. Retrofitting a page therefore silently re-targets its
logo. Decide which one is the homepage before the retrofit sweep; if it is
`index.html`, `homepage.html` should be retired into `_unused/`.

---

## What you must not change

### Canonical values — identical on every page

The header is the same furniture everywhere, so these strings must not drift
page to page. The legacy pages already drifted (`about.html` says "4 Saved" and
`$6,843`); `index.html` wins.

| | Value |
|---|---|
| Phone | `tel:+14809663040` → `480-966-3040` |
| Wishlist | `3 Saved` |
| Cart | badge `2`, value `$11,310`, `aria-label="Cart — 2 items, $11,310"` |
| Search placeholder | `Search 1,000,000+ parts — try '992 GT3 exhaust' or 'KW coilovers'` |
| Subnav promo | `Spring Event — 25% Off` → `deal-machine.html` |
| Subnav financing | `0% APR / Pre-qualify in 60s` → `financing.html` |

If the cart badge number ever changes, change the `aria-label` in the same edit —
a screen reader reading "2 items" over a badge showing 3 is worse than no label.

### Accessibility decisions that look like mistakes but aren't

Leave these alone; each one is load-bearing.

- **Both `<nav>`s carry an `aria-label`** (`"Vivid family of brands"`,
  `"Product categories"`). Two unlabelled navs on one page are indistinguishable
  in a screen reader's landmark list.
- **`.util__text` and `.search__submit-text` go visually-hidden at ≤1024px, not
  `display:none`.** With `display:none` those icon-only controls lose their
  accessible name entirely (WCAG 4.1.2). Do not "tidy" this into `display:none`.
- **The burger has `aria-label` but deliberately no `aria-expanded`.** There is no
  drawer wired up yet, and an `aria-expanded` that never changes actively
  misreports state. Add it *when* you build the drawer, together with
  `aria-controls`, and keep it in sync. The comment saying so is in the markup.
- **`--text-muted` is `#6f7780`, not Figma's `#a3acb3`.** Figma's value is 2.31:1
  on white and fails 1.4.3. Don't "fix" it back to match the design file.
- **`--border-default` (`#a3acb3`) is for decorative rules only** — never text.
- **Red focus rings flip to white-plus-red-glow on dark surfaces**
  (`.brandbar :focus-visible` etc.), because a red ring on black is nearly
  invisible.
- **Touch targets are 44px at ≤900px** and the subnav standalone links carry
  `min-height:24px` (WCAG 2.5.8). Both survive if you leave the responsive
  section intact.

### Don't invent states

There is **no active/current state on the subnav category links** — no markup,
no CSS. So on `suspension.html`, the Suspension link looks like the other five.
If you want one, add it to `index.html` first (markup *and* CSS), re-cut the
partial, then apply it everywhere. Adding it on one page only is how 45 pages
drift apart again.

---

## Dependencies

- **Fonts.** The header uses Inter only (400/600/700/800), but the shared
  `<link>` in the template also loads Nunito Sans 800/900 (display) and Saira 600
  (form) because pages need them. Keep the one line as-is.
- **Tokens.** Section 1 of `header.css`. Exactly one `:root` per page — and note
  that on the 45 pages linking `assets/vr-content.css`, that sheet's `:root` wins
  (see "Retrofit conflicts").
- **Stylesheets.** `index.html` links none; its CSS is entirely inline. The
  template follows it. The other 45 pages still link `assets/vr-content.css`.
- **Assets**, all relative to the page root and all present:
  `logos/flat-system/vivid-master-red.svg`, `logos/affirm.png`,
  `logos/katapult.webp`.
- **JavaScript: none.** The header is entirely static — no toggle, no sticky, no
  scroll listener. The scripts at the bottom of `index.html` belong to the footer
  and to the homepage's tabs/disclosures, not to the header.
- **Paths.** Every page is a flat sibling of `logos/`, `assets/`, `real-photos/`
  and `product-images/`. Never write `./` or `../` in the header, and never move a
  page into a subfolder — every header path breaks at once.

---

## Breakpoints the header responds to

| Width | What happens |
|---|---|
| ≤1180 | Search caps at 340px; utility label/value drop to 11px. |
| ≤1024 | Masthead 80→52px, logo 183→150px, search collapses to a 44px icon button, phone + wishlist hidden, utility tiles lose their fills, subnav hidden, `.mobrow` appears, brandbar scrolls sideways. |
| ≤900 | Gutter 28→16px; 44px touch targets. |
| ≤360 | 320px reflow: logo 118px, masthead gap 6px. |

---

## Known quirks

**The ≤360px tile/search shrinks are dead rules.** In `index.html` the
`@media (max-width:360px)` block (line 1554) sets `.util__tile,.util__glyph` and
`.search,.search__submit` to 34px, but the `@media (max-width:900px)` block at
line 1570 sets them to 44px — same specificity, later in the file, so 44px wins
at 320px too.

This is currently harmless, not a live bug: at 320px the masthead row measures
118 (logo) + 6 + 44 (search) + 6 + 96 (two 48px utilities — phone and wishlist
are hidden) = 270px inside a 288px content box. It fits, so nothing overflows.

`header.css` preserves `index.html`'s block order exactly, dead rules and all, so
pages built from it render identically to the reference. If you want the shrinks
to take effect, fix it in `index.html` (move the ≤360 block after the last ≤900
block) and re-cut — don't fix it only in the partial.

---

## Verification checklist

After adding the header to a page:

- [ ] Header assets and links resolve:
      `for a in $(grep -o 'src="[^"]*"' your-page.html | sed 's/src="//;s/"//'); do [ -f "$a" ] || echo "MISS $a"; done`
- [ ] Exactly one top-level `:root` block, one `<header>`, one `id="main"`.
      (`grep -c ':root{'` returns **2** — the second is the `--gutter` override
      inside the ≤900px media query, which is expected.)
- [ ] `aria-current="page"` appears **at most once** in the brandbar, and only if
      this page is one of the five.
- [ ] Exactly one skip link: `grep -c 'href="#main"'` counts the skip link plus
      nothing else. On a retrofitted page, confirm the old `.skip-link` is gone.
- [ ] Renders correctly at 1440 / 1180 / 1024 / 900 / 390 / 320 px.
- [ ] Tab from the top: skip link appears first, then brandbar → logo → search →
      utilities → subnav. No focus trap, ring visible on every stop.
- [ ] Canonical values match the table above.
- [ ] Run the `ada-compliance` skill as the final pass.

---

## Re-cutting the partials

After you change the header in `index.html`, regenerate the partials so they stay
byte-identical. **Check the line numbers first** — any edit above the header
shifts them.

```sh
cd ~/Documents/ViViD/vivid_pages

# 1 · re-cut the markup. Derives its own range, so drift cannot break it.
S=$(grep -n '^<a class="skip"' index.html | cut -d: -f1)
E=$(grep -n '^</header>'       index.html | cut -d: -f1)
sed -n "${S},${E}p" index.html > _partials/header.html

# 2 · find the CSS ranges (section 3 is assembled by hand, so you need these)
grep -n -E '^:root\{|^/\* =+ HEADER|^/\* =+ HERO' index.html   # root → header → (hero-1)
grep -n '^\.finance__chip img' index.html                      # the one line to skip

# 3 · has the CSS drifted? both of these must print nothing.
#     Left side = index.html, right side = the matching span of header.css.
diff <(sed -n '18,83p'           index.html) <(sed -n '21,86p'  _partials/header.css)
diff <(sed -n '85,171p;173,182p' index.html) <(sed -n '95,191p' _partials/header.css)
```

If step 3 prints anything, the numbers on its left have shifted — re-read them
from step 2 and re-diff before concluding the CSS actually changed.

`_partials/header.css` is assembled by hand from three pieces:

| Section | Lives at | Source in `index.html` |
|---|---|---|
| 1 · prerequisites | `header.css` 21–86 | `sed -n '18,83p'` — `:root` through the `:focus-visible` rules |
| 2 · header | `header.css` 95–191 | `sed -n '85,171p;173,182p'` — skipping line 172, the stray `.finance__chip` rule |
| 3 · responsive | `header.css` 203–end | The header-only rules lifted out of the page-wide media queries at 1470 / 1475 / 1509 / 1554 / 1570, **in that order** |

Section 3 is the only hand-edited part, so it is the one to check by eye. The
three section banners inside `header.css` record where each part came from.
Then rebuild `_page-template.html`. It is nothing but the five partials
concatenated, so this reproduces it exactly:

```sh
cat _partials/template-head.html \
    _partials/header.css \
    _partials/template-mid.html \
    _partials/header.html \
    _partials/template-tail.html > _page-template.html
```

**Before re-cutting, make sure no other session is editing `index.html`.** These
partials were cut while another window had the file open; the header content was
unaffected, but the line numbers moved by 7 mid-task. Re-cut from a settled file.

---

## Footer

**Standardised.** Use `_partials/footer.html`, `_partials/footer.css`, and
`_partials/footer-script.js` exactly as you do for the header.

---

## Files

| File | What it is |
|---|---|
| `index.html` | Source of truth. The footer lives at markup lines **4917–5048**, its CSS at **1343–1435** (base) + **1553–1590** (≤1180) + **1592–1612** (≤900), and the script at **5051–5110**. |
| `_partials/footer.html` | The footer markup, cut verbatim from `index.html`. Like the header, it is **not a viewable page on its own** — relative paths break. |
| `_partials/footer.css` | The footer CSS in three blocks: base + two responsive overrides. |
| `_partials/footer-script.js` | The `<details open>` sync script. Runs once on page load, keeps footer column disclosure state in sync with the breakpoint. Degrades gracefully (columns stay open without it). |

---

## Footer anatomy

One `<footer class="foot">` element with three regions:

| Region | Element | Notes |
|---|---|---|
| **Brand** | `.foot__brand` | Left: Vivid logo, customer service hours, HQ address, email signup, social links. Flex: 0 0 300px (fixed width). |
| **Columns** | `.foot__cols` | Right: Five disclosure columns (Shop / Platforms / Community / Tools / Account) as `<details open>` elements. Grid: 5 equal columns on desktop, stacked accordions on mobile (≤900px). |
| **Legal** | `.foot__legal` | Bottom: Copyright, privacy, terms, accessibility. Centered on mobile. |

The footer's job: navigation depth, link collection, email capture, social proof, legal coverage, and collapsible category browsing on phones.

---

## What you change per page

| Thing | Rule |
|---|---|
| All links | Point them at real pages. The template has 8 Shop links, 2 Platforms (commented), 2 Community, 4 Tools, 4 Account. Most are correct on `index.html`; adjust to your own nav structure. |
| Social links | `aria-label`, `href`, icon src — these four links are branded per platform (YouTube red, Facebook blue, Instagram gradient, TikTok black). Leave the aria-label + href + src in sync. |
| Email signup | The `<form>` and `.foot__go` button wire to an action. On `index.html` it points to `action="#"` (no backend). Wire it when you implement email capture. |
| Phone number | `href="tel:+14809663040"` and display text `480-966-3040` — match the header's phone (keep them in sync). |
| Legal links | Copyright year, links to your policies. On `index.html`: privacy.html, terms.html. |
| Nothing else | The disclosure columns, layout, styling, script — all identical on every page. |

**Why disclose columns are `<details>` and not plain lists:**
They collapse on phones (`≤900px`) without JS, improving mobile usability. The script
is optional — the page works (columns stay open) without it. Once wired, the script
syncs the open/closed state to the breakpoint: on desktop they stay open; on mobile
they close/open per user click and the sync keeps them in step.

---

## What you must not change

### Canonical values — identical on every page

| | Value |
|---|---|
| Brand logo | `logos/flat-system/vivid-master-creme.svg` (cream-on-black). Size: `width="183" height="38"`. |
| Phone | `tel:+14809663040` → display `480-966-3040` — **keep in sync with header.** |
| Social platforms | 4 links only: YouTube / Instagram / Facebook / TikTok. aria-label + href + icon src must stay together. |
| Column titles | "Shop" / "Platforms" / "Community" / "Tools" / "Account" — these are the disclosure labels. Don't change them without changing the layout. |
| Disclosure mechanic | `<details class="foot__col" open>` — the `open` attribute is required for desktop (columns start expanded). Mobile collapses them via media query. Do not remove `open`. |
| Script scope | The sync script targets `.foot__col` elements. If you rename the class, the script breaks. |

### Accessibility decisions that look like mistakes but aren't

- **`<details>` without a drawer button.** The disclosure is native HTML, not a custom button. It meets WCAG 2.1 for keyboard access (Enter/Space to toggle) and is announced as an expandable group. Do not replace it with a custom `<button>` + hidden content unless you reimplement the keyboard behavior.
- **No `aria-expanded` on the disclosure.** Native `<details>` automatically announces open/closed state via `aria-expanded` internally. Do not add a redundant one to the `<summary>`. The script syncs the `open` attribute, and the browser handles announcements.
- **Script timing: `DOMContentLoaded`.** The script runs once at page load, not on every resize, and uses `matchMedia` with a `change` listener — efficient and non-blocking. Do not convert it to a resize listener or continuous polling.
- **Column link minimum height: 24px.** `.foot__list a` has `min-height:24px` (WCAG 2.5.8). At ≤900px this becomes 44px. Do not reduce it.

### Don't invent states

There is **no active/current state on footer links** — they point outward, not to the current page. The footer is global navigation; add state only if the design demands it.

---

## Dependencies

- **Script:** The `<details open>` sync script at the bottom of every page that has a footer. Must run for mobile disclosure behavior. Pages without the script still work (columns stay expanded).
- **CSS:** Section in the page's `<style>`. Exactly one footer CSS rule set per page.
- **Assets:** 
  - `logos/flat-system/vivid-master-creme.svg` (cream logo for dark background)
  - `assets/icons/youtube-f.svg`, `instagram.svg`, `facebook.svg`, `tiktok.svg` (social icons)
- **Links:** All href values must point to valid pages on the same domain. Broken links are immediately visible and harm UX.
- **Paths:** Every page is a flat sibling of `logos/` and `assets/`. Relative paths work because they are relative to the page root.

---

## Breakpoints the footer responds to

| Width | What happens |
|---|---|
| ≤1180 | No footer-specific change (header search caps, but footer is unaffected). |
| ≤900 | **Mobile layout.** Brand block moves to center, columns collapse to accordions (all start closed except the current interaction), legal links stack, social links become 44×44. Grid → single column. |

---

## Verification checklist

After adding the footer to a page:

- [ ] All social links have `href`, `aria-label`, and matching icon `src`.
- [ ] Email signup form wired (or left as `action="#"` if backend is not ready).
- [ ] Phone number matches the header exactly.
- [ ] All navigation links resolve:
      `for a in $(grep -o 'href="[^"]*"' your-page.html | sed 's/href="//;s/"//'); do [ -f "$a" ] || [ "$a" = "#" ] || echo "MISS $a"; done`
- [ ] Social icon assets exist:
      `for f in youtube-f.svg instagram.svg facebook.svg tiktok.svg; do [ -f "assets/icons/$f" ] || echo "MISS $f"; done`
- [ ] `<details class="foot__col" open>` unchanged (all five columns).
- [ ] Script is present and inside `</body>` (not inside `</footer>`).
- [ ] Renders correctly at 1440 / 900 / 320 px.
- [ ] On mobile: tap a disclosure, it opens; tap another, the first closes and the second opens. No overlap, no stuck accordions.
- [ ] Run the `ada-compliance` skill as the final pass.

---

## Re-cutting the partials

After you change the footer in `index.html`, regenerate the partials using the same
grep-based approach as the header (to survive line number drift):

```sh
cd ~/Documents/ViViD/vivid_pages

# 1 · find the ranges
grep -n '^<footer class="foot">' index.html     # markup start
grep -n '^</footer>'                index.html     # markup end
grep -n "^/\* =.*FOOTER\|^/\* =.*REVIEWS" index.html  # CSS start → REVIEWS line
grep -n "^@media (max-width:1180px){" index.html | tail -3  # 1180 block
grep -n "^@media (max-width:900px){" index.html | tail -1   # last 900 block
grep -n "^<script>" index.html                  # script start
grep -n "^</script>" index.html                 # script end

# 2 · re-cut using the numbers from step 1
sed -n '4917,5048p' index.html > _partials/footer.html
sed -n '1343,1435p' index.html > _partials/footer_base.css
sed -n '1553,1590p' index.html > _partials/footer_1180.css
sed -n '1592,1612p' index.html > _partials/footer_900.css
sed -n '5051,5110p' index.html > _partials/footer_script.js

# 3 · assemble footer.css (prepend the comments from the assembled version)
cat _partials/footer.css  # verify it has all three blocks and the comments between them
```

The same rules apply as the header: **do not do this while another session has
`index.html` open.** The footer content should be stable, but line numbers will
drift as the page grows.
