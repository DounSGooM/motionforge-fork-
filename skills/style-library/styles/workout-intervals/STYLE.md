<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Workout Intervals

> A follow-along session screen: a thick countdown ring that empties in real time, mint for work, amber for rest, and an exercise card that tells you exactly what is next.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Fitness, health & wellness | hyperframes | follow-along HIIT/Tabata/EMOM sessions, circuit plans, home-workout guides | medium |

## 1. Essence
- In one sentence: the viewer can put the phone on the floor and train with it — the ring, not the voice, keeps time.
- Three adjectives: legible, steady, coach-like.
- Signature move: the interval ring — a 640 px ring whose arc empties clockwise in exact real time, with the seconds digit centred inside and the phase colour (work mint / rest amber) filling the stroke.

## 2. Use it for / avoid it for
- Use for: timed sessions (20/10, 40/20, EMOM, AMRAP caps), circuit previews, "5 moves, no equipment" guides, warm-up and cool-down routines.
- Avoid for: hype edits of heavy lifts (use `gym-hype`), medical or rehab prescriptions (use `clinic-clean`), anything where the timer cannot run in true time.
- Honesty: exercise names, reps and timings come from the user's plan; add a "check with a professional if you have an injury" line only if the user wants it, never invented safety claims.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #0C1A1F | deep teal-black field |
| ink | #EAF4F2 | exercise names, digits |
| accent (work) | #2EE59D | ring stroke and "WORK" tag during work phases |
| support (rest) | #FFB84D | ring stroke, "REST" tag and next-up card border during rest |
| track | #20343B | empty ring track, inactive round dots, card fill |

Rules: exactly one phase colour on screen at any time — mint during work, amber during rest; never both. The phase colour covers the ring and one tag only. Light variant for bright gyms: background #EEF3F1, ink #0C1A1F, track #CFDCD8, same phase colours with a 2 px #0C1A1F outline on tags.

## 4. Type
- Display: Barlow Condensed (OFL) 800, 120–150 px, uppercase, tracking 0.01 em — exercise names ("JUMP SQUAT").
- Timer digits: Roboto Mono (Apache-2.0, OFL-1.1 on Fontsource) 700, 260 px inside the ring, tabular so digits never jitter.
- Body / captions: Manrope (OFL) 600, 48–56 px, sentence case, form cues ("Knees track over toes").
- Labels: Manrope 800, 28 px, uppercase, tracking 0.16 em ("ROUND 3 / 8", "NEXT UP").
- Language coverage: latin + latin-ext for all; fallback `"Arial Narrow", system-ui, monospace` for digits.

## 5. Surfaces and texture
- Background: flat #0C1A1F with a soft lift (6 % lighter) behind the ring; static grain 0.05.
- Materials: rounded exercise cards (radius 40 px, fill #20343B, 2 px phase-colour border), demo footage of the user doing the move in a 4:5 card.
- Texture: almost none; clarity over mood.
- Never: grid backgrounds, purple gradients, decorative particles near the digits, a ring that eases (it must be linear).

## 6. Framing and layout
- 9:16 zones: round dots y 250; ring centred at y 560 (diameter 640, stroke 44 px); exercise name y 960–1100; demo card y 1140–1560 (900×420 crop, or 4:5 at 720 px wide during rest); captions y 1600–1660.
- Other formats: 1:1 ring left (520 px), card right; 16:9 ring left third, demo footage right two thirds.
- Density: ring, name, one card, one cue line. No more.

## 7. Motion
- Entrances: exercise card slides up 90 px, 0.35 s `power3.out`; name types in by letter at 40 chars/s; round dots fill with `back.out(1.7)` 0.25 s.
- Exits: card slides down 90 px, 0.25 s `power2.in`, exactly at phase end.
- Holds and rhythm: the ring arc is `none` easing (linear) across the whole phase; the last 3 seconds pulse the digit scale 1 → 1.12 → 1 in 0.3 s each.
- Transitions: phase change = ring stroke colour cross-fades in 0.2 s and a 0.15 s full-frame tint flash (phase colour at 12 %).
- Camera: static; demo footage only gets a 2 % slow push during rest previews.
- Frame rate feel: smooth 30 fps; digits change on exact whole seconds (frame 30·n).
- Edit grammar: shot length follows the plan, not the music — each work shot runs the full interval (20–45 s) as one loop-cut demo clip; cuts land on phase boundaries only. Rest phases show a 3 s preview of the next move, cut in on rest start, looped. No speed ramps on demo footage (form must read at true speed); a 50 % slow-mo replay only in the intro breakdown. The coach's voice cue for the next move starts as a J-cut 1 s before the rest ends.

## 8. Sound
- Bed: steady 128 BPM house at −24 LUFS; bed drops 6 dB during rest.
- Effects: three short beeps (880 Hz, 80 ms) at 3-2-1, a long tone (1320 Hz, 300 ms) at phase start, soft chime at session end.
- Mix: beeps sit 4 dB above the bed and are never ducked; voice first; final −14 LUFS integrated.

## 9. Build recipe and checks
- Engine and templates: HyperFrames with SVG ring; `templates/stat-counter` for digits, `checklist-reveal` for the session overview, `word-captions` for cues.
- Signature scenes:
  - interval ring: SVG circle, `stroke-dashoffset` driven linearly by frame/fps, digit = ceil(remaining s), last-3 s pulse.
  - next-up card: during rest, amber-bordered card shows the next move's demo loop + name + reps; "NEXT UP" label blinks twice (0.2 s on/off).
  - session map: checklist of all moves, completed ones strike through 0.3 s, current one in phase colour.
  - finish screen: all round dots fill in sequence 60 ms apart, total time counts up in Roboto Mono, ring closes to a full mint circle.
- Steps: 1) write the plan as JSON (move, work s, rest s, rounds) from the user; 2) generate the timeline from it; 3) trim demo clips to loop cleanly; 4) render; 5) verify timing with a stopwatch on the contact sheet.
- Style checks: total video length equals the plan's sum; each phase colour matches its phase; digits never skip or repeat a second.
- Common failures: ring easing instead of linear (use `none`), beeps drifting off the digit change (place by frame, not by audio timestamp), demo clip shorter than the interval (loop with a crossfade of 6 frames).

## Overrides
None (library copy).

## Credits
Original motionforge style, drawing on the general tradition of interval-training timers and follow-along workout videos.
