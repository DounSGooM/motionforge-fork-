<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Blueprint Schematic

> White technical line work on deep cyanotype blue: parts drawn stroke by stroke, dimension lines, callouts and exploded views — how a thing is built.

| Engine | Best for | Effort |
|---|---|---|
| hyperframes (SVG stroke drawing) or canvas | how-it-works, engineering, architecture, product anatomy | medium |

## 1. Essence
- In one sentence: the hidden structure of something, drawn as if by an engineer while you watch.
- Three adjectives: precise, calm, revealing.
- Signature move: an outline draws itself, then explodes into labelled parts along clean axes.

## 2. Use it for / avoid it for
- Use for: hardware, software architecture, building processes, "anatomy of…".
- Avoid for: emotional stories, lifestyle content.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| field | #10345C | cyanotype blue, softly lit from the centre (#1A4A7C) |
| line | #EAF2FF | primary strokes and text |
| faint | rgba(234,242,255,.35) | construction lines, hidden edges (dashed) |
| accent | #FFD24A | the part being discussed, highlights |

Rules: lines only — no filled shapes except the accent highlight at 25 % opacity.

## 4. Type
- Labels: IBM Plex Mono (OFL) 500, 34–40 px, uppercase, tracking 0.08 em.
- Titles: IBM Plex Sans Condensed (OFL) 700, 96 px, uppercase.
- Title block: a small bordered box in the lower right with project name, "SCALE", "REV" — as decoration.
- Language coverage: IBM Plex covers latin-ext, Cyrillic, and has JP/KR companions.

## 5. Surfaces and texture
- Paper: slight fibre texture and uneven blue (large, soft noise), static grain.
- Lines: 3 px main, 1.5 px secondary, dashed hidden lines, small tick-ended dimension lines with values.
- Never: a drawn background grid (the classic blueprint grid is off by house rule) — use registration marks in the corners instead.

## 6. Framing and layout
- Object centred y 500–1300; callouts on alternating sides with leader lines; title at the top, title block bottom-right inside the safe band.
- Exploded views spread along one axis (vertical in 9:16).

## 7. Motion
- Stroke drawing: `stroke-dashoffset` from full length to 0 over 0.6–1.2 s, power1.inOut; draw order follows how you would build it.
- Explode: parts move apart along their axis 0.6 s, power3.inOut; leader lines draw after parts settle; labels type in.
- Camera: slow zoom to the active part (5–10 %), accent highlight fades in 0.3 s.
- Transitions: the drawing erases backward (reverse stroke) or a horizontal scan line wipes.

## 8. Sound
- Bed: minimal ambient / soft piano pulse, −28 LUFS.
- Effects: pencil/pen scratch during long strokes (very quiet), soft click when parts lock.

## 9. Build recipe and checks
- Engine and templates: HyperFrames with inline SVG; GSAP tweens on `strokeDashoffset`; labels as HTML for crisp text; `kinetic-title` restyled for titles.
- Steps: 1) find or trace a reference (only one you may use); 2) simplify to < 40 paths; 3) order the draw; 4) explode + label on the voice; 5) review.
- Style checks: one stroke weight hierarchy; labels never cross lines; accent marks only the active part.
- Common failures: too many paths drawing at once (visual noise), labels too small (≥ 34 px), adding a grid "for authenticity".

## Credits
Original motionforge style in the general technical-drawing tradition.
