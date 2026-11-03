<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Y2K Chrome

> Liquid-chrome lettering reflecting a pale sky, bubbly translucent shapes, glossy aqua buttons and early-2000s desktop windows — optimism with a reflection map.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Art direction & design looks | hyperframes + three.js | music and fashion teasers, retro tech nostalgia, party and club nights, playful brand campaigns, app launches with a nostalgic hook | high |

## 1. Essence
- In one sentence: the turn of the millennium imagined the future as shiny, rounded and blue, and this style takes that at its word.
- Three adjectives: glossy, bubbly, nostalgic.
- Signature move: the chrome word — a 3D-extruded chrome title rotates 25° in, the sky environment slides across its surface, and a sparkle glint (4-point star, 0.3 s) pops on one letter.

## 2. Use it for / avoid it for
- Use for: retro-tech explainers ("phones in 2003"), music and nightlife promos, fashion capsules with a 2000s look, playful product launches, culture and trend reels.
- Avoid for: serious news, health, finance, anything needing high information density (chrome type is hard to read in long lines).
- Honesty: old devices and operating systems are shown as generic shapes or the user's own photos, never as reproductions of a real company's interface, startup screen or logo. Product and screen content of a real brand only from the user.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #CFE3F2 | pale icy sky field |
| ink | #0B1E3F | body text, window titles, outlines |
| accent | #FF5FCF | the one hot-pink pointer: a word, a cursor, a sparkle |
| support | #A9B4C2 | chrome mid-tone, window chrome, bevels |
| aqua | #7FE7F2 | glossy buttons and bubble tints |

Rules: chrome is a material, not a flat colour (environment-mapped from a sky gradient #FFFFFF → #CFE3F2 → #5E7FA6 → #FFFFFF; this is a reflection inside the glyphs, never a background). Pink is one element per frame. Night variant: background #0B1E3F, ink #E9F4FF, same accent and aqua.

## 4. Type
- Display: Unbounded (OFL) 800–900, 140–220 px, lowercase or title case, tracking −0.03 em, rendered as chrome (3D extrude 30 px in three.js, or SVG with a reflection gradient + 2 px white top highlight).
- Body / captions: Lexend (OFL) 500, 46–52 px, sentence case.
- Labels and system text: VT323 (OFL) 400, 40–48 px, for window titles, file names and status bars.
- Language coverage: all three ship latin + latin-ext; fallback `"Arial Rounded MT Bold"`, `system-ui`, `monospace`. Check chrome rendering of İ's dot and ğ's breve (they must reflect too).

## 5. Surfaces and texture
- Background: a pale sky field with soft cloud shapes (blurred, static) and a bright centre; or a blurred real photo graded cool.
- Materials: liquid chrome, translucent gel bubbles (white rim highlight, 30 % aqua fill), glossy pill buttons with a top-half shine, rounded desktop windows with bevelled title bars.
- Texture: none on chrome; a faint 0.03 grain on the field; optional scanline-free CRT glow (6 px bloom) on window content.
- Never: grid backgrounds, purple gradients (chrome reflections stay sky-blue and white), wireframe floors, copyrighted desktop icons.

## 6. Framing and layout
- 9:16 zones: chrome title y 300–700; bubbles float in the zone y 700–1400 around the hero; a desktop window 880×720 at y 760–1480 for content; captions y 1520–1600 on a glossy pill.
- Other formats: 1:1 title top, window centred; 16:9 title left, window right.
- Density: one chrome word, one window, up to 5 bubbles.

## 7. Motion
- Entrances: chrome title rotates in from rotateY 25° and scale 0.8 with `elastic.out(1, 0.6)` in 0.9 s; windows pop open from scale 0.2 at the click point with `back.out(1.7)` 0.35 s; bubbles rise 120 px over 3 s with a seeded sideways sway (±18 px).
- Exits: windows minimise toward the bottom (scale 0.1, 0.3 s `power3.in`); chrome melts down (scaleY 1 → 0.2, skew 8°, 0.4 s).
- Holds and rhythm: something new every 1–2 s; the reflection keeps sliding slowly (12 % of the width per second) during holds.
- Transitions: "bubble wipe" — a bubble expands to fill the frame in 0.4 s (`power2.in`) and pops into the next scene; cursor-click cuts.
- Camera: three.js orbit ±10° around chrome titles; 2D scenes static.
- Frame rate feel: smooth 30 fps; sparkles on held frames for 6 frames.
- Edit grammar: early-2000s music-video grammar — average shot length 1–1.5 s, cuts on the beat with occasional 2-frame stutter repeats on the snare; footage gets a fish-eye-free wide crop and a 15 % bloom. One speed ramp per section (100 % → 200 % → 100 %) on dance or product moves. Text pops replace lower-thirds; window titles carry names.

## 8. Sound
- Bed: bubbly pop, UK garage or trance-pop at 128–135 BPM, −22 LUFS under voice.
- Effects: soft bubble pops, a startup-style chime (original, not a real system sound), sparkle glints, mouse clicks.
- Mix: voice first; effects at 0.2 of voice level; final −14 LUFS integrated.

## 9. Build recipe and checks
- Engine and templates: HyperFrames + three.js (MeshStandardMaterial, metalness 1, roughness 0.08, sky environment map); `templates/kinetic-title`, `browser-window` (restyled as a bevelled retro window), `phone-ui` for user-owned app screens, `cover-still`.
- Signature scenes:
  - chrome word: extruded title rotates in, reflection slides, a sparkle glints on one letter.
  - pop-up window: bevelled window opens from the cursor, VT323 title bar, content inside; close button in aqua.
  - bubble wipe: gel bubble grows, wobbles once, pops into the next scene with 8 droplet particles (seeded).
  - progress bar: a glossy aqua bar fills in steps with "loading…" in VT323; pink cursor blinks at its end.
- Steps: 1) set the environment map and chrome material once; 2) build titles as 3D text; 3) build windows and bubbles in HTML/SVG; 4) cut to the beat; 5) readability QA.
- Style checks: chrome titles readable at 360 px (max 2 words per chrome title); no real OS or brand UI reproduced; pink once per frame.
- Common failures: chrome reading as flat grey (increase environment contrast), chrome reflecting purple (keep the map sky-blue), too many bubbles covering text.

## Overrides
None (library copy).

## Credits
Original motionforge style, drawing on the general tradition of turn-of-the-millennium graphic design, chrome lettering and glossy interface aesthetics.
