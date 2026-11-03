<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Local Shop Promo

> The real storefront in morning light, opening hours set letter by letter on a felt board, a pin dropping onto an OpenStreetMap street, and two big yellow buttons: Call and Directions.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Business, B2B & local | hyperframes + three.js (map scene); remotion for footage-heavy edits | shops, cafés, salons, workshops, clinics, new openings, local services | low–medium |

## 1. Essence
- In one sentence: make a neighbour want to walk in today, and know exactly how.
- Three adjectives: friendly, local, useful.
- Signature move: white plastic letters drop into the grooves of a black felt board to spell the opening hours, one row at a time.

## 2. Use it for / avoid it for
- Use for: openings, new hours, seasonal offers, "meet the owner", moving to a new address, local events.
- Avoid for: online-only brands, big-chain campaigns. Hours, prices, phone and address come from the owner; photos and footage are of the real shop; reviews only if real, attributed and allowed by the review platform's terms. Maps use OpenStreetMap data with "© OpenStreetMap contributors" visible, or tiles the user supplies; never screenshots of commercial map apps.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #213A2F | shopfront green (fallback field behind cards) |
| ink | #FFFFFF | headlines, letter-board letters |
| accent | #FFC845 | sign yellow: buttons, map pin, "open now" dot |
| felt | #151515 | hours board |
| muted | #B9C4BC | secondary text, map labels |

Rules: yellow only on what the viewer can act on (call, directions, open now). The shop's own brand colours replace the field when a brand kit exists; the accent stays one colour.

## 4. Type
- Display: Barlow Condensed (OFL) 800, 120–150 px, uppercase, tracking 0.01 em.
- Letter board: Barlow Condensed 600, 64 px, uppercase, tracking 0.06 em, fixed character cells of 42 px.
- Body / buttons: Barlow (OFL) 600, 44–52 px.
- Labels: Barlow 500, 26–28 px; map attribution 22 px minimum.
- Language coverage: both have latin-ext on Fontsource; fallback Arial Narrow / system-ui. Use local day abbreviations (Mon / Pzt / Lun).

## 5. Surfaces and texture
- Background: real storefront footage or photo; fallback flat green with static grain 0.05.
- Materials: felt board with groove lines (content, 64 px spacing) and a thin wood frame #8A6A48; pill buttons radius 999 px, 120 px tall, with a 0 6px 0 rgba(0,0,0,.25) press shadow.
- Map: OSM-based vector tiles, muted styling, streets #DCE3DE on #2A4638; 3D blocks from `city-pin-3d` in the same tones.
- Never: drawn grid backdrops, purple gradients, commercial map screenshots, invented star ratings.

## 6. Framing and layout
- 9:16 zones: headline y 260–460; storefront or board y 480–1180; info strip (address, phone) y 1200–1340; buttons y 1380–1500 (Call x 60–500, Directions x 540–920); OSM credit bottom-left y 1520.
- Other formats: 16:9 storefront left, board right; 1:1 board centred with buttons beneath.
- Density: one hero image + one info block; buttons only in the last 5 s.

## 7. Motion
- Entrances: letters drop 30 px into grooves, 0.12 s each, 0.03 s stagger, seeded rotation jitter ±1.5°; buttons rise 60 px, 0.4 s back.out(1.6).
- Exits: board slides down 0.4 s power2.in; footage cuts.
- Holds and rhythm: shop shots 1.5–2.5 s; hours board and the end info card each hold ≥ 3 s so they can be read.
- Transitions: cut on action (door opens, cup set down); one whip pan 0.2 s from street to interior.
- Camera: 5 % push on the storefront; map tilts 0° → 25° over 1.0 s power2.inOut.
- Frame rate feel: footage 30 fps; "open now" dot pulses on a 1 Hz sine computed from time.
- Edit grammar: local spot grammar (15–30 s) — average shot 1.5–2.5 s; cut on action and on product close-ups; owner soundbite 3–5 s with lower-third (name · "owner") in 0.3 s, held 3 s, claims like "since 2009" only if true. Ambient shop sound runs under cuts (L-cut). End on the info card ≥ 3 s with address, hours, phone.

## 8. Sound
- Bed: warm acoustic, light swing or local-flavoured instrumental, 95–115 BPM, −26 LUFS.
- Effects: shop bell on the door cut, felt-letter clicks, button press tick.
- Mix: voice and owner first; ambience at −32 LUFS; final −14 LUFS integrated.

## 9. Build recipe and checks
- Engine and templates: hyperframes; `templates/city-pin-3d` for the location scene, `phone-ui` for a real booking page, `kinetic-title`, `cover-still`; Remotion when the edit is mostly footage.
- Signature scenes:
  - Hours board: letters set row by row (MON–FRI 08–19 / SAT 09–16), one row per 0.6 s, held 3 s.
  - Pin drop: `city-pin-3d` tilts 25°, yellow pin falls 140 px with back.out(2), walking-time label "4 min from the station" (from a real route) types at 24 chars/s, OSM credit visible.
  - Storefront push: photo pushes 5 % while the shop sign is revealed by a soft light sweep 0.8 s.
  - Call / Directions: two pill buttons slide up; a finger tap presses Call (scale 0.94, 0.1 s); phone number types below.
  - Open now: yellow dot pulses next to "Open now · until 19:00" (only when the video states a time it is true for).
- Steps: 1) get hours, address, phone and footage from the owner; 2) build the OSM map and route time; 3) cut footage on action; 4) add board, map, buttons; 5) QA facts and attribution.
- Style checks: hours and phone match the owner's info; OSM credit legible; buttons clear of the right rail (x ≤ 920).
- Common failures: board holds too short to read, map labels in the wrong language, stale hours after a change.

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of felt letter boards, shop signage and local TV adverts.
