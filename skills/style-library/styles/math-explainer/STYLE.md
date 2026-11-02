<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Math Explainer

> Clean geometry and equations on a dark slate: shapes transform into each other, terms of an equation move to where they belong, and colour ties each symbol to its picture.

| Engine | Best for | Effort |
|---|---|---|
| canvas (or hyperframes with SVG + KaTeX) | maths, physics, algorithms, ML concepts, any "why does this work" | high |

## 1. Essence
- In one sentence: seeing the idea before reading the formula.
- Three adjectives: elegant, precise, satisfying.
- Signature move: a coloured term in an equation glides out and becomes the matching coloured shape in the figure.

## 2. Use it for / avoid it for
- Use for: proofs, intuition for formulas, algorithm steps, physics, probability.
- Avoid for: lifestyle, brand promos.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| slate | #15171C | background (soft centre light, grain) |
| chalk | #ECEFF4 | default strokes and text |
| term-a | #58C4DD | first quantity |
| term-b | #F0B35A | second quantity |
| term-c | #8BD17C | third quantity / result |
| alert | #FC6255 | errors, counterexamples |

Rules: each mathematical object keeps its colour for the whole video; colour = meaning.

## 4. Type
- Equations: KaTeX (MIT) rendering with its bundled fonts (OFL), 64–90 px; or STIX Two Math (OFL).
- Prose labels: Inter 600 44 px, sparingly.
- Captions: Inter 700 50 px.

## 5. Surfaces and texture
- Dark flat slate with very fine grain; no frames or cards.
- Strokes 4–6 px with round caps; fills at 20–35 % opacity of the stroke colour.
- Axes only when needed: thin chalk lines with a few ticks — no graph-paper background (house rule).

## 6. Framing and layout
- Figure y 400–1200, equation y 1250–1450 (in 9:16) or the reverse when the equation leads.
- One equation on screen at a time; previous steps fade to 30 % or move up.

## 7. Motion
- Draw-on: strokes trace 0.6–1.2 s (inOutCubic), then fills fade in 0.3 s.
- Transform: shapes morph by interpolating matched points (resample paths to equal point counts) over 0.8–1.2 s.
- Equation steps: unchanged terms stay put; moving terms travel on arcs (0.6 s); new terms fade in after moves finish.
- Emphasis: a coloured box or underline grows around a term (0.3 s); brief 1.05 scale pulse.
- Rhythm: one transformation per spoken sentence; holds of 1–2 s after each result.

## 8. Sound
- Bed: soft piano or ambient, −30 LUFS.
- Effects: barely there — a soft tick when a term lands.

## 9. Build recipe and checks
- Engine and templates: canvas engine (`keys`, `spring` from `lib.js`; path resampling for morphs) with KaTeX-rendered SVG equations, or HyperFrames + GSAP for simpler equation moves.
- Steps: 1) write the derivation as 4–8 steps; 2) assign colours to quantities; 3) build each figure state; 4) morph between states on the voice; 5) readcheck.
- Style checks: a colour never changes meaning; every equation step is mathematically correct (check it); text never sits on top of strokes.
- Common failures: too many steps per screen, inconsistent colours between figure and equation, morphs between shapes with unmatched points (they twist).

## Credits
Original motionforge style in the general tradition of visual maths explanation.
