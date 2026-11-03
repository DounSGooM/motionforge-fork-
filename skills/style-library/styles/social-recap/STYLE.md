<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Social Recap

> Real posts as white cards stacked on a cool grey field: each new card slides up and pushes the last one back, its counts tick to the captured value, and the line that matters gets a coral swipe.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| News & commentary | hyperframes | reaction roundups, online debates, launch responses, weekly internet recaps | low |

## 1. Essence
- In one sentence: what people are saying, shown with the receipts.
- Three adjectives: current, quick, evidenced.
- Signature move: the stack — a new post rises from below while the previous one shrinks to 94 %, lifts 40 px and dims.

## 2. Use it for / avoid it for
- Use for: reactions to a launch or announcement, statements by public figures and organisations, community feedback, trend recaps.
- Avoid for: pile-ons against private people, unverified rumours, anything where the posts are the only evidence for a serious claim.
- Honesty: only real posts, captured by or supplied to the user, with handle, date and platform kept; counts shown as captured with an "as of" date; names and avatars of private individuals blurred unless they agreed; never edit text inside a screenshot; never rebuild a post in a real platform's interface; platform logos only from the brand kit. Say how posts were chosen ("top replies", "a sample of 40").

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #E3E7ED | cool grey field with a soft top light |
| card | #FFFFFF | card behind each screenshot |
| ink | #0F1217 | titles, counts |
| accent | #FF5C3A | coral: highlight swipe, ticking count, trend arrow |
| support | #6B7380 | labels, "as of" stamps, timestamps |

Rules: posts keep their own look inside the card; coral only on overlays. Dark variant: background #15181D with cards unchanged.

## 4. Type
- Titles: Manrope (OFL) 800, 88–110 px, sentence case, tracking −0.03 em.
- Counts: Manrope 800, 64 px, tabular, abbreviated per locale (12.4K / 12,4 B).
- Labels: Red Hat Mono (OFL) 500, 28 px, uppercase, tracking 0.1 em ("REPLIES · AS OF 2 NOV").
- Captions: Manrope 700, 52 px.
- Fallback: Hanken Grotesk. Manrope covers latin-ext, Cyrillic, Greek, Vietnamese; post text in other scripts lives in the screenshots.

## 5. Surfaces and texture
- Background: flat field with grain 0.03.
- Cards: radius 32 px, 24 px padding around the screenshot, shadow 0 20 px 50 px at 12 % ink.
- Highlight: coral at 35 % multiply behind one line of post text, placed on the screenshot's pixel coordinates.
- Never: grid backgrounds, invented verification badges, invented engagement numbers, a 3D phone around every post.

## 6. Framing and layout
- 9:16 zones: title y 250–420; card stack x 90–940, y 460–1360; counts row y 1380–1460; captions y 1500–1640.
- Other formats: 1:1 cards 760 px wide; 16:9 stack on the left, title and counts on the right.
- Density: one card fully readable, at most two behind it.

## 7. Motion
- Entrances: card rises from +600 px in 0.5 s power4.out; over the same 0.5 s the previous card scales to 0.94, moves −40 px and drops to 70 % opacity.
- Counts: tick from 0 to the captured value in 0.8 s power2.out.
- Highlight: swipe left to right in 0.3 s power2.out.
- Exits: the stack flicks up and out in 0.3 s power2.in at the end of a section.
- Holds and rhythm: a card stays at least its reading time (0.3 s per word, minimum 2 s); one post every 2–4 s.
- Transitions: the stack push within a section; a hard cut to a 1 s section title between stances.
- Camera: on long posts a 1.6× push to the quoted line in 0.6 s power3.inOut.
- Edit grammar: recap pacing — the narrator paraphrases, the cut lands on the end of the paraphrase, and the card holds for reading; quoted lines are read verbatim; posts are grouped by stance (for, against, jokes) with a section title each; video posts play 2–4 s muted with captions unless their audio is the point.

## 8. Sound
- Bed: light lo-fi or plucks, 100 BPM, −28 LUFS.
- Effects: soft whoosh on each card, a rolling tick on counts, a marker swipe on highlights — 0.1–0.15 of voice.
- Mix: voice first; −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: hyperframes; `browser-window` for posts viewed on the web, `phone-ui` for in-app screenshots, `chat-thread` for reply chains built from real text, `stat-counter` for counts, `word-captions`, `cover-still`.
- Signature scenes:
  - Card stack: rise, push back, dim — the default beat.
  - Count tick: likes, reposts and replies tick in parallel with an "as of" stamp fading in 0.3 s after.
  - Reply ratio: a horizontal bar splits into replies vs likes from the captured numbers in 0.6 s power3.out.
  - Quote zoom: push to one line, coral swipe, hold for the verbatim read.
  - Stance sort: cards slide into two columns ("for" / "against") with the sample size above each.
- Steps: 1) collect screenshots with capture dates; 2) blur private individuals; 3) note the line to highlight per post (pixel box); 4) build stacks from params; 5) `qa-review`.
- Style checks: every count has an "as of" date; no altered screenshot; private people blurred; source of sample stated.
- Common failures: illegible screenshots (crop to the post; source at least 1080 px wide); too many cards in a row (break with a section title); cherry-picking without saying so.

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of online-culture news recaps.
