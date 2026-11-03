<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Terminal CRT

> A glowing phosphor terminal on a curved tube: monospaced text typing out, a blinking block cursor, scanlines and a faint bloom — code and systems told as a session log.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Tech, SaaS & AI | hyperframes (or canvas for the tube effect) | developer tools, AI agents, hacking/security explainers, CLI walkthroughs | low–medium |

## 1. Essence
- In one sentence: watching a machine think out loud.
- Three adjectives: focused, nerdy, suspenseful.
- Signature move: a command types out, a pause, then output scrolls in fast with a green "✓ done" line.

## 2. Use it for / avoid it for
- Use for: CLI tools, agent runs, logs, "what happens when you…", retro computing.
- Avoid for: non-technical audiences without captions; never fake a real product's output — use real runs.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| tube | #0A0F0A | screen background |
| phosphor | #7CFF8A | text (amber variant: #FFB347) |
| dim | rgba(124,255,138,.45) | old output, comments |
| accent | #FFFFFF | the line that matters (bright white flash) |
| error | #FF5F56 | failures |

Rules: one phosphor colour per video; accent white only for the key line.

## 4. Type
- JetBrains Mono or IBM Plex Mono (OFL) 500, 34–40 px; VT323 (OFL) 56 px for a chunkier retro feel.
- Line length ≤ 34 characters in 9:16 (wrap long commands deliberately).
- Language coverage: JetBrains Mono covers latin-ext and Cyrillic.

## 5. Surfaces and texture
- Scanlines (2 px period, 8–12 % darkening), bloom on text (blur 6 px at 35 %), slight barrel curvature and vignette.
- Optional bezel: the screen inside a rounded tube frame, or a modern terminal window with traffic lights for contemporary topics.
- Static noise only; a single deterministic "roll" glitch for transitions.
- Never: grid backgrounds, purple gradients, matrix-rain clichés.

## 6. Framing and layout
- Screen y 300–1450; prompt line pinned near the bottom of the screen while output scrolls above.
- Captions (if any) below 1460 in a clean sans to contrast with the mono.

## 7. Motion
- Typing: 18–28 characters/s with seeded jitter (±30 %) and a short pause before Enter.
- Output: lines appear instantly in bursts (3–8 lines per 0.1 s), then hold.
- Cursor: blinks at 1.06 Hz (0.53 s on/off) derived from t, never from timers.
- Zoom: push-in 1.0 → 1.15 on the key output line, which flashes white for 0.2 s.
- Transitions: screen collapse to a horizontal line and dot (0.3 s), or `clear` cut.

## 8. Sound
- Bed: dark ambient drone, −30 LUFS.
- Effects: soft key clicks (seeded variation), a beep on errors, a power-on hum at the start.

## 9. Build recipe and checks
- Engine and templates: HyperFrames scene from the starter (pre element + spans per line); canvas engine for a full CRT shader look.
- Steps: 1) record a real session (asciinema or a log); 2) trim to the beats; 3) script typing and output bursts on the voice; 4) add tube effects; 5) readcheck.
- Style checks: every command shown actually works; key lines held ≥ 1.5 s; text still crisp at 360 px wide despite bloom.
- Common failures: walls of text nobody can read (cut output), bloom too strong, wall-clock-based cursor blinking (flickers between renders).

## Credits
Original motionforge style.
