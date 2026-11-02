<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Data Story

> Clean, honest charts that animate one insight at a time: bars grow, lines draw, the key point lights up in the accent and gets a plain-language label.

| Engine | Best for | Effort |
|---|---|---|
| hyperframes (SVG/HTML charts) | statistics, trends, comparisons, research summaries | medium |

## 1. Essence
- In one sentence: one chart, one takeaway, no tricks.
- Three adjectives: clear, credible, calm.
- Signature move: all bars grow in neutral grey, then one bar turns accent and its value and label appear beside it.

## 2. Use it for / avoid it for
- Use for: reports, "the numbers behind…", comparisons, before/after.
- Avoid for: numbers you cannot source. Never invent data or fake precision.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #0F1115 (or light #F6F7F9) | field |
| ink | #F1F3F5 | titles, values |
| neutral | #5B6270 | all non-highlighted data |
| axis | #2A2F38 | baseline and tick marks only |
| accent | #FFB020 | the one data point that matters |
| support | #4DA3FF | a second series if unavoidable |

Rules: grey first, accent for the insight. Colour-blind safe pairs only (accent vs neutral differs in lightness too).

## 4. Type
- Titles: Inter 800 72–90 px, phrased as the takeaway ("Mobile passed desktop in 2016"), not as the variable name.
- Values: Inter 800 with tabular figures; units smaller and muted.
- Axis labels: Inter 500 30 px, muted; source line JetBrains Mono 26 px at the bottom of the chart.

## 5. Surfaces and texture
- Flat field, faint grain; chart sits on the background (no card) or on one subtle card.
- Only a baseline and a few tick labels — no chart gridlines, no 3D, no drop shadows.
- Never: grid backgrounds, truncated y-axes on bar charts, dual axes without clear labels.

## 6. Framing and layout
- Title y 260–480; chart y 560–1350 (bars horizontal in 9:16 when labels are long); takeaway label near the highlighted point; source line y ≈ 1420.
- Max 7 bars or 3 lines per chart.

## 7. Motion
- Bars grow from the baseline 0.6 s (power3.out) with 0.06 s stagger; lines draw left to right 1.0–1.5 s.
- Highlight: accent colour fade 0.3 s, value counts up, label slides in 0.3 s.
- Transitions: morph the chart into the next (bars rearrange) instead of cutting when the data is related.
- Camera: none, or a slight zoom on the highlighted region.

## 8. Sound
- Bed: neutral, light electronic, −28 LUFS.
- Effects: soft rising tone while bars grow, a tick on the highlight.

## 9. Build recipe and checks
- Engine and templates: HyperFrames with SVG; `stat-counter` for single numbers; d3-scale (npm, ISC licence) for scales if needed.
- Steps: 1) collect data with sources; 2) write the takeaway sentence first; 3) choose the simplest chart that shows it; 4) animate grey → accent; 5) review + claim check.
- Style checks: axis starts at zero for bars; every number has a visible source; the takeaway reads without the voice.
- Common failures: too many series, decimals nobody needs, rainbow palettes.

## Credits
Original motionforge style.
