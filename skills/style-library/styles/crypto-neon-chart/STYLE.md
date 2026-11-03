<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Crypto Neon Chart

> One glowing aqua price line racing across a black field, glossy coin and wallet cards that flip into view, and transfers traced as pulses between address chips.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Finance & money | hyperframes + three.js (coin and wallet renders) | crypto and token explainers, on-chain stories, wallet how-tos, volatility recaps | medium |

## 1. Essence
- In one sentence: a single bright line tells the story while everything else stays in the dark.
- Three adjectives: electric, kinetic, nocturnal.
- Signature move: the price line draws with a glowing head, the camera follows the head, slows at the peak, and a percentage label pops at the turn.

## 2. Use it for / avoid it for
- Use for: "what happened to X this week", how a transfer or swap works, wallet safety, drawdown and volatility explainers.
- Avoid for: anything that reads as a price prediction or a promise of returns; slow, reflective finance content (use `market-terminal` or `data-story`). Prices carry a source and timestamp on screen. Token and exchange logos are trademarks: use them only from the user's licensed assets, otherwise generic coins with the ticker letters. Never show a seed phrase or private key, not even a fake one; real wallet addresses only if public and approved by the user.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #07090C | black field with a faint 900 px bloom (#0F1A1A) behind the chart |
| ink | #EEF3F2 | numbers, headlines |
| muted | #6E7C80 | axis labels, timestamps, inactive cards |
| accent | #3CFFC8 | the one neon line, its glow (blur 18 px, 60 %), the active address chip |
| coin | #E8B84A | coin edges and token card trim |
| drawdown | #FF5D73 | losses and drawdown fills only (18 % opacity) |

Rules: only one line glows per frame; secondary series are muted 2 px lines with no glow. Coin gold never appears on text.

## 4. Type
- Display: Unbounded (OFL) 700, 80–110 px, sentence case, tracking −0.01 em; wide letters, so max 12 characters per line.
- Numbers: Azeret Mono (OFL) 600, tabular, 40–56 px in cards, 140–180 px hero figure.
- Body / captions: Azeret Mono 500, 40–46 px, 3–4 words per chunk.
- Language coverage: both have latin-ext on Fontsource; fallback ui-monospace for numbers, system-ui for display.

## 5. Surfaces and texture
- Background: flat black with the bloom; static grain 0.06; no stars, no particles.
- Materials: token cards 560 × 760 px, radius 48 px, dark glass (#11161A at 92 %) with a 2 px coin-gold edge; coins as 3D discs with brushed metal (CC0 or user models).
- Lines: price line 6 px with round caps; axis labels only, no chart gridlines.
- Never: drawn grid backdrops, purple gradients, rockets and moons, fake exchange UIs.

## 6. Framing and layout
- 9:16 zones: headline y 260–440; chart y 480–1180 (line uses x 80–940); cards or caption y 1200–1490; source + time y 1520.
- Other formats: 16:9 chart full width, cards on the right third; 1:1 chart only, cards as a follow-up shot.
- Density: one glowing line + max 2 cards on screen.

## 7. Motion
- Entrances: line draws 1.6 s with a glowing 24 px head, power1.in then slowing (power3.out) into the key point; cards rise 120 px + fade 0.45 s power3.out and flip rotateY 0 → 180° in 0.6 s power2.inOut; labels pop scale 0.7 → 1, 0.3 s, back.out(1.7).
- Exits: line fades to muted 0.3 s; cards slide down 200 px, 0.3 s power2.in.
- Holds and rhythm: something moves every 1–1.5 s; one idea per 3 s.
- Transitions: match cut from the line's end-point to the dot that opens the next scene; whip pan 0.18 s between cards.
- Camera: follows the line head (x pan), 1.15× zoom at the peak.
- Frame rate feel: smooth 30 fps; slight motion blur on whips only.
- Edit grammar: high-energy explainer — shots 1–1.5 s in the hook, 2–3 s in the explanation. Cuts land on the beat (128–140 BPM) and on the number word. Speed ramp on every line draw (fast run, slow arrival). Real captures (wallet screen, block explorer) as 1.5 s inserts inside a phone or browser frame, never full-screen. Lower-third price chip in 0.2 s, holds 2 s.

## 8. Sound
- Bed: dark electronic, 128–140 BPM, −26 LUFS under the voice.
- Effects: rising synth sweep under line draws, metallic coin ring on card flips, short zap when a pulse lands.
- Mix: voice first; ducking 5 dB; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: hyperframes; chart is a new scene; `stat-counter` for hero figures, `phone-ui` for real wallet captures, `browser-window` for block explorers, `templates/product-turntable-3d` for a CC0 coin or hardware-wallet model.
- Signature scenes:
  - Neon run: line draws over 1.6 s, camera follows, peak label "+38 %" pops; source line fades in last.
  - Coin flip: token card flips to show three facts (supply, launch year, chain) from the user's sources.
  - Transfer trace: two address chips (truncated `0x12…9f3a`), dashed path, a pulse travels 0.8 s, a fee chip appears; confirmations count only if real.
  - Drawdown shade: area from peak to trough fills drawdown red at 18 %, bracket and "−42 %" label.
  - Coin orbit: `product-turntable-3d` coin on a dark pedestal, 30° orbit over 3 s, rim light in accent.
- Steps: 1) get price CSV with source and time; 2) write the takeaway; 3) build line from data; 4) time ramps to words.json; 5) claim and disclaimer check.
- Style checks: one glow per frame; every price has source and time; no keys or seed words anywhere.
- Common failures: glow bleeding over labels (clip glow under text), wide display type overflowing (max 12 chars), log/linear scale confusion (label it).

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of neon night-time signage and trading-chart interfaces.
