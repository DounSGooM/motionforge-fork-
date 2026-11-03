<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Route Journey

> A muted OpenStreetMap base, one raspberry route line that draws itself leg by leg, transport icons riding the line, and day markers like milestones along the way.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Travel & hospitality | hyperframes (+ three.js for 3D city stops) | road trips, rail journeys, multi-day itineraries, walking and cycling routes, tour packages | medium |

## 1. Essence
- In one sentence: the viewer always knows where they are on the trip and how they got there.
- Three adjectives: oriented, practical, moving.
- Signature move: the leg draw — the route extends from the last day marker to the next while a transport icon (car, train, ferry, bike, walker) travels its head; distance and time count up beside it.

## 2. Use it for / avoid it for
- Use for: "7 days in X" itineraries, road-trip and rail routes, hiking stages, tour-operator packages, hotel-to-sights guides.
- Avoid for: one-place reviews (use `postcard-collage`), country-count recaps (use `passport-stamps`), routes the user has not actually planned or travelled.
- Honesty: maps from OpenStreetMap data (rendered tiles or vector data) with "© OpenStreetMap contributors" on screen, or tiles the user supplies; never screenshots of commercial map apps. Distances and durations come from the user or a routing source they name; prices and hotel names only from the user.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #EEEBE3 | land (map base, desaturated) |
| water | #AECBD8 | sea, rivers, lakes |
| ink | #1E2B2F | place names, labels, icons |
| accent | #E23D6F | the route line, active day marker, current icon |
| support | #CFDCC0 | parks and forests; travelled-route ghost at 40 % |
| roads | #FFFFFF | main roads (1.5–3 px), drawn under the route |

Rules: the route is the only saturated colour on the map; travelled legs fade to accent at 45 % so the current leg stands out. Night variant for evening content: land #1D2326, water #2B3E48, ink #E7EEF0, same accent.

## 4. Type
- Display: Outfit (OFL) 800, 110–140 px, sentence case, tracking −0.02 em — day titles ("Day 3 · Coast road").
- Body / captions: Outfit 500, 48–54 px.
- Labels: Overpass Mono (OFL) 600, 26–30 px, uppercase, tracking 0.12 em — distances, times, coordinates ("212 KM · 3 H 10").
- Language coverage: both ship latin + latin-ext; fallback `system-ui` / `"Courier New"`. Map labels use OSM's local names plus an English line if the user wants it.

## 5. Surfaces and texture
- Background: the map itself, desaturated to the palette (style the vector layers, or tint raster tiles with a multiply of #EEEBE3); a 6 % vignette.
- Materials: route line 12 px with round caps and a 4 px white casing; day markers as 84 px circles with the day number; photo cards (radius 28 px, 6 px white border) pinned beside stops.
- Texture: static paper grain 0.04 over the map.
- Never: grid backgrounds, purple gradients, coordinate graticules used as decoration, screenshots of commercial map apps, invented place labels.

## 6. Framing and layout
- 9:16 zones: day title y 240–420; map viewport y 440–1500 (route always kept between x 140–940); stop photo card 520×640 at the stop's side; stats chip y 1540; OSM credit 22 px at y 1860 left.
- Other formats: 1:1 map fills the frame, title top-left; 16:9 map right two thirds, day list left third.
- Density: one active leg, its icon, one stats chip and up to one photo card.

## 7. Motion
- Entrances: day marker pops 0 → 1 with `back.out(1.8)` 0.3 s; photo card swings in from 8° to 0° with `power3.out` 0.4 s; stats chip slides up 40 px 0.25 s.
- Exits: photo card drops 60 px and fades 0.25 s; day title wipes out left 0.3 s.
- Holds and rhythm: a leg draws in 1.2–2.5 s (longer legs longer, capped at 2.5 s); hold 2–3 s on each stop.
- Transitions: map camera moves are the transitions — pan/zoom along the route between stops (`power2.inOut`, 1.0–1.6 s); a zoom-out to the full route at the end.
- Camera: map tilts 0 → 35° for city stops (or swap to `city-pin-3d`), returns flat for long legs.
- Frame rate feel: smooth 30 fps; line draw uses path length, not time per point.
- Edit grammar: travel-show grammar — map leg (2 s) → 3–4 footage shots of the stop (1.2–2 s each) → back to the map with a match cut on the day marker. Cuts land on the voice's place names. Transit footage (window, road, rails) gets a speed ramp 100 % → 400 % → 100 % over 1 s. Day title lower-thirds on for 2.5 s, entering on the first footage shot of each day.

## 8. Sound
- Bed: road-trip indie or light electronic, 100–120 BPM, −24 LUFS under voice.
- Effects: soft pop for day markers, a short engine/rail/wave ambience under each leg matching the transport icon, a page-flip tick for photo cards.
- Mix: voice first; ambience at −32 LUFS; final −14 LUFS integrated.

## 9. Build recipe and checks
- Engine and templates: HyperFrames with SVG or canvas map layers from OSM vector data; `templates/city-pin-3d` for dense city stops, `globe-arcs-3d` for an intercontinental opener, `stat-counter` for distance totals, `word-captions`.
- Signature scenes:
  - leg draw: route path draws via `stroke-dashoffset`, icon follows the path at the draw head, km and hours count up in Overpass Mono.
  - day pin: marker pops, day title enters, photo card swings in beside it.
  - city drop-in: map tilts to 35°, cuts to `city-pin-3d` blocks with the hotel pin and a 500 m walking ring.
  - route recap: zoom out to the whole route, day markers pulse in order 120 ms apart, total distance counts up.
- Steps: 1) get the itinerary (stops, days, transport, distances) from the user; 2) fetch OSM data for the bounding box and style it; 3) build legs as paths; 4) add footage per stop; 5) QA with the credit visible.
- Style checks: OSM credit on every map frame; route never runs under captions or the right rail; icon matches the real transport of each leg.
- Common failures: route too thin at phone size (12 px minimum), labels colliding with the route (offset labels or drop them), map moves too fast for the eye (≥ 1 s per pan).

## Overrides
None (library copy).

## Credits
Original motionforge style, drawing on the general tradition of travel-show route maps and printed road atlases; map data © OpenStreetMap contributors.
