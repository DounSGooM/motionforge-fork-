# Building scenes

## Choose the engine per scene

| Scene needs | Engine | Why |
|---|---|---|
| UI, type, logos, browser/phone frames, 3D with three.js, charts | `engines/hyperframes` (default) | real HTML/CSS, GSAP timelines, renders to MP4, Apache-2.0 |
| hand-drawn, paper, ink, pixel, generative textures | `engines/canvas` | one canvas, every frame computed from `t` |
| the user's own footage, presenter card, pop-out | ffmpeg or `engines/remotion` | trimming, overlays, masks |
| assembling many scenes with audio and captions on one timeline | ffmpeg (default) or `engines/remotion` | Remotion is convenient but carries a license condition (below) |

**Remotion license:** free for individuals and for companies with up to 3 employees; larger companies need a Remotion Company License. Ask the user which applies before you pick it. Everything in motionforge works without it.

Mix engines freely: most videos look better when part of the scenes are real HTML/3D rendered with HyperFrames and part are footage or canvas scenes.

## HyperFrames scene

```bash
npm i -D hyperframes gsap                                   # once per project (pin the version)
cd videos/<slug>
../../engines/hyperframes/scripts/new-scene.sh <id>                                   # from the starter
../../engines/hyperframes/scripts/new-scene.sh <id> --template stat-counter --params p.json   # from a template
cd scenes/<id>
npx hyperframes lint
npx hyperframes render -o ../../renders/scenes/<id>.mp4    # see --help for quality/fps flags
```
Adjust the script path to where motionforge lives. The scene contract (how the timeline is registered, `base.css`, fonts) is in `engines/hyperframes/README.md`.
- One GSAP timeline, created paused, registered for the renderer as the engine README describes.
- Install GSAP with `npm i gsap` and load it from `node_modules` or a local copy next to the scene. No CDN at render time: a blocked network gives blank frames.
- Scene duration = `round(end*fps) - round(start*fps)` frames, taken from `direction.json`. Exact durations make the assembly frame-accurate.
- Cue times inside the scene are `word.start - scene.start`; copy them from `audio/words.json` into a small `cues.js`, never type them by hand.
- Remove SMIL `<animate>` tags from imported SVG logos; they run on wall-clock time and flicker in renders.

## Canvas scene
Follow `engines/canvas/README.md`. The page draws frame `f` at `t = f / fps` from scratch: no state carried from the previous frame, randomness from a seeded generator keyed by object id, never `Math.random()`.

## Footage and the presenter
- Measure every clip first: `ffprobe -v error -show_entries stream=width,height,r_frame_rate,duration -of json <clip>`.
- Look at it: `ffmpeg -i <clip> -vf "fps=1,scale=270:-1,tile=6x2" -frames:v 1 qa/<clip>-sheet.png` and open the image.
- Normalize to the project: `ffmpeg -i in.mov -an -vf "fps=30,scale=1080:-2:flags=lanczos,crop=1080:1920" -c:v libx264 -crf 17 -pix_fmt yuv420p out.mp4` (keep audio only if the clip's own sound is used; see voice-and-timing).
- Presenter footage works best at the open and the close; let graphics carry the middle.
- Files over 100 MB do not go into git. Trim or re-encode first.

### Pop-out (head breaks out of the card)
1. Cut out the person for only the seconds you need, cropped to one box that holds the head in every frame:
   `python3 tools/cutout.py assets/video/clip.mp4 assets/cutout/clip/ --start 0 --duration 5 --auto-crop --pad 40 --model u2net_human_seg`
   (rembg, roughly 0.5–1.5 s per 1080p frame on CPU; note the printed box, it is the offset of the PNG sequence).
2. Layer order: card with rounded top corners and the original clip inside (`overflow: hidden`) → above it, the cutout, clipped so that only the part above the card's top edge shows. Card and cutout share one transform so they never drift.
3. Frame the presenter so hands are cut by the bottom edge; head and microphone stay fully visible.

## Assembly (ffmpeg, default)
```bash
# renders/scenes/list.txt lists the scene MP4s in order: file 'hook.mp4' ...
ffmpeg -f concat -safe 0 -i renders/scenes/list.txt -i audio/mix.wav \
  -map 0:v -map 1:a -c:v libx264 -crf 18 -pix_fmt yuv420p -r 30 \
  -c:a aac -b:a 192k -ar 48000 -movflags +faststart -shortest renders/<slug>-v1.mp4
```
Burned-in captions: render them as their own transparent HyperFrames layer from `templates/word-synced-captions`, or overlay an `.ass` file with `-vf subtitles=captions.ass`.

## Assembly (Remotion, optional)
Use `engines/remotion` (word timer, captions, pop-out helpers). Each HyperFrames MP4 goes in a `<Sequence from={Math.round(start*fps)} durationInFrames={…}>` with `<OffthreadVideo muted>`; the mix is one `<Audio>`. Run `npx tsc -p .` clean before rendering.

## Fonts and scripts (most common silent bug)
- **Turkish:** `ı` lives in the *latin* subset, `ş ğ İ` in *latin-ext*. Load both woff2 files with these ranges:
  - latin: `U+0000-00FF, U+0131, U+2000-206F, U+20AC, U+2122`
  - latin-ext: `U+0100-0130, U+0132-024F`
- Polish, Czech, Vietnamese, Romanian also need latin-ext (Vietnamese needs the vietnamese subset too).
- zh-CN, ja, ko, hi: use a font that covers the script (for example Noto Sans SC / JP / KR / Devanagari) and load the subsets the text actually needs. Check line breaking: CJK breaks between characters, Hindi needs shaping (never split a conjunct).
- Set `<html lang="…">` to the video language. `text-transform: uppercase` with `lang="tr"` turns `i` into `İ`; in JS use `toLocaleUpperCase("tr")`.
- Fonts come with a license you can ship (OFL, Apache). Record it in `brand.json`. Do not ship fonts with Reserved Font Names modified, and do not bundle commercial fonts.
- `qa-review` runs a glyph check; a missing glyph renders as a fallback font, which looks fine at a glance and wrong on a phone.

## Real logos and real screens
- Logos: official files from the brand's press kit or repository, or an icon set with a clear license. No hand-drawn stand-ins, no colored boxes with a name.
- Screens: capture the real page (`npx playwright screenshot --viewport-size=1440,900 <url> assets/screens/x.png`), show it inside a browser or phone template, then zoom and highlight. Ask before capturing pages the user does not own.
- Photos: user-supplied or with a license that allows reuse (CC0, public domain, or a stock license the user holds). Record source and license in `assets/CREDITS.md`.
