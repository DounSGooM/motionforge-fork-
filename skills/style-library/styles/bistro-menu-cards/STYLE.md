<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Bistro Menu Cards

> Cream menu cards placed one by one on real linen; dish photos slide out from under the paper, prices sit in a refined serif, and a bottle-green stamp marks the daily special.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Food & restaurants | hyperframes | restaurant and café menus, daily specials, tasting menus, opening announcements | low–medium |

## 1. Essence
- In one sentence: the feeling of being handed a good menu by someone who cares.
- Three adjectives: unhurried, refined, hospitable.
- Signature move: a card lands on the linen with a slight settle, and the dish photo glides out from beneath its edge like a plate set down beside it.

## 2. Use it for / avoid it for
- Use for: weekly specials, new menus, set lunches, wine pairings, seasonal dishes, reservations and events.
- Avoid for: fast-food deals and flash sales (too quiet), recipes (use `recipe-top-down`). Dishes, prices and allergens come from the restaurant; photos show the actual dishes served; no invented reviews or ratings.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #E9E2D3 | linen (real linen photo preferred, else flat with weave grain) |
| card | #FBF8F1 | cream card stock |
| ink | #2A2420 | dish names, prices |
| muted | #7A6E62 | descriptions, small caps labels |
| accent | #24533F | bottle green: the special stamp, today's price, one rule per card |
| gilt | #B89A5E | hairline borders (1.5 px) and ornaments only |

Rules: bottle green once per frame; gilt never carries text; dish photos keep natural colour (no orange grading).

## 4. Type
- Display: Cormorant Garamond (OFL) 600, 76–100 px, title case, tracking 0; italic 500 for descriptions at 42–48 px.
- Prices: Cormorant Garamond 600 with old-style figures, 56–64 px, no currency decimals when whole ("14", not "14.00"), currency per locale.
- Labels and body: Jost (OFL) 500, 30–36 px, small caps or uppercase, tracking 0.18 em ("STARTERS", "TODAY").
- Language coverage: both have latin-ext on Fontsource; fallback Georgia and system-ui. Check menu accents (é, ç, ğ, ş).

## 5. Surfaces and texture
- Background: linen with soft window light from the upper left, static grain 0.04.
- Materials: card radius 6 px, 1.5 px gilt inner border at 24 px inset, paper shadow 0 18px 30px rgba(42,36,32,.18); stamp ink at 88 % with a mottled mask.
- Texture: fine paper tooth on cards (static), deckle edge optional on tasting menus.
- Never: gingham or checked tablecloths (they read as a grid), drawn grid backdrops, clip-art cutlery, purple gradients.

## 6. Framing and layout
- 9:16 zones: section label y 260–320; card 880 × 980 px at y 360–1340; dish photo emerges below/right of the card y 1000–1480; caption y 1380–1500 when the card is short.
- Other formats: 16:9 card left, photo right at the same height; 1:1 card centred, photo peeks 180 px from under it.
- Density: one card and one photo; max 3 dishes listed per card.

## 7. Motion
- Entrances: card rises from 220 px below with rotation 4° → 1.5°, 0.7 s power3.out, then a 0.15 s settle to 1.2°; the dish photo slides 260 px out from under the card edge, 0.8 s power2.out, card stays on top.
- Text: dish name fades up by word, 0.12 s stagger; gilt rule draws 0.5 s; price appears last, 0.3 s fade.
- Stamp: 0.2 s power4.in, 4 px shake, ink spreads 1.0 → 1.02 over 0.3 s.
- Exits: card slides off to the left 0.5 s power2.in, photo follows 0.1 s later.
- Holds and rhythm: one dish per 3–4 s; hold every price ≥ 2 s.
- Transitions: 0.4 s dissolve between courses; a new card covering the old one for items in the same course.
- Camera: slow 3 % push across each card, slight 2° tabletop tilt.
- Frame rate feel: smooth 30 fps, unhurried; nothing faster than 0.2 s except the stamp.
- Edit grammar: restaurant promo — calm, average shot 2.5–4 s; cuts on phrase ends, not beats; 0.4 s dissolves between courses. Real dish footage (pour, plating) runs in a card-shaped window at 0.8× speed with a 3 % push. Room tone and cutlery lead each new scene by 0.5 s (J-cut). Lower-third: dish name + price on a cream strip, holds 3 s.

## 8. Sound
- Bed: acoustic guitar, light jazz trio or café piano, 70–95 BPM, −28 LUFS.
- Effects: paper slide on cards, soft wooden tap on the stamp, glass clink on the end card.
- Mix: voice first; ambient room tone at −34 LUFS for warmth; final −14 LUFS integrated.

## 9. Build recipe and checks
- Engine and templates: hyperframes; card scene is new; `kinetic-title` for section names, `checklist-reveal` (restyled) for set-menu courses, `cover-still` for the weekly cover.
- Signature scenes:
  - Course card: card lands, name by word, gilt rule, price last.
  - Under-the-card plate: photo slides from under the card's right edge, 3 % push begins.
  - Special stamp: bottle-green oval "TODAY" stamp at −8° on the card corner.
  - Menu opening: a folded two-panel menu opens on a hinge (rotateY 0 → −160°), 0.9 s power2.inOut.
  - Table tent close: a folded tent card shows hours, phone and booking link (real), held 3 s.
- Steps: 1) get the menu text, prices and dish photos; 2) choose max 3 dishes per card; 3) photograph or shoot linen; 4) build and time to the voice; 5) QA spelling and prices.
- Style checks: prices match the current menu; photos are the real dishes; accented characters render.
- Common failures: card too crowded, photos graded too warm, linen texture so strong it competes with the card.

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of printed bistro menus and letterpress table stationery.
