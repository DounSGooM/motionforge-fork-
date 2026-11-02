# Canvas engine — frame = f(t)

The canvas engine is the lowest-level option: one HTML page that can draw **any moment of the
film on demand**. There is no timeline object and no playback — a renderer asks for second `t`,
the page draws it, the renderer takes a screenshot. Use it for generative or hand-drawn looks
(2D canvas, WebGL, three.js) where a GSAP timeline would get in the way.

## The page contract

A page is a folder with an `index.html` that sets these globals:

| Global | Required | What it must do |
|---|---|---|
| `window.render(t)` | yes | Draw the frame at second `t` from scratch. May return a Promise. Must not depend on which frame was drawn before (renders run in parallel and out of order). |
| `window.READY` | yes | Set to `true` once fonts, images and models are loaded and `render` can be called. |
| `window.DUR` | for video and checks | Film length in seconds. |
| `window.SIZE` | no | `[width, height]` in pixels (default 1080×1920). |
| `window.TEXTS(t)` | for `tools/readcheck.mjs` and `tools/textcheck.mjs` | `[{ id, text, x0, y0, x1, y1 }]` — every text visible at `t`, with its pixel box. Report the **whole** string from the first frame it appears (a typewriter reports the full sentence, not the letters typed so far), and keep the same `id` while the same text stays on screen. |

Rules that keep the output reproducible:

1. **Time is the only input.** No `Date.now()`, `performance.now()`, `requestAnimationFrame`
   loops or `Math.random()`. Use `rng(...)` from `lib.js`, seeded by what the value belongs to
   (`rng("spark", i)`), so adding an element never reshuffles the others.
2. **No hidden state between frames.** Simulations are either closed-form (`spring()` in `lib.js`)
   or re-run from 0 to `t` inside `render(t)` with a fixed step.
3. **Load before READY.** `await document.fonts.ready`, decode images (`img.decode()`), then set
   `READY`. A font that arrives late changes the first frames only — a classic flicker bug.
4. **Size from the stage.** Lay out in fractions of `W`/`H` (or a unit such as `min(W,H)/1080`),
   so the same page can render 9:16, 1:1 and 16:9 via `?format=` in `location.search`.

### Minimal page

```html
<!doctype html>
<html><head><meta charset="utf-8"><style>html,body{margin:0;background:#0e0f11}</style></head>
<body><canvas id="c" width="1080" height="1920"></canvas>
<script type="module">
  import { ease, keys, rng, span } from "./lib.js";   // copy lib.js next to the page, or serve a parent with --root
  const cv = document.getElementById("c"), g = cv.getContext("2d"), W = cv.width, H = cv.height;
  const TITLE = "Every frame is f(t)";
  window.DUR = 4;

  window.render = (t) => {
    g.fillStyle = "#0e0f11"; g.fillRect(0, 0, W, H);
    for (let i = 0; i < 40; i++) {                      // seeded dust, stable across renders
      const r = rng("dust", i);
      g.fillStyle = `rgba(255,255,255,${0.08 + 0.1 * r.next()})`;
      g.fillRect(r.float(0, W), (r.float(0, H) - t * 30 * r.float(0.5, 1.5) + H) % H, 3, 3);
    }
    const y = keys(t, [[0, H * 0.55], [0.7, H * 0.45, ease.outBack]]);
    g.globalAlpha = span(t, 0, 0.3);
    g.fillStyle = "#fff"; g.font = "800 92px Inter, sans-serif"; g.textAlign = "center";
    g.fillText(TITLE, W / 2, y);
    g.globalAlpha = 1;
  };
  window.TEXTS = (t) => t < 0.3 ? [] : [{ id: "title", text: TITLE, x0: 140, y0: H * 0.45 - 80, x1: W - 140, y1: H * 0.45 + 20 }];

  await document.fonts.ready;
  window.READY = true;
</script></body></html>
```

## Render

```bash
npm i -D playwright && npx playwright install chromium     # once
node engines/canvas/render.mjs info  path/to/page           # kind, duration, size
node engines/canvas/render.mjs still path/to/page 0 1.5 3   # PNG stills -> path/to/page/stills/
node engines/canvas/render.mjs still path/to/page --every 0.5
node engines/canvas/render.mjs video path/to/page --fps 30 --workers 3 --out out/page.mp4
```

The renderer serves the page folder over `http://127.0.0.1` (fonts and ES modules do not load
from `file://`). Use `--root <folder>` when the page imports files from a parent folder.

`render.mjs` also seeks HyperFrames scenes (`window.__timelines`), so the same command makes
review stills of any motionforge page. It writes silent video; mux audio afterwards with
`tools/loudness.sh normalize` and ffmpeg, or in Remotion.

## Helpers in `lib.js`

| Group | Functions |
|---|---|
| math | `clamp`, `lerp`, `invLerp`, `span(t, a, b)`, `remap`, `TAU` |
| random | `seedOf(...parts)`, `rng(...parts)` → `{ next, float, int, pick, sign, gauss }`, `noise1(x, seed)` |
| easing | `ease.linear`, `inQuad`, `outQuad`, `inOutQuad`, `inCubic`, `outCubic`, `inOutCubic`, `outQuart`, `inOutSine`, `outExpo`, `outBack(u, s)`, `outElastic`, `steps(n)` |
| spring | `spring(t, { stiffness, damping, mass })` closed form, `SPRINGS` presets (`ui`, `card`, `heavy`, `bouncy`), `springTo(t, changes)` |
| keyframes | `keys(t, [[t0, v0], [t1, v1, easing], …])` — numbers or arrays |
| envelope | `pulse(t, start, end, fadeIn, fadeOut)` |
