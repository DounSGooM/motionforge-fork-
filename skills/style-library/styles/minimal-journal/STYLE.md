<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Minimal Journal

> A beige page, thin serif lines appearing one at a time, small mounted photographs and long dissolves — like reading someone's diary while they read it aloud.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Creators & personal brands | hyperframes | calm personal stories, reflections, letters, year-in-review, slow essays | low |

## 1. Essence
- In one sentence: quiet, readable, spacious storytelling where the words and a few photographs carry everything.
- Three adjectives: calm, honest, spacious.
- Signature move: a single italic word at the end of a paragraph receives a hand-ruled terracotta underline drawn slowly from left to right.

## 2. Use it for / avoid it for
- Use for: personal essays, lessons learned, letters to a younger self, gratitude posts, memorials, monthly reflections.
- Avoid for: promotions, fast tips, anything with prices or deadlines; videos with no voice-over and long text (it becomes a slideshow).

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #EEE5D3 | warm beige paper |
| ink | #2F2A25 | all text |
| accent | #A65A3A | terracotta: the underline, the date line, one word per page |
| support | #8C8173 | secondary lines, photo captions, page numbers |
| rule | #CDBFA8 | hairline rules and photo borders |

Rules: accent covers under 2 % of the frame. Dark variant for night entries: background #24211D, ink #EEE5D3, same accent.

## 4. Type
- Display: Cormorant Garamond (OFL) 300 / 400 italic, 84–104 px, sentence case, tracking 0.
- Body / captions: Source Serif 4 (OFL) 400, 44–50 px, line-height 1.45, max 34 characters per line.
- Labels: DM Mono (OFL) 400, 24 px, uppercase, tracking 0.2 em (dates, places, page numbers).
- Language coverage: all three ship latin-ext on Fontsource; Cormorant 300 is thin, so never set it below 72 px.

## 5. Surfaces and texture
- Background: flat paper with a static fibre texture (multiply, 6 %) and a warm 10 % vignette.
- Materials: small prints 640 × 800 with a 28 px paper-white mat, 1 px #CDBFA8 border, shadow `0 10px 30px rgba(60,40,20,.18)`, no rotation.
- Texture: hairline rules 1.5 px; no ink bleed, no stains.
- Never: grid or ruled-notebook backgrounds, purple gradients, tape, stickers, anything bouncy.

## 6. Framing and layout
- 9:16 zones: date line y 300; text block left-aligned x 120–960 starting at y 420; photo centred y 520–1320 when present (text moves below to y 1400–1600).
- Margins: 120 px left and right; at most 4 lines of body on screen.
- Other formats: 1:1 text block x 100–980, photo left / text right only in 16:9.
- Density: one idea per page; a photo or a paragraph, rarely both.

## 7. Motion
- Entrances: lines fade in with a 12 px rise, 0.9 s power1.out, 0.35 s stagger; photos fade 1.0 s sine.inOut.
- Exits: the whole page fades 0.8 s; nothing exits on its own.
- Holds and rhythm: each line stays at least until the voice finishes it plus 1.0 s; a new page every 5–8 s.
- Transitions: cross-dissolves of 1.0 s; a hard cut only into a deliberate silent beat.
- Camera: photos push 1.00 → 1.04 over their shot, linear; text never moves.
- Frame rate feel: smooth 30 fps; nothing faster than 0.5 s.
- Edit grammar: average shot 4–7 s; cuts land at sentence ends, never mid-phrase; footage at 100 % or slowed to 50–60 % (shot at 50/60 fps), no ramps; room tone carries 0.5–1 s into the next shot (L-cut); text appears 0.3 s after the voice starts the sentence so reading follows listening.

## 8. Sound
- Bed: solo piano or soft guitar, 60–75 BPM, −28 LUFS under voice; silence is allowed.
- Effects: a soft page turn at −32 LUFS on chapter changes only.
- Mix: close, warm voice, gentle compression; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: HyperFrames; `templates/kinetic-title` slowed to the timings above, `templates/cover-still` for the end page; page and print scenes are new scenes.
- Signature scenes:
  - page line: 3–4 lines of Source Serif appear one by one; the last word in Cormorant italic gets a 1.5 px terracotta underline drawn in 0.8 s power2.inOut.
  - mounted print: photo with mat fades in 1.0 s, pushes 4 % over 5 s; a DM Mono caption ("Kadıköy, 06:40") fades in 0.6 s later.
  - date header: DM Mono date in terracotta and a hairline rule drawing 0 → 600 px in 1.2 s power2.inOut.
  - closing blank: the page empties to paper for 1.5 s, then one italic line fades in and holds 3 s.
- Steps: 1) write the text as short paragraphs; 2) record the voice slowly (about 140 wpm); 3) build pages to word timings; 4) add photos the user owns; 5) mix, QA.
- Style checks: body text ≥ 44 px reads at 360 px wide; no line longer than 34 characters; accent once per page.
- Common failures: pages too full (split them); thin serif shimmering on phones (use 400 weight below 90 px).

## Overrides
None in the library copy.

## Credits
Original motionforge style, drawing on the general tradition of literary book typography and handwritten-era personal journals.
