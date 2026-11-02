<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Sketchbook Pencil

> Graphite sketches and notes on a sketchbook page: loose construction lines, smudged shading, sticky notes and taped-in photos — ideas caught while they form.

| Engine | Best for | Effort |
|---|---|---|
| canvas or hyperframes | creative process, design thinking, travel notes, behind-the-scenes, personal stories | medium |

## 1. Essence
- In one sentence: looking over someone's shoulder while they figure something out.
- Three adjectives: personal, loose, inventive.
- Signature move: a rough pencil sketch firms up into a clean line, with a handwritten note and an arrow pointing at the key part.

## 2. Use it for / avoid it for
- Use for: design/process stories, brainstorming, product concepts, travel or study notes.
- Avoid for: authoritative news, data-heavy reports.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| page | #F7F4EC | paper (with the faint shadow of the book's gutter) |
| graphite | #4A4A4A | pencil lines (light #9A9A9A for construction lines) |
| note | #FFE27A | sticky notes |
| tape | rgba(240,230,200,.7) | masking tape |
| accent | #2D6CDF | a blue pen for the final idea |

Rules: everything in graphite except sticky notes, tape and the blue-pen conclusion.

## 4. Type
- Handwriting: Gochi Hand or Caveat (OFL) 60–90 px for notes; keep notes to 3–6 words.
- Captions: Inter 600 48 px in a clean pill so the voice stays readable.
- Language coverage: check handwriting fonts for latin-ext; fall back to Kalam or Patrick Hand.

## 5. Surfaces and texture
- Paper tooth (fine noise), slight page curl shading near the gutter, faint show-through of previous pages.
- Graphite lines with uneven pressure; shading by smudged hatching (blurred hatch lines at 30 %).
- Photos the user owns, taped in at a slight angle with a white border.
- Never: dotted or squared notebook grids, glossy UI, purple gradients.

## 6. Framing and layout
- The page fills the frame; the camera moves over a larger spread (2–3 screens tall).
- Sketch y 400–1300; notes around it; captions ≤ 1500.

## 7. Motion
- Construction first: light lines draw fast (0.3 s), then the confident line over them (0.6 s), then shading fades in (0.4 s).
- Sticky notes slap on with a 0.15 s scale overshoot and a 2° settle; tape pieces appear instantly.
- Camera: handheld-like slow drift (seeded sine, ≤ 6 px), pans between areas of the spread (0.7 s).
- Transitions: page turn, or the camera slides to the next spread.

## 8. Sound
- Bed: soft lo-fi or acoustic guitar, −28 LUFS.
- Effects: pencil scratch, eraser rub, sticky-note slap, page turn.

## 9. Build recipe and checks
- Engine and templates: canvas engine for pencil strokes (`noise1` for pressure, seeded); HyperFrames for notes and photos layered on top.
- Steps: 1) plan the spread; 2) draw construction → final lines; 3) add notes and photos; 4) choreograph the camera on the voice; 5) review.
- Style checks: handwritten notes readable at 360 px; the conclusion is the only blue-pen element; no notebook grid sneaked in.
- Common failures: too many notes (clutter), handwriting too thin, camera drift that feels shaky (keep it slow).

## Credits
Original motionforge style.
