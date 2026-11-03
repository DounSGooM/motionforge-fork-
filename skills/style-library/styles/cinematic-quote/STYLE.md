<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Cinematic Quote

> Footage inside a widescreen band between black bars, a slow push, a large serif quote set in the lower bar line by line, and a warm light leak drifting across at each new line.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Creators & personal brands | hyperframes (remotion for long footage) | quotes, mottos, short reflections, book lines, motivational openers | low |

## 1. Essence
- In one sentence: one sentence worth remembering, framed like the last shot of a film.
- Three adjectives: weighty, warm, slow.
- Signature move: the letterbox close — a full-frame shot is squeezed by two black bars into a widescreen band in the first second, and the quote's first line is already waiting in the lower bar.

## 2. Use it for / avoid it for
- Use for: quotes the user wrote or can source, book passages, founder mottos, anniversary lines, openers for longer essays.
- Avoid for: lists, tips, prices, any content that needs more than ~25 words on screen.
- Honesty: quotes from other people need a primary source (book and page, speech and date). If none exists, label it "attributed to" or drop it; never pair a famous name with an unverified line.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #070707 | letterbox bars and end titles |
| ink | #F3EEE4 | quote text |
| accent | #F2B46D | warm amber: light leaks, quote marks, the attribution hairline |
| support | #8E8679 | attribution text, chapter label |
| leak-edge | #C4562E | the deep outer edge of light leaks only, never on type |

Rules: the accent is light, not paint — it lives in the leak and two thin marks. Footage graded warm with blacks at #0D0C0B so the bars read as a deliberate frame.

## 4. Type
- Display / quote: Playfair Display (OFL) 400 and italic, 72–96 px, line-height 1.15, max 4 lines and ~22 characters per line.
- Attribution: Jost (OFL) 500, 26–30 px, uppercase, tracking 0.3 em.
- Chapter label: Jost 400, 24 px, uppercase, tracking 0.4 em, in the top bar.
- Language coverage: both ship latin-ext; check curly quotes „ " « » for the video's language.

## 5. Surfaces and texture
- Background: black bars with footage in a 1.85:1 band; grade: −15 % saturation, warm highlights, lifted blacks.
- Materials: light leaks are deterministic radial gradients (amber core, red edge) on screen blend, peak 0.55, inside the band only.
- Texture: static grain 0.10 across band and bars, faint 6 % vignette inside the band.
- Never: grid backgrounds, purple gradients, fake film burns that hide faces, animated dust.

## 6. Framing and layout
- 9:16 zones: picture band 1080 × 584 at y 380–964; quote block y 1040–1560 left-aligned at x 100; attribution y 1600–1640; chapter label y 260.
- Other formats: 16:9 band full width with 2.39:1 crop, quote over the lower third on a 40 % black gradient; 1:1 band y 120–704, quote below.
- Density: band + up to 4 quote lines + one attribution; nothing else.

## 7. Motion
- Entrances: quote lines fade in while tracking closes 0.04 em → 0 over 1.2 s power2.out, 0.6 s stagger.
- Exits: the quote fades 0.8 s; a 0.5 s dip to black before the final line.
- Holds and rhythm: each line holds until 1.5 s after it is spoken; a full quote takes 6–12 s.
- Transitions: dissolves of 12–18 frames between shots; leaks pass across cuts to hide them.
- Camera: slow push 1.00 → 1.08 over 6–8 s, sine.inOut; no shake.
- Frame rate feel: 24 fps footage conformed to 30, overlays on ones.
- Edit grammar: average shot 3–6 s; cuts on the end of a quote line or on the musical downbeat; footage slowed to 40–60 %; one speed ramp per video (100 → 40 %) into the key image; the music swell enters 0.5 s before the picture change (J-cut).

## 8. Sound
- Bed: strings, piano or ambient swell, 70–90 BPM, −24 LUFS under voice, −16 LUFS when there is no voice.
- Effects: low sub hit (≈ 50 Hz) on the letterbox close at −20 LUFS; soft air on leaks.
- Mix: voice intimate and dry; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: HyperFrames with `templates/kinetic-title` (slowed) for the quote and `templates/cover-still` for the end title; letterbox and leaks are new scenes; Remotion if the footage edit is long.
- Signature scenes:
  - letterbox close: bars slide in from top and bottom over 0.8 s power3.inOut; the first quote line is visible from frame 0 for the hook.
  - quote build: lines arrive one by one with the tracking close; the key phrase switches to italic as it is spoken.
  - leak pass: amber leak crosses the band left to right in 1.2–1.6 s on each new line, peak 0.55.
  - attribution card: amber hairline draws 0 → 160 px in 0.6 s, name and source (book, year) fade in under it.
  - end title: black frame, Playfair 110 px title fades in 1.2 s, holds 2 s.
- Steps: 1) verify the quote and source; 2) choose 2–4 shots the user owns or licensed; 3) grade and letterbox; 4) quote and leak timing to the voice; 5) mix, QA.
- Style checks: no text inside the picture band; leak never crosses the quote; quote spelled exactly as sourced.
- Common failures: lines too long for the bar (rebreak at 22 characters); leaks too bright (keep peak ≤ 0.55).

## Overrides
None in the library copy.

## Credits
Original motionforge style, drawing on the general tradition of widescreen film title cards and analogue light leaks.
