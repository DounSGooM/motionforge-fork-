<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Clay Look

> Stop-motion plasticine in 3D: chunky rounded shapes with thumbprint texture on a putty-coloured set, soft shadows, squash and stretch on every landing, and everything stepped on twos.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Kids & animation | hyperframes + three.js | friendly explainers, kids' lessons, mascots, playful product stories | high |

## 1. Essence
- In one sentence: a handmade little world where every object has weight and looks squeezable.
- Three adjectives: handmade, squishy, cosy.
- Signature move: the morph squash — one clay object squashes flat, rolls into a ball and pops up as the next object.

## 2. Use it for / avoid it for
- Use for: kids' learning, mascot stories, "how it works" for simple objects, playful brand explainers, holiday greetings.
- Avoid for: data-heavy topics, serious news, real people or real products that must look exact.
- Honesty: no known characters or brand mascots unless the user owns them; 3D models are the user's or CC0, credited in `assets/CREDITS.md`.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #E9DFD3 | putty-coloured set and back wall |
| ink | #2C2620 | text, eyes, outlines of clay letters |
| accent | #2E9E6B | pine-green clay: the hero object or character |
| support | #F2A541 | warm orange clay for props |
| support-2 | #7DB3E0 | sky-blue clay for water, sky, second character |

Rules: the hero is the only green object; props share orange and blue. All clay colours are slightly desaturated (≤ 70 % saturation) so they read as material, not plastic.

## 4. Type
- Display: Fredoka (OFL) 700, 100–130 px, sentence case, built as extruded clay letters (depth 24 px) for titles.
- Body / captions: Lexend (OFL) 500, 48–54 px, 3–5 words per chunk, flat ink on a putty plate.
- Labels: Lexend 600, 30 px, sentence case, on small clay tags.
- Language coverage: both ship latin-ext on Fontsource; check İ and ş in the extruded title geometry.

## 5. Surfaces and texture
- Background: a real 3D set (floor and curved back wall) in putty, lit by one large soft area light from top-left and a warm bounce.
- Materials: MeshStandardMaterial, roughness 0.85, no metalness; normal map of seeded thumbprints and tool marks (strength 0.4); subsurface hint via a warm 4 % emissive.
- Shadows: soft (PCF, radius 6), contact shadows under every object; ambient occlusion on.
- Never: grid floors, purple gradients, glossy plastic, perfectly smooth surfaces.

## 6. Framing and layout
- 9:16 zones: set fills the frame; title y 280–480; action y 560–1300; captions y 1380–1560.
- Camera: 35 mm equivalent, 15° downward tilt, eye level of the characters.
- Other formats: 1:1 tighter set, title on the back wall; 16:9 wider set, captions bottom centre.
- Density: 1–2 characters + up to 4 props.

## 7. Motion
- Entrances: objects drop 200 px with stretch 0.85 / 1.18 in the fall, land with squash 1.25 / 0.80 for 2 frames, settle with back.out(1.4) 0.25 s; 0.15 s anticipation before jumps.
- Exits: squash down and sink into the floor 0.3 s, or roll off-screen.
- Holds and rhythm: a new action every 1.5–2.5 s; holds of at least 0.5 s on key poses.
- Transitions: roll wipe — a big clay ball rolls across and the set behind it changes; or a cut to a closer camera.
- Camera: locked shots; dolly moves stepped on twos at 60 px/s.
- Frame rate feel: everything on twos (12 fps inside 24 fps), plus seeded per-pose boil of ±1.5 px and ±0.6°.
- Edit grammar: stop-motion convention — locked-off camera, average shot 3–4 s; cut to a closer framing on action; text moments hold 2 s; no whips or speed ramps.

## 8. Sound
- Bed: pizzicato strings, marimba or ukulele, about 100 BPM, −24 LUFS under voice.
- Effects: squelch on squashes, pop on appearances, a soft thud on landings, at 0.2 of voice level.
- Mix: voice warm and close; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: HyperFrames + three.js; `templates/house-build-3d` re-skinned in clay for building stories, `templates/stat-counter` re-skinned as clay discs, `templates/cover-still`; other scenes are new scenes.
- Signature scenes:
  - clay title: extruded letters drop in one by one, 0.08 s stagger, each lands with squash.
  - morph squash: object squashes to 30 % height in 0.2 s, becomes a ball, pops up as the next object with back.out(1.8) in 0.3 s.
  - roll wipe: a 600 px clay ball rolls across in 0.6 s; the set behind it swaps.
  - thumbprint counter: numbers as clay discs stamped in with a press (scale 1.2 → 1, 0.15 s) and a visible print.
  - set pan: camera dollies along a small diorama at 60 px/s stepped on twos, characters reacting in turn.
- Steps: 1) storyboard 6–10 shots; 2) model or import CC0 assets, apply clay material; 3) animate pose-to-pose; 4) render on twos; 5) captions, mix, QA.
- Style checks: every frame pair is identical (true twos); thumbprint normals visible at phone size; no specular hot spots.
- Common failures: plastic look (raise roughness, lower saturation); boil differing between renders (fix the seed per pose).

## Overrides
None in the library copy.

## Credits
Original motionforge style, drawing on the general tradition of plasticine stop-motion animation.
