<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Unboxing Pop

> Top-down on kraft cardboard: flaps fold open one after another, items rise out with a squash, and die-cut pink stickers slap on with an overshoot to name what came in the box.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| E-commerce & products | hyperframes (+ three.js for the box) | unboxings, subscription boxes, order reveals, "what's in the kit" | medium |

## 1. Essence
- In one sentence: the joy of opening a parcel, paced so each item gets its own little reveal and its own label.
- Three adjectives: playful, tactile, generous.
- Signature move: the sticker slap — a label lands at 1.6× size, overshoots and settles at a slight angle with a hard little shadow.

## 2. Use it for / avoid it for
- Use for: small brands showing an order, subscription boxes, starter kits, gift sets, merch drops.
- Avoid for: luxury products (use `luxury-product`), serious or medical products, anything without physical packaging.
- Honesty: contents, counts and prices come from the user; logos on the box only from the brand kit; gifted or paid unboxings carry an "ad" or "gifted" sticker in the first 3 s.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #CDA77C | kraft cardboard surface |
| sticker | #FFFDF7 | sticker bodies, die-cut edges, cards |
| ink | #1E1A16 | text on stickers and titles |
| accent | #FF3E8A | hot pink stickers, tape, the "new" label |
| support | #FFD23F | secondary yellow stickers (counts, sizes) |
| shade | #8A6F52 | box interior, shadows on kraft |

Rules: pink on at most two stickers per frame; yellow for numbers only. The product's own colours stay untouched.

## 4. Type
- Display: Rubik (OFL) 900, 96–120 px, sentence case, tracking −0.02 em, set on stickers rather than floating.
- Sticker labels: Rubik 700, 40–52 px, max 3 words.
- Captions: Rubik 600, 54 px, 2–4 words per chunk, ink on a sticker-white plate.
- Labels: Rubik 500, 26 px, uppercase, tracking 0.1 em (item counts, sizes).
- Language coverage: Rubik ships latin-ext and cyrillic on Fontsource.

## 5. Surfaces and texture
- Background: kraft texture (static fibre noise, 8 %) with a soft top light; real overhead footage replaces it when available.
- Materials: box as flat-shaded 3D (or real footage), tissue paper at 85 % opacity, stickers with a 10 px white die-cut edge and a hard shadow `0 6px 0 rgba(0,0,0,.18)`, pink tape at 70 %.
- Texture: none on stickers beyond a faint 3 % gloss band.
- Never: grid cutting mats or graph-paper backdrops, purple gradients, brand logos the user does not own.

## 6. Framing and layout
- 9:16 zones: title y 260–420; box centred y 600–1300 (top-down); stickers orbit the item within x 80–1000; captions y 1420–1600.
- Other formats: 1:1 box y 160–820; 16:9 box centre-left, item list on the right.
- Density: box + one item + up to 2 stickers; the contents layout may show 6–9 items.

## 7. Motion
- Entrances: flaps rotate 0 → −170° in 0.35 s power2.out, order front, back, left, right, 0.08 s stagger; items rise 220 px with back.out(1.8) in 0.45 s; landing squash 1.08 / 0.92 for 0.1 s.
- Sticker slap: scale 1.6 → 1 with back.out(2.5) in 0.22 s, rotation −12° → −3°, shadow 1.3 → 1.
- Exits: items slide off the side 0.3 s power2.in; stickers peel (scaleY 1 → 0 from the top) 0.2 s.
- Holds and rhythm: 1.5–2.5 s per item; something lands every 0.8–1.2 s.
- Transitions: hard cuts on action; a tissue-paper wipe 0.4 s between sections.
- Camera: locked top-down; one 1.0 → 1.3 push on the hero item.
- Edit grammar: average shot 0.8–1.5 s; hands footage cut on action at the midpoint of a lift, tear or peel; tape cutting at 200 %, the reveal at 100 % with a 2–3 s hold for the sound; jump cuts on a locked camera are fine; hero insert 1.5 s.

## 8. Sound
- Bed: upbeat pop or funk, 115–125 BPM, −22 LUFS under voice.
- Effects: real cardboard rip, tape pull, paper rustle (licensed foley), a short "thwip" per sticker at 0.2 of voice level.
- Mix: voice first, foley up in the reveal hold; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: HyperFrames; three.js for a 3D box when there is no footage; `templates/checklist-reveal` for the "in the box" list, `templates/stat-counter` for item counts, `templates/cover-still`.
- Signature scenes:
  - flap open: four flaps open in sequence, tissue slides out 0.4 s, first item rises with squash.
  - item rise + sticker: item lifts, a pink sticker with its name slaps on beside it, a yellow count sticker follows 0.15 s later.
  - contents layout: all items slide out of the box 0.3 s each, 0.1 s stagger, and settle in a neat flat arrangement sorted by size, each with a small label.
  - price tape: a pink tape strip tears across the bottom in 0.25 s, carrying the price from the user.
- Steps: 1) item list with names, counts, prices; 2) shoot or model the box; 3) cut reveals on action; 4) stickers and labels; 5) mix, QA.
- Style checks: sticker text ≥ 40 px; every item named matches the list; disclosure sticker present when needed.
- Common failures: stickers covering the product (place on kraft); too many bounces at once (one landing per 0.3 s).

## Overrides
None in the library copy.

## Credits
Original motionforge style, drawing on the general tradition of mail-order packaging and die-cut sticker design.
