---
name: brand-kit
description: Create, load or check a brand.json (color roles, fonts with licenses, logo files, watermark, outro, voice and tone, do/don't) for videos made for a company, product or creator. Use when a video is for a brand, when the user shares a website, repository, logo or screenshots to match, or when brand colors/fonts/logos need to be applied consistently across videos.
license: MIT
---

# Brand kit

A brand kit is decided once and reused in every video. It lives in a `brand/` folder next to the video projects (one subfolder per brand when there are several) and is copied into each `videos/<slug>/brand.json`.

```
brand/<brand-id>/
  brand.json
  BRAND.md          # short human summary: tone, sample lines, what to avoid
  logo/             # logo files exactly as supplied (svg preferred)
  fonts/            # only fonts whose license allows shipping them
```

When a brand has its own rules, they **override** the default style rules for color, ground, fonts and logo. Rules about honesty, hooks, banned phrases, real logos/screens and consent for paid steps still apply.

## 1. Find out what exists
Ask, in this order, and stop at the first that gives enough:
1. An existing `brand/<id>/brand.json` from an earlier video → reuse it; re-check only if the user says the brand changed.
2. A brand guide (PDF, Figma, notes) → read it and fill brand.json by hand.
3. The brand's own website or front-end code → run the extractor (step 2).
4. Only screenshots or a logo → sample colors from them (step 2, manual path).
5. Nothing → ask for colors, fonts and logo. **Never invent a brand identity for a real company.**

## 2. Extract a draft
```bash
python3 skills/brand-kit/scripts/brand.py extract --url https://brand.example -o brand/<id>/brand.json
python3 skills/brand-kit/scripts/brand.py extract --repo ../their-app/web -o brand/<id>/brand.json   # read only, nothing executed
python3 skills/brand-kit/scripts/brand.py extract --css theme.css --html index.html -o brand/<id>/brand.json
```
How the draft is built (standard-library Python, no installs):
- Reads CSS custom properties, `:root`/`body` colors, `@font-face`, `font-family` declarations, Google Fonts links, `@fontsource/*` dependencies, `theme-color` and `og:*` meta, and logo-like files or `<img>` tags in the header.
- Assigns color roles from variable names (`--background`, `--foreground`, `--primary`, `--border`, …), resolving `var()` chains; falls back to `body`/`:root` declarations; the accent fallback is the most used saturated color and is marked as a guess.
- Records the **source** of every value. Anything not found is `null` and listed in `missing`.
- Limits: CSS injected by JavaScript at runtime is not seen; Tailwind default palette classes are not resolved; a site that blocks scripts returns nothing. Then use screenshots.

**Screenshots only (manual path):** open the image, pick background, text and the one strong brand color by eye, confirm with a color picker or `ffmpeg -i shot.png -vf "scale=1:1" -f rawvideo -pix_fmt rgb24 - | xxd` for an average, and mark each value `"source": "sampled from <file>"`.

## 3. Complete it with the user
Show the draft as a short table (role, hex, where it came from) and ask the user to:
- confirm or correct each color role and say what it **means** (`use`);
- pick the logo files (one for dark grounds, one for light grounds, a square icon);
- name the font license (OFL/Apache/commercial). Commercial fonts are used only from the user's own licensed files and never committed to a public repo;
- set the voice: register (informal/formal address), tone words, typical call to action, words to prefer and avoid;
- decide the watermark and the outro;
- list do/don't rules.

## 4. brand.json schema
| Field | Required | Content |
|---|---|---|
| `name` | yes | brand name as written |
| `colors.<role>` | `bg`, `ink`, `accent` | `{hex, name, use, source?}`; other roles: `surface`, `accent_2`, `muted`, `line`, `bg_light`, `ink_on_light` |
| `gradients[]` | no | `{name, stops[], angle, use}`; say where it may appear |
| `ground` | no | how backgrounds look (`dark`, `light`, `never[]`) |
| `fonts.display/body/mono` | display + body | `{family, weights[], license, subsets[], files[], fallback, usage}`; include `latin-ext` when any Latin language beyond English is used |
| `logo` | yes for brands | `primary_on_dark`, `primary_on_light`, `icon`, `min_width_px`, `clearspace` |
| `watermark` | no | `{file, corner: top-left|top-right|bottom-left, size_px, margin_px, opacity, from_s, hide_during[]}` |
| `outro` | no | `{duration_s, layout, handle, site, cta{lang: text}, icons[]}` |
| `captions` | no | `{font, weight, size_px, active_word, zone_y[], stroke}` |
| `voice` | yes | `{register, tone[], audience, goal, cta, words_prefer[], words_avoid[]}` |
| `do[]`, `dont[]` | yes | short, testable rules |

See `examples/northwind.brand.json` (a fictional agency) for a complete kit with a corner watermark and an outro with handle and site.

## 5. Check it
```bash
python3 skills/brand-kit/scripts/brand.py check brand/<id>/brand.json
```
FAIL: missing name/bg/ink/accent, invalid hex, a font without license, a logo path that does not exist, an invalid watermark corner or opacity. WARN: contrast below 4.5:1 (ink/bg) or 3:1 (accent/bg), no `use` for a color, no latin-ext subset, a bottom-right watermark (sits under the platform buttons), an outro under 1.5 s, empty `dont`.
Low contrast is reported, never "fixed" by changing the brand color: use the accent on larger elements or on another surface instead.

## 6. Apply it in scenes
- HyperFrames: generate CSS variables from `brand.json` (`--bg`, `--ink`, `--accent`, …) and `@font-face` rules for each file and subset; scenes use only the variables, never raw hex.
- Remotion: import `brand.json` and read colors and fonts from it in one theme module.
- Watermark: one fixed layer for the whole video at the given corner, size and opacity; hidden in the windows listed in `hide_during`.
- Outro: logo for the ground in use, handle and site in the body font, the CTA line in the video language, held at least 1.5 s; the last spoken sentence (the CTA) lands on it.
- Captions: active word in the brand's `captions.active_word` color.
- Words: run `voice.words_avoid` through the banned-phrase scan in `script-and-hooks` together with the language list.
