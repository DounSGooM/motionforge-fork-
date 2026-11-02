# Motion craft

Rules that keep a coded video from looking generated. Apply them while building; `qa-review` checks the measurable ones.

## Timing
- **Voice first.** An entrance lands on the word that names it, 0–3 frames early. A scene changes 0.2–0.4 s after a sentence ends.
- **Hold after every arrival:** 0.4–0.8 s where only ambient motion continues. Reading happens in the hold.
- **Something new every 2–4 s** (a reveal, a cut, a move, a change of scale). Longer still stretches need a reason.
- **Two speeds at least.** Mix fast scenes (≈ 0.5–1.5 s actions) with slow ones; the slowest scene runs about 3× the fastest.
- **Stagger groups:** 40–80 ms between siblings, under 0.5 s for the whole group.
- **Exit faster than entry** (about 70–80% of the entry duration).
- **Before the biggest reveal:** 0.3–0.8 s of near-stillness and lower sound.

## Easing and springs
- Things with mass move on springs or ease-out curves; linear only for constant rotation, tickers and loops.
- One overshoot per scene, on the hero only. No bounce or elastic easings on text.
- Positions and scale change from a defined origin (`transform-origin`), not always the center.
- Numbers that count use tabular figures so they do not jitter.

## Frame
- **One hero per scene.** The eye knows where to go within 0.3 s. A second element may move at up to a third of the hero's amplitude.
- **Scale varies:** wide, medium and at least one extreme close-up (a single UI button, one digit).
- **Text:** at most two lines per block; on 9:16 ≥ 48 px for captions and ≥ 64 px for headlines at 1080 wide. One short label per beat.
- **Reading time:** on screen at least `1.5 s + 0.3 s per word` (CJK: about 4–5 characters per second).
- **Contrast:** text vs background ≥ 4.5:1 (≥ 3:1 for type over 40 px).
- **Safe areas (9:16, 1080×1920):** important content inside x 60–1020, y 220–1600; captions inside y 1150–1500; nothing important in the right column x > 940 between y 900–1700 (platform buttons). For the profile-grid cover (3:4 crop), keep text inside y 240–1680.

## Looks that read as generated (avoid by default)
- full-frame purple/blue gradient backgrounds;
- grid or graph-paper background patterns;
- every element fading in and drifting up;
- a centered title on a gradient as the opening;
- glows, glassmorphism and lens flares on everything;
- emoji as icons; stock "AI brain" imagery;
- the same card sliding in every scene;
- a logo sting as the only ending.

Preferred grounds: a flat dark or off-white tone with a soft vignette and fine grain, a blurred real photo, or a real scene that matches the subject. A style in `style-library` may override this list explicitly.

## Realism
- Show the real thing: the real app screen, the real product photo, the real repository page with its real star count.
- When the subject is physical (a car, a remote, a house), use a licensed photo or a 3D render (three.js in HyperFrames) instead of a flat icon.
- Mock data (invented company names, numbers) is allowed only as illustration and must be disclosed at delivery.

## Determinism
- Every frame is a function of `t` alone. Seeded randomness keyed by object id. No `Math.random()`, `Date.now()`, timers, or CSS transitions/animations that run on their own clock.
- Re-render one frame twice and compare hashes when in doubt.

## Sound design (with a voice-over)
- One sound effect per meaningful event; whooshes start ~0.25 s before the cut they lead into; impacts on the contact frame.
- Effects sit 12–18 dB under the voice; music 18–25 dB under the voice while speaking.
- Never put the key hit under a word; place it in a pause.
