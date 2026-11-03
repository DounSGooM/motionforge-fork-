<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Clinic Clean

> Bright clinical white, one calm blue, numbered icon steps and a highly legible sans — health information that reads like a well-made patient leaflet in motion.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Fitness, health & wellness | hyperframes | clinic and practitioner explainers, symptom/prevention info, procedure steps, appointment guides | low |

## 1. Essence
- In one sentence: trustworthy health information, one step at a time, nothing that looks like an ad.
- Three adjectives: clear, reassuring, accurate.
- Signature move: the numbered step rail — circled step numbers on a thin blue line down the left edge; the current step's icon tile slides in beside it and the previous steps dim to 40 %.

## 2. Use it for / avoid it for
- Use for: "what to expect at your appointment", prevention tips, how a test or treatment works, aftercare instructions, clinic and practitioner introductions.
- Avoid for: emotional fundraising (use `cause-documentary`), fitness hype, anything requiring a diagnosis on screen.
- Honesty: every medical statement needs a source the user provides (guideline, practitioner); the source line is visible on screen. No before/after patient images without written consent; no invented testimonials, success rates or prices. Add "General information, not a diagnosis" when the content gives advice.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #F6F9FB | clinical white field |
| ink | #13293D | headlines and body |
| accent | #2A7FC9 | step numbers, active icon tile, rail, links |
| support | #D6E6F2 | icon tile fills, inactive steps, card borders |
| caution | #C8553D | warning tiles only ("seek urgent care if…") |

Rules: accent covers under 10 % of the frame. Caution appears only on genuine warning content, never for emphasis. Body text contrast ≥ 7:1 (ink on white is 14:1). Dark variant for night waiting-room screens: background #0F1E2B, ink #EAF2F8, accent #5AA5E6.

## 4. Type
- Display: Atkinson Hyperlegible (OFL) 700, 84–104 px, sentence case, tracking −0.005 em.
- Body / captions: Atkinson Hyperlegible 400, 48–54 px, line height 1.3, max 32 characters per line.
- Labels and source line: IBM Plex Mono (OFL) 400, 26 px, sentence case.
- Language coverage: both ship latin + latin-ext; fallback `Verdana, system-ui, sans-serif`. Medical terms keep their diacritics; check every glyph with `tools/textcheck.mjs`.

## 5. Surfaces and texture
- Background: flat #F6F9FB with a barely visible top light (3 %); no grain on text areas, 0.03 grain on the field.
- Materials: rounded icon tiles (180 px, radius 36 px, fill support, 4 px stroke icons in accent), white cards with a 1 px #D6E6F2 border and a 0 12 32 rgba(19,41,61,0.08) shadow, real photos of the user's clinic and staff.
- Texture: none beyond the faint grain.
- Never: grid backgrounds, purple gradients, stock "doctor with stethoscope" photos, 3D anatomy you cannot verify, red cross symbols (protected emblem).

## 6. Framing and layout
- 9:16 zones: title y 260–460; step rail x 96, y 560–1440; icon tile + text column x 180–960; source line y 1600; captions (if voiced) y 1500–1570 when no rail is present.
- Other formats: 1:1 rail becomes a horizontal row of numbers across the top; 16:9 rail left, content middle, photo right third.
- Density: max 4 steps visible; one active step carries a tile, a 2-line text and nothing else.

## 7. Motion
- Entrances: tiles slide in 60 px from the left in 0.4 s (`power2.out`); text fades + rises 20 px, 0.3 s, 0.08 s after the tile; step numbers scale 0.6 → 1 with `back.out(1.4)` 0.3 s.
- Exits: previous step dims to 40 % opacity in 0.3 s instead of leaving; whole screen fades 0.3 s between sections.
- Holds and rhythm: one step every 3–5 s (long enough to read twice); the rail fill line grows to the active step in 0.5 s `power1.inOut`.
- Transitions: soft cross-fades 0.3 s; a horizontal slide (100 % width, 0.5 s `power3.inOut`) between chapters.
- Camera: static graphics; real clinic footage gets a gentle 2 % push.
- Frame rate feel: smooth 30 fps; nothing flashes or shakes.
- Edit grammar: average shot length 3–5 s; cuts land at sentence ends of the voice, never mid-clause. Practitioner interviews use corporate-interview grammar: A-roll with a 2-camera alternate angle every 8–12 s, b-roll of the real room covering cuts, L-cuts of 0.5–1 s. Lower-third (name, role, qualifications as the user supplies them) in at 0.8 s after first words, hold 4 s. No speed ramps or jump cuts.

## 8. Sound
- Bed: light acoustic or soft piano, 80–95 BPM, −28 LUFS under voice, or none.
- Effects: a soft click when a step activates (−30 dB relative), nothing else.
- Mix: voice first and very clear (high-pass 80 Hz, gentle de-ess); final −14 LUFS integrated; burnt-in captions always on.

## 9. Build recipe and checks
- Engine and templates: HyperFrames; `templates/checklist-reveal` for the step rail, `word-captions` (sentence mode), `phone-ui` for booking-app screens the user owns, `cover-still`.
- Signature scenes:
  - step rail: numbered circles on a 4 px rail, active tile slides in, past steps dim to 40 %, rail fills to the active number.
  - do / don't pair: two cards side by side, check icon in accent and cross icon in ink (not red), each fades in 0.3 s, 0.6 s apart.
  - warning tile: caution-bordered card, icon + "Seek urgent care if…" list, holds at least 5 s, no motion after entry.
  - source card: closing card with the guideline name and year in IBM Plex Mono, held 2 s.
- Steps: 1) get the content and sources from the practitioner; 2) list claims for review; 3) write steps of ≤ 12 words each; 4) render; 5) readability and claim QA.
- Style checks: every claim has a visible source; each step readable in the time shown (≥ 0.25 s per word); caution colour only on warnings.
- Common failures: too much text per step (split it), icons that suggest the wrong body part (use simple, labelled icons), cold blue-grey everywhere (keep the warm ink and white).

## Overrides
None (library copy).

## Credits
Original motionforge style, drawing on the general tradition of patient-information leaflets and accessible public health design.
