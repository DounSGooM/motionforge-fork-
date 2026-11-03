<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Wellness Sage

> Sand-coloured paper light, a sage circle that swells and settles at breathing pace, a soft optical serif, and fades so slow you only notice them afterwards.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Fitness, health & wellness | hyperframes | breathing exercises, yoga and mobility flows, sleep and stress routines, studio promos | low |

## 1. Essence
- In one sentence: the video lowers the viewer's pace before it says anything.
- Three adjectives: unhurried, warm, grounded.
- Signature move: the breath circle — a sage disc that grows from 360 to 620 px over a 4 s inhale and shrinks over a 6 s exhale, with "in" and "out" written beneath in a light serif.

## 2. Use it for / avoid it for
- Use for: guided breathing (box, 4-7-8, physiological sigh), stretch and mobility sequences, morning/evening routines, retreat and studio promos, mindful-habit tips.
- Avoid for: fast hype, sales countdowns, clinical facts with figures (use `clinic-clean`), anything where a slow pace hides missing content.
- Honesty: no health claims ("cures anxiety", "detox"); benefits are phrased as the user's experience or cited. Breathing counts follow the method the user names.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #EEE7DA | sand paper field |
| ink | #33402F | deep moss text and line art |
| accent | #7F9B76 | breath circle, active step, progress thread |
| support | #C99A7A | clay — secondary shapes, held-breath ring |
| mist | #DCE3D4 | card fills, inactive dots |

Rules: accent is a shape colour, never body text (contrast too low); text is always ink. Accent + support together cover at most 25 % of the frame. Dusk variant for sleep content: background #2C3328, ink #EEE7DA, accent #9DB794, support #B98A6C.

## 4. Type
- Display: Fraunces (OFL) 300, optical size 144, soft axis 100, 96–120 px, sentence case, tracking −0.01 em.
- Body / captions: Nunito Sans (OFL) 500, 46–52 px, sentence case, max 6 words per line, one line at a time.
- Labels: DM Mono (OFL) 400, 28 px, lowercase, tracking 0.08 em ("inhale · 4").
- Language coverage: all three ship latin + latin-ext; fallback `Georgia, serif` / `system-ui`.

## 5. Surfaces and texture
- Background: sand field with a warm top-left window light (radial, 8 % lighter), static paper grain 0.06, very soft vignette (6 %).
- Materials: linen and paper, single-line botanical drawings (2 px moss strokes, round caps), real footage of the user moving in soft daylight.
- Texture: paper grain only; footage gets a +6 warmth, −10 contrast grade with lifted blacks (#2A2F27).
- Never: grid backgrounds, purple gradients, neon, hard shadows, lens flares, stock "zen stones" clichés.

## 6. Framing and layout
- 9:16 zones: title y 300–520; breath circle centred at y 940; cue word y 1330; caption y 1480–1540. Footage beats: full-bleed with a 30 % sand veil only behind the caption.
- Other formats: 1:1 circle centred at 52 % height; 16:9 circle left third, footage right two thirds.
- Density: one idea per screen; often just the circle and one word.

## 7. Motion
- Entrances: fade 0 → 1 over 1.2 s (`sine.inOut`) with an 18 px rise; line drawings draw on at 220 px/s.
- Exits: fade over 1.0 s; nothing ever slides out sideways.
- Holds and rhythm: something changes every 4–8 s; the breath circle scales on `sine.inOut` exactly to the counted seconds; holds are true stillness (no drift).
- Transitions: cross-dissolves 1.0–1.5 s; dip-to-sand (0.8 s) between chapters.
- Camera: footage pushes 3 % over 8 s; graphics static.
- Frame rate feel: smooth 30 fps; no stepped motion.
- Edit grammar: average shot length 5–8 s; cuts land on the end of an exhale or the completion of a movement, never mid-pose. Prefer dissolves over cuts between poses; L-cuts let the guiding voice carry over 1–2 s into the next shot. No speed ramps; slow motion only at a constant 50 % for one demonstrative transition per video. Lower-thirds (instructor name, pose name) fade in after the pose is reached and hold 3 s.

## 8. Sound
- Bed: ambient pads, felt piano or field recordings (birds, soft room tone), 60–70 BPM or free time, −26 LUFS under voice.
- Effects: a soft singing-bowl tone (or a single felt-piano note) at the start of each breathing round; no whooshes.
- Mix: voice close, warm and unhurried; bed ducked 6 dB with a 400 ms release; final −16 LUFS integrated (calmer than default) unless the platform needs −14.

## 9. Build recipe and checks
- Engine and templates: HyperFrames; `templates/kinetic-title` (with slow presets), `word-captions` (one-line mode), `checklist-reveal` for routine overviews.
- Signature scenes:
  - breath circle: disc scales 360 → 620 px on inhale (4 s), holds, 620 → 360 px on exhale (6 s); a clay ring 8 px wide traces the hold; round counter "2 / 5" in DM Mono.
  - pose card: footage in a 900×1200 rounded card (radius 48 px), pose name in Fraunces under it, hold-timer thread (2 px) draws along the card's bottom edge.
  - line bloom: a single botanical stroke draws in 2.5 s behind the title, then stays still.
  - routine path: 5 steps on a curved moss thread; the active step fills sage, others stay mist.
- Steps: 1) get the routine and counts from the user; 2) time the voice to the breath counts, not the other way round; 3) build circle and cards; 4) dissolve-heavy assembly; 5) QA at real pace.
- Style checks: breath durations match the method (frame-accurate); no frame has more than one moving element; text never sits on sage.
- Common failures: pace too slow for the platform's first 2 s (open on a clear statement, then slow down), low contrast captions over footage (add the sand veil), circle easing too bouncy (sine only).

## Overrides
None (library copy).

## Credits
Original motionforge style, drawing on the general tradition of guided breathing apps and quiet studio print design.
