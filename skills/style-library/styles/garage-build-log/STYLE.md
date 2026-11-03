<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Garage Build Log

> A workshop diary: parts laid out flat on a dark shop mat, masking-tape labels in marker, stencilled day numbers, torque specs with a paint-pen stripe, and before/after wipes from the same angle.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Automotive | hyperframes (overlays) + remotion (optional, footage-heavy edits) | car and motorbike builds and restorations, maintenance how-tos, workshop and parts-shop accounts | medium |

## 1. Essence
- In one sentence: the honest grind of a build, one day and one job at a time.
- Three adjectives: hands-on, methodical, gritty.
- Signature move: the torque stamp: on the exact frame the torque wrench clicks, a stencilled "45 N·m" sprays on beside the bolt and a yellow paint-pen stripe draws across its head.

## 2. Use it for / avoid it for
- Use for: build diaries, restorations, service and repair how-tos, parts unboxing for workshops, before/after reveals.
- Avoid for: spec and performance comparisons (use `car-spec-hud`), glossy dealer promos, procedures the user has not actually done.
- Honesty: torque values, part numbers, fluids and procedures come from the service manual or the user's documented values ("per service manual"); safety-critical steps (brakes, steering, lifting) show a safety line ("Use axle stands") and never skip steps; costs and hours from the user's log. Maker logos appear only as they are on real parts in the footage; none are added as graphics without rights.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #26292B | shop-mat grey, flat-lay surface and fallback field |
| ink | #F2EEE4 | chalky off-white titles and captions |
| tape | #E8DDBF | masking-tape label strips |
| marker | #1A1A1A | marker text on tape |
| accent | #F5C400 | paint-pen yellow: torque stripes, step numbers, before/after divider |
| support | #8F8A80 | part numbers, dates, muted text |

Rules: yellow means "done or checked": a tightened bolt, a finished step, the divider; tape labels carry most on-footage text; nothing glossy or gradient.

## 4. Type
- Display: Big Shoulders Stencil Display (OFL) 800, 120–180 px, uppercase, tracking 0.04 em ("DAY 14", "REAR BRAKES").
- Body / captions: Courier Prime (OFL) 700, 44–48 px on an 80 % black plate; specs Courier Prime 700 34–40 px ("M10 × 1.25 · 45 N·m").
- Labels: Caveat (OFL) 700, 44–56 px in marker black on tape, 1–4 words.
- Language coverage: all three ship latin + latin-ext; check "·", "×" and "N·m"; fallback `"Courier New", monospace` and `"Bradley Hand", cursive`.

## 5. Surfaces and texture
- Background: the user's workshop footage and overhead flat-lays on a shop mat (even, diffused light); flat fallback #26292B with rubber-mat noise (4 %) and grain 0.07.
- Materials: tape strips with ragged ends at seeded −3° to 3°; paint-pen ticks; stencil numbers with a soft 3 px overspray edge; zip-tie tags and parts bags as filmed props.
- Texture: static grain 0.07; footage graded slightly cool in shadows, warm in highlights, contrast +10.
- Never: added maker logos, a drawn pegboard or grid as backdrop (a real pegboard in footage is content), purple, invented cost totals.

## 6. Framing and layout
- 9:16 zones: day stamp top-left y 250–420; day counter chip top-right x ≤ 900; footage or flat-lay full frame; tape labels pinned near parts with 2 px leaders; spec plate y 1320–1440; captions y 1460–1620.
- Other formats: 1:1 same logic, labels tighter; 16:9 labels on both sides of the flat-lay.
- Density: up to 6 tape labels per flat-lay; one spec plate at a time.

## 7. Motion
- Entrances: tape labels drop 30 px and rotate from 4° to their seeded angle in 0.28 s back.out(1.8); paint-pen ticks draw 0.2 s; torque stripes 0.25 s; stencils fade on with overspray in 0.15 s; spec plate slides 40 px in 0.3 s power3.out.
- Exits: labels peel: rotate 8°, rise 20 px, fade, 0.2 s.
- Holds and rhythm: labels 1.5–2.5 s; spec plates 2.5 s.
- Transitions: hard cuts; before/after vertical wipe with a 6 px yellow divider over 0.9 s power2.inOut, held at 50/50 for 1 s, then completed.
- Camera: locked-off overhead for flat-lays; handheld or gimbal for work; macro inserts on threads, gaskets, welds.
- Frame rate feel: 30 fps for footage; stop-motion flat-lays held for 4 frames per new part (7.5 fps feel).
- Edit grammar: build-diary cadence: process shots 1.2–2.0 s, explanation shots 3–4 s; cut on the action (wrench turn, part seating, the torque wrench click frame); time-lapse 8–20× for long jobs with a clock chip; workshop sound J-cut 0.3 s ahead of the picture; each day opens with its stencilled stamp and ends with a same-angle before/after.

## 8. Sound
- Bed: lo-fi or garage-rock instrumental, 90–110 BPM, −28 LUFS under the voice, or none.
- Effects: real workshop sound (ratchet, impact gun, air line); the torque wrench click lifted 3 dB when its spec appears; a tape rip (CC0) per label.
- Mix: voice first; tools ducked 10 dB under speech; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: HyperFrames overlays on footage, Remotion optional for long cuts; `hyperframes + three.js` with `templates/product-turntable-3d` only for a user-scanned or CC0 part in exploded view; `checklist-reveal` (parts and job list), `stat-counter` (day, hours, torque), `cover-still` (split before/after thumbnail), `word-captions`.
- Signature scenes:
  - Knolling flat-lay: overhead stop motion, one part appears every 4 frames into rows with 40 px gaps, tape labels stick, final hold 1.5 s (new scene).
  - Torque stamp: macro of the bolt; on the click frame a stencil "45 N·m" sprays on and a yellow stripe crosses the bolt head (new scene + `stat-counter`).
  - Day log: stencil "DAY 14", date and hours chip; today's jobs tick off in yellow (`checklist-reveal`).
  - Same-angle reveal: before and after shot from a marked tripod spot, aligned within 2 %, yellow divider wipe 0.9 s (new scene; `cover-still` for the thumbnail).
- Steps: 1) log each day's jobs, values and sources; 2) shoot flat-lays and before shots from marked positions; 3) cut on the action; 4) add tape labels and spec plates from the log JSON; 5) `qa-review`.
- Style checks: every torque value sourced; safety line present on safety-critical steps; tape text legible at 360 px; before/after aligned.
- Common failures: labels covering the part they name, specs typed from memory, flat-lays shot at an angle (shoot straight down), too many labels in one frame.

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of workshop build diaries, knolled flat-lays and stencilled shop markings.
