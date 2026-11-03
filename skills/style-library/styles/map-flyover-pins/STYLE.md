<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Map Flyover Pins

> A dark, desaturated street map tilts and glides between places: a coral route line draws itself, pins drop with a bounce and distance chips type on beside them.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Real estate & maps | hyperframes (SVG or vector-tile map); hyperframes + three.js for the 3D arrival | property location, "how far is it from…", commutes, branch openings, short itineraries | medium |

## 1. Essence
- In one sentence: geography is the story; the viewer always knows where they are and how far it is.
- Three adjectives: oriented, gliding, factual.
- Signature move: the route line draws in coral on a muted map while the camera follows its head at a 35° tilt, ending in a pin drop with a distance chip.

## 2. Use it for / avoid it for
- Use for: listing location reels, commute comparisons, "3 places within 10 minutes of this flat", office or shop openings, delivery areas, trips with up to 5 stops.
- Avoid for: amenity inventories around one home (use `neighborhood-guide`), multi-day travel diaries with transport icons (use `route-journey`), intercontinental routes (start from `templates/globe-arcs-3d`).
- Honesty: map data from OpenStreetMap with "© OpenStreetMap contributors" on screen whenever the map is visible, or tiles the user supplies; never screenshots of commercial map apps. Distances and travel times come from routing on real data or from the user, with mode and condition ("by car, off-peak"); straight-line distances say "straight line". Private home addresses only with the owner's consent; otherwise pin the street, not the door.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #0E1C22 | land and the field outside the map, deep teal slate |
| water | #08131A | rivers, sea, lakes |
| roads | #2C4048 | minor roads; major roads #3E5660 |
| ink | #EDF3F0 | titles, chips, active place names |
| accent | #FF6A3D | route line, active pin, distance chip edge |
| support | #7FA3A6 | muted place labels, inactive pins |

Rules: the base map stays desaturated (parks only 4 % lighter than land, no green) so the route and the active pin carry all colour; coral covers under 6 % of the frame. Light variant: land #E7ECEA, roads #FFFFFF, ink #10232A, accent darkened to #E2512A for contrast.

## 4. Type
- Display: Manrope (OFL) 800, 88–110 px, sentence case, tracking −0.02 em.
- Body / captions: Manrope 700, 52–60 px, 2–5 words per chunk.
- Labels: DM Mono (OFL) 500, 28–32 px, uppercase, tracking 0.12 em ("2.4 KM · 6 MIN"); place names on the map in Manrope 600 30 px with a 6 px halo in the land colour.
- Language coverage: both ship latin + latin-ext; fallback `system-ui, sans-serif` and `ui-monospace`. Street names come from the data with their diacritics (ş, ő, ł); never retype them.

## 5. Surfaces and texture
- Background: the map is the backdrop; beyond its edge flat #0E1C22 with a soft radial light at y 600 (+6 % lightness).
- Materials: vector roads with round caps; building footprints flat in 2D, extruded blocks in 3D; chips of #0E1C22 at 82 % with a 1 px white 14 % border, radius 20 px, 12 px backdrop blur. The route is 12 px coral with a 6 px land-coloured casing either side.
- Texture: static grain at 0.06 over everything, no animated noise.
- Never: map-app screenshots, unlicensed satellite imagery, purple night-mode gradients, a lat/long graticule drawn as a backdrop grid.

## 6. Framing and layout
- 9:16 zones: title y 260–440; map full frame with the focal point at y 820; chips anchor 40 px right of their pin and never pass x 900 (button rail); captions y 1440–1600; OSM credit 22 px at x 48, y 1650.
- Other formats: 1:1 focal point centred, title as a top-left overlay; 16:9 map fills, text column in the left 34 %.
- Density: at most 3 labelled pins at once; other places shrink to 10 px unlabelled dots.

## 7. Motion
- Entrances: pin drops 120 px, back.out(2.0), 0.45 s, then one ring pulse 0→90 px with opacity 0.6→0 over 0.6 s; chip slides 24 px from the left in 0.3 s power3.out and its distance types on at 24 chars/s.
- Exits: chips fade 0.2 s; the finished leg dims to 35 % as the next leg begins.
- Holds and rhythm: each stop holds 1.8–2.5 s after its chip lands; during a route something moves at least every 1.5 s.
- Transitions: one continuous camera move per map sequence (no cuts inside the map); cut to footage on the place name.
- Camera: fly-to moves of 2.0–3.2 s, power2.inOut, zooming out 1–1.5 levels mid-flight, pitch 0→35°, bearing change ≤ 25°; the route head stays inside the central 50 % of the frame.
- Frame rate feel: smooth 30 fps; the camera is set explicitly per frame, never left to a map library's own animation.
- Edit grammar: long map shots (6–12 s) intercut with short location footage (1.5–2.5 s, 2–4 shots per stop: street arrival, façade, view); cuts land on the spoken place name; J-cut so the voice names the next place 0.3–0.5 s before the camera leaves; footage after a flight enters with a 6-frame ramp from 140 % to 100 % speed so it "lands".

## 8. Sound
- Bed: minimal pulse or ambient electronic, 95–110 BPM, −26 LUFS under the voice.
- Effects: a soft low thump per pin landing, a filtered air whoosh along flights that follows camera speed, quiet key ticks while a distance types (max 6).
- Mix: voice first, effects about 18 dB under it; final −14 LUFS integrated, true peak ≤ −1 dBTP (`tools/loudness.sh`).

## 9. Build recipe and checks
- Engine and templates: HyperFrames with SVG projected from an OSM extract (fully deterministic), or MapLibre GL JS (npm, BSD-3) on self-hosted or user-supplied OSM-based vector tiles with the camera set per frame and capture only after the map reports idle; `hyperframes + three.js` with `templates/city-pin-3d` for tilted 3D arrivals, `templates/globe-arcs-3d` for long-distance openers; `word-captions`, `stat-counter`, `cover-still`.
- Signature scenes:
  - Pin drop: map tilted 30°, pin falls 120 px with back.out(2), shadow ellipse scales 0.4→1, one 90 px ring pulse, chip types on at 24 chars/s (new scene).
  - Route draw: path stroke-dashoffset over 2.4 s power1.inOut, camera trails the line head by 0.25 s, travel time counts up beside the destination (`stat-counter`).
  - Distance fan: home pin centred, 3 destinations drop 0.15 s apart, dashed leaders draw 0.5 s each, chips re-sort nearest first (new scene).
  - Arrival push: zoom 14→16.5 over 1.6 s at 45° pitch, buildings extrude 0→height in 0.8 s, hard cut to the façade on the place name (`city-pin-3d`).
- Steps: 1) collect coordinates and real route geometry/times (routing on OSM data or the user's figures); 2) export the extract and style it to the palette; 3) key the camera path per stop; 4) render, then cut footage on place names; 5) `qa-review`.
- Style checks: OSM credit on every map frame; the route never passes under a chip or caption; every distance has a unit and a mode; map labels ≥ 28 px read at 360 px wide.
- Common failures: half-loaded tiles in frames (pre-cache, wait for idle), camera spinning more than 30° (motion sickness), base-map POI clutter (strip POI layers), route lost against bright roads (darken roads).

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of broadcast travel maps and cartographic motion graphics.
