---
name: qa-review
description: Check a motion design video before delivery - contact sheets, text cut-off/overlap/size/contrast, glyph coverage, platform safe areas, cover crop, pacing, flashes, claims and banned phrases, loudness and voice/mix parity - and run an independent critic subagent that never saw the code. Use after scenes are built and before any video, cover or caption package is delivered, and after every revision.
license: MIT
---

# QA review

The person who built a scene sees what they meant, not what is on the frame. This skill replaces "looks good" with numbers and an outside eye. Nothing is delivered with an open FAIL.

Write results to `videos/<slug>/qa/report.md`:

```markdown
Render: renders/<slug>-v<N>.mp4  sha256: <hash>   Date: <yyyy-mm-dd>
| id | status | evidence | note |
|----|--------|----------|------|
| T1 | pass   | ffprobe.json | h264 yuv420p bt709 1080x1920 30fps |
```
Status is `pass`, `fail`, `warn` (accepted with a written reason) or `pending` (needs a human). The report belongs to one render: record `sha256sum` of the file; any re-render makes the report stale and the checks run again (at least those touching changed scenes plus T*, A*).

## Order
1. Lint (see motion-director step 10) → 2. stills + sheet → 3. automatic checks → 4. look at the sheets yourself → 5. fix → 6. critic → 7. full render → 8. technical + audio checks on the final file → 9. human items.

## Contact sheets (always look at them)
```bash
python3 tools/contact_sheet.py renders/<slug>-v1.mp4 --every 0.5 --cols 6 --out qa/sheet.png --safe 220,1600   # time-stamped overview
python3 tools/contact_sheet.py renders/<slug>-v1.mp4 --every 1 --width 360 --out qa/phone.png                  # one frame per second at phone size
ffmpeg -pattern_type glob -i 'qa/stills/*.png' -vf "scale=270:-1,tile=6x3" -frames:v 1 qa/sheet.png          # stills only, before a full render
```
For the critic, also make a per-scene sheet: stills at the start, middle and end of every scene in `direction.json`, tiled in scene order. Read `qa/phone.png` as a viewer would: at 360 px wide, is every important word readable?

## Required checks

### Technical (on the final file)
| id | Check | How | Rule |
|---|---|---|---|
| T1 | stream spec | `ffprobe -v error -show_streams -show_format -of json <mp4> > qa/ffprobe.json` | H.264, yuv420p (not yuvj420p), BT.709 tags, planned size and fps, AAC 48 kHz, faststart |
| T2 | duration | same | audio and video durations differ by ≤ 0.15 s |
| T3 | black / frozen frames | `ffmpeg -i <mp4> -vf blackdetect=d=0.1,freezedetect=n=0.003:d=3 -an -f null - 2>&1 \| grep -E "black_\|freeze_"` | no unintended black; frozen stretches > 3 s need a reason |
| T4 | flashes | `ffmpeg -i <mp4> -vf signalstats,metadata=print:key=lavfi.signalstats.YAVG:file=qa/yavg.txt -f null -` | at most 3 large luminance swings (> 20% of range) per second |
| T5 | determinism | render one frame of a scene twice, compare `sha256sum` | identical |

### Text and frame
| id | Check | How | Rule |
|---|---|---|---|
| X1 | cut off / overlap / under UI | `node tools/textcheck.mjs <scene>/index.html` for every scene | no text clipped by the frame; overlapping text boxes ≤ 15% of the smaller box; nothing important under platform UI |
| X2 | size and contrast | textcheck output + sheet | 9:16 at 1080 wide: captions ≥ 48 px, headlines ≥ 64 px, nothing readable under 28 px; contrast ≥ 4.5:1 (≥ 3:1 above 40 px) |
| X3 | reading time | `node tools/readcheck.mjs <scene>/index.html --ignore caption` | each settled text block stays ≥ 1.5 s + 0.3 s per word (CJK: ≥ characters ÷ 4.5 + 1.5 s); captions ≥ 0.6 s per chunk |
| X4 | glyph coverage | glyph script below | every character of on-screen text exists in the font that renders it |
| X5 | safe areas | overlay sheet or textcheck | 9:16: content in x 60–1020, y 220–1600; nothing important at x > 940, y 900–1700; captions in y 1150–1500 |
| X6 | cover crop | `python3 tools/cover_safe_area.py renders/cover.png --boxes qa/cover-boxes.json` (boxes from `textcheck.mjs --dump`), or `--detect`; plus `contact_sheet.py --guide 3:4` | all cover text inside the 3:4 crop (y 240–1680 on 1080×1920); readable at 270 px wide |
| X7 | first frame | still at t = 0 | the hook is on screen at frame 0 as big text; no logo intro, no fade from black |
| X8 | last frame | still at the end | holds ≥ 1 s; closes the idea (result, rule, CTA); outro shows handle/site if the brand has them |
| X9 | generic look | sheet | no full-frame purple/blue gradient, no grid background, not every element fading in, not the same layout in every scene (unless the chosen style says otherwise) |
| X10 | real assets | sheet + `assets/CREDITS.md` | brand logos are the real files; screenshots are real or listed as mock; every third-party file has a license line |

