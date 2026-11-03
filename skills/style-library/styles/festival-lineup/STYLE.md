<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Festival Lineup

> A midnight-blue festival bill that builds tier by tier — small names first, the headliner last and biggest in sun-yellow — with day tabs that slide between Friday, Saturday and Sunday.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Music, events & weddings | hyperframes | festival line-up announcements, day splits, stage times, conference and fair programmes | medium |

## 1. Essence
- In one sentence: the reveal order builds anticipation, and the final frame works as the poster.
- Three adjectives: festive, ordered, building.
- Signature move: the tier build — the line-up assembles from the bottom tier up, each tier larger than the last, until the headliner drops in at 220 px with a sun-yellow underline.

## 2. Use it for / avoid it for
- Use for: full line-up drops, "Day 2 announced", stage-time schedules, multi-day conferences and fairs with speaker tiers.
- Avoid for: single-act shows (use `gig-poster-grunge` or `ticket-stub-event`), weddings, any bill not yet confirmed by the organiser.
- Honesty: act names, order and spelling exactly as the organiser supplies; billing order is contractual, never re-rank. Act logos and photos only from the organiser. Sponsor logos from the brand kit, sized as agreed.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #123C69 | midnight-blue field |
| ink | #FFF7E6 | act names, dates |
| accent | #FFC145 | headliner underline, active day tab, "just added" tag |
| support | #6FB7C9 | inactive day tabs, stage names, separators |

Rules: accent marks one headliner or one active tab per frame; never tint whole tiers. Separators between names are support-colour dots (14 px). Light variant for daytime events: background #FFF1D6, ink #123C69, accent #E8572A, support #5A8FA6.

## 4. Type
- Display (headliners): Big Shoulders Display (OFL) 900, 180–230 px, uppercase, tracking 0.01 em.
- Tiers: Big Shoulders Display 800 at 110 / 76 / 56 px for tiers 2 / 3 / 4.
- Body / captions: Bricolage Grotesque (OFL) 600, 46–52 px, sentence case.
- Labels: Red Hat Mono (OFL) 500, 28 px, uppercase, tracking 0.16 em (stage names, times, dates).
- Language coverage: all three ship latin + latin-ext; fallback `"Arial Narrow", system-ui, monospace`. Act names keep their exact spelling and special characters; run `tools/textcheck.mjs` on the full list.

## 5. Surfaces and texture
- Background: flat midnight blue with a warm horizon glow at the bottom (radial, #1E4F80 at y 1900) and static grain 0.06; or a heavily blurred, darkened crowd photo the organiser owns.
- Materials: printed-poster feel — flat colour, centred stacks, dot separators; day tabs as rounded pills (radius 40 px).
- Texture: grain only; the final poster frame gets a subtle 3 % paper texture.
- Never: grid backgrounds, purple gradients, laser beams and lens flares, stock crowd silhouettes.

## 6. Framing and layout
- 9:16 zones: festival name and dates y 220–420; day tabs y 460–540; line-up stack y 600–1500, centred, max width 940 px, names wrap with dot separators; ticket line y 1580–1650; sponsor strip y 1700–1780 (outside the caption band).
- Other formats: 1:1 stack centred, tabs on top; 16:9 two columns of days side by side.
- Density: up to 40 names per day in 4 tiers; tiers re-flow so no line is shorter than half the width (balanced lines).

## 7. Motion
- Entrances: tier 4 names fade + rise 20 px with 25 ms stagger (`power2.out`, 0.3 s); tier 3 at 40 ms; tier 2 slides in from scale 0.9 at 70 ms; headliner drops 60 px with `back.out(1.6)` 0.45 s, underline draws 0.3 s.
- Exits: the whole stack slides left 1080 px (`power3.inOut`, 0.5 s) as the next day's tab activates.
- Holds and rhythm: each tier lands on a bar; 3 s hold on the complete day; 4 s hold on the final full poster.
- Transitions: day-tab slide (stack and tab pill move together); a quick flash of the accent underline between announcements.
- Camera: static; a 4 % pull-back as the full poster completes.
- Frame rate feel: smooth 30 fps.
- Edit grammar: event-promo grammar — 3–5 s of the organiser's aftermovie footage up front (shots 0.5–1 s, cut on kick drums, speed ramps 100 % → 40 % on crowd moments), hard cut to the bill on a drop, then graphics only. Each tier lands on a downbeat; the headliner lands on the drop or the first beat after a 1-beat silence. Footage returns for 2 s before the end card.

## 8. Sound
- Bed: a track cleared for promotion (one of the acts, with permission, or licensed library), 120–128 BPM, −16 LUFS without voice, −24 under voice.
- Effects: a soft riser under the lower tiers, a sub hit for each headliner, a click for day-tab changes.
- Mix: music-led; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: HyperFrames; `templates/kinetic-title` for the festival name, `checklist-reveal` (adapted for tiers), `cover-still` for the poster frame, `word-captions` if voiced.
- Signature scenes:
  - tier build: four tiers assemble bottom-up with the stagger and sizes above, headliner last with the underline.
  - day tabs: three pills; the active pill fills accent, the stack slides with it; each day keeps the same tier rhythm.
  - just added: a single new name pops into an existing poster with a "JUST ADDED" accent tag for 2 s, then the tag fades.
  - stage clock: stage columns with times in Red Hat Mono; the "now" line moves down the schedule in real minutes compressed to seconds.
- Steps: 1) get the official bill (tiers, days, stages, times) as text; 2) auto-balance lines per tier; 3) build day stacks; 4) time tiers to the music; 5) spell-check every act name against the source.
- Style checks: billing order matches the source exactly; every name readable at its tier size on a 360 px preview (tier 4 ≥ 56 px); one accent per frame.
- Common failures: lines with one orphan name (rebalance), sponsors crowding the ticket line (keep the strip separate), headliner reveal off the drop.

## Overrides
None (library copy).

## Credits
Original motionforge style, drawing on the general tradition of festival bill posters and event programme typography.
