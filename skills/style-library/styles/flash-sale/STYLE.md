<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Flash Sale

> Saturated red field, yellow starburst cards, condensed numbers the height of the screen, an old price slashed on the beat and the new one slamming in with a 3-frame shake.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| E-commerce & products | hyperframes | time-limited sales, discount codes, seasonal promos, launch-day offers | low |

## 1. Essence
- In one sentence: a loud, clear, honest offer — what, how much off, until when, how to get it — in under 15 seconds.
- Three adjectives: loud, urgent, legible.
- Signature move: the price slash — a diagonal yellow bar cuts the old price on a downbeat, the old price sinks to half opacity and the new price lands at 2.2× and settles.

## 2. Use it for / avoid it for
- Use for: sales events, promo codes, bundle offers, last-day reminders, store openings with a discount.
- Avoid for: premium or luxury brands, healthcare, finance products, anything where pressure tactics are inappropriate.
- Honesty: the reference price is the real previous price (many markets require the lowest price of the last 30 days); the end date and code are real; no "only 3 left" unless it comes from live stock data the user provides.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #E8112D | sale red, centre lit to #F2283F |
| ink | #FFFFFF | headlines, product names |
| accent | #FFDD00 | starbursts, new price, countdown digits, the slash |
| deep | #5A0610 | card shadows, struck-through old price |
| support | #1A0A0C | text on yellow cards, code box border |

Rules: yellow is for the offer only (price, %, end time); everything else stays white on red. Brand-coloured variant: brand primary as background only if white text passes 4.5:1.

## 4. Type
- Display: Anton (OFL) 400, 160–260 px for numbers, 110–140 px for words, uppercase, tracking 0.
- Body: Archivo (OFL) 700, 44–52 px, sentence case (terms line, product names).
- Labels: Archivo 800, 30 px, uppercase, tracking 0.06 em (ENDS SUNDAY, CODE).
- Language coverage: Anton and Archivo ship latin-ext; check that % and the currency sign sit on the baseline in Anton.

## 5. Surfaces and texture
- Background: flat red with a soft central light and static grain 0.05.
- Materials: 16-point starburst cards in yellow with a 6 px offset shadow in #5A0610; white product cards with 24 px radius; coupon box with a 4 px dashed border.
- Texture: optional halftone dots inside burst cards only (8 px dots, 12 % opacity), never on the background.
- Never: grid backgrounds, purple gradients, fake timers that reset, flashing faster than 3 times per second.

## 6. Framing and layout
- 9:16 zones: offer headline y 260–520; product y 560–1100; price block y 1120–1420; end date + code y 1440–1640.
- Other formats: 1:1 product left, price right; 16:9 price block on the right half at 220 px.
- Density: one product + one price + one burst at a time; terms line always on the end card.

## 7. Motion
- Beat: everything snaps to a 128 BPM grid (0.469 s per beat).
- Entrances: words slam 1.4 → 1 in 0.12 s power4.out; bursts rotate 0 → 8° with back.out(3) in 0.3 s; product cards drop 80 px with back.out(1.6) in 0.25 s.
- Price slash: bar draws corner to corner in 0.18 s power4.out; old price fades to 50 %; new price 2.2 → 1 in 0.2 s power4.out plus a seeded 6 px shake for 3 frames.
- Countdown: digits flip on rotateX in 0.25 s per change.
- Exits: hard cut on the next beat.
- Camera: none; the frame shakes only on the price landing.
- Edit grammar: average shot 0.5–1.0 s (one or two beats); hard cuts only on beats; one white flash frame on the drop; a product run of 4–6 shots at 0.5 s each; any card with text holds at least 0.8 s; the end card holds 2.5–3 s to be read.

## 8. Sound
- Bed: electro-pop, 128 BPM, −20 LUFS under voice.
- Effects: a riser two bars before the price reveal, a hit on the slam, ticks on countdown digits, at 0.2 of voice level.
- Mix: voice short and loud; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: HyperFrames; `templates/kinetic-title` for offer words, `templates/stat-counter` for the % off, `templates/cover-still` for the end card; slash and burst are new scenes.
- Signature scenes:
  - price slash: old price centred at 180 px, slash on a downbeat, new price lands one beat later in yellow.
  - burst stack: three bursts (−20 %, −30 %, −50 %) land on consecutive beats down the left side, each with its category name.
  - honest countdown: "ENDS SUN 23:59" with a 10-second ticking seconds counter that matches the real end time of day; no looping timer.
  - product run: 4–6 product cut-outs on white cards, one per half beat, price chip under each.
  - code card: dashed coupon box, code in Anton 140 px, "copy at checkout" line, terms in Archivo 30 px.
- Steps: 1) get offer, prices, dates and terms in writing; 2) set the beat grid; 3) lay scenes on beats; 4) end card with terms; 5) mix, QA.
- Style checks: every price and date matches the written offer; no frame flashes more than 3 times per second; terms readable on the end card.
- Common failures: too many numbers in one frame (one price at a time); the code card cut too short (≥ 2.5 s).

## Overrides
None in the library copy.

## Credits
Original motionforge style, drawing on the general tradition of supermarket shelf tags and window sale posters.
