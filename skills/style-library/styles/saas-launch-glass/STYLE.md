<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# SaaS Launch Glass

> Frosted glass panes float over a blurred capture of the real product; feature chips snap onto the glass one per beat, and a warm rose accent marks only what is new.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Tech, SaaS & AI | hyperframes + three.js (device shots) | SaaS launches, feature drops, changelog videos, pricing updates | medium |

## 1. Essence
- In one sentence: the real product seen through layers of glass, each new feature lifted forward onto its own pane.
- Three adjectives: layered, crisp, warm.
- Signature move: a round glass lens slides over the blurred product screen, the area inside it turns sharp and magnified, and a rose chip names the feature.

## 2. Use it for / avoid it for
- Use for: launch announcements, "three things new in v2", onboarding teasers, plan and pricing changes, integration news.
- Avoid for: long tutorials (use `screencast-zoom`) and anything without a real capture; glass over nothing reads as a template. Panes hold real captures from the user or the brand kit; integration logos only from the brand kit. Never redraw a real product's UI.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #0C1517 | deep teal-black field with one light pool (#1C3236, 900 px radius, top-left) |
| glass | rgba(232,246,248,.10) | pane fill; backdrop blur 28 px, saturate 140 % |
| edge | rgba(232,246,248,.28) | 1.5 px pane border and 1 px top highlight |
| ink | #F2F7F8 | headlines, chip text |
| muted | #8FA6AA | sublines, labels, old version numbers |
| accent | #FF6FA8 | rose: the "new" chip, lens ring, one underline per screen |

Rules: rose stays under 4 % of the frame and only marks new things. The product capture keeps its own colours. Light variant: background #E6EEEF, glass rgba(255,255,255,.55), ink #0F1C1F; the accent does not change.

## 4. Type
- Display: Plus Jakarta Sans (OFL) 800, 92–120 px, sentence case, tracking −0.03 em, max 2 lines.
- Body / captions: Plus Jakarta Sans 600, 46–54 px, 3–5 words per chunk.
- Labels and chips: DM Mono (OFL) 500, 28 px, uppercase, tracking 0.12 em ("NEW", "BETA", "V2.4").
- Language coverage: both ship latin-ext on Fontsource (`@fontsource/plus-jakarta-sans`, `@fontsource/dm-mono`); fallback system-ui.

## 5. Surfaces and texture
- Background: the field above, plus the real product capture at 120 % scale, blur 36 px, opacity 0.45, drifting slowly.
- Materials: frosted panes (radius 40 px, edge + top highlight, shadow 0 40px 80px rgba(0,0,0,.45)); chips are solid pills, radius 999 px, 64 px tall.
- Texture: static grain 0.05 over the whole frame; no noise inside panes.
- Never: purple or rainbow gradient fields, drawn grid backdrops, invented dashboards, more than 3 stacked panes (muddy blur, slow renders).

## 6. Framing and layout
- 9:16 zones: headline y 260–480; hero pane 920 × 760 at y 520–1280 (centre x 540); chip row y 1300–1380; captions y 1400–1500.
- Other formats: 1:1 pane 860 px wide centred under the headline; 16:9 pane on the right 60 %, headline and chips stacked on the left.
- Density: one hero pane, up to two satellite panes (380 px wide) and three chips at once; nothing at x > 940 between y 900–1600.

## 7. Motion
- Entrances: panes rise 90 px + scale 0.94 → 1 + blur 12 → 0 px, 0.55 s, power3.out; chips pop scale 0.6 → 1, 0.3 s, back.out(1.7), 0.08 s stagger.
- Exits: panes drift 40 px up and fade, 0.3 s, power2.in; chips shrink to a 12 px dot, then fade.
- Holds and rhythm: one feature per 2.5–3.5 s beat; a chip or underline every 1–1.5 s inside the beat.
- Transitions: pane swap — old pane exits left 1080 px while the new one enters from the right, 0.1 s overlap, 0.6 s power3.inOut; backdrop capture crossfades 0.4 s.
- Camera: panes rotateY 6° → 0 across the beat while the backdrop counter-moves 30 px; 4 % push-in on the lens.
- Frame rate feel: smooth 30 fps; 60 fps for 16:9 product pages.
- Edit grammar: product-ad pacing — average shot 1.4–2 s in the hook, 2.5–3.5 s in the feature run. Hard cuts on the music downbeat; feature names land on the stressed word. Match-cut the cursor position from one screen to the same spot on the next. A 0.15 s speed ramp (3 % overshoot) on each pane swap. Chips act as lower-thirds: in 0.2 s after the feature is named, hold ≥ 1.5 s. Only the end card uses a J-cut: the voice leads the logo by 0.3 s.

## 8. Sound
- Bed: clean electronic or soft house, 110–124 BPM, −26 LUFS under the voice, sidechain duck 4 dB.
- Effects: short glassy tick per chip (−20 dB re voice), airy swish on pane swaps, one low thump on the logo.
- Mix: voice first; final −14 LUFS integrated, true peak ≤ −1 dBTP (`tools/loudness.sh`).

## 9. Build recipe and checks
- Engine and templates: hyperframes; panes from `templates/browser-window` (frame chrome off, glass class on), `phone-ui` for mobile apps, `kinetic-title` for headlines, `cover-still`; `templates/product-turntable-3d` with a CC0 laptop/phone GLB for device shots.
- Signature scenes:
  - Lens reveal: blurred capture fills the frame; a 520 px glass lens slides in 0.6 s power3.out, the capture inside renders sharp at 1.6×, a rose ring (3 px) draws around it in 0.4 s.
  - Chip drop: three feature chips fall from y −80 to their row, 0.08 s stagger, back.out(1.7); the new one turns rose 0.3 s later.
  - Pane fan: three panes spread in depth (translateZ 0 / −120 / −240 px, rotateY 8°), then collapse to the hero pane, 0.7 s power3.inOut.
  - Version stamp: "v2.4" types in DM Mono at 18 chars/s inside a chip; the old number strikes through in muted.
  - Device orbit: `product-turntable-3d` with the real capture mapped to the screen, 25° orbit over 3 s, one callout chip.
- Steps: 1) collect real captures at 2× from the user; 2) one line per feature, max 6 words; 3) build hero pane and lens; 4) time chips to words.json; 5) render, contact sheet, `tools/textcheck.mjs`.
- Style checks: every pane holds a real capture; text over glass reaches 4.5:1 (raise glass opacity to .18 if not); rose marks only new things.
- Common failures: backdrop blur so heavy the product is unrecognisable (≤ 40 px); slow renders from stacked backdrop-filters (pre-blur the backdrop to an image); chips drifting into the right rail.

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of frosted-glass interface design and software launch films.
