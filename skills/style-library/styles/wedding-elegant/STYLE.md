<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Wedding Elegant

> Ivory stationery in motion: a flowing script name pair, a classic high-contrast serif, fine botanical line art that grows around the frame, and soft gold foil that catches a slow light sweep.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Music, events & weddings | hyperframes | save-the-dates, wedding films' titles and highlights, invitations, anniversaries, venue and planner promos | medium |

## 1. Essence
- In one sentence: the couple's printed invitation, brought gently to life.
- Three adjectives: graceful, warm, timeless.
- Signature move: the vine frame — a single fine botanical line grows around the names in 3 s, and a gold foil sheen sweeps across the script once it is complete.

## 2. Use it for / avoid it for
- Use for: save-the-date reels, invitation videos with RSVP details, ceremony and reception titles, highlight-film chapter cards, venue, florist and planner showcases.
- Avoid for: fast party promos (use `festival-lineup` or `gig-poster-grunge`), corporate events, anything needing dense information.
- Honesty: names, dates, venues and RSVP details exactly as the couple supplies; photos and footage from the couple or their photographer with credit; testimonials for vendors must be real and attributed.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #FAF6EF | ivory stationery |
| ink | #3B3530 | warm charcoal for serif text |
| accent | #B8945A | soft gold: script names, foil sheen, the date |
| support | #E9D5CC | blush wash behind photos and cards |
| line | #A7B39C | sage botanical line art |

Rules: gold appears on the names, the date and the foil sweep only; body text is always ink. Gold foil is a gradient of #B8945A → #E6D3A8 → #B8945A limited to glyph shapes, never a background. Evening variant: background #26302A, ink #F3ECE0, accent #CFAE73, line #7E8C74.

## 4. Type
- Display (names): Pinyon Script (OFL) 400, 150–200 px, title case, tracking 0, ligatures on; the ampersand set in Cormorant Garamond Italic 120 px.
- Body: Cormorant Garamond (OFL) 500, 52–64 px, sentence case, line height 1.35.
- Labels: Cormorant Garamond 600, 30 px, uppercase small caps, tracking 0.24 em ("SATURDAY · 12 SEPTEMBER 2026").
- Language coverage: both ship latin + latin-ext; fallback `"Snell Roundhand", cursive` / `Garamond, Georgia, serif`. Script names with ş, ğ, ć, ż checked at full size; switch to the serif if a glyph looks wrong.

## 5. Surfaces and texture
- Background: ivory cotton paper (static fibres 0.05), deckled edge on card beats, a warm window light from the top-left (6 % lighter).
- Materials: letterpress impression (a 1 px inner shadow on serif text), gold foil, vellum overlays (white at 55 % with 6 px blur behind text on photos), wax-seal shapes in blush.
- Texture: paper only; footage graded warm and soft (+10 warmth, −12 contrast, highlights rolled off).
- Never: grid backgrounds, purple gradients, glitter particles, heavy drop shadows, clip-art rings and doves.

## 6. Framing and layout
- 9:16 zones: names centred y 700–1100 within the vine frame (frame 860×1100, centred at y 900); date y 1180; venue and RSVP y 1300–1480; photo cards 820×1100 with 24 px ivory border.
- Other formats: 1:1 vine frame circular around the names; 16:9 photo left half, stationery right half.
- Density: names + one line of detail per screen; generous margins (≥ 110 px sides).

## 7. Motion
- Entrances: script names write on stroke by stroke over 1.8–2.4 s (`power1.inOut`) via an SVG mask along the pen path; serif text fades in 0.8 s with a 12 px rise (`sine.out`).
- Exits: fade 0.8 s; vellum dissolves over 1.0 s.
- Holds and rhythm: something changes every 3–5 s; the foil sweep runs once per title, 1.4 s, left to right at 20°.
- Transitions: cross-dissolves 0.8–1.2 s; paper turn (rotateY 0 → −90° on the left edge, 0.9 s `power2.inOut`) between chapters.
- Camera: photos push 4 % over 6 s; graphics static.
- Frame rate feel: smooth 30 fps; no stepped motion.
- Edit grammar: wedding-film grammar — average shot length 2.5–4 s in highlights, longer (5–8 s) under vows and speeches. Cuts land on musical phrase ends and emotional beats (a look, a laugh), never on mid-gesture. Vows and speeches play as L-cuts over b-roll; speed ramps only as gentle slow motion (60 % constant) for the entrance, first kiss and first dance. Chapter cards (Ceremony, Dinner, Dance) hold 2.5 s. Lower-thirds are rare: names once, in script, 3 s.

## 8. Sound
- Bed: strings, piano or acoustic covers cleared for use, 60–90 BPM, −22 LUFS under speech, −16 alone.
- Effects: none or a single soft chime on the save-the-date reveal; the vows' natural room sound is kept.
- Mix: voices first (vows, speeches) with gentle noise reduction; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: HyperFrames with SVG line art; `templates/kinetic-title` (write-on mode) for names, `cover-still` for the save-the-date still, `checklist-reveal` (schedule of the day).
- Signature scenes:
  - vine frame: sage line grows around the names in 3 s (path length animation), small leaf pairs appear at 40 % and 70 % of the path.
  - foil sweep: a 160 px bright band crosses the gold script once in 1.4 s, clipped to the glyphs.
  - save the date: names write on, date fades in below, a blush wax seal stamps beside it with `back.out(1.4)` 0.3 s.
  - order of the day: times and events fade in as a list (0.25 s stagger) with a thin gold rule between items.
- Steps: 1) collect names, date, venue, RSVP and photo credits; 2) draw or pick the botanical line art (original or CC0); 3) build title cards; 4) assemble with the music phrases; 5) QA.
- Style checks: every name and date matches the couple's text; script legible at 360 px wide; gold never used for body text.
- Common failures: script too small or too ornate for long names (drop to 150 px or use the serif), foil sweep looping (once only), line art crossing text.

## Overrides
None (library copy).

## Credits
Original motionforge style, drawing on the general tradition of wedding stationery, letterpress printing and botanical line illustration.
