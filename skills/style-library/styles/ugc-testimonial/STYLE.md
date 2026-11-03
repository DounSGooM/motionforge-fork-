<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# UGC Testimonial

> Real customers' phone clips framed as rounded review cards: their first name and city, the stars they actually gave, and the key phrase of their sentence swept with a marker highlight as they say it.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| E-commerce & products | remotion (edit) + hyperframes (cards) | customer reviews, social proof ads, service testimonials, app reviews | medium |

## 1. Essence
- In one sentence: real people, in their own words and their own light, with just enough design to make them readable and credible.
- Three adjectives: genuine, warm, specific.
- Signature move: the highlight sweep — a translucent amber marker stroke slides behind the key phrase in the review card at the exact moment the customer says it.

## 2. Use it for / avoid it for
- Use for: product and service reviews, app store reviews read aloud, client testimonials for local businesses, course feedback.
- Avoid for: anything where the reviews are not real or not cleared — never script actors as customers without saying so.
- Honesty: testimonials are real, attributed and used with written permission; names as the reviewer agreed (first name + initial, city); no cut that changes meaning; paid or gifted reviewers are disclosed; star averages come from a real review platform with count and date.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #F5F1EB | warm off-white field around the clips |
| card | #FFFFFF | review cards, name plates |
| ink | #1D1B19 | quotes, names |
| accent | #F6A700 | stars and the marker highlight (45 % opacity behind text) |
| support | #6F6A63 | meta text: city, date, platform |
| verified | #2E7D5B | the verified-purchase tick, only when the platform confirms it |

Rules: amber marks the rating and one phrase per card; nothing else is amber. No red or green "bad/good" colouring of customers.

## 4. Type
- Display: DM Sans (OFL) 700, 72–88 px, sentence case, tracking −0.02 em (opening line, rating summary).
- Quotes: DM Sans 500, 52–60 px, line-height 1.25, max 3 lines per card.
- Captions on clips: DM Sans 700, 50 px, 3–5 words per chunk, white with a 30 % dark plate.
- Labels: Work Sans (OFL) 500, 28 px, sentence case (Selin K. · İzmir · March 2026).
- Language coverage: both ship latin-ext; check reviewer names with diacritics before render.

## 5. Surfaces and texture
- Background: flat warm off-white with static grain 0.03.
- Materials: clips in a phone-shaped card (760 × 1350, radius 44, shadow `0 20px 50px rgba(29,27,25,.18)`); review cards white, radius 28, 40 px padding.
- Texture: none; clips keep their own phone look (no fake grain, no beauty filters).
- Never: grid backgrounds, purple gradients, stock-photo "customers", invented review screenshots.

## 6. Framing and layout
- 9:16 zones: clip card centred, top at y 260; captions inside the clip at y 1000–1180; review card overlaps the clip bottom at y 1250–1600, 920 px wide; stars row at the top of the card.
- Other formats: 1:1 clip left 560 px, card right; 16:9 two reviewers side by side.
- Density: one reviewer at a time; summary card shows the average and count only.

## 7. Motion
- Entrances: review card rises 160 px in 0.4 s power3.out; stars fill one by one with scale 0.6 → 1, back.out(2), 0.07 s stagger.
- Highlight: marker sweeps left to right behind the phrase in 0.35 s power2.inOut, starting on the phrase's first word.
- Exits: card and clip push left together in 0.35 s power3.inOut as the next reviewer pushes in (carousel).
- Holds and rhythm: 5–8 s per reviewer, 3–5 reviewers in 30–45 s.
- Transitions: carousel push between reviewers; hard cuts within one reviewer.
- Camera: none on faces; a 4 % punch-in marks each jump cut inside a clip.
- Edit grammar: each clip trimmed to one complete claim and cut at sentence end; original audio only, no re-voicing; filler removed with jump cuts covered by the 4 % punch; the strongest line opens the video within 2 s; product b-roll 1–1.5 s as an L-cut under the reviewer's voice; no speed changes on speaking footage.

## 8. Sound
- Bed: light acoustic or indie pop, 95–105 BPM, −28 LUFS (phone audio needs room).
- Effects: a soft tick per star at 0.1 of voice level; nothing else.
- Mix: clip audio levelled between reviewers, light noise reduction; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: Remotion for clip trims and levelling; HyperFrames cards with `templates/phone-ui` (clip frame), `templates/word-captions`, `templates/stat-counter` (rating summary), `templates/chat-thread` for real DMs (with consent, names redacted unless agreed).
- Signature scenes:
  - review card rise: card rises over the clip bottom, stars fill to the rating the reviewer gave (4 stays 4), name line fades in last.
  - highlight phrase: amber marker sweeps behind 2–5 words as they are spoken.
  - reviewer carousel: push left 0.35 s; the next card's stars start 0.2 s after it lands.
  - rating summary: average (e.g. 4.7) counts up, review count and platform + date in Work Sans under it.
- Steps: 1) collect clips + written consent + rating data; 2) trim to claims; 3) cards and highlights to word timings; 4) summary + CTA; 5) mix, QA, consent check.
- Style checks: every name, star count and date matches the consent sheet; highlighted words are said in that moment.
- Common failures: mismatched loudness between phones (level per clip); cards covering faces (keep card below chin line).

## Overrides
None in the library copy.

## Credits
Original motionforge style, drawing on the general tradition of customer-review cards and handheld documentary testimony.
