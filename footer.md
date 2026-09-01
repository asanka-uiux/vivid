# Vivid Racing Footer (v2) — Complete Reference

Everything about the shared `<footer id="v2-footer">` built on `index.html` —
full markup, every CSS rule, and the exact value at every breakpoint
(mobile → tablet → desktop). This is the single source of truth for the v2
footer; if it ever changes, edit `index.html` first, then update this file
and re-verify the numbers below.

Style ported from the live footer at `test.vividwheels.com` (fetched via a
real browser, not guessed) and adapted to this project's own tokens/brand —
see §10 for exactly what was changed from the reference and why.

Last verified against: `css/shared.css` lines 634–756 + `index.html` lines
4083–4284 + `js/script.js` lines 11–24, 2026-09-01.

---

## 1. Files

| File | Role |
|---|---|
| `index.html` | Canonical footer markup, lines 4083–4284 (opening comment through `</footer>`). **Currently the only page using this footer.** |
| `css/shared.css` | **All** v2-footer CSS, lines 634–756 (`#v2-footer` through the end of its two media queries). Loaded by all 8 pages (`index.html`, the 4 family pages, both PDP pages, `about.html`) — the CSS is already live everywhere, only the markup needs to be copied over per page. Purely additive: the old `.foot`/`.foot__*` rules earlier in the same file are untouched and still render on the 7 pages that haven't been migrated yet. |
| `js/script.js` | Lines 11–24 — the mobile accordion toggle for the link columns (§9). Already linked by all 8 pages. |
| `css/style.css` | Not involved. No footer rules live here. |

Mobile-first throughout: every rule states its narrowest (mobile) value as
the unqueried base; `@media screen and (min-width: …)` blocks layer on
tablet/desktop enhancements as the viewport grows.

---

## 2. Design tokens used

No new tokens were introduced — the footer reuses `:root` tokens already
defined in `css/shared.css` (see `header.md` §2 for the full list):

| Token | Value | Used for |
|---|---|---|
| `--action-primary` | `#b31414` | Stat numbers, stars, the "0%"/"$1" emphasis, financing-price accent, column-heading underline. **Substituted in place of the reference site's own accent** — see §10. |
| `--font-ui` | `'Inter',system-ui,-apple-system,'Segoe UI',sans-serif` | Every piece of footer text — the whole component is one font family, just different weights/sizes. |
| `--shell` | `1320px` | Max-width of the stats-inner row, the body row, and the bottom legal row. |
| `--gutter` | `16px` mobile → `28px` at 901px+ | Side padding on `.v2-footer__stats`, `.v2-footer__body`, `.v2-footer__bottom`. |

One literal, non-tokenized color not in `:root`: **`#333`** (`#333333`), the
footer's own dark charcoal background — deliberately softer than
`--bg-inverse` (`#000`, what the old `.foot` uses). This is a real,
intentional style difference from the rest of the site's chrome, ported
straight from the reference. Also literal: `#f7f7f7`/`#e0e0e0` (stats-strip
light background/borders), `#6b6b6b` (muted label gray) — generic neutrals
with no existing token, copied as-is.

---

## 3. Breakpoint map

| Breakpoint | What flips |
|---|---|
| **768px** | Stats strip stars grow (14→16px, desktop only affects size, not layout). Body switches column→row (`.v2-footer__body{flex-direction:row}`), brand block becomes a fixed-width left rail (300px, gets a right border) instead of the mobile centered stack. Link grid switches from an accordion list to `flex-direction:row` — columns fan out **3 across**, and `.v2-footer__col-toggle` becomes non-interactive (`pointer-events:none`), its chevron hides, and `.v2-footer__col-links` is forced open (`max-height:none!important`). Family-logo row becomes a 3-column grid. Contact info's two columns (Customer Service / Headquarters) go side-by-side. |
| **1024px** | Stats strip switches from horizontal-scroll to `justify-content:space-between` (everything fits, no scroll needed) — stat numbers/labels/finance text all pick up `clamp()` fluid sizing instead of a fixed px value. Brand rail widens 300→320px. Link columns go from 3-across to **6 across** (all columns on one row). Family-logo grid goes from 3 to 5 columns. |

