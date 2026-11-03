<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Ink Crosshatch

> Pen-and-ink illustration on warm paper: shading built from hatched and cross-hatched lines, a single wash of colour, lines that draw themselves like an engraver at work.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Art direction & design looks | canvas | essays, literature, history, science stories, long-form opinion | high |

## 1. Essence
- In one sentence: a thoughtful illustrated essay coming to life on the page.
- Three adjectives: literary, detailed, serious.
- Signature move: a drawing's shadows fill in hatch layer by hatch layer, darkest last, as the narrator reaches the point.

## 2. Use it for / avoid it for
- Use for: essays, biographies, science history, philosophy, book summaries.
- Avoid for: upbeat promos, fast-paced trend content.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| paper | #F3ECDD | background with fibre texture |
| ink | #1C1A17 | all line work and text |
| wash | #B5482F | one watercolour wash for the subject |
| faded | rgba(28,26,23,.35) | construction lines, distant details |

Rules: ink only, plus one wash colour per scene; tone comes from line density, not grey fills.

## 4. Type
- Titles: EB Garamond or Libre Baskerville (OFL) 600, 96 px, small caps for kickers.
- Captions: EB Garamond 500, 50 px, or Inter 600 for maximum legibility.
- Language coverage: EB Garamond covers latin-ext, Greek and Cyrillic.

## 5. Surfaces and texture
- Paper with fibres and a slight warm vignette; ink lines with tapered ends and tiny pressure variation.
- Hatching: tone 1 = parallel lines at 45°, tone 2 = + 135°, tone 3 = + horizontal, tone 4 = + stippling. Spacing 6–10 px.
- Never: smooth gradients, drop shadows, grid backgrounds.

## 6. Framing and layout
- Vignette composition: the drawing fades out to paper at its edges (no hard frame).
- Subject y 450–1300; title at the top; captions on paper, ≤ 1500.

## 7. Motion
- Line drawing in stroke order: outlines first (0.8–1.5 s), then hatch layers (0.3–0.5 s each).
- Camera: very slow pans and push-ins across a large drawing (2–4 % per 5 s).
- Transitions: ink bleeds across the frame and clears to the next page, or a page turn.
- Line boil off: lines stay perfectly still once drawn (calm, printed feel).

## 8. Sound
- Bed: solo piano, cello or ambient strings, −28 LUFS.
- Effects: nib scratching during drawing (very quiet), page turns.

## 9. Build recipe and checks
- Engine and templates: canvas engine; hatch generator that clips line families to tone regions (from a greyscale value map); `rng` seeds per region so lines never shuffle between renders.
- Steps: 1) sketch the scene as a value map (4 tones); 2) generate outlines + hatches; 3) order the draw on the voice; 4) add the wash; 5) review.
- Style checks: hatching reads as tone at 360 px (not as noise); one wash colour; lines identical across re-renders.
- Common failures: hatch spacing too fine (moiré after compression — keep ≥ 6 px), drawing too slowly for the voice.

## Credits
Original motionforge style in the general pen-and-ink illustration tradition.
