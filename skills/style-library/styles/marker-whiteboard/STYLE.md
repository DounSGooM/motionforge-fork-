<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Marker Whiteboard

> Hand-drawn marker sketches appearing on a clean board: simple icons, arrows and boxed words that build an idea step by step, as if a teacher is drawing it live.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Education & explainers | hyperframes (SVG stroke draw) or canvas | concepts, frameworks, processes, education | medium |

## 1. Essence
- In one sentence: the idea is being thought through in front of you.
- Three adjectives: friendly, clear, patient.
- Signature move: a marker line draws an arrow from one boxed word to the next, then a quick circle around the answer.

## 2. Use it for / avoid it for
- Use for: frameworks, mental models, comparisons, learning content.
- Avoid for: product launches, fashion, anything that needs photographic realism.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| board | #FAFAF7 | background (soft centre light, faint smudges) |
| marker | #1F2328 | main lines and words |
| accent | #E5484D | circles, underlines, the answer |
| support | #2F6FEB | secondary marker for contrast or "before/after" |

Rules: two marker colours plus black at most; fills are hatched or left empty.

## 4. Type
- Hand fonts: Caveat or Kalam (OFL) 70–110 px for words on the board; Patrick Hand (OFL) for longer notes.
- Captions: Inter 700 50 px in a clean pill — keep hand fonts for the board only.
- Language coverage: Kalam covers Devanagari; check latin-ext for Caveat (it has it).

## 5. Surfaces and texture
- Board: off-white, faint ghosting of erased marks (seeded), light vignette.
- Lines: 6–8 px round caps with slight wobble (seeded jitter of control points, fixed per drawing).
- Never: grid or ruled lines on the board, perfect geometric shapes (draw them a bit loose).

## 6. Framing and layout
- Build the diagram top-to-bottom in 9:16 (y 300–1450); each step one row.
- When the board fills, pan down (camera) instead of shrinking.

## 7. Motion
- Stroke drawing: 0.4–0.9 s per stroke depending on length (≈ 900 px/s), ease power1.inOut; words write left to right.
- Order: box → word → arrow → next box, synced to the voice's phrases.
- Emphasis: circle or double underline in the accent (0.35 s) on the stressed word.
- Camera: pans down 0.6 s (power2.inOut) between sections; slight zoom on the conclusion.
- Optional hand: an original drawn hand/marker silhouette following the stroke tip.

## 8. Sound
- Bed: light acoustic / ukulele / soft piano, −28 LUFS.
- Effects: marker squeak on strokes (quiet, seeded variants), pop on circles.

## 9. Build recipe and checks
- Engine and templates: HyperFrames with SVG paths and `strokeDashoffset` tweens; `checklist-reveal` restyled for lists.
- Steps: 1) sketch the final board; 2) split into strokes in drawing order; 3) time strokes to phrases; 4) add emphasis; 5) readcheck.
- Style checks: hand-written words readable at 360 px; no more than ~12 elements on screen; accent only on the key idea.
- Common failures: drawing too slowly (bored viewers) — a stroke should never take longer than its phrase; perfectly straight lines that look robotic.

## Credits
Original motionforge style.
