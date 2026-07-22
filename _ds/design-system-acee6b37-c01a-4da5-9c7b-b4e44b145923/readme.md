# BuildFirst Design System

A flat, calm, content-first system for **BuildFirst** — a services company creating
a generation of GenAI-fluent leaders. The same system spans the marketing site,
client-facing products (assessments, fluency tools), branded consoles/dashboards
(internal and external), slides, and documents.

> **North star:** simple, clean, content over flair. One thousand no's for every yes.

## Sources
- Marketing site: <https://www.buildfirst.io>
- Console reference (local to author's machine, not web-accessible):
  `…/intelligence-os/inbox/dashboard-2026-06-24.html`
- External product reference (local): `…/rick-hair-coaching/04-delivery/build/sherpa-console/index.html`
- Uploaded artifact rebuilt in-system: `uploads/dashboard-2026-06-25.html` → `IntelligenceOS Dashboard.dc.html`
- Original concept canvas: `BuildFirst System.dc.html` (all surfaces side-by-side)

These local paths are recorded for the author; the reader is not assumed to have access.

---

## CONTENT FUNDAMENTALS

**Voice.** Plain, direct, builder's English. Short declarative sentences. Confident
but never hypey. We talk to capable, busy executives as peers — never down to them.

- **You, not we.** Copy addresses the reader ("where do you sit?", "your fluency map",
  "you own everything we build"). First-person plural only for the company's promise.
- **Casing.** Headlines and titles are **lowercase** ("build first. learn fast.",
  "/your fluency map"). Micro-captions and labels are **ALL-CAPS**, letter-spaced, in
  mono. Sentence case for body. Proper nouns keep their caps.
- **The `/` mark.** Every title is prefixed with a forward slash in a lighter weight —
  a builder's prompt / a path forward. On first paint it performs a single 360° spin,
  then sits still. It is the one piece of "flair" the system allows.
- **Numbers are first-class.** Metrics lead with big tabular **mono** numerals; the
  label sits above in small caps. Real figures, never decorative stats.
- **No AI clichés.** No em-dash-isms, no "unlock/leverage/supercharge", no emoji, no
  exclamation-heavy energy. If a sentence could appear in any AI tool's marketing,
  rewrite it.
- **Recurring vocabulary.** *The Spectrum* (Asking → Automation → Augmentation → Agency),
  *The 4D framework* (Delegation, Description, Discernment, Diligence), *the build*,
  *fluency*, *90 minutes to clarity*.

Example copy:
> `GENAI FLUENCY FOR LEADERS` (caption) · "/build first. learn fast. repeat." (hero) ·
> "You don't need weeks — 90 minutes, something real to build, and someone who's done
> it walking beside you." (lead)

---

## VISUAL FOUNDATIONS

**Palette.** Four flat pastel fields — **sage, periwinkle, lilac, rose** — plus
near-black **ink**, warm off-white **paper**, and a slightly cooler **canvas** for app
backgrounds. Rule: **one flat pastel field per context/screen/section**; never gradient
two pastels together, never more than one pastel band per view. Pastels rotate by
meaning (rose = attention, sage = on-track/delivery, periwinkle = primary/finance,
lilac = content/reflective). Ink carries all chrome, type, sidebars, and primary buttons.

**Type.** A single neutral grotesque (Helvetica Neue / Neue Haas Grotesk; shipped here
as metric-compatible **Arimo**) for everything except numerals and captions, which use
**JetBrains Mono**. Display is semibold (600), lowercase, very tight tracking
(-0.04em), line-height ~0.92. No second display face. Captions are 10–11px mono, caps,
+0.12em.

**Numerals.** Tabular mono, medium weight, large. A metric card is: small caps label →
big mono number (clamp 32–46px) → muted sub-label.

**Backgrounds.** Solid colour only. No photography-as-texture, no gradients, no noise,
no patterns. The canvas is the design; whitespace is generous and deliberate.

**Borders & cards.** Cards are white, `--bf-radius-md` (12px), a 1px `--bf-line` hairline,
and at most one soft shadow (`0 1px 3px rgba(0,0,0,.08)`). A 3px top border in the
section's pastel ties a card to its context. Large surfaces (slides, documents, app
shells) use a near-square 2px radius.

