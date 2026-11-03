<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Now Hiring

> Bright butter-yellow field, role cards dealt like a hand of cards, real team faces and perks popping in as icons, and an orange Apply button that gets pressed at the end.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Business, B2B & local | hyperframes + three.js (remote-team globe only) | job openings, recruitment campaigns, internship calls, employer-brand shorts | low–medium |

## 1. Essence
- In one sentence: a warm, specific invitation to come and work here.
- Three adjectives: open, upbeat, concrete.
- Signature move: three role cards fan out with small rotations, one is pulled to the front and flips to show location, type and salary band.

## 2. Use it for / avoid it for
- Use for: one to five open roles, internships, seasonal hiring, "day in the team", employer brand.
- Avoid for: layoffs or sensitive HR news, generic company promos. Team members appear only with their consent; perks, salary bands, locations and benefits come from the employer and are current; follow pay-transparency rules where they apply; use inclusive, plain job language (no "rockstar" or "ninja").

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #FFF4D6 | butter-yellow field |
| card | #FFFFFF | role cards, perk tiles |
| ink | #14161A | all text |
| accent | #FF5C39 | Apply button, role tag, the one highlighted perk |
| muted | #6B6457 | secondary details, labels |

Rules: orange only on what the viewer should act on or notice first; brand colours from the kit replace accent if the employer has one, keeping one accent.

## 4. Type
- Display: Bricolage Grotesque (OFL) 800, 110–150 px, sentence case, tracking −0.035 em.
- Body: Figtree (OFL) 500/700, 44–52 px; role titles Figtree 800 64 px.
- Labels: Figtree 700, 28 px, uppercase, tracking 0.1 em ("REMOTE", "FULL-TIME").
- Language coverage: both have latin-ext on Fontsource; fallback system-ui. Translate job titles carefully; keep official titles when they are legal terms.

## 5. Surfaces and texture
- Background: flat butter with static grain 0.03 and a soft white centre light.
- Materials: cards radius 32 px, 3 px ink border, offset shadow 8px 8px 0 #14161A (sticker-like); perk icons original, 6 px stroke, 140 px.
- Photography: real team and office photos in rounded frames (radius 32 px), natural colour.
- Never: drawn grid backdrops, stock "diverse team" photos, purple gradients, fake salary numbers.

## 6. Framing and layout
- 9:16 zones: headline y 260–460; role cards y 500–1200 (card 760 × 520 px); perks row y 1220–1380; caption y 1400–1500, replaced in the last 4 s by the Apply button (y 1400–1520, x 120–900).
- Other formats: 16:9 cards in a row of three, people photos right; 1:1 one card + button.
- Density: max 3 role cards or 4 perk icons at once.

## 7. Motion
- Entrances: cards deal from a stack, 0.35 s power3.out each, 0.12 s stagger, rotations −4°, 2°, −1°; icons pop 0.5 → 1, back.out(2), 0.1 s stagger.
- Exits: cards slide off the bottom 0.35 s power2.in, 0.06 s stagger.
- Holds and rhythm: one role per 2.5–3 s; something new every 1–1.5 s.
- Transitions: hard cuts on the beat; a card flip (rotateY 180°, 0.5 s power2.inOut) moves from role to details.
- Camera: static; 4 % push on team photos.
- Frame rate feel: smooth 30 fps, bouncy but never jittery.
- Edit grammar: recruitment social — hook with real team footage, 1–1.5 s shots cut on the beat (100–115 BPM). Employee soundbites 3–5 s each with a lower-third (name · role · years in team) in 0.25 s, held 3 s; L-cut from a soundbite into the perks list. Role cards 2.5–3 s. End card held ≥ 3 s with the real apply link.

## 8. Sound
- Bed: upbeat indie pop or light funk, 100–115 BPM, −26 LUFS.
- Effects: card-deal flick, soft pops on perks, button click on Apply.
- Mix: voice and soundbites first; final −14 LUFS integrated.

## 9. Build recipe and checks
- Engine and templates: hyperframes; `kinetic-title`, `checklist-reveal` for requirements, `phone-ui` for the real application page, `cover-still`; `templates/globe-arcs-3d` for remote roles (pins only where the team really works).
- Signature scenes:
  - Card deal: three role cards fan out; the chosen card lifts 60 px and flips to details.
  - Perk row: four perk icons pop in a row with 2-word labels ("4-day week", "learning budget"), only real perks.
  - Salary band: a bar draws from min to max with the employer's figures, currency and period ("per year, gross").
  - Team wall: 4 real portraits slide in as a strip (x pan 0.6 s), names in labels.
  - Apply press: orange button scales 0.94 → 1 in 0.1 s on a finger tap, URL types at 24 chars/s below.
- Steps: 1) collect role facts and consent for faces; 2) script ≤ 25 words per role; 3) build cards; 4) time to the voice; 5) QA facts and link.
- Style checks: every role detail matches the job post; button and link readable at 360 px; no face without consent.
- Common failures: too much text on cards, missing location/remote info, closing date past.

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of recruitment posters and employer-brand social content.
