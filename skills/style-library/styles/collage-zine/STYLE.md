<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Collage Zine

> Scissor-cut photo fragments glued onto grey photocopy paper, headlines assembled from mismatched cut-out letters, and one blue marker scrawl that says what matters.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Art direction & design looks | canvas (or hyperframes with SVG masks) | opinion and culture essays, manifestos, local scene stories, book and art promos, activism with the user's own material | medium |

## 1. Essence
- In one sentence: an argument built by hand, piece by piece, out of found images.
- Three adjectives: cut-up, opinionated, handmade.
- Signature move: the ransom headline — each letter of a word is a separate scrap with its own face, size and paper colour, and they drop in one by one on the syllables.

## 2. Use it for / avoid it for
- Use for: video essays, cultural commentary, "why X matters" opinion pieces, zine and book launches, community and grassroots stories, art-school projects.
- Avoid for: event logistics (use `gig-poster-grunge` for shows), product launches needing polish, sad or traumatic stories where cut-up faces would feel disrespectful.
- Honesty: photo scraps come from the user's own photos, public-domain or CC0 archives, or licensed images — listed in `assets/CREDITS.md`; never cut up a copyrighted magazine scan or a recognisable person without the right to use the image. Quotes on scraps are real and attributed.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #E2DFD8 | grey photocopy paper |
| ink | #101010 | toner black: body, outlines, halftone photos |
| accent | #1E50FF | blue marker: the scrawl, circles, arrows, one key word |
| support | #F2EFE9 | white paper scraps behind letters |
| toner | #9C9890 | second-generation grey copies, shadows of scraps |

Rules: photos are mostly black-and-white halftone; at most one full-colour scrap per frame. The blue marker is the only colour that points. Letters may be cut from coloured paper scraps taken from the photos themselves (sampled, desaturated 40 %).

## 4. Type
- Ransom letters: a seeded pool of five faces — Yeseva One, Rubik Mono One, Abril Fatface, Anton, Sometype Mono (all OFL) — 110–190 px, each letter rotated −8° to 8°, on its own scrap with a 6–14 px paper margin.
- Body / captions: Instrument Sans (OFL) 600, 44–50 px, on white strips like typed labels.
- Marker: a hand-drawn path (not a font) for scrawls; short words written as SVG strokes drawn by the user or the agent.
- Language coverage: all faces ship latin + latin-ext; the seed must pick a face that contains each glyph (check İ, ş, ğ per letter); fallback `Georgia` / `system-ui`.

## 5. Surfaces and texture
- Background: grey photocopy paper with toner fog, a dark copier-lid border on one edge, and a fold line at y 960 (static).
- Materials: scissor-cut scraps (seeded polygon edges, 3–7 straight cuts each), torn edges on some, glue stick sheen (2 % highlight), staples, a strip of clear tape with a dust speckle.
- Texture: halftone dots on photos (8 px cells, 45°), toner speckle 0.12, slight drop shadow under scraps (0 4 8 rgba(0,0,0,0.25)).
- Never: grid backgrounds, purple gradients, digital gloss, smooth vector illustrations.

## 6. Framing and layout
- 9:16 zones: ransom headline y 240–620; photo collage y 640–1360 (3–5 overlapping scraps); typed caption strips y 1400–1560; marker scrawls anywhere except over faces.
- Other formats: 1:1 headline across the top half; 16:9 collage left, headline right.
- Density: one headline, up to 5 scraps, one scrawl per frame.

## 7. Motion
- Entrances: scraps drop from 1.15 scale with a ±10° spin to their rest angle in 4 frames (stepped, no easing), then a 1-frame settle; ransom letters arrive one per syllable; marker strokes draw at 900 px/s.
- Exits: scraps peel up (rotateX 0 → 60°, 0.2 s) or get swept off by the next sheet.
- Holds and rhythm: a new piece every 0.4–0.8 s; full collage held 1.5 s before the sweep.
- Transitions: "new page" — a fresh photocopy sheet slides over from the bottom in 0.3 s; scissors-cut wipe along a jagged line (0.25 s).
- Camera: static, with a stop-motion 1–2 px seeded jitter on held frames at 12 fps.
- Frame rate feel: stepped 12 fps for all collage motion; footage inside scraps at 12 fps too.
- Edit grammar: video-essay grammar in stop-motion — average shot (page) length 2–4 s, inner beats 0.4–0.8 s; cuts land on the voice's stressed words and clause ends. Archive footage is cut into scrap shapes and plays at 12 fps, 1–2 s per clip, with jump cuts allowed. No speed ramps; a 3-frame repeat stutter for emphasis once per minute. Speaker names appear on typed strips taped in for 2.5 s.

## 8. Sound
- Bed: lo-fi breakbeat, post-punk instrumental or tape-saturated ambient, 85–110 BPM, −25 LUFS under voice.
- Effects: scissor snip for cuts, paper drop taps (4 seeded variants), marker squeak under scrawls, copier whirr on page changes.
- Mix: voice first, slightly warm; final −14 LUFS integrated.

## 9. Build recipe and checks
- Engine and templates: canvas engine for seeded cut shapes, halftone and stepped timing; `templates/kinetic-title` (ransom mode), `word-captions` (typed strip mode), `cover-still`.
- Signature scenes:
  - ransom headline: letters arrive per syllable, each on its own scrap with a seeded face, size and angle.
  - cut-out reveal: a halftone photo scrap slides in, then a second scrap cuts a window into it to reveal a colour detail underneath.
  - marker verdict: blue marker circles one scrap and writes a 1–3 word verdict beside it.
  - page sweep: the collage is pushed off by a new photocopy sheet with toner fog.
- Steps: 1) gather images and their licences; 2) cut scraps with seeded polygons; 3) assemble ransom words with glyph-checked faces; 4) time to the voice; 5) legibility and licence QA.
- Style checks: every ransom word readable at 360 px (no more than 8 letters); marker never over a face; every scrap's source in CREDITS.
- Common failures: ransom letters too varied to read (limit to 3 faces per word), collage too busy behind captions, seeds changing between renders (fix the seed per scene).

## Overrides
None (library copy).

## Credits
Original motionforge style, drawing on the general tradition of cut-and-paste collage, photocopied zines and ransom-note lettering.
