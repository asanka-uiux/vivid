# About page — salvaged source facts

**Why this file exists.** The stakeholder rewrite of `about.html` deletes the 25-year
timeline, the stats band, the mission quote, the "family of brands" block and the
catalog-size claims. Several of those blocks are the *only* place on the site where a
substantiating fact lives — including the proof for sections the new brief wants to
*add*. This file preserves those facts before the markup goes, so the rebuild doesn't
have to re-source them from the business.

Everything below was transcribed from `about.html` as it stood 2026-09-03, which is
itself marked "Ported from vividracing.com · August 2026". **Treat these as
second-hand and re-confirm anything that ships as a claim** — see the flagged section
at the end.

---

## 1. Exclusive / authorized brand relationships

The new brief asks for a Partner brands section with "ownership of the exclusive
relationships we have." This is the entire evidence base for that, and all of it is
inside the timeline being deleted:

| Year | Relationship |
|---|---|
| 2018 | **Prior Design** — exclusive distributor |
| 2017 | **ArmyTrix** — exclusive North American distributor |
| 2017 | SEMA Top Dealer award (second consecutive) with **Mackin Industries** |
| 2016 | SEMA Top Dealer award |

Naming Prior Design and ArmyTrix specifically is what makes the "exclusive
relationships" claim defensible. A general "we hold exclusive relationships" with no
named counterparty is the same unsubstantiated-claim exposure already flagged in
commit `7fd1f7b` alongside the "Authorized parts" wording. If the exclusivity has
lapsed since 2017/2018, the claim needs dropping or restating — **verify current
status with the business before this ships.**

## 2. Fitment confidence + "cost of getting it wrong"

The brief's strongest section already has a concrete policy behind it. Currently card
1 of 6 in `.ab__info`, easy to lose:

- **Fitment Promise** — "Modified ride? A tech confirms fit by phone before you buy —
  **wrong-fit is on us.**" Links to `waiting-to-build/fitment-promise.html`.
- **Expert Advice** — real techs on the phone, Mon–Sat, "no scripts, no upsell, just
  straight answers on offset and fitment." Phone: 480-966-3040.
- **Wheel Fitment Tool** — checks backspacing, offset and lift combinations
  (`waiting-to-build/wheel-fitment.html`).

"Wrong-fit is on us" is the answer to "cost of getting it wrong — and how we prevent
that." It is a stated policy, not a marketing line, so confirm it's still the actual
returns policy before making it the centrepiece.

## 3. Review / social-proof numbers

Supports both the "3 Google reviews" block and the standing to make fitment claims:

- **4.7 star average across 58,811 verified reviews**, collected by **Shopper Approved
  and Google**.
- Existing links: `waiting-to-build/reviews.html`, `waiting-to-build/gallery.html`.

A count that precise goes stale. **Get a current figure and an as-of date**, or state
it as "58,000+". For the three pull-quotes the brief wants: they need to be real
reviews with real attribution — the FTC's fake-review rule carries civil penalties.

## 4. Facility / capability — the "we're not two guys in a garage" proof

After the deletions, nothing on the page carries this. Recommend keeping exactly one
proof block built from these:

- **15,000 sq ft custom-built facility, Gilbert, Arizona** (2008) — in-ground Mustang
  dyno, lifts, Agency Power fabrication and the call center under one roof.
- **CNC machine shop in-house** (2012) for Agency Power production.
- Earlier: 10,000 sq ft Chandler building (2005) with a **Mustang AWD dyno, one of two
  in the state at the time** — started the tuning program.
- **Five house brands:** VR Forged, VR Performance, VR Aero, VR Tuned, Agency Power.

This is the same argument the homepage already makes as "Built by enthusiasts. Backed
by experts." — mirror that treatment rather than inventing a new one.

## 5. Chassis / platform coverage

For the brief's "3-car garage" chassis-ownership section. Note the site already has
**two** taxonomies in the live `.jump` sections — use one of these rather than adding a
third:

- `index.html` — Euro / Exotic / JDM
- Sub-brand homepages — Trucks (`vivid-trucks`), Crossover (`vivid-crossover`), Muscle
  (`vivid-classics`), Powersports (`vividx`)
- Coverage stated on the about page: performance cars, trucks, Jeeps, UTVs, motorcycles
- UTV expansion (2016): Polaris / Can-Am

## 6. Build / motorsport credibility

For the gallery section and any "we actually build cars" claim:

- **Nearly 100 magazine features**, starting with Super Street's Project WRX (2003)
- First SEMA (2002): Project Subaru WRX I, full JDM build on Volk wheels
- **206.2 mph at the Texas Mile on a stock engine** — Project 997 Turbo (2010)
- Targa Newfoundland road rally, Project 997.2 Turbo S (2012)
- Gumball 3000, San Francisco to Miami (2003)
- Project SRT Viper, SEMA debut (2013)
- Pepsi / DUB / Mazda RX-8 project builds (2005)

## 7. Founding story — for "Why we exist"

The brief wants the problem-and-solution, not the full backstory. The usable core:

