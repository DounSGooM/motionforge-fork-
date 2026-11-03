<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Interview Doc

> Quiet documentary interview: a person framed off-centre, name supers that slide out from behind a thin amber rule, slow pushes on b-roll, and serif chapter cards on black.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Documentary & storytelling | remotion (footage edit) + hyperframes (supers, chapter cards) | founder stories, oral histories, expert interviews, customer stories, mini-docs | medium |

## 1. Essence
- In one sentence: someone tells their story and the edit stays out of the way.
- Three adjectives: honest, unhurried, intimate.
- Signature move: the name super — an amber 4 px rule extends to 420 px and the name and role rise from behind it.

## 2. Use it for / avoid it for
- Use for: interviews, profiles, community portraits, behind-the-scenes, case studies told by the people involved.
- Avoid for: voice-only scripts without footage of the speaker, fast hype edits, list-style tips.
- Honesty: every interviewee signs a release; answers are shortened, never re-ordered to change their meaning, and joins are covered by a visible cut or cutaway; names and titles are confirmed by the person; testimonials are real and attributed.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #101211 | off-black for chapter cards and pillar areas |
| ink | #EEEAE2 | warm white for supers, titles, subtitles |
| accent | #E3A63C | amber: the super rule, chapter number, progress dot |
| support | #8D918C | roles, dates, locations |

Rules: the footage grade carries the colour; graphics are neutral plus one amber line. Never colour the name. When footage is bright, add a scrim (background at 55 %, bottom 35 % of the frame, gradient to 0) behind supers only.

## 4. Type
- Chapter cards: Source Serif 4 (OFL) 600, 96–120 px, sentence case, tracking −0.01 em; chapter number above in Public Sans 600, 30 px, tracked 0.2 em.
- Supers: Public Sans (OFL) 600, 50 px for the name; 400, 36 px for the role; 30 px muted for place and year.
- Subtitles: Public Sans 600, 46 px, two lines max, 38 characters per line, soft 2 px shadow — full verbatim subtitles, not word-pop captions.
- Fallback: Libre Franklin and Crimson Pro. All carry latin-ext; Source Serif 4 adds Cyrillic, Greek and Vietnamese.

## 5. Surfaces and texture
- Background: the footage itself. Chapter cards on flat background with a soft vignette and grain 0.05.
- Grade: blacks lifted 3 %, gentle contrast, skin tones protected, warm highlights; A-cam and B-cam matched on a still pair.
- Materials: none — no frames, borders or cards around footage.
- Never: animated backgrounds behind interviews, grid overlays, simulated handheld shake on locked-off shots, beauty filters on faces.

## 6. Framing and layout
- 9:16 zones: reframe the interview so the eyes sit at y ≈ 700 with look-room on the side they face; super at x 80, y 1240–1400; subtitles y 1440–1600; chapter text centred y 860–1060.
- Other formats: 1:1 eyes at y 400, super y 760; 16:9 subject on a third, super lower-left inside 90 % title-safe.
- Density: speaker, one super, subtitles — nothing else during A-roll.

## 7. Motion
- Entrances: the super rule draws 0 → 420 px in 0.35 s power3.out; the name rises out of a mask 0.1 s later (0.4 s power3.out), the role 0.08 s after it.
- Exits: supers hold 4 s and leave in reverse in 0.3 s power2.in; chapter cards fade in 0.4 s from black, hold 2.0–2.5 s, fade out 0.4 s.
- Holds and rhythm: A-roll runs as long as the thought; b-roll shots 3–5 s.
- Transitions: hard cuts; dips to black only at chapters; a 12-frame cross-dissolve only to mark passing time.
- Camera: b-roll gets a slow push of 1.5–3 % over its length (sine.inOut) or a 40 px drift on stills; A-roll static, with a digital punch-in to 112–118 % to hide each jump cut.
- Frame rate feel: deliver at the source rate (24/25 fps) when the platform accepts it; no frame blending.
- Edit grammar: A-roll segments 6–12 s; b-roll laid over the voice, showing what the speaker names, cut on that word; J-cuts start the next answer 0.5–1.0 s under the end of b-roll, L-cuts carry a line out into b-roll; cut on breaths and sentence ends, never mid-word; alternate wide/tight at every jump cut; the super appears 1.0–1.5 s after a person's first word and only on their first appearance.

## 8. Sound
- Bed: minimal piano or ambient pads at −32 to −28 LUFS, only in b-roll passages; silence under emotional answers.
- Effects: none designed. Room tone fills every edit (0.5 s handles); b-roll natural sound at about −26 LUFS.
- Mix: dialogue first, light de-noise and de-ess; −14 LUFS integrated, true peak ≤ −1 dBTP; matched room tone across cuts.

## 9. Build recipe and checks
- Engine and templates: Remotion for the multi-clip cut and subtitles from words.json; HyperFrames renders supers and chapter cards as alpha overlays; `word-captions` in full-subtitle mode; `cover-still` from a face still.
- Signature scenes:
  - Name super: rule, name, role as above; place and year optional on a third line.
  - Chapter card: amber "02" over a Source Serif title, dip to black in and out.
  - Pull quote: A-roll freezes on a neutral frame, darkens 50 %, the quote builds line by line in Source Serif 4 italic 72 px (0.4 s per line), attribution in Public Sans.
  - Then and now: an archive photo of the speaker and today's frame slide apart from centre in 0.6 s power3.inOut, each with its year label.
  - B-roll push: a still or clip pushes 3 % over 4 s; archival stills cross-dissolve 0.5 s into the next.
- Steps: 1) transcript with timings (`tools/word_timings.py`); 2) paper edit — choose bites on the transcript; 3) cut A-roll, then lay b-roll; 4) overlays and subtitles; 5) mix and `qa-review`.
- Style checks: supers spelled as the person approved; never two supers at once; subtitles match the words heard; eyes at y ≈ 700 in 9:16.
- Common failures: jump cuts without a punch-in; b-roll for every noun (one per sentence is enough); music under an emotional answer.

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of documentary interview and oral-history film.
