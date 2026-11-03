<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Luxury Estate

> Slow drone and gimbal moves through a high-end home, thin spaced-capital serif titles, a champagne hairline frame and long dissolves: quiet confidence, no shouting about price.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Real estate & maps | remotion (footage edit) + hyperframes (titles) | premium listings, architect-designed homes, villas and hotels for sale, developer launch films | high |

## 1. Essence
- In one sentence: the house carries the film; the graphics behave like an engraved invitation.
- Three adjectives: unhurried, refined, spacious.
- Signature move: a 1 px champagne hairline frame, inset 56 px, draws in from the four corners while a spaced-capital title fades up letter by letter over a slow drone push.

## 2. Use it for / avoid it for
- Use for: premium properties, villa and hotel listings, developer brand films, architects' portfolios.
- Avoid for: budget rentals, data-heavy updates, fast trend reels (the pace is deliberately slow), projects without high-quality footage (graphics cannot carry this look alone).
- Honesty: price only if the user provides it, otherwise "Price on request"; location only as precise as the seller allows (often district only); drone footage must be legally flown (permits and consent are the user's, noted at delivery); renders and virtual staging carry a "Visualisation" note.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #13100D | umber-black title cards and dips |
| ink | #F2EDE3 | warm ivory titles and facts |
| accent | #CBB089 | champagne: hairline frame, dividers, one key word |
| support | #7A6F62 | taupe secondary text, credits, agent line |

Rules: champagne appears only as 1 px lines and at most one word per frame; never filled champagne shapes, gold gradients or bevelled metal. Footage grade: soft highlight roll-off, blacks lifted to #1A1612, interiors 4500–5000 K, skies natural.

## 4. Type
- Display: Cormorant Garamond (OFL) 300–400, 72–96 px, uppercase, tracking 0.24 em.
- Body / captions: Jost (OFL) 300, 34–40 px, sentence case, tracking 0.02 em; sentence-level captions, 2 lines max.
- Labels: Jost 400, 24–26 px, uppercase, tracking 0.32 em ("6 BEDROOMS · 820 M²").
- Language coverage: both ship latin + latin-ext; check the dotted capital İ at wide tracking; fallback `Georgia, serif` and `"Helvetica Neue", sans-serif`.

## 5. Surfaces and texture
- Background: full-bleed footage; title cards in umber-black with a 30 % warm light pool at centre.
- Materials: hairline frames, 1 px rules, a small monogram from the brand kit.
- Texture: fine static film grain 0.05 over everything; no digital light leaks or lens flares added.
- Never: bold sans, emoji, starbursts, price slashes, fast zooms, glossy 3D gold type, backdrop grids, purple gradients.

## 6. Framing and layout
- 9:16 zones: centred titles y 860–1060, or left-aligned lower thirds at x 96, y 1320–1480; hairline frame inset 56 px; agent and credit line y 1500–1600; all text inside y 240–1680.
- Other formats: 1:1 frame inset 40 px; 16:9 classic left lower third, frame inset 48 px.
- Density: one line of text at a time, six words max; most shots carry no text at all.

## 7. Motion
- Entrances: letters fade in with 0.035 s stagger, 0.9 s each, power1.out, 8 px rise; hairline draws from the corners in 1.4 s power2.inOut.
- Exits: 0.8 s dissolve; lower thirds leave 0.8 s before the cut.
- Holds and rhythm: titles hold 3–4 s; nothing on screen moves faster than 200 px/s.
- Transitions: cross-dissolves of 18–24 frames between rooms; 0.5 s dips to umber for chapters (Arrival / Interior / Grounds).
- Camera: movement comes from footage: gimbal slides at 0.3–0.5 m/s, drone pushes and reveals under 3 m/s, orbits near 10°/s; graphics only drift 1.00→1.03.
- Frame rate feel: 4K 50/60p footage conformed to 25/30 fps for gentle slow motion.
- Edit grammar: average shot 4–6 s, about twice a standard listing; every shot moves; cuts land on musical phrase ends, not on beats; hard cuts only between shots moving the same direction; no speed ramps, no whips; material details (stone, brass, linen) 2–3 s; L-cuts with real ambience (water, wind in trees) bridging rooms; lower thirds fade in 1.0 s after the shot settles and hold 3.5 s.

## 8. Sound
- Bed: piano and strings or sparse ambient, 60–80 BPM; −22 LUFS without voice, −28 under voice; or location ambience alone.
- Effects: none synthetic; real ambience (pool, birds, wind) around −30 LUFS.
- Mix: voice warm and unhurried; final −14 LUFS integrated, true peak ≤ −1 dBTP, loudness range ≥ 8 LU (do not over-compress).

## 9. Build recipe and checks
- Engine and templates: Remotion for footage and dissolves; HyperFrames for titles and the hairline frame; `kinetic-title` (letter-stagger variant, slowed), `cover-still`, `word-captions` (sentence mode, ivory, low contrast plate), `stat-counter` without count-up for facts; `templates/house-build-3d` only for off-plan projects with renders, marked as visualisation.
- Signature scenes:
  - Engraved open: umber card, hairline draws from four corners in 1.4 s, title letter-fades at 0.035 s stagger, 0.8 s dissolve into a drone push (new scene + `kinetic-title`).
  - Chapter dip: 0.5 s dip to umber, chapter word with a 1 px champagne underline, 2.5 s hold, dip out (new scene).
  - Detail triptych: three vertical 300 px panes with 24 px gaps, each a slow detail push, revealed left to right 0.4 s apart with 0.8 s fades (new scene).
  - Quiet facts: "6 BEDROOMS | 820 M² | 1.2 HA" with thin dividers fades in 0.9 s over a static exterior, holds 4 s (new scene).
- Steps: 1) select the 12–20 strongest shots and order them as a visit; 2) grade to the palette; 3) cut on phrase ends with dissolves; 4) add titles and facts from the user's data; 5) `qa-review`.
- Style checks: accent only as lines and one word; every dissolve ≥ 0.6 s; footage stabilised, windows not blown out; no text over a face or a key view.
- Common failures: drone too fast or too high, music swelling over the voice, gold-gradient type, too many facts on one card, a price where the seller wanted none.

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of premium property films and engraved stationery typography.
