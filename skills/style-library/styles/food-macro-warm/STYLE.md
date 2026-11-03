<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Food Macro Warm

> Extreme close-ups in warm light, shallow focus and rising steam, with one big italic appetite word tucked behind the food so the dish overlaps the letters.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Food & restaurants | remotion (footage-heavy edit) + hyperframes (type layers) | restaurant and product ads, signature dishes, bakery drops, food brand teasers | medium–high |

## 1. Essence
- In one sentence: you should almost taste it before the first word is spoken.
- Three adjectives: sensory, golden, intimate.
- Signature move: the dish is cut out and layered in front of a huge italic word ("crackle"), so the crust overlaps the letters while steam drifts across both.

## 2. Use it for / avoid it for
- Use for: a single hero dish or product, opening-week teasers, seasonal items, short paid ads, menu highlights.
- Avoid for: step-by-step recipes (use `recipe-top-down`), price-heavy menus. Footage and photos show the actual dish as served; no inedible styling tricks or portion-size retouching that misrepresents it; prices only from the venue.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #1A0F0A | espresso field for type-only frames and letterbox areas |
| ink | #FFF1DC | cream: appetite words, captions |
| accent | #F6B40E | saffron: one word or one price per shot |
| support | #B8622E | crust brown: rules, small labels |
| muted | #A68E78 | secondary text |

Rules: saffron on one element per shot; the food supplies the rest of the colour. Grade: shadows lifted to the espresso tone, highlights warm cream, saturation +8–10 %, never a teal-orange split.

## 4. Type
- Display: DM Serif Display (OFL) Italic, 160–240 px for single appetite words, lowercase, tracking −0.02 em.
- Body / captions: DM Sans (OFL) 500, 44–50 px; prices DM Sans 700, 64 px.
- Labels: DM Sans 600, 28 px, uppercase, tracking 0.16 em.
- Language coverage: both have latin-ext on Fontsource; fallback Georgia Italic / system-ui. Choose appetite words that work in the video's language; do not leave English words in a translated video.

## 5. Surfaces and texture
- Background: real macro footage or photos, full bleed; espresso field only for type cards.
- Materials: steam (real footage preferred; else 3–5 seeded sprites), oil sheen, crumbs; cut-out layer of the dish for depth (`tools/cutout.py`).
- Texture: fine static grain 0.05; gentle vignette 18 %.
- Never: drawn grid backdrops, purple gradients, stock food passed off as the venue's, heavy beauty filters.

## 6. Framing and layout
- 9:16 zones: hero food fills y 300–1400; appetite word centred y 600–1000 behind the cut-out; caption y 1380–1500; price and name lower-left x 60–600, y 1480–1600.
- Other formats: 16:9 dish on the right two thirds, word on the left; 1:1 word behind the dish, tighter crop.
- Density: one dish, one word, one caption.

## 7. Motion
- Entrances: appetite word scales 1.08 → 1 + fade over 1.2 s power2.out; on beat hits, a slam 1.3 → 1 in 0.15 s power4.out.
- Exits: word fades with 20 px drift up, 0.4 s power2.in.
- Holds and rhythm: hero moments 0.8–1.4 s; product and price shots 2–3 s.
- Transitions: hard cuts on action peaks; one 0.25 s dissolve per video for a time change (raw → cooked).
- Camera: macro slider moves 2–4 % per second; rack focus from garnish to dish 0.6 s.
- Frame rate feel: shot at 120 fps where possible for ramps; delivered at 30 fps.
- Edit grammar: food-commercial grammar — cuts land on action peaks (the drip lands, the knife breaks the crust) and on the beat. Speed ramp 100 % → 25 % → 100 % around the money moment (cheese pull, pour, glaze). Sizzle or crunch leads the picture by 0.3 s (J-cut). Lower-third name + price, bottom-left, in 0.3 s, holds 2.5 s. Average shot 1–1.5 s in the hook, 2–3 s after.

## 8. Sound
- Bed: warm soul, downtempo or acoustic groove, 85–100 BPM, −26 LUFS.
- Effects: close-miked foley (crunch, sizzle, pour, crackle) placed on the cut frame; no cartoon effects.
- Mix: voice first; foley peaks −6 dB under the voice; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: Remotion edit for footage, ramps and foley; hyperframes type layers from `kinetic-title` (single word mode), `word-captions`, `cover-still` (photo variant).
- Signature scenes:
  - Word behind the dish: cut-out of the dish over the appetite word; the word settles over 1.2 s while the slider moves.
  - Steam rise: 3–5 seeded steam sprites rise 220 px over 2.5 s, opacity 0 → 0.3 → 0.
  - Ramp hit: footage ramps to 25 % at the pour peak and the saffron word slams on the same frame.
  - Macro triptych: three vertical slices (360 px each) of close-ups slide in with 0.06 s stagger, then merge into the hero shot.
  - Name and price: crust rule draws 0.4 s, dish name and saffron price set on it, held 2.5 s.
- Steps: 1) shoot or receive macro footage (120 fps for ramps); 2) choose 2–3 appetite words; 3) cut on action peaks; 4) cut-out and type layers; 5) grade check, QA, loudness.
- Style checks: food looks like the real dish; the word is readable behind the cut-out (≥ 60 % of letters visible); one saffron element per shot.
- Common failures: halos around the cut-out (feather 2 px, check edges), over-warm grade turning greens brown, too many words.

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of macro food commercials and tabletop cinematography.
