# Header — build reference

The `<header>` is shared chrome. Every VR family page (`index.html`, `vivid-trucks.html`,
`vivid-crossover.html`, `vivid-classics.html`, `vividx.html`) uses the **same markup
structure** and the **same two stylesheets** — nothing header-related lives in a
page-specific CSS file. When you build a new page, copy an existing page's `<header>`
block wholesale and only touch the handful of spots called out in §3 below.

## 1. Files

```html
<link rel="stylesheet" href="css/shared.css">  <!-- owns the header, footer, "Shop by Vehicle" card -->
<link rel="stylesheet" href="css/style.css">   <!-- page body sections — no header rules -->
<script src="js/script.js"></script>           <!-- mega-menu open/close; see §5 -->
```

All header CSS (`.brandbar`, `.masthead`, `.search`, `.util`, `.subnav`, `.mega`,
`.mobrow`) lives in `css/shared.css`. Never duplicate header rules into `css/style.css`
— if a header style needs to change, it changes once in `shared.css` and every page
picks it up.

## 2. Structure

The header is four parts, in this order, immediately after the skip link:

```html
<a class="skip" href="#main">Skip to main content</a>

<header>
  <!-- row 1 — brand switcher -->
  <nav class="brandbar" aria-label="Vivid family of brands"> … </nav>

  <!-- row 2 — logo · search · account/wishlist/cart -->
  <div class="masthead"> … </div>

  <!-- row 3 — category links + mega menus + promo/financing strip -->
  <nav class="subnav" aria-label="Product categories"> … </nav>

  <!-- mobile-only — live chat + hamburger -->
  <div class="mobrow"> … </div>
</header>
```

**Not part of the header:** the red "🔥 Limited time: 15% off…" banner (`.deal`) and
anything below it. That's the first element *inside* `<section class="hero">` on each
page, not part of `<header>` — don't pull it into a header partial.

### 2a. Row 1 — `.brandbar`

Five links, cross-linking the whole VR family. The current page's own link carries
`aria-current="page"` — every other link omits that attribute (don't add
`aria-current="false"`, just leave it off).

```html
<nav class="brandbar" aria-label="Vivid family of brands">
  <div class="shell">
    <ul class="brandbar__list">
      <li><a class="brandbar__link" href="index.html"><span class="brandbar__dot" aria-hidden="true"></span>Vivid Racing</a></li>
      <li><a class="brandbar__link" href="vivid-trucks.html"><span class="brandbar__dot" aria-hidden="true"></span>VR Trucks</a></li>
      <li><a class="brandbar__link" href="vivid-crossover.html"><span class="brandbar__dot" aria-hidden="true"></span>VR Crossover</a></li>
      <li><a class="brandbar__link" href="vivid-classics.html"><span class="brandbar__dot" aria-hidden="true"></span>VR Muscle</a></li>
      <li><a class="brandbar__link" href="vividx.html"><span class="brandbar__dot" aria-hidden="true"></span>VR Powersports</a></li>
    </ul>
  </div>
</nav>
```

### 2b. Row 2 — `.masthead`

```html
<div class="masthead">
  <div class="shell masthead__inner">
    <a class="logo" href="{{OWN_PAGE}}.html">
      <img src="{{LOGO_PATH}}" alt="{{LOGO_ALT}}" width="183" height="38">
    </a>

    <div class="utils">
      <form class="search" role="search" action="#" method="get">
        <label class="vh" for="q">Search parts</label>
        <input class="search__field" id="q" name="q" type="search"
               placeholder="{{SEARCH_PLACEHOLDER}}">
        <button class="search__submit" type="submit">
          <svg class="icon-desktop" viewBox="0 0 15 15" aria-hidden="true" focusable="false"><path d="…"/></svg>
          <svg class="icon-mobile" viewBox="0 0 30 30" aria-hidden="true" focusable="false" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="…"/></svg>
          <span class="search__submit-text">Search</span>
        </button>
      </form>

      <a class="util util--phone" href="tel:+14809663040"> … Call our experts / 480-966-3040 … </a>
      <a class="util" href="waiting-to-build/signin.html"> … Account / Sign In … </a>
      <a class="util util--wish" href="waiting-to-build/wishlist.html"> … Wishlist / N Saved … </a>
      <a class="util util--cart" href="waiting-to-build/cart.html" aria-label="Cart — N items, $X"> … Cart / $X … </a>
    </div>
  </div>
</div>
```

- `id="q"` on the search input is load-bearing — its `<label class="vh" for="q">`
  points at it. If you ever need two search forms on one page (shouldn't happen in
  the header, but worth knowing), the id has to stay unique.
- Every `.util` icon is duplicated as an `.icon-desktop`/`.icon-mobile` SVG pair —
  same element, two pieces of art, swapped by CSS at the 1025px breakpoint. Don't
  try to solve this with one icon + a transform; that's a deliberate pattern, see
  the comment above `.icon-mobile` in `shared.css`.
