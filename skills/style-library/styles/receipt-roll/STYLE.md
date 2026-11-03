<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Receipt Roll

> A thermal printer feeds a receipt line by line in step with the voice; prices align right, a dashed rule prints, the total pauses, and a blue rubber stamp lands on the result.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Finance & money | hyperframes (canvas for paper curl) | price breakdowns, "what I spent", cost comparisons, hidden fees, shopping hauls | low–medium |

## 1. Essence
- In one sentence: the honesty of a printed receipt — every line counted, nothing hidden.
- Three adjectives: tactile, itemised, dry-witted.
- Signature move: the paper advances in small stepped jolts as each item is spoken, then the TOTAL line prints slower and a blue stamp slams across it.

## 2. Use it for / avoid it for
- Use for: "the real cost of…", grocery or trip spending, subscription totals, fee breakdowns, price-change comparisons.
- Avoid for: long narrative stories, numbers without a list structure. Prices come from the user or a dated real receipt; store names and logos only with rights; example receipts are labelled "EXAMPLE" in the header line. Mask card numbers, loyalty IDs, addresses and cashier names.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #26221F | dark worn counter (or a blurred real counter photo) |
| paper | #F7F6F1 | thermal paper, slightly cool white |
| ink | #2A2A2E | thermal print; seeded per-line density 85–100 % |
| muted | #8E8A83 | small print, footer lines, fade at the paper edge |
| accent | #2F4BBF | rubber-stamp blue: stamps, circled prices, the one handwritten mark |
| headline | #F2EEE6 | headlines set on the counter, outside the paper |

Rules: the receipt itself is monochrome; only the stamp or pen mark is blue, once per scene. No red, no green.

## 4. Type
- Receipt lines: Courier Prime (OFL) 400, 36 px, uppercase item names, 32 characters per line, prices right-aligned to column 32.
- Totals: Space Mono (OFL) 700, 60–72 px, uppercase.
- Headlines (on the counter): Archivo Black (OFL) 400, 100–130 px, uppercase, tracking −0.01 em.
- Stamp text: Archivo Black, 64–80 px, uppercase, inside a 6 px double-ruled frame.
- Language coverage: all three have latin-ext on Fontsource; fallback Courier New for receipt lines.

## 5. Surfaces and texture
- Background: dark counter with static grain 0.07 and a soft overhead light pool.
- Materials: paper 760 px wide, zig-zag torn bottom edge (18 px teeth), top curl via a 6° perspective tilt, shadow 0 20px 40px rgba(0,0,0,.5).
- Texture: faint thermal banding (2 % horizontal streaks, seeded), stamp ink with a mottled mask and 85 % opacity.
- Never: drawn grid backdrops, fake store branding, glossy paper, purple gradients.

## 6. Framing and layout
- 9:16 zones: printer slot y 240 (paper emerges there); headline on the counter y 260–420 when the paper is short; receipt column x 160–920, grows down to y 1500; caption y 1520–1600 only when needed (the receipt usually is the caption).
- Other formats: 16:9 receipt on the left third, headline and stamp callouts right; 1:1 receipt centred, 640 px wide.
- Density: max 12 printed lines visible; the camera pans down as it grows.

## 7. Motion
- Entrances (print feed): paper advances one line (52 px) in 0.09–0.12 s steps with 2 px judder; the new line reveals left to right in 0.06 s.
- Total and stamp: dashed rule prints, 0.4 s pause, TOTAL prints at half speed; stamp scales 1.4 → 1, rotation −14° → −8°, 0.18 s power4.in, 6 px impact shake 0.12 s.
- Exits: receipt tears off along the teeth and flutters down 0.6 s power2.in with 12° rotation.
- Holds and rhythm: one line per spoken item; hold the stamped total ≥ 2 s.
- Transitions: tear-off reveals the next receipt underneath; hard cut otherwise.
- Camera: pans down to follow the newest line, 0.3 s power2.out; 2× punch-in on a line for the key price.
- Frame rate feel: printing is stepped (on twos), stamps and tears smooth 30 fps.
- Edit grammar: one long take with cutaways — the printer is the A-roll; cuts are 2× punch-ins on the price word, held 1.5–2 s, then back. Average shot 2–4 s. Printer whir runs under every cut (L-cut sound). Real photos of the actual items appear as 1.2 s polaroid inserts beside the line, never covering prices.

## 8. Sound
- Bed: dry, light percussion or none, −30 LUFS.
- Effects: thermal printer chatter per line (licensed or recorded), paper tear, stamp thud with a short room tail.
- Mix: voice first; printer at −24 dB re voice; final −14 LUFS integrated.

## 9. Build recipe and checks
- Engine and templates: hyperframes (receipt as HTML lines, canvas for curl and banding); `kinetic-title` for headlines on the counter, `stat-counter` for a single total, `cover-still`.
- Signature scenes:
  - Itemised print: lines print in sync with words.json; a running subtotal ticks in the margin in muted.
  - Total and stamp: dashed rule, pause, TOTAL, blue "PAID" or "+€38 MORE" stamp slams.
  - Two receipts: two 480 px receipts print side by side (month A / month B); the difference prints on a third mini slip.
  - Hidden fee: one line gets a blue hand-drawn circle (0.5 s draw) and a margin note in the same blue.
  - Coupon cut: a dashed scissor line draws, the bottom section separates and slides 80 px.
- Steps: 1) list items and prices from the user; 2) check the arithmetic; 3) format to 32 columns; 4) time each line to its spoken item; 5) render and QA.
- Style checks: totals add up exactly; currency and decimals match the locale; no personal data printed.
- Common failures: lines longer than 32 characters (abbreviate like real receipts), printing faster than speech, stamp hiding the total.

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of thermal till receipts and office rubber stamps.
