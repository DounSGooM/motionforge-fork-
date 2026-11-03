<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Creator Reels Dark

> Charcoal stage, one lime accent, a bold sans headline with a single italic-serif word, and the presenter's head breaking out of a rounded card at the bottom.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Creators & personal brands | remotion (edit) + hyperframes (scenes) | talking-head explainers about tools, AI, software, creator tips | medium |

## 1. Essence
- In one sentence: a confident, fast, personal explainer where the person and the thing they talk about share the screen.
- Three adjectives: sharp, warm, quick.
- Signature move: the split frame — motion graphics on top, the presenter in a rounded card below, the head popping out over the card's top edge.

## 2. Use it for / avoid it for
- Use for: tool news, how-tos, "I tried X", opinion with proof, creator education.
- Avoid for: brand accounts without a face (use `agency-info-brand`), solemn topics (the lime accent is too playful).

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #0E0F11 | charcoal field, softly lit from the top (`#2A2C30` light spot) |
| paper | #E9EBEE | the light variant for tool tours and bright UIs |
| ink | #FFFFFF | headlines and captions on dark |
| ink-dark | #16171A | headlines on the light variant |
| accent | #C8F53A | the active caption word, the italic accent word, card glow, progress bars |
| muted | #9EA3AD | sublines, labels |

Rules: lime covers under 5 % of the frame. Never lime text on the light background (contrast); use ink-dark with a lime underline there. Brand colours of the tools shown stay inside their real logos and screenshots.

## 4. Type
- Display: Inter (OFL) 800, 96–130 px, sentence case, tracking −0.035 em.
- Accent word: Instrument Serif Italic (OFL) 400 at the same size, in lime.
- Captions: Inter 700–800, 50–64 px, 2–4 words per chunk.
- Labels: JetBrains Mono (OFL) 500, 28–30 px, uppercase, tracking 0.18 em.
- Language coverage: load latin + latin-ext for every face.

## 5. Surfaces and texture
- Background: charcoal with a soft top light, static film grain (opacity ~0.08), gentle vignette. Light variant: off-white paper with a centre light and grain.
- Materials: real browser windows, real app screenshots, real logos on white tiles, terminal windows with traffic lights.
- Cards: radius 34–48 px, 2 px border `#2C2E33`, optional thin lime glow on the hero card.
- Never: grid backgrounds, purple gradients, fake UI for a real product, stock "AI brain" imagery.

## 6. Framing and layout
- Split frame (most of the video): graphics zone y 160–1000; one-word headline just above the card (y ≈ 1010–1130); presenter card y 1150–1920 with 48 px top corners; the head extends 80–160 px above the card edge.
- Full-graphic beats (no person): headline y 300–520, hero element centred, captions bottom edge ≤ 1500.
- Face beats: the presenter appears only in the first ~5 s and the last ~5 s; the middle is graphics.
- 16:9: presenter card moves to the right third, graphics on the left two thirds.

## 7. Motion
- Entrances: fade + 40 px rise + blur 14 → 0 px, spring (stiffness ~190, damping ~15), 0.3–0.45 s.
- Logos: fly in from off-screen with directional stretch and blur, in clusters, 60–90 ms apart.
- Headline word: changes on each stressed word of the voice, hard cut with a 0.12 s scale pop.
- Rhythm: something new every 1–3 s; layout switches (split → full graphic → face) every 6–12 s.
- Transitions: hard cuts on the beat of the voice; occasional quick whip (0.2 s) between topics.
- Camera: slow push-in (2–4 %) on screenshots while they are discussed, zoom + lime box on the detail that matters.

## 8. Sound
- Bed: light electronic / lo-fi at −28 to −24 LUFS under the voice, or none.
- Effects: whoosh on logo clusters, soft pop on headline words, tick on check marks, at volume ≈ 0.15 of the voice.
- Mix: voice first; final mix −14 LUFS integrated, true peak ≤ −1 dBTP (`tools/loudness.sh`).

## 9. Build recipe and checks
- Engine and templates: Remotion edit with `engines/remotion/kit` (`Backdrop`, `Captions`, `enter`, `flyIn`); HyperFrames scenes from `templates/browser-window`, `phone-ui`, `stat-counter`, `kinetic-title`.
- Steps: 1) words.json from the voice; 2) cut-out frames with `tools/cutout.py --auto-crop` for the pop-out; 3) render HyperFrames scenes; 4) assemble in Remotion with captions; 5) review + loudness.
- Style checks: the head overlaps the card edge cleanly (no halo); the headline word matches the spoken word; lime appears in every frame but never dominates.
- Common failures: hands visible at the bottom of the card (crop tighter), captions hidden under the app UI (keep ≤ 1500), too many logos at once (max 5 per cluster).

## Credits
Original motionforge style, generalised from a creator project's style guide.
