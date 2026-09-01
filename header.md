# Vivid Racing Header — Complete Reference

Everything about the shared `<header>` on `index.html` — full markup, every CSS
rule, and the exact value at every breakpoint (mobile → tablet → desktop). This
is the single source of truth for the header; if the header ever changes, edit
`index.html` first, then update this file and re-verify the numbers below.

Last verified against: `css/shared.css` (637 lines) + `index.html` lines 16–462,
2026-08-31.

---

## 1. Files

| File | Role |
|---|---|
| `index.html` | Canonical header markup, lines 16–462 (skip link through `</header>`). |
| `css/shared.css` | **All** header CSS. Loaded by every page that carries this header: `index.html`, the 4 family pages (`vivid-trucks.html`, `vivid-crossover.html`, `vivid-classics.html`, `vividx.html`), and both PDP pages (`wheel-pdp.html`, `tire-pdp.html`). One edit here reaches all 7 pages. |
| `css/style.css` | Page-body sections only. **No header rules live here.** |
| `js/script.js` | Only touches the header for mega-menu open/close (see §10). |

Mobile-first throughout: every rule states its narrowest (mobile) value as the
unqueried base; `@media (min-width: …)` blocks layer on tablet/desktop
enhancements as the viewport grows. Read every table below top-to-bottom —
later breakpoints override earlier ones for whatever property they touch, but
leave everything else from the previous tier standing.

---

## 2. Design tokens (`:root`)

```css
:root{
  --action-primary:#b31414;
  --bg-premium:#021f43;
  --bg-inverse:#000;
  --bg-surface:#fff;
  --border-default:#a3acb3;      /* decorative rules only — never text */
  --hairline:#e5e7eb;            /* card + chip borders on light ground */
  --surface-sunken:#f9fafb;
  --text-primary:#000;
  --text-muted:#6f7780;          /* darkened from Figma's #a3acb3 (2.31:1, fails 1.4.3) */
  --text-on-dark:#fff;
  --accent-red:#e10600;
  --accent-red-on-dark:#e04a4a;  /* text-on-black variant — #e10600/#b31414 both fail there */
  --ink:#0a0a0a;
  --field-ink:#1e1e1e;

  --shell:1320px;      /* centred content box */
  --gutter:16px;        /* inner padding of that box */

  --font-ui:'Inter',system-ui,-apple-system,'Segoe UI',sans-serif;
  --font-display:'Nunito Sans','Inter',system-ui,sans-serif;
  --font-form:'Saira','Inter',system-ui,sans-serif;
}
@media (min-width:901px){ :root{ --gutter:28px } }
```

`--gutter` is the one token that changes by breakpoint: **16px mobile → 28px at
901px+.** Everything using `.shell` (which is most of the header) inherits this
automatically.

---

## 3. Breakpoint map

Every breakpoint the header responds to, in order, with what changes at each.
This is the master list — §6 below gives the exact CSS per component.

| Breakpoint | What flips |
|---|---|
| **361px** | Masthead gap widens (6→12px). Logo image steps up (118×24 → 173×36). |
| **900/901px** | `--gutter` 16→28px. Brandbar regains shell padding and drops its negative li-packing. Logo becomes plain inline (no 44px touch box). `.util` padding 0 2px→0 6px. `.util__tile`/`.util__glyph` shrink 44→34px. Icon SVGs inside them drop from the mobile 24×23px down to their desktop size. Subnav link `min-height` relaxes. Chat button `min-height` relaxes. |
| **1025px** | **The big one — mobile chrome becomes desktop chrome.** Brandbar shows the current-page chip. Masthead grows 52→80px, gap→24px, gets a 1600px inner max-width. Logo steps to its final 183×38. Search expands from a 44px icon button to a full 600px-basis field with visible input, height 56px, dark border. `.utils` flattens (`display:contents`) so search/phone/account/wishlist/cart re-join the masthead's own flex row instead of being boxed together. `.util` gets real padding (10px 22px) and its divider (`::after`) appears. Tile icons 34→36px and pick up their fill colour (red/black backgrounds + white icon fill). Glyph icons 34→30px. Text labels (`.util__text`, search's "Search" word) go from visually-hidden to visible. Phone + Wishlist utils appear (`display:none`→`flex`); Phone picks up `margin-left:auto` to push the icon cluster right. Cart badge repositions/enlarges. **Subnav appears** (`display:none`→`block`). **Mobrow disappears** (`display:block`→`none`). |
| **1181px** | Search's 340px cap is lifted (`max-width:none`) — it can now reach its full 600px basis if room allows. Util label/value text sizes up and gets heavier weight. |

