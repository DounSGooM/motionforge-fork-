<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Fixture Countdown

> A printed matchday-programme feel on warm paper: split-flap tiles clatter to the next opponent and date, a giant days-to-go number ticks down, and the group table slides rows into their new order.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Football & sports | hyperframes | next-match posts, season and month schedules, tournament group stages, ticket reminders, local league updates | low |

## 1. Essence
- In one sentence: anticipation you can read at a glance: who, when, how many days.
- Three adjectives: tactile, orderly, expectant.
- Signature move: a row of dark split-flap tiles flips through a few letters each, left to right, and settles on the opponent's name.

## 2. Use it for / avoid it for
- Use for: next-fixture announcements, month and season schedules, group-stage tables, days-to-go series, kickoff reminders for amateur and youth leagues.
- Avoid for: live scores and lineups (use `matchday-graphics`), transfer news (use `transfer-breaking`), urgent breaking stories (the flaps read as calm).
- Honesty: dates, kickoff times (with time zone), venues and table numbers come from the official fixture list and standings, stamped "as of"; ticket details only from the user or club; crests only with rights, otherwise a 28 px team-colour dot and the name.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #F4F1EA | warm programme paper |
| ink | #111827 | titles, table text |
| tile | #1B1F27 | split-flap tiles; characters in #F4F1EA |
| accent | #0F8A3C | pitch green: days number, "NEXT" marker, qualification bars |
| support | #C8C2B5 | hairline dividers, inactive rows |
| muted | #6B6558 | venue, competition, dates in lists |

Rules: tiles and green are the only strong elements; qualification shows as a 6 px green bar on the qualifying rows only. Night-game variant: background #12161C, ink #F4F1EA, accent #36B66A.

## 4. Type
- Display: Oswald (OFL) 600, 110–180 px, uppercase, tracking 0.01 em.
- Flap characters: Oswald 500, 120 px, one character per 92×150 px tile; days number Oswald 700, 360–420 px, accent.
- Body / captions and tables: Hanken Grotesk (OFL) 600, 36–40 px in tables (tabular-nums), 48–54 px for captions.
- Labels: Hanken Grotesk 700, 26 px, uppercase, tracking 0.14 em ("DAYS TO GO", "MATCHDAY 12").
- Language coverage: both ship latin + latin-ext; flap tiles must contain İ, Ş, Ğ, Ä, Ø (check with `tools/textcheck.mjs`); fallback `"Arial Narrow", sans-serif`.

## 5. Surfaces and texture
- Background: flat paper with soft fibre noise (3 %) and static grain 0.04.
- Materials: flap tiles with a 2 px hinge line #0B0D11 across the middle, upper half 4 % lighter, shadow 0 6 px 12 px rgba(0,0,0,.25); fixture cards 940×260 px, radius 18 px, white #FFFFFF with a 2 px ink border; tables printed on the paper with 1 px hairlines.
- Texture: grain only; no worn-print overlays.
- Never: crests without rights, a drawn backdrop grid (table rows are content), purple gradients, invented ticket prices.

## 6. Framing and layout
- 9:16 zones: header "NEXT MATCH" y 260–340; flap board y 380–700 (up to 10 tiles per row, 2 rows); date, time and venue line y 730–800; days number y 860–1260 with its label; captions y 1440–1600; in table scenes the table runs y 420–1560 and captions move to y 260–380.
- Other formats: 1:1 flap board and days number side by side; 16:9 board left, table right.
- Density: one fixture at a time; tables show the group or ±3 rows around the team (max 8 rows).

## 7. Motion
- Entrances: each tile cycles through 3–6 intermediate characters (seeded sequence) at 0.06 s per flip: top half folds rotateX 0→−90°, bottom half 90→0; tiles start 0.03 s apart left to right; whole word ≤ 1.2 s.
- Days counter: counts down from n+5 to n, each number a big flip of 0.18 s, the last one 0.4 s power2.out. Table: rows move to new positions (FLIP) in 0.6 s power2.inOut; a row moving up gets a green ▲ chip; points count 0.4 s; fixture cards turn rotateY 180° in 0.5 s power2.inOut to reveal the next.
- Exits: tiles flip to blanks in 0.6 s.
- Holds and rhythm: fixture 2.5–3 s, days number 2 s, table 4–5 s.
- Transitions: flip to blank, then new content; hard cuts to footage.
- Camera: static; at most a 1.00→1.02 drift.
- Frame rate feel: crisp 30 fps; flips are timeline-driven, never CSS loops.
- Edit grammar: countdown posts run 8–15 s: open on the flap board already moving on frame 1, cut to 1–2 training or stadium clips of 1.5 s on the beat, return to the days number; month schedules land one fixture per two beats (1.0 s at 120 BPM), the next match gets 2.5 s; a table update moves only after the result has been spoken.

## 8. Sound
- Bed: upbeat indie or electronic, 118–124 BPM, −26 LUFS under the voice.
- Effects: a recorded split-flap clatter (CC0) per tile burst at −18 dB, a soft thud as the days number lands.
- Mix: voice first; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: HyperFrames with CSS 3D flaps on GSAP timelines; `stat-counter` (days, flip variant), `checklist-reveal` (fixture list), `cover-still`, `word-captions`.
- Signature scenes:
  - Flap board: opponent and date flip in tile by tile, ≤ 1.2 s per word (new scene).
  - Days to go: giant green tile counts n+5 → n, label "DAYS TO GO" (`stat-counter`, flip variant).
  - Table shuffle: result chip lands, rows reorder 0.6 s, qualification bars redraw (new scene).
  - Month run: fixture cards stack, one flips in per two beats, H/A tag on each (new scene or `checklist-reveal`).
- Steps: 1) pull fixtures and standings, stamp the date; 2) confirm crest rights or use dots; 3) fill the fixtures JSON; 4) build scenes; 5) `qa-review`.
- Style checks: time zone on every kickoff; "as of" on every table; flap glyph coverage; flip sequences identical across renders.
- Common failures: long names overflowing the tiles (use the short official name), tables with 20 rows (crop), clatter sound too loud under the voice.

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of split-flap departure boards and printed matchday programmes.
