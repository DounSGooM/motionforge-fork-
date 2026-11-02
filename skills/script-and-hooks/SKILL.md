---
name: script-and-hooks
description: Write the spoken script and on-screen lines for a short video in any of 10 languages, with 2–3 hook options, a TTS-friendly text, a closing call to action and a list of checkable claims for the user. Use when a video needs a script, a hook, a voice-over text, a rewrite of an existing script, or a check for clichés and unsourced facts.
license: MIT
---

# Script and hooks

Input: the 5-line brief, the video language, the story format (from `motion-director`), the target length, and any source material the user gave (notes, links, product facts).
Output: `videos/<slug>/script.md` with hook options, the script, a scene table and a claim list.

Language files: `i18n/<code>.md` for `en tr es pt-BR fr de zh-CN ja ko hi`. Read the one for the video language before writing. It has native hook patterns, the banned phrase list, number-reading rules and pacing.

## 1. Gather facts first
- List what you know from the user's material and what you still need (product name spelling, prices, dates, results).
- Ask for what is missing. Do not fill gaps with plausible numbers.
- If the user gives source text, treat it as the primary source; anything outside it must be widely established or left out.

## 2. Pick the genre rules
The genre sets the order of ideas and how the script ends. Combine it with the story format.

| Genre | Order of ideas | Ending | Source strictness |
|---|---|---|---|
| Explainer | context → how it works, with one concrete example → limits or objections → where it leads | an idea the viewer keeps, not a summary | normal |
| Promo | a pain the viewer feels → the product as the answer → proof from the user's material only → one action | one specific action | strict: no invented prices, discounts, ratings, awards, testimonials |
| News | what happened, who, when → context and key numbers → reactions → what to watch next | what happens next; claims attributed | strict attribution |
| Tutorial | what you will be able to do → steps, one example each → the usual mistake → result | the one rule to remember | normal |
| Story | a person or place → tension → turn → result | a feeling or image, not a moral | no invented people presented as real |
| Intro (product, place, service) | what and for whom → what is different → what using it looks like → invitation | a warm, concrete invitation | strict |

## 3. Write 2–3 hooks
Hook types (examples per language are in the i18n file):

| Code | Type | Works when |
|---|---|---|
| P | Proof / claim | the video itself is the evidence ("every effect here was made by…") |
| C | Curiosity gap | there is a non-obvious detail; the answer comes later |
| S | Personal story | the creator has a real experience to share |
| F | Problem call-out | the audience has a specific, recognisable pain |
| B | Belief breaker | a common belief is wrong or incomplete (needs a source) |
| R | Result teaser | there is a measurable before/after |
| N | Number promise | a list or a fixed number of steps |
| T | Praise, then the flaw | a strong tool or method has one real weakness |

Rules:
1. The hook is the first sentence of the voice **and** the big text on frame 0, word for word or a 2–5 word cut of it.
2. Short: about 10 words or fewer in space-separated languages; about 20 characters or fewer in zh-CN/ja; about 6 eojeol in ko.
3. Concrete: a number, a name, an object, a visible result. No greeting, no channel intro, no rhetorical warm-up.
4. Within 3 seconds the viewer knows what they will get (a count, a result, a fix).
5. The promise is paid off inside the video.
6. Give 2–3 options of **different** types, label each with its code, recommend one and say why.
7. Over the presenter's own footage, a person plus a claim usually holds better than an abstract graphic.

## 4. Write the script
- **Length budget:** `seconds × pace` (pace per language below). Count. Over budget means cut text, not speed up the voice.
- **One paragraph = one scene** (one visual idea). In short videos 1–2 sentences per paragraph.
- **Something new every 3–4 seconds:** a fact, an image, a turn. No recap except in tutorials, and only at the end.
- **Sentences of 6–14 words** (or the language equivalent); vary length; short ones at turns.
- **Specific beats adjectives:** numbers, names, dates, mechanisms.
- **Address:** pick the register the brand uses (see the i18n file: tu/vous, du/Sie, sen/siz, tú/usted, 반말/존댓말, tum/aap) and keep it.
- **Long videos (over ~2 min):** a fresh question or turn every 60–90 s; end each part on an open question the next part answers.
- **The last line is a call to action** that fits the goal (follow, save, send to someone, comment a keyword, visit). It lines up with the closing scene. Avoid stacking more than two actions.

