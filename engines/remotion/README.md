# Remotion engine (optional)

Remotion is a React framework for video. motionforge uses it as an **optional** editing layer:
voiceover, captions, sound effects, talking-head footage and HyperFrames scene MP4s placed on one
timeline. Everything in motionforge also works without it (HyperFrames is the default engine).

## License note — read before you use it

Remotion is **not** under an open-source license. It uses the *Remotion License*:

* **Free** for individuals, for non-profit organisations, and for for-profit companies with
  **up to 3 employees**.
* Companies with **4 or more employees** need a paid **Remotion Company License** to use it.
* The license terms belong to Remotion and can change — always check
  <https://www.remotion.dev/license> before you rely on this summary.

motionforge does not ship Remotion. The files in `kit/` are motionforge's own code (MIT) and only
*import* Remotion packages that you install yourself. If you cannot or do not want to accept the
Remotion License, use the HyperFrames engine and `tools/` (ffmpeg) for the final mix.

## The kit

| File | What it gives you |
|---|---|
| `kit/anim.ts` | `pop` (spring), `ramp` (eased 0→1), `enter` (fade + rise + blur-in, optional exit), `flyIn` (logo fly-in with directional blur), `within`, `count`. All take absolute seconds. |
| `kit/fonts.ts` | `loadFontList(fonts)` registers every face with both the `latin` and `latin-ext` files (Turkish İ/ş/ğ, Polish ł, Hungarian ő …); `DEFAULT_FONTS` = Inter, Instrument Serif, JetBrains Mono. |
| `kit/backdrop.tsx` | `<Backdrop mode="dark" \| "light" colors={…} />` — charcoal or paper, soft light, static grain, vignette. |
| `kit/brand-kit.tsx` | `BrandProvider` + `BrandTheme`; `Watermark`, `Captions` + `buildChunks`, `wordTimer` (dotless-i safe), `Title`, `Eyebrow`, `GradientText`, `Card`, `LogoTile`, `Browser`, `Phone`, `Outro` (save/send CTA → end card), `sfx` + `SfxTrack`. |

## Setup

```bash
npx create-video@latest my-video        # or add remotion to an existing React project
cd my-video
npm i @remotion/fonts
cp -r <motionforge>/engines/remotion/kit src/kit
# fonts (OFL) into public/fonts/
npm i -D @fontsource/inter @fontsource/instrument-serif @fontsource/jetbrains-mono
cp node_modules/@fontsource/{inter,instrument-serif,jetbrains-mono}/files/*-latin*-{400,500,700,800,900}-*.woff2 public/fonts/ 2>/dev/null
```

Wait for fonts before the first frame renders:

```tsx
import { continueRender, delayRender } from "remotion";
import { fontsReady } from "./kit/fonts";

const handle = delayRender("fonts");
fontsReady.then(() => continueRender(handle));
```

## Typical composition

```tsx
import { AbsoluteFill, Audio, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop } from "./kit/backdrop";
import { BrandProvider, Captions, Outro, SfxTrack, Title, Watermark, buildChunks, sfx, wordTimer } from "./kit/brand-kit";
import words from "../public/voice/words.json";        // from tools/word_timings.py
import segments from "../public/voice/segments.json";
import { brand } from "./brand";                        // your BrandTheme

const at = wordTimer(words, brand.locale);
const chunks = buildChunks(segments, words);

export const Main: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  return (
    <BrandProvider theme={brand}>
      <AbsoluteFill>
        <Backdrop mode="dark" />
        <Title t={t} at={at("three")} top={320}>Three things</Title>
        <Sequence from={Math.round(at("browser") * fps)} durationInFrames={5 * fps}>
          <OffthreadVideo src={staticFile("video/browser-scene.mp4")} muted />  {/* a HyperFrames render */}
        </Sequence>
        <Captions t={t} chunks={chunks} until={52} />
        <Watermark />
        <Outro t={t} at={52} end={55} total={58} backdrop={<Backdrop mode="dark" />} />
        <Audio src={staticFile("voice/voice.mp3")} />
        <SfxTrack list={[sfx("whoosh", at("three") - 0.1)]} fps={fps} />
      </AbsoluteFill>
    </BrandProvider>
  );
};
```

`wordTimer` throws when a word is not found. That is deliberate: when the voiceover changes, the
build fails at the cue that moved instead of drifting silently.

## Render

```bash
npx remotion still Main out/check.png --frame=90 --scale=0.4   # look before you render
npx remotion render Main out/main.mp4
```

Then run the motionforge checks on the MP4 (`tools/review.mjs`, `tools/loudness.sh`,
`tools/contact_sheet.py`).

## Pop-out talking head

`tools/cutout.py` removes the background from talking-head frames (rembg, `u2net_human_seg`) and
crops them to a head box. Draw the original clip inside a rounded card (`overflow: hidden`), then
draw the cut-out PNG sequence on top, clipped only *above* the card's top edge, with the same
transform as the card. The head then overlaps the card border while the body stays inside.
