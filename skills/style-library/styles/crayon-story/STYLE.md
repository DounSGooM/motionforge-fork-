<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Crayon Story

> A child's drawing come to life: waxy crayon strokes that skip over the paper's tooth, wobbly outlines that shimmer on twos, bright red, blue and yellow, and big hand-drawn words to read along.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Kids & animation | canvas | picture-book stories, early learning, counting and letters, family channels | medium |

## 1. Essence
- In one sentence: a story that looks as if a six-year-old drew it and a patient adult read it aloud.
- Three adjectives: bright, wobbly, warm.
- Signature move: the scribble wipe — a red crayon zig-zags across the page in half a second and the next scene is underneath.

## 2. Use it for / avoid it for
- Use for: bedtime stories, counting, colours and letters, kindness and safety lessons, kids' book promos.
- Avoid for: adult topics that would read as childish, dense information, anything with real people or products.
- Honesty and care: no licensed or well-known characters; for "made for kids" uploads, no calls to comment, follow or buy, no links, no collection of children's data.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #FBF8F1 | drawing paper |
| ink | #262421 | black crayon outlines and text |
| accent | #E63B2E | red crayon: the hero, the read-along underline, the scribble wipe |
| support | #2F5FD0 | blue crayon: sky, water, second character |
| support-2 | #FFC93C | yellow crayon: sun, stars, highlights |

Rules: extra crayon colours (green #3FA34D, orange #F28C28) are allowed only inside illustration fills, never on text. The read-along word is always red.

## 4. Type
- Display: Baloo 2 (OFL) 800, 110–140 px, sentence case, tracking 0, filled with a crayon texture mask.
- Body / read-along: Patrick Hand (OFL) 400, 54–60 px, 3–6 words per line, max 2 lines.
- Labels: Patrick Hand 400, 40 px (numbers, names on drawings).
- Language coverage: both ship latin-ext on Fontsource; Baloo 2 also covers Devanagari for Hindi editions.

## 5. Surfaces and texture
- Background: paper with a static tooth texture (seeded noise, 5 % multiply); no lines.
- Strokes: seeded stamp brushes 10–18 px wide; wax skips where the tooth noise exceeds 0.35; fills are zig-zag hatches at 30°, 12 px spacing, overshooting outlines by 6–10 px.
- Boil: each drawing redrawn with one of 3 seeds every 2 frames, cycling — deterministic.
- Never: grid or exercise-book paper, purple gradients, vector-perfect lines, clip-art.

## 6. Framing and layout
- 9:16 zones: illustration y 300–1250; read-along text y 1300–1600 centred; page number y 1640 bottom-left.
- Other formats: 1:1 illustration y 80–760, text below; 16:9 illustration left two-thirds, text right.
- Density: one scene, 1–3 characters, one line of text being read.

## 7. Motion
- Entrances: draw-on — outlines appear along their path at 900 px/s, then hatch fills in 0.4 s; letters appear one by one, 0.06 s each.
- Character motion: pose-to-pose on twos (12 drawings/s), holds of 0.5 s on key poses, squash 1.15 / 0.85 on landings.
- Exits: scribble wipe or erase (paper rubs over with a soft 0.5 s mask).
- Holds and rhythm: one page every 3–5 s, matched to one or two read sentences.
- Transitions: scribble wipe 0.5 s or a page slide 0.6 s power2.inOut.
- Camera: none, or a 1.0 → 1.1 push on a story beat, stepped on twos.
- Frame rate feel: drawings on twos (12 fps) inside a 24 fps render.
- Edit grammar: picture-book pacing — average shot 3–5 s; cuts on the end of the narrator's sentence; repeated structures every page (same layout, new detail); the current word is underlined in red as it is read; no fast cuts under 1.5 s.

## 8. Sound
- Bed: ukulele, glockenspiel or toy piano, 100–110 BPM, −24 LUFS under voice.
- Effects: crayon scratch on draw-ons at −30 LUFS, soft boing on landings, page swish on wipes.
- Mix: narrator warm and slow (about 130 wpm); final −14 LUFS integrated, true peak ≤ −1 dBTP; no sudden loud sounds.

## 9. Build recipe and checks
- Engine and templates: canvas for strokes and boil; `templates/word-captions` restyled as a read-along line; `templates/cover-still` for the book cover; scenes below are new scenes.
- Signature scenes:
  - scribble wipe: red zig-zag of 9 passes covers the frame in 0.5 s, reveals the next page under it.
  - draw-on character: outline 0.8 s, hatch fill 0.4 s, first blink 0.3 s later.
  - read-along line: Patrick Hand line with a red underline sliding word to word on word timings.
  - count with me: objects drawn one by one, a big Baloo number (1…5) pops with back.out(2) next to each, 1 s apart.
  - sun and sky open: yellow sun draws in a spiral, blue sky hatches across, title fills with crayon texture.
- Steps: 1) write the story in short sentences; 2) sketch page layouts; 3) build strokes with fixed seeds; 4) time pages to the narration; 5) mix, QA.
- Style checks: boil cycles 3 seeds exactly (no new noise per frame); read-along text ≥ 54 px; no licensed characters.
- Common failures: hatches too dense (raise spacing to 12 px); boil too strong (keep jitter ≤ 3 px).

## Overrides
None in the library copy.

## Credits
Original motionforge style, drawing on the general tradition of children's crayon drawings and read-aloud picture books.
