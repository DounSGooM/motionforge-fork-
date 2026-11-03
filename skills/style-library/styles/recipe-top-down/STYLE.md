<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Recipe Top-Down

> A locked overhead view of a slate worktop: ingredients get ticked off a checklist as they land in frame, numbered step cards slide up from the bottom, and a tomato-red timer ring runs while the footage fast-forwards.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Food & restaurants | remotion (footage edit) + hyperframes (cards, timers) | recipes, meal prep, cooking how-tos, bakery and café "how we make it" | medium |

## 1. Essence
- In one sentence: a recipe you can actually follow from your phone propped on the counter.
- Three adjectives: practical, appetising, orderly.
- Signature move: a big tomato step number lands on a white card while the hands in the overhead shot start that exact action.

## 2. Use it for / avoid it for
- Use for: short recipes (≤ 8 steps), meal prep, sauces and basics, "3 ways with…", a café's signature item.
- Avoid for: restaurant menus (use `bistro-menu-cards`), mood-led food ads (use `food-macro-warm`). Quantities, times and temperatures come from the tested recipe; nutrition figures only if calculated from a named source; the footage shows the actual dish being made.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #2F3437 | slate worktop (real overhead footage preferred; this is the fallback field) |
| card | #FFFDF8 | step and checklist cards |
| ink | #2E2A24 | text on cards |
| accent | #E4572E | tomato: step numbers, timer ring, the current checklist item |
| support | #6B8F4E | herb green: ticked ingredients and "done" marks |
| muted | #8A7F70 | quantities' units, secondary notes |

Rules: tomato only on the current step; green only means done; card text is always ink on cream. Do not colour-grade food towards the accent.

## 4. Type
- Display: Fraunces (OFL) 800, soft optical size, 96–120 px for titles; step numbers 160 px.
- Body / step text: Karla (OFL) 600, 44–50 px, max 9 words per step card.
- Notes: Caveat (OFL) 600, 54 px, for one handwritten tip per video.
- Labels: Karla 700, 28 px, uppercase, tracking 0.1 em (quantities as "200 G · 1 CUP").
- Language coverage: all three have latin-ext on Fontsource; fallback Georgia / system-ui. Show metric first, imperial second, when the audience is mixed.

## 5. Surfaces and texture
- Background: real overhead footage, white-balanced to daylight; fallback slate with static grain 0.05 and a soft key light from the top.
- Materials: cards radius 28 px, shadow 0 10px 24px rgba(0,0,0,.28); timer ring 14 px stroke on a cream disc.
- Texture: none on footage; grain only on the fallback field.
- Never: drawn grid backdrops, checked tablecloths, purple gradients, stock food photos standing in for the real dish.

## 6. Framing and layout
- 9:16 zones: title y 260–420; ingredient checklist card x 60–620, y 460–1100 during mise en place; timer ring 280 px at x 700–980, y 260–540; step card x 60–940, y 1180–1480.
- Other formats: 16:9 footage centre, checklist left column, step cards bottom-left; 1:1 step card only.
- Density: footage + one card + optional timer; never checklist and step card together.

## 7. Motion
- Entrances: step cards slide up 120 px + fade, 0.45 s power3.out; step number drops 40 px with back.out(1.8) 0.1 s after.
- Exits: card slides down 80 px and fades, 0.3 s power2.in, on the cut to the next step.
- Holds and rhythm: one step per 2.5–4 s; ingredient ticks every 0.6–0.9 s during mise en place.
- Transitions: hard cuts in the footage; cards change on the same frame as the cut.
- Camera: locked overhead; digital push 4 % on plating; no handheld moves.
- Frame rate feel: footage at 30 fps; fast-forward segments at 2–8× with a "×4" chip.
- Edit grammar: overhead cooking grammar — locked-off top shot, jump cuts on action completion (the pour ends → cut). Hook montage 1.2–2 s per action, method 2.5–4 s per step. Waiting and stirring run 2–8× with the timer ring; baking becomes a time-lapse. Match cut bowl to bowl in the same frame position. Hands enter on the cut, never mid-shot. Step card appears 0.2 s after the action starts and holds through it.

## 8. Sound
- Bed: warm acoustic or light bossa, 90–110 BPM, −28 LUFS.
- Effects: real foley first (chop, sizzle, pour) at natural level; soft tick on checklist items; kitchen-timer ding at the end of the ring.
- Mix: voice first; foley ducks 6 dB under the voice; final −14 LUFS integrated.

## 9. Build recipe and checks
- Engine and templates: Remotion for the footage edit; hyperframes overlays from `templates/checklist-reveal` (ingredients), `kinetic-title`, `stat-counter` (restyled as the timer ring), `cover-still`.
- Signature scenes:
  - Mise en place: checklist slides in; each ingredient ticks green as it lands in frame, quantity in Karla labels.
  - Step card: tomato step number 160 px, instruction ≤ 9 words, held through the action.
  - Timer ring: 280 px ring sweeps 360° during an 8× fast-forward; real duration label "25 MIN" stays fixed.
  - Swap note: one Caveat tip with a hand-drawn arrow (draws 0.6 s) pointing at the ingredient ("no buttermilk? milk + lemon").
  - Plated finish: final overhead shot, 5 % push, title card with total time and servings.
- Steps: 1) get the tested recipe text; 2) shot list = one locked overhead take per step; 3) cut on action completion; 4) add cards and timers to words.json; 5) QA quantities against the recipe.
- Style checks: every quantity and time matches the recipe; card never covers the action; numbers readable at 360 px wide.
- Common failures: camera not perfectly overhead (keystoned board), cards over the bowl, steps longer than 9 words.

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of overhead cooking videos and printed recipe cards.
