<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Car Spec HUD

> A gunmetal instrument cluster comes alive: needles sweep, an amber 0–100 timer runs, and spec readouts lock into place around the car like a head-up display.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Automotive | hyperframes (SVG gauges); hyperframes + three.js for model turntables | car reviews, spec comparisons, dealer stock reels, EV range explainers, track-day results | medium |

## 1. Essence
- In one sentence: the numbers behind the car, shown the way the car itself would show them.
- Three adjectives: precise, mechanical, charged.
- Signature move: the ignition sweep: needles swing to full scale and back in 1.2 s while the tick marks light one by one, then the first readout locks on with a short amber flash.

## 2. Use it for / avoid it for
- Use for: performance and spec explainers, used-car stock reels for dealers, EV range and charging comparisons, track-day lap and acceleration results.
- Avoid for: restoration diaries (use `garage-build-log`), lifestyle car films, unverified "top speed" bragging.
- Honesty: car-maker logos and badges are trademarks: only from the user (a dealer with rights) or the brand kit; otherwise the model name as plain text. Specs come from manufacturer documents or the user's own measurements and are labelled "claimed" or "measured" with conditions ("0–100 km/h 6.2 s, measured, 2 people, 18 °C, dry"). 3D car models only user-owned or CC0, never ripped from games. Speed footage carries "closed road" or "track" when filmed there; never glorify public-road speeding.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #0B0E11 | gunmetal field |
| panel | #151A1F | instrument faces, ring #2A3138 |
| ink | #DCE3EA | backlit instrument white: numerals, labels |
| accent | #FF7A1A | instrument amber: needles, the live readout, timer digits |
| support | #E8261B | redline arc and limiter flash only |
| muted | #6C7884 | minor ticks, units |

Rules: amber marks only the value that is changing now; red only the redline band; nothing tints the car itself; the user's brand colour may replace amber in a dealer project, keeping red for the redline.

## 4. Type
- Display: Rajdhani (OFL) 700, 96–140 px, uppercase, tracking 0.06 em.
- Readouts: Azeret Mono (OFL) 600, tabular, 72–200 px (main timer 220 px).
- Body / captions: Rajdhani 600, 46–52 px.
- Labels: Azeret Mono 500, 24–28 px, uppercase, tracking 0.12 em ("KW", "NM", "KM/H", "WLTP").
- Language coverage: both ship latin + latin-ext; fallback `"Arial Narrow", sans-serif` and `ui-monospace`; units follow the market (km/h and kW, or mph and hp), never mixed.

## 5. Surfaces and texture
- Background: gunmetal with a faint horizontal brushed-metal streak noise (static, 2 %), soft top light, grain 0.05.
- Materials: gauges with a static amber inner glow (blur 12 px, 20 %); one diagonal 6 % white reflection band across the cluster glass; the user's car footage or photo, or a user/CC0 GLB on a dark studio floor with a soft reflection.
- Texture: grain only; no scanlines.
- Never: unlicensed logos, invented specs, sci-fi hexagon or grid backdrops, purple neon.

## 6. Framing and layout
- 9:16 zones: title y 250–330; car hero y 360–940; spec readouts left x 60–360 and right x 720–900 with leader lines to parts; cluster y 980–1560 (two 420 px gauges, digital centre between them); captions y 1580–1660.
- Other formats: 1:1 car on top, one gauge below; 16:9 car centred, gauges flanking.
- Density: two gauges and three readouts at most.

## 7. Motion
- Entrances: cluster fades in 0.3 s; needle moves power3.out with a back.out(1.2) settle (0.08 s overshoot); ticks light 0.01 s apart as the needle passes; readouts scramble 0.3 s (seeded) then lock with a 0.1 s amber flash; leader lines draw 0.3 s.
- Exits: the cluster dims to 20 % in 0.3 s ("ignition off").
- Holds and rhythm: readouts hold 2 s each; while a timer runs, something updates at least every second.
- Transitions: hard cuts on gear shifts and engine notes; 0.2 s whip pans; a 0.35 s amber scan line wiping vertically between spec groups.
- Camera: footage: tracking and rolling shots; 3D: orbit 20°/s, camera height 8° above the floor, 35 mm-equivalent lens, pushes to wheel, lights and charge port.
- Frame rate feel: 30 fps (60 fps where the platform allows, for smooth needles); the 0–100 timer runs in real time, or is labelled "shown 2×".
- Edit grammar: automotive promo cut: average shot 1.0–1.8 s; cuts land on shifts and downbeats; rolling shots 2–3 s; details (wheel, light signature, cabin) 0.6–1.0 s; ramps 100→40 % on passes; overlay values follow the clip's logged data (speed from the GPS log, not guessed); end on a static three-quarter front hero for 2.5 s with the spec card.

## 8. Sound
- Bed: driving electronic, 110–128 BPM, −26 LUFS under the voice.
- Effects: the user's recorded engine or EV drive sound, a light servo whir on the needle sweep, a relay click on each readout lock.
- Mix: engine sound 18 dB under the voice while talking, up on hero passes; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: HyperFrames with SVG gauges; `hyperframes + three.js` with `templates/product-turntable-3d` for a user or CC0 car GLB; `stat-counter` (readouts and timer), `cover-still`, `word-captions`.
- Signature scenes:
  - Ignition sweep: cluster in 0.3 s, needles 0 → max → 0 in 1.2 s power2.inOut, ticks light, "READY" label (new scene).
  - 0–100 run: timer counts in real time while the speed needle follows the measured curve from a CSV; at 100 the needle settles and the time flashes amber (new scene + `stat-counter`).
  - Spec lock-on: car photo, three leader lines draw to the parts, readouts scramble then lock (new scene).
  - Turntable callouts: the model orbits on a dark floor, callouts pin to wheel, battery or engine bay as each faces the camera (`product-turntable-3d`).
- Steps: 1) collect specs with source and label each claimed or measured; 2) confirm logo rights or go text-only; 3) build gauges to the real car's scale; 4) sync overlays to footage data; 5) claim check, then `qa-review`.
- Style checks: claimed vs measured labelled; units consistent; the dial scale fits the real car (no 320 km/h dial on a city car); no logo without rights.
- Common failures: needles that teleport (always ease), timers faster than the claim, too many readouts, a 3D model with a maker badge the user has no rights to.

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of automotive instrument clusters and motorsport telemetry overlays.