**Buttons.** Two shapes. (1) **Ticket button pair** — fully-rounded SKIP / START pair
with two notch circles punched top & bottom centre (the colour of the surface behind),
mono caps label. (2) Plain pill — ink fill + paper text (primary) or transparent +
ink outline (secondary). Range pills are small mono toggles inside a white capsule.

**Severity without leaving the palette.** critical = solid ink tag + 3px ink left-rule;
warning = outline tag + 3px rose left-rule; ok/go = sage tag. Amber (`--bf-warn-*`) is
the only non-palette colour, reserved for "not-yet-aged / waiting" states.

**Numbered sections.** Accordions and frameworks are numbered `01 / 02 / 03` in mono,
hairline divider under each label.

**Layout.** Apps: fixed/sticky **248px ink sidebar** + sticky translucent top bar +
scrolling content of `pastel band → metric cards → tables/lists`. Marketing: full-bleed
pastel hero → paper sections. Documents: 720px paper page, 56px margins, running
header/footer in mono caps. Slides: 960×540 (16:9), one pastel or ink field each.

**Motion.** Almost none. The only signature animation is the `/` spin on load
(`spin360`, ~0.8s, ease-out, runs once). Hover = slight opacity/!!background shift;
press = no bounce. Calm by default.

**Corner radii.** buttons/pills = full; cards = 12px; nested fields = 10–14px;
slides/docs/shells = 2px. **Transparency/blur** is used only for the sticky app top bar
(`backdrop-filter: blur(10px)` over `rgba(238,237,232,.85)`).

---

## ICONOGRAPHY

Deliberately minimal. The brand leans on **typographic and geometric marks** rather than
a drawn icon set:
- The **`/` slash** is the primary glyph (a real character, not an SVG).
- Nav/status markers are simple CSS shapes — small squares, circles, diamonds, dots —
  in ink or pastel, often just outlined.
- Numerals (`01`–`04`), the **traffic-light dots** on window chrome, and **progress
  dots/rails** for the Spectrum carry most "iconographic" weight.
- **No emoji.** **No gradient/3D icons.** If a real icon set becomes necessary, use a
  single thin-stroke line set (e.g. Lucide via CDN) at 1.5px and document it here —
  do **not** mix styles or hand-draw SVGs.

No logo binary was provided; the wordmark is simply **BuildFirst** set in the display
face, bold (700), -0.02em. Replace this section with the official logo asset when available.

---

## INDEX / MANIFEST

Root
- `styles.css` — global entry (import lines only). Link this in any consumer.
- `readme.md` — this guide. · `SKILL.md` — portable skill manifest.

`tokens/`
- `fonts.css` · `colors.css` · `typography.css` · `spacing.css` · `radius.css`

`guidelines/` — foundation specimen cards (Design System tab): Type, Colors, Spacing, Brand.

`components/` — React primitives
- `buttons/` `Button`, `TicketButtons` · `feedback/` `Tag` · `data/` `MetricCard`
- `surfaces/` `Card`, `SectionBand` · `navigation/` `SpectrumMeter`

`ui_kits/` — full-surface recreations (Design System tab cards)
- `website/` · `console/` · `product/` · `slides/` · `documents/`

`templates/` — consumer starting points (the "Templates" picker)
- `console/` · `documents/` · `product/` · `slides/` · `website/` — each a self-contained
  `index.html` that links `../../styles.css`. Copy a folder to seed a new design.

> **Substitution flagged:** Helvetica Neue → **Arimo** (Google Fonts, metric-compatible).
> Provide licensed Helvetica Neue / Neue Haas Grotesk binaries to finalise.
