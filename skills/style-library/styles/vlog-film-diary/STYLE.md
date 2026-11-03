<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Vlog Film Diary

> A day told in warm, slightly faded footage: an orange LED date stamp in the corner, handwritten time-of-day notes, and moments that freeze into bordered snapshots with a shutter click.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Creators & personal brands | remotion (edit) + hyperframes (overlays) | daily vlogs, travel days, "a day in my life", weekly recaps | medium |

## 1. Essence
- In one sentence: the viewer flips through someone's day as if it had been shot on a pocket film camera and annotated by hand that evening.
- Three adjectives: warm, intimate, unhurried-but-moving.
- Signature move: the snapshot freeze — a moving shot stops on a white flash, shrinks into a bordered print and tilts −3° while the date stamp glows in the corner.

## 2. Use it for / avoid it for
- Use for: day-in-the-life, travel days, studio or kitchen routines, behind-the-scenes, monthly recaps.
- Avoid for: product launches and tutorials that need crisp neutral colour; news or anything time-critical where a nostalgic grade reads as staged.
- Honesty: the date stamp shows the real recording date from the clip metadata; never back-date or invent a date.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #1C1611 | warm near-black for title cards and the lifted blacks of the grade |
| paper | #F4E9D8 | cream note cards and snapshot borders |
| ink | #FFF3E0 | captions on footage |
| accent | #FF8A1F | the LED date stamp and the one circled word in a note |
| support | #C7A27C | muted tan for secondary labels, tape strips, chapter numbers |

Rules: the accent appears only in the date stamp and at most one handwritten mark per scene. Note text on paper uses #1C1611. No cold blues added in the grade.

## 4. Type
- Display / notes: Caveat (OFL) 600, 84–110 px, sentence case, tracking 0; reads as a pen note, never as a headline.
- Date stamp: VT323 (OFL) 400, 54 px, digits spaced 0.08 em, `#FF8A1F` with a 6 px outer glow at 60 %.
- Captions: Nunito Sans (OFL) 700, 50–56 px, 3–5 words per chunk, 2 px soft shadow `rgba(28,22,17,.55)`.
- Language coverage: all three ship latin-ext on Fontsource; check ı/İ/ş in Caveat at 84 px, fall back to Patrick Hand (OFL) if a glyph looks off.

## 5. Surfaces and texture
- Background: the footage itself. Grade: blacks lifted to #1C1611, highlights rolled to cream, saturation −10 %, temperature +8, a soft halation (highlights blurred 18 px, orange tint, screen at 20 %).
- Materials: cream paper cards, white-bordered prints (24 px sides, 36 px bottom), translucent tan tape.
- Texture: static film grain at 0.12 opacity, 2 px grain size; vignette 18 %; prints cast `0 18px 40px rgba(0,0,0,.35)`.
- Never: grid or graph-paper backgrounds, purple gradients, fake scratches over every shot, animated noise.

## 6. Framing and layout
- 9:16 zones: footage full bleed; date stamp bottom-right at x 760–1000, y 1560–1610; notes y 300–620 left-aligned from x 90; captions y 1300–1480 centred.
- Snapshot frames: 840 × 1050 print centred at y 960, rotated −3° to +3°.
- Other formats: 1:1 — stamp at x 780, y 980; 16:9 — notes in the left third, stamp bottom-right 60 px in.
- Density: footage + one note or one print + captions; never two notes at once.

## 7. Motion
- Entrances: notes write on with a left-to-right clip-path wipe 0.6 s power1.inOut; cards slide up 120 px, 0.4 s power2.out.
- Exits: cards drop 60 px and fade 0.25 s power2.in; stamps never animate out mid-scene.
- Holds and rhythm: a note holds 1.6–2.2 s; a new visual idea every 1.5–3 s.
- Transitions: straight cuts; a 2-frame white flash only on snapshot freezes; one time-lapse per video to jump hours.
- Camera: footage is handheld, so overlays carry a tiny seeded drift (±4 px, ±0.3°, 3 s period) to sit inside the shot.
- Frame rate feel: 30 fps (or 24 fps footage conformed), overlays on ones.
- Edit grammar: average shot 1.2–2.0 s in montage, 3–5 s when talking to camera; jump cuts remove pauses over 0.25 s in selfie speech; cut on action (door opening, cup lifting) at the gesture's midpoint; J-cuts bring location sound in 6–10 frames before the picture; speed ramps 100 → 400 → 100 % on walks with an 8-frame ease; time-of-day cards mark chapters.

## 8. Sound
- Bed: acoustic or lo-fi, 80–95 BPM, −26 LUFS under voice, up to −18 LUFS in voiceless montages.
- Effects: shutter click on freezes, a soft pen scratch on notes, real ambience kept at about −30 LUFS under montage.
- Mix: voice first, music ducks 6 dB under speech; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: Remotion for the footage edit and grade; HyperFrames overlays from `templates/word-captions` (Nunito Sans) and `templates/cover-still`; notes, stamp and prints are new scenes.
- Signature scenes:
  - date-stamp open: first shot carries the stamp `15 10 26` typing on at 18 chars/s in VT323 with glow; hook line in Caveat at y 360 from frame 0.
  - snapshot freeze: 2-frame white flash at 40 %, shutter click, the frame scales to 78 % with a cream border, rotates −3° with back.out(1.4) over 0.45 s, holds 1.2 s.
  - time-of-day chapter: cream card 760 × 300 slides up, "07:42 · coffee first" writes on in 0.6 s, tan chapter number in the corner, holds 1.8 s.
  - film strip recap: 4–6 frames of the day in a vertical strip with sprocket holes scroll up at 300 px/s; the last frame pulls out to full screen 0.5 s power3.inOut.
- Steps: 1) pull recording dates from metadata; 2) grade all clips with one LUT; 3) cut picture to the voice; 4) add notes, stamps and freezes; 5) captions, mix, QA.
- Style checks: stamp dates match the clips; grain identical across frames; the accent appears only in stamp + one mark.
- Common failures: grade turns skin orange (pull saturation in reds −8); notes too long to read in the hold (max 6 words).

## Overrides
None in the library copy.

## Credits
Original motionforge style, drawing on the general tradition of consumer film snapshots and handwritten travel diaries.
