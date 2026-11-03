<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Talking Head Pop

> Full-frame phone footage of one person talking, a punch-in on every cut, chunky captions on white plates with the key word on a highlighter-yellow plate, and emphasis beats where the speaker is cut out in front of a giant word.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Creators & personal brands | remotion (edit) + hyperframes (cards) | opinion and advice shorts, coaching tips, story-time, reactions | medium |

## 1. Essence
- In one sentence: a person talking straight to camera, edited so tightly that every sentence feels like a new shot.
- Three adjectives: direct, bouncy, bright.
- Signature move: the word-behind-head beat — the footage drops away, the cut-out speaker stands on a flat field and one huge word slams in behind them.

## 2. Use it for / avoid it for
- Use for: creators who are the content — advice, hot takes, story-time, "3 mistakes", replies to comments.
- Avoid for: tool tours that need the screen most of the time (use `creator-reels-dark` or `screencast-zoom`), calm or grief topics.
- Honesty: cut-outs only of the person who appears and agreed; b-roll of a real product or app is real footage or a real screen from the user.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #F1ECE2 | warm paper field behind cut-out beats; footage otherwise |
| ink | #0D0E10 | caption text, the giant word |
| plate | #FFFFFF | caption plates, pop card fill |
| accent | #FFD84D | highlighter-yellow plate behind the stressed word (text stays ink), progress bar |
| support | #FF5A1F | orange sticker arrows and circled objects only |

Rules: one yellow plate per caption chunk at most; orange only on stickers, never on text plates. A yellow full-field variant is allowed for one word-behind-head beat per video.

## 4. Type
- Captions: Montserrat (OFL) 900, 64–76 px, sentence case, tracking −0.01 em, 1–3 words per plate.
- Giant word: Archivo Black (OFL), 300–420 px, uppercase, tracking −0.02 em, max 7 letters.
- Labels: Work Sans (OFL) 600, 30 px, sentence case (sticker notes, source lines).
- Language coverage: all three ship latin-ext; check uppercase İ in Archivo Black with `lang="tr"`.

## 5. Surfaces and texture
- Background: the footage, exposure for the face, colour natural; cut-out beats use flat #F1ECE2 with static grain 0.04 and a contact shadow under the shoulders.
- Materials: caption plates with 18 px radius and 14/26 px padding; pop cards with 40 px radius and `0 24px 60px rgba(13,14,16,.25)`; stickers with a 6 px white die-cut edge.
- Texture: none on plates; footage stays clean.
- Never: grid backgrounds, purple gradients, beauty filters that reshape the face, emoji rain.

## 6. Framing and layout
- 9:16 zones: eyes on y 620–700, headroom about 140 px; caption plates centred at y 1180–1400; giant word y 500–900 behind the head; pop cards y 760–1640.
- Other formats: 1:1 eyes at y 380, captions y 760; 16:9 speaker on the right third, cards on the left.
- Density: face + one caption chunk, or face + one pop card; stickers max one at a time.

## 7. Motion
- Entrances: plates scale 0.7 → 1 with back.out(2) in 0.14 s on the first syllable; the yellow plate pops 1.08 → 1 on the stress.
- Exits: plates cut out on the next chunk; pop cards drop 0.2 s power2.in.
- Holds and rhythm: a cut or punch every 1.5–2.5 s; a sticker or card every 5–8 s.
- Transitions: hard jump cuts; one whip (0.18 s, 40 px motion blur) per topic change.
- Camera: punch ladder of 1.00 / 1.12 / 1.25 crops; on the payoff word a 0.25 s power2.out push from 1.00 to 1.20.
- Frame rate feel: 30 fps, crisp, no added shake.
- Edit grammar: average shot 1.5–2.5 s; first cut inside 0.8 s; every pause over 0.2 s removed and adjacent cuts never share a scale; b-roll inserts 1–2 s (max 2.5 s) as pop cards over continuous voice (L-cut); reaction faces 0.5 s; cuts land on word starts, not mid-word.

## 8. Sound
- Bed: upbeat hip-hop or pop instrumental, 95–110 BPM, −26 LUFS under voice.
- Effects: pop on plates every 3rd chunk (not every one), thump on the giant word, swish on whips, at about 0.15 of voice level.
- Mix: voice compressed and bright; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: Remotion for the jump-cut edit and punch ladder; HyperFrames for `templates/word-captions` (plate mode), `templates/phone-ui` and `templates/browser-window` inside pop cards, `templates/cover-still`.
- Signature scenes:
  - punch ladder: crops 1.00 / 1.12 / 1.25 anchored on the eye line, chosen by cut index so neighbours differ.
  - word behind head: `tools/cutout.py` per frame, field #F1ECE2 (or yellow #FFD84D), the word slams 1.3 → 1 in 0.18 s power4.out behind the head, holds 1.2–2 s.
  - pop card b-roll: 860 × 1080 card rises 220 px with back.out(1.6) in 0.35 s, covers the lower 60 % while the face stays visible above.
  - sticker arrow: 180 px orange arrow rotates in from −20° with back.out(2), points at the object in hand, holds 1.5 s.
- Steps: 1) words.json; 2) remove pauses, build the punch ladder; 3) cut-outs for 1–3 emphasis beats; 4) cards and captions; 5) mix, QA.
- Style checks: no two adjacent shots share a crop; the yellow plate matches the stressed word; cut-out edges show no halo.
- Common failures: the punch-in crops the chin or mic (anchor on eyes); too many sound pops (keep ≤ 1 per 3 s).

## Overrides
None in the library copy.

## Credits
Original motionforge style, drawing on the general tradition of phone-shot direct-to-camera editing and pop poster typography.
