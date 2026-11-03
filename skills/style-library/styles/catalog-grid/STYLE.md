<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Catalog Grid

> A gallery wall of white product tiles on a warm-grey field; the camera glides across it, dives into one tile until it fills the screen, and a red-orange price tag swings in on a string.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| E-commerce & products | hyperframes | collection launches, shop tours, "5 picks under X", new arrivals, gift guides | medium |

## 1. Essence
- In one sentence: a whole collection at a glance, then one item at a time, in one continuous camera move like walking along a shop wall.
- Three adjectives: orderly, browsable, crisp.
- Signature move: the gallery dive — the wall zooms 3.4× into one tile while the others dim, and the tag swings in from above and settles.

## 2. Use it for / avoid it for
- Use for: fashion and home collections, bookshops, menus of products, marketplace sellers, gift guides with 5–8 items.
- Avoid for: a single hero product (use `product-hero-turntable`), services, items without clean photos.
- Honesty: product photos, names, prices, sizes and stock status come from the user's catalogue or feed; show currency and whether tax is included; never invent a sale price.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #EDEDE8 | warm-grey wall between tiles |
| tile | #FFFFFF | product tiles, size chips |
| ink | #111214 | product names, titles |
| accent | #F2471C | price tags, the selected tile's 4 px outline, "new" dot |
| support | #8D8F93 | category labels, sold-out text, meta |

Rules: the accent appears on one tile at a time; product photos are never tinted. Dark variant for evening drops: background #1B1C1E, tile #26282B.

## 4. Type
- Display: Schibsted Grotesk (OFL) 800, 84–100 px, sentence case, tracking −0.025 em.
- Body: Schibsted Grotesk 500, 40 px (product names, 2 lines max).
- Prices: Roboto Mono (Apache-2.0) 500, 48–64 px, tabular, white on the accent tag.
- Labels: Roboto Mono 400, 24 px, uppercase, tracking 0.12 em (category, SKU, sizes).
- Language coverage: both ship latin-ext; check the currency symbol (₺, €, zł) in Roboto Mono.

## 5. Surfaces and texture
- Background: flat warm grey with static grain 0.03, soft top light.
- Materials: tiles are white cards (radius 12, shadow `0 8px 24px rgba(17,18,20,.10)`) holding cut-out or studio photos on white; tags are card shapes with a punched hole and a 2 px string.
- Texture: none on photos; consistent white balance across items.
- Never: drawn grid lines or graph-paper backgrounds (the tile layout is spacing only), purple gradients, mismatched photo backgrounds.

## 6. Framing and layout
- 9:16 wall: 3 columns × 4 rows visible, tile 300 × 380, gutter 24 px, side margins 66 px; the wall can extend beyond the frame for camera moves.
- Zoomed item: photo 1080 × 1080 at y 360–1440; name y 1470–1560; tag hangs at the photo's lower right; size row y 1580–1640.
- Other formats: 1:1 wall 4 × 4 tiles; 16:9 wall 6 × 3, zoomed item on the left, info on the right.
- Density: wall view up to 12 tiles; zoomed view one item + tag + one row of chips.

## 7. Motion
- Entrances: tiles fade in with a 30 px rise, 0.35 s power2.out, diagonal stagger 0.04 s.
- Dive: camera scales 1 → 3.4 on the chosen tile in 0.9 s power3.inOut, others dim to 30 %.
- Tag: swings from 25° to 0° with elastic.out(1, 0.5) over 0.9 s, pivoting on its string.
- Exits: zoom back to the wall 0.6 s power3.inOut, pan 0.5 s power2.inOut to the next tile.
- Camera: one continuous move per category; no cuts inside a category.
- Frame rate feel: smooth 30 fps; motion blur 0.5 shutter on fast pans.
- Edit grammar: 5–8 items in 30 s, about 3 s per item (1 s dive, 1.5 s hold, 0.5 s return); cuts only between categories, hard and on the beat at 100–110 BPM; real product footage inserts 1 s; colour variants swap on beats.

## 8. Sound
- Bed: light house or bossa-electronic, 100–110 BPM, −24 LUFS under voice.
- Effects: a soft swoosh on dives, a little bell-like tick when the tag settles, at 0.12 of voice level.
- Mix: voice first; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: HyperFrames; the wall and dive are a new scene; `templates/browser-window` for the real shop page at the end, `templates/cover-still` for the collection card, `templates/kinetic-title` for category names.
- Signature scenes:
  - gallery dive: wall → one tile, dims others, tag swings in, hold 1.5 s.
  - price tag swing: accent tag with Roboto Mono price, string from the tile top, settles with elastic.out.
  - swatch row: colour variants as 64 px circles under the photo, active ring in accent, photo crossfades 0.2 s on each change.
  - size row: size chips in Roboto Mono; sold-out sizes struck in support grey (from stock data).
  - collection end: zoom out to the full wall, shop name and link, hold 2.5 s.
- Steps: 1) export catalogue rows (name, price, sizes, stock, photo); 2) normalise photos to one background; 3) build the wall; 4) script dives to the voice; 5) mix, QA.
- Style checks: every price matches the feed and shows the currency; one accent tile at a time; text ≥ 24 px at full zoom.
- Common failures: photos with mixed shadows (re-cut on white); pans too fast to read (≤ 1200 px/s).

## Overrides
None in the library copy.

## Credits
Original motionforge style, drawing on the general tradition of shop-window merchandising and printed mail-order catalogues.
