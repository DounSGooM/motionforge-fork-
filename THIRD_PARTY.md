# Third-party software used at run time

motionforge does **not** bundle any of the software below. Each item is installed by you (npm, pip, system package) when a job needs it, and stays under its own license. This list tells you what gets installed and which terms apply.

| Software | Used for | License | Notes |
|---|---|---|---|
| [HyperFrames](https://github.com/heygen-com/hyperframes) | default engine: HTML scenes → MP4 | Apache-2.0 | `npx hyperframes` |
| [GSAP](https://gsap.com) | timelines inside HyperFrames scenes and templates | GSAP Standard License | installed from npm (`npm i gsap`), never vendored. Read its terms; they restrict building a competing visual animation builder with it. |
| [Remotion](https://www.remotion.dev) | optional React engine (`engines/remotion`) | Remotion License | free for individuals, non-profits and for-profit companies with up to 3 employees; larger companies need a Remotion Company License. |
| [React](https://react.dev) | Remotion compositions | MIT | |
| [Playwright](https://playwright.dev) | canvas engine rendering, screenshots | Apache-2.0 | downloads its own Chromium |
| [FFmpeg](https://ffmpeg.org) | encoding, loudness, contact sheets, export | LGPL-2.1+ / GPL-2.0+ (depends on your build) | system install |
| [faster-whisper](https://github.com/SYSTRAN/faster-whisper) | word timings | MIT | models download on first use |
| [rembg](https://github.com/danielgatis/rembg) | talking-head cut-out | MIT | models download on first use; check each model's own license |
| [Pillow](https://python-pillow.org) | images in Python tools | MIT-CMU (HPND) | |
| [fontTools](https://github.com/fonttools/fonttools) | glyph coverage check | MIT | optional |
| [Kokoro](https://github.com/hexgrad/kokoro) | optional local TTS | Apache-2.0 | optional |
| [Inter](https://rsms.me/inter/), [Instrument Serif](https://github.com/Instrument/instrument-serif), [JetBrains Mono](https://www.jetbrains.com/lp/mono/) | default fonts in examples and templates | SIL Open Font License 1.1 | installed via `@fontsource/*` packages, not bundled |

Paid APIs (ElevenLabs, OpenAI and others) are called only with your own key and only after you approve the stated cost. Their terms of service apply to what you generate.
