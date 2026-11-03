<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Language Flashcards

> Cream cards on a deep teal desk: a word flips to show its meaning and IPA, the stressed syllable jumps on its beat, and an example sentence follows with the word swiped in highlighter yellow.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Education & explainers | hyperframes | vocabulary, pronunciation drills, phrase packs, false friends, short grammar points | low |

## 1. Essence
- In one sentence: one word learned properly per card, in a rhythm the viewer can repeat.
- Three adjectives: friendly, clear, repeatable.
- Signature move: the card flips on its vertical axis and the stressed syllable jumps 24 px exactly when it is spoken.

## 2. Use it for / avoid it for
- Use for: word-of-the-day series, travel phrases, pronunciation drills, false friends, quick quizzes.
- Avoid for: long grammar theory, literature analysis, anything needing more than three facts per card.
- Honesty: translations and IPA checked by a fluent speaker or a cited dictionary; pronunciation audio from a real speaker who consented, or labelled as synthetic voice; regional variants named ("UK", "US", "Brazil").

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #0E4D5A | deep teal desk, soft top light |
| card | #FFFCF4 | cream card faces |
| ink | #1C1B19 | all text on cards |
| accent | #FFCB3D | highlighter: the swipe behind the target word, the stressed syllable |
| correct | #35C27A | quiz tick |
| wrong | #EF5350 | quiz cross |

Rules: the highlighter is a swipe behind text, never a text colour. Green and red appear only in quiz moments.

## 4. Type
- Word: Nunito (OFL) 800, 130–170 px, written with the language's own capitalisation.
- IPA: Charis SIL (OFL) 400, 56 px, between /slashes/ or [brackets]; ˈ ˌ ː must render — Charis's latin-ext subset on Fontsource carries the IPA block.
- Sentences: Nunito 600, 52 px; translation Nunito 400 italic, 40 px, ink at 60 %.
- Labels: Nunito 800, 28 px, uppercase, tracking 0.12 em ("NOUN · FEMININE").
- Coverage and fallback: Nunito covers latin-ext, Cyrillic, Vietnamese; for Greek, Arabic, Devanagari or CJK swap the word face to the matching Noto family (OFL); IPA fallback Gentium Plus. Mirror the layout for right-to-left languages.

## 5. Surfaces and texture
- Background: flat desk with soft light and grain 0.05, or a blurred real desk photo darkened 40 %.
- Cards: 860×540 px, radius 28 px, shadow y 24 px blur 40 px at 30 %, one thin header rule in ink at 15 %.
- Highlighter: accent at 85 %, skewed −3°, rough seeded ends.
- Never: ruled-paper backgrounds, flags standing in for languages (languages are not countries — use the language name or code), clip-art mascots.

## 6. Framing and layout
- 9:16 zones: label y 300; main card centred y 560–1100; example-sentence card y 1180–1380; quiz options y 1180–1500; captions y 1520–1640 only when the voice says more than the cards show.
- Other formats: 1:1 card 760×480 centred, sentence below; 16:9 card left, sentence right.
- Density: one word, one sentence, one translation.

## 7. Motion
- Entrances: card rises 160 px and rotates −4° → 0 in 0.45 s back.out(1.6); highlighter swipes left to right in 0.3 s power2.out.
- Flip: rotateY 0 → 180° in 0.6 s power2.inOut, perspective 1600 px, faces swapped at 90°.
- Stress bounce: the stressed syllable moves −24 px and scales 1.08 in 0.25 s back.out(2.5) at its timestamp from `tools/word_timings.py`.
- Exits: card flicks off left in 0.35 s power2.in with −8° rotation; the next card slides out from under it.
- Holds and rhythm: front 1.5 s, back 3 s, sentence 3–4 s; a "your turn" gap of 1.5–2.0 s with a thin progress bar and no voice.
- Quiz: tick draws in 0.25 s; a wrong card shakes ±12 px three times in 0.3 s.
- Edit grammar: a fixed drill per word — show (1.5 s) → speaker says the word → flip → word again at 0.8× (time-stretched, pitch kept, tagged "slow") → sentence → silent repeat gap; every visual change lands on an audio onset, never before it; episodes in a series keep identical timings so viewers learn the rhythm.

## 8. Sound
- Bed: ukulele or marimba, 100 BPM, −30 LUFS, dipping to −36 under pronunciation audio.
- Effects: card swish on flips, a light ding on correct, a soft low buzz on wrong — 0.12 of voice.
- Mix: pronunciation audio is the loudest element; −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: hyperframes; `checklist-reveal` for phrase lists, `word-captions` for example sentences (target word in the accent swipe), `kinetic-title`, `cover-still` with the word large.
- Signature scenes:
  - Flip card: front word, flip, back with meaning, IPA and word class.
  - Stress bounce: syllables split by thin dots, the stressed one jumps on its beat; repeated at slow speed.
  - Sentence highlight: example builds word by word, the target word gets the swipe, translation fades in below 0.4 s later.
  - False friends: two cards side by side, the wrong meaning crossed in red, the real one ticked green.
  - Quiz round: three options, a 3 s bar drains, the right option ticks.
- Steps: 1) word list with checked translations and IPA; 2) record or source audio, get word timings; 3) build cards from params; 4) render, mix; 5) `qa-review` with a glyph check (`tools/textcheck.mjs`).
- Style checks: no missing-glyph boxes in IPA; stress mark placed before the stressed syllable; audio matches the text on screen.
- Common failures: synthetic voice mispronouncing (replace with a real recording); too much on the back face (three items max); quiz with two defensible answers.

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of paper flashcards and spaced-repetition drills.