Only two breakpoints total — much simpler than the header's four-tier ramp.
Nothing above 1024px changes further (no equivalent of the header's 1181px
tier).

---

## 4. Structure (markup skeleton)

```html
<footer id="v2-footer">

  <div class="v2-footer__stats"> … 5 stat items … </div>

  <div class="v2-footer__body">
    <div class="v2-footer__brand"> … logo, desc, contact, socials … </div>
    <div class="v2-footer__right">
      <div class="v2-footer__link-grid"> … 6 accordion columns … </div>
      <div class="v2-footer__family"> … label + 5 sub-brand logos … </div>
    </div>
  </div>

  <div class="v2-footer__bottom"> … legal links + copyright … </div>

</footer>
```

No `.shell`/`.wrap` wrapper divs anywhere inside — each top-level piece
(`.v2-footer__stats-inner`, `.v2-footer__body`, `.v2-footer__bottom p`)
centers and caps its own width directly via `max-width:var(--shell);margin:0
auto` rather than nesting a shared container class. Don't add a `.shell` div
around any of this — it would double up the padding since `--gutter` is
already applied per-section.

---

## 5. Component CSS — mobile vs. desktop

### 5.1 Stats strip

```css
#v2-footer{background:#333;font-family:var(--font-ui)}
#v2-footer a:focus-visible,#v2-footer button:focus-visible{outline:2px solid var(--action-primary);outline-offset:2px;border-radius:2px}

.v2-footer__stats{background:#f7f7f7;border-top:1px solid #e0e0e0;border-bottom:1px solid #e0e0e0;padding:17px var(--gutter);overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none}
.v2-footer__stats::-webkit-scrollbar{display:none}
.v2-footer__stats-inner{display:flex;align-items:center;gap:12px;min-width:max-content;max-width:var(--shell);margin:0 auto}
.v2-footer__stat{display:flex;align-items:center;gap:8px;flex-shrink:0}
.v2-footer__stat:not(:last-child){border-right:1px solid #e0e0e0;padding-right:12px}
.v2-footer__stat-num{font-family:var(--font-ui);font-size:24px;font-weight:600;color:var(--action-primary);letter-spacing:-.208px;line-height:.87;white-space:nowrap}
.v2-footer__stat-right{display:flex;flex-direction:column;gap:2px}
.v2-footer__stat-label{color:#6b6b6b;font-family:var(--font-ui);font-size:14px;font-weight:400;line-height:normal;letter-spacing:.14px;text-transform:uppercase}
.v2-footer__stars{display:flex;gap:3px;line-height:1}
.v2-footer__stars span{color:var(--action-primary);font-size:14px;line-height:1;font-weight:600}
.v2-footer__stat--financing{gap:16px}
.v2-footer__finance{display:flex;align-items:center;gap:3px}
.v2-footer__finance-text{display:flex;flex-direction:column}
.v2-footer__finance-sub{font-family:var(--font-ui);font-size:13px;font-weight:400;line-height:18px;color:#6b6b6b;text-transform:uppercase}
.v2-footer__finance-price{font-family:var(--font-ui);font-size:13px;font-weight:400;line-height:1.2;color:#6b6b6b;text-transform:uppercase;white-space:nowrap}
.v2-footer__finance-price strong{font-size:24px;font-weight:600;color:var(--action-primary);margin-right:2px}
.v2-footer__finance-badge{display:inline-flex;align-items:center;padding:4px 9px;background:rgba(255,255,255,.85);border:.5px solid rgba(0,0,0,.1);border-radius:4px;font-family:var(--font-ui);font-size:11px;font-weight:700;letter-spacing:.02em;color:#333}
```
```css
@media screen and (min-width:768px){
  .v2-footer__stars span{font-size:16px}
}
@media screen and (min-width:1024px){
  .v2-footer__stats{overflow-x:visible}
  .v2-footer__stats-inner{min-width:0;justify-content:space-between;gap:clamp(6px,1.27vw,12px)}
  .v2-footer__stat:not(:last-child){border-right:none;padding-right:0}
  .v2-footer__stat-num{font-size:clamp(15px, 1.65vw, 24px)}
  .v2-footer__stat-label{font-size:clamp(10px, .95vw, 14px)}
  .v2-footer__stat--financing{gap:clamp(8px,1vw,16px)}
  .v2-footer__finance-price,.v2-footer__finance-sub{font-size:clamp(9px, .88vw, 13px)}
  .v2-footer__finance-price strong{font-size:clamp(15px, 1.65vw, 24px)}
}
```

