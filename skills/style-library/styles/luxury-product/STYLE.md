<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Luxury Product

> A product rising out of black into a warm pool of light, a narrow gold light sweep gliding across its surface, a high-contrast serif name over a bronze-gold hairline, and nothing moving faster than it needs to.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| E-commerce & products | hyperframes + three.js (remotion for macro footage) | jewellery, watches, fragrance, leather goods, fine spirits, premium launches | medium |

## 1. Essence
- In one sentence: restraint and light — the product is revealed slowly, the way a jeweller lifts a cloth.
- Three adjectives: hushed, precise, warm.
- Signature move: the light sweep — a 120 px soft band of warm light crosses the product at 25° over two seconds, masked to the object so the background stays black.

## 2. Use it for / avoid it for
- Use for: premium products with surfaces that reward light (metal, glass, leather, stone), limited editions, atelier stories.
- Avoid for: discounts and promos (use `flash-sale`), busy multi-product grids, playful brands.
- Honesty: materials ("18k gold", "full-grain leather"), origin, edition sizes and prices come from the user; brand marks only from the brand kit.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #0A0908 | warm black |
| ink | #EFE7D8 | ivory names and lines |
| accent | #C9A15A | warm gold: hairlines, the sweep's tint, one italic word |
| support | #6E655A | taupe secondary text, edition numbers |
| plinth | #17140F | velvet or stone base, the light pool's edge |

Rules: gold is a thread, not a fill — hairlines and one word only, never a gold background or gold type blocks. The product supplies any other colour.

## 4. Type
- Display: Bodoni Moda (OFL) 400 and italic, 90–120 px, title case, tracking 0.01 em; optical size high for thin hairlines.
- Labels: Josefin Sans (OFL) 400, 24–28 px, uppercase, tracking 0.35 em.
- Body / captions: Josefin Sans 400, 38–42 px, sentence case, max 2 lines (no captions on the product).
- Language coverage: both ship latin-ext; Bodoni hairlines thin out at small sizes, so never below 64 px.

## 5. Surfaces and texture
- Background: warm black with a light pool under the product (radial #2A2116 → #0A0908 at 60 % radius); static grain 0.05.
- Materials: velvet, honed stone or dark lacquer plinth; real reflections in three.js (environment map, roughness 0.15 for metals).
- Texture: no paper, no noise beyond grain; edges stay sharp.
- Never: grid backgrounds, purple gradients, sparkle particles, lens flares, gold gradients on text.

## 6. Framing and layout
- 9:16 zones: product y 520–1260 with large negative space above; name y 1320–1440; hairline y 1470; label y 1500–1540; edition / price y 1580–1620.
- Other formats: 1:1 product centred y 120–760, name below; 16:9 product on the right third, type on the left.
- Density: product + name + one label; one idea per shot.

## 7. Motion
- Entrances: emerge from black — 1.2 s fade with scale 1.00 → 1.03, sine.inOut; type fades while tracking closes 0.5 → 0.35 em over 1.4 s power2.out.
- Light sweep: 1.6–2.2 s, sine.inOut, peak opacity 0.6, screen blend, once per shot.
- Exits: fade to black 0.8 s; nothing slides out.
- Holds and rhythm: shots 3–5 s; nothing moves faster than 0.6 s.
- Transitions: dissolves 0.6–1.0 s, or cuts on musical bars.
- Camera: slow orbit or slider move at 1–2 % of frame width per second; no shake, no whip.
- Edit grammar: average shot 3–5 s; cuts every bar (about 3.2 s at 75 BPM) or dissolves on phrases; macro details as slow glides; slow motion at 50 % for pours, fabric and droplets (shot at 50/60 fps); no speed ramps, no jump cuts; the packshot holds 3 s with the brand mark.

## 8. Sound
- Bed: sparse piano, cello or ambient, 60–80 BPM, −26 LUFS under voice; silence before the reveal.
- Effects: a faint shimmer on sweeps at −30 LUFS, real foley (clasp, cap, glass) close-miked.
- Mix: voice low and intimate; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: HyperFrames with three.js via `templates/product-turntable-3d` (dark plinth, slow orbit, callouts off); `templates/cover-still` for the packshot; light sweep is a new scene; Remotion for macro footage edits.
- Signature scenes:
  - emerge from black: 0.8 s of black, then the product fades up in its light pool, sweep follows 0.4 s later.
  - light sweep: masked band crosses at 25°, gold tint at 20 %, peak 0.6.
  - macro glide: 2.5× close-up of a detail (stitch, clasp, engraving) gliding 2 % per second, one Josefin label.
  - name plate: Bodoni name fades in, gold hairline draws outward from the centre to 280 px each side in 0.9 s power2.inOut.
  - packshot: product, name, edition or price from the user, brand mark from the kit, hold 3 s.
- Steps: 1) get model/footage, materials and prices; 2) light one hero still; 3) cut to the music bars; 4) type and sweeps; 5) mix, QA.
- Style checks: background stays black under the sweep; gold appears only as hairlines/one word; type ≥ 64 px display, ≥ 24 px labels.
- Common failures: product clipped to black in shadows (lift the rim light); sweeps on every shot (once per shot, not every second).

## Overrides
None in the library copy.

## Credits
Original motionforge style, drawing on the general tradition of jewellery and fragrance still-life photography.
