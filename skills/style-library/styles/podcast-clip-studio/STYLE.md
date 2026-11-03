<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Podcast Clip Studio

> A vertical cut of a long conversation: the speaker in a framed window, a coral ring on whoever is talking, a waveform bar with a playhead, and the best line set as a large italic pull-quote.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Creators & personal brands | remotion (edit) + hyperframes (graphics) | podcast and interview clips, panel highlights, live-stream cut-downs | medium |

## 1. Essence
- In one sentence: one complete thought from a conversation, packaged so a viewer with the sound off still knows who is speaking and what the point is.
- Three adjectives: attentive, clear, conversational.
- Signature move: the pull-quote card — the strongest sentence fills the frame in italic serif, its key words underlined in coral as they are spoken.

## 2. Use it for / avoid it for
- Use for: 30–90 s podcast clips, interview answers, two-person debates, conference panel moments.
- Avoid for: scripted voice-overs with no recorded conversation (use `kinetic-captions`), music content.
- Honesty: text in quotation marks is verbatim from the transcript; names and titles are spelled as each guest confirms; clip only with the guests' agreement.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #10151C | deep ink-blue studio field around the windows |
| panel | #1A2230 | window frames, waveform track, lower-third plates |
| ink | #F2F4F7 | captions, quotes, names |
| accent | #FF6B4A | active-speaker ring, playhead, quote marks, underlines |
| support | #8FB8DE | second speaker's ring and name tick |
| muted | #7E8A9C | titles under names, timestamps, episode labels |

Rules: coral marks only the person speaking now or the words being quoted; one coral element at a time. The second speaker never gets coral.

## 4. Type
- Display: Manrope (OFL) 800, 78–96 px, sentence case, tracking −0.02 em (episode titles, chapter hooks).
- Pull-quotes: Newsreader (OFL) italic 500, 64–80 px, line-height 1.18, max 5 lines.
- Captions: Manrope 700, 52–58 px, 2–3 words per chunk.
- Labels: IBM Plex Mono (OFL) 500, 26–28 px, uppercase, tracking 0.14 em (EP 112, 00:41:12).
- Language coverage: all three have latin-ext on Fontsource; load both subsets.

## 5. Surfaces and texture
- Background: flat #10151C with a soft top light (`#1F2A38` radial, 50 % opacity) and static grain 0.05.
- Materials: video windows with 28 px radius and a 2 px `#1A2230` frame; rings are 4 px strokes 8 px outside the frame.
- Texture: none on type; footage graded neutral with a slight warm skin balance.
- Never: grid backgrounds, purple gradients, animated equaliser bars that do not follow the real audio.

## 6. Framing and layout
- 9:16 single speaker: window 960 × 800 at x 60, y 240–1040; waveform band y 1080–1180; captions y 1240–1480; episode tag y 250 inside the window's top-left.
- Two speakers: stacked windows 1000 × 560 at y 240–800 and y 830–1390; captions y 1430–1600.
- Other formats: 1:1 side-by-side windows 520 × 640; 16:9 two windows left/right, captions bottom centre.
- Density: windows + one caption chunk; lower-third and pull-quote never overlap captions.

## 7. Motion
- Entrances: lower-third plate slides in from x −40 with 0.35 s power3.out, name types at 30 chars/s, title fades 0.2 s later.
- Exits: lower-third slides out 0.25 s power2.in after a 3.5 s hold.
- Holds and rhythm: pull-quote 3–4 s; a framing change every 6–10 s.
- Transitions: hard cuts on speech; a 0.3 s crossfade only into and out of the pull-quote.
- Camera: digital punch-ins between 1.00 and 1.18 scale on 4K sources, anchored on the eye line.
- Frame rate feel: smooth 30 fps; the waveform updates every frame from precomputed RMS.
- Edit grammar: one clip = one complete thought, cut on sentence boundaries; ums and pauses over 0.4 s removed with jump cuts hidden by a punch-in change; speaker changes are L-cuts — picture switches 3–6 frames after the new voice starts; reaction shots 0.8–1.5 s at most; the hook sentence is moved to the first 2 s only if it keeps its meaning.

## 8. Sound
- Bed: none, or a quiet ambient pad at −32 LUFS for the intro card only.
- Effects: a soft tick when the pull-quote lands; no whooshes on speaker changes.
- Mix: dialogue levelled per speaker, de-essed, noise reduced; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: Remotion for the multicam edit; HyperFrames for the graphics with `templates/word-captions`, `templates/kinetic-title` (episode hook) and `templates/cover-still` (end card); waveform and pull-quote are new scenes.
- Signature scenes:
  - speaker swap: the active window gets the 4 px coral ring in 0.15 s; the other drops to 55 % brightness and 40 % saturation.
  - waveform bar: 64 bars, 10 px wide, 6 px gaps, heights from precomputed RMS, coral playhead moving at clip speed.
  - pull-quote card: 220 px coral quote mark, Newsreader italic builds phrase by phrase from words.json, key words underlined with a 6 px coral line drawn in 0.3 s; speaker name in IBM Plex Mono below.
  - episode end card: episode number, title and "full episode" line, 2.5 s hold.
- Steps: 1) transcript + word timings; 2) pick a thought that stands alone; 3) multicam cut; 4) graphics and captions; 5) quote check against audio, mix, QA.
- Style checks: ring colour matches the voice heard; quote text equals the audio word for word.
- Common failures: captions covering the speaker's mouth (keep below the window); clip ends mid-thought.

## Overrides
None in the library copy.

## Credits
Original motionforge style, drawing on the general tradition of radio studio graphics and magazine pull-quotes.