5 stat items, always in this order: **verified-buyer count → financing combo
(Affirm + Katapult, two `.v2-footer__finance` blocks inside one
`.v2-footer__stat--financing`) → star rating → free shipping → return
rate.** Mobile: horizontal-scroll strip (`overflow-x:auto`, scrollbar
hidden), each stat keeps its natural width and a vertical divider except the
last. Desktop (1024px+): scroll disabled, stats spread edge-to-edge with
`justify-content:space-between`, dividers removed, and every size becomes a
`clamp()` so it scales smoothly with viewport width instead of jumping at a
single breakpoint.

The financing badges (`.v2-footer__finance-badge` — "Affirm" / "Katapult")
are **plain text pills, not the providers' real logos** — deliberate, see
§10.

### 5.2 Brand block (logo, description, contact, socials)

```css
.v2-footer__body{display:flex;flex-direction:column;padding:24px var(--gutter);gap:16px;max-width:var(--shell);margin:0 auto;width:100%;box-sizing:border-box}
.v2-footer__brand{display:flex;flex-direction:column;gap:10px}
.v2-footer__logo{display:block;width:180px;line-height:0;align-self:center}
.v2-footer__logo img{display:block;width:100%;height:auto}
.v2-footer__desc{color:rgba(255,255,255,.5);margin:0;text-align:center;font-family:var(--font-ui);font-size:12px;font-weight:400;line-height:1.5}
.v2-footer__contact{display:flex;flex-direction:column;gap:15px;padding-bottom:6px;border-bottom:1px solid #6b6b6b}
.v2-footer__contact-top{display:flex;flex-direction:column;gap:8px}
.v2-footer__contact-col{display:flex;flex-direction:column;gap:3.5px;flex:1}
.v2-footer__contact-col>.v2-footer__contact-phone{margin-top:6px}
.v2-footer__contact-link{font-family:var(--font-ui);font-size:13px;font-weight:600;color:rgba(255,255,255,.8);text-decoration:underline;text-underline-offset:2px;width:fit-content;transition:color .2s ease}
.v2-footer__contact-link:hover{color:rgba(255,255,255,.75)}
.v2-footer__contact-label{color:rgba(255,255,255,.5);font-family:var(--font-ui);font-size:12px;font-weight:600;letter-spacing:1.248px;text-transform:uppercase;margin-bottom:2px}
.v2-footer__contact-phone{transition:color .2s ease;width:fit-content;white-space:nowrap;color:rgba(255,255,255,.8);font-family:var(--font-ui);font-size:16px;font-weight:600}
.v2-footer__contact-phone:hover{color:rgba(255,255,255,.75)}
.v2-footer__contact-hours,.v2-footer__contact-address{color:rgba(255,255,255,.5);font-family:var(--font-ui);font-size:12px;font-weight:400;line-height:16px}
.v2-footer__contact-address{font-style:normal}

.v2-footer__socials{display:flex;gap:8px;justify-content:center;list-style:none;padding:0;margin:0}
.v2-footer__social{display:flex;width:30px;height:30px;justify-content:center;align-items:center;border:1px solid rgba(255,255,255,.5);transition:border-color .2s ease}
.v2-footer__social:hover{border-color:rgba(255,255,255,.9)}
.v2-footer__social img{width:15px;height:15px;display:block;opacity:.7;transition:opacity .2s ease}
.v2-footer__social:hover img{opacity:1}
```
```css
@media screen and (min-width:768px){
  .v2-footer__body{flex-direction:row;align-items:stretch}
  .v2-footer__brand{width:300px;min-width:260px;flex-shrink:0;padding-right:24px;border-right:1px solid rgba(255,255,255,.08)}
  .v2-footer__logo{align-self:auto}
  .v2-footer__desc{text-align:left}
  .v2-footer__socials{justify-content:flex-start}
  .v2-footer__contact-top{flex-direction:row;gap:20px}
}
@media screen and (min-width:1024px){
  .v2-footer__brand{width:320px}
}
```

