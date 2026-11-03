<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Transfer Breaking

> A hard red breaking bar tears across the frame, the screen splits diagonally into two club-colour fields, a fee odometer rolls up, and a five-step meter shows how confirmed the story really is.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Football & sports | hyperframes | transfer news, contract renewals, signing announcements, rumour round-ups for sports media and fan accounts | low |

## 1. Essence
- In one sentence: urgent news delivered fast, with its certainty shown openly.
- Three adjectives: urgent, punchy, accountable.
- Signature move: the confirmation meter: five segments (Rumour · Talks · Agreed · Medical · Official) fill in yellow up to the current stage, with the source named beside it.

## 2. Use it for / avoid it for
- Use for: transfer and contract news, official signings, weekly rumour round-ups, coach appointments.
- Avoid for: match results (use `matchday-graphics`), player analysis (use `player-stat-card`), stories nobody credible has reported.
- Honesty: crests and player photos only with rights; otherwise colour fields and 3-letter codes. Fees exactly as reported, with currency, "reported" and the outlet's name; add-ons shown separately. The meter stage matches the strongest reliable source; "Official" only after the club's own announcement. Social posts appear only as real screenshots from the user, attributed; never mock up a post.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #101115 | newsroom near-black, hard top light pool of #1C1E25 |
| ink | #F6F6F4 | headlines, names, fee digits |
| accent | #FF2443 | breaking red: bar, "BREAKING" tag, live dot |
| support | #FFCF33 | confirmation-meter fill and the current-stage label only |
| muted | #9A9CA3 | sources, dates, secondary text |

Rules: club colours (from the user) fill only the two split fields; red owns the bar, yellow owns the meter, and neither appears anywhere else; split fields keep a 6 px white seam so similar club colours still separate.

## 4. Type
- Display: Kanit (OFL) 800 italic, 110–170 px, uppercase, tracking −0.01 em, line height 0.95.
- Fee digits: Kanit 800 upright, 200–260 px, tabular, each digit in its own column for the odometer.
- Body / captions: Public Sans (OFL) 600, 46–54 px.
- Labels: Public Sans 800, 26–30 px, uppercase, tracking 0.18 em ("REPORTED BY …", "STAGE 3/5").
- Language coverage: both ship latin + latin-ext (Kanit also Thai and Vietnamese); fallback `Impact, "Arial Narrow", sans-serif`.

## 5. Surfaces and texture
- Background: near-black with a hard top-down light and static grain 0.07.
- Materials: red bar with a 4 px darker bottom edge; two solid split fields divided at 14°; white source pills at 90 %; real screenshot cards in a browser frame.
- Texture: grain only; no glitch, no RGB split, no fake broadcast noise.
- Never: invented social posts, crests without rights, purple gradients, backdrop grids, an "OFFICIAL" stamp on an unconfirmed story.

## 6. Framing and layout
- 9:16 zones: breaking bar y 250–350 full width; headline y 380–720; split fields y 760–1300 with names (or licensed cut-out) on the seam; fee y 1320–1480; meter y 1500–1580 (5 segments of 150 px, 10 px gaps, x 80–860); source chip y 1600–1650; captions y 1150–1280 over the split.
- Other formats: 1:1 bar on top, fee and meter at the bottom; 16:9 split left-right with the meter in the lower third.
- Density: one story per screen; a round-up repeats the same layout per story.

## 7. Motion
- Entrances: bar slides from the left in 0.22 s power4.out with 6-frame motion blur; headline lines punch in at 0.08 s stagger, scale 1.15→1 power4.out; split fields wipe from opposite corners 0.4 s power3.inOut, seam draws 0.2 s, a direction arrow travels old club → new club along the seam in 0.5 s.
- Counters: each fee digit column rolls like an odometer for 1.2 s power2.out and stops on the reported value; currency and "m" land 0.15 s later. Meter: segments fill 0.18 s each, 0.12 s apart; the stage label pops with back.out(2); the live dot pulses twice (scale 1→1.4) on keyframes, never on a loop.
- Exits: hard cuts; the bar stays.
- Holds and rhythm: headline 2 s, fee 2 s, meter 2.5 s; a new element every 1.5–2.5 s.
- Transitions: hard cuts within a story; a red bar sweep across the full frame (0.25 s) between stories.
- Camera: none; photos push 1.00→1.03.
- Frame rate feel: crisp 30 fps.
- Edit grammar: news-package pace, average shot 1.5–2.5 s; the bar is on frame 1 and the player's name is said within the first second; cuts land on the key nouns (club, fee, stage); screenshot proof holds 2.5–3 s with a push to the quoted line; round-ups run 3–5 stories of 6–8 s, each ending on its meter; the voice runs 0.3 s over each bar sweep (L-cut).

## 8. Sound
- Bed: tense low-synth news pulse, 120–128 BPM, −26 LUFS under the voice.
- Effects: one sharp news stab on the bar entry, fine ticks during the odometer, a low hit on "Official" only.
- Mix: voice first; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: HyperFrames; `stat-counter` (odometer variant), `browser-window` (real article or post screenshots), `kinetic-title`, `cover-still`, `word-captions`.
- Signature scenes:
  - Breaking open: bar slide 0.22 s, headline punch-in 0.08 s stagger (new scene + `kinetic-title`).
  - Club split: diagonal fields wipe 0.4 s, seam 0.2 s, old → new arrow 0.5 s, 3-letter codes in display type (new scene).
  - Fee odometer: digit columns roll 1.2 s to the reported fee, "+ add-ons" chip separate, a "reported by" line naming the outlet (`stat-counter`).
  - Confirmation meter: five segments fill to the stage, label pops, source chip slides in (new scene).
  - Proof card: real screenshot in `browser-window`, push 1.0→1.2 to the quote, a red underline draws in 0.3 s.
- Steps: 1) collect the report, its source and stage; 2) confirm rights for crests and photos; 3) fill the story JSON; 4) build and cut; 5) claim check, then `qa-review`.
- Style checks: every fee has a currency and a source; the meter stage matches the source; no mock posts; names spelled with diacritics.
- Common failures: rumour shown as done, fee rounded up, club colours clashing at the seam (add the white seam, swap to away colours), the bar covering the headline on 1:1.

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of television breaking-news graphics and sports transfer reporting.
