<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Gym Hype

> Black gym floor, chalk-white condensed type the height of the frame, one blaze-orange rep counter, and hard cuts that land on every rep.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Fitness, health & wellness | hyperframes (graphics) + remotion (optional, footage-heavy edits) | training clips, PR attempts, coach tips, gym promos, challenge reels | medium |

## 1. Essence
- In one sentence: the edit breathes with the lift; every rep is a cut, every number is earned.
- Three adjectives: loud, physical, exact.
- Signature move: the rep counter — a blaze-orange numeral that slams in at 420 px tall on the lockout frame of each rep, while the footage freezes for 2 frames.

## 2. Use it for / avoid it for
- Use for: lifting and conditioning clips, coach cue breakdowns ("3 mistakes on the squat"), personal-record attempts, gym class promos, 30-day challenge recaps.
- Avoid for: injury, rehab or medical advice (use `clinic-clean`), calm mobility or yoga (use `wellness-sage`), any claim about fat loss or results that the user cannot back with their own data.
- Honesty: weights, reps and times come from the user's footage or log; never add plates or round a lift up. Before/after body photos only with the person's written consent; no implied results.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #0A0A0B | rubber-floor black behind cards and type |
| ink | #F4F4F0 | chalk-white headlines and captions |
| accent | #FF4D00 | rep counter, PR tag, the active caption word, timer bar |
| support | #2B2D31 | steel cards, plate rings, inactive counters |
| chalk | #BDBDB5 | sublines, labels, set/rep notation |

Rules: blaze orange stays under 6 % of the frame and only marks what is being counted or the record. Footage is graded toward the palette: contrast +18, saturation −25, blacks crushed to #0A0A0B, skin kept natural. Never orange text on a light video frame; put it on a 12 px black plate.

## 4. Type
- Display: Anton (OFL) 400, 180–320 px, uppercase, tracking −0.01 em, line height 0.86; one or two words per line.
- Counter numerals: Anton 400, 360–420 px, tabular, accent colour.
- Body / captions: Barlow Condensed (OFL) 700, 64–76 px, uppercase, 1–3 words per chunk.
- Labels: Chivo Mono (OFL) 500, 30 px, uppercase, tracking 0.14 em ("SET 3 · 5 REPS · 120 KG").
- Language coverage: all three ship latin + latin-ext; fallback `Impact, "Arial Narrow", sans-serif`. Check that Turkish İ keeps its dot at 0.86 line height.

## 5. Surfaces and texture
- Background: the user's gym footage, or flat #0A0A0B with a single overhead light pool (radial, 18 % lighter at y 300) and static grain at 0.10.
- Materials: steel plates and knurled bar textures cropped as graphic shapes, chalk dust as a static texture plate, rubber floor.
- Texture: static grain 0.10; type gets a 1 px chalk edge roughness (seeded displacement, fixed per word).
- Never: grid backgrounds, purple gradients, glossy 3D dumbbells, stock "fitness model" imagery, motion blur faked on stills.

## 6. Framing and layout
- 9:16 zones: headline y 260–700; footage full-bleed; rep counter centred at y 860–1280; label strip y 1330; captions y 1420–1560; right rail x > 940 kept clear.
- Other formats: 1:1 counter moves to the right half, headline left; 16:9 footage left two thirds, counter and set log in the right third.
- Density: footage + max two graphic elements (counter and one label). Headline leaves when the counter arrives.

## 7. Motion
- Entrances: headline words slam from scale 1.35 → 1 in 0.14 s (`power4.out`) with a 6 px screen shake for 4 frames (seeded offsets); counter numerals drop 80 px with `back.out(2.2)` in 0.18 s.
- Exits: hard cut, or a 0.1 s scale-down to 0.92 with opacity to 0.
- Holds and rhythm: a new element every 0.6–1.2 s during sets; a 1.5 s held still on the PR frame.
- Transitions: hard cuts only; one white flash frame (#F4F4F0 at 70 %) on the PR lockout.
- Camera: 1.06 punch-in on the lockout, 1.0 between reps; no slow drifts.
- Frame rate feel: 30 fps; freeze-frame holds of 2 frames on every rep top.
- Edit grammar: average shot length 0.8–1.4 s; cuts land on the downbeat of the track or on the action peak (lockout, catch, landing), never mid-rep. Speed ramps 100 % → 35 % into the hardest rep, back to 100 % over 8 frames after it. Cut the eccentric of warm-up sets out completely. Coach cues enter as a J-cut: voice 6 frames before the picture. Lower-thirds (name + PR) sit on screen 2.5 s, in on the first full rep, out before the set ends.

## 8. Sound
- Bed: 140–150 BPM trap or drum-and-bass at −22 LUFS under voice, −14 LUFS when there is no voice.
- Effects: low impact hit on each counter slam, plate clang from the real footage kept and boosted 3 dB, a riser 1.5 s before the PR rep, silence (bed cut) for 6 frames before the lockout.
- Mix: voice first, bed ducked 8 dB under voice with 120 ms release; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: HyperFrames for counters and titles (`templates/kinetic-title`, `stat-counter`, `word-captions`); Remotion optional for long footage edits with speed ramps.
- Signature scenes:
  - rep slam: footage freezes 2 frames at lockout, orange numeral drops 80 px with `back.out(2.2)`, previous numeral moves to the label strip at 30 px.
  - PR stamp: white flash frame, "PR" in Anton 320 px rotates −6° and lands with a 6 px shake, weight types on in Chivo Mono at 20 chars/s.
  - cue split: footage frozen, two chalk lines (4 px) draw from the joint to a 2-word cue in 0.3 s each; "WRONG" in chalk, "RIGHT" in accent.
  - set log: steel card slides up 120 px in 0.2 s, lists sets as rows, the current row fills orange left to right in 0.25 s.
- Steps: 1) log every set with weight/reps from the user; 2) mark lockout frames; 3) cut to the beat grid; 4) render counter and title scenes; 5) captions, loudness, QA.
- Style checks: every number on screen matches the user's log; counters land on the action frame (±1 frame); orange marks one thing per frame.
- Common failures: counter early or late (re-sync to the lockout), too many words in the headline (max 3), crushed blacks swallowing the athlete (lift shadows to #141416).

## Overrides
None (library copy).

## Credits
Original motionforge style, drawing on the general tradition of gym training edits and sports broadcast counters.