Mobile: everything in the brand block is **center-aligned** (logo, desc,
socials) in a single narrow column. Desktop: it becomes a **left-aligned
fixed-width rail** (300px → 320px at 1024px) with a right border separating
it from the link columns, and the two contact columns (Customer Service /
Headquarters) go side by side instead of stacked.

Contact block only has **two** columns (Customer Service, Headquarters) —
the reference site has a third ("Customer Sales") that this port
deliberately dropped since ViViD only has one real phone number/hours to
show (see §10).

### 5.3 Link-column accordion grid

```css
.v2-footer__right{display:flex;flex-direction:column}
.v2-footer__link-grid{display:grid;gap:0}
.v2-footer__link-col{border-bottom:1px solid rgba(255,255,255,.08)}
.v2-footer__col-toggle{display:flex;justify-content:space-between;align-items:center;width:100%;background:0 0;border:none;padding:14px 0;cursor:pointer;text-align:left;color:#fff;font-family:var(--font-ui);font-size:14px;font-weight:600;line-height:20px;letter-spacing:1.382px;text-transform:uppercase}
.v2-footer__link-col:first-child .v2-footer__col-toggle{font-size:16px;letter-spacing:.16px}
.v2-footer__col-toggle>span{border-bottom:2px solid var(--action-primary);padding-bottom:3px}
.v2-footer__chevron{flex-shrink:0;stroke:rgba(255,255,255,.5);transition:transform .25s ease}
.v2-footer__link-col--open .v2-footer__chevron{transform:rotate(180deg)}
.v2-footer__col-links{list-style:none;margin:0;padding:0;max-height:0;overflow:hidden;transition:max-height .3s ease}
.v2-footer__link-col--open .v2-footer__col-links{max-height:320px}
.v2-footer__col-links li{padding:1px 0}
.v2-footer__col-links a{display:block;padding:5px 0 13px;font-family:var(--font-ui);font-size:13px;color:rgba(255,255,255,.5);line-height:1.5;transition:color .2s ease}
.v2-footer__col-links a:hover{color:rgba(255,255,255,.9)}
```
```css
@media screen and (min-width:768px){
  .v2-footer__right{flex:1;min-width:0;padding-left:8px}
  .v2-footer__link-grid{display:flex;flex-direction:row;flex-wrap:wrap;gap:6px;align-items:flex-start}
  .v2-footer__link-col{border-bottom:none;flex:0 0 calc((100% - 12px)/3);min-width:0}
  .v2-footer__col-toggle{padding:5px 0;margin-bottom:5px;pointer-events:none;cursor:default;border-bottom:2px solid var(--action-primary);max-width:fit-content}
  .v2-footer__col-toggle>span{border-bottom:none;padding-bottom:0}
  .v2-footer__chevron{display:none}
  .v2-footer__col-links{max-height:none!important;overflow:visible}
  .v2-footer__col-links a{padding:1px 0 6px;line-height:1.5;max-width:fit-content}
}
@media screen and (min-width:1024px){
  .v2-footer__link-col{flex:0 0 calc((100% - 30px)/6)}
}
```

**Mobile (< 768px):** each column is a `<button aria-expanded>` + `<ul>`
accordion, independently toggleable (not exclusive — opening one doesn't
close the others), animated via `max-height` transition (0 → 320px, capped
high enough that no real column's link list ever gets clipped — verify this
cap if a column ever grows past ~10 links). JS in §9 does the toggling.

