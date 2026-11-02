<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Screencast Zoom

> Real screens, framed and directed: a browser or app window floats on a soft backdrop, the camera glides and zooms to each click, and highlights point at exactly what matters.

| Engine | Best for | Effort |
|---|---|---|
| hyperframes (or remotion) | product demos, tutorials, repo/site walkthroughs, "how I did X" | low–medium |

## 1. Essence
- In one sentence: a screen recording edited like a film.
- Three adjectives: practical, guided, polished.
- Signature move: a smooth zoom from the full window to a single button, a soft spotlight around it, and a cursor click ripple.

## 2. Use it for / avoid it for
- Use for: SaaS demos, GitHub repos (README, stars, files), settings walkthroughs, social posts shown in context.
- Avoid for: abstract ideas without a screen. Never mock up a real product's UI — use real captures.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| backdrop | #0E0F11 or #E9EBEE | the standard dark/light field behind the window |
| frame | #FFFFFF / #1E1F22 | browser/app chrome (light/dark) |
| accent | #C8F53A (or brand) | highlight boxes, click ripples, progress |
| dim | rgba(0,0,0,.45) | spotlight darkening outside the focus |

Rules: the captured UI keeps its real colours; only overlays use the accent.

## 4. Type
- Titles: Inter 800 76–96 px above the window.
- Callouts: Inter 800 40 px on accent pills.
- Captions: Inter 700 50 px.

## 5. Surfaces and texture
- Window: rounded 24–28 px, 2 px border, soft deep shadow; traffic lights + URL bar for browsers.
- Captures: high-resolution screenshots or screen recordings (2× scale), current and accurate.
- Never: blurry upscaled captures, invented numbers in a real UI, grid backgrounds.

## 6. Framing and layout
- Window 960 px wide, y 420–1400; title above; callout under the window; captions ≤ 1500.
- For tall pages, scroll inside the window rather than shrinking it.

## 7. Motion
- Window in: rise 160 px + slight 3D tilt (12° → 0) 0.7 s, power3.out.
- Scroll: 1–1.5 s, power2.inOut; never faster than the eye can follow text.
- Zoom: 1.4–2.2× to the target, 0.8–1.0 s, power3.inOut; hold ≥ 1.5 s.
- Highlight: spotlight dim 0.3 s, box pops with back.out(2), click ripple 0.3 s.
- Cursor (if shown): moves on smooth curves (springTo), arrives 0.2 s before the click.

## 8. Sound
- Bed: light, positive electronic at −28 LUFS or none.
- Effects: soft mouse clicks, whoosh on zooms, keyboard taps during typing.

## 9. Build recipe and checks
- Engine and templates: `templates/browser-window`, `templates/phone-ui`; Remotion `Browser`/`Phone` from the kit for longer edits.
- Steps: 1) capture real screens (Playwright screenshots work well); 2) mark highlight rectangles in screenshot pixels; 3) script zooms on the voice; 4) render; 5) textcheck + review.
- Style checks: every zoom target is readable at phone size; captures match what is said; no private data visible in captures (blur emails, tokens).
- Common failures: zooming too often (motion sickness), stale screenshots, personal data in the browser tabs or bookmarks bar.

## Credits
Original motionforge style.
