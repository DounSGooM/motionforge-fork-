<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Keynote Dark

> A product-launch stage: near-black space, one luminous object, a gradient-lit headline word and big confident numbers revealed one at a time.

| Engine | Best for | Effort |
|---|---|---|
| hyperframes (CSS 3D / three.js) | launches, feature reveals, before/after numbers, annual recaps | medium |

## 1. Essence
- In one sentence: one thing at a time, shown like it matters.
- Three adjectives: premium, spacious, assured.
- Signature move: a hero object rotates slowly in a pool of light while a single word fades up beneath it.

## 2. Use it for / avoid it for
- Use for: product and feature reveals, milestone numbers, comparisons.
- Avoid for: dense tutorials, playful content.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| void | #050506 | background with a soft spotlight (#1C1D22) |
| ink | #F5F5F7 | headlines |
| muted | #86868B | sublines, units |
| accent | brand colour or #4CC2FF → #A6FF7A | gradient fill for one word or number |

Rules: one gradient word per screen; the hero object carries the colour, the UI stays neutral.

## 4. Type
- Display: Inter (OFL) 700–800, 110–160 px, tracking −0.04 em, centred.
- Numbers: Inter 800, 220–300 px, tabular figures, units at 40 % size in muted.
- Body: Inter 500 44 px muted, max 2 lines.

## 5. Surfaces and texture
- Deep black with one soft spotlight; subtle floor reflection under 3D objects.
- Materials: real product renders or photos (with rights), glass and metal highlights.
- Grain: very fine (≤ 5 %) to avoid banding in the dark gradient.
- Never: busy backgrounds, multiple gradients, grid backgrounds.

## 6. Framing and layout
- Hero object y 450–1150; headline y 1200–1350; subline beneath; lots of empty space.
- Number screens: number centred at y ≈ 860, label under it.

## 7. Motion
- Slow and smooth: 0.6–1.0 s fades and rises (power2.out), no overshoot.
- Hero rotation 8–15° over the whole beat; light sweeps across surfaces (specular band moving left → right in 1.2 s).
- Numbers count up over 1.2 s, then a gentle 1.03 pulse.
- Transitions: fade through black (0.4 s) or the object moves off and the next comes in on the same path.

## 8. Sound
- Bed: cinematic minimal pulse, swelling into reveals, −24 LUFS; silence (0.5 s) before the biggest reveal.
- Effects: soft whoosh on object moves, a low "boom" on the key number.

## 9. Build recipe and checks
- Engine and templates: HyperFrames with three.js or CSS 3D for the hero; `stat-counter` restyled (no ring, gradient number), `kinetic-title` for single words.
- Steps: 1) get real product imagery; 2) light it (one key light); 3) one idea per screen; 4) time reveals to the voice; 5) review for banding.
- Style checks: one gradient element per screen; no banding in the dark gradients (add grain); numbers have sources.
- Common failures: too many words per screen, fast cuts that break the calm, invented specs.

## Credits
Original motionforge style.
