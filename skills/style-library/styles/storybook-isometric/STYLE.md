<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Storybook Isometric

> Small, tidy isometric worlds in soft pastel paint — tiny houses, roads and machines that assemble themselves while a calm voice explains how things connect.

| Engine | Best for | Effort |
|---|---|---|
| canvas or hyperframes (CSS 3D / three.js orthographic) | systems, processes, cities, supply chains, "how the internet works" | high |

## 1. Essence
- In one sentence: a complicated system shown as a friendly miniature you could hold in your hand.
- Three adjectives: cosy, orderly, curious.
- Signature move: blocks drop onto an island one by one and a little path lights up between them.

## 2. Use it for / avoid it for
- Use for: processes with steps, data flows, logistics, ecosystems, onboarding explainers.
- Avoid for: news, opinion, anything needing real people or real product UI.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| sky | #EAF2F0 | background field (very light mint) |
| ground | #CFE3C5 | island tops |
| side-light | #F5EBDD | lit faces of buildings |
| side-dark | #C9B8A6 | shaded faces |
| ink | #2E3440 | outlines (1.5–2 px), labels |
| accent | #F08A4B | the thing being explained (packet, car, path) |
| support | #7FB7D9 | water, secondary paths |

Rules: three-tone shading per object (top light, left mid, right dark) — consistent light from the top-left.

## 4. Type
- Labels: Nunito or Baloo 2 (OFL) 700, 40–48 px, sentence case, on small rounded white tags with a leader line.
- Titles: Fraunces (OFL) 600, 90 px, soft serif.
- Language coverage: Baloo 2 covers Devanagari as well as latin-ext.

## 5. Surfaces and texture
- Isometric 2:1 projection (30°), no perspective.
- Matte paint look: flat fills + a subtle paper texture (multiply, 6 %).
- Soft contact shadows under objects (blurred ellipse, 15 %).
- Never: a visible isometric grid on the background; floor tiles only where they are part of the world (a plaza, a field).

## 6. Framing and layout
- The island occupies y 500–1400 in 9:16; title above, label tags around, captions below 1500.
- Camera stays orthographic; framing changes are pans and scale.
- One focal object at a time is in the accent colour.

## 7. Motion
- Build-up: objects drop from 120 px above with a bounce (spring, slight overshoot, 0.4 s), 0.15 s apart.
- Flows: packets/cars move along paths at constant speed with eased starts/stops; dashed path draws ahead of them.
- Camera: slow drift (2–3 % per 5 s) and gentle push-ins to the active step.
- Idle life: chimneys puff, trees sway 1–2° on a seeded sine, water shimmers — always deterministic.
- Transitions: the island rotates 90° (fake via swapped layouts) or the camera pans to the next island.

## 8. Sound
- Bed: music-box or soft marimba, 80–100 BPM, −28 LUFS.
- Effects: wooden "tok" when blocks land, soft whoosh for movement, a chime for the payoff.

## 9. Build recipe and checks
- Engine and templates: canvas engine with an iso helper (x, y, z → screen) or three.js orthographic camera in a HyperFrames scene; labels via HTML on top.
- Steps: 1) storyboard the system as 3–6 stations; 2) model blocks as simple prisms; 3) script the build order on the voice; 4) animate flows; 5) label and review.
- Style checks: one light direction everywhere; labels never overlap objects' tops; accent only on the active part.
- Common failures: scenes too dense to read on a phone (max ~8 objects), inconsistent iso angles.

## Credits
Original motionforge style in the general tradition of isometric illustration.
