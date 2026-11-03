<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Athlete Hype Reel

> Fast highlights of one athlete: on the decisive frame the action freezes, the frame turns to a crushed-black duotone, the athlete is lifted out, a huge wide name slams in behind them and electric-blue stat chips snap on.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Football & sports | remotion (footage cut) + hyperframes (slams and chips) | individual highlight reels, recruiting and scouting tapes, signing posts, season recaps, any sport | high |

## 1. Essence
- In one sentence: one person, their best moments, cut so the music feels like it was made for them.
- Three adjectives: explosive, personal, rhythmic.
- Signature move: the freeze slam: a speed ramp into a freeze, the frame goes duotone, the cut-out athlete steps forward and the name sits sandwiched between background and body.

## 2. Use it for / avoid it for
- Use for: recruiting tapes, end-of-season reels, signing or birthday posts for an athlete, combine and showcase clips, individual sports (tennis, athletics, combat, skate).
- Avoid for: team tactics (use `tactics-board`), news (use `transfer-breaking`), injury or sensitive stories.
- Honesty: footage must be the athlete's own, their club's with permission, or licensed; name and likeness used with the athlete's consent (a guardian's for minors); stats from official or verified records with season and competition; superlatives ("fastest in the league") only with a source; no AI-generated athlete images.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #08090B | crushed black, dark end of the freeze duotone |
| duotone-light | #DCE3EC | cool white, light end of the freeze duotone |
| ink | #FFFFFF | name, numbers |
| accent | #2D7BFF | electric blue: stat chips' edge, name underline, cut-out rim light (8 px, 40 %) |
| support | #3A3F47 | chip fill, secondary text plates |

Rules: live footage stays in natural colour, graded punchy (contrast +20, saturation +5); only freezes go duotone; blue never tints footage, it only lives on graphics.

## 4. Type
- Display: Unbounded (OFL) 900, 160–260 px, uppercase, tracking −0.03 em, skewed −8° by transform; surname huge, first name 64 px above.
- Body / captions: Exo 2 (OFL) 600 italic, 48–54 px, used sparingly (most reels are music-led).
- Labels: chips in Exo 2 700 italic, 40–48 px uppercase; numbers Exo 2 800 tabular; small labels Exo 2 600 26 px, tracking 0.14 em.
- Language coverage: both ship latin + latin-ext; long surnames step down to 160 px rather than wrap; fallback `"Arial Black", sans-serif`.

## 5. Surfaces and texture
- Background: footage; freezes as duotone with the cut-out in full colour or white-rimmed.
- Materials: parallelogram chips skewed 12°, support fill, 4 px blue leading edge; the name layer between duotone and cut-out for depth.
- Texture: static grain 0.08 on freezes only; no speed-line overlays.
- Never: purple gradients, backdrop grids, team crests or sponsor marks without rights, invented stats.

## 6. Framing and layout
- 9:16 zones: position and team line y 260–340; name slam y 700–1150 behind the athlete; chips stacked at x 60–620, y 1200–1500; captions (if any) y 1520–1640.
- Other formats: 1:1 name across the centre, chips bottom-left; 16:9 name across the lower half, chips right.
- Density: one name and up to 3 chips per freeze; nothing on live-action shots except a small position line.

## 7. Motion
- Entrances: ramp 100→25 % over 6 frames into the decisive frame, then freeze 1.2–1.6 s; one white frame at 30 % on the duotone switch; cut-out scales 1→1.06 in 0.25 s power3.out; name slams from scale 1.6 with blur 20→0 px in 0.18 s power4.out plus a 2-frame seeded shake (±8 px); chips snap in from 120 px left, 0.16 s power4.out, 0.07 s stagger, numbers count 0.4 s.
- Exits: unfreeze ramp 25→100 % in 0.3 s; graphics cut off hard on the resume frame.
- Holds and rhythm: freezes ≤ 1.6 s; 3–5 freezes per 30 s.
- Transitions: hard cuts on beats; whip pans of 0.15 s between plays.
- Camera: keyframed digital punch-ins 1.0→1.15 within shots; a seeded shake on impacts.
- Frame rate feel: 60–120 fps sources for ramps, delivered at 30 fps.
- Edit grammar: build-up shots 0.6–1.2 s, key plays 1.5–2.5 s at real speed; cut on action (contact, release, landing); a freeze slam every 4 or 8 bars; ramps 100→30→100 % over 1.0 s around peak action; the best play goes last before the end card; the end card (name, position, contact or handle) holds 2.5 s.

## 8. Sound
- Bed: high-energy hip-hop, drum and bass or hybrid trailer music, 140–170 BPM; −16 to −14 LUFS when music-led, −24 under a voice.
- Effects: impact hits on slams, a reverse swell into each freeze, real game audio (crowd, ball, shoes) 2–4 dB under the music on key plays.
- Mix: final −14 LUFS integrated, true peak ≤ −1 dBTP; cuts and slams within ±1 frame of the beat.

## 9. Build recipe and checks
- Engine and templates: Remotion for the cut (beat markers from the track, frame-accurate ramps); HyperFrames for slams and chips; `tools/cutout.py --auto-crop` per freeze frame; `kinetic-title` (name slam), `stat-counter` (chips), `cover-still` (end card and thumbnail).
- Signature scenes:
  - Freeze slam: ramp → freeze, duotone, cut-out lift, name behind the body, 2-frame shake (new scene + `kinetic-title`).
  - Chip stack: three chips snap 0.07 s apart, numbers count 0.4 s (`stat-counter`).
  - Peak ramp: 100→30→100 % over 1.0 s with a 1.15 punch-in at the peak frame (new Remotion scene).
  - Bio end card: duotone portrait, name, position, height, club and year, contact; holds 2.5 s (`cover-still`).
- Steps: 1) collect clips and consents, log the best 12–20 plays; 2) mark beats and pick 3–5 freeze frames; 3) cut out the athlete on each freeze; 4) cut and composite; 5) `qa-review`.
- Style checks: cut-out edges clean at 360 px wide; the name never crosses the face; every stat sourced; slams on the beat.
- Common failures: muddy cut-outs from motion-blurred frames (pick a sharper frame), too many freezes (keep 3–5), music too loud for a voice-over.

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of sports highlight mixtapes and athletic poster design.
