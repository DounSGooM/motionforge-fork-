<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Runway Flash

> Black room, white catwalk light, camera-flash frames, and a numbered look card for every exit — the reel walks at the pace of the show.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Fashion & beauty | remotion (footage-heavy) or hyperframes | runway and show recaps, graduate collections, model walk compilations, backstage-to-runway reels | medium |

## 1. Essence
- In one sentence: every look gets its moment, in order, at the rhythm of a walk.
- Three adjectives: fast, precise, glamorous.
- Signature move: the flash freeze — at the model's turn, a 2-frame white flash, the frame freezes for 0.5 s, and the look number "07" stamps in red beside the silhouette.

## 2. Use it for / avoid it for
- Use for: show recaps (20–40 looks), graduate showcases, model portfolio walks, backstage-to-runway contrasts, beauty looks from a show.
- Avoid for: editorial stories with text (use `fashion-editorial`), product drops (use `streetwear-drop`), viewers sensitive to flashing (offer the no-flash variant).
- Honesty: show footage and photos from the designer, the show or the photographer, credited; look numbers and garment details from the designer's look sheet. Models' names only with consent. Flash frames stay below photosensitivity thresholds (see checks).

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #09090B | show-room black |
| ink | #F2F2F2 | look numbers, labels, flash frames |
| accent | #FF1F3D | the current look number and the progress bar |
| support | #5A5A5A | past look numbers, credits, catwalk line |

Rules: footage carries all colour; graphics are white with one red number. Flash frames use ink at 85 %, never pure white full-frame for more than 2 frames.

## 4. Type
- Display: Jost (OFL) 300, 64–90 px, uppercase, tracking 0.42 em — designer and collection name, centred.
- Look numbers: Azeret Mono (OFL) 600, 220–300 px, tabular, two digits always ("07").
- Body / labels: Jost 400, 30–34 px, uppercase, tracking 0.3 em (fabric, credit, city and season).
- Language coverage: both ship latin + latin-ext; fallback `Futura, "Century Gothic", system-ui` / `"Courier New", monospace`.

## 5. Surfaces and texture
- Background: the show footage; graphic beats on #09090B with a single vertical light falloff (a 400 px wide soft column, 8 % lighter) like a catwalk spot.
- Materials: none beyond light: catwalk line (a 2 px support-colour line running from the bottom centre to y 900 in perspective).
- Texture: very light grain 0.05 on graphics; footage untouched apart from matching blacks to #09090B.
- Never: grid backgrounds, purple gradients, glitter, lens-flare overlays, animated textures.

## 6. Framing and layout
- 9:16 zones: model centred full height (vertical crop of horizontal show footage: keep the model between x 300–780); look number right at x 700–960, y 1300–1580 (clear of the rail by moving it left of x 940); designer/collection label y 240; progress bar y 1820 (2 px, accent fill = looks shown / total).
- Other formats: 1:1 model left of centre, number right; 16:9 the original show frame, number bottom-left.
- Density: footage + one number + one label. Nothing else.

## 7. Motion
- Entrances: look number stamps in from scale 1.3 → 1 in 4 frames (`power4.out`), previous number slides down 60 px and fades to support colour.
- Exits: number cuts out with the next shot; labels fade 0.2 s.
- Holds and rhythm: 1.2–2.0 s per look in a fast recap, 3 s for hero looks; flash freeze 0.5 s at the turn.
- Transitions: hard cuts only; flash frames (2 frames, ink 85 %) on 1 cut in 4, never on two consecutive cuts.
- Camera: footage reframed with a slow 2 % push per look; a 1.15 punch-in for detail on hero looks.
- Frame rate feel: 25/30 fps matched to source; freeze frames exact.
- Edit grammar: show-recap grammar — one shot per look, cut on the footfall (heel strike) on the beat; the turn at the end of the runway is the freeze point. Order follows the look sheet. Speed ramps on hero looks only: 100 % → 50 % from the walk into the turn, back to 100 % on the exit. Backstage inserts 0.5 s each as a contrast cut every 6–8 looks. No J/L-cuts; the music runs continuous.

## 8. Sound
- Bed: the show's music if cleared, otherwise a minimal techno or house track at 118–126 BPM, −14 LUFS (music-led).
- Effects: a camera shutter on each flash freeze, a low click for look-number changes.
- Mix: music first; no voice or a short whispered credit at the end; final −14 LUFS integrated, true peak ≤ −1 dBTP.

## 9. Build recipe and checks
- Engine and templates: Remotion for long show footage with frame-accurate cuts; HyperFrames for title, numbers and end credits (`templates/kinetic-title`, `stat-counter` for the look count, `cover-still`).
- Signature scenes:
  - flash freeze: 2-frame flash at the turn, 0.5 s freeze, look number stamps red, shutter sound.
  - look count: progress bar fills with each look; the final look triggers "FINALE" in Jost 90 px, tracking 0.42 em.
  - line-up wall: the finale walk as 6 stacked thin crops (each 180×1920) sliding up at different speeds (seeded), one per final look.
  - credits roll: designer, season, city, photographer, models (with consent) on black, 30 px Jost, 1.6 s per card.
- Steps: 1) get footage and the look sheet; 2) mark heel strikes and turns; 3) cut to the beat; 4) add numbers and flashes; 5) photosensitivity and credits QA.
- Style checks: look numbers match the look sheet; no more than 3 flashes in any 1 s window and no full-frame flash longer than 2 frames; the model is never cropped at the head.
- Common failures: vertical crop losing the model on wide shots (track the model's x position), flashes too frequent (1 in 4 cuts), numbers covering the garment (shift to the empty side).

## Overrides
None (library copy).

## Credits
Original motionforge style, drawing on the general tradition of runway show recaps and backstage fashion photography.
