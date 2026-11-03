<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Riso Print

> Two or three spot inks on uncoated paper: fluorescent pink and blue overprinting into purple, grainy halftones, slightly misregistered layers.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Art direction & design looks | canvas (or hyperframes with blend modes) | editorial, culture, indie brands, zines, event promos, opinion pieces | medium |

## 1. Essence
- In one sentence: a hand-made print that moves.
- Three adjectives: tactile, bold, imperfect.
- Signature move: two ink layers drift a few pixels apart and snap back into register on the beat.

## 2. Use it for / avoid it for
- Use for: book and music promos, culture commentary, quotes, editorial explainers.
- Avoid for: precise product UI and data tables (misregistration hurts legibility).

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| paper | #F4EFE6 | uncoated paper |
| ink-1 | #FF48B0 | fluorescent pink layer |
| ink-2 | #0078BF | blue layer |
| overprint | multiply of ink-1 × ink-2 | where layers overlap |
| ink-3 (optional) | #FFE800 | yellow third drum |

Rules: only the inks and their overprints; tints are halftone dots, not opacity. Overprint purple appears only where inks overlap on paper — never as a background gradient.

## 4. Type
- Display: Space Grotesk or Archivo Black (OFL), 120–160 px, printed in one ink.
- Body: IBM Plex Mono (OFL) 500, 40 px.
- Language coverage: both families cover latin-ext.

## 5. Surfaces and texture
- Paper: warm off-white with fibres and a faint second-side show-through.
- Halftone: dots at 45° (ink-1) and 75° (ink-2), 6–10 px cells for photos and tints.
- Grain: ink coverage noise, slight streaks in large solids.
- Misregistration: each ink layer offset 2–6 px, seeded per section.
- Never: smooth gradients, glossy highlights, grid backgrounds.

## 6. Framing and layout
- Poster composition: one huge word or image per screen, generous paper margins (80 px).
- Shapes cut as flat stencils; layered collage of halftoned photos and type.

## 7. Motion
- Stepped motion (12 fps feel) for a printed look; layer offsets jitter every 2 frames (seeded).
- Reveals: ink "prints" in via a horizontal roller wipe (0.4 s) per layer, ink-2 0.1 s after ink-1.
- Type: letters stamp in one at a time with a 2-frame overshoot.
- Transitions: paper slide (the next sheet slides over) or a roller wipe.

## 8. Sound
- Bed: lo-fi / indie instrumental, −26 LUFS.
- Effects: printer roller whirr, paper slide, stamp thud.

## 9. Build recipe and checks
- Engine and templates: canvas engine; draw each ink layer to its own offscreen canvas in greyscale, colourise, composite with `multiply` on paper.
- Steps: 1) pick 2–3 inks; 2) separate artwork into layers; 3) halftone photos per layer; 4) animate layer offsets and reveals; 5) review.
- Style checks: no colour outside the ink set and overprints; text is printed in a single ink (never split across layers); halftone readable at phone size.
- Common failures: offsets so big that text doubles (keep ≤ 3 px on text), using opacity instead of halftone.

## Credits
Original motionforge style drawing on general risograph printing technique.
