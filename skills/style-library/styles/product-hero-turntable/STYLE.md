<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Product Hero Turntable

> One product turning slowly on a white plinth in a cool-grey studio cove, soft contact shadow, thin leader lines snapping to features with teal dots and monospace specs.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| E-commerce & products | hyperframes + three.js | product launches, feature tours, spec explainers, store listings | medium |

## 1. Essence
- In one sentence: the product is the only thing on stage, and every feature gets its own angle and a label you can read.
- Three adjectives: precise, clean, tactile.
- Signature move: the turntable stop — the product eases to a three-quarter angle and three callouts snap on 0.12 s apart.

## 2. Use it for / avoid it for
- Use for: hardware, cosmetics packaging, bottles, shoes, bags, tools, anything with a shape worth turning.
- Avoid for: services and software (no object), food (use warm photo-led styles), products without a 3D model or turntable photos.
- Honesty: specs, dimensions, prices and claims come from the user's spec sheet; logos from the brand kit only; if a 3D model approximates the product, say so at delivery.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #DADDE1 | cool studio cove, lit to #EEF0F2 in the centre, #C3C7CD at the edges |
| pedestal | #F7F8F9 | white plinth and label cards |
| ink | #15181C | titles, spec values |
| accent | #00A8B5 | callout dots, the end of leader lines, the active spec |
| support | #6B7480 | units, secondary labels, leader lines |

Rules: the product's own colours always win; teal stays on dots and one value. Dark variant: background #16191D, pedestal #23272D, same accent.

## 4. Type
- Display: Space Grotesk (OFL) 700, 88–110 px, sentence case, tracking −0.03 em.
- Body: Space Grotesk 500, 40–44 px.
- Specs and labels: Space Mono (OFL) 400, 26–30 px, uppercase, tracking 0.08 em, tabular digits; units in support grey at 80 % size.
- Language coverage: both ship latin-ext on Fontsource; check °, ×, µ and the currency sign.

## 5. Surfaces and texture
- Background: infinity cove with no horizon line, radial light from above, static grain 0.04.
- Materials: matte white plinth (roughness 0.6), soft contact shadow ellipse (blur 30 px, 35 %), plinth reflection of the product at 12 % fading out over 80 px.
- Lighting: three-point area lights; key 45° left, rim from behind right for edge separation.
- Never: grid floors, purple gradients, lens flares, ripped or brand-owned 3D models without rights.

## 6. Framing and layout
- 9:16 zones: title y 260–420; product y 560–1240 (about 680 px tall); plinth top at y 1240; callouts in columns x 80–360 and x 720–1000; price / CTA y 1380–1560.
- Other formats: 1:1 product y 180–760, callouts on both sides; 16:9 product left of centre, spec stack on the right third.
- Density: product + up to 3 callouts; one spec stack at a time.

## 7. Motion
- Entrances: callout dot scales 0 → 1 with back.out(2) in 0.25 s, leader line draws 0.3 s power2.out, label types at 28 chars/s.
- Exits: callouts fade 0.2 s together before the next rotation.
- Holds and rhythm: turntable 360° in 8 s (45°/s, linear); stops of 1.5–2.5 s at feature angles, easing in with power2.out over 0.8 s.
- Transitions: match cut on rotation angle between the studio and real-use footage; hard cuts on the beat.
- Camera: orbit with 8° downward tilt; dolly 1.00 → 1.15 into a feature in 0.9 s power3.inOut.
- Frame rate feel: smooth 30 fps, motion blur off for crisp edges.
- Edit grammar: feature run at 1.0–1.8 s per shot, hero shots 2.5–3.5 s; cuts every two beats at 110–120 BPM; macro inserts 0.6–0.8 s; real-use footage ramps 100 → 25 % on the key action; final packshot holds 2.0 s.

## 8. Sound
- Bed: minimal electronic or house, 110–120 BPM, −24 LUFS under voice.
- Effects: soft mechanical tick on each turntable stop, a short blip per callout, at 0.15 of voice level.
- Mix: voice first; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: HyperFrames with three.js from `templates/product-turntable-3d` (user GLB or a 36-frame photo turntable at 10° steps), `templates/stat-counter` for numbers, `templates/cover-still` for the packshot.
- Signature scenes:
  - turntable stop: rotate, ease to 135°, three callouts snap on 0.12 s apart, hold 2 s.
  - exploded spec: product lifts 60 px, a teal ring glows on the plinth at 30 %, a 3-line spec stack counts up.
  - detail macro: camera pushes to 2.4× on one feature, the rest blurs 8 px, one label only.
  - dimension lines: width and height lines with arrowheads draw in 0.5 s, values in Space Mono from the spec sheet.
  - packshot: product centred, name, price from the user, CTA line, logo from the brand kit.
- Steps: 1) get model or photo set + spec sheet; 2) light and test-render one still; 3) script stops to the voice; 4) callouts and packshot; 5) mix, QA.
- Style checks: shadow touches the product base; every number matches the spec sheet; labels ≥ 26 px.
- Common failures: model too glossy (raise roughness), callouts crossing the product (route leader lines outward).

## Overrides
None in the library copy.

## Credits
Original motionforge style, drawing on the general tradition of studio product photography and technical spec sheets.
