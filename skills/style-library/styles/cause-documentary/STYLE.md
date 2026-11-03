<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Cause Documentary

> Handheld, warm-dark field documentary for a cause: real people in close-up, their words set in a quiet italic serif on warm black, and one apricot counter that stops at the verified total.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Nonprofit & causes | remotion (footage edit) + hyperframes (cards, counters) | fundraising appeals, programme stories, beneficiary and volunteer testimony | medium |

## 1. Essence
- In one sentence: one person's story carries a larger need, told with their consent and in their words.
- Three adjectives: human, grounded, direct.
- Signature move: the testimony card — the quote builds line by line in italic serif, first name and place appear beneath, then the cut returns to their face.

## 2. Use it for / avoid it for
- Use for: appeals, field stories, awareness campaigns, volunteer recruitment, thank-you films for a single programme.
- Avoid for: annual summaries with many figures (use `impact-annual`), upbeat brand promos, emergencies needing facts first.
- Dignity and honesty: informed, recorded consent from everyone filmed; for minors, guardian consent and no identifying details. No staged hardship and no images that strip people of dignity. Testimony is real, in the person's own words, translated faithfully (translator credited) and attributed (first name and place, or anonymised on request). Figures come from the organisation's published or audited numbers, with period and source. The donation call points to the real page.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #181512 | warm black for cards |
| ink | #F2ECE2 | quotes, titles, subtitles |
| accent | #F4A259 | apricot: counter value, call-to-action button, the opening quote mark |
| support | #9A8F82 | attribution, dates, sources |

Rules: one apricot element per frame; never on faces or on images of hardship. Footage grade is warm and natural, skin true.

## 4. Type
- Testimony: Newsreader (OFL) italic 500, 66–80 px, sentence case, 24 characters per line max, leading 1.2.
- Attribution and labels: Figtree (OFL) 700, 32 px, uppercase, tracking 0.12 em.
- Counters: Figtree 800, 140–180 px, tabular.
- Subtitles: Figtree 600, 46 px, two lines max — full verbatim subtitles for every testimony.
- Fallback: Crimson Pro italic for testimony, Karla for labels. All load latin + latin-ext; Newsreader adds Vietnamese.

## 5. Surfaces and texture
- Footage: real handheld or lightly stabilised tripod; blacks lifted 2 %, warm highlights, saturation −10 %.
- Cards: warm black with a soft vignette and grain 0.08 — heavier than most styles, close to film.
- Materials: none beyond footage and cards; no frames, no badges.
- Never: shake added to graphics in post, stock images of hardship, tearful close-ups as a hook, grid or purple backgrounds.

## 6. Framing and layout
- 9:16 zones: footage full-bleed, reframed with the eyes at y ≈ 720; testimony text x 100–940, y 620–1240 with a 120 px apricot quote mark above; attribution y 1280; counter y 700–900, label y 920, source y 1000; call to action y 1300–1420 (button 760×120, radius 60).
- Other formats: 1:1 eyes at y 420, testimony centred; 16:9 testimony on the left half over warm black, face on the right.
- Density: footage alone, or one card.

## 7. Motion
- Entrances: testimony lines fade with a 12 px rise, 0.5 s power2.out, 0.35 s apart; counters count in 1.6 s power3.out to the verified total, then period and source fade in 0.3 s.
- Exits: cards dissolve to and from footage in 0.5 s; no hard cuts into cards.
- Holds and rhythm: footage shots 4–7 s; a card holds until the voice finishes plus 1 s.
- Transitions: straight cuts in footage, 0.5 s dissolves around cards, a 1 s fade to black before the ask.
- Camera: footage carries the movement; stills get a 2 % push over 5 s.
- Frame rate feel: source rate (24/25 fps) where the platform allows.
- Edit grammar: field-documentary rhythm — cut on action or at the end of a thought; J-cuts bring the testimony in 0.5–1.0 s before the face; natural sound up for 1–2 s between thoughts; cards replace the face only when the person asked not to be shown or a line needs weight; slow motion only from native high-frame-rate footage and never on people in distress; no speed ramps or whips; the last 6–8 s are one counter and the ask over a hopeful shot.

## 8. Sound
- Bed: solo piano or strings, 60–80 BPM, −30 LUFS, entering after the first testimony line.
- Effects: none on cards except one soft low note when the counter lands; natural sound from the field matters more than music.
- Mix: voice and testimony first; −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: Remotion for the cut with subtitles from words.json; HyperFrames cards and counters as overlays; `stat-counter` for the counter, `kinetic-title` for an opening line, `word-captions` in subtitle mode, `cover-still` from a consented portrait.
- Signature scenes:
  - Testimony card: quote mark, lines building, name and place, dissolve back to the face.
  - Verified counter: one number, its period ("2025") and its source; counts once, never "live".
  - Place then and now: the same spot photographed before and after the programme (user photos), vertical wipe 0.8 s, each with a date label.
  - Name and place super: small, bottom-left, Figtree 32 px, 3 s.
  - The ask: warm black, one sentence, the real URL and a button; holds 4 s.
- Steps: 1) consent list for every face and voice; 2) transcribe and translate testimony; 3) paper edit around one person; 4) cut, overlays, subtitles; 5) mix and `qa-review` with the consent list.
- Style checks: every face appears on the consent list; counter matches its source document; translations credited; apricot never on faces.
- Common failures: music too loud over testimony; counters rounded upward (round down or show exact); a hook that exploits suffering — open with the person's own words instead.

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of field documentary and humanitarian storytelling.
