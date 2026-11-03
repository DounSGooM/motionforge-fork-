<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Nature Field Notes

> A naturalist's notebook: an ink sketch of the animal draws itself and real footage fades in beneath until they match, with specimen tags on string, scale bars and coordinates in the margin.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Documentary & storytelling | canvas (sketch strokes) + hyperframes (plates, labels) | wildlife and plant profiles, ecology, trails and parks, citizen science | medium |

## 1. Essence
- In one sentence: patient observation, written down by hand and checked against the real thing.
- Three adjectives: curious, quiet, precise.
- Signature move: sketch to life — the drawn outline lies over the first frame of real footage, the footage plays, and the ink lifts away.

## 2. Use it for / avoid it for
- Use for: species profiles, migration and seasonal behaviour, park and trail guides, conservation updates, research summaries for a general audience.
- Avoid for: product and tech content, urban topics, anything without real photos or footage of the subject.
- Honesty: species identification checked against a field guide or an expert; footage from the user or under a reuse licence (CC0 / CC BY, credited). Nest, den and rare-plant locations are generalised to a region or rounded to 0.1° — exact coordinates can harm the animal. Maps from OpenStreetMap data ("© OpenStreetMap contributors") or Natural Earth (public domain).

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #E6DFC8 | notebook paper, warm, unevenly lit |
| ink | #2F3B2A | olive-black ink: sketches, handwriting, labels |
| accent | #F2661C | survey-tape orange: the subject's tag, the one coordinate pair, scale bars |
| support | #7C8B6A | lichen grey-green: secondary notes, pencil construction lines |
| tag | #F7F2E2 | specimen-tag card stock |

Rules: orange appears once per scene. Footage keeps natural colour, graded slightly warm so it sits on paper; no saturated greens painted on the page.

## 4. Type
- Display: Fraunces (OFL) italic 600, 96–120 px, optical size 72, sentence case — the common name.
- Scientific name: Fraunces italic 400, 44 px, always italic, genus capitalised, species lower case.
- Notes: Shadows Into Light Two (OFL) 46–56 px in ink, six words per note at most.
- Labels and data: DM Mono (OFL) 500, 30 px, uppercase, tracking 0.08 em — coordinates, dates, measurements.
- Fallback: Caveat (OFL, adds Cyrillic) for notes, EB Garamond italic for display. Load latin + latin-ext for all.

## 5. Surfaces and texture
- Background: notebook page with a centre light, optional gutter shadow along one edge (60 px), paper fibre, static grain 0.06.
- Materials: footage plates with a 14 px paper border and a torn bottom edge (seeded), specimen tags with an eyelet and 2 px string, tape strips at 60 % opacity, pressed-leaf cut-outs made from the user's photos (`tools/cutout.py`).
- Lines: ink 3–4 px with seeded pressure (width 70–110 % along the stroke); pencil construction 1.5 px at 35 %.
- Never: ruled or squared notebook lines (house rule), clip-art animals, generated "wildlife" shown as real.

## 6. Framing and layout
- 9:16 zones: common name y 250–400, scientific name y 420; main plate 900×900 at y 480–1380; notes and tag in margins (x 80–300 left, up to x 940 right); coordinate row y 1420; captions y 1500–1620.
- Other formats: 1:1 plate 760×760 on the left, notes column on the right; 16:9 a two-page spread, sketch on the left page, footage on the right.
- Density: one subject, up to three notes, one tag.

## 7. Motion
- Entrances: strokes draw at 900–1400 px/s in drawing order (outline, details, hatching); notes write at 18 chars/s; tags swing in from a pin, rotation 12° → 0 over 1.4 s elastic.out(1, 0.4).
- Exits: within a chapter elements fade 0.4 s; between chapters a page turn (skew + shading, 0.8 s power2.inOut).
- Holds and rhythm: slow; a new note every 3–5 s, footage plates hold 5–8 s.
- Transitions: sketch-to-footage dissolve 1.0–1.2 s; page turn between topics; never hard cuts on paper elements.
- Camera: footage inside plates pushes in 1 % per second; the page tilts at most 2° over 10 s.
- Frame rate feel: 30 fps footage; strokes drawn on ones.
- Edit grammar: nature-documentary pacing — footage shots 4–8 s, cut on animal action (head turn, take-off, landing), not on the word; narration leads the picture by 0.5–1 s (J-cut) so the behaviour is heard before it is seen; slow motion only from footage shot at 60/120 fps and conformed, never interpolated; time-lapse carries its real interval as a label ("1 frame / 10 min").

## 8. Sound
- Bed: sparse acoustic guitar, felt piano or strings, 70–90 BPM, −30 LUFS — or none, letting natural sound carry.
- Effects: real habitat ambience from the footage or licensed field recordings at about −24 LUFS; soft pencil scratch on notes (0.1 of voice); page turn.
- Mix: voice first; ambience ducks 4 dB under speech and swells in pauses; −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: canvas for pressure strokes, hyperframes for plates, tags and captions; `templates/globe-arcs-3d` for a migration-route opener; `word-captions`, `cover-still`.
- Signature scenes:
  - Sketch to life: outline draws in 1.5 s over a still of frame 1, footage fades 0 → 100 % under it in 1.2 s, ink fades out over the next 0.6 s.
  - Specimen tag: tag swings in on its string, then common name, scientific name, date and region type on in DM Mono at 24 chars/s.
  - Scale bar: a bar draws with end ticks in 0.4 s and its label writes on; its length must match the real size in the frame.
  - Range map: OSM or Natural Earth coastline in ink, range area fills with hatching at 40 % over 1.0 s, the generalised coordinate writes in orange; or `globe-arcs-3d` for long migration arcs.
  - Field count: five-bar tally marks draw at 0.15 s each beside a species name, from the user's survey data.
- Steps: 1) verified species list and footage credits; 2) trace sketch outlines from a still of each clip; 3) build plates and tags; 4) render, captions, ambience mix; 5) `qa-review`.
- Style checks: binomial names italic and spelled correctly; no exact sensitive coordinates; credit line on the final card.
- Common failures: sketch misaligned with footage (trace from the first frame); too many notes; over-sharp footage against soft paper (soften 0.3 px).

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of naturalists' field journals and wildlife documentary.
