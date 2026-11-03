<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# True Crime Board

> A dim corkboard under one desk lamp: case photos pinned at slight angles, red string pulled between them, typewritten dates, and black redaction bars that lift one line at a time.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Documentary & storytelling | hyperframes | case recaps, fraud and scam stories, historical mysteries, court-case explainers | medium |

## 1. Essence
- In one sentence: the viewer stands at the investigator's wall and watches each connection being made.
- Three adjectives: tense, methodical, tactile.
- Signature move: a red string pulls taut from one pinned photo to the next, and the camera travels along it.

## 2. Use it for / avoid it for
- Use for: documented criminal cases, frauds, cold cases with public records, investigative-journalism recaps, "how they were caught".
- Avoid for: light or comic topics, trials still running where the layout would imply guilt, stories whose only source is a rumour thread.
- Honesty: names, dates and quotes come from court records, official statements or named reporting; use "suspect", "charged", "convicted" exactly as the record does. Victims' names and photos only with a public-record basis and care for families; otherwise a silhouette card. Every document on screen is either real (source in the claim list) or labelled "illustration". Mugshots, scene photos and news footage only if the user has rights to them.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #1F1915 | dark cork field; warm lamp pool #3A3128 from top-left |
| paper | #E8DFC8 | manila folders, index cards, photo borders, light text on the board |
| ink | #191714 | typewritten text on paper |
| accent | #C1121F | red string, circled names, one stamp per scene |
| support | #8C7F6A | pin heads, muted labels, faded notes |

Rules: red covers under 4 % of the frame and only on string, circles and stamps. Photos keep their colours, desaturated 40 % and warmed. Redaction bars are pure #0A0A0A and only ever hide text. Light text on the board is paper, never pure white.

## 4. Type
- Display: Anton (OFL) 400, 120–160 px, uppercase, tracking 0.01 em — case titles and chapter words.
- Typewriter: Special Elite (Apache-2.0) 44–56 px for dates, file numbers and card notes; keep its rough edges.
- Captions: Archivo Narrow (OFL) 700, 52 px, sentence case, on a paper strip.
- Fallback: Courier Prime (OFL) for the typewriter role, Oswald for display. All ship latin + latin-ext on Fontsource.

## 5. Surfaces and texture
- Background: cork from a user photo or seeded two-scale noise, darkened, one warm lamp gradient top-left, vignette 35 %.
- Materials: matte cards rotated ±1–2°, pushpins with a 6 px contact shadow, paper clips, tape on photo corners, folders with a tab.
- Texture: static grain 0.07; paper fibre on cards at 0.12; typewriter glyphs vary in ink density 0.85–1.0 (seeded per glyph).
- String: 4 px with a 1 px darker core, sagging 3 % of its span (quadratic curve).
- Never: ruled or squared paper as a backdrop, blood splatter, invented police badges or agency logos, gore.

## 6. Framing and layout
- 9:16 zones: case title y 260–460; board area y 480–1450 with 3–5 pinned items; caption strip y 1480–1600; key text stays left of x 960 (button rail).
- Sizes: photos 300–420 px wide, index cards 360×220 px, one full-frame document at a time.
- Other formats: 1:1 board area 900×700 under the title; 16:9 board on the left two thirds, document close-up on the right third.
- Density: 3–5 items visible, one in focus; the rest blurred 3 px and darkened 30 %.

## 7. Motion
- Entrances: an item is pinned — scale 1.08 → 1.0 in 0.25 s power4.out, the pin pushes in 0.08 s later with a 2 px settle.
- Exits: items stay on the board; the camera leaves them. Chapter ends dim the lamp to 20 % over 0.6 s.
- Holds and rhythm: one new item or connection every 2.5–4 s; never two strings moving at once.
- Transitions: hard cut to black for 8–12 frames between chapters, typewriter date on black, cut back.
- Camera: drift 1.5–2.5 % of frame per second; parallax pins/string 1.0, cards 0.95, cork 0.9; rack focus by swapping blur between layers over 0.4 s.
- Frame rate feel: smooth 30 fps; typewriter text advances one glyph every 2 frames.
- Edit grammar: shots 3–5 s; cuts land on the noun that names the evidence ("the receipt", "the call log"); archive footage enters as a pinned photo that pushes to full frame in 0.5 s, then hard-cuts to the clip; L-cuts carry the narrator 0.5–1 s into the next card; no speed ramps or whips — the tension comes from holding.

## 8. Sound
- Bed: low drone or sparse piano pulses, 60–80 BPM, −30 to −27 LUFS under the voice; drop to silence one beat before a reveal.
- Effects: pushpin click, string creak on the pull, typewriter keys (6 seeded samples), stamp thud — each at 0.12–0.18 of voice level.
- Mix: voice first, duck the bed 6 dB under speech; −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: hyperframes; `templates/kinetic-title` (Anton) for case titles, `word-captions` on a paper strip, `cover-still` for the cover; the scenes below are new.
- Signature scenes:
  - String pull: the free end leaves pin A and follows a sag curve to pin B in 0.7 s power2.inOut, overshoots 6 px and tightens; the camera pans with the same easing.
  - Redaction lift: a full-frame document; black bars wipe off left to right 0.35 s each, 0.15 s stagger, revealing only the line the narrator reads.
  - Typewriter date: black frame, date and place type at 14 chars/s with a carriage advance, hold 1.2 s, cut.
  - Case file open: folder cover opens 0 → 170° in 0.5 s back.out(1.4), the top photo slides out 220 px.
  - Circle the name: a hand-drawn red ellipse (1.15 loops) draws around one name in 0.45 s via stroke-dashoffset.
- Steps: 1) claim list with a source for every name, date and quote; 2) board as SVG with fixed pin coordinates; 3) camera keyframes per voice line from words.json; 4) render, captions, mix; 5) `qa-review` plus a read-through of legal wording.
- Style checks: red only on string, circles, stamps; every date readable at 360 px wide; no unlabelled illustrative document.
- Common failures: string spaghetti (cap at 4 visible strings); ghoulish imagery (remove); wording drifting beyond the record ("killer" for a suspect) — fix to the record.

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of investigative documentaries and detective-fiction evidence walls.
