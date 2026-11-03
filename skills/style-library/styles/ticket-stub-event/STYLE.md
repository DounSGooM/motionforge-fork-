<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Ticket Stub Event

> The whole promo is one oversized paper ticket: fields for date, door, row and seat fill in like they are being printed, the stub tears along its perforation, and the back shows a small map of the venue.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Music, events & weddings | hyperframes (+ three.js for the venue pin) | single-date events: concerts, comedy nights, theatre, talks, screenings, sports nights at local venues | low |

## 1. Essence
- In one sentence: everything the viewer needs to attend, delivered as the object they will hold at the door.
- Three adjectives: practical, tactile, inviting.
- Signature move: the tear — the stub separates along the perforation in 0.4 s, the main ticket slides up, and the stub drops with the seat number facing camera.

## 2. Use it for / avoid it for
- Use for: one-night events, "tickets on sale now", "last 50 seats", venue reminders, reserved-seating shows, private screenings.
- Avoid for: multi-act bills (use `festival-lineup`), grungy band flyers (use `gig-poster-grunge`), events without fixed date and venue.
- Honesty: ticket fields (date, doors, price, seat categories, remaining count) come from the organiser and match the real sales page; never show a scannable barcode or QR code that is not the real ticket link (use a decorative pattern that cannot scan, or the organiser's real link). Venue map from OpenStreetMap data with "© OpenStreetMap contributors" or the venue's own plan.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #17181C | dark venue field (or blurred venue photo at 35 %) |
| ticket | #F3E7CB | ticket paper |
| ink | #23201C | printed fields on the ticket |
| accent | #1FA5A0 | the ticket's colour band, the field being filled, map pin |
| support | #8C8577 | field labels, perforation dots, secondary map lines |

Rules: the ticket is the only light object on the dark field; the accent band runs down the ticket's left edge (90 px) and marks one live field at a time. Per-event re-skin: swap accent for the event's colour, keep ticket and field logic.

## 4. Type
- Display: Oswald (OFL) 700, 120–170 px, uppercase, tracking 0.02 em — event title on the ticket.
- Fields: Spline Sans Mono (OFL) 600, 56–72 px, uppercase values ("ROW F · SEAT 14").
- Body / captions: Familjen Grotesk (OFL) 600, 46–52 px, sentence case, off-ticket captions.
- Labels: Familjen Grotesk 500, 24 px, uppercase, tracking 0.2 em (field labels "DATE", "DOORS", "PRICE").
- Language coverage: all three ship latin + latin-ext; fallback `"Arial Narrow"`, `"Courier New"`, `system-ui`.

## 5. Surfaces and texture
- Background: dark field with a warm stage spill from the top (radial, #2A2622, 30 %), or a blurred venue photo the organiser owns.
- Materials: thick ticket card (radius 28 px, semicircle notches 36 px at the perforation), perforation of 10 px dots every 22 px, thermal-print fields, a foil holo strip (static, not animated rainbow).
- Texture: paper fibres 0.05 on the ticket; field values print with a 2 % ink unevenness.
- Never: grid backgrounds, purple gradients, fake scannable codes, invented "sold out" or scarcity claims.

## 6. Framing and layout
- 9:16 zones: ticket 900×1480 centred (x 90–990, y 220–1700), rotated −3° → 0° on entry; title band y 300–560; field rows y 640–1240 (2 columns); perforation at y 1300; stub y 1300–1700 with seat and price; captions above the ticket at y 160 or below it in the outro.
- Other formats: 1:1 ticket horizontal (1000×560), stub on the right; 16:9 horizontal ticket with the map on the right third.
- Density: up to 6 fields; one filling at a time.

## 7. Motion
- Entrances: ticket slides up 300 px with `power3.out` 0.5 s and settles from −3° to 0°; each field value prints left to right via clip at 30 chars/s while its accent marker blinks once.
- Exits: the tear — stub rotates 6° and drops 160 px (`power2.in`, 0.4 s); main ticket flips (rotateY 180°, 0.7 s `power2.inOut`) to the map side.
- Holds and rhythm: one field every 0.8–1.2 s; 2 s hold on the completed ticket; 3 s on the map.
- Transitions: flip to the ticket back for the venue map; push-in to a field (1.4×, 0.5 s) for emphasis.
- Camera: slight 2° 3D tilt following a slow seeded drift; static during field printing.
- Frame rate feel: smooth 30 fps; field printing stepped per character.
- Edit grammar: event-trailer grammar — 2–4 s of performer or venue footage up front (shots 0.8–1.5 s, cut on the music's downbeat or on laughs/applause peaks for comedy and theatre), J-cut of the performer's voice under the ticket's entry. Field prints land on beats; the tear lands on the last downbeat before the call to action. One speed ramp max (100 % → 50 %) on a performance moment.

## 8. Sound
- Bed: the performer's cleared music or a light upbeat library track, −24 LUFS under voice.
- Effects: thermal-printer chatter under each field (short, seeded), a paper tear for the stub, a card flip swish.
- Mix: voice first; ducking 7 dB; final −14 LUFS integrated.

## 9. Build recipe and checks
- Engine and templates: HyperFrames; `templates/stat-counter` for remaining-seat counts the organiser confirms, `kinetic-title`, `cover-still` (ticket as thumbnail), `templates/city-pin-3d` for a venue pin in a dense city.
- Signature scenes:
  - ticket print: ticket slides in, fields print one by one with the accent marker hopping row to row.
  - perforation tear: stub separates along the dots, a few paper fibres (seeded, static shapes) trail on the edge.
  - map back: ticket flips; OSM venue snippet (600×600, 300 m radius) with the accent pin dropping 100 px (`back.out(2)`), nearest transit stop labelled.
  - seat finder: a simple seating-block diagram from the venue plan; the chosen section fills accent, row and seat label slide in.
- Steps: 1) get the event facts and the real ticket link; 2) build the ticket front and back; 3) fetch OSM data or the venue plan; 4) time fields to the bed; 5) QA every field against the sales page.
- Style checks: all fields match the organiser's data; no scannable fake codes; OSM credit on the map side; the stub's seat/price readable at 360 px.
- Common failures: too many fields (keep 6), map too detailed (300 m radius, main streets only), ticket edges cut by the safe band (keep 90 px side margins).

## Overrides
None (library copy).

## Credits
Original motionforge style, drawing on the general tradition of printed event tickets and box-office stationery; map data © OpenStreetMap contributors.
