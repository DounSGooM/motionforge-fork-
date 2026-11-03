<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Impact Annual

> A nonprofit's year on warm unbleached paper: tally marks bundle into big totals, project pins drop onto a quiet map, deep-green counters carry their footnotes, and documentary photos come with full captions.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Nonprofit & causes | hyperframes + three.js (globe opener) | annual impact recaps, donor thank-yous, grant and programme reports | medium |

## 1. Essence
- In one sentence: a thank-you that shows its working.
- Three adjectives: grateful, transparent, organised.
- Signature move: the tally bundle — marks draw in fives, the bundles slide together and collapse into one large green number.

## 2. Use it for / avoid it for
- Use for: annual reports as video, donor updates, end-of-year campaigns, "where your money went".
- Avoid for: single-person stories (use `cause-documentary`), emergency appeals, campaigns without published figures.
- Honesty: every figure comes from the organisation's published report or audited accounts, with reporting period and source on screen; "people reached" is defined (direct vs indirect) in a footnote; spending splits add up to 100 %. Maps use Natural Earth or OpenStreetMap data with credit, and show projects at town or district level — never where beneficiaries live. Photos only with consent and a photographer credit; donor names only with permission.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #F3EBDD | unbleached cotton paper, soft centre light |
| ink | #1D2A26 | green-black text |
| accent | #1F7A5C | deep green: totals, pins, progress |
| support | #C9A27E | warm clay: a second series, land fill on maps at 30 % |
| muted | #8E8A80 | footnotes, sources, captions |

Rules: one green element per frame does the pointing; clay for a second series only. Red only when honestly reporting a shortfall.

## 4. Type
- Display: Bricolage Grotesque (OFL) 800 — numbers 180–240 px tabular, titles 90–110 px sentence case, tracking −0.03 em.
- Body: Karla (OFL) 500, 44 px.
- Footnotes and sources: Azeret Mono (OFL) 400, 24–26 px, in muted.
- Fallback: Schibsted Grotesk for display, Figtree for body. All load latin + latin-ext; Bricolage adds Vietnamese.

## 5. Surfaces and texture
- Background: cotton paper with fibre, grain 0.05, soft centre light.
- Materials: photo plates with square corners and a 16 px paper border, caption underneath in Karla 30 px (who, where, when, photographer); maps with land in clay at 30 %, sea left as paper, borders 1 px ink at 25 %.
- Lines: tally strokes 6 px with rounded ends and slight seeded wobble.
- Never: grid backgrounds, chart gridlines, 3D pies, pies with more than five slices, stock photos presented as programme photos.

## 6. Framing and layout
- 9:16 zones: title y 260–420; number y 520–780; label y 800–880; photos 900×1000 at y 460–1460; map y 460–1400; captions y 1460–1580; footnote y 1600–1660 whenever a number is on screen.
- Other formats: 1:1 number left, label and footnote right; 16:9 number or map on the left two thirds, photo on the right.
- Density: one number, one map or one photo per scene.

## 7. Motion
- Entrances: counters count in 1.4 s power3.out, label slides 30 px in 0.3 s, footnote fades 0.3 s; map pins drop 60 px with back.out(2) in 0.35 s, staggered 0.05 s in order of project start.
- Exits: scenes leave by paper slide — the next scene slides up like a page, 0.5 s power3.inOut.
- Holds and rhythm: one figure every 3–4 s; photos 3–5 s between figure blocks so numbers stay human.
- Transitions: paper slide between chapters; hard cuts inside a chapter on stressed numbers.
- Camera: photos push 2 % over 4 s; maps pan 1.0 s power2.inOut between regions.
- Frame rate feel: smooth 30 fps.
- Edit grammar: recap order — reach → programmes → map → money → thanks; cuts land on the stressed number in the voice; photos sit between number blocks; the thank-you card holds 4 s with the ask.

## 8. Sound
- Bed: warm acoustic guitar and light percussion, 96–108 BPM, −28 LUFS.
- Effects: very soft pencil ticks on tally marks, a warm chime when a total lands — 0.1 of voice.
- Mix: voice first; −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: hyperframes; `templates/globe-arcs-3d` for the opener (pins on project countries, arcs from the head office); `stat-counter` for totals; `checklist-reveal` for programme lists; `cover-still`. Keep charts 2D — `bars-3d` distorts comparisons here.
- Signature scenes:
  - Tally bundle: marks at 0.08 s each, the fifth crossing stroke at 0.12 s; a key reads "each mark = 1,000 people"; bundles slide together in 0.6 s power3.inOut and turn into the total, which counts the last 15 % in 0.5 s.
  - Project map: pins drop by start date, each country gets a count badge, credit line at the bottom.
  - Money split: one 100 % bar grows in 0.8 s, segments separate with labels at 0.3 s stagger; segments must sum to 100.
  - Photo plate: photo pushes, caption with who, where, when and photographer fades in 0.3 s.
  - Donor wall: permitted names scroll in three columns at 60 px/s, or a single count ("4,812 donors") when names are not cleared.
- Steps: 1) figure sheet copied from the report with page references; 2) map data and project list at town level; 3) photo selection with consent and credits; 4) build scenes, captions, mix; 5) `qa-review` against the figure sheet.
- Style checks: every number shows period and source; split adds to 100 %; no pin at a sensitive location; all photos credited.
- Common failures: mixing direct and indirect reach in one total; false precision (round as the report does); a map so dense the pins merge (cluster by country).

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of nonprofit annual reports and documentary photography.
