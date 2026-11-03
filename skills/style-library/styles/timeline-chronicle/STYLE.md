<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Timeline Chronicle

> A museum wall painted deep green: one horizontal line runs through the frame, big serif years roll past like an odometer, and mounted photo cards hang from the line on thin wires.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Documentary & storytelling | hyperframes | company and product histories, biographies, "how X changed", anniversaries | medium |

## 1. Essence
- In one sentence: time as a walk along an exhibition wall, one dated exhibit at a stop.
- Three adjectives: orderly, warm, informative.
- Signature move: the camera dollies right, the next year rolls into place digit by digit, and a mounted photo drops onto its wire and settles.

## 2. Use it for / avoid it for
- Use for: milestones, version histories, careers, "a decade in a minute", origin-to-today stories.
- Avoid for: arguments that are not chronological, stories whose dates are uncertain, data-heavy comparisons (use `data-story`).
- Honesty: every date sourced; approximate dates shown as "c. 1920" or "1920s"; photos owned by the user or licensed and credited on the label plate; product shots and logos of real brands only from the user or the brand kit.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #17302F | gallery-green wall, spotlight pool #234542 behind the current card |
| ink | #F3EEE3 | years, titles |
| accent | #FF8C61 | coral: the current year marker and the progress fill on the line |
| mount | #FBF8F1 | photo mounts and label plates |
| support | #8FA6A1 | past markers, future ticks, muted captions |

Rules: only the current marker is coral; past markers turn support; the line ahead of "now" is support at 50 %. Photos keep their own colour inside white mounts.

## 4. Type
- Years: DM Serif Display (OFL) 400, 220–280 px, lining figures, tracking −0.02 em.
- Titles: Work Sans (OFL) 700, 64 px, sentence case.
- Label plates: Work Sans 400, 34 px in ink-dark #1E2523 on mount; credit line Work Sans 500, 24 px, uppercase, tracked 0.12 em.
- Fallback: Gelasio for years, Hanken Grotesk for text. Load latin + latin-ext; Work Sans adds Vietnamese.

## 5. Surfaces and texture
- Background: matte painted wall, static grain 0.05, a 600 px radial spotlight that follows the current card, vignette 25 %.
- Materials: photo cards with a 24 px white mount and a 1 px bevel line, cast shadow (y 18 px, blur 30 px, 35 %); 1.5 px hanging wires; small label plates 300×120 px under each card.
- Line: 6 px at y 1120; year ticks 20 px tall, decade ticks 48 px.
- Never: grid backgrounds, chrome or glass effects, stock "timeline infographic" icons.

## 6. Framing and layout
- 9:16 zones: year x 80, y 300–560; current card 640×640 (or 640×800 portrait) hanging centred at y 600–1080; line y 1120; label plate y 1180–1300; captions y 1450–1600; neighbours cropped at x −380 and x 1180 to show continuity.
- Other formats: 1:1 line at y 700 with cards above; 16:9 line at y 760 with three cards visible.
- Density: one full card; neighbours cut by the frame edges.

## 7. Motion
- Entrances: cards drop 120 px on their wire and swing 4° → −2° → 0 over 0.9 s elastic.out(1, 0.5); label plates fade 0.3 s; year digits roll like an odometer, 0.6 s power2.out, each changed column 0.05 s after the last.
- Exits: cards stay on the wall; past cards dim to 70 %.
- Holds and rhythm: 3–4 s per event, 6 s for anchor events.
- Transitions: the dolly itself — the whole track slides on x in 1.0–1.4 s power3.inOut; spacing is proportional to time, and gaps over 10 years get a break mark (two slanted ticks) and compress.
- Camera: horizontal only, plus a 1.5 % push during holds.
- Frame rate feel: smooth 30 fps.
- Edit grammar: one event per narration sentence; the dolly starts 0.3 s before the sentence so the year lands on its first word; anchor events break out to full-frame footage or photo (2 % push, 3–5 s) and return by zooming back onto their card (0.6 s); the final shot pulls back to 45 % scale over 1.5 s to show the whole line.

## 8. Sound
- Bed: light strings or marimba, 90–100 BPM, −28 LUFS.
- Effects: a soft wooden tick per rolling digit, a low pluck on anchor events, a faint wire creak on card settles — 0.1–0.15 of voice.
- Mix: voice first; −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: hyperframes; `templates/stat-counter` (odometer variant) for years, `kinetic-title`, `word-captions`, `cover-still`.
- Signature scenes:
  - Year dolly: track slides, coral fill grows along the line, year rolls, card drops — one beat.
  - Era band: a band (support at 25 %) draws under the line in 0.8 s, labelling a span such as "The garage years 1976–1980".
  - Then and now: two cards of the same object years apart slide together to 50 % overlap; a vertical wipe compares them.
  - Anchor break-out: card scales to fill the frame (0.6 s power3.inOut) and cuts to its footage.
  - Recap pull-back: track scales to fit all events; markers flash coral in order with 0.12 s stagger.
- Steps: 1) dated, sourced event list; 2) choose pixels per year and mark compressed gaps; 3) lay out cards and plates; 4) dolly keyframes from words.json; 5) `qa-review`.
- Style checks: spacing proportional or marked as compressed; every year readable at 360 px; label plates ≤ 12 words; photo credits present.
- Common failures: uneven spacing without a break mark (misleading); cards covering the year; too many events (cap at 12 per minute).

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of museum exhibition walls and documentary timelines.
