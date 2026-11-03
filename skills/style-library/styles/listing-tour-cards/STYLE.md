<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Listing Tour Cards

> Bright daylight walkthrough footage with slow pans, and crisp white fact cards with a teal edge tab that slide up for price, rooms and area.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Real estate & maps | hyperframes (cards) + remotion (optional, footage-heavy edits) | sale and rental listings, agent reels, open-house invites | medium |

## 1. Essence
- In one sentence: "could I live here?" answered in thirty seconds with real rooms and real numbers.
- Three adjectives: bright, honest, organised.
- Signature move: the fact card: a white card with a 10 px teal tab rises from the bottom while the footage keeps moving, its rows landing one after another.

## 2. Use it for / avoid it for
- Use for: single listings, rentals, open-house invites, "what this budget buys here" with real listings, agent introductions.
- Avoid for: top-segment homes where restraint sells (use `luxury-estate`), area price analysis (use `market-stats`), listings without footage or photos of the actual property.
- Honesty: price, rooms, area, fees, energy rating and address come from the user's listing data and are shown exactly (currency, "/month", "net"); nothing is invented or rounded up. Footage must be of the property itself; virtually staged or retouched images carry a "Virtually staged" tag (26 px, top-left). Agency logos only from the brand kit.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #FFFDF9 | card paper; flat fallback field when no footage is on screen |
| ink | #1B2430 | card text, price, address |
| accent | #0E7C74 | deep teal: card edge tab, price figure, active room dot |
| support | #E6E1D8 | card dividers, inactive chips and dots |
| muted | #5F6B78 | labels ("BEDROOMS", "LIVING AREA") |

Rules: teal lives only on the card system, never as a tint over footage. Footage is graded bright and neutral: +0.2 EV, 5200–5600 K, highlights −15, no orange-and-teal look. Dark card variant: card #1B2430, ink #F5F2EC, accent #3FB8AE.

## 4. Type
- Display: Plus Jakarta Sans (OFL) 800, 84–104 px, sentence case, tracking −0.02 em (address, headline).
- Price: Plus Jakarta Sans 800, 96 px, tabular figures; currency and period at 56 px in muted.
- Body / captions: Plus Jakarta Sans 600, 50–56 px.
- Labels: Plus Jakarta Sans 700, 26–28 px, uppercase, tracking 0.14 em.
- Language coverage: latin + latin-ext (also cyrillic-ext, vietnamese); fallback `system-ui, sans-serif`. One family, hierarchy by weight and size only.

## 5. Surfaces and texture
- Background: full-bleed property footage (wide lens, verticals corrected) or 4K stills with slow pans.
- Materials: cards radius 28 px, shadow 0 18 px 40 px rgba(27,36,48,.22), teal tab on the left edge; original 3 px line icons (bed, bath, area, parking, floor).
- Texture: none on cards; static grain 0.04 over footage only.
- Never: fisheye distortion, leaning verticals, HDR halos, undisclosed sky replacement, grid backgrounds, fake "SOLD" stamps.

## 6. Framing and layout
- 9:16 zones: address y 260–420 on a 520 px top scrim (black 70 % → 0); fact cards x 60–900, y 1180–1560; room-progress dots y 1640; captions y 1060–1160 while a card is up, otherwise y 1400–1560.
- Other formats: 1:1 cards in a right column; 16:9 cards as a lower third at 40 % width, bottom-left.
- Density: one fact card plus one price chip at a time; max 4 figures per card.

## 7. Motion
- Entrances: card rises 80 px with fade, 0.4 s power3.out, rows stagger 0.08 s; areas and room counts count up 0.5 s; the price never counts, it appears whole (0.2 s fade, 1.04→1 scale).
- Exits: card drops 40 px and fades, 0.25 s power2.in.
- Holds and rhythm: cards hold 2.5–3.5 s (time to read a price twice); a new card only when the room changes.
- Transitions: footage does the cutting; the card layer persists across cuts and never cuts with the picture.
- Camera: stills pan 6–8 % of width or push 1.00→1.08 over the shot (power1.inOut), following the room's leading line; never past 1.12.
- Frame rate feel: 30 fps; 60 fps footage conformed for 50 % slow motion on details.
- Edit grammar: average shot 2.0–2.8 s in walk order (exterior → entry → living → kitchen → bedrooms → bath → outdoor → dusk exterior); cuts on every second beat at 100–110 BPM; push-through-doorway match cuts between rooms; one or two 100→300→100 % hallway ramps (0.6 s) per reel; detail inserts (tap, handle, view) 0.8–1.2 s; price lower third lands 1.0 s after the first exterior shot and holds 3 s; contact card holds 3 s at the end.

## 8. Sound
- Bed: bright acoustic pop or soft house, 100–115 BPM; −24 LUFS without voice, −28 under voice.
- Effects: a soft paper swipe per card (−20 dB); no whooshes on room cuts.
- Mix: voice first; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: HyperFrames for the card layer; Remotion optional for long footage assembly; `stat-counter`, `kinetic-title` (address open), `word-captions`, `cover-still` (thumbnail with price), `browser-window` (the real listing page, screenshot from the user).
- Signature scenes:
  - Fact card: teal-tab card rises 80 px 0.4 s power3.out, beds · baths · m² rows stagger 0.08 s, icons draw 0.3 s (new scene + `stat-counter`).
  - Price chip: whole price fades in with a 1.04→1 settle, "/month" muted, holds 3 s over the exterior (new scene).
  - Room ticker: progress dots along the bottom; the active dot widens 12→36 px and fills teal in 0.3 s as the room name swaps (new scene).
  - Listing proof: real listing page in `browser-window`, push 1.0→1.15 to the price line, a teal box draws round it in 0.4 s.
- Steps: 1) get the listing sheet and footage, sort shots in walk order; 2) grade bright and neutral, correct verticals; 3) cut to the beat at about 2.4 s per shot; 4) drive every card from the listing data JSON (no hand-typed numbers); 5) check figures against the sheet, then `qa-review`.
- Style checks: every figure matches the sheet; card text ≥ 26 px; cards stay left of x 900; no leaning verticals; staged images tagged.
- Common failures: a counting price (remove), too many cards (merge), dark interiors (lights on, lift exposure), a card covering the room's best feature (move it or reframe).

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of property walkthrough films and printed listing sheets.
