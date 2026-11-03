<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Before / After Split

> One frame divided by a slider: "before" on the left under a grey tag, "after" on the right under a mint tag, a round handle scrubbing between them and arrows naming exactly what changed.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| E-commerce & products | hyperframes (remotion for timelapse footage) | renovations, cleaning, detailing, design makeovers, photo edits, product results | medium |

## 1. Essence
- In one sentence: the viewer judges the change with their own eyes, because both states share the same frame and the same angle.
- Three adjectives: fair, satisfying, exact.
- Signature move: the slider scrub — the divider sweeps in, pauses, then scrubs back and forth twice as if a finger were dragging it.

## 2. Use it for / avoid it for
- Use for: renovations, cleaning and detailing, garden and room makeovers, photo or video editing, haircuts, repairs, UI redesigns.
- Avoid for: health, weight-loss or medical results (regulated, easy to mislead), states shot from different angles or lights.
- Honesty: same camera position, lens, light and framing for both states; the "after" is not retouched beyond the change shown; edited or simulated images are labelled; product results carry "results vary" and the time between shots from the user.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #15171A | dark field around the comparison |
| ink | #F4F5F6 | titles, captions |
| accent | #3DDC97 | "after" tag, divider handle, arrows, callout circles |
| support | #9AA0A6 | "before" tag, dates, units |
| plate | #2A2D31 | label plates, handle ring |

Rules: mint belongs to the result side; the before side never gets the accent. The before image is shown as captured; a cool, desaturated grade is only applied if labelled as a visual cue, otherwise both sides keep their true colour.

## 4. Type
- Display: Barlow Condensed (OFL) 700, 110–140 px, uppercase, tracking 0.01 em.
- Tags: Barlow Condensed 600, 34 px, uppercase, tracking 0.12 em, on #2A2D31 plates.
- Body / captions: Barlow (OFL) 500, 44 px, sentence case.
- Labels: Barlow 500, 26 px (dates, durations: "Day 1 → Day 14").
- Language coverage: both ship latin-ext; check that BEFORE / AFTER translations fit in 320 px tags.

## 5. Surfaces and texture
- Background: flat #15171A with static grain 0.04; light variant #F2F3F1 for interiors.
- Materials: the comparison sits in a rounded frame (radius 24) with a 2 px #2A2D31 border; divider line 4 px white with a 72 px circular mint handle carrying two chevrons.
- Texture: none on images.
- Never: grid backgrounds, purple gradients, different crops on the two sides, invented results.

## 6. Framing and layout
- 9:16 zones: comparison 1080 × 1200 at y 260–1460; BEFORE tag top-left (x 40, y 300), AFTER tag top-right (x 760, y 300); captions y 1500–1640.
- Horizontal split (top/bottom) for tall subjects: before y 260–860, after y 860–1460.
- Other formats: 1:1 full-frame comparison, tags in corners; 16:9 split left/right at full height.
- Density: comparison + two tags + up to 2 arrows at once.

## 7. Motion
- Slider: divider enters from x 1080 to 540 in 0.9 s power2.inOut, pauses 0.6 s, scrubs to 160 and then 920 (0.5 s each, sine.inOut), returns to 540.
- Arrows: draw on 0.3 s power2.out, arrowhead pops with back.out(2) 0.15 s; callout circles stroke-draw 0.4 s.
- Exits: tags fade 0.2 s; the frame cuts to the next pair.
- Holds and rhythm: each pair 4–6 s; the after state holds at least 1.5 s at full width.
- Transitions: match flash — hard cut from before to after at identical framing with a 2-frame white flash at 30 %.
- Camera: locked; a 1.0 → 1.6 push into the detail that changed most, applied to both sides together.
- Edit grammar: average shot 2.5–4 s; reveals land on the beat; process montage of 3–6 clips at 0.6 s each between the states; timelapse at 400–800 % with a ramp back to 100 % for the final touch; never cut away during the scrub.

## 8. Sound
- Bed: minimal electronic or lo-fi, 90–100 BPM, −24 LUFS under voice.
- Effects: a riser into the reveal, a soft swipe on each scrub, a click when an arrow lands, at 0.15 of voice level.
- Mix: voice first; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: HyperFrames; slider is a new scene; `templates/stat-counter` for measured deltas, `templates/checklist-reveal` for the steps taken, `templates/kinetic-title` for the hook.
- Signature scenes:
  - slider scrub: enter, pause, two scrubs, settle centred; hook text above the frame from frame 0.
  - match flash: before holds 1.2 s, 2-frame flash, after holds 1.5 s.
  - process timelapse strip: 3–6 clips in a ramped timelapse with a Barlow day counter in the corner.
  - callout arrows: up to 2 mint arrows with 3-word labels pointing at the changes.
  - measured delta: a stat (e.g. "−38 dB", "2.1 → 0.4 s") with its unit and source, only when measured.
- Steps: 1) align before/after (same size, same crop, register with a few points if needed); 2) collect dates and measurements; 3) build pairs; 4) process montage; 5) mix, QA.
- Style checks: the two halves align at the divider (no jump); labels on the correct sides; every number has a measurement behind it.
- Common failures: misaligned images (re-register); before graded darker to exaggerate (match exposure).

## Overrides
None in the library copy.

## Credits
Original motionforge style, drawing on the general tradition of renovation and restoration comparison photography.
