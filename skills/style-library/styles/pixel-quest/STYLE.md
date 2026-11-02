<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Pixel Quest

> A 16-bit adventure: chunky pixel sprites, tile-built levels, dialogue boxes and level-up chimes — explaining a journey as a game.

| Engine | Best for | Effort |
|---|---|---|
| canvas (pixel-exact) | step-by-step journeys, "level up your skills", gaming and dev culture | medium–high |

## 1. Essence
- In one sentence: progress feels like a game you are winning.
- Three adjectives: playful, crisp, nostalgic.
- Signature move: a dialogue box types out a line, then an XP bar fills and "LEVEL UP" flashes.

## 2. Use it for / avoid it for
- Use for: learning paths, career steps, product onboarding as quests, dev tooling with humour.
- Avoid for: luxury, healthcare, anything needing photographic trust. Never reuse sprites or characters from existing games.

## 3. Palette
A limited palette of 16 colours, e.g.:
| Token | Hex | Job |
|---|---|---|
| night | #1A1C2C | background sky / UI boxes |
| deep | #333C57 | shadows, box borders |
| grass | #38B764 | ground |
| sand | #F4F4F4 / #FFCD75 | text, highlights |
| accent | #EF7D57 | player, XP bar |
| support | #41A6F6 | water, mana, links |

Rules: no colours outside the palette; no anti-aliasing; no alpha blending except for full-screen fades.

## 4. Type
- Pixel fonts: Press Start 2P or Silkscreen (OFL) at integer multiples of their base size (e.g. 8 px × 5 = 40 px); VT323 (OFL) for longer dialogue.
- Dialogue: max 2 lines × 22 characters per box.
- Language coverage: pixel fonts often lack latin-ext; test İ ş ğ ł early and fall back to VT323 or a bitmap-style alternative.

## 5. Surfaces and texture
- Native resolution 270 × 480 (1080×1920 ÷ 4), scaled ×4 with nearest-neighbour (`imageSmoothingEnabled = false`, CSS `image-rendering: pixelated`).
- Tile-based levels (16 px tiles), parallax sky layers, dithering instead of gradients.
- Never: blurry scaling, sub-pixel positions (round every coordinate), grid overlays.

## 6. Framing and layout
- Level view y 300–1300, dialogue box y 1320–1500 (inside the safe band), HUD (hearts, XP) at y 260.
- Characters move on a ground line; camera follows with dead-zone.

## 7. Motion
- Sprites animate at 8–12 fps (2–4 frame cycles), positions snap to whole native pixels.
- Jumps follow a parabola; hits flash the sprite white 2 frames.
- Text types at 30–40 characters/s with a blip per character (skip spaces).
- Transitions: pixel dissolve (dither fade), iris close, or screen slide like a room change.

## 8. Sound
- Bed: chiptune (square/triangle/noise channels), 120–140 BPM, −24 LUFS.
- Effects: coin, jump, level-up arpeggio, text blips at −30 LUFS.

## 9. Build recipe and checks
- Engine and templates: canvas engine at native resolution, scaled by CSS; `rng("tile", x, y)` for seeded decoration; `ease.steps(n)` for snappy moves.
- Steps: 1) define the palette; 2) draw original sprites (or license them); 3) build 2–4 tile rooms; 4) script quests on the voice; 5) render at 30 fps.
- Style checks: zoom into a still — every edge is a hard pixel step; no colours outside the palette; dialogue fits its box.
- Common failures: blurry upscaling, fractional camera positions causing shimmer, unreadable pixel text at small sizes.

## Credits
Original motionforge style in the general tradition of 16-bit games; original sprites only.
