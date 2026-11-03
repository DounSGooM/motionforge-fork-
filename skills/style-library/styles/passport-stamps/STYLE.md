<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Passport Stamps

> Cream security-paper pages with fine wavy guilloche lines, rubber entry stamps thudding down in vermilion and green ink, and a dashed flight path arcing to the next page.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Travel & hospitality | hyperframes (+ three.js for the globe beat) | multi-country trips, travel recaps, visa and entry tips, "countries I visited" lists | medium |

## 1. Essence
- In one sentence: a trip told as a passport filling up, one stamp per place.
- Three adjectives: tactile, official, nostalgic.
- Signature move: the stamp landing — a rotated rubber stamp drops onto the page, the frame jolts 4 px, and the ink shows uneven coverage with a slightly doubled edge.

## 2. Use it for / avoid it for
- Use for: country-by-country recaps, round-the-world summaries, travel-agency itinerary teasers, entry-requirement explainers, "year in travel".
- Avoid for: single-city guides with many places (use `route-journey`), luxury hotel promos (too playful), real document instructions where a mock could mislead.
- Honesty: never reproduce a real passport, visa or national emblem, coat of arms or real stamp design; all pages and stamps are generic, invented shapes with place names only. Entry rules quoted on screen must come from an official source the user gives, with the date checked.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #EBE1C9 | passport page cream |
| ink | #1D2B45 | navy page text, flight path, labels |
| accent | #CF3F2A | the newest stamp, active route dot, date in focus |
| support | #4E7A63 | earlier stamps (visa green), secondary marks |
| guilloche | #C9BC9A | fine security lines and page numbers |
| cover | #22362F | passport cover for intro and outro (blind-embossed title) |

Rules: only the latest stamp is vermilion; older stamps shift to green or navy at 70 % opacity. Ink colours are multiplied onto the paper, never flat over it.

## 4. Type
- Display: Saira Stencil One (OFL) 400, 120–150 px, uppercase, tracking 0.04 em — country names inside stamps.
- Body / captions: Courier Prime (OFL) 700, 48–54 px, sentence case, like typed entries.
- Labels: IBM Plex Mono (OFL) 500, 26–30 px, uppercase, tracking 0.2 em ("ENTRY · 14 MAR 2026 · DAY 6").
- Language coverage: all three ship latin + latin-ext; fallback `"Courier New", monospace`. Place names keep native diacritics (İstanbul, Kraków, São Paulo).

## 5. Surfaces and texture
- Background: a double-page spread (two 1000×1700 pages with a 6 px centre gutter shadow) on a blurred real photo from the trip, or flat #22362F for cover beats.
- Materials: security paper with thin wavy guilloche lines (0.6 px, #C9BC9A at 50 %), a faint watermark motif (a compass rose), rubber-stamp ink, a stitched spine.
- Texture: paper fibres (static, 0.07), stamp ink with seeded coverage holes (10–20 % missing) and a 1–2 px doubled edge on one side.
- Never: grid backgrounds, purple gradients, real emblems or document numbers, machine-readable zones that look valid.

## 6. Framing and layout
- 9:16 zones: page spread fills y 160–1860 at 1.05 scale (rotated −2°); stamps land in a 3×2 arrangement of free positions, each 300–380 px; caption y 1480–1580 on a paper slip; label strip y 260.
- Other formats: 1:1 one page only; 16:9 the full open spread, flat, with the globe beat on the left.
- Density: up to 6 stamps per page; one new stamp per beat.

## 7. Motion
- Entrances: stamp falls from scale 1.6 and opacity 0 → 1 in 0.12 s (`power4.in`), lands with a 4 px page jolt (`elastic.out(1, 0.5)` over 0.25 s), ink reaches full density 0.1 s later.
- Exits: page turn — 3D rotateY around the spine, 0.6 s `power2.inOut`, with a 12 % shadow sweep.
- Holds and rhythm: one stamp every 1.5–2.5 s; a 2.5 s hold on a photo after each stamp.
- Transitions: page turns between countries; flight-path match cut from the last stamp to the next page's first stamp.
- Camera: slow 3 % push into the newest stamp; a 0.4 s rack to the photo.
- Frame rate feel: 30 fps; stamps land on exact beat frames.
- Edit grammar: average shot length 2–3 s; the stamp lands on the downbeat, the trip photo/footage cuts in on the next beat. Footage shots are 1.5–2 s each in sets of 3 per country (wide, detail, people), straight cuts; one speed ramp per video (100 % → 300 % → 100 %) on a transit clip (plane window, train). Country name lower-thirds appear as the stamp itself, not as a separate bar.

## 8. Sound
- Bed: acoustic travel pop or light world-percussion, 100–115 BPM, −24 LUFS under voice.
- Effects: a wooden thump with a short paper rattle for each stamp, a paper swish for page turns, distant jet hum under the flight path; vary the stamp sample (3 seeded variants).
- Mix: voice first; ducking 7 dB; final −14 LUFS integrated.

## 9. Build recipe and checks
- Engine and templates: HyperFrames; `templates/globe-arcs-3d` for the route overview, `kinetic-title`, `word-captions`, `cover-still` (passport cover as the thumbnail).
- Signature scenes:
  - stamp drop: stamp shape (circle, oval or rectangle, chosen by seed) with country name + date drops, jolts, and ink fills; older stamps fade to green.
  - flight hop: dashed navy arc (4 px, 14/10 px dashes) draws between two stamps in 0.9 s `power1.inOut`, a small plane glyph rides the arc tangent.
  - globe count: `globe-arcs-3d` spins 40° in 2 s, arcs draw from home to each country in order, country count ticks up in IBM Plex Mono.
  - cover open: dark green cover with a blind-embossed trip title rotates open 0.8 s to reveal page 1.
- Steps: 1) list countries, dates and photos from the user; 2) choose stamp shapes per country by seed; 3) build pages and stamps; 4) cut photos to the beat; 5) QA.
- Style checks: no stamp resembles a real government mark; dates match the user's list; the newest stamp is the only vermilion element.
- Common failures: stamps too clean (add coverage holes and the doubled edge), page text unreadable over guilloche (guilloche ≤ 50 % opacity, never behind captions), too many stamps per beat.

## Overrides
None (library copy).

## Credits
Original motionforge style, drawing on the general tradition of travel documents, rubber-stamp printing and security-paper engraving.