- `.util--phone` and `.util--wish` are hidden below 1025px on purpose (avoids
  crowding the row at tablet widths) — that's `display:none` in `shared.css`, not a
  markup difference. Don't delete them for a "mobile" version of a page.

### 2c. Row 3 — `.subnav`

Six category links, each opening a mega menu, plus a promo/financing strip on the
right. The category **set is identical across all five pages** — don't invent new
top-level categories per family page; the mega-menu *contents* can differ, the
category *labels* shouldn't.

```html
<nav class="subnav" aria-label="Product categories">
  <div class="shell subnav__inner">
    <ul class="subnav__list">
      <li class="subnav__item">
        <a class="subnav__link" href="waiting-to-build/suspension.html"
           aria-haspopup="true" aria-expanded="false" aria-controls="mega-suspension">
          Suspension <svg viewBox="0 0 8 8" aria-hidden="true" focusable="false"><path d="M2 3L4 5L6 3"/></svg>
        </a>
        <div class="mega" id="mega-suspension">
          <div class="shell mega__inner">
            <div class="mega__cols">
              <div class="mega__col"> … <ul class="mega__list"> … </ul> </div>
              <div class="mega__col"> … <a class="mega__cta">Shop all …</a> </div>
              <div class="mega__col mega__col--brands"> … </div>
            </div>
            <a class="mega__feature" href="…"> … </a>
          </div>
        </div>
      </li>
      <!-- repeat subnav__item for Wheels & Tires / Brakes / Exhaust / Aero & Body / Engine & Turbo -->
    </ul>
    <span class="subnav__spacer"></span>
    <a class="subnav__promo" href="waiting-to-build/deal-machine.html">Spring Event — 25% Off</a>
    <span class="subnav__divider" aria-hidden="true">|</span>
    <a class="subnav__fin" href="waiting-to-build/financing.html">
      <em>0% APR</em> <span>/ Pre-qualify in 60s</span>
    </a>
  </div>
</nav>
```

The `id="mega-{category}"` / `aria-controls="mega-{category}"` pair must match, and
must be unique per page (they already are, one per category — just don't rename one
side without the other).

### 2d. Mobile-only row — `.mobrow`

```html
<div class="mobrow">
  <div class="shell mobrow__inner">
    <button class="chat" type="button">
      <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="…"/></svg>
      Live Chat
    </button>
    <button class="burger" type="button" aria-label="Open menu">
      <span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>
    </button>
  </div>
</div>
```

The burger button isn't wired to a drawer yet (no click handler, no `aria-expanded`
— see the comment above it in the markup). If you wire it up, add
`aria-expanded`/`aria-controls` and keep `aria-expanded` in sync on toggle; don't add
`aria-expanded="false"` and leave it static, that misreports state to a screen reader.

## 3. What actually changes per page

This is the complete list. Everything else in the header is byte-identical
copy-paste across all five pages.

| Element | What changes | Example (vivid-trucks.html) |
|---|---|---|
| `.brandbar__link` | `aria-current="page"` moves to the current page's `<li>` (and is absent from the other four) | `aria-current="page"` on the "VR Trucks" link |
| `.logo` | `href` points at the page's own filename | `href="vivid-trucks.html"` |
| `.logo img` | `src` swaps to that family's logo variant; `alt` swaps to the family name | `src="logos/flat-system/vivid-master-red.svg"`, `alt="VR Trucks"` |
| `.search__field` | `placeholder` swaps to a family-relevant example | `placeholder="Search 100,000+ truck parts — try 'Raptor lift kit' or 'TRX exhaust'"` |

Everything in `.masthead`'s utils cluster (phone number, sign-in, wishlist, cart),
all of `.subnav`, and all of `.mobrow` stay identical across pages.

**Fixed 2026-08-27:** `vivid-classics.html` and `vividx.html` had the trucks-page
values in two of the four rows above — `.logo href` pointed at `vivid-trucks.html`
instead of their own page, and the search placeholder read "100,000+ truck parts…"
on both. Both were cloned from the trucks page and those two spots weren't updated.
Now corrected to their own page + family-appropriate placeholder copy.

## 4. JS dependency

`js/script.js` only touches the header for the mega-menu open/close behavior. It
queries generically by class — `.subnav__item` → `.subnav__link` / `.mega` — so a new
category just needs that same three-piece structure (item / link / mega, with the
`aria-controls` id match from §2c) and it works with zero JS changes. Nothing else in
the header — brandbar, masthead, search, utils, burger — has any JS hook today.

## 5. Building a new page's header

1. Copy the full `<header>…</header>` block from any existing page (`index.html` is
   the reference; the others already match it structurally).
2. Update the four rows in the §3 table for the new page.
3. Leave everything else untouched — don't rename classes, don't add per-page CSS,
   don't drop `.util--phone`/`.util--wish` thinking they're mobile cruft.
4. If the page needs new/different top-level categories, ask first — the six
   categories are shared brand architecture, not a per-page decision.
