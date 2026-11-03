<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# History Map Campaign

> An engraved map on aged paper where two inks advance and retreat: tapered arrows sweep along routes, borders redraw, and a dated caption ticks forward with every move.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Documentary & storytelling | hyperframes (SVG map) + three.js for globe openers | campaigns and battles, empires, migrations, border changes, trade routes | high |

## 1. Essence
- In one sentence: history moving across real geography, one dated step at a time.
- Three adjectives: grave, legible, sweeping.
- Signature move: a thick madder arrow sweeps along a route, its head landing as the date in the caption rolls to the new day.

## 2. Use it for / avoid it for
- Use for: military campaigns, the rise and fall of states, explorers' routes, treaties and partitions, historic trade networks.
- Avoid for: conflicts still in progress (fronts change daily and the look implies settled fact), stories without geography.
- Honesty: borders and fronts follow a named historical atlas or dataset, cited on screen; where historians disagree, draw dashed lines and say so. Base geography from Natural Earth (public domain) or OpenStreetMap ("© OpenStreetMap contributors"); scanned antique maps only if public domain or licensed. Casualty and army sizes carry ranges and a source. Avoid flags and insignia that are banned or inflammatory where the video will be seen — use neutral ink blocks.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #D9C9A0 | aged map paper, darkening to #BFA97A at the edges |
| ink | #3B2B1B | iron-gall sepia: coastlines, rivers, labels, captions |
| accent | #A3261E | madder: the force or border moving now |
| support | #2E4A6B | indigo: the opposing force or the old border |
| sea | #B9BFA8 | faded wash for water |

Rules: only the side currently moving is madder; the other sits in indigo at 80 %. Keep each side's colour for the whole video. Territory fills at 35 % with hatching; lines at full strength.

## 4. Type
- Display: Cormorant SC (OFL) 700, 100–130 px, small caps, tracking 0.06 em — chapter names and region names.
- Body / captions: EB Garamond (OFL) 500, 50 px, sentence case; lining figures for dates.
- Labels: EB Garamond italic 34 px for rivers and seas (water in italic, the cartographic convention); Cormorant SC 600 30 px tracked 0.2 em for countries.
- Dated caption: EB Garamond 600, 56 px, "14 June 1807" (day month year, no ordinals).
- Fallback: Spectral. Both faces carry latin-ext, Cyrillic and Greek — write place names in their native spelling with diacritics.

## 5. Surfaces and texture
- Background: the map is the background — paper fibre, 8–15 seeded foxing spots, fold creases at thirds (2 px light/dark pairs), vignette 30 %.
- Materials: engraved coastline with 2–3 offset hachure strokes inside the land edge, hachured mountain symbols, a cartouche frame for titles, a compass rose in one corner.
- Texture: static grain 0.05; ink lines roughened with a fixed-seed displacement of 0.8 px.
- Never: a latitude/longitude graticule drawn across the sheet as a pattern (one meridian as content at most), satellite imagery, screenshots of map apps, glossy 3D terrain.

## 6. Framing and layout
- 9:16 zones: cartouche title y 240–420; map y 440–1480, cropped to the theatre of action, north up; dated caption box x 80, y 1500–1600; captions merged into it when voice-led.
- Other formats: 1:1 map 1080×800 under the cartouche; 16:9 map full frame, cartouche top-left, dated caption bottom-left.
- Density: at most 2 forces, 3 live arrows and 6 place labels; older arrows fade to 30 %.

## 7. Motion
- Entrances: arrows draw along their path in 1.2–2.0 s power2.inOut, the head scaling 0.6 → 1 in the last 0.2 s; borders sweep in by dashoffset over 1.0 s; territory fill grows behind the arrow by mask in 0.8 s; labels fade with an 8 px rise in 0.3 s.
- Exits: superseded arrows fade to 30 % over 0.5 s and stay as a trail; old borders turn dotted.
- Holds and rhythm: one move every 3–5 s; the date changes at the start of each move.
- Transitions: camera moves between map views, not cuts; cut only to archival inserts (portraits, engravings, letters) laid on the map as a print rotated 3°.
- Camera: 2D pans and zooms 1.0–2.5 s power2.inOut across three fixed zoom levels (theatre, region, field).
- Frame rate feel: smooth 30 fps.
- Edit grammar: documentary map sequence — one move per narration sentence; the date tick lands on the first syllable of the spoken date; archival inserts 2–4 s with a 2 % push and an L-cut carrying the narrator in; chapter breaks dip to paper colour for 0.5 s; no speed ramps, no whips.

## 8. Sound
- Bed: low strings or solo cello, 60–76 BPM, −29 LUFS; a low drum only on major moves.
- Effects: a soft low thump when an arrow head lands, paper rustle on chapter changes, a faint quill scratch on label writes — all at 0.1–0.15 of voice.
- Mix: voice first; −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: hyperframes with SVG layers (geography, territory, arrows, labels) and d3-geo (npm, ISC) for projection; `templates/globe-arcs-3d` for openers; `kinetic-title` in a cartouche; `word-captions`; `cover-still`.
- Signature scenes:
  - Campaign arrow: tapered from 48 px at the base to 18 px at the head, draws in 1.6 s; the old date slides up 40 px and fades as the new date slides in (0.3 s).
  - Front advance: the territory polygon interpolates from one dated shape to the next over 1.5 s, its leading edge carrying a 40 px hatched band.
  - Border redraw: the old border turns dotted indigo, the new one draws in madder over 1.0 s, the area label cross-fades.
  - Siege ring: short dashes close around a city marker in 1.2 s, the label turns madder, a day counter ticks in tabular figures ("Day 34").
  - Globe descent: `globe-arcs-3d` rotates to the region in 2 s, zooms, and dissolves (0.8 s) into the paper map at the same centre and scale.
- Steps: 1) source every date, border and number; 2) one GeoJSON per keyframe; 3) one projection for the whole video (conic for mid-latitudes); 4) animate; 5) `qa-review` and claim list.
- Style checks: every on-screen date is in the claim list; water labels italic; diacritics correct; never more than two coloured forces.
- Common failures: projection changing between scenes (labels jump — fix one projection); arrows crossing labels (move labels onto leader lines); too many arrows at once.

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of engraved atlases and documentary campaign maps.