**Glyph check (X4)** with fontTools (`pip install fonttools brotli`):
```bash
python3 - <<'EOF'
import json, sys
from fontTools.ttLib import TTFont
text = open("videos/<slug>/qa/onscreen.txt", encoding="utf-8").read()   # all on-screen text + captions
fonts = ["assets/fonts/Display-latin.woff2", "assets/fonts/Display-latin-ext.woff2"]  # every subset loaded
cmap = set()
for f in fonts: cmap |= set(TTFont(f).getBestCmap())
missing = sorted({c for c in text if not c.isspace() and ord(c) not in cmap})
print("missing:", "".join(missing) or "none"); sys.exit(1 if missing else 0)
EOF
```
For Turkish always include `ı İ ş Ş ğ Ğ ç Ç ö Ö ü Ü` in the test text. Also confirm the subsets' `unicode-range` declarations cover those code points (see motion-director building-scenes).

### Timing and story
| id | Check | Rule |
|---|---|---|
| P1 | cue sync | key words on screen within 3 frames of being spoken (sample 5 cues from `words.json` and render those stills) |
| P2 | no cut inside a word | scene boundaries fall in gaps between words |
| P3 | density | words per second per scene ≤ the language pace + 10% |
| P4 | dead stretches | nothing new for > 4 s only with a reason (T3 helps find them) |
| P5 | hook kept | the promise made in the first 3 s is paid off; the spoken hook and frame-0 text match |
| P6 | claims | every high-risk claim in `script.md` is confirmed, sourced, softened or removed; status recorded |
| P7 | banned phrases | script, on-screen text, captions, cover and `post.md` scanned against `skills/script-and-hooks/i18n/<lang>.md` and the brand's `words_avoid` |
| P8 | language | captions and on-screen text in the video language; register (formal/informal) consistent |

### Audio
| id | Check | How | Rule |
|---|---|---|---|
| A1 | loudness | `bash tools/loudness.sh measure <mp4>` | integrated within ±1 LU of target (−14 social, −16 when agreed); true peak ≤ −1 dBTP; no clipping |
| A2 | voice vs mix parity | `bash tools/loudness.sh compare audio/voice.wav audio/mix.wav` (warns past 3 LU); then measure the mix over a voice-only window and over a music-only window: `ffmpeg -ss <a> -to <b> -i audio/mix.wav -af ebur128 -f null - 2>&1 \| grep " I:"` | music-only stretches ≥ 8 LU below speech stretches; a voice stretch with music under it is within 1–2 LU of the same stretch in `voice.wav` after the final gain |
| A3 | footage vs TTS | same command on a presenter-footage window and a TTS window | within 1 LU; no level jump at the switch |
| A4 | start | voice starts within 0.3 s of frame 0 | the hook is heard immediately |
| A5 | listening | — | `pending` until the user has listened on a phone speaker; you cannot hear the mix |

### Human items (always `pending` until the user confirms)
- H1 final watch on a phone, sound on and off;
- H2 claims confirmed by the user where marked;
- H3 pronunciation of names and numbers.

## Fix loop
- Fix FAILs first, newest scene last. After a fix, re-run the checks for that scene and every check on the final file.
- A WARN stays only with a one-line reason in the report.
- When feedback names a timestamp, render that exact frame and look before editing.

## Independent critic (required)
After your own FIX list is empty and before the full render, run the critic in [references/critic.md](references/critic.md) as a **fresh-context subagent that never wrote or read the scenes, the code or the script**. It sees only the sheets and the 5-line brief. Fix each FIX it returns or answer it in writing in `qa/report.md`. If your environment cannot start a subagent, say so at delivery; do not role-play the critic in your own context.

## Delivery gate
Deliver only when: no `fail`, every `warn` has a reason, the critic ran (or its absence is reported), and the `pending` human items are listed in the delivery message.
