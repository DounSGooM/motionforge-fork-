<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Watercolor Wash

> Cold-press paper where colour blooms outward from a wet edge, pigment pools darker at the rims, and hand-lettered words appear as if written with a brush pen.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Art direction & design looks | canvas | gentle stories, book and poetry promos, illustrators' and artists' reels, cafés and small brands, greeting and seasonal messages | medium |

## 1. Essence
- In one sentence: a painting being made at the speed of the story, with the white of the paper left to breathe.
- Three adjectives: soft, luminous, hand-made.
- Signature move: the bloom reveal — a photo or illustration appears through a watercolour wash that spreads from one point with an irregular, darker-rimmed edge in 1.2 s.

## 2. Use it for / avoid it for
- Use for: storytelling and poetry, illustrated explainers for children and families, artists' process reels, cafés, bakeries, florists, seasonal greetings, gentle nonprofit updates.
- Avoid for: hard news, finance and data with precise numbers, tech UI walkthroughs, anything urgent.
- Honesty: illustrations and photos are the user's own or licensed; if an illustration was generated, disclose it at delivery. Artist work shown in process reels is credited by name.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #FBF8F2 | cold-press paper white |
| ink | #3A3A44 | lettering and body text (dark wet graphite) |
| accent | #E2725B | coral wash: the key word, the bloom that carries the message |
| support | #6E9FC9 | cerulean wash for skies, water and secondary shapes |
| ochre | #F2D7A6 | warm under-wash behind cards and captions |

Rules: washes are transparent (multiply) and overlap into new tones naturally; no flat fills. Coral marks one element per frame. Paper white must stay visible in at least 30 % of every frame.

## 4. Type
- Display: Libre Caslon Display (OFL) 400, 110–150 px, sentence case, tracking −0.01 em, for titles.
- Hand-lettering: Kalam (OFL) 700, 70–96 px, in ink or coral, revealed with a brush-stroke mask, baseline wobble ±2 px (seeded).
- Body / captions: Mulish (OFL) 600, 44–50 px, sentence case, on an ochre wash strip.
- Language coverage: all three ship latin + latin-ext; fallback `Georgia` / `cursive` / `system-ui`. Kalam's diacritics checked at 70 px.

## 5. Surfaces and texture
- Background: cold-press paper with a visible tooth (static height texture, 0.12), slight cockling shadows (2 % darker waves), deckled edges on card beats.
- Materials: watercolour washes (seeded noise-shaped edges, edge darkening 15 %, granulation speckle in cerulean), dry-brush strokes, pencil underdrawing lines (0.8 px, #3A3A44 at 25 %).
- Texture: paper tooth shows through every wash (multiply); pigment granulation is static per wash.
- Never: grid backgrounds, purple gradients, digital airbrush, hard vector shapes, glossy highlights.

## 6. Framing and layout
- 9:16 zones: title y 260–520; main painted image or photo bloom 900×1000 at y 560–1360; hand-lettered line y 1400–1520; caption strip y 1560–1640.
- Other formats: 1:1 bloom centred, title above; 16:9 bloom left two thirds, lettering right.
- Density: one image, one line of lettering, one caption; washes may extend to frame edges and fade out.

## 7. Motion
- Entrances: bloom spreads from a seed point to full shape in 1.2 s (`power2.out`) via a growing noise-threshold mask; edge darkening appears 0.3 s after; lettering writes on along brush paths at 14 chars/s.
- Exits: washes dry and fade (opacity 1 → 0 over 0.8 s while the edge darkening stays 0.2 s longer); or a clean-water wipe lifts colour from left to right in 0.7 s.
- Holds and rhythm: 3–5 s per image; something gently changes every 1.5–2 s (a second wash glazing over, a lettered word).
- Transitions: wet-in-wet dissolve — the next scene's bloom grows through the current one (1.0 s overlap); paper turn for chapters.
- Camera: slow 2–3 % push or a 30 px drift; never fast moves.
- Frame rate feel: 30 fps for blooms; lettering stepped at 15 fps for a hand-made feel.
- Edit grammar: picture-book grammar — average shot length 3–5 s, cuts replaced by bloom dissolves on sentence ends; footage, if any, is shown inside a wash-edged vignette at 2–4 s per shot, cut on gentle action (a pour, a page turn). No speed ramps, no jump cuts. Narration L-cuts 0.5–1 s across each dissolve. Names appear hand-lettered for 3 s instead of lower-third bars.

## 8. Sound
- Bed: solo piano, acoustic guitar, harp or soft strings, 60–85 BPM, −26 LUFS under voice.
- Effects: soft brush swishes for lettering, a water drip at each bloom start (quiet, −32 dB relative), paper rustle for chapter turns.
- Mix: voice warm and close; ducking 5 dB; final −14 LUFS integrated (or −16 for bedtime-story content).

## 9. Build recipe and checks
- Engine and templates: canvas engine (seeded noise masks, multiply compositing, granulation textures); `templates/kinetic-title` (brush write-on mode), `word-captions` (caption strip on ochre), `cover-still`.
- Signature scenes:
  - bloom reveal: seed point → noise-threshold mask grows 1.2 s, edge darkening 15 %, granulation in cerulean areas.
  - glaze: a second transparent wash passes over part of the image (sky or shadow), deepening it in 0.8 s.
  - brush lettering: a word writes on along its strokes in coral, a small drip forms at the last stroke (static after).
  - wet-in-wet dissolve: the next scene blooms through the current one from the opposite corner.
- Steps: 1) gather or paint the images; 2) define seed points and masks per scene (fixed seeds); 3) build lettering paths; 4) time dissolves to the narration; 5) QA stills.
- Style checks: paper white visible in ≥ 30 % of each frame; captions readable on the ochre strip (contrast ≥ 4.5:1); blooms identical between two renders (seeds fixed).
- Common failures: washes looking like blurred circles (add noise edges and darkened rims), muddy overlaps (limit to three washes per area), lettering too thin at phone size (Kalam 700, ≥ 70 px).

## Overrides
None (library copy).

## Credits
Original motionforge style, drawing on the general tradition of transparent watercolour painting and brush-pen hand-lettering.
