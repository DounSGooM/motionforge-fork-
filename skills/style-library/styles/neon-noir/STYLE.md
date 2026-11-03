<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Neon Noir

> A rain-wet street after midnight: deep navy dark, one magenta neon sign that buzzes on, cyan reflections smeared across wet asphalt, and type that glows like bent glass tubing.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Art direction & design looks | hyperframes (remotion optional for night footage) | nightlife and bar promos, night-city stories, mystery and thriller teasers, late-night food spots, music releases | high |

## 1. Essence
- In one sentence: the city at night, lit only by signs, and the message is one of them.
- Three adjectives: moody, wet, electric.
- Signature move: the sign strike — a neon word flickers on (off-on-off-on over 0.5 s, seeded), hums, and its reflection appears 0.1 s later rippling in the puddle below.

## 2. Use it for / avoid it for
- Use for: bars, clubs and late-night restaurants, night-photography reels, mystery/thriller book or film teasers made by the user, synth and electronic releases, city-at-night guides.
- Avoid for: daytime brands, health and children's content, data-heavy explainers (glow lowers legibility), viewers sensitive to flicker (use the steady-on variant).
- Honesty: real venue signs and logos appear only from the venue's own footage or brand kit; never recreate a real business's neon sign. City footage is the user's own or licensed. Flicker stays within photosensitivity limits.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #070B18 | deep navy night |
| ink | #E8F1FF | cool white body text and captions |
| accent | #FF2D95 | the magenta neon sign — one message per frame |
| support | #2BB8FF | cyan secondary neon, reflections, rim light |
| wet | #1A2440 | wet asphalt and wall surfaces, mid-shadows |

Rules: magenta and cyan never blend into a background gradient (house rule: no purple gradients); they exist only as light sources and their reflections. Magenta is the message; cyan is atmosphere. Body text is ink, not neon. Glow = two layers: 4 px tight + 28 px wide at 45 %.

## 4. Type
- Display (neon): Tilt Neon (OFL) 400, 140–200 px, lowercase or title case, tracking 0.02 em, rendered as a 6 px tube with glow; tube joins (small gaps) every 2–3 letters.
- Body / captions: Chakra Petch (OFL) 500, 44–50 px, sentence case.
- Labels: Chakra Petch 600, 26–30 px, uppercase, tracking 0.22 em (addresses, opening hours, "OPEN TIL 4").
- Language coverage: both ship latin + latin-ext; fallback `"Trebuchet MS"`, `system-ui`. Neon tubes must include diacritics as separate tube pieces (dots, breves).

## 5. Surfaces and texture
- Background: real night footage or photos (the user's or licensed) graded to the palette (shadows #070B18, highlights cool, saturation only in light sources); graphic beats on #070B18 with a wet-wall texture (brick or concrete at 12 %).
- Materials: glass tubing, wet asphalt (reflection layer: the scene mirrored, 30 % opacity, 10 px blur, displaced by a seeded ripple map), rain streaks (static plates swapped every 3 frames, seeded), fog behind signs.
- Texture: film grain 0.10, halation around highlights (12 px red-shifted bloom).
- Never: grid backgrounds (including perspective "synth grid" floors), purple gradient skies, sun-set stripes, lens-flare presets.

## 6. Framing and layout
- 9:16 zones: neon sign y 360–760 on a wall; reflection zone y 1300–1700 (puddle, mirrored sign); captions y 1080–1200 in ink with a dark backing (40 % #070B18, 20 px blur); labels y 260.
- Other formats: 1:1 sign upper-left, reflection lower-right; 16:9 sign right third, footage left two thirds.
- Density: one sign, one caption line, footage. Nothing else glows.

## 7. Motion
- Entrances: neon strike (seeded flicker pattern over 0.5 s, then steady with a ±3 % brightness hum at 2 Hz); body text fades in 0.4 s (`power2.out`) with 10 px rise.
- Exits: sign switches off — tubes dim to 15 % (unlit glass visible) in 0.2 s; text fades 0.3 s.
- Holds and rhythm: 3–5 s per scene; rain and reflections keep moving (deterministic loops) so holds never freeze.
- Transitions: light-wipe cut (a passing car's headlight sweep, 0.4 s, across the frame); focus pull from sign to footage (blur 0 → 18 px, 0.5 s).
- Camera: slow lateral dolly (40 px/s) or a slow 3 % push; rack focus on signs.
- Frame rate feel: 24 fps feel (frame-blended to 30); rain plates stepped every 3 frames.
- Edit grammar: night-thriller grammar — average shot length 2.5–4 s, slower than most reels; cuts land on bass hits or on the end of a sentence, motivated by movement (a car passing, a door closing). J-cuts of city ambience 0.5–1 s before each new shot. Speed ramps sparing: 100 % → 40 % on rain or a turning figure. Venue name lower-third as a small neon sign for 3 s.

## 8. Sound
- Bed: dark synthwave, downtempo or noir jazz, 70–100 BPM, −24 LUFS under voice.
- Effects: neon buzz and transformer click on strikes, steady rain bed at −34 LUFS, distant traffic and a passing tyre hiss on light-wipes.
- Mix: voice close and low; ducking 6 dB; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: HyperFrames (SVG strokes for tubes, CSS/SVG filters for glow, seeded flicker tables); `templates/kinetic-title` (neon mode), `word-captions`, `phone-ui` for the venue's own booking screen, `cover-still`; Remotion optional for long night footage.
- Signature scenes:
  - sign strike: tube outline appears unlit, seeded flicker, hum, then reflection ripples in below.
  - wet street pan: lateral dolly across footage; caption appears as the camera stops; puddle reflection carries the sign.
  - window booth: a lit window in a dark wall frames footage (the bar inside), cyan rim light, label "OPEN TIL 4".
  - closing sign: all text switches off except the venue name, which stays lit with its address beneath.
- Steps: 1) collect night footage, venue facts and logos; 2) grade to the palette; 3) build neon type and reflections; 4) edit to the slower rhythm; 5) flicker and legibility QA.
- Style checks: no more than 3 flicker flashes in any 1 s; one magenta message per frame; no purple gradient anywhere; captions readable on their dark backing.
- Common failures: glow so wide that letters merge (tight layer first), every element glowing (only the sign), footage too dark on phones (lift midtones to #1A2440).

## Overrides
None (library copy).

## Credits
Original motionforge style, drawing on the general tradition of noir night photography and hand-bent neon signage.