**Desktop (768px+):** the interactive parts turn off entirely
(`pointer-events:none` on the button, chevron hidden, `max-height:none
!important` on the list) — columns just sit open as static text. **All six
columns get the red underline** under their heading at this breakpoint
(`border-bottom:2px solid var(--action-primary)` on `.v2-footer__col-toggle`
itself, not just `:first-child`) — only the **font-size** differs for the
first column (16px vs. 14px for the rest), not the underline treatment.
Columns go 3-across at 768px, then 6-across (one row) at 1024px.

### 5.4 Family / sub-brand logo row

```css
.v2-footer__family{display:flex;flex-direction:column;gap:8px;padding:20px 0 4px;border-top:1px solid rgba(255,255,255,.08);margin-top:8px}
.v2-footer__family-label{color:#fff;font-family:var(--font-ui);font-size:14px;font-weight:400;letter-spacing:1.32px;text-transform:uppercase;margin:0}
.v2-footer__family-logos{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:20px}
.v2-footer__family-logo{display:flex;align-items:center;line-height:0}
.v2-footer__family-logo img{height:20px;width:auto}
```
```css
@media screen and (min-width:768px){
  .v2-footer__family{padding:12px 0;margin-top:16px}
  .v2-footer__family-logos{display:grid;grid-template-columns:repeat(3,1fr);align-items:center;justify-items:center;gap:24px}
}
@media screen and (min-width:1024px){
  .v2-footer__family{gap:16px}
  .v2-footer__family-logos{grid-template-columns:repeat(5,1fr);row-gap:clamp(20px,2.5vw,48px)}
  .v2-footer__family-logo{justify-content:center;max-width:100%}
  .v2-footer__family-logo img{height:clamp(20px,2vw,24px);max-width:100%;object-fit:contain}
}
```

**No grayscale/dim treatment on these logos** — the reference site dims its
family-brand images to 35% opacity and brightens on hover (its family row is
genuinely third-party partner brands). ViViD's 5 logos are the site's *own*
sub-brands (same as the header's brandbar switcher), so they render at full
color/opacity always, matching the pre-existing decision documented on the
old `.foot__family-logos` markup. **Don't add an `img{filter:…}` rule here**
if porting more of the reference's CSS later — that would contradict this
deliberate choice.

### 5.5 Bottom legal bar

```css
.v2-footer__bottom{padding:20px var(--gutter);border-top:1px solid rgba(255,255,255,.08)}
.v2-footer__bottom p{font-size:14px;font-weight:400;color:rgba(255,255,255,.6);line-height:1.2;margin:0 auto;text-align:center;max-width:var(--shell)}
.v2-footer__bottom a{color:rgba(255,255,255,.55);transition:color .2s ease;white-space:nowrap}
.v2-footer__bottom a:hover{color:rgba(255,255,255,.9)}
.v2-footer__bottom span{margin:0 4px}
```

No responsive variation — same at every width. Links + copyright wrap
naturally inside one centered `<p>`, pipe-separated by `<span
aria-hidden="true">|</span>`.

---

## 6. Interaction states

All covered inline in §5's rule blocks (`:hover` rules sit directly under
the base rule they modify) rather than grouped separately like the header
does. Full list, for a quick scan:

```css
#v2-footer a:focus-visible,#v2-footer button:focus-visible{outline:2px solid var(--action-primary);outline-offset:2px;border-radius:2px}
.v2-footer__contact-link:hover{color:rgba(255,255,255,.75)}
.v2-footer__contact-phone:hover{color:rgba(255,255,255,.75)}
.v2-footer__social:hover{border-color:rgba(255,255,255,.9)}
.v2-footer__social:hover img{opacity:1}
.v2-footer__col-links a:hover{color:rgba(255,255,255,.9)}
.v2-footer__bottom a:hover{color:rgba(255,255,255,.9)}
```

Focus ring is footer-scoped (`#v2-footer …:focus-visible`) rather than
reusing the header's global `:where(...):focus-visible` red-ring rule —
both resolve to effectively the same red outline, this one just also sets
`border-radius:2px` for the square social-icon buttons.

---

## 7. Reduced motion

No footer-specific reduced-motion override — it relies entirely on the
existing global catch-all at the bottom of `css/shared.css`:

