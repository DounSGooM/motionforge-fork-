<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Matchday Graphics

> A night-match broadcast package: navy field under floodlight haze, slanted score panels in the two kit colours, lineups that slide in by line, and an amber kickoff countdown.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Football & sports | hyperframes (graphics) + remotion (optional, footage-heavy edits) | match previews, lineups, live-score and full-time posts for clubs, fan and sports-media accounts | medium |

## 1. Essence
- In one sentence: it should feel as if the stadium lights have just come on.
- Three adjectives: electric, ordered, big-occasion.
- Signature move: two team blocks slide in from opposite sides and meet at a 12° slanted divider; the score digits drop in and a soft floodlight beam sweeps across the panel once.

## 2. Use it for / avoid it for
- Use for: matchday announcements, kickoff countdowns, starting XIs, half-time and full-time scores, key-stat posts, any sport with two sides.
- Avoid for: tactical explanation (use `tactics-board`), one player's story (use `athlete-hype-reel`), long-range schedules (use `fixture-countdown`).
- Honesty: crests, league and sponsor marks and player photos are trademarks or likeness: use only what the user has rights to (club or licensed media); otherwise team-colour roundels with 3-letter codes. Scores, scorers and minutes from official match data; kickoff times with time zone; no "LIVE" tag on recorded content.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #0A1022 | night navy, floodlight pools of #1B2A4A from the top |
| panel | #121B33 | glass score and lineup panels, 1 px white 12 % border |
| ink | #F4F6FB | names, digits, headlines |
| accent | #FFA41B | floodlight amber: countdown, live dot, goal minute, key stat |
| support | #8C97B2 | competition, venue, matchday labels |

Rules: team colours come from the user's kit data and stay inside their blocks and roundels; amber is never a team colour (if a side plays in orange, the accent becomes ink with an underline); white digits on a team colour need 4.5:1 contrast or a 40 % dark plate.

## 4. Type
- Display: Big Shoulders Display (OFL) 900, 120–220 px, uppercase, tracking 0.01 em (team names, "FULL TIME").
- Score digits: Big Shoulders Display 900, 300–360 px, tabular.
- Body / captions: Barlow (OFL) 600, 44–52 px; lineup names Barlow 600 40 px with shirt numbers in Big Shoulders Display 800.
- Labels: Barlow 700, 26–30 px, uppercase, tracking 0.16 em.
- Language coverage: both ship latin + latin-ext; test uppercase names with İ, Ş, Ğ, Ł, Ø; fallback `"Arial Narrow", sans-serif`.

## 5. Surfaces and texture
- Background: navy with two soft floodlight cones (radial lights at x 200 and x 880 from above, 25 %), static haze noise, grain 0.06; or the user's stadium footage blurred 18 px and darkened 55 %.
- Materials: panels with 12° slanted ends, glass with 10 px backdrop blur, 2 px amber ticks for live elements.
- Texture: static grain only; the floodlight sweep is a keyed gradient band, not a lens flare.
- Never: copied broadcaster or league layouts and marks, a pitch-stripe pattern as backdrop, purple gradients, crests taken from the web.

## 6. Framing and layout
- 9:16 zones: scorebug y 250–330, x 60–620 (codes, score, clock); hero panel y 600–1200; lineup as a single column of 11 rows at 92 px from y 460; captions y 1460–1620; venue line y 1640.
- Other formats: 1:1 hero panel centred; 16:9 full-width lower panel with the scorebug top-left.
- Density: one hero element at a time plus the scorebug.

## 7. Motion
- Entrances: panels slide 160 px along their slant, 0.35 s power4.out, 0.06 s stagger; digits drop 60 px with scale 1.25→1, 0.3 s back.out(2.2); lineup rows wipe left to right by line (GK, DEF, MID, FWD), 0.05 s stagger; countdown digits flip in 0.25 s.
- Exits: panels slide out the opposite way, 0.25 s power3.in.
- Holds and rhythm: score 2.5 s; lineup 6–8 s total (about 0.5 s of reading per name); stat 2.5 s.
- Transitions: a slanted 12° panel sweeps the full frame in 0.3 s between graphics; a 0.4 s floodlight stinger for openers.
- Camera: background drift 1.00→1.04 with two parallax layers.
- Frame rate feel: 30 fps (25 fps in 50 Hz markets), smooth; 50p footage for slow motion.
- Edit grammar: package order: 0.8 s stinger → countdown or fixture (3 s) → lineup (6–8 s) → key stat (2.5 s) → call to action. With footage: crowd and warm-up shots of 1.2–2.0 s cut on downbeats; goals get 2–3 angles with a ramp to 40 % at the strike; the score graphic lands on the crowd-reaction cut, not on the ball crossing the line; player ID lower thirds in 0.35 s, hold 3 s, out 0.25 s.

## 8. Sound
- Bed: orchestral-electronic hybrid, 140 BPM in half time, −24 LUFS; crowd ambience bed at −30 LUFS.
- Effects: a low impact on the score drop, a 1.5 s riser into the countdown's zero, a short swish on panel sweeps.
- Mix: crowd ducks 8 dB under the voice; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: HyperFrames for the package; Remotion optional for footage-heavy edits; `stat-counter` (countdown and stats), `kinetic-title` ("FULL TIME"), `cover-still` (result thumbnail), `word-captions`; `templates/pitch-tactics-3d` only for a tilted formation view of the lineup.
- Signature scenes:
  - Kickoff countdown: amber numerals flip once per 0.5 s from 10 to 0 under "KICK-OFF 20:45 CET", a ring of 60 ticks fills amber, riser lands on zero (new scene + `stat-counter`).
  - Score slam: team blocks meet at the 12° divider, digits drop with back.out(2.2), floodlight sweep 0.6 s, scorers type in under each side (new scene).
  - Lineup by lines: formation dots at the top, names wipe in line by line, captain marked with an amber "C" (new scene, or `pitch-tactics-3d`).
  - Full-time card: "FULL TIME" slams at 220 px, score below, three stat bars (possession, shots, expected goals with source) grow 0.6 s (`stat-counter`).
- Steps: 1) collect official data and the user's kit colours and marks; 2) choose roundels or licensed crests; 3) build each panel from a match JSON; 4) cut to the beat; 5) `qa-review`.
- Style checks: rights for every crest and photo; diacritics in names; time zone on kickoff times; both team colours readable against white digits.
- Common failures: two similar kit colours (use the away kit or an outline), too many stats on one card, a "LIVE" tag on a recap.

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of night-match broadcast sport graphics.
