<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Retro Anime Cel

> Hand-painted look of late-20th-century cel animation: hard-edged shadow shapes, glowing highlights, dramatic speed lines and sunset skies — energy and nostalgia.

| Engine | Best for | Effort |
|---|---|---|
| canvas (or hyperframes with SVG) | dramatic hooks, launches, "the moment everything changed", music-driven pieces | high |

## 1. Essence
- In one sentence: an ordinary moment staged like the climax of a series opening.
- Three adjectives: dramatic, glowing, nostalgic.
- Signature move: a held key frame with a two-tone shadow, then a burst of speed lines and a lens flare as the title slams in.

## 2. Use it for / avoid it for
- Use for: hooks, product reveals, sports or gaming topics, fan-friendly communities.
- Avoid for: serious data, B2B compliance topics. Never imitate a specific series, character or studio; design your own.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| dusk | #2B1E4F → #F2785C | sky gradient (as an object in the scene, not a flat UI background) |
| ink | #1B1426 | line art |
| skin-light / skin-shadow | #F6D3B3 / #D49A86 | two-tone shading example for characters |
| neon | #5CF2E6 | highlights, speed lines, UI glints |
| accent | #FF4F7B | title, impact frames |

Rules: every object has exactly two tones (lit + shadow) plus an optional rim light; no soft gradients on objects.

## 4. Type
- Titles: Anton or Bebas Neue (OFL) 160 px, italic skew −8°, with a 6 px ink outline and offset neon shadow.
- Captions: M PLUS Rounded 1c (OFL; Latin + Japanese) 700, 52 px, white with ink outline.
- Language coverage: M PLUS families cover Japanese; check latin-ext for European languages.

## 5. Surfaces and texture
- Cel look: flat fills, crisp 3–4 px ink lines, hard shadow shapes, painted backgrounds with softer brush texture.
- Film feel: light grain, slight chromatic fringe on highlights, occasional dust.
- Never: 3D-rendered shading on characters, grid backgrounds.

## 6. Framing and layout
- Strong diagonals; low or high angles; subject on a third.
- Impact frames: full-bleed accent colour with ink silhouettes (1–3 frames).
- Title in the middle band (y 700–1100), captions ≤ 1500.

## 7. Motion
- Animate on twos (hold each drawing 2 frames at 24 fps) for characters; camera moves on ones.
- Pans across painted backgrounds (slow, linear), sudden zoom punches (0.1 s) on hits.
- Speed lines radiate from the focal point for 6–10 frames on reveals.
- Smears: 1–2 stretched frames on fast moves.
- Transitions: white flash cut, or a diagonal wipe with speed lines.

## 8. Sound
- Bed: synth-pop / city-pop style instrumental (original or licensed), 110–125 BPM, −24 LUFS.
- Effects: whoosh + impact on title slams, glint "ting" on highlights.

## 9. Build recipe and checks
- Engine and templates: canvas engine (`ease.steps` for held frames, `rng` for seeded speed lines); `kinetic-title` restyled for titles.
- Steps: 1) design original characters/props; 2) paint 3–6 key backgrounds; 3) stage key poses; 4) add speed lines/flares on beats; 5) review at phone size.
- Style checks: line weights consistent, two-tone shadows consistent with the light, held frames actually hold.
- Common failures: characters that resemble existing franchises (redesign), overusing impact frames (they flash — max one per 5 s; avoid rapid flashing for photosensitive viewers).

## Credits
Original motionforge style inspired by the general cel-animation tradition; no characters or designs from existing works.