---

## 4. Structure (markup skeleton)

```html
<a class="skip" href="#main">Skip to main content</a>

<header>
  <!-- row 1 — brand switcher -->
  <nav class="brandbar" aria-label="Vivid family of brands"> … </nav>

  <!-- row 2 — logo · search · utilities -->
  <div class="masthead"> … </div>

  <!-- row 3 — categories + mega menus + promo/financing (desktop only) -->
  <nav class="subnav" aria-label="Product categories"> … </nav>

  <!-- mobile-only — live chat + hamburger -->
  <div class="mobrow"> … </div>
</header>
```

`.subnav` and `.mobrow` are mutually exclusive by breakpoint (§3) — never both
visible at once, never both hidden at once.

---

## 5. Component CSS — mobile vs. desktop

### 5.1 Brandbar (row 1)

```css
.brandbar{background:var(--bg-inverse);border-bottom:1px solid rgba(255,255,255,.06)}
.brandbar .shell{padding-inline:0}                          /* mobile: edge-to-edge */
.brandbar__list{display:flex;list-style:none;margin:0;padding:0;min-height:34px;
  overflow-x:auto;scrollbar-width:none;-ms-overflow-style:none}
.brandbar__list::-webkit-scrollbar{display:none}
.brandbar__list > li{margin-right:-7px}                     /* packs 4 tabs into 390px */
.brandbar__list > li:last-child{margin-right:0}
.brandbar__link{display:flex;align-items:center;gap:6px;padding:9px 6px 11px;
  border-bottom:2px solid transparent;
  font:700 10px/13px var(--font-ui);letter-spacing:.6px;text-transform:uppercase;
  color:var(--text-on-dark);white-space:nowrap;min-height:44px}
.brandbar__dot{width:6px;height:6px;border-radius:3px;background:var(--bg-surface);
  opacity:1;flex:none}
.brandbar__link[aria-current="page"]{display:none}          /* mobile: hide the current tab */
```

```css
@media (min-width:901px){
  .brandbar .shell{padding-inline:var(--gutter)}
  .brandbar__list > li{margin-right:0}
  .brandbar__dot{opacity:.55}
}
@media (min-width:1025px){
  .brandbar__list{overflow-x:visible;scrollbar-width:auto;-ms-overflow-style:auto}
  .brandbar__link{gap:8px;padding:11px 18px 13px;
    font-size:12px;line-height:14px;letter-spacing:1.47px;min-height:0;font-weight:500}
  .brandbar__link[aria-current="page"]{display:flex;background:rgba(179,20,20,.08);
    border-bottom-color:var(--action-primary)}
}
```

