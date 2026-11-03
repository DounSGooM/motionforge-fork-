<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Streetwear Drop

> Raw concrete wall, black condensed type pasted on it, cobalt sticker labels slapped onto the product, a size run that lights up, and a countdown that ticks to the release minute.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Fashion & beauty | hyperframes + three.js | limited releases, restocks, collab capsules, sneaker and apparel drops, pop-up shop announcements | medium |

## 1. Essence
- In one sentence: the viewer learns what drops, when, in which sizes and for how much — and wants to set an alarm.
- Three adjectives: urgent, street, factual.
- Signature move: the sticker slap — a cobalt label with the product code smacks onto the garment at 8° with a 3-frame squash, peeling corner and all.

## 2. Use it for / avoid it for
- Use for: drop announcements, "tomorrow 10:00" countdowns, size and colourway runs, restock alerts, pop-up store openings, product detail breakdowns.
- Avoid for: luxury tailoring (use `fashion-editorial`), runway shows (use `runway-flash`), permanent catalogue items without a release moment.
- Honesty: release time, price, sizes and quantity exactly as the brand sets them; "limited to N" only with a real number from the brand. Product photos, 3D models and logos from the brand (3D models from the user or CC0 sources, never ripped). No fake "sold out" sizes.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #8F8D89 | concrete wall (real photo texture, desaturated) |
| ink | #0D0D0D | pasted type, size run, countdown digits |
| accent | #2340FF | cobalt sticker labels, the active size, release time |
| support | #FFFFFF | paste-up paper behind type, sticker borders |
| shade | #3A3936 | dark concrete, shadows, sold-out sizes |

Rules: cobalt marks what is new or selected (one sticker or one size per frame); all other type is ink on white paste-up paper or directly on concrete. Night variant: background #2B2A28, ink #F1F0EC, same accent.

## 4. Type
- Display: Bebas Neue (OFL) 400, 220–380 px, uppercase, tracking 0.01 em, stacked lines, line height 0.84.
- Body / captions: Schibsted Grotesk (OFL) 700, 46–54 px, sentence case.
- Labels and codes: Martian Mono (OFL) 600, 28–34 px, uppercase, tracking 0.1 em ("SKU 0427-BLK · EU 38–46").
- Countdown: Martian Mono 700, 180 px, tabular ("02:14:09").
- Language coverage: all three ship latin + latin-ext; fallback `Impact` / `system-ui` / `"Courier New"`.

## 5. Surfaces and texture
- Background: a real concrete wall photo (owned or CC0) desaturated to #8F8D89 average; a hard side light from top-left (30 % lighter edge).
- Materials: wheat-paste paper with wrinkles and glue sheen, vinyl stickers with white borders and peeling corners, product on a plinth or the 3D turntable, zip-tie and hang-tag details.
- Texture: concrete pores (static), paper wrinkles (static normal map look), grain 0.06.
- Never: grid backgrounds, purple gradients, fake brand logos, invented hype numbers, animated noise.

## 6. Framing and layout
- 9:16 zones: drop title y 220–760 (pasted, may run off the right edge by 40 px); product hero centred y 780–1360 (900 px wide); size run row y 1400–1500; countdown y 1520–1700; release line y 1740.
- Other formats: 1:1 product left, title stack right; 16:9 product centre, title left, size and countdown right.
- Density: product + title + one data block (size run or countdown) at a time.

## 7. Motion
- Entrances: pasted type unrolls top to bottom 0.3 s (`power2.out`) with a 2 % paper bulge; stickers slap from scale 1.4 → 1 in 3 frames with squash (scaleY 0.9 → 1) and a 4 px wall shake; size chips pop with `back.out(2)` 0.2 s, 50 ms stagger.
- Exits: paper tears off diagonally in 0.25 s; product spins out on the turntable 180° in 0.5 s.
- Holds and rhythm: a new element every 0.5–1 s; 1.5 s hold on the price; countdown digits tick on whole seconds.
- Transitions: hard cuts on the beat; a quick zoom-through (1 → 1.6 into a sticker, 0.25 s `power4.in`) to the next scene.
- Camera: 3D turntable orbit 25°/s; graphics static with shakes only on slaps.
- Frame rate feel: 30 fps; sticker slaps snap with no in-between frames for the first 2 frames.
- Edit grammar: product-drop grammar — average shot length 0.5–1 s for detail shots (stitch, tag, sole, zip), 2 s for the hero. Cuts land on kick and snare; detail cuts may follow the hi-hat in double time for 2 bars. Speed ramp on lifestyle footage 100 % → 30 % → 100 % on the hero move (a jump, a jacket swing). Price and release time appear only after the product is fully seen; they hold until the end card.

## 8. Sound
- Bed: hard drill, grime or boom-bap at 90–145 BPM, −16 LUFS music-led, −22 under voice.
- Effects: vinyl sticker slap, paper rip, a clock tick under the countdown (only in the last 10 s of the countdown scene).
- Mix: music first; voice, if used, punchy and close; final −14 LUFS integrated.

## 9. Build recipe and checks
- Engine and templates: HyperFrames + three.js; `templates/product-turntable-3d` for the hero product (user GLB or photo-based card), `stat-counter` for the countdown, `kinetic-title`, `cover-still`.
- Signature scenes:
  - sticker slap: cobalt sticker with SKU or colourway slaps onto the product at a seeded 4–10° angle, corner peels 12 px.
  - size run: chips EU 38–46 in a row; available sizes ink on white, selected size cobalt, sold-out sizes shade with a strike (only from brand data).
  - drop clock: countdown to the release minute in Martian Mono, date and time zone written out under it.
  - turntable reveal: product rotates 360° in 4 s on a concrete plinth, three callouts (material, detail, fit) pop in at 90° intervals.
- Steps: 1) collect release facts, sizes, price and assets from the brand; 2) prepare the turntable model or photo spins; 3) build paste-ups and stickers; 4) cut to the track; 5) verify every fact.
- Style checks: release time includes the time zone; size availability matches the brand's list; one cobalt element per frame.
- Common failures: countdown that implies the wrong day (write the date), stickers covering the product's key detail, concrete too dark behind ink type (keep the paste-up paper).

## Overrides
None (library copy).

## Credits
Original motionforge style, drawing on the general tradition of street wheat-paste posters, vinyl sticker culture and sneaker release graphics.
