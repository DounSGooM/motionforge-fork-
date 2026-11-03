<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Esports HUD

> Broadcast-style match graphics: chamfered dark panels, two team colours split across a score bug, a kill feed stacking in the corner, angular player-cam frames and a gold flash on the play of the round.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Gaming & esports | remotion (gameplay edit) + hyperframes (HUD layers) | match recaps, tournament highlights, team announcements, stream clips | medium–high |

## 1. Essence
- In one sentence: a highlight packaged like it went out live on a tournament stream.
- Three adjectives: angular, fast, competitive.
- Signature move: gameplay freezes on the decisive frame, a chevron wipe slams the player card in from the side, and the gold "PLAY OF THE ROUND" strip cuts across.

## 2. Use it for / avoid it for
- Use for: tournament and scrim highlights, roster reveals, match-day announcements, ranked clips, team socials.
- Avoid for: slow analysis or patch rundowns (use `patch-notes`), non-competitive gaming. Team logos, player photos and game footage are trademarks, likeness and publisher content: use only what the user has rights to (their own team, their own gameplay under the publisher's video policy); otherwise generic shapes and initials. Stats from official match data or the user's records.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #0B0E14 | near-black field for full-graphic frames |
| panel | #141A24 at 88 % | HUD panels, 2 px edge #283246 |
| ink | #F4F6FA | names, scores |
| team-a | #FF3D5A | left team (replace with the real team colour) |
| team-b | #2BC0FF | right team (replace with the real team colour) |
| accent | #FFCC33 | gold: MVP, play of the round, objective timer |
| muted | #7C8798 | labels, round history |

Rules: team colours only on their own side's elements; gold once per moment and never as a team colour. If a team's colour is close to gold, use white for highlights instead.

## 4. Type
- Display: Saira Condensed (OFL) 800, 110–150 px, uppercase, tracking 0.02 em, italic slant via skewX(−8°).
- Names and scores: Saira Condensed 700, 56–72 px; scores tabular 96 px.
- Labels and stats: Chakra Petch (OFL) 600, 26–32 px, uppercase, tracking 0.1 em.
- Language coverage: both have latin-ext on Fontsource; fallback Arial Narrow / system-ui. Player tags keep their exact spelling and case.

## 5. Surfaces and texture
- Background: gameplay full-bleed; full-graphic frames on the near-black field with a faint team-colour glow at each side (8 %).
- Materials: panels with 45° chamfered corners (24 px), 2 px edges, inner 1 px highlight; diagonal slash shapes for wipes.
- Texture: static grain 0.04 on graphic frames only; panels themselves stay flat.
- Never: drawn grid backdrops, purple gradients, ripped game UI or models, other teams' logos without rights.

## 6. Framing and layout
- 9:16 zones: score bug y 240–330 (x 120–960); kill feed x 600–920, y 360–620 (max 4 rows); gameplay crop y 340–1180; player cam 420 × 320 at x 60–480, y 1200–1520; captions y 1200–1480 on the right half (x 500–920) when the cam is shown.
- Other formats: 16:9 classic broadcast layout (bug top centre, feed top right, cam bottom left); 1:1 gameplay crop + bug only.
- Density: bug + feed + one card; hide the feed during cards.

## 7. Motion
- Entrances: panels slice in on a 45° diagonal mask, 0.25 s power4.out; kill feed rows slide from the right 0.2 s, push older rows down.
- Exits: diagonal mask out 0.2 s power4.in; feed rows fade after 4 s.
- Holds and rhythm: something hits every 0.5–1 s in montages; nameplates hold 2.5 s.
- Transitions: replay sting — a chevron wipe in team colour, 0.4 s, in and out of every replay; whip pans 0.15 s between rounds.
- Camera: punch-in 1.3× on the crosshair area at the kill, 0.12 s; 3 % shake on impacts (seeded).
- Frame rate feel: gameplay at 60 fps source, delivered 30 or 60; freeze frames hold 0.6–1.0 s.
- Edit grammar: esports highlight grammar — gameplay is the A-roll; average shot 1–2 s in montages; cuts land on kills, ability casts and the beat. Speed ramp 100 % → 30 % → 100 % around the decisive moment, freeze frame on the hit with the player card. Player-cam picture-in-picture for reactions, cut to full-screen cam for 1 s on big moments. Nameplate lower-third in 0.25 s, holds 2.5 s. Caster audio (if licensed) as J-cut 0.3 s ahead.

## 8. Sound
- Bed: aggressive electronic or trap, 140–150 BPM (half-time feel), −24 LUFS under the voice.
- Effects: whoosh-impact on wipes, sub hit on freeze frames, glitch tick on feed rows; game sound kept for the decisive moment.
- Mix: voice/casters first; game audio −10 dB except the key moment; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: Remotion for the gameplay edit and ramps; hyperframes HUD layers (new scenes), `stat-counter` for K/D or round wins, `kinetic-title` for team names, `cover-still`.
- Signature scenes:
  - Score bug: two team panels slide in from the sides 0.3 s, scores flip with digit roll, round timer in gold for the final 10 s.
  - Kill feed: rows (icon or initials, 40 px tall) stack top-right, newest on top, gold row for the decisive kill.
  - Play of the round: ramp to 30 %, freeze, chevron wipe, player card (name, agent/role, 3 stats) slams in 0.25 s, gold strip.
  - Roster reveal: player cards drop in sequence 0.15 s apart with team-colour chamfer, names in Saira 72 px.
  - Final score: full-graphic card, winner side expands to 65 % width, loser side dims to 40 %.
- Steps: 1) confirm rights for footage, logos, photos; 2) pick moments from the VOD timestamps; 3) cut gameplay with ramps; 4) add HUD layers; 5) QA stats against official results.
- Style checks: scores and stats match the record; team colours on the correct side; no HUD text in the right rail below y 900.
- Common failures: too many overlays over gameplay, unreadable 2 px text from the source HUD (cover it or crop), flashes over 3 per second (photosensitivity: keep under 3).

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of live esports broadcast graphics and sports score bugs.
