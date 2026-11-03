<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Quiz Countdown

> Game-show cobalt: a big question, four white answer tiles, a yellow 3-2-1 ring that drains exactly on the second, and a reveal that turns the right tile green.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Education & explainers | hyperframes | trivia, test-yourself series, exam and licence-test practice, recap quizzes | low |

## 1. Essence
- In one sentence: the viewer plays along against a fair, visible clock.
- Three adjectives: punchy, fair, playful.
- Signature move: the ring drains in three exact one-second steps and each digit punches in on its second.

## 2. Use it for / avoid it for
- Use for: trivia, "guess the…", exam practice, product or brand quizzes, end-of-lesson recaps.
- Avoid for: serious or sensitive topics, questions whose answer is contested.
- Honesty: every answer checked, with a source line on the reveal; no trick questions with two defensible answers; image rounds use licensed or user-owned images; claims like "only 1 % get this right" only if measured.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #1235C7 | cobalt, soft top light #1E46E0, vignette 20 % |
| ink | #FFFFFF | question text on cobalt |
| tile | #FFFFFF | answer tiles; text on tiles #0B1240 |
| accent | #FFE14A | timer ring and digit, question number |
| correct | #22D07A | the right tile at reveal |
| wrong | #FF4B55 | the viewer's wrong pick in "you chose" variants |

Rules: yellow only on the clock and question number; green and red only at the reveal; tiles stay white until then.

## 4. Type
- Question: Lilita One (OFL) 400, 84–104 px, sentence case, three lines max (about 60 characters).
- Answers: Rubik (OFL) 700, 52 px; letter badges Rubik 800, 40 px in 72 px circles.
- Timer digit: Rubik 900, 220 px, tabular.
- Labels: Rubik 600, 30 px, uppercase, tracking 0.1 em ("QUESTION 3 / 10").
- Coverage and fallback: Lilita One has latin + latin-ext; Rubik adds Cyrillic, Hebrew and Arabic — use Rubik 800 for questions in those scripts. Fallback: Fredoka.

## 5. Surfaces and texture
- Background: flat cobalt with a soft spotlight from the top, grain 0.04.
- Tiles: 860×130 px at x 80–940 (clear of the button rail), radius 26 px, a 6 px bottom edge in a darker tint of the tile for a pressable-key look.
- Question panel: background darkened 12 %, radius 36 px, 3 px inner border at 20 % white.
- Never: grid backgrounds, purple "game show" glow gradients, invented prize money or fake live audiences.

## 6. Framing and layout
- 9:16 zones: question number y 260; question y 320–720 (optional image y 360–760 with a shorter question); timer ring 260 px centred at y 780–1040; four tiles 130 px tall with 24 px gaps at y 1080–1672.
- Other formats: 1:1 question on top, tiles 2×2 below; 16:9 question left, tiles 2×2 right, timer top-right.
- Density: one question, four tiles, one timer; no captions during the countdown (the question is the text).

## 7. Motion
- Entrances: question words rise 30 px with 0.06 s stagger, power3.out; tiles slide in from the right in 0.35 s back.out(1.4), 0.08 s apart.
- Countdown: three segments of exactly 30 frames at 30 fps; each drains over 0.9 s power1.inOut and holds 0.1 s; the digit swaps on the frame of each second, scale 1.4 → 1.0 in 0.2 s back.out(3).
- Reveal: wrong tiles fade to 40 % in 0.2 s; the right tile scales to 1.06 and turns green in 0.25 s; a tick draws in 0.25 s; the source line fades in 0.3 s.
- Exits: everything slides up and out in 0.35 s power2.in.
- Holds and rhythm: reading time = 0.35 s per word + 1 s, then a 3 s (or 5 s) countdown, then a 2 s reveal hold.
- Transitions: hard cut or a 0.3 s push-up between questions; a thin progress bar at y 240 fills per question.
- Edit grammar: every question uses the identical structure and timing so viewers learn it; the voice reads the question once and stays silent during the countdown; the countdown starts on a bar line of the 120 BPM bed so the reveal lands on a downbeat; the end card loops visually into question 1 for rewatches.

## 8. Sound
- Bed: upbeat 120 BPM, −26 LUFS, low-passed during the countdown and opened on the reveal.
- Effects: a woodblock tick each second, a bright ding on correct, a short low stab for wrong — 0.15–0.2 of voice.
- Mix: voice first; −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: hyperframes; `templates/stat-counter` ring adapted for the timer; `kinetic-title` for the question; `checklist-reveal` for the answer recap; `cover-still` with the hardest question.
- Signature scenes:
  - 3-2-1 ring: frame-exact drain, digit punch per second, tick sound on each.
  - Tile reveal: fade the wrong, lift and colour the right, tick and source.
  - Image round: a licensed image blurred 24 px sharpens on each second (24 → 12 → 6 → 0 px).
  - Comment pause: before the reveal, a 1.5 s card "A, B, C or D?" with a generic speech-bubble icon.
  - Score dots: ten dots under the progress bar fill one by one in a recap at 0.1 s stagger.
- Steps: 1) questions, answers and sources; 2) trim each question to the reading-time budget; 3) build from params (one JSON per round); 4) render and mix; 5) `qa-review`.
- Style checks: digits change on exact second frames; the question is readable before the countdown ends; every reveal has a source.
- Common failures: questions too long for the timer (cut words, not time); answers that sound alike when read aloud; red and green as the only cue (add the tick and cross for colour-blind viewers).

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of television quiz shows and classroom quiz games.
