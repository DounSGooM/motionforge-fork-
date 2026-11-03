<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Agency Info Brand

> A brand-kit-driven explainer that people save and send: brand colours on a dark field, a small corner mark, clean captions, a "save / send" call to action and a logo end card.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Art direction & design looks | remotion or hyperframes | agency and company accounts, practical tips, checklists, myth vs fact | low–medium |

## 1. Essence
- In one sentence: useful, calm, unmistakably on-brand information in under 80 seconds.
- Three adjectives: clear, trustworthy, tidy.
- Signature move: the save + send CTA — a bookmark icon that fills in, a paper-plane that lifts — followed by the logo card with handle and site.

## 2. Use it for / avoid it for
- Use for: "3 mistakes…", "what X means", tool comparisons, checklists, seasonal tips.
- Avoid for: personal stories, hype or sales pitches (the format earns trust by being useful first).

## 3. Palette
Built from `brand.json` (brand-kit skill). Roles, with neutral fallbacks:
| Token | Fallback | Job |
|---|---|---|
| background | #0B0F14 | dark field, soft brand-tinted light from the top |
| surface | rgba(20,26,34,.92) | cards and windows |
| ink | #FFFFFF | headings, captions |
| accent | brand primary (#3BD6C6) | active caption word, highlights, check marks |
| accent-2 | brand secondary (#2F7BFF) | gradient end for the accent word and lines |
| muted | #9AA6B8 | labels, sublines |

Rules: the brand gradient (accent → accent-2) is for words and lines, never for the background. One brand, no other company colours except inside real logos/screenshots.

## 4. Type
- Display: the brand's heading font if it is free to use (else Inter or Sora, OFL), 700–800, 80–100 px, tracking −0.03 em.
- Body and captions: the brand's body font (else Inter) 600–700, 50 px.
- Labels: JetBrains Mono (OFL) 500, 30 px, uppercase, tracking 0.18 em, in the accent.
- Formal address follows the brand's voice (e.g. "you" vs. formal "you" in languages that have both).

## 5. Surfaces and texture
- Background: dark field with a faint brand-tinted top light and a second faint tint in a lower corner, static grain, vignette. Optional light variant on the brand's paper colour.
- Materials: glass cards with 2 px borders, real logos on white tiles, real screenshots in browser/phone frames.
- Watermark: the brand mark at 64 px in the top-right corner, 40 % opacity, for the whole video.
- Never: purple gradients (unless they are literally the brand), grid backgrounds, clip-art icons.

## 6. Framing and layout
- Eyebrow label y ≈ 160–300, headline y ≈ 230–520, main visual y ≈ 560–1400, captions bottom edge ≤ 1500.
- Corner mark top-right (70 px from the top, 56 px from the right), so it never collides with titles.
- One idea per screen; 3–5 items per list.

## 7. Motion
- Entrances: 0.3–0.4 s rise + fade + short blur, spring with mild overshoot.
- Lists: one item per spoken item, 0.4 s slide-in, check mark draws 0.35 s later.
- Counters: numbers count up over 1–1.5 s with an on-screen source line.
- Transitions: soft cross-dissolve (0.25 s) or a card sliding off; no flashy whips.
- Outro: CTA at the last sentence (save icon fills at +0.6 s, send icon lifts at +1.8 s), logo card when the voice ends, fade out over 0.3 s.

## 8. Sound
- Bed: neutral corporate-light or ambient at −30 to −26 LUFS, or none.
- Effects: soft ticks for checks, a gentle "ding" on the CTA. Few and quiet.
- Mix: −14 LUFS integrated; the voice is always clearly on top (`tools/loudness.sh compare`).

## 9. Build recipe and checks
- Engine and templates: `engines/remotion/kit/brand-kit.tsx` (`BrandProvider`, `Watermark`, `Captions`, `Outro`) or HyperFrames with a `brand.css`; templates `checklist-reveal`, `stat-counter`, `browser-window`, `word-captions`, `cover-still`.
- Steps: 1) build `brand.json` and the theme; 2) script with sources for every claim; 3) scenes per section; 4) captions + watermark + outro; 5) review, loudness, cover.
- Style checks: watermark visible in every frame and never under a title; every number has a source on screen or in the caption; the CTA names the action ("save", "send to a friend").
- Common failures: brand colours used for large backgrounds (too loud), off-brand fonts, the outro handle misspelled.

## Credits
Original motionforge style, generalised from an agency brand-video workflow; uses a fictional example brand.
