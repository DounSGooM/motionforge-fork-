<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Breaking Ticker

> A broadcast news package in 9:16: a red tag slams onto a white headline slab, a yellow ticker crawls at a steady pace below, a LIVE dot pulses, and headlines stack like a running order.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| News & commentary | hyperframes (remotion for footage-heavy packages) | news updates, announcements, policy changes, results, event coverage | medium |

## 1. Essence
- In one sentence: what happened, when, and who says so — in a structure viewers already trust.
- Three adjectives: urgent, ordered, sober.
- Signature move: the headline slab wipes in from the left, the red tag slams onto its corner, and the ticker is already running underneath.

## 2. Use it for / avoid it for
- Use for: news summaries, company or product announcements, regulation changes, results, live-event updates.
- Avoid for: evergreen tips, opinion essays (use `newspaper-print`), comedy — news parody only when it is obviously parody.
- Honesty: "BREAKING" only for new, confirmed developments; "LIVE" only on a live stream; "DEVELOPING" when facts are partial; every headline has a named source and a timestamp with time zone; quotes verbatim; footage from the user or a licensed pool. Never imitate a real broadcaster's graphics package, logo, bug, colours or presenters.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #071A33 | studio navy, or real footage darkened 40 % |
| ink | #FFFFFF | text on navy and footage |
| accent | #D3122A | alert red: BREAKING / LIVE / DEVELOPING tags only |
| banner | #F5F7FA | headline slab; slab text #0A1220 |
| support | #F2C230 | ticker strip with dark text |

Rules: red under 4 % of the frame and only on tags. Bars are flat, with at most a 1 px top highlight. Never flash the frame (photosensitivity).

## 4. Type
- Headline: Barlow Condensed (OFL) 700, 76–92 px, sentence case, two lines and 42 characters max.
- Tags: Barlow Condensed 800, 44 px, uppercase, tracking 0.06 em, white on red.
- Ticker: Source Sans 3 (OFL) 600, 36 px, sentence case, items separated by "•".
- Time and place: Overpass Mono (OFL) 600, 30 px ("14:32 UTC · LISBON").
- Fallback: Oswald for headlines. Source Sans 3 and Overpass Mono cover Cyrillic and Vietnamese; Source Sans 3 also Greek.

## 5. Surfaces and texture
- Background: navy with a soft key light top-right and grain 0.03, or real footage.
- Materials: flat bars with a shadow 0 8 px 24 px at 35 %; the slab has a 6 px red edge on its left when tagged.
- Texture: none beyond grain — clean graphics on real pictures.
- Never: wireframe or grid globes, grid backdrops, purple gradients, lens flares, invented channel names or logos.

## 6. Framing and layout
- 9:16 zones: top bug (LIVE tag + time) x 80, y 250–310; footage or visual y 320–1180; tag y 1150–1200; slab x 60–940, y 1200–1400; subhead y 1410–1470; ticker full width y 1600–1660.
- Other formats: 1:1 slab in the lower third; 16:9 classic lower third at y 820–960 with the ticker at y 1000–1040 (1080 high).
- Density: one headline, one subhead, the ticker, one tag.

## 7. Motion
- Entrances: slab wipes in by clip-path in 0.3 s power4.out; its text follows 0.08 s later with a 40 px slide (0.25 s); the tag slams from scale 1.3 to 1 in 0.18 s back.out(3).
- Ticker: linear crawl at 140 px/s, computed from the frame number, looping its items — never eased.
- LIVE dot: opacity on a 1.0 s sine of the frame (deterministic).
- Headline swap: old line flips up (rotateX 0 → 90° in 0.2 s), new one flips in from below (0.2 s).
- Exits: slab wipes out to the right in 0.25 s power3.in.
- Holds and rhythm: a headline stays at least 3 s + 0.3 s per word.
- Transitions and camera: hard cuts; between stories the whole frame pushes up in 0.3 s power3.inOut; footage static or a 2 % push.
- Edit grammar: news-package grammar — voice-over on b-roll shots of 2–4 s cut at sentence boundaries; sound bites of 6–15 s with a name super 0.5 s after the speaker's first word, held 4 s; 0.5–1 s natural-sound breaks between voice-over lines; full-screen graphics (fact box, OSM map with "© OpenStreetMap contributors") 4–6 s; no music under hard news, no speed ramps or whips.

## 8. Sound
- Bed: none for hard news; for soft recaps a pulse bed 110–120 BPM at −30 LUFS.
- Effects: one 0.8 s sting on the opening BREAKING slam only; the ticker is silent.
- Mix: voice and sound bites first; −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: hyperframes overlays; Remotion for multi-clip packages; `browser-window` for source articles; `stat-counter` for figures; `word-captions` as the subhead line; `cover-still`.
- Signature scenes:
  - Breaking slam: slab wipe, tag slam, time and place type on at 30 chars/s.
  - Ticker crawl: 3–6 short, sourced items at constant speed.
  - Running order: 3–5 numbered slabs stacked; the current one white, the others at 50 %; the stack moves up 0.3 s per story.
  - Source card: the original report in `browser-window` with publisher and timestamp visible, a 0.4 s highlight box on the key line.
  - Fact box: three facts as slabs, each labelled CONFIRMED or UNCONFIRMED from the claim list.
- Steps: 1) claim list with source and time per headline; 2) choose tags truthfully; 3) build overlays from params; 4) cut the package, mix; 5) `qa-review`.
- Style checks: tags truthful; time zone shown; ticker readable (≤ 140 px/s at 36 px); nothing resembles a real channel's package.
- Common failures: ticker too fast; three-line headlines (rewrite); red used for emphasis outside tags.

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of broadcast news graphics and news-package editing.
