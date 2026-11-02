<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Kinetic Captions

> The words are the picture: big, voice-synced type that lands word by word on a quiet field, with one accent colour marking the word you should remember.

| Engine | Best for | Effort |
|---|---|---|
| hyperframes (or canvas) | voice-led shorts without footage, quotes, hot takes, story hooks | low |

## 1. Essence
- In one sentence: reading and listening become the same act.
- Three adjectives: punchy, rhythmic, legible.
- Signature move: each new phrase slams in on the syllable it is spoken, and the key word flips to the accent colour (or the italic serif) exactly on its stress.

## 2. Use it for / avoid it for
- Use for: hooks, opinion pieces, quotes, lists said aloud, any voiceover with no visuals.
- Avoid for: anything that needs to show a product or place — use it for the hook only, then cut to real footage.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #0E0F11 | dark, softly lit field with grain (light variant #F2F0EA) |
| ink | #FFFFFF | words already spoken |
| dim | rgba(255,255,255,.35) | words not yet spoken (when a full line is shown) |
| accent | #C8F53A | the stressed word; swap for the brand accent |

Rules: one accent word per phrase. Background never competes: no photos behind text unless darkened to ≤ 40 % brightness and blurred.

## 4. Type
- Display: Inter (OFL) 800–900, 110–170 px for 1–3 words, tracking −0.04 em; or Archivo / Bricolage Grotesque (OFL) for a different voice.
- Accent: Instrument Serif Italic (OFL) or the same family in the accent colour.
- Max 3 lines on screen, max ~14 characters per line at 130 px.
- Language coverage: latin-ext for Turkish/Central European; set `lang` so uppercase rules are correct.

## 5. Surfaces and texture
- Background: flat dark (or light) field, static grain, vignette. A slow, very large blurred colour bloom (≤ 10 % opacity) may drift behind the type.
- Texture: none on the letters — clean edges read best on phones.
- Never: grid backgrounds, purple gradients, drop shadows heavier than 20 % opacity.

## 6. Framing and layout
- Text block centred, optical centre y ≈ 860–960; never above 300 or below 1500.
- Short phrases (1–4 words) replace each other; long sentences build line by line and then clear.
- 16:9: same logic, max 2 lines, 120 px.

## 7. Motion
- Word entrance: 0.12–0.2 s, scale 0.8 → 1 with back.out(1.7) or a 60 px rise + blur 14 → 0.
- Accent hit: colour flip + 1.06 scale pulse (0.12 s) exactly on the stressed syllable.
- Phrase change: hard cut, or old words leave upward (0.2 s, power2.in) while new ones arrive.
- Rhythm: follows the voice exactly — word times come from `tools/word_timings.py`; a pause in the voice is a pause on screen.
- Camera: optional slow zoom (1.00 → 1.04 over a phrase) for momentum.

## 8. Sound
- Bed: rhythmic but sparse (90–120 BPM) at −26 LUFS under the voice; drop it out for the punchline.
- Effects: tiny clicks or thumps on accent hits only.
- Mix: −14 LUFS, voice dominant.

## 9. Build recipe and checks
- Engine and templates: `templates/kinetic-title` for phrases, `templates/word-captions` for running captions; canvas engine for heavier type physics.
- Steps: 1) voice + words.json; 2) split the script into phrases at pauses; 3) one timeline cue per word (`L(v)` with raw voiceover seconds); 4) render; 5) readcheck.
- Style checks: every on-screen word appears within ±2 frames of its spoken start; no line breaks inside a phrase that change its meaning; nothing stays on screen after it has been said and replaced.
- Common failures: text drifting early/late after a re-recorded voice (re-run word timings), orphan words on a line, accent colour on two words at once.

## Credits
Original motionforge style.
