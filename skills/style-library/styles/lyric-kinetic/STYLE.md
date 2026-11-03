<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Lyric Kinetic

> Word-by-word lyrics on a deep wine field: each word lands on its syllable's beat, sung-long words stretch with the note, and the line rebuilds itself into a new shape every bar.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Music, events & weddings | hyperframes | lyric videos, single and album teasers, song-snippet reels, live-session captions | high |

## 1. Essence
- In one sentence: you can see the song's rhythm even with the sound off.
- Three adjectives: rhythmic, expressive, intimate.
- Signature move: the held note — a sustained word's letters spread apart (tracking 0 → 0.35 em) for exactly the note's length, then snap back on the next syllable.

## 2. Use it for / avoid it for
- Use for: official lyric videos, release teasers (15–30 s hook sections), acoustic-session captions, cover-song reels where the user has the rights.
- Avoid for: spoken explainers (use `kinetic-captions`), songs whose lyrics or recording the user does not own or license, dense rap verses above ~6 words/s (switch to line mode).
- Honesty: lyrics and audio need the rights holder's permission (artist, label or licence); record it in `assets/CREDITS.md`. Artist photos and artwork come from the user. Never transcribe lyrics from a lyrics site; use the artist's own text.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #1C0A10 | deep wine field (re-tint from the cover art, keep L* ≤ 10) |
| ink | #FFF4EC | sung words |
| accent | #FF8A5B | the word being sung right now, held-note stretch |
| support | #6B3A44 | upcoming words (ghosted at 60 %), past lines |
| glow | #FFD1BA | 24 px soft glow behind the accent word only |

Rules: one accent word at a time; the rest of the line is ink or support. Per-release palettes derive from the cover art: background = darkest cover hue at L* 6–10, accent = its most saturated hue at L* 65–75; check contrast ≥ 4.5:1.

## 4. Type
- Display: DM Serif Display (OFL) 400 for emotional lines, 120–200 px, sentence case, tracking −0.02 em.
- Rhythm words: Syne (OFL) 800, 110–180 px, lowercase, for percussive or fast lines.
- Labels: Space Mono (OFL) 400, 26 px, uppercase, tracking 0.18 em (artist, title, timecode).
- Language coverage: all three ship latin + latin-ext; fallback `Georgia, serif` / `system-ui`. Line breaks follow phrases, never split a word.

## 5. Surfaces and texture
- Background: flat wine field with a slow-breathing radial light (4 % lightness swing over 8 bars, deterministic); optionally a blurred, darkened (−60 %) frame of the cover art or performance footage.
- Materials: type only; the cover art appears as a 520 px square card in the intro and outro.
- Texture: static film grain 0.09; a soft vignette of 18 %.
- Never: grid backgrounds, purple gradients, audio spectrum bars as decoration, rainbow word colours.

## 6. Framing and layout
- 9:16 zones: lyric block centred y 640–1300, max 3 lines, max 10 characters per line in serif at 200 px; artist/title label y 260; progress hairline y 1700.
- Other formats: 1:1 lyric block centred, 2 lines max; 16:9 block left-aligned at x 160 with footage on the right.
- Density: one line (2–6 words) on screen; the next line ghosted at 25 % below only in slow songs.

## 7. Motion
- Entrances: each word appears on its syllable onset: scale 0.82 → 1, y +24 → 0, opacity 0 → 1 in 0.09 s (`power3.out`), started 2 frames before the onset so it reads as on time.
- Exits: the whole line lifts 40 px and fades in 0.25 s on the bar line; on the drop, it shatters word-by-word outward 120 px, 30 ms stagger.
- Holds and rhythm: layout changes every bar (2 s at 120 BPM); emphasis words get a 1.15 scale pop on the snare.
- Transitions: line-to-line morphs (shared words stay and slide to their new place, 0.3 s `power2.inOut`); a 2-frame cut to black before the chorus.
- Camera: a slow 2 % push per line; a 6 % zoom-in on the chorus hook word.
- Frame rate feel: smooth 30 fps for type; held-note stretch is linear in time.
- Edit grammar: the beat grid is the timeline — every cut and layout change lands on a bar line or downbeat, words on syllable onsets (from forced alignment, corrected by hand). Performance footage, if used, cuts every 1 or 2 bars, swaps angles on the snare, with speed ramps only on held notes (100 % → 60 %). No J/L-cuts: the song is the continuous audio.

## 8. Sound
- Bed: the track itself, mastered; no extra music.
- Effects: none by default; a reverse swell into the chorus only if it is part of the track.
- Mix: keep the master as delivered; check the export at −14 LUFS integrated (turn down, never compress), true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: HyperFrames; `templates/word-captions` (word-timing engine) and `kinetic-title` for line layouts, `cover-still` for the thumbnail.
- Signature scenes:
  - syllable land: words appear on onsets from `words.json`, accent passes to the current word.
  - held note: tracking stretches linearly 0 → 0.35 em for the note's duration, glow grows 0 → 24 px, snaps back in 0.06 s.
  - chorus stack: the hook line repeats in 3 sizes (200/140/90 px) stacked and offset, each landing on a downbeat.
  - cover bookends: cover art card scales from 0.9 to 1 over 2 s at the start, the final word dissolves into it at the end.
- Steps: 1) confirm rights for audio and lyrics; 2) `tools/word_timings.py` on the vocal stem, then hand-correct to syllables; 3) mark bar lines; 4) lay out line by line; 5) QA with sound off.
- Style checks: every word visible within ±1 frame of its onset; no line exceeds 3 rows; accent never on two words at once.
- Common failures: words late by the alignment's latency (shift by −2 frames), too many words per screen in fast sections (switch to line mode), stretch overflowing the safe band (cap at 900 px width).

## Overrides
None (library copy).

## Credits
Original motionforge style, drawing on the general tradition of kinetic typography and lyric videos.
