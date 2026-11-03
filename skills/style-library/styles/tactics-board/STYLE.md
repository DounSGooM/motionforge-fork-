<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Tactics Board

> A tilted matte-green pitch where flat player tokens shift into shape, pass arrows draw ball by ball, and cyan pressing zones bloom over the space that matters.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Football & sports | hyperframes (SVG board) or hyperframes + three.js (tilted pitch) | tactical analysis, coaching sessions, formation explainers, "how this goal was built" | medium |

## 1. Essence
- In one sentence: make one tactical idea visible, then prove it with the real clip.
- Three adjectives: analytical, clear, patient.
- Signature move: the pressing trap: cream tokens converge on the ball carrier while a translucent cyan polygon closes around him and the passing lanes go dashed.

## 2. Use it for / avoid it for
- Use for: tactical breakdowns, coaching drills, formation changes, set pieces, academy video sessions.
- Avoid for: match results and lineups (use `matchday-graphics`), drawing over real footage (use `telestrator-replay`), single-player profiles (use `player-stat-card`).
- Honesty: names and numbers from the official lineup; tokens are generic circles (no faces, no crests unless the user holds rights); positions rebuilt from footage are labelled "positions approximate"; event data is credited with its source.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #18221F | slate surround, softly vignetted |
| pitch | #1F5A3B | matte turf, mow bands of #22633F (pitch content, 9 bands) |
| ink | #E7EFE9 | pitch markings at 70 %, titles, labels |
| team-focus | #F3EFE4 | cream tokens of the team being analysed, numbers in #18221F |
| team-other | #6E7B76 | grey opponent tokens, white numbers |
| accent | #2EE6FF | cyan: pressing zones (18 % fill, 3 px edge), key pass, highlight ring |

Rules: the analysed side is always cream and the opponent always grey whatever their real kits (keeps cyan readable, implies no club identity); one cyan event at a time; non-involved tokens drop to 60 % opacity.

## 4. Type
- Display: Saira Condensed (OFL) 700, 96–120 px, uppercase, tracking 0.02 em (phase titles).
- Body / captions: Saira (OFL) 500, 46–52 px.
- Labels: Saira Condensed 600, 28 px, uppercase, tracking 0.12 em ("4-3-3", "34'", "PHASE 2/3"); token numbers Saira 700 30 px.
- Language coverage: both ship latin + latin-ext; fallback `"Arial Narrow", sans-serif`.

## 5. Surfaces and texture
- Background: slate with a soft vignette; the pitch is a flat matte plane with 3 px markings.
- Materials: 54 px tokens with a 4 px darker rim and a 6 px drop shadow at 30 %; ball 18 px white. Passes solid 6 px with a 22 px head; runs dashed 5 px (12/10); dribbles as a 5 px sine line (amplitude 6 px, period 28 px).
- Texture: static grain 0.04 on the surround only; turf stays clean.
- Never: crests on tokens without rights, photoreal or gradient grass, a drawn backdrop grid (pitch markings are content).

## 6. Framing and layout
- 9:16 zones: phase title y 260–380; pitch y 420–1420 with 40 px side margins, rotated so the team attacks upward, showing a half or a third; minute/score chip top-right x ≤ 900; captions y 1460–1620.
- Other formats: 1:1 half pitch; 16:9 full pitch horizontal.
- Density: up to 22 tokens, but at most 4 highlighted and 3 arrows live.

## 7. Motion
- Entrances: tokens glide along eased paths, 0.6–1.2 s power2.inOut, duration proportional to real distance (about 8 m per second of screen time); passes draw 0.35–0.6 s power1.in with the ball riding the arrowhead; runs draw 0.8 s; a pressing zone scales out from the ball in 0.4 s power3.out while its edge draws.
- Exits: arrows fade to 25 % as a trail, cleared at the end of the phase.
- Holds and rhythm: freeze 1.2 s on the key moment; each phase 4–7 s, numbered.
- Transitions: rewind: tokens run back to the phase start at 3× in 0.8 s; cut to the real clip of the same moment and back.
- Camera: 3D tilt 25–40°, camera follows the ball with a 0.3 s lag, zoom 1.0→1.4 into the zone; flat boards use 2D push only.
- Frame rate feel: smooth 30 fps; positions are keyframed data, never physics.
- Edit grammar: analysis loop: real clip at full speed (3–5 s) → board rebuild (4–7 s) → the clip again at 50 % with the same arrows (hand-off to `telestrator-replay`); cuts land on the action (the pass contact), not the voice; the voice leads into each board by 0.4 s (J-cut).

## 8. Sound
- Bed: minimal ambient or lo-fi, 85–95 BPM, −28 LUFS under the voice.
- Effects: a soft wooden "tok" as a token stops, a light whoosh per pass with pitch following length, one short whistle at phase start (−20 dB).
- Mix: voice first; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: HyperFrames with SVG for flat boards; `hyperframes + three.js` with `templates/pitch-tactics-3d` for tilted ones; positions as JSON keyframes in metres on a 105×68 pitch; `kinetic-title` for phase titles, `stat-counter` for overload counts, `word-captions`.
- Signature scenes:
  - Shape shift: 11 tokens morph from the defensive shape to the build-up shape in 1.0 s power2.inOut, back-line links draw between them (new scene, or `pitch-tactics-3d`).
  - Pressing trap: ball to the full-back, three cream tokens converge 0.8 s, cyan polygon blooms 0.4 s, "TRAP" label, freeze 1.2 s (new scene).
  - Lane shut: the presser's cover shadow draws as a cyan cone; the blocked lane turns dashed, the open lane stays solid, 0.5 s (new scene).
  - Overload count: zone box with "4 v 2" counting the tokens inside it as they arrive (`stat-counter`).
- Steps: 1) pick one idea per video and the clip that proves it; 2) log positions per keyframe from the footage; 3) build the board and phases; 4) cut against the real clip; 5) `qa-review`.
- Style checks: arrows start and end on tokens; no more than 3 arrows live; the analysed team always cream; the clip and the board show the same moment.
- Common failures: every player moving at once (dim the uninvolved), arrows crossing captions, too many phases (3 max), a crest slipped onto a token.

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of coaching chalkboards and televised tactical analysis.
