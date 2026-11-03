<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Science Lab

> A bright lab bench: clean labelled glassware, ball-and-stick molecules turning in 3D beside it, a reagent that changes colour on cue, and measurement callouts with proper units.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Education & explainers | hyperframes + three.js | chemistry, biology and physics demos, "what happens when…", school and university science | high |

## 1. Essence
- In one sentence: see the experiment and the particles behind it at the same moment.
- Three adjectives: bright, exact, hands-on.
- Signature move: the liquid in a beaker flips colour while the molecule in the inset breaks and re-forms its bonds.

## 2. Use it for / avoid it for
- Use for: chemical reactions, states of matter, cell biology, lab techniques, a science headline explained.
- Avoid for: medical advice, home experiments with hazardous materials, topics with no physical setup.
- Honesty and safety: equations balanced and checked; quantities and results come from the user's experiment or a cited source; footage of hazardous work shows goggles and gloves, plus a visible "trained staff, do not try at home" line where it applies; on-screen colour changes match the real indicator; simulated footage is labelled "simulation".

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #EDF4F1 | lab white with a hint of green, soft top light |
| ink | #14303A | deep teal-black: labels, equations, outlines |
| accent | #E0337B | indicator magenta: the thing changing now, the active label, arrows |
| glass | #9CCFD3 | glassware tint and default liquid |
| support | #5E7A82 | units, leader lines, secondary labels |

Rules: magenta marks change, nothing else. Atoms follow the usual CPK convention (carbon dark grey, hydrogen white with an outline, oxygen red, nitrogen blue) — that is content, not palette, and stays consistent for the whole video.

## 4. Type
- Display: Lexend (OFL) 700, 96–120 px, sentence case, tracking −0.02 em.
- Labels: Atkinson Hyperlegible (OFL) 700, 34 px — clear l/1/I and 0/O in formulas; subscripts and superscripts at 70 % size, never faked with spacing.
- Equations: Atkinson Hyperlegible 400, 56 px; check that → and ⇌ render.
- Captions: Lexend 600, 50 px.
- Fallback: Noto Sans (Greek for μ and Δ, Cyrillic, Devanagari). Load latin + latin-ext everywhere.

## 5. Surfaces and texture
- Background: flat bench white with a soft top light and a faint reflection band at the bench edge (y 1350), grain 0.03.
- Materials: glassware as clean vector shapes with two highlights (a 6 px vertical streak at 20 % white and a rim ellipse), liquids with a curved meniscus; molecules in three.js ball-and-stick (sticks 0.24 of atom diameter, MeshStandardMaterial roughness 0.35); real lab footage from the user.
- Texture: almost none — clean is the point.
- Never: graph-paper or grid backgrounds behind apparatus, sci-fi glows, glowing DNA clichés, bubbling green potions.

## 6. Framing and layout
- 9:16 zones: title y 250–420; apparatus y 450–1300; molecule inset 360 px circle at x 80–440, y 460–820 (away from the button rail); equation line centred y 1330–1420; captions y 1480–1620.
- Other formats: 1:1 apparatus left, inset right; 16:9 apparatus centre, molecule right third, equation along the bottom.
- Density: one apparatus, at most five labels, one molecule inset.

## 7. Motion
- Entrances: label leader lines draw from the part in 0.3 s power2.out, text fades 0.2 s, 0.15 s stagger; apparatus outlines draw in 0.8 s.
- Exits: labels fade 0.3 s; apparatus slides out 200 px in 0.4 s power2.in.
- Holds and rhythm: 3–5 s per step; a reaction gets the time it needs.
- Transitions: match cut — push into the liquid until it fills the frame, cut to the molecule scene on the same magenta; hard cuts between method steps.
- Camera: 2D static with a 3 % push on the active part; 3D orbit within 15°; molecules spin 20–30°/s on y.
- Frame rate feel: smooth 30 fps.
- Edit grammar: lab-demo pacing — real footage shots 2–4 s, cut on the action (pour, drop, flame touch); a macro insert follows each wide; slow reactions become time-lapse with a speed badge ("×8") in a mono pill, and speed ramps only on real footage with that badge; the equation appears after the viewer has seen the effect.

## 8. Sound
- Bed: light plucked electronic, 100–110 BPM, −28 LUFS.
- Effects: glass clink, pour, fizz — prefer real sound from the footage; a soft tick on each label at 0.12 of voice.
- Mix: voice first; −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: hyperframes + three.js; `templates/product-turntable-3d` for one instrument or a user-supplied GLB; `checklist-reveal` for method steps; `stat-counter` for measurements; `kinetic-title`; `word-captions`.
- Signature scenes:
  - Labelled apparatus: outline draws 0.8 s, then up to five labels stagger in on leader lines.
  - Bond swap: reactants in the inset, an arrow draws, sticks shrink to their midpoint (0.3 s), atoms drift 0.6 s power2.inOut, new sticks grow 0.3 s.
  - Indicator flip: a drop falls (0.4 s power2.in), the liquid hue tweens to magenta over the real reaction time scaled and labelled.
  - Measurement callout: a bracket runs from the meniscus to the scale tick, the value types on with correct significant figures ("25.0 mL").
  - Scale jump: beaker → cell or crystal → molecule in three cuts with scale labels (cm, µm, nm).
- Steps: 1) method and claim list; 2) molecule coordinates from a public structure database, checked; 3) apparatus SVG and three.js scenes; 4) footage edit, captions, mix; 5) `qa-review`.
- Style checks: units and significant figures; equations balanced; atom colours consistent; safety line where needed.
- Common failures: wrong molecular geometry (use real coordinates); label clutter (five max); liquid colours that do not match the real reaction.

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of classroom science demonstrations and textbook lab diagrams.
