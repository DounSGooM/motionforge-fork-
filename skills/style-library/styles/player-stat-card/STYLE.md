<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Player Stat Card

> A tall collectible card with a cut-out player breaking its top edge, a silver foil border that catches one moving light, a mint radar that unfolds and ratings that count up digit by digit.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Football & sports | hyperframes + three.js (card tilt) or hyperframes (flat) | player profiles, scouting summaries, season reviews, head-to-heads, academy player cards | medium |

## 1. Essence
- In one sentence: one player's strengths in a single object you would want to keep.
- Three adjectives: collectible, data-backed, crisp.
- Signature move: the card rises face-down, flips with a ±12° tilt, a specular band crosses the foil border once, and a hexagon radar unfolds from the centre in mint.

## 2. Use it for / avoid it for
- Use for: player profiles, scouting notes, end-of-season cards, "who is better" comparisons, amateur or academy cards made with consent.
- Avoid for: team results (use `matchday-graphics`), fast highlight edits (use `athlete-hype-reel`), any ranking of minors that could embarrass them.
- Honesty: photos only with rights (the player, the club, licensed media; a guardian's consent for minors); stats from a named source and season; ratings are opinions and say so ("Our rating, 0–99, method in description"); radar axes are percentiles against a stated comparison pool; the card silhouette and layout are original, never a copy of a known game's cards; crests only with rights.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #121418 | graphite field with a #1E2228 light pool behind the card |
| card | #1A1D22 | matte card face; foil border sweeps #D9DEE4 → #8E969F → #D9DEE4 |
| ink | #F1F4F6 | name, values, labels |
| accent | #43E0A0 | mint: radar fill (30 %) and edge, the top value, active chip |
| support | #59616C | radar web, muted labels, comparison polygon |

Rules: foil is neutral silver, never rainbow holographic and never gold; mint only on the radar and the best number; the player's club colour may appear as a 10 px band on the card's left edge only.

## 4. Type
- Display: Anybody (OFL) 900, width 130–150 %, 96–130 px, uppercase, tracking −0.01 em (surname); first name 44 px above it.
- Rating: Anybody 900, width 75 %, 220 px, tabular.
- Body / captions: Anybody 600, width 100 %, 46–52 px.
- Labels: Chivo Mono (OFL) 500–600, 26–40 px, uppercase, tracking 0.1 em ("PROG. PASSES /90 · 7.1"); plain metric names, not game-style abbreviations.
- Language coverage: both ship latin + latin-ext; fallback `"Arial Black", sans-serif` and `ui-monospace`.

## 5. Surfaces and texture
- Background: graphite with a soft light pool and static grain 0.07.
- Materials: card 820×1180 px, radius 36 px with an angled notch at the top-right; 14 px foil border; the shirt number at 900 px and 4 % opacity embossed into the face; a cut-out player (`tools/cutout.py`) breaking the top edge by 60–100 px; card shadow 0 40 px 80 px rgba(0,0,0,.5).
- Texture: one specular sweep per reveal, no looping shimmer.
- Never: rainbow foil, purple gradients, backdrop grids, AI-generated player faces, a known game's card shape or rating badge.

## 6. Framing and layout
- 9:16 zones: captions above the card y 240–360; card x 130–950, y 380–1560; inside it: head and shoulders y 300–760 (breaking the edge at y 380), surname y 800–920, rating top-left, radar (radius 200 px) y 980–1380, stat chips y 1400–1500; source line under the card y 1590.
- Other formats: 1:1 card at 0.6 scale on the left, stats right; 16:9 card left third, radar and chips right.
- Density: radar of 6 axes max, 4 chips max.

## 7. Motion
- Entrances: card rises 400 px face-down, rotateX 25°→0 and rotateY 180°→0 over 0.9 s power3.out with a back.out(1.3) settle; surname slams width 150→130 in 0.3 s; radar axes draw 0.3 s, polygon unfolds 0.6 s back.out(1.4), vertex dots 0.05 s apart; ratings count up 0.8 s power2.out; chips pop 0.25 s back.out(2).
- Exits: card turns 180° on Y in 0.5 s power2.in to reveal the next card's back.
- Holds and rhythm: radar holds 2.5 s; a full card 6–9 s.
- Transitions: the card flip is the transition between players; in comparisons two cards slide apart and their radars overlay.
- Camera: slow 3D drift of ±6° yaw across the hold; never a continuous spin.
- Frame rate feel: smooth 30 fps.
- Edit grammar: highlight montage (1.0–1.5 s shots, cut on ball contact) → 3-frame hold on the player → card build (6–9 s) → 2–3 clips that prove the top stat, each tagged with its chip → comparison or call to action; chips appear on the clip that shows them.

## 8. Sound
- Bed: modern hip-hop or electronic, 120–140 BPM, −26 LUFS under the voice.
- Effects: a card whoosh, a soft metallic shimmer on the foil sweep, digital ticks during count-up (max 10 per second), a low thump when the rating lands.
- Mix: voice first; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: `hyperframes + three.js` (a plane carrying the card as a canvas texture, one directional light for the foil highlight); flat HyperFrames fallback with CSS 3D; `stat-counter` for ratings, `cover-still` for the thumbnail, `word-captions`; `tools/cutout.py --auto-crop` for the player.
- Signature scenes:
  - Card reveal: face-down rise and flip 0.9 s power3.out, foil sweep 0.7 s, surname width slam 0.3 s (new 3D scene).
  - Radar unfold: axes 0.3 s, mint polygon 0.6 s back.out(1.4), comparison-pool average as a dashed support polygon (new scene).
  - Head-to-head: two cards at 0.62 scale, radars overlaid in the centre (mint vs ink outline), the winning axis labels flash mint (new scene).
  - Stat proof chip: "PROG. PASSES /90 · 7.1" pinned to the bottom of the clip that shows it, counting up (`stat-counter`).
- Steps: 1) gather stats with source, season and comparison pool; 2) cut out the player from a licensed photo; 3) build the card and radar from JSON; 4) cut the montage; 5) `qa-review`.
- Style checks: source and season visible; radar scales stated; cut-out edge clean at 360 px; card silhouette original.
- Common failures: radar axes on mixed scales, too many stats, foil reading as cheap gold, a card that resembles a well-known game's design (change silhouette and badge).

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of collectible trading cards and sports-analytics radar charts.
