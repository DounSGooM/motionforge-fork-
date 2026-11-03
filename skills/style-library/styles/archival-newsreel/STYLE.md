<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Archival Newsreel

> Black-and-white film stock, gate weave and dust, bold slab-serif title cards, and an announcer's cadence — history told like a cinema bulletin.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Documentary & storytelling | canvas (film effects) + hyperframes (title cards) | "how it started", anniversaries, history of a technology or company | medium |

## 1. Essence
- In one sentence: the past reported as breaking news.
- Three adjectives: authoritative, grainy, rhythmic.
- Signature move: a full-frame title card that thumps in, holds, and cuts to footage with a flicker.

## 2. Use it for / avoid it for
- Use for: timelines, "the first time…", origin stories, museum-style explainers using public-domain archive material.
- Avoid for: modern product UI (cut out of the style for real screenshots), upbeat lifestyle content.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| black | #0B0B0A | crushed shadows, card backgrounds |
| silver | #D8D4C8 | highlights, title text (warm, never pure white) |
| mid | #7D7A72 | mid-tones of the footage |
| accent | #B8352B | one stamp of red for dates or "FIRST" stamps (optional) |

Rules: everything is monochrome except the single optional red stamp.

## 4. Type
- Title cards: Alfa Slab One or Roboto Slab (OFL) 120–180 px, uppercase, tracking 0.02 em, centred.
- Sub-cards and dates: Oswald (OFL) 500, 56 px, uppercase, tracking 0.1 em.
- Captions: Oswald 500 48 px in silver on a black bar.
- Language coverage: check latin-ext glyphs on slab fonts; fall back to Roboto Slab.

## 5. Surfaces and texture
- Footage: public-domain or licensed archive clips and photos only; desaturate, lift blacks slightly, add contrast curve.
- Film effects (deterministic, seeded per frame): grain 6–10 %, 1–2 px gate weave, dust specks (5–20 per frame), a vertical scratch every few seconds, brightness flicker ±3 %.
- Cards: black with a thin double border inset 60 px, slight vignette.
- Never: modern flat icons, gradients, grid backgrounds.

## 6. Framing and layout
- 9:16: footage letterboxed in a 4:3 window (1080 × 810) centred, title band above, caption band below; or full-bleed cropped photos with slow pans.
- Title cards: text block in the middle third, two lines max.
- 16:9: full-frame 4:3 pillarboxed with black.

## 7. Motion
- Title card in: hard cut with a 2-frame white flash and a 1.04 → 1 scale settle (0.2 s).
- Photos: slow pan/zoom (Ken Burns) 3–6 % over 3–5 s, linear-ish (sine.inOut).
- Rhythm: card (1.5–2 s) → footage (3–5 s) → card; cuts on the announcer's phrase ends.
- Frame feel: stepped at 18–24 fps for footage (hold frames), 30 fps for cards.
- Transitions: iris-in/out circle wipe (0.4 s) between chapters only.

## 8. Sound
- Bed: brassy march or public-domain orchestral recording, band-limited (300–3500 Hz) to sound old, at −26 LUFS.
- Effects: projector rattle loop at −34 LUFS, a thump on each title card.
- Voice: confident, slightly fast; optional band-pass "radio" EQ on the hook line only.

## 9. Build recipe and checks
- Engine and templates: canvas page for the film treatment (`engines/canvas/lib.js` `rng(frame)` for dust and weave); HyperFrames `kinetic-title` restyled for cards.
- Steps: 1) collect public-domain sources with their licences; 2) build cards; 3) treat footage on canvas; 4) assemble; 5) review.
- Style checks: dust and flicker are seeded (identical on re-render); no colour leaks except the red stamp; every archive item has a source line in the description.
- Common failures: grain so heavy that captions blur (keep captions on a clean bar), anachronistic modern fonts.

## Credits
Original motionforge style drawing on the general newsreel tradition; use only public-domain or licensed archive material.
