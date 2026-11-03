<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Paper Cutout

> Layers of coloured card cut with scissors, stacked with real drop shadows and nudged frame by frame like a tabletop stop-motion set.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Art direction & design looks | canvas or hyperframes (layered SVG/PNG) | friendly explainers, kids' education, nonprofit stories, seasonal posts | medium |

## 1. Essence
- In one sentence: a handmade diorama that tells the story one layer at a time.
- Three adjectives: tactile, warm, charming.
- Signature move: a new paper layer slides in from the edge, casts a soft shadow on the layer below and settles with a tiny wobble.

## 2. Use it for / avoid it for
- Use for: stories about people and places, processes for beginners, charity and community topics.
- Avoid for: precise technical data, real product UI.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| backing | #F1E9DA | background card |
| card-1 | #E86F4F | warm main shapes |
| card-2 | #2F7F79 | cool contrast shapes |
| card-3 | #F2C14E | highlights, suns, stars |
| ink | #2A2320 | small details, text |

Rules: 4–6 solid paper colours; no gradients inside a shape — depth comes from stacking and shadows.

## 4. Type
- Titles: letters cut as paper shapes, or Fraunces / Bricolage Grotesque (OFL) 700, 110 px, on a paper label.
- Captions: Nunito (OFL) 700, 50 px, on a cream paper strip.
- Language coverage: both families cover latin-ext.

## 5. Surfaces and texture
- Paper fibre texture on every shape (multiply, 8–12 %), slightly rough cut edges (seeded edge jitter, fixed per shape).
- Shadows: offset 6–14 px down-right, blur 10–18 px, 25–35 % black, larger for higher layers.
- Never: perfectly vector-clean edges, glossy highlights, grid backgrounds.

## 6. Framing and layout
- Stage depth: 3–5 layers (sky, far hills, middle, foreground, title strip).
- Main subject y 600–1300; title strip y 260–420; captions ≤ 1500.
- Parallax between layers when the camera moves.

## 7. Motion
- Stop-motion feel: animate on twos (12 positions/s), small seeded jitter (±1 px, ±0.4°) per held frame.
- Entrances: slide in from the frame edge 0.4–0.6 s with a slight overshoot, or flip up like a pop-up book (rotateX 90° → 0).
- Characters: jointed paper puppets with pivot points (pins); limbs rotate, never bend.
- Transitions: a big paper sheet slides across, or layers lift away one by one.

## 8. Sound
- Bed: acoustic, plucked or glockenspiel, −28 LUFS.
- Effects: paper rustle, scissor snip, soft card tap when layers land.

## 9. Build recipe and checks
- Engine and templates: canvas engine (`ease.steps` for twos, `rng(shape, frame >> 1)` for jitter) or HyperFrames with layered SVGs and CSS shadows.
- Steps: 1) design the layers per scene; 2) add fibre texture and edges; 3) rig puppets with pins; 4) time moves to the voice; 5) review.
- Style checks: shadow direction identical everywhere; jitter subtle and seeded; text strips sit on a clean paper colour.
- Common failures: too many layers (muddy), shadows too dark, jitter on text (keep text still).

## Credits
Original motionforge style in the general paper-craft tradition.
