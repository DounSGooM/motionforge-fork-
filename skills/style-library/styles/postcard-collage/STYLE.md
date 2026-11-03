<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Postcard Collage

> A kraft-paper desk where postcards, instant photos and ticket stubs are laid down by hand, held with washi tape, and annotated in blue ballpoint.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Travel & hospitality | hyperframes | city guides, weekend trips, hotel and café recommendations, personal travel diaries | medium |

## 1. Essence
- In one sentence: a friend's travel scrapbook being made in front of you, one keepsake at a time.
- Three adjectives: personal, handmade, sunny.
- Signature move: the drop-and-tape — a photo card falls onto the desk with a slight spin, settles at −4° to 6°, and a strip of washi tape slaps across one corner 4 frames later.

## 2. Use it for / avoid it for
- Use for: "where to eat in X", favourite spots lists, boutique hotel or guesthouse features, weekend-trip diaries, local-host recommendations.
- Avoid for: route logistics (use `route-journey`), corporate hospitality ads needing a strict grid, time-critical deals.
- Honesty: photos are the user's own or licensed (recorded in `assets/CREDITS.md`); venue names, prices and opening hours come from the user. Reviews or quotes on cards are real and attributed.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #C8AC83 | kraft-paper desk |
| card | #FBF7EE | postcard and photo borders |
| ink | #2A2522 | printed text on cards |
| accent | #2C4FA3 | ballpoint handwriting, circled picks, arrows |
| tape | #EADFAF | washi tape (support), printed with a faint dot motif |
| support | #C46A5A | faded red for postmarks and a second tape colour |

Rules: blue ballpoint is the only pointing colour; it marks the pick, never decorates. Photos keep their own colours but get a warm grade (+8 warmth, −5 saturation, lifted blacks to #2A2520).

## 4. Type
- Display: Abril Fatface (OFL) 400, 120–170 px, title case, set as old postcard greetings ("Greetings from Lisbon"), with a 6 px card-colour outline over photos.
- Handwriting: Caveat (OFL) 600, 64–80 px, in accent blue, baseline wobble ±3 px (seeded per word).
- Body / labels: Karla (OFL) 600, 34–40 px, sentence case; prices and hours in Karla 700 with tabular figures.
- Language coverage: all three ship latin + latin-ext; fallback `Georgia` / `cursive` / `system-ui`. Check Caveat's ş and ğ at 64 px.

## 5. Surfaces and texture
- Background: kraft paper with fibres (static, 0.08) and a warm top-right sun patch (10 % lighter); or a blurred real desk photo from the trip.
- Materials: postcards (4 px rounded corners, 18 px white border), instant-film photos (bottom border 3× the side), ticket stubs, washi tape with torn ends (seeded jagged edge), paper clips.
- Shadows: cards cast a soft 0 10 24 rgba(42,37,34,0.25) shadow; tape casts none.
- Never: grid backgrounds, purple gradients, glossy UI cards, clip-art suitcases and planes.

## 6. Framing and layout
- 9:16 zones: greeting title y 240–520; hero photo card 760×920 centred around y 1000; 1–2 smaller cards overlapping its edges; handwritten note y 1460–1560; captions inside a paper slip y 1600.
- Other formats: 1:1 hero card centred, notes at the corners; 16:9 three cards across like a desk spread.
- Density: up to 4 objects on the desk; older ones slide off as new ones arrive.

## 7. Motion
- Entrances: card drops from scale 1.12, opacity 0, rotation ±14° to its seeded rest angle in 0.35 s (`back.out(1.4)`); tape strip scales 0 → 1 along its length in 0.12 s; handwriting writes on stroke by stroke at 18 chars/s via clip mask.
- Exits: cards slide off the edge 600 px in 0.4 s (`power2.in`) with a 6° extra spin.
- Holds and rhythm: a new object every 1.5–2.5 s; 3 s holds on the hero photo with a 4 % push.
- Transitions: desk slides as one layer (a 1080 px pan, 0.6 s `power3.inOut`) to a fresh area of desk; or a hand-lift cut.
- Camera: overhead, slight 2–3 % drift toward the newest card.
- Frame rate feel: 30 fps for cards; handwriting at 30 fps, stop-motion jitter off.
- Edit grammar: average shot length 2–3 s; cuts land on the voice naming each place. Footage clips play inside a postcard frame (never full-bleed) at 1.5–2.5 s, cut on action (a pour, a step, a door opening). L-cuts let ambient sound from the place run 0.5 s under the next card drop. No speed ramps; one 0.5 s freeze-frame that "prints" into an instant photo per video.

## 8. Sound
- Bed: acoustic guitar, ukulele or lo-fi, 85–100 BPM, −25 LUFS under voice.
- Effects: paper tap for each card drop, tape rip (2 seeded variants), ballpoint scratch under handwriting at −30 dB, instant-camera whirr for the freeze-print.
- Mix: voice first; ducking 6 dB; final −14 LUFS integrated.

## 9. Build recipe and checks
- Engine and templates: HyperFrames; `templates/kinetic-title` for the greeting, `checklist-reveal` (hand-ticked list variant), `word-captions`, `cover-still` for a desk-flatlay thumbnail.
- Signature scenes:
  - drop-and-tape: card falls, settles at the seeded angle, tape slaps a corner, shadow tightens.
  - ballpoint circle: a hand-drawn ellipse (3 px, accent) circles the pick on a card in 0.5 s, a short note writes on beside it.
  - instant print: footage freezes, white border grows around it in 0.3 s, it shrinks into an instant photo and drops onto the desk.
  - ticket strip: 3 stubs fan out with 80 ms stagger, each showing a price or time from the user.
- Steps: 1) gather places, photos and facts from the user; 2) seed angles and positions; 3) build objects; 4) assemble by the voice; 5) QA.
- Style checks: no two consecutive cards at the same angle; handwriting legible at 360 px wide; every price/time matches the user's data.
- Common failures: desk cluttered (max 4 objects), handwriting too small (≥ 64 px), tape covering faces (place on corners only).

## Overrides
None (library copy).

## Credits
Original motionforge style, drawing on the general tradition of travel scrapbooks, picture postcards and instant photography.
