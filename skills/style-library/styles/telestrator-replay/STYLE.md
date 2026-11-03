<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Telestrator Replay

> Real match footage slows and freezes, everything dims except one player, and bright yellow pen strokes are drawn over the play (rings, arrows, distance lines) that stay pinned to the pitch when the replay rolls on.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Football & sports | hyperframes (overlays) + remotion (optional, footage-heavy edits) | analysis on real footage, refereeing decisions, coaching feedback on amateur and academy video | high |

## 1. Essence
- In one sentence: stop the play at the exact frame and point at what everyone missed.
- Three adjectives: forensic, direct, live-feeling.
- Signature move: freeze and spotlight: the clip ramps to a stop, the frame outside an elliptical spotlight drops to 45 % brightness, and a yellow ring draws itself round the player's feet in the pitch's perspective.

## 2. Use it for / avoid it for
- Use for: tactical moments on real footage, offside and foul explainers, coach feedback on a team's own matches, individual technique corrections.
- Avoid for: recreated play without footage (use `tactics-board`), hype edits (use `athlete-hype-reel`), footage the user has no licence for.
- Honesty: footage must be the user's own recording, club or academy footage with permission, or licensed clips; professional broadcast footage is copyrighted. Drawings never misstate the play (no tokens moved, no frames skipped silently); distances measured from the pitch calibration or labelled "approx."; refereeing calls quote the law text; minors appear only with guardian consent.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | footage | the real frame; outside the spotlight #000000 at 55 % |
| accent | #FFE11A | telestrator yellow: primary strokes, rings, the key arrow |
| ink | #FFFFFF | secondary strokes (other options), label text |
| panel | #0F1113 | label plates at 85 % |
| support | #FF5A36 | red-orange: the wrong option or the error, never more than one stroke |

Rules: max 3 strokes on screen; strokes carry a 2 px black 35 % outer shadow so they read on bright turf; if the kit or turf is yellow-green, swap primary strokes to white and keep yellow for the ring only.

## 4. Type
- Display: Teko (OFL) 600, 110–150 px, uppercase, tracking 0.02 em ("THE MISTAKE", "WATCH NUMBER 6").
- Body / captions: Atkinson Hyperlegible (OFL) 700, 46–52 px.
- Labels: Teko 500, 34–40 px, uppercase, on panel plates ("4.2 M", "0.6 S"); match minute and timecode Atkinson Hyperlegible 700 26 px, tabular.
- Language coverage: both ship latin + latin-ext; fallback `"Arial Narrow", sans-serif`.

## 5. Surfaces and texture
- Background: real footage; freezes use the exact source frame at full resolution, deblocked.
- Materials: SVG strokes with round caps and a pressure taper (width 4 → 9 → 6 px along the path, fixed per stroke); perspective ellipses derived from a 4-point pitch homography; spotlight vignette with a 120 px feather.
- Texture: no added grain over footage beyond the source.
- Never: scribbles that float in screen space while the camera pans, backdrop grids, purple tints, crests or broadcaster marks added over the clip.

## 6. Framing and layout
- 9:16 zones: phase label y 260–380; footage fills the frame through a vertical crop window that follows the action (x keyframed); when the play needs width, a 16:9 band at y 560–1168 (1080×608) with captions y 1220–1380 below; timecode chip top-right x ≤ 900.
- Other formats: 1:1 crop on the action; 16:9 native footage with labels in the lower third.
- Density: one idea per freeze: up to 3 strokes and 1 label.

## 7. Motion
- Entrances: strokes draw like a pen at about 1600 px/s, 0.25–0.5 s each, power1.out; rings draw 330° and close with a 10° overshoot; arrowheads pop at the end in 0.1 s; distance lines get end ticks and a label typed at 30 chars/s.
- Exits: strokes fade 0.2 s or reverse-draw 0.25 s.
- Holds and rhythm: each freeze 2–4 s; max 3 freezes per clip.
- Transitions: rewind at 3× in reverse for 0.5 s back to the build-up; resume ramp 20→100 % in 0.4 s; strokes stay pinned to the pitch through the homography as the play continues.
- Camera: digital push on freezes 1.0→1.6 centred on the action (never past 1.8), 0.6 s power3.inOut.
- Frame rate feel: source frame rate (50p footage gives clean ramps); freezes are exact frames.
- Edit grammar: replay grammar: real speed first (3–6 s) → rewind → approach at 50 % → speed ramp 100→20→0 % over 0.3 s, starting 6 frames before the contact → freeze on the decision frame → draw → resume and let the play finish at 100 %; cut points on ball-contact frames; the voice leads each freeze by 0.3 s ("Watch the left-back"); match minute visible throughout.

## 8. Sound
- Bed: sparse ambient at −30 LUFS, or none.
- Effects: a tape-stop pitch-down (0.3 s) on each freeze, a soft felt-tip swipe per stroke (−24 dB), a short rewind whir; the match's own ambience ducked 10 dB under the voice.
- Mix: voice first; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: Remotion for frame-accurate footage timing (optional for short clips), HyperFrames for the overlay layer rendered with alpha (PNG sequence or ProRes 4444) or composited directly; 4 clicked pitch points per shot stored in JSON drive the homography; `kinetic-title` (phase labels), `word-captions`, `cover-still` (freeze with ring); recreations hand off to `tactics-board` / `templates/pitch-tactics-3d`.
- Signature scenes:
  - Freeze and ring: ramp to 0 in 0.3 s, spotlight dims the rest in 0.25 s, perspective ring 0.4 s, label plate "LATE STEP" slides 30 px in 0.25 s (new scene).
  - Two options: from the ball carrier a yellow arrow to the better pass, a red-orange arrow to the chosen one with a cross at 70 % of its length; 0.35 s each, 0.15 s apart (new scene).
  - Distance line: from foot to foot, end ticks, line 0.3 s, "4.2 m" from the calibration or "approx." (new scene).
  - Pinned resume: strokes fade to 50 % and stay locked to the pitch while the play resumes at 100 % (new scene, homography per frame).
- Steps: 1) confirm footage rights; 2) pick the decision frame and calibrate the pitch; 3) script freezes and strokes; 4) render overlays and composite; 5) `qa-review`.
- Style checks: strokes do not slide when the camera moves; freezes are sharp; never more than 3 strokes; rights recorded in `assets/CREDITS.md`.
- Common failures: upscaled mush (cap the zoom), strokes lost on yellow-green turf (shadow or white), freezes longer than 4 s, drawings that imply something the footage does not show.

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of broadcast sport replay analysis with on-screen pen drawing.
