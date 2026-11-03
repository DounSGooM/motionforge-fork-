<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Patch Notes

> A dark in-game menu with gold trim: a version banner unfurls, ability and item rows show old value → new value, and green buff or red nerf arrows bounce beside each change.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Gaming & esports | hyperframes (remotion for gameplay inserts) | patch and update rundowns, balance changes, tier shifts, game-dev changelogs | low–medium |

## 1. Essence
- In one sentence: a clear, fair read of what changed and who it affects.
- Three adjectives: methodical, game-native, readable.
- Signature move: an old value strikes through, an arrow draws, the new value flips in, and a buff or nerf arrow bounces once with back.out(2).

## 2. Use it for / avoid it for
- Use for: patch rundowns, "biggest winners and losers", indie devs announcing their own updates, season changes, tier list shifts.
- Avoid for: live match highlights (use `esports-hud`), story trailers. Values come from the official patch notes, with version and date on screen. Ability icons, character art and game UI belong to the publisher: use them only under the publisher's fan content policy or with rights (indie devs: their own art); otherwise generic icon shapes and names in type. No ripped models.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #141820 | dark slate field |
| panel | #1E2430 | rows and cards, 2 px edge #2C3444 |
| ink | #E8EAF0 | names and values |
| accent | #D9B36C | gold trim: version banner, the changed value's frame, section headers |
| buff | #4FD18B | upward arrows and "+" values |
| nerf | #F2605B | downward arrows and "−" values |
| muted | #8C93A3 | old values, descriptions, labels |

Rules: green and red only mean buff and nerf and always come with ▲/▼ arrows; gold frames the change, it never signals direction. "Adjusted" (neither) uses ink with a ◆ marker.

## 4. Type
- Display: Oxanium (OFL) 700, 96–130 px, uppercase, tracking 0.04 em.
- Body: Titillium Web (OFL) 400/600, 40–48 px; ability names Titillium Web 700, 54 px.
- Values: Oxanium 600, tabular, 64–84 px; old values muted with a 3 px strike.
- Labels: Titillium Web 600, 26 px, uppercase, tracking 0.12 em ("COOLDOWN", "DAMAGE").
- Language coverage: both have latin-ext on Fontsource; fallback system-ui. Keep official in-game names as written in the patch notes' language.

## 5. Surfaces and texture
- Background: flat slate with static grain 0.04 and a soft top light (#1E2533).
- Materials: panels radius 10 px with 2 px edges and 1 px inner gold corner brackets (24 px long); icon slots 120 px square with a bevelled 3 px border; faint static brushed-metal noise inside the banner only.
- Never: drawn grid backdrops, purple gradients, publisher art without rights, fake values.

## 6. Framing and layout
- 9:16 zones: version banner y 260–400; entity header (icon + name) y 440–600; change rows y 620–1160 (max 3 rows, 160 px each); gameplay insert or caption y 1180–1480.
- Other formats: 16:9 rows left, gameplay before/after right; 1:1 one row + header.
- Density: one character/item per screen, max 3 changed stats.

## 7. Motion
- Entrances: banner unfurls width 0 → 900 px, 0.6 s power3.out; rows slide in from the left 60 px, 0.35 s power3.out, 0.1 s stagger.
- Value change: old value strikes 0.25 s, arrow draws 0.2 s, new value flips (rotateX 90° → 0, 0.3 s power2.out); buff/nerf arrow bounces 12 px with back.out(2).
- Exits: rows slide out right 0.25 s power2.in, banner stays between sections.
- Holds and rhythm: one entity per 3–4 s; final values hold ≥ 1.5 s.
- Transitions: hard cut on "next"; section headers (BUFFS / NERFS / ADJUSTED) get a gold wipe 0.4 s.
- Camera: 1.3× punch-in on the changed value, 0.3 s power3.out.
- Frame rate feel: crisp 30 fps; flips and bounces only, no blur.
- Edit grammar: patch rundown grammar — one change per 3–4 s card, hard cuts on the word "next" or the entity name. Gameplay inserts (user-captured, within the publisher's policy) 2–3 s, before/after side by side in 16:9 or stacked in 9:16. The voice starts the next entity 0.3 s before the cut (J-cut). Version banner opens and closes the video. No speed ramps.

## 8. Sound
- Bed: mid-tempo electronic or orchestral-lite loop, 100–120 BPM, −28 LUFS.
- Effects: UI click on rows, rising chime on buffs, falling tone on nerfs, banner unfurl swish.
- Mix: voice first; UI sounds −22 dB re voice; final −14 LUFS integrated.

## 9. Build recipe and checks
- Engine and templates: hyperframes; rows and banner are new scenes; `checklist-reveal` (restyled) for change lists, `kinetic-title` for section headers, `browser-window` for the official patch page, `cover-still`; Remotion for gameplay inserts.
- Signature scenes:
  - Version banner: gold-trimmed banner unfurls, "PATCH 14.2" types in Oxanium at 18 chars/s, date in muted below.
  - Stat change row: label, old value struck, arrow, new value flips, buff/nerf arrow bounces; delta "+8 %" in the arrow's colour.
  - Tier shift: an icon slides from one tier row to another (0.6 s power2.inOut), the tier letter flashes gold.
  - Tooltip card: an ability card (icon, name, 2-line description) opens from the icon with scale 0.8 → 1, 0.3 s back.out(1.6).
  - Verdict meter: a three-segment meter (nerf / adjust / buff) with a needle settling 0.6 s elastic.out(1, 0.5).
- Steps: 1) get the official patch notes link and version; 2) pick the changes that matter (≤ 8); 3) enter old/new values in a data file; 4) build rows from data; 5) QA every value against the notes.
- Style checks: each value matches the notes; arrows present with every colour; version and date visible in the opener.
- Common failures: percentages vs flat values confused (label units), too many stats per row, publisher art used without checking the policy.

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of in-game menus, item tooltips and game update announcements.
