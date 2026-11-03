<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Swiss Poster

> International-style typography in motion: strict alignment, huge grotesque type, flat primary blocks and asymmetric balance — information as architecture.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Art direction & design looks | hyperframes | announcements, manifestos, data points, design and architecture topics | low–medium |

## 1. Essence
- In one sentence: clarity so strong it becomes the decoration.
- Three adjectives: rational, bold, rhythmic.
- Signature move: a giant number or word slides along a strict column while a red block snaps to the edge.

## 2. Use it for / avoid it for
- Use for: event promos, key statistics, product principles, typographic quotes.
- Avoid for: warm personal stories, children's content.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| paper | #F2F0EB | background (or #111111 for the dark version) |
| ink | #111111 | type |
| accent | #E2231A | one red block or word |
| support | #1F4BB8 | optional second flat colour, used rarely |

Rules: flat colours only; at most two colours plus ink per screen.

## 4. Type
- Display: Inter Tight or Archivo (OFL) 800–900, 180–320 px, tight tracking (−0.05 em), flush-left, ragged-right.
- Secondary: Inter 500 40 px, flush-left, generous leading.
- Numbers: tabular figures, very large.
- Language coverage: both families cover latin-ext.

## 5. Surfaces and texture
- Flat paper or flat black; at most a whisper of print grain (≤ 4 %).
- Composition is built on an invisible column structure (e.g. 6 columns, 40 px gutters) — never drawn on screen.
- Never: drop shadows, gradients, decorative icons, visible grid lines.

## 6. Framing and layout
- Asymmetric: type hangs from the top-left margin (x 80, y 260); blocks anchor to edges.
- Big-small contrast: one element at 300 px, the rest at 40 px.
- 16:9: same column logic with 12 columns.

## 7. Motion
- Moves are linear or power3/expo eases, no bounce; elements travel along the column axes only (horizontal or vertical).
- Type reveals by mask (clip-path inset) sliding 0.35–0.5 s.
- Blocks snap to position (0.25 s, expo.out) on beats.
- Rhythm: strict — every move lands on the 4/4 grid of the music or on stressed words.
- Transitions: a full-frame block wipes across (0.4 s) and becomes the next background.

## 8. Sound
- Bed: minimal techno / electronic, 120 BPM, −24 LUFS.
- Effects: crisp clicks on block snaps; nothing else.

## 9. Build recipe and checks
- Engine and templates: HyperFrames; `kinetic-title` and `stat-counter` restyled (flush-left, no ring); clip-path reveals with GSAP.
- Steps: 1) define columns and margins; 2) set the type scale (3 sizes max); 3) choreograph on a beat grid; 4) render; 5) review.
- Style checks: every left edge lines up with a column; no more than 3 type sizes per screen; red appears once per screen.
- Common failures: centring things out of habit, adding a fourth type size, easing with overshoot.

## Credits
Original motionforge style drawing on the general International Typographic Style.