Height: **40px mobile / 40px desktop** (padding differs, total stays ~40px per
`INSTRUCTIONS.md`'s original spec). Current-page chip is a **mobile omission,
desktop inclusion** — the opposite direction from most of this file.

**Mobile link weight/dot opacity (2026-09-01):** checked against Figma node
`688:12548` ("VR / Header (Mobile)", file `VWl8YFYeeS1d3nGfsliTtI`) — the
brand-switcher tab text is bold (`font-weight:700`), not the 500 this file
previously documented, and the dots are fully opaque, not dimmed to `.55`.
Fixed at the mobile (unqueried base) tier only. Desktop's `font-weight:500`
override at 1025px was already explicit and untouched; desktop's dot opacity
had no explicit rule before, so `.55` was pinned at 901px+ to preserve its
prior look exactly — there's no desktop Figma reference yet to confirm
against, so this wasn't guessed at.

### 5.2 Masthead → container

```css
.masthead{background:var(--bg-surface);border-bottom:1px solid var(--border-default)}
.masthead__inner{display:flex;align-items:center;gap:6px;height:52px}
```
```css
@media (min-width:361px){ .masthead__inner{gap:12px} }
@media (min-width:1025px){ .masthead__inner{gap:24px;height:80px;max-width:1600px} }
```

Height: **52px mobile → 80px desktop.** The `max-width:1600px` on the desktop
row is wider than the page's own `--shell` (1320px) — deliberate, so the
search field has real room to grow (see §5.3) without the rest of the page's
content column constraining it.

### 5.3 Masthead → Logo

```css
.logo{flex:none;display:flex;align-items:center;min-height:44px}
.logo img{width:118px;height:24px}
```
```css
@media (min-width:361px){ .logo img{width:173px;height:36px} }
@media (min-width:901px){ .logo{min-height:0;display:inline} }
@media (min-width:1025px){ .logo img{width:183px;height:38px} }
```

Three-step size ramp: **118×24 (0–360px) → 173×36 (361–1024px) → 183×38
(1025px+).** Mobile is a 44px touch target; desktop is a bare inline link
sized by its image.

### 5.4 Masthead → Search

```css
.search{flex:0 1 44px;display:flex;align-items:stretch;height:44px;
  border:0;background:var(--bg-surface);padding:0;
  max-width:none;width:44px;margin-right:8px}
.search__field{flex:1 1 auto;min-width:0;border:0;padding:0 20px;
  font:400 15px/22px var(--font-ui);color:var(--text-primary);background:transparent;
  display:none}                                              /* mobile: input hidden */
.search__submit{flex:none;display:flex;align-items:center;gap:10px;padding:0;
  border:0;background:transparent;color:var(--text-on-dark);cursor:pointer;
  font:500 12px/17px var(--font-ui);letter-spacing:1.44px;text-transform:uppercase;
  width:44px;height:44px;justify-content:center}
.search__submit svg{width:24px;height:24px;fill:var(--text-primary);flex:none}
.search__submit .search__submit-text{position:absolute;width:1px;height:1px;margin:-1px;
  padding:0;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;border:0}
```
```css
@media (min-width:901px){ .search__submit svg{width:18px;height:18px} }
@media (min-width:1025px){
  .search{flex:0 1 600px;height:56px;border:2px solid var(--ink);padding:2px;
    max-width:340px;width:auto;order:0;margin-right:0;min-width:0}
  .search__field{display:inline-block}
  .search__submit{padding:0 26px;background:var(--bg-inverse);
    width:auto;height:auto;justify-content:normal}
  .search__submit svg{fill:currentColor}
  .search__submit .search__submit-text{position:static;width:auto;height:auto;margin:0;
    padding:0;overflow:visible;clip:auto;clip-path:none;white-space:normal;border:0}
}
@media (min-width:1181px){ .search{max-width:none} }
```

Mobile: a bare 44×44px icon button, "Search" label visually hidden, no visible
input. Desktop: the field is capped at **340px from 1025–1180px**, then
uncapped at **1181px+** to reach its full 600px flex-basis if the row has
room — it still shrinks under pressure (`min-width:0`) so it never forces the
utility icons to compress.

**Icon-swap pattern** — every masthead icon (search, account, cart) ships
*two* `<svg>` elements, not one that gets restyled:

```css
.icon-mobile{display:block}
.icon-desktop{display:none}
@media (min-width:1025px){ .icon-mobile{display:none} .icon-desktop{display:block} }
.search__submit .icon-mobile{fill:none;stroke:var(--text-primary)}  /* mobile art is stroke-drawn */
```

Same element, different artwork — a same-icon-different-weight CSS trick would
be invisible at the file level and easy to break; two literal `<svg>`s make
the swap explicit in the markup.

### 5.5 Masthead → Utils wrapper

```css
.utils{flex:none;margin-left:auto;display:flex;align-items:stretch;height:auto;
  order:3;border-left:0}
```
```css
@media (min-width:1025px){ .utils{display:contents} }
```

Mobile: `.utils` is a real flex box grouping search+phone+account+wishlist+cart
together, pushed to the row's right edge. Desktop: it flattens to
`display:contents` so each child re-joins `.masthead__inner`'s own flex order
by plain DOM position — search sits next to the logo again, and the
`margin-left:auto` that used to live on `.utils` moves to `.util--phone`
(first visible child of the group) to keep the icon cluster pinned right.

### 5.6 Masthead → each `.util` (phone / account / wishlist / cart)

```css
.util{position:relative;display:flex;align-items:center;gap:12px;padding:0 2px;
  border-right:0}
.util--cart{gap:20px}
.util::after{content:none;position:absolute;right:0;top:50%;width:1px;height:24px;
  transform:translateY(-50%);background:var(--border-default)}
.utils > :last-child::after{content:none}
.util--phone,.util--wish{display:none}                       /* mobile: hidden entirely */
```
```css
@media (min-width:901px){ .util{padding:0 6px} }
@media (min-width:1025px){
  .util{padding:10px 22px;border-right:0;flex-shrink:0}
  .util::after{content:""}                                    /* divider only appears here */
  .util--phone,.util--wish{display:flex}
  .util--phone{margin-left:auto}
}
```

Phone and Wishlist are **not present at all** below 1025px — this is a
content omission, not a smaller version. Only Account and Cart show on
mobile/tablet. The vertical divider between utils is also desktop-only: a
divider between two icons with no visible label reads as noise on mobile.

**`flex-shrink:0` on `.util` at 1025px+** is load-bearing: it's what forces
100% of any space deficit onto `.search` instead of squeezing the utility
icons (see `css/shared.css` search-width history — this is what fixed a
"packed right side" bug where utils used to shrink and their text wrapped).

### 5.7 Icon tiles & glyphs (phone/cart use `.util__tile`; account/wishlist use `.util__glyph`)

```css
.util__tile{flex:none;display:grid;place-items:center;width:44px;height:44px}
.util__tile--red{background:transparent}
.util__tile--dark{background:transparent;position:relative}
.util__tile svg{width:24px;height:23px;fill:var(--text-primary)}

.util__glyph{flex:none;display:grid;place-items:center;width:44px;height:44px}
.util__glyph svg{width:24px;height:23px;fill:var(--text-primary)}
```
```css
@media (min-width:901px){
  .util__tile{width:34px;height:34px}
  .util__tile svg{width:17px;height:17px}
  .util__glyph{width:34px;height:34px}
  .util__glyph svg{width:17px;height:17px}
}
@media (min-width:1025px){
  .util__tile{width:36px;height:36px}
  .util__tile--red{background:var(--action-primary)}
  .util__tile--dark{background:var(--bg-inverse)}
  .util__tile svg{fill:#fff}
  .util__glyph{width:30px;height:30px}
}
```

Icon SVG size: **24×23px on mobile (< 901px) → 17×17px at 901px+.** This is a
deliberate three-tier container size (44 → 34 → 36px) paired with a two-tier
icon size (24×23 → 17×17) — the icon doesn't shrink again at the 1025px
container bump, only its fill colour changes (to white, once the tile gets a
solid red/black background).

### 5.8 Labels, values, badge

```css
.util__label{display:block;font:500 10px/14px var(--font-ui);letter-spacing:.72px;
  text-transform:uppercase;color:var(--text-muted);font-size:11px}
.util__value{display:block;font:500 14px/21px var(--font-ui);letter-spacing:-.065px;
  color:var(--text-primary);font-size:11px}
.util__value--phone{font-weight:500;letter-spacing:-.14px}
.util__text{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;
  clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;border:0}   /* visually hidden */
.util__badge{position:absolute;top:-4px;left:auto;right:-6px;min-width:16px;height:16px;
  display:flex;align-items:center;justify-content:center;padding:3px 5px;
  border:2px solid #fff;border-radius:24px;background:var(--action-primary);
  font:500 12px/14px var(--font-ui);color:#fff;font-size:11px;line-height:11px}
```
```css
@media (min-width:1025px){
  .util__text{position:static;width:auto;height:auto;margin:0;padding:0;
    overflow:visible;clip:auto;clip-path:none;white-space:nowrap;border:0}
  .util__badge{top:-6px;left:24px;right:auto;min-width:18px;height:18px;
    padding:10px 8px;font-size:12px;line-height:14px;font-weight:500}
}
@media (min-width:1181px){
  .util__label{font-size:10px;font-weight:500}
  .util__value{font-size:14px;font-weight:700}
  .util__value--phone{font-weight:800}
}
```

`.util__text` (the label+value pair) uses the same visually-hidden-until-1025px
pattern as the search label — **`white-space:nowrap` even while hidden**,
never `display:none`, and never `white-space:normal` at any breakpoint. That
last point was a real bug once: `normal` let long text (phone number, "Sign
In") wrap mid-string inside a tight `.util`, which is what actually caused a
"packed/cramped" look on the desktop row. Icon-only controls also lose their
accessible name entirely under `display:none` (WCAG 4.1.2) — `position:absolute`
+ 1px clip keeps them in the accessibility tree while invisible on screen.

### 5.9 Subnav (row 3 — desktop only)

```css
.subnav{position:relative;background:var(--bg-surface);border-bottom:1px solid var(--border-default);
  display:none}
```
```css
@media (min-width:1025px){ .subnav{display:block} }
```

Everything inside `.subnav` is desktop-only content by inheritance (the whole
row is `display:none` until 1025px), so none of the rules below have a mobile
variant — there is nothing to show:

```css
.subnav__inner{display:flex;align-items:center;gap:20px;height:50px}
.subnav__list{display:flex;align-items:center;gap:20px;list-style:none;margin:0;padding:0}
.subnav__link{display:flex;align-items:center;gap:6px;padding:15px 0;
  font:600 14px/21px var(--font-ui);color:var(--text-primary);white-space:nowrap;
  min-height:44px}
.subnav__link svg{width:12px;height:12px;stroke:#6b7280;fill:none;
  stroke-linecap:round;stroke-linejoin:round}
.subnav__promo{display:flex;align-items:center;min-height:24px;
  font:500 12px/17px var(--font-ui);letter-spacing:1.2px;
  text-transform:uppercase;color:var(--action-primary);white-space:nowrap}
.subnav__spacer{flex:1 1 auto}
.subnav__divider{color:var(--text-muted)}
.subnav__fin{display:flex;align-items:center;gap:12px;min-height:24px;white-space:nowrap;
  font:500 12px/17px var(--font-ui);letter-spacing:1.2px;text-transform:uppercase}
.subnav__fin em{font-style:normal;color:var(--action-primary)}
```
```css
@media (min-width:901px){ .subnav__link{min-height:0} }
```

The `min-height:44px` / `min-width:1025px`-gated relaxation on `.subnav__link`
is inert in practice (the element is invisible below 1025px anyway) — it's
there because the min-height rule is shared machinery with other
touch-target rules in this file, not because it does anything visible here.

### 5.10 Mega menu (desktop only, opens from `.subnav__item`)

No mobile variant — the trigger link itself doesn't render below 1025px, so
the menu can never open there. Reveal is opacity/visibility/transform (never
`display`, which can't transition):

```css
.mega{position:absolute;top:100%;left:0;right:0;z-index:20;
  background:var(--bg-surface);border-bottom:3px solid var(--action-primary);
  box-shadow:0 26px 50px -18px rgba(10,10,10,.22);
  opacity:0;visibility:hidden;pointer-events:none;transform:translateY(-6px);
  transition:opacity .16s ease,transform .16s ease,visibility .16s}
.subnav__item:hover .mega,.subnav__item:focus-within .mega{
  opacity:1;visibility:visible;pointer-events:auto;transform:none}
```

`visibility:hidden` doubles as the accessibility guard — it drops the panel's
links out of tab order and the a11y tree on its own, no separate
`aria-hidden` bookkeeping needed. `aria-expanded` on the trigger link (synced
by `js/script.js`, see §10) is the single source of truth for assistive tech.

Column layout, feature tile, and link list (all desktop-only, no breakpoints):

```css
.mega__inner{display:flex;flex-wrap:wrap;gap:72px;padding:36px 0}
.mega__cols{flex:1 1 480px;min-width:0;display:flex;gap:56px}
.mega__col{flex:1 1 0;min-width:0}
.mega__col--brands{flex-basis:0%;padding-left:24px;border-left:1px solid var(--hairline)}
.mega__label{display:flex;align-items:center;gap:6px;margin:0 0 14px;
  padding-bottom:9px;border-bottom:1px solid var(--hairline);
  font:600 13px/16px var(--font-ui);letter-spacing:.7px;text-transform:uppercase;
  color:var(--text-muted)}
.mega__list{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:16px}
.mega__list a{display:block;font:500 14px/17px var(--font-ui);color:var(--ink)}
.mega__list--bold a{font-weight:700}
.mega__cta{display:inline-flex;align-items:center;gap:5px;margin-top:16px;
  font:500 11px/14px var(--font-ui);letter-spacing:1.2px;text-transform:uppercase;
  color:var(--action-primary)}
.mega__feature{flex:0 0 296px;display:block;border:1px solid var(--hairline);
  border-radius:4px;overflow:hidden}
.mega__feature-img{display:block;position:relative;height:150px;overflow:hidden;
  background:var(--bg-inverse)}
.mega__feature-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.mega__feature-img::before{content:"";position:absolute;left:0;top:0;z-index:1;
  width:118px;height:3px;background:var(--action-primary)}
.mega__feature-body{display:flex;flex-direction:column;gap:5px;padding:15px 16px 16px}
.mega__feature-eyebrow{font:500 11px/14px var(--font-ui);letter-spacing:1.4px;
  text-transform:uppercase;color:var(--action-primary)}
.mega__feature-title{font:800 17px/22px var(--font-ui);color:var(--ink)}
```

### 5.11 Mobrow (mobile-only row — chat + hamburger)

```css
.mobrow{display:block;background:var(--bg-inverse)}
.mobrow__inner{display:flex;align-items:center;justify-content:space-between;height:50px}
.chat{display:flex;align-items:center;gap:8px;padding:8px 10px;background:#1f1f1f;
  color:#fff;font:500 13px/1 var(--font-ui);border:0;cursor:pointer;
  font-size:12px;min-height:40px}
.chat svg{width:16px;height:16px;fill:#fff}
.burger{display:flex;flex-direction:column;justify-content:center;gap:5px;width:44px;
  height:44px;padding:0 8px;background:transparent;border:0;cursor:pointer}
.burger span{display:block;height:3px;background:#fff}
```
```css
@media (min-width:361px){ .chat{padding:8px 14px;font-size:12px;font-weight:500} }
@media (min-width:901px){ .chat{min-height:0} }
@media (min-width:1025px){ .mobrow{display:none} }
```

Exact inverse of `.subnav`'s own switch — the two rows are never visible at
the same time. The burger has an `aria-label` but **deliberately no
`aria-expanded`** — there's no drawer wired up yet, and a static
`aria-expanded` that never changes actively misreports state to a screen
reader. Add it *when* the drawer is built, kept in sync with the drawer's
open/closed state, not before.

---

## 6. Interaction states (all breakpoints, no responsive variation)

```css
.search:hover{border-color:var(--action-primary)}
.search__field:hover{outline:0}
.search__submit:hover{background:rgba(0,0,0,.9)}

.util:hover{background:rgba(0,0,0,.04)}
.util:active{background:rgba(0,0,0,.08)}

.subnav__link:hover{border-bottom:2px solid var(--action-primary);padding-bottom:13px}
.subnav__link:active{color:var(--action-primary)}

.chat:hover{background:rgba(255,255,255,.12)}
.chat:active{background:rgba(255,255,255,.18)}
.burger:hover{background:rgba(255,255,255,.08)}
.burger:active{background:rgba(255,255,255,.12)}

.brandbar__link:not([aria-current="page"]):hover,
.brandbar__link:not([aria-current="page"]):focus-visible{
  background:rgba(255,255,255,.06);border-bottom-color:rgba(255,255,255,.35)}

.mega__list a:hover,.mega__list a:focus-visible{color:var(--action-primary);
  text-decoration:underline}
.mega__feature:hover,.mega__feature:focus-visible{border-color:var(--action-primary)}
.mega__cta:hover img,.mega__cta:focus-visible img{transform:translateX(3px)}
```

**Focus rings** — two variants, chosen by background:

```css
:where(a,button,input,select,summary,[tabindex]):focus-visible{
  outline:3px solid var(--accent-red);outline-offset:2px;
}
/* dark-ground override — a red ring on black is nearly invisible */
.brandbar :focus-visible,.ymm :focus-visible,.util--dark:focus-visible{
  outline:3px solid #fff;outline-offset:2px;box-shadow:0 0 0 6px rgba(179,20,20,.9);
}
.search:focus-within{outline:3px solid var(--accent-red);outline-offset:2px}
```

---

## 7. Reduced motion

```css
@media (prefers-reduced-motion:reduce){
  .mega{transition:opacity .01ms;transform:none}
  .mega__cta img,.mega__feature{transition:none}
  .mega__cta:hover img,.mega__cta:focus-visible img{transform:none}
}
/* global catch-all, applies to every animated property on the page */
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;
    transition-duration:.01ms!important;scroll-behavior:auto!important}
}
```

---

## 8. What changes per page

Everything above is byte-identical on all 7 pages that link `css/shared.css`.
The only per-page differences live in the **markup**, not the CSS:

| Thing | Rule |
|---|---|
| `aria-current="page"` in the brandbar | On the link that *is* the current page. On a page that isn't one of the five family pages (both PDP pages, e.g.) — **omit the attribute entirely**, don't guess a nearest match. |
| Logo `href` / `img src`+`alt` | `href` points at the page's own filename (or `index.html` for a page that isn't itself one of the five, like the PDPs). `img` stays `assets/img/logos/vivid-master-red.svg` at `183×38` on every current page — sub-brand wordmarks are speculative, not yet applied (see `styleheader.md`). |
| `.search__field` placeholder | Family-relevant example text per page (e.g. `vivid-trucks.html` mentions truck parts). Generic pages (index, both PDPs) use the canonical `Search 1,000,000+ parts — try '992 GT3 exhaust' or 'KW coilovers'`. |
| Subnav category set | Identical across all pages — six categories (Suspension / Wheels & Tires / Brakes / Exhaust / Aero & Body / Engine & Turbo). Don't invent per-page categories; the mega-menu *contents* can vary, the *labels* shouldn't. |

**Canonical values that must never drift page to page:**

| | Value |
|---|---|
| Phone | `tel:+14809663040` → `480-966-3040` |
| Wishlist | `3 Saved` |
| Cart | badge `2`, value `$11,310`, `aria-label="Cart — 2 items, $11,310"` |
| Subnav promo | `Spring Event — 25% Off` → `deal-machine.html` |
| Subnav financing | `0% APR / Pre-qualify in 60s` → `financing.html` |

---

## 9. JS dependency

`js/script.js` only has one job inside the header: keep the mega menus'
`aria-expanded` in sync and let Escape close an open one. CSS
`:hover`/`:focus-within` already does the actual open/close — this script is
pure accessibility polish, not required for the menu to work visually.

```js
var items = [].slice.call(document.querySelectorAll('.subnav__item'));
items.forEach(function (item) {
  var link = item.querySelector('.subnav__link');
  var mega = item.querySelector('.mega');
  if (!link || !mega) return;
  function open() { link.setAttribute('aria-expanded', 'true'); }
  function close() { link.setAttribute('aria-expanded', 'false'); }
  item.addEventListener('mouseenter', open);
  item.addEventListener('mouseleave', close);
  item.addEventListener('focusin', open);
  item.addEventListener('focusout', function (e) {
    if (!item.contains(e.relatedTarget)) close();
  });
  item.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { close(); link.focus(); }
  });
});
```

It queries generically by class (`.subnav__item` → `.subnav__link` / `.mega`),
so a new category needs no JS changes — just the same three-piece structure
with matching `id`/`aria-controls`.

Nothing else in the header — brandbar, masthead, search, utils, burger — has
any JS hook. The burger has no click handler at all (§5.11).

---

## 10. Known quirks / fixed bugs worth remembering

- **`.util__text{white-space:normal}` was a real bug**, not a style choice —
  it let phone numbers and "Sign In" wrap mid-word inside a tight `.util` at
  desktop widths, which is what actually produced a "packed/cramped" header.
  Fixed by keeping `white-space:nowrap` at every breakpoint (§5.8). If the
  header ever looks cramped again, check this property first before touching
  spacing.
- **`.util{flex-shrink:0}` at 1025px+** exists specifically so `.search` (not
  the utility icons) absorbs 100% of any horizontal space deficit. Removing
  it re-introduces the same wrapping bug from a different angle.
- **`.search{min-width:0}`** is required alongside the above — without it,
  the search box's own content sets an implicit floor and can't shrink small
  enough to give the utils room, so the row overflows instead.
- **`.masthead__inner{max-width:1600px}`** (desktop only) is *wider* than the
  page's own `--shell` (1320px). This is intentional — it's what actually
  gives the search field room to grow past ~340px on real screens; without
  it the row is capped at the same width as the page content column and the
  search field never gets meaningfully bigger no matter what its own
  `flex-basis` says.
- **Icon-swap (`.icon-mobile`/`.icon-desktop`)** exists because a single SVG
  can't cleanly restyle between "stroke-drawn outline" (mobile search icon)
  and "solid fill" (desktop) — two elements, toggled by `display`, is the
  reliable version of that trick.
- **`aria-hidden` + `tabindex="-1"` is not enough to hide a duplicate link
  from keyboard users** — WCAG 4.1.2 flags any focusable descendant inside an
  `aria-hidden` container, `tabindex="-1"` included. Any future duplicate/decoy
  content (carousels, marquees) should use a non-focusable element (`<span>`,
  not `<a>`) instead, not `aria-hidden` + `tabindex="-1"` on an anchor.
