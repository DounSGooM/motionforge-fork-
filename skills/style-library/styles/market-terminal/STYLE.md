<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Market Terminal

> A dense, sober trading-desk screen: monospaced prices, a scrolling ticker tape, candlesticks that build bar by bar, cells that flash green or red, and an amber crosshair on the one move that matters.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Finance & money | hyperframes + three.js (globe scene only) | market recaps, earnings, macro news, stock and index explainers | medium |

## 1. Essence
- In one sentence: the calm authority of a professional market screen, read for you one number at a time.
- Three adjectives: dense, exact, composed.
- Signature move: a watchlist fills row by row, each change cell flashes once, then an amber crosshair snaps onto one candle and its price tag appears.

## 2. Use it for / avoid it for
- Use for: daily and weekly market wraps, earnings results, index moves, rate decisions, sector rotation.
- Avoid for: personal finance for beginners (use `budget-infographic`), crypto hype (use `crypto-neon-chart`). Every price comes from a named data source with a timestamp and "delayed" label where it applies; nothing is invented or rounded into a different story. Company logos only from the user's licensed assets; otherwise ticker symbols in type. Add the user's disclaimer line when the content could read as advice.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #0A0C0F | near-black field |
| panel | #12161B | panels, 1 px border #1F252D |
| ink | #E3E7EC | prices, headlines |
| muted | #6B7480 | labels, timestamps, source line |
| up | #26C281 | price up (always with ▲) |
| down | #F0524A | price down (always with ▼) |
| accent | #FF9F1C | amber selection: crosshair, active ticker, brackets |

Rules: green and red only state direction; amber never means up or down. Flashes use up/down at 35 % opacity behind the cell, not on the text.

## 4. Type
- Display: IBM Plex Sans Condensed (OFL) 700, 84–104 px, sentence case, tracking −0.01 em.
- Numbers: IBM Plex Mono (OFL) 500/600, tabular, 34–44 px in tables, 120–160 px for the hero number.
- Labels: IBM Plex Mono 500, 24–26 px, uppercase, tracking 0.08 em; source line 24 px muted.
- Language coverage: both have latin-ext on Fontsource; fallback ui-monospace. Use the locale's decimal separator consistently.

## 5. Surfaces and texture
- Background: flat, no grain on numbers; faint 3 % vignette only.
- Materials: rectangular panels, radius 6 px, 1 px borders; chart axes and price scale are content and allowed.
- Lines: 2 px wicks, candle bodies 14–18 px wide with 6 px gaps; dashed amber guide lines 2 px.
- Never: drawn grid backdrops behind the layout, 3D chart bevels, glowing neon, money-rain stock imagery.

## 6. Framing and layout
- 9:16 zones: ticker tape y 240–300; headline y 330–470; chart panel y 500–1140; data table or caption y 1170–1480; source + timestamp y 1500–1540.
- Other formats: 16:9 chart left 62 %, watchlist right; 1:1 drops the table and keeps chart + hero number.
- Density: up to 4 panels; text never below 24 px.

## 7. Motion
- Entrances: panels cut in hard (no fade); rows fill top-down 0.05 s stagger; candles build one per 0.06 s, wick first (0.08 s), body grows from open to close 0.12 s power2.out.
- Numbers and tape: digit roll 0.3 s power2.out; cell flash 0.25 s on, 0.4 s fade; ticker runs at a constant 120 px/s, position computed from time (deterministic).
- Exits: hard cut out, no fades; the crosshair and amber bracket clear 0.15 s before the cut.
- Holds and rhythm: one number per 2–3 s; every key figure holds ≥ 1.5 s on screen.
- Transitions: hard cuts only; the ticker tape continues across cuts as the continuity element.
- Camera: punch-in 1.5× on a candle range, 0.4 s power3.out, amber bracket on the range.
- Frame rate feel: crisp 30 fps, no motion blur.
- Edit grammar: financial news package — average shot 2–3 s, hard cuts between panels, cuts land on the number in the voice ("up four percent" → cut on "four"). Lower-third quote bar (symbol · price · change) in 0.25 s, holds 3 s. No whips, no speed ramps; credibility comes from stillness. The tape bridges cuts like an L-cut for the eye.

## 8. Sound
- Bed: restrained pulse or none, 90–100 BPM, −30 LUFS under the voice.
- Effects: dry tick on each flash (very low, −26 dB re voice), soft bell only for the open/close if the story is about the session.
- Mix: voice first; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: hyperframes; chart and watchlist are new scenes; `stat-counter` for the hero move, `kinetic-title`, `browser-window` for a real filing or press release, `templates/globe-arcs-3d` for the session handoff.
- Signature scenes:
  - Opening board: 6-row watchlist fills top-down, each change cell flashes once, the active row gets an amber edge.
  - Candle build: 40 candles over 2.4 s, crosshair snaps to the key candle 0.2 s power3.out, amber price tag slides out.
  - Gap marker: two dashed amber lines bracket the gap, label "+3.8 % gap" types at 24 chars/s.
  - Earnings strip: three cells (EPS, revenue, guidance), each actual vs estimate on a digit roll, ▲/▼ beat or miss.
  - Session handoff: `globe-arcs-3d` turns from Asia to Europe to the Americas while the index of each session ticks in a chip.
- Steps: 1) export data (CSV) with source and timestamp; 2) write the takeaway sentence; 3) build chart from the CSV, not by hand; 4) time flashes to words.json; 5) claim check against the source.
- Style checks: every figure matches the CSV; source and time visible on every data shot; arrows present wherever colour shows direction.
- Common failures: too many tickers at phone size, mixed currencies without labels, a y-axis that exaggerates a small move (label the scale).

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of trading-desk terminals and broadcast business-news graphics.
