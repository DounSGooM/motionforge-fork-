<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Gig Poster Grunge

> A photocopied show flyer come to life: toner-black slab type, torn paper edges, a day-glo sticker strip, and the date stamped down hard like it was done at the venue door.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Music, events & weddings | canvas (or hyperframes with blend modes) | club nights, small-venue shows, band tours, open mics, DIY event promos | medium |

## 1. Essence
- In one sentence: a show you would hear about from a flyer on a lamppost, with the rawness kept and the information still crystal clear.
- Three adjectives: raw, loud, local.
- Signature move: the date stamp — the show date lands in a rough rectangle stamp, one frame of heavy toner smear before it settles, while the flyer jumps 6 px like it was slammed on a copier.

## 2. Use it for / avoid it for
- Use for: gig announcements, tour date lists, line-up changes, "tickets on the door", rehearsal or studio diaries, record-shop events.
- Avoid for: weddings and formal galas (use `wedding-elegant`), big festival bills with many tiers (use `festival-lineup`), seated theatre events.
- Honesty: band photos and logos only from the band or promoter; venue name, date, door time and price come from the promoter and are checked against the ticket link. No fake "sold out" stickers.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #D9D3C5 | photocopy paper, slightly grey and uneven |
| ink | #121212 | toner black for type, photos, stamps |
| accent | #F4E409 | day-glo sticker strip behind the date or the ticket line |
| support | #8A8579 | grey toner tints, faded second-generation copies |

Rules: two-colour logic — everything is toner black on paper except one day-glo strip per frame. Photos are converted to high-contrast toner (threshold + 18 % noise), never full colour. Dark variant: background #121212, ink #D9D3C5, same accent.

## 4. Type
- Display: Alfa Slab One (OFL) 400, 150–260 px, uppercase, tracking −0.01 em, set tight and cropped by the frame edge when it helps.
- Body / captions: Archivo Narrow (OFL) 700, 52–60 px, uppercase, tracking 0.02 em.
- Labels and stamps: Sometype Mono (OFL) 700, 34–44 px, uppercase ("FRI 14.11 · DOORS 20:00 · £8").
- Language coverage: all three ship latin + latin-ext; fallback `Rockwell, "Courier New", serif`. Toner effects must never break diacritics; check İ, ş, ł after the threshold pass.

## 5. Surfaces and texture
- Background: photocopy paper with uneven toner fog (static, seeded), dark copier-lid edges along one side, staple holes.
- Materials: torn paper strips (seeded jagged edges, 6–12 px fibres), masking tape, a rubber date stamp, a day-glo sticker strip with rounded corners.
- Texture: toner speckle 0.15, a 2-px horizontal streak every ~300 px (fixed), slight edge bleed on type (0.6 px blur + threshold).
- Never: grid backgrounds, purple gradients, glossy 3D, smooth gradients, animated grain (static only, swap texture plates on cuts).

## 6. Framing and layout
- 9:16 zones: band or night name y 220–700 (may bleed off the left edge); photo block y 700–1260 (torn edges); date stamp y 1280–1440; venue and price y 1460–1580; ticket line on the day-glo strip y 1620.
- Other formats: 1:1 name across the top, photo below, stamp overlapping the photo's corner; 16:9 photo left half, text stack right half.
- Density: 3–4 blocks max; information hierarchy is name → date → venue → price.

## 7. Motion
- Entrances: paper pieces slam in from 2–4 % off-screen in 3 frames with no easing, then a 6 px copier jump (2 frames); stamp drops in 2 frames and smears for 1.
- Exits: torn off — a paper strip rips away along a seeded jagged path in 0.25 s (`power2.in`).
- Holds and rhythm: a new block every 0.5–1 bar; 2 s held flyer at the end with no motion so it can be screenshotted.
- Transitions: hard cuts with a 1-frame white copier flash; "re-copy" cut (the frame scales 0.97 and darkens 10 % like a second-generation copy).
- Camera: static, or a handheld 1–2 px seeded wobble at 12 fps.
- Frame rate feel: stepped 12 fps for paper moves and texture swaps, 30 fps for footage.
- Edit grammar: punk-flyer grammar — average shot length 0.4–0.8 s on rehearsal or live footage, cut on snare hits and downbeats, jump cuts within the same angle allowed. Footage is thresholded to toner at 12 fps. No speed ramps; a 4-frame stutter repeat on the drop. The date stamp always lands on a downbeat. Info stays up 2 s minimum, however fast the cuts behind it.

## 8. Sound
- Bed: the band's own track or rehearsal recording (with rights), loud; if voice-over, −20 LUFS under it.
- Effects: copier whirr and clunk for re-copy cuts, a hard rubber thud for the date stamp, paper rip for exits.
- Mix: music first; voice, if any, compressed and slightly lo-fi (band-pass 200 Hz–6 kHz); final −14 LUFS integrated.

## 9. Build recipe and checks
- Engine and templates: canvas engine for toner/threshold and torn edges (seeded); `templates/kinetic-title` for the name slam, `cover-still` for the final flyer frame.
- Signature scenes:
  - date stamp: rough rectangle stamp with Sometype Mono date drops in 2 frames, smears, settles at −3°.
  - toner photo: band photo thresholds from 0 to full toner in 6 frames, torn strip edges reveal it.
  - tour list: dates tear in one by one (80 ms apart) as strips; sold-out dates get a real "SOLD OUT" only if the promoter confirms.
  - flyer lockup: all blocks settle into the final flyer, day-glo strip slaps on last, 2 s still.
- Steps: 1) collect band/venue facts and media from the promoter; 2) prepare toner versions of photos; 3) build the flyer as layers; 4) animate to the track's beat grid; 5) QA readability.
- Style checks: date, venue and price readable at 360 px wide on the final still; one day-glo element per frame; texture swaps only on cuts.
- Common failures: grunge eating the date (keep info on clean paper), photos too grey after threshold (raise contrast first), too many fonts (only the three above).

## Overrides
None (library copy).

## Credits
Original motionforge style, drawing on the general tradition of photocopied DIY show flyers and small-press zines.