> Fresh out of Arizona State, **Rob and Dan** started VividRacing.com in 2001 from a
> **1,500 sq ft unit in Tempe with $500 cash and a $1,500 loan**, selling Subaru
> performance parts.

And the actual origin of the business model (2004, Agency Power founding entry) — this
is the "why we exist" insight, stated as a question they asked themselves:

> "if it works for Subaru and Evo, why not every car?"

That line is the closest thing in the existing content to a genuine problem statement,
and it's currently buried in a hidden timeline entry.

---

## Flagged — do not ship without checking

- **Exclusivity (Prior Design, ArmyTrix)** — dated 2017/2018. Still current?
- **"Wrong-fit is on us"** — is this the real, current returns policy?
- **58,811 reviews / 4.7 stars** — needs a fresh number + as-of date.
- **Catalog size** — the brief kills this, but it's inconsistent sitewide and the
  contradiction stays live after an About-only fix: `about.html` says "two million
  parts", the five homepages say "1M+ parts" (`.browse__eyebrow`),
  `waiting-to-build/contact.html` says "more than two million". Needs one sitewide
  decision.
- **"Nearly 100 magazine features"** — unverified count.
- **Enthusiast Enterprises / EEI (2025)** — the brief explicitly kills any
  family-of-brands mention. Preserved here only so the fact isn't lost; do not use.
- **Mission statement** — "To fuel the passion of enthusiast vehicle owners." Cut per
  the brief. Recorded here in case it's wanted for internal or meta use.

## Content gaps — nothing exists to source from

- **Lead times / in-stock transparency** (one of the brief's four "Why us" blocks).
  There is no existing content anywhere on the about page for this. Needs source facts
  from the business: what the actual lead-time commitment is, and whether live stock
  status is available to display.
- **Gallery mosaic** — the brief specifies sourcing from the Custom Offsets gallery
  "since it houses all ymm's". That's a different project; no such assets exist in this
  repo. Needs an export or a URL source.
- **"Named parts" on gallery builds** — no build-to-parts mapping data exists locally.

---

## Appendix — full timeline, verbatim

Preserved because the markup is being deleted. Entries 2017 and earlier were already
`hidden` behind a "View the full 25-year timeline" toggle.

| Year | Entry | Detail |
|---|---|---|
| 2025 | Joins Enthusiast Enterprises | Vivid Racing joins EEI, cementing its position in automotive aftermarket e-commerce. |
| 2024 | New platform | A new version of vividracing.com launches in May; 23 years in. |
| 2022 | VR Forged · $100M goal | VR Forged wheels launch to a strong reception; a CRO joins to drive toward the $100M sales goal. 21 years of business. |
| 2021 | Twenty years | Two decades in, built on the same customer base that started it. |
| 2020 | Record year | Pandemic year ends in sales records; customer service team expands, a CFO joins, warehouse reconfigured. |
| 2018 | New website · Prior Design | Faster storefront ships; Vivid becomes exclusive distributor for Prior Design. Sales pass eight figures. |
| 2017 | Automation · ArmyTrix | Big investment in vendor-data automation; exclusive North American distributor for ArmyTrix. Second straight SEMA Top Dealer award with Mackin Industries. |
| 2016 | Fifteen years · UTV | SEMA Top Dealer award; expansion into the fast-growing Polaris / Can-Am UTV market. |
| 2015 | Eight figures | Annual sales pass eight digits while much of the industry is still recovering. |
| 2014 | VR Tuned launches | After years of selling other people's tuning, VRTuned.com launches: flash tuning, plug-and-play boxes, TCU tuning and throttle controllers. |
| 2013 | HorsepowerFreaks acquired | A competitor catalog site is acquired and folded into the Vivid infrastructure; Project SRT Viper debuts at SEMA. |
| 2012 | CNC in-house | A CNC machine shop is integrated into the facility for Agency Power production; Targa Newfoundland road rally in the Project 997.2 Turbo S. |
| 2011 | Status Racing | Rob and Dan acquire the FIA-certified seat maker (sold on to PRP Seats in 2016). |
| 2010 | 206 mph | The Project 997 Turbo runs 206.2 mph at the Texas Mile on a stock engine; two SEMA feature cars. |
| 2008 | The Gilbert building | A custom-built 15,000 sq ft facility in Gilbert, Arizona: in-ground Mustang Dyno, lifts, Agency Power fabrication and the call center under one roof. |
| 2005 | Chandler · first dyno | 10,000 sq ft building in Chandler; a Mustang AWD dyno — one of two in the state — starts the tuning program. Pepsi/DUB/Mazda RX-8 project builds. |
| 2004 | Agency Power founded | In-house manufacturing begins under its own brand; the catalog-database business starts: if it works for Subaru and Evo, why not every car? |
| 2003 | First magazine feature | Super Street features the Project WRX — the first of nearly a hundred; Gumball 3000 from San Francisco to Miami. |
| 2002 | First SEMA | Project Subaru WRX I — full JDM build on Volk wheels — puts Vivid Racing on the map. |
| 2001 | Founded | Fresh out of Arizona State, Rob and Dan start VividRacing.com from a 1,500 sq ft unit in Tempe with $500 cash and a $1,500 loan, selling Subaru performance parts. |
