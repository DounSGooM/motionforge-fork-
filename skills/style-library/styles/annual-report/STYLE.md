<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Annual Report

> A composed corporate layout on light stone: brand-colour blocks wipe across the frame, KPI tiles count up in tabular figures, and every number carries its period and source.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Business, B2B & local | hyperframes + three.js (columns and globe scenes) | year-in-review, investor and stakeholder updates, quarterly results, company milestones | medium |

## 1. Essence
- In one sentence: a year of work shown with the steadiness of a well-set annual report.
- Three adjectives: composed, credible, structured.
- Signature move: a full-width brand block sweeps across, leaves a KPI tile behind, and the figure counts up to the exact published value with its period label underneath.

## 2. Use it for / avoid it for
- Use for: annual and quarterly results, impact numbers, milestones, leadership messages, hiring and expansion summaries.
- Avoid for: casual social trends, consumer promos. Figures come from the published report with the period (FY2025, Q3) and an "unaudited" note where it applies; logos and brand colours from the company's brand kit; people on screen only with consent.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #F4F5F2 | light stone field |
| ink | #0E1A2B | navy text and figures |
| accent | #1550E8 | brand primary (map the real brand colour here): blocks, the key KPI, progress |
| support | #5C6B7A | slate: labels, secondary figures, axes |
| block | #DDE2E6 | neutral blocks and empty tracks |

Rules: one accent block per frame; when the brand kit gives a primary, it replaces #1550E8 and keeps the same job. Dark interlude variant: navy field #0E1A2B with stone text, max 2 per video.

## 4. Type
- Display: Public Sans (OFL) 800, 96–140 px, sentence case, tracking −0.03 em.
- Figures: Public Sans 700, tabular, 160–220 px for hero KPIs; units at 45 % size.
- Narrative quotes: Source Serif 4 (OFL) 500 italic, 56–64 px.
- Labels: Public Sans 600, 28 px, uppercase, tracking 0.12 em; source line 24 px slate.
- Language coverage: both have latin-ext on Fontsource; fallback system-ui / Georgia. Use the brand's font if it has a free licence.

## 5. Surfaces and texture
- Background: flat stone with static grain 0.02; no vignette.
- Materials: solid colour blocks, KPI tiles (radius 12 px, white, 1 px #D3D8DD border), real photography of the company's people and places.
- Layout grid: 6 columns, 60 px margins, 24 px gutters — used for placement only, never drawn.
- Never: drawn grid or graph-paper backdrops, stock handshake photos, 3D pie charts, purple gradients.

## 6. Framing and layout
- 9:16 zones: chapter label y 260–320; headline y 340–520; KPI tile or chart y 560–1180; caption y 1200–1480; source line y 1500.
- Other formats: 16:9 KPI tiles in a row of 3; 1:1 one KPI per frame with the headline above.
- Density: max 3 KPIs on screen; one chart per frame.

## 7. Motion
- Entrances: tiles rise 40 px + fade, 0.5 s power3.out, 0.1 s stagger; figures count 1.2 s power2.out.
- Exits: elements fade 0.3 s power1.in; nothing flies out.
- Holds and rhythm: one KPI per 3–4 s; hold final figures ≥ 2 s.
- Transitions: block wipe — a brand block crosses the frame 0.5 s power3.inOut and reveals the next layout.
- Camera: static layouts; 5 % slow push on photography.
- Frame rate feel: smooth 30 fps, measured.
- Edit grammar: corporate film grammar — average shot 3–4 s; cuts on sentence ends; block wipes between chapters. Interview soundbites from leadership or staff get a lower-third (name, role) 0.4 s after they start talking, held 4 s, out 0.3 s; J-cut from soundbite into the data that proves it. B-roll of real sites and teams at 100 % speed with slow pushes; no speed ramps.

## 8. Sound
- Bed: understated piano or ambient corporate, 80–100 BPM, −28 LUFS.
- Effects: soft swish on block wipes, tick on KPI arrivals at −24 dB re voice.
- Mix: voice first; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: hyperframes; `stat-counter` for KPIs, `kinetic-title`, `browser-window` for the published report page, `templates/bars-3d` for year-over-year columns, `templates/globe-arcs-3d` for offices or markets, `cover-still`.
- Signature scenes:
  - KPI tile: block wipe leaves a tile; figure counts to the exact value; period and source fade in 0.3 s after.
  - Year over year: `bars-3d` columns rise 0.8 s power3.out (previous year in block grey, this year in accent), delta label "+18 %" above.
  - Chapter divider: "01 Growth" — numeral 220 px, label slides in 0.4 s, accent block 120 px tall underneath.
  - Footprint: `globe-arcs-3d` turns to show offices or markets as pins; arcs only for real flows (shipments, new offices).
  - Leadership quote: portrait (real, approved) left, Source Serif quote right, attribution line.
- Steps: 1) get the published figures and brand kit; 2) one sentence per KPI; 3) build tiles and charts from data; 4) time to the voice; 5) claim check against the report.
- Style checks: every number has a period and source; brand colour matches the kit hex exactly; tiles align to the 6-column layout.
- Common failures: rounding that changes meaning (12.4 → "over 12"), too many KPIs per frame, logo stretched or recoloured.

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of corporate annual reports and modernist information design.
