---
name: style-library
description: Pick, customise or create the visual style of a motionforge video from a library of 100 styles in 20 categories (creators, e-commerce, real estate, sports, documentary, education, tech, finance, food, fitness, travel, events, news, business, gaming, kids, fashion, automotive, art direction, nonprofit). Use when a video needs a look (palette, type, texture, framing, motion, edit rhythm, sound) before scenes are built, when the user names a style, a vertical or a reference, or wants their own reusable style. Every style is one STYLE.md in the same 9-section format.
license: MIT
---

# Style library

A style is a written contract for how a video looks, moves and sounds. Scenes are built *from* the
style, and reviews are judged *against* it. Each style lives in `styles/<slug>/STYLE.md` and uses the
same nine sections (see [`styles/_template/STYLE.md`](styles/_template/STYLE.md)):

1. **Essence** — the look in one sentence and three adjectives
2. **Use it for / avoid it for**
3. **Palette** — named tokens with hex values and their jobs
4. **Type** — families (free licences only), sizes, case, tracking
5. **Surfaces and texture** — backgrounds, materials, grain, lines
6. **Framing and layout** — where things sit in 9:16 (and how it adapts to 1:1 / 16:9)
7. **Motion** — entrances, exits, easing, timing numbers, transitions, camera, edit grammar (shot length, cut types, where cuts land)
8. **Sound** — music bed, effects, how they sit under the voice
9. **Build recipe and checks** — engine, templates, signature scenes, steps, style-specific QA

The catalogue — 100 styles grouped into 20 categories, one line each, with best use and engine — is [`styles/README.md`](styles/README.md). The header table of every style names its category.

## Step 1 — Pick

1. Read the brief: topic, platform, audience, length, whether a person appears on camera, whether a
   brand kit exists (`brand.json` from the brand-kit skill).
2. Open [`styles/README.md`](styles/README.md) and shortlist 2–3 styles whose *Best for* matches the content type.
   Start from the category that matches the account or the client, then check *Best for*:
   * creator / personal account → *Creators & personal brands* (`creator-reels-dark`, `talking-head-pop`, `podcast-clip-studio`, `vlog-film-diary`, `kinetic-captions`, …)
   * shop, product, ad → *E-commerce & products* (`product-hero-turntable`, `flash-sale`, `ugc-testimonial`, `before-after-split`, …)
   * listings, neighbourhoods, maps → *Real estate & maps* (`map-flyover-pins`, `floorplan-draw-on`, `neighborhood-guide`, …)
   * football and other sports → *Football & sports* (`matchday-graphics`, `tactics-board`, `player-stat-card`, …)
   * documentary, history, investigations → *Documentary & storytelling* (`archival-newsreel`, `true-crime-board`, `history-map-campaign`, …)
   * how it works, lessons, quizzes → *Education & explainers*; software, repos, AI → *Tech, SaaS & AI*; numbers → *Finance & money* or `data-story`
   * no category fits → *Art direction & design looks* (`swiss-poster`, `riso-print`, `neon-noir`, `collage-zine`, …) carry any topic
   Prefer styles whose engine the project can render (3D styles need `engines/hyperframes/three`).
3. Present the shortlist to the user in their language: name, one-line look, why it fits. If the
   user gave a reference image or video, describe what you see in it in terms of the nine sections
   and pick the closest style (or create one, step 3). Do not copy a specific film, show, artist or
   brand; take the craft (palette logic, timing, texture), never protected characters or logos.
4. Record the choice in the project brief: `style: <slug>` plus any overrides.

## Step 2 — Customise (most projects)

Never edit the library copy for one project. Override in the project instead:

1. Copy `styles/<slug>/STYLE.md` to `<project>/style/STYLE.md`.
2. Map brand tokens onto the palette roles (brand primary → accent, brand dark → background, …).
   Keep the *structure* of the palette: one accent stays one accent.
3. Swap fonts only for families with a free licence (SIL OFL, Apache-2.0). Check that the font
   covers the video's language (Turkish İ ş ğ, Polish ł, Vietnamese, CJK, Devanagari …): load both
   `latin` and `latin-ext` files (see `engines/hyperframes/base.css`).
4. Write every override at the top of the copy under `## Overrides` (what changed and why).
5. For HyperFrames, put the palette into CSS custom properties (`--mf-bg`, `--mf-accent`, …) in a
   `brand.css` loaded after `base.css`; for Remotion, into the `BrandTheme`.

## Step 3 — Create a new style

1. Copy `styles/_template/STYLE.md` to `styles/<new-slug>/STYLE.md` (or into the project).
2. Fill all nine sections with concrete numbers: hex values, px sizes at 1080×1920, seconds,
   easing names. "Smooth" or "modern" is not a spec; "0.35 s, back.out(1.6), 40 px rise" is.
3. Make one test scene (`engines/hyperframes/scripts/new-scene.sh style-test`) with a title, a
   card and a caption in the new style; render 3 stills and check them against section 9.
4. If the style was inspired by someone else's work, name the inspiration in a `## Credits` line
   and make sure nothing protected was copied (characters, logos, artwork, exact layouts).
5. Add a row to `styles/README.md`.

## House rules (apply to every style unless the user overrides them)

* No purple gradient backgrounds and no drawn grid / graph-paper backgrounds. Use a flat or softly
  lit field with grain, a blurred real photo, or a real scene.
* One accent colour per frame does the pointing; everything else supports it.
* Real logos and real screenshots when a real product is named (from the brand kit or the user);
  never invented UI for a real product.
* Static grain only; deterministic motion only (seeded randomness).
* Text stays inside the safe band (y 240–1680 at 1080×1920) and clear of the right-hand button rail.

## Checks before handing over a style choice

- [ ] The palette has a background, a text colour, one accent and at most two supports.
- [ ] Every font is free to use commercially and covers the video's language.
- [ ] Section 7 has timing numbers; section 9 names an engine and at least one template.
- [ ] A still from the test scene reads at 360 px wide (phone size).
