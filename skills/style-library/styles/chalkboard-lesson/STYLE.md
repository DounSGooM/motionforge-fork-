<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Chalkboard Lesson

> A worn green classroom board in a wooden frame: chalk handwriting writes itself with a little dust, yellow chalk underlines the answer, and a felt eraser wipes the board between ideas.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Education & explainers | canvas | school lessons, grammar rules, worked examples, mnemonics, teacher accounts | medium |

## 1. Essence
- In one sentence: the teacher at the board, writing the key word as they say it.
- Three adjectives: patient, tactile, familiar.
- Signature move: the eraser wipe — a felt eraser sweeps in arcs and leaves a cloudy smear that slowly settles.

## 2. Use it for / avoid it for
- Use for: classroom topics, step-by-step solutions, spelling and grammar rules, history dates, back-to-school series.
- Avoid for: brand promos, glossy tech, anything needing photo realism; long derivations full of symbols (use `math-explainer`).
- Honesty: worked examples checked before recording; when a real classroom is filmed, students appear only with consent (guardian consent for minors) and faces are avoided by default.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #2E4A3B | worn green board, lighter smudges #3A5747 |
| ink | #EEEDE3 | white chalk: all writing |
| accent | #F6DB6F | yellow chalk: underlines, circles, the answer |
| support | #F3A6A0 | pink chalk: corrections, a second idea |
| frame | #7A5534 | wooden frame and chalk tray |

Rules: colour means something — yellow is the answer, pink is the mistake or the alternative. Never more than two coloured chalks on one board.

## 4. Type
- Board writing: Architects Daughter (OFL) 64–110 px, revealed stroke by stroke and textured as chalk.
- Board headings: Architects Daughter 130 px with a hand-drawn underline.
- Captions (on the tray strip): Andika (OFL) 600, 50 px — letterforms made for early readers.
- Labels: Andika 700, 30 px, uppercase, tracking 0.08 em.
- Fallback and coverage: Indie Flower (OFL) for the board; both board faces are latin + latin-ext only, so for Cyrillic or Vietnamese boards write in Andika with the chalk texture applied.

## 5. Surfaces and texture
- Board: two-scale seeded noise in green, a ghost layer of erased words at 4–6 % opacity, a faint vertical sheen.
- Chalk: strokes 5–8 px with dry broken edges (noise alpha mask, 75–90 % coverage); seeded dust specks fall 20–60 px from stroke ends and fade over 0.8 s.
- Frame: 40 px wood border, top edge at y 180–220 and a chalk tray at y 1700–1740 holding chalk sticks and the eraser — both outside the safe band.
- Never: ruled lines or squares on the board (house rule), clean vector strokes without texture, chalk fonts used as flat type.

## 6. Framing and layout
- 9:16 zones: board x 60–1020, y 220–1700; writing rows of 140–180 px between y 280 and 1440, left edge x 100, right limit x 940; captions on the tray strip y 1500–1640 only when the voice says more than the board.
- Other formats: 1:1 board fills with the frame on all sides; 16:9 board full width, room on the right for a teacher composite.
- Density: up to six rows; erase before a seventh.

## 7. Motion
- Entrances: live writing at 10–14 chars/s (0.07–0.1 s per letter, hand-ordered masks, 1 px seeded jitter); underlines 0.3 s left to right rising 1–2°; circles 0.45 s with ends overlapping 10 %.
- Exits: only by erasing — the eraser follows 3–4 arcs in 1.0–1.4 s, the mask leaves 6 % ghost, the dust cloud fades 0.6 s.
- Holds and rhythm: a full board holds 2–3 s after its last line; each board lasts 8–15 s.
- Transitions: eraser wipe between ideas; a hard cut to a close-up (board scaled 1.8×) for detail.
- Camera: static wide; push to 1.8× on one line in 0.6 s power2.inOut, pull back after.
- Frame rate feel: writing on ones at 30 fps, dust on twos.
- Edit grammar: lesson pacing — the stroke of the key word starts on the word's onset in the voice; longer lines are pre-written and fade in 0.4 s so only key words are written live; close-ups only for lines over 20 characters; if a teacher is filmed, cut back to the wide at sentence ends; no speed ramps or whips.

## 8. Sound
- Bed: none, or soft piano at −32 LUFS.
- Effects: chalk taps and scratches from 8 seeded samples at 0.15 of voice, eraser swish, quiet classroom room tone.
- Mix: voice first; −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: canvas (stroke masks, noise textures, seeded dust); `checklist-reveal` with chalk ticks for step lists; `word-captions` on the tray strip; `cover-still` from a finished board.
- Signature scenes:
  - Live write: the key word writes on its spoken onset, dust falls, a yellow underline follows 0.2 s later.
  - Eraser wipe: three arcs, ghost residue, dust settles, next heading writes.
  - Circle the answer: a loose yellow ellipse in 0.45 s, then a short tick beside it.
  - Correction: a wrong step crossed with two pink strokes (0.3 s), the right one written smaller above it.
  - Mnemonic stack: initials write vertically in yellow, then each word extends to the right in white, 0.4 s stagger.
- Steps: 1) board plan — one board per idea, rows fixed; 2) letter stroke order for the live words; 3) render boards in canvas; 4) captions, chalk sounds, mix; 5) `qa-review`.
- Style checks: each board fits the six-row limit; chalk texture visible at phone size; yellow only on answers; no text over the frame.
- Common failures: strokes too clean (raise edge breakup); dust covering letters (cap at 12 specks per word); writing everything live and running slow (pre-write the rest).

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of classroom chalkboard teaching.
