<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Beauty Glow

> A soft blush field, a glossy specular highlight gliding across bottles and skin close-ups, falling droplets that ripple, and ingredient names in a high-contrast serif on thin rosewood leader lines.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| E-commerce & products | hyperframes (remotion for routine footage) | skincare and cosmetics, routines, ingredient explainers, salon services | medium |

## 1. Essence
- In one sentence: skin-close, soft-lit and dewy, with every ingredient named plainly where it sits.
- Three adjectives: soft, dewy, informed.
- Signature move: drop and ripple — a single droplet falls onto the texture swatch, a thin ring spreads out and the ingredient name appears at the ring's edge.

## 2. Use it for / avoid it for
- Use for: skincare and makeup products, routines, "what's in it" ingredient breakdowns, salon and spa services.
- Avoid for: medical treatments and claims, men's grooming in a rugged tone, anything needing hard numbers fast.
- Honesty: ingredients and percentages from the product's label (INCI list) supplied by the user; no medical claims ("cures", "treats"); before/after skin shots unretouched and dated, with "results vary"; no face-reshaping filters.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #F3DDD3 | blush field, lit to #FAEDE7 at the top-left |
| ink | #3A2626 | titles, ingredient names |
| accent | #C2476A | rosewood: callout dots, the active ingredient, step numbers |
| support | #FFF7F3 | highlight bloom, cards, droplet sheen |
| muted | #B89B8E | secondary text, leader lines |

Rules: rosewood on one ingredient or step at a time; skin tones are never tinted toward the palette. Darker field variant #2B1E1F for evening routines, ink #F7E6DE.

## 4. Type
- Display: DM Serif Display (OFL) 400, 86–110 px, sentence case, tracking −0.01 em.
- Body / captions: Figtree (OFL) 500, 42–48 px, 3–5 words per chunk.
- Labels: Figtree 600, 26 px, uppercase, tracking 0.16 em (ingredient %, step numbers, skin type).
- Language coverage: both ship latin-ext; check long INCI names wrap at 22 characters.

## 5. Surfaces and texture
- Background: blush with a soft top-left bloom (#FFF7F3 radial at 40 %), static grain 0.03 — kept low so skin stays clean.
- Materials: glossy bottles and jars (real photos/footage or a user-supplied 3D model), real macro texture swatches (cream smear, serum drop, powder), frosted cards with radius 32.
- Texture: specular streaks only on products, never painted over skin.
- Never: grid backgrounds, purple gradients, sparkles, skin smoothing beyond what was shot, stock models.

## 6. Framing and layout
- 9:16 zones: product or face close-up y 300–1200; callouts left x 70–360 and right x 720–1010 with leader lines; caption band y 1300–1520; step chip y 250.
- Other formats: 1:1 product centred, callouts on two sides; 16:9 face left half, routine steps on the right.
- Density: one product + up to 3 ingredient callouts; one routine step at a time.

## 7. Motion
- Entrances: 20 px rise + blur 8 → 0, 0.5–0.7 s power2.out; callout dot 0 → 1 with back.out(1.7) 0.3 s, line draws 0.35 s, label fades 0.3 s.
- Gloss pass: a white specular streak slides across the product in 1.2 s sine.inOut, masked to the product, peak 0.7.
- Drop and ripple: droplet falls 160 px with power2.in in 0.4 s, ring scales 0 → 1.6 and fades over 0.5 s.
- Exits: soft fade 0.4 s; swatches wipe away 0.6 s power2.inOut.
- Camera: slow push 1.00 → 1.05 on close-ups.
- Edit grammar: average shot 1.5–2.5 s; routine steps cut on the application action (pump press, swipe, pat); macro texture inserts 0.8–1.2 s; drops and pours at 50 % slow motion; match cuts from the product shape to the applied texture; talking parts 3–4 s.

## 8. Sound
- Bed: soft R&B or lo-fi, 85–95 BPM, −26 LUFS under voice.
- Effects: real cap click, pump, droplet and tap foley close-miked at 0.15 of voice level.
- Mix: voice soft and close; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: HyperFrames for callouts and swatches; `templates/checklist-reveal` for routine steps, `templates/word-captions`, `templates/cover-still`; `templates/product-turntable-3d` only if the user supplies a model; Remotion for routine footage.
- Signature scenes:
  - ingredient callout: dot, leader line, name in DM Serif, % in Figtree label, held 2 s.
  - drop and ripple: droplet lands on a swatch, ring spreads, ingredient name appears on the ring.
  - texture swatch: a real cream smear wipes on left to right in 0.6 s with a matched swipe sound.
  - routine steps: step chip "1 / 3" in rosewood, product + action clip, next step on the action cut.
  - gloss pass: specular streak over the packshot, then name and size.
- Steps: 1) get the INCI list, claims and product shots from the user; 2) shoot or select macro textures; 3) cut the routine on actions; 4) callouts to the voice; 5) mix, QA, claims check.
- Style checks: every ingredient and % matches the label; skin unfiltered; leader lines never cross the face.
- Common failures: blush field making pale skin look grey (switch to support #FFF7F3 behind faces); too many callouts (max 3).

## Overrides
None in the library copy.

## Credits
Original motionforge style, drawing on the general tradition of cosmetics still-life and macro texture photography.
