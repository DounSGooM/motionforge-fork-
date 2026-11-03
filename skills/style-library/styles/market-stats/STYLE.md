<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Market Stats

> A crisp property research note on cool paper: price-per-m² columns rise, districts line up as sorted bars, and one raspberry district with a trend arrow carries the story.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Real estate & maps | hyperframes (SVG charts); hyperframes + three.js for one hero chart | housing market updates, rent vs buy, district comparisons, agency market reports | medium |

## 1. Essence
- In one sentence: a dated, sourced market finding that a buyer or seller can repeat at dinner.
- Three adjectives: precise, sober, local.
- Signature move: the district ladder: grey bars grow, re-sort by value, and the subject district turns raspberry with a ▲/▼ arrow and its year-on-year change.

## 2. Use it for / avoid it for
- Use for: quarterly updates, "what one budget buys in five districts", rent-to-price ratios, new-build vs resale, gross yields.
- Avoid for: a single listing (use `listing-tour-cards`), non-property data (use `data-story`), forecasts dressed as facts.
- Honesty: every figure comes from a named source (land registry, statistics office, a listing platform's published report, the agency's own sales) with period and sample on screen ("Source: …, Q3 2026, n = 412"); asking vs sold prices and median vs mean are labelled; year-on-year change uses the same source and method for both years; forecasts carry a "forecast" tag; nothing is invented or extrapolated silently.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #F2F3EF | cool report paper |
| ink | #14202B | titles, values, labels |
| neutral | #A3ADB5 | all non-highlighted bars and lines |
| axis | #C9CFD3 | baseline and tick marks only |
| accent | #C9184A | raspberry: the subject district, its arrow and value |
| support | #2E6F95 | steel blue: one second series (e.g. rent next to price) |

Rules: direction is shown by arrow shape and sign (▲ +4.1 %, ▼ −2.3 %), never by red/green; only the subject district is raspberry. Dark variant: background #141B22, ink #EEF1F3, neutral #56636E, same accent.

## 4. Type
- Display: Libre Franklin (OFL) 800, 80–96 px, sentence case, tracking −0.02 em, written as the finding ("Kadıköy rose fastest").
- Values: Libre Franklin 700, tabular figures, 64–120 px; units at 60 % size in neutral.
- Body / captions and axis labels: Libre Franklin 500, 28–30 px (axis), 48–54 px (captions).
- Labels: source and period in Red Hat Mono (OFL) 400, 24–26 px.
- Language coverage: both ship latin + latin-ext; fallback `Arial, sans-serif` and `ui-monospace`. Check currency glyphs (₺, ₹, ₴) with `tools/textcheck.mjs`; if missing, use the ISO code (TRY) or a fallback face for the symbol only.

## 5. Surfaces and texture
- Background: flat cool paper, grain 0.03, faint top-left light.
- Materials: a 2 px ink masthead rule above the title with a period stamp ("Q3 2026") on the right; bars with a 4 px radius on the value end only; an optional mini choropleth of districts from official or OSM boundaries (credited).
- Texture: none beyond grain; charts sit directly on the paper.
- Never: 3D pies, truncated bar axes, chart gridline backdrops, stock house photos behind charts, dual y-axes.

## 6. Framing and layout
- 9:16 zones: masthead rule y 250, title y 280–480; chart y 560–1340 (horizontal bars when there are more than 4 districts: labels x 80–360, bars x 380–900); takeaway callout beside the highlighted bar; source line y 1400–1440; captions y 1500–1640.
- Other formats: 1:1 chart y 300–860; 16:9 chart in the left 60 %, takeaway column right.
- Density: max 8 bars, 2 lines or 1 map per chart; one insight per chart.

## 7. Motion
- Entrances: bars grow from the baseline 0.7 s power3.out, 0.05 s stagger, all neutral; then re-sort by value (FLIP) 0.6 s power2.inOut; the subject turns raspberry in 0.3 s; its value counts 0.6 s; the arrow slides 20 px up or down 0.3 s back.out(1.5) and the % types on.
- Lines: draw 1.2 s power1.inOut with an endpoint dot; area between two series shades only where the story is.
- Exits: morph to the next chart (bars → columns) 0.6 s, or fade 0.25 s.
- Holds and rhythm: 2.5–3.5 s per insight.
- Transitions: morphs for related data; hard cut with the masthead kept for a new topic.
- Camera: none, or a 1.00→1.06 push towards the highlighted bar.
- Frame rate feel: smooth 30 fps.
- Edit grammar: chart-led, 3–4 s per insight; the value lands on the spoken number (±2 frames); optional presenter or district street footage of 1.5–2 s between charts, cut on the district name; L-cut the voice over chart transitions; the source line enters with the chart, never later.

## 8. Sound
- Bed: neutral minimal electronic or soft piano, −28 LUFS under the voice.
- Effects: a quiet tick as each value lands, a short paper slide on the re-sort.
- Mix: voice first; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: HyperFrames with SVG and d3-scale/d3-shape (npm, ISC); `hyperframes + three.js` with `templates/bars-3d` for at most one hero comparison per video; `stat-counter`, `cover-still`, `word-captions`.
- Signature scenes:
  - District ladder: grey bars grow, sort 0.6 s, subject turns raspberry, ▲ +4.1 % arrow and value (new scene).
  - Price-per-m² counter: one large tabular figure counts from last year's value to this year's in 1.2 s power2.out, delta chip below, source line under it (`stat-counter`).
  - Rent vs price: price index in ink and rent index in steel draw 1.2 s; the gap shades raspberry 15 % only where it widens; end labels (new scene).
  - Columns on a map: columns rise from district centroids on a pale tilted choropleth, 0.8 s with 0.08 s stagger, camera orbits 12° (`bars-3d`).
- Steps: 1) collect figures with source, period, sample; 2) write the finding sentence first; 3) choose the simplest chart for it; 4) animate neutral → raspberry; 5) claim check against the sources, then `qa-review`.
- Style checks: bar axes start at zero; every chart has a visible source and period; the title reads as the finding; the arrow direction matches the sign.
- Common failures: mixing asking and sold prices, percentages without a base year, too many districts, decimals nobody needs.

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of property research reports and financial-press charting.
