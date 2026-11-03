# Style previews

One HyperFrames scene per style in [`skills/style-library/styles/`](../../skills/style-library/styles/).
Each folder holds the scene source (`index.html`, `hyperframes.json`, `meta.json`) that rendered the
style's `preview.gif`: a 4.5-second, 1080×1920 composition drawn only with HTML, CSS, SVG and canvas.
There are no external images, photos or footage; places, people, brands and numbers are fictional or labelled as sample data. Fonts are the ones the style names, listed in each folder's `meta.json` (`fonts`: the `@fontsource/*` packages), together with `three: true` when the scene uses the three.js layer.

## Render one

The `assets/` folder (base.css, mf-runtime.js, GSAP, fonts) is not stored here. Scaffold a scene
to get it, then drop in the preview's `index.html`:

```bash
# once, in your project: npm i -D hyperframes gsap three, plus the @fontsource packages in the style's meta.json
engines/hyperframes/scripts/new-scene.sh pixel-quest --dest scenes
cp examples/styles/pixel-quest/index.html scenes/pixel-quest/
cd scenes/pixel-quest
npx hyperframes render -o renders/pixel-quest.mp4 -q standard
```

Make the GIF the same way the gallery does (use `fps=12` and/or `max_colors=96` if it gets large):

```bash
ffmpeg -i renders/pixel-quest.mp4 -vf "fps=15,scale=360:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=128:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle" -loop 0 preview.gif
```

## Notes

- Every scene follows the engine contract: one paused GSAP timeline on `window.__timelines["main"]`,
  no wall clock, seeded randomness (`MF.rng`). Per-frame drawing (canvas, typing, film dust, line boil)
  runs in the setter of a proxy object the timeline tweens, so any seek gives the same frame.
- Fonts named in a `STYLE.md` that are not bundled (slab serifs, pixel and hand fonts) are stood in for
  by the three scaffold families; each scene's header comment says which. The pixel-quest lettering is a
  small bitmap font drawn in the scene itself.
- App UI, numbers and characters in the previews are fictional placeholders; data-story labels its
  values as sample data.
