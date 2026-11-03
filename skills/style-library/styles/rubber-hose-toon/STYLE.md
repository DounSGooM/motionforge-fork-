<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Rubber-Hose Toon

> Early-cartoon charm: bendy limbs without elbows, pie-cut eyes, everything bouncing to a jaunty beat, printed in sepia ink on cream.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Kids & animation | canvas or hyperframes (SVG) | light-hearted explainers, mascots, product personalities, seasonal posts | medium–high |

## 1. Essence
- In one sentence: even a spreadsheet can dance.
- Three adjectives: bouncy, cheeky, warm.
- Signature move: an object comes to life — grows arms and a face — and bounces in time with the music.

## 2. Use it for / avoid it for
- Use for: friendly brands, how-to with humour, holiday greetings, kids' education.
- Avoid for: serious or sensitive topics. Design original characters; never imitate existing cartoon characters.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| cream | #F3E6C8 | paper background |
| ink | #1E1A16 | lines and solid black shapes |
| sepia | #8A6A48 | shadows, secondary fills |
| accent | #D9452B | one red element (bow, button, highlight) |

Rules: mostly black-and-cream; colour appears as aged, slightly desaturated fills if at all.

## 4. Type
- Titles: Shrikhand or Lobster (OFL) 120 px, with a cream outline on black banners; or hand-lettered.
- Captions: Fredoka (OFL) 600, 50 px.
- Language coverage: check latin-ext in display fonts; Fredoka covers latin-ext.

## 5. Surfaces and texture
- Paper grain and faint stains, vignette in sepia.
- Lines: 5–7 px ink with slight thickness variation; a subtle line boil (redraw jitter every 2 frames, seeded).
- Film gate jitter 1 px, occasional dust.
- Never: gradients on characters, grid backgrounds.

## 6. Framing and layout
- Theatre staging: characters on a ground line at y ≈ 1350, title banner at the top (y 280–480).
- Round iris frame (black vignette circle) for intros and outros.

## 7. Motion
- Everything bounces on the beat: squash 0.9/1.1 on the downbeat, stretch on the upbeat.
- Rubber-hose limbs: limbs are smooth curves whose control points follow sines; no elbow/knee joints.
- Walks: 4-pose cycles on twos; idle "breathing" bounce on every character.
- Anticipation before every move (wind back 15 %), overshoot after (10 %).
- Transitions: iris in/out, title card on a black banner.

## 8. Sound
- Bed: ragtime / swing / jaunty piano (public-domain recordings or original), 110–140 BPM.
- Effects: slide whistle, woodblock, boing — synchronised to the bounce.

## 9. Build recipe and checks
- Engine and templates: canvas engine (curves via `ctx.bezierCurveTo`, beat-locked `Math.sin(TAU * t * bpm/60)`), `rng(frame >> 1)` for line boil.
- Steps: 1) design 1–2 original characters; 2) choose the tempo and write the beat grid; 3) block poses on beats; 4) add boil and paper; 5) review.
- Style checks: every motion lands on a beat; boil is subtle (≤ 1.5 px); characters read as silhouettes.
- Common failures: off-beat bounces, characters too detailed for the style, too many colours.

## Credits
Original motionforge style inspired by the general early-animation tradition; original characters only.