```css
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;
    transition-duration:.01ms!important;scroll-behavior:auto!important}
}
```

This already neutralizes the accordion's `max-height`/`transform` transition
and the various `color`/`border-color`/`opacity` hover transitions above —
no extra rule needed.

---

## 8. What changes per page (propagation guide)

**Current state:** only `index.html` has this footer. The other 7 pages
(`wheel-pdp.html`, `tire-pdp.html`, `about.html`, `vivid-trucks.html`,
`vivid-crossover.html`, `vivid-classics.html`, `vividx.html`) still have the
old `<footer class="foot">…</footer>`. All 8 pages already link
`css/shared.css` and `js/script.js` — **the CSS and JS are already live
everywhere.** Propagating to another page is a pure markup swap:

1. Copy the full block from `index.html` lines 4083–4284 (opening comment
   through `</footer>`), verbatim.
2. On the target page, delete its existing `<footer class="foot">…</footer>`
   and paste the copied block in its place.
3. Adjust exactly the two things in the table below. Everything else —
   stats strip, brand description, contact info, all 6 link columns'
   content/hrefs, socials, bottom legal bar — **stays byte-identical** on
   every page. This is global site chrome, not page-specific content.

| Thing | Rule |
|---|---|
| `aria-current="page"` in `.v2-footer__family-logos` | Move it to the `<a>` matching the current page (mirrors the header's `.brandbar` rule exactly — see `header.md` §8). On `index.html` it's the "Vivid Racing" logo; on `vivid-trucks.html` it's "VR Trucks"; etc. **On the two PDP pages and `about.html`** (not one of the 5 family pages) — omit `aria-current` from all 5 logos entirely, don't guess a nearest match. |
| Top `.v2-footer__logo` (brand-block wordmark, top-left) | **Always** `href="index.html"`, **never** carries `aria-current`, on every page including `index.html` itself. This is deliberately *not* page-relative like the header logo — it's a fixed "go to the master ViViD Racing home" link, separate from the family-switcher row below it which *is* page-relative. Don't make this self-link like the header logo; that was a real bug caught and fixed once already (see §10). |

**Canonical values that must never drift page to page** (copy exactly):

| | Value |
|---|---|
| Phone | `tel:+14809663040` → `480-966-3040` |
| Headquarters | `7510 E. Main St, Mesa, AZ 85207` |
| Hours | `Mon–Fri: 8am–6pm MST` / `Sat: 9am–4pm MST` |
| Verified buyers stat | `14,000+` |
| Reviews stat | `4.9 · 14,000 Reviews` (5 stars) |
| Shipping stat | `Free Shipping` / `On Orders $499+` |
| Return-rate stat | `<1.4%` / `Return Rate` |
| Financing | `0%` APR (Affirm) · `$1` Down (Katapult) |
| Copyright | `© Copyright 2026 Vivid Distribution LLC` |

**Optional cleanup, not required for the footer to work:** `wheel-pdp.html`
has its own locally-pasted `.foot`-prefixed CSS block (see the comment
around its `<style>` block, "VIVID FOOTER — pasted from
_partials/footer.css"). Once that page is migrated to `id="v2-footer"`, that
local block becomes dead weight (harmless — different class names, nothing
collides) and can be deleted in a separate pass if you want to trim the
file.

---

## 9. JS dependency

`js/script.js` lines 11–24 — toggles each link column's accordion on
mobile. No-op on any page that doesn't yet have `.v2-footer__col-toggle` in
its DOM (i.e. the 7 pages still on the old footer), so linking this file
already reaching every page causes no side effects until you migrate that
page's markup.

```js
/* V2 footer link-group accordions (mobile only — the ≥768px breakpoint in
   shared.css switches .v2-footer__col-toggle to pointer-events:none and
   shows every column open, so this toggle has no effect there). Independent
   per column, not exclusive — matches the reference site's behavior. */
(function () {
  var toggles = document.querySelectorAll('.v2-footer__col-toggle');
  for (var i = 0; i < toggles.length; i++) {
    toggles[i].addEventListener('click', function () {
      var col = this.closest('.v2-footer__link-col');
      var open = col.classList.toggle('v2-footer__link-col--open');
      this.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
})();
```

Independent per column (not an exclusive accordion — opening SHOP doesn't
close PLATFORMS). Desktop behavior needs no JS at all: the ≥768px CSS in
§5.3 forces every column open and disables the button
(`pointer-events:none`), so this script is mobile-only in *effect* even
though nothing here checks viewport width directly — the CSS does that
gating, not the JS.

This is a **separate IIFE from the old footer's own accordion script**
(lines 1–9 of the same file, which syncs native `<details class="foot__col"
open>` to a `matchMedia` query). Don't merge them — they target different
class namespaces (`.foot__col` vs. `.v2-footer__col-toggle`) and use
different mechanisms (native `<details>` vs. a custom button+class toggle).
Once every page is migrated off the old footer, the old IIFE becomes dead
code and can be removed — not yet, since 7 pages still depend on it.

---

## 10. What changed from the reference, and why

Ported from `test.vividwheels.com`'s real rendered footer (fetched its
actual CSS file and DOM via a headless browser — a text-summary fetch isn't
precise enough for pixel-accurate porting). Deliberate departures from that
reference, so a future full-fidelity pass doesn't accidentally "fix" these
back to match the source and break something:

- **Accent color swapped.** Reference uses a muted teal-blue
  (`#296583`, its own `--site-accent-dark` token) for stat numbers, stars,
  and the column-heading underline. This port uses `var(--action-primary)`
  (`#b31414`, this project's red) instead — the reference's teal has no
  equivalent anywhere else on this site, and introducing an unrelated accent
  color just in the footer would clash with the red used everywhere else
  (logo, CTAs, underlines throughout every page).
- **Financing badges are text, not logos.** Reference embeds Affirm's and
  Katapult's actual SVG wordmarks. This port uses plain text pills
  (`.v2-footer__finance-badge`) instead — copying a third-party company's
  brand artwork into an unrelated prototype site is best avoided, and this
  project already refers to both providers as plain text elsewhere on the
  page (e.g. the "0% APR · Affirm + Katapult" strip higher up on
  `index.html`).
- **No third "Customer Sales" contact column.** Reference has Customer
  Service + Customer Sales + Headquarters (three columns). This port keeps
  only Customer Service + Headquarters — ViViD only has one real published
  phone number/hours to show, inventing a second would be fabricated
  content.
- **Trust-strip numbers are grounded in content already on the page**, not
  copied from the reference's own (vividwheels.com-specific) numbers.
  `14,000+ Verified Buyers` and `4.9 · 14,000 Reviews` come from
  `.rbar__facts`/`.promo__sub` elsewhere in `index.html`; `Free Shipping /
  On Orders $499+` matches the `.strip__title`/`.strip__sub` claim used
  elsewhere; `<1.4%` return rate is the other half of the same
  `.rbar__facts` line the buyer count came from. None of these were
  invented — if any of those source numbers change elsewhere on the page,
  update the footer stat to match.
- **No footer-embedded newsletter signup.** Reference's CSS has
  `.v2-footer__signup` rules (Klaviyo-widget styling) but the actual
  captured markup didn't render one — and this page already has a dedicated
  `.drop` "Drop in" newsletter section immediately above the footer (ported
  from a different part of the reference site in an earlier pass — see
  `index.html`'s `<section class="drop">`). Adding a second signup form
  inside the footer too would be redundant on the same page.
- **Family/sub-brand logos keep full color**, not the reference's
  grayscale-then-brighten-on-hover treatment — see §5.4. This preserves a
  decision already made on the old `.foot__family-logos` markup (ViViD's
  own sub-brands aren't third-party partners).
- **Top brand-block logo has no `aria-current` and always links to
  `index.html`** — an early draft of this footer copied the reference's own
  `<a href="/">` pattern *and* added `aria-current="page"` to match the
  header logo's general "link home" feel, which is wrong the moment this
  markup is copied to a second page (it would mislabel a link to a
  *different* page as the current one). Fixed before this doc was written;
  §8's propagation table calls this out explicitly so it doesn't regress.
