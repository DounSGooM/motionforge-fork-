<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Neighborhood Guide

> A friendly daylight street map centred on one home: walking-time rings breathe outward and amenity badges pop in category by category: cafés, schools, parks, transit.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Real estate & maps | hyperframes (SVG map); hyperframes + three.js for the tilted intro | area guides, relocation, "what's within 10 minutes", local business area promos | medium |

## 1. Essence
- In one sentence: what daily life looks like around this address, measured in minutes on foot.
- Three adjectives: friendly, practical, local.
- Signature move: three cobalt rings (5 / 10 / 15 min) bloom from the home pin, then one category of round icon badges pops in nearest-first with a count chip ("6 cafés · ≤ 5 min").

## 2. Use it for / avoid it for
- Use for: neighbourhood guides, relocation reels, the "around the corner" segment of a listing, school-run and commute explainers, local shop area guides.
- Avoid for: point-to-point routes (use `map-flyover-pins`), price analysis (use `market-stats`), safety or crime claims (only with official sourced data; otherwise leave them out).
- Honesty: map from OpenStreetMap with "© OpenStreetMap contributors" on screen, or user-supplied tiles; never commercial map screenshots. Amenities from OSM tags or the user's list, dated ("as of Oct 2026") and checked by hand. Circles are approximations ("5 min ≈ 400 m straight line"); real isochrones need routing on street data. Businesses appear as names from the data, not as their logos, unless the brand kit holds the rights. A private seller's home is shown as an area, not the exact door.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #F1EEE5 | land, warm map paper |
| water | #BFD6E2 | rivers, sea, lakes |
| parks | #D5E3C8 | parks and green space (content, low saturation) |
| ink | #23302A | titles, labels, inactive badge icons |
| accent | #2B54D6 | cobalt: home pin, walking rings, active category |
| support | #8B8579 | minor labels, past categories |

Rules: categories are told apart by icon, not by colour: inactive badges ink on white, the active category cobalt. Rings are 2 px cobalt at 60 / 40 / 25 % with a 6 % fill inside the 5-minute ring only. Roads #FFFFFF with #DCD6C8 casing.

## 4. Type
- Display: Bricolage Grotesque (OFL) 800, 90–110 px, sentence case, tracking −0.03 em.
- Body / captions: Atkinson Hyperlegible (OFL) 700, 50–56 px.
- Labels: Atkinson Hyperlegible 700, 28–30 px with a 5 px paper halo on the map; count chips Bricolage Grotesque 700 34 px.
- Language coverage: both ship latin + latin-ext; fallback `"Trebuchet MS", system-ui, sans-serif`.

## 5. Surfaces and texture
- Background: the map; flat paper beyond its edge.
- Materials: 72 px white badges with a 2 px ink 15 % ring and a 36 px original icon (cup, book, tree, train, basket, cross, dumbbell) in 3 px strokes; pill count chips; a 96 px cobalt teardrop home pin with a white house glyph; optional 220×220 rounded photos of places shot by the user.
- Texture: static grain 0.035 on paper only.
- Never: commercial map screenshots, a rainbow of 8 category colours, backdrop grids, unlicensed satellite imagery.

## 6. Framing and layout
- 9:16 zones: title y 260–420 on a paper banner; home pin at x 540, y 900; rings up to 420 px radius; category legend y 1420–1500 (5 icons, active one enlarged); captions y 1530–1640; OSM credit y 1660 left.
- Other formats: 1:1 home centred, legend in a right column; 16:9 map in the right 60 %, category list with counts on the left.
- Density: max 12 badges per category; beyond that cluster into "+5" bubbles; max 5 categories per video.

## 7. Motion
- Entrances: home pin drops 90 px, back.out(1.8), 0.4 s; rings grow 0→radius in 0.7 s power2.out, 0.25 s apart, "5 min" labels type at 20 chars/s; badges pop 0→1 with back.out(2.2) in 0.32 s, staggered 0.04 s by distance from home; count chips count 0→n in 0.5 s.
- Exits: a finished category shrinks to 14 px ink dots (kept as context) in 0.25 s.
- Holds and rhythm: 2.0–3.0 s per category; a new category on each spoken category noun.
- Transitions: category swaps inside the map; zoom to one place, then hard cut to its footage.
- Camera: open at zoom 17 on the pin, pull back to zoom 15 over 1.4 s power3.inOut to show the 15-minute ring; tilt 0–20° in the 3D variant only.
- Frame rate feel: smooth 30 fps.
- Edit grammar: map beats of 4–8 s intercut with 1.2–2 s street-level shots of the named places, cut on the place name; walking POV at 2× with a chip counting the real walk time; L-cut the café or park ambience under the return to the map; call to action on the final pull-back.

## 8. Sound
- Bed: warm acoustic guitar or soft bossa, 90–105 BPM, −27 LUFS under the voice.
- Effects: a soft bubble pop per badge, pitch rising along the stagger (max 8 per category, −22 dB); a gentle swell for the rings; street ambience under footage.
- Mix: voice first; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: HyperFrames with an SVG map from an OSM extract and an amenity query saved as dated JSON (no live API at render); `hyperframes + three.js` with `templates/city-pin-3d` for a tilted block intro with radius rings; `stat-counter`, `checklist-reveal` (16:9 list), `word-captions`, `cover-still`.
- Signature scenes:
  - Ring bloom: pin drop, three rings 0.25 s apart, minute labels type on (new scene, or `city-pin-3d` rings in 3D).
  - Category pop: legend icon scales 1→1.35, badges pop nearest-first 0.04 s apart, chip counts "6 cafés · ≤ 5 min" (new scene + `stat-counter`).
  - Nearest-of: one badge per category turns cobalt, a dashed walking path draws along the streets in 0.8 s, "4 min" chip lands (new scene).
  - Place card: a badge expands into a 640×420 rounded photo card (user photo, name, walk time) in 0.5 s power3.out, then cut to its footage (new scene).
- Steps: 1) agree the home location and its precision with the owner; 2) pull amenities into JSON, verify, date it; 3) compute walk times; 4) build map and categories; 5) `qa-review`.
- Style checks: credit visible; counts match the JSON; rings labelled approximate or built from real isochrones; no quality or safety claims without a source; labels read at 360 px wide.
- Common failures: badge pile-ups in dense centres (cluster), too many categories (max 5), exact private address exposed (offset to an area pin).

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of illustrated city guides and pedestrian wayfinding maps.