### TTS-friendly text
- Numbers, dates, currencies, percentages and units written **as they should be spoken** in the target language (examples in the i18n file). Years may stay as digits if the engine reads them correctly; test once.
- No symbols the voice would read wrongly: `%`, `&`, `/`, `°`, `+`, `#`, emoji.
- No parentheses, no semicolons, no bullet points, no stage directions in the spoken text.
- Acronyms: write them the way they are said ("A P I" vs "API" depending on the language and engine); put brand names that get mispronounced in `audio/lexicon.json` (`{"word": "spoken form"}`) for the voice step.
- Punctuation is timing: a full stop gives a longer pause than a comma. Use short sentences for breathing room.
- On-screen text may keep digits and symbols; keep a `display` vs `spoken` pair when they differ.

### Pacing (starting points; measure the real voice afterwards)
| Language | Pace | 30 s budget | 60 s budget |
|---|---|---|---|
| en | 2.4–2.6 words/s | ~75 words | ~150 words |
| tr | 1.9–2.2 words/s (long agglutinated words) | ~60 | ~125 |
| es | 2.5–2.8 words/s | ~80 | ~160 |
| pt-BR | 2.4–2.7 words/s | ~75 | ~150 |
| fr | 2.4–2.7 words/s | ~75 | ~150 |
| de | 2.0–2.3 words/s (compounds) | ~65 | ~130 |
| zh-CN | 4–5 characters/s | ~135 characters | ~270 characters |
| ja | 5–6 characters/s (kanji + kana) | ~165 characters | ~330 characters |
| ko | 4.5–5.5 syllables/s (~2 eojeol/s) | ~60 eojeol | ~120 eojeol |
| hi | 2.2–2.5 words/s | ~70 | ~140 |

A good default for unknown voices is **2.3 words per second** (space-separated languages). After the voice exists, `voice-and-timing` measures the real rate; adjust the text, not the playback speed.

## 5. Claim list (honesty step)
Extract every checkable statement from the script and the on-screen text:
- numbers and statistics, dates and years, named people or organisations tied to an event, quotes, causal claims stated as fact, superlatives ("first", "largest", "only").

For each, record: the exact words, the scene, a risk level (high: precise figures, quotes, attributions, superlatives; medium; low: universally known) and a status:
- `in source` — appears in the material the user supplied (this is not proof, only traceability);
- `partly in source` — some names/numbers match;
- `not in source` — the user gave material, but this is not in it;
- `no source given`.

You never mark a claim as true. Show the list to the user with what to check and where. For every high-risk claim without a source: the user confirms it, gives a source, or you soften it ("about", "according to …") or delete it. If you can search the web, you may propose candidate sources, labelled as candidates.

## 6. Scan for banned phrases
1. Open `i18n/<code>.md` → "Banned phrases".
2. Check the hook options, the script, on-screen text and later the caption package against it, including close variants (same structure, different words).
3. Replace each hit with a concrete statement: what it is, what it does, a number, a name.
4. Also remove these patterns in any language: "it's not X, it's Y" contrasts used as filler; a question the next sentence answers for no reason; three adjectives in a row; announcing a reveal instead of showing it.

## 7. Write `script.md`

```markdown
# <title>
Language: <code> · Format: <story format> · Genre: <genre> · Target: <s> s · Budget: <n> words

## Hook options
1. [P] … (recommended: why)
2. [F] …
3. [N] …

## Script
<paragraph per scene, spoken form>

## Scenes
| # | Spoken line | On screen (display text) | Visual |
|---|---|---|---|

## Claims to check
| # | Claim | Scene | Risk | Status | What to check |
|---|---|---|---|---|---|

## Notes
Word count: <n> (≈ <s> s at <pace>). Register: <…>. Lexicon entries: <…>.
```

Show hooks, script and claim list together and wait for approval. Paid voice generation happens only after this and after the cost gate in `voice-and-timing`.
