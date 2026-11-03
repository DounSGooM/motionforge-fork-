<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Fashion Editorial

> A print magazine spread that moves: a hairline-serif masthead across the top, tall model-crop frames that slide like turning pages, oxblood folio numbers, and generous bone-white margins.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Fashion & beauty | hyperframes (remotion optional for lookbook footage) | lookbooks, collection stories, designer and stylist profiles, beauty features, brand campaigns | medium |

## 1. Essence
- In one sentence: the reel reads like the opening pages of a fashion issue — image first, words placed with care.
- Three adjectives: composed, editorial, tactile.
- Signature move: the masthead crop — the title in a 260 px high-contrast serif runs across the top and the model's head overlaps it, cut out, so the photo sits between the letters and the page.

## 2. Use it for / avoid it for
- Use for: collection and capsule launches, lookbook stories, designer interviews, stylist "how to wear", beauty features with product credits, editorial campaigns.
- Avoid for: drops and countdowns (use `streetwear-drop`), runway recaps (use `runway-flash`), discount-led sales.
- Honesty: photos and footage from the brand or photographer, credited on a credits page (photographer, model, stylist as supplied); product names and prices only from the brand. Model likeness used only within the brand's agreement. The masthead is the user's own title, never a real magazine's name or logo style.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #ECE6DD | bone paper page |
| ink | #111014 | masthead, headlines, body |
| accent | #7A1F2B | oxblood: folio numbers, pull-quote marks, one key word |
| support | #B7AEA2 | captions, rules, credits |

Rules: images carry the colour; the layout stays bone, ink and one oxblood detail per page. The accent is never a shape larger than a word. Dark issue variant: background #141215, ink #ECE6DD, accent #C4485A.

## 4. Type
- Display (masthead and headlines): Bodoni Moda (OFL) 400–700, optical 28, 200–280 px masthead, 96–140 px headlines, title case, tracking −0.02 em; italic for deck lines.
- Body / captions: Hanken Grotesk (OFL) 400, 40–46 px, sentence case, line height 1.4, max 30 characters per line.
- Labels: Hanken Grotesk 600, 24 px, uppercase, tracking 0.28 em (section names, "LOOK 07", credits).
- Language coverage: both ship latin + latin-ext; fallback `Didot, "Bodoni 72", serif` / `system-ui`. Check Bodoni's hairlines at 360 px; never set it below 64 px.

## 5. Surfaces and texture
- Background: bone paper with a faint coated-stock sheen (static 3 % highlight at top-right) and grain 0.04; or a full-bleed photo with type printed over it.
- Materials: magazine pages (a 6 px gutter shadow when two pages show), thin 1 px rules, photo frames with no border (bleeds) or 40 px bone margins.
- Texture: subtle paper grain; photos keep their grade, untouched.
- Never: grid backgrounds, purple gradients, drop shadows on type, rounded UI cards, sticker effects.

## 6. Framing and layout
- 9:16 zones: masthead y 200–460; hero image 960×1180 at y 360–1540 (head overlapping the masthead); deck line y 1580–1660; folio and section label y 1760 left; right rail clear from x 940.
- Other formats: 1:1 masthead across, image cropped square below; 16:9 as a double-page spread with image left, text right.
- Density: one image, one headline, one deck line per page; credits pages may hold 6–8 lines.

## 7. Motion
- Entrances: images reveal by mask wipe top to bottom 0.7 s (`power3.inOut`); masthead letters fade in with a 30 ms stagger and 10 px rise; deck line fades 0.5 s.
- Exits: page slide — the whole page moves left 1080 px in 0.6 s (`power4.inOut`) with the next page following 60 ms behind.
- Holds and rhythm: 2.5–4 s per page; a new element every ~1 s inside a page.
- Transitions: page slides, match cuts on pose and silhouette between looks, a split-page reveal (two halves part vertically, 0.6 s).
- Camera: slow 3 % push on stills; footage with a locked-off or slow dolly feel.
- Frame rate feel: smooth 30 fps; footage at 24 fps feel (frame-blended to 30) for a film look.
- Edit grammar: fashion-film grammar — average shot length 1.5–2.5 s, cuts on movement (a turn, a hand to the collar) and match cuts on silhouette; detail inserts (fabric, stitch, clasp) 0.6–0.9 s. Speed ramps are gentle (100 % → 50 %) on fabric movement only. Interviews use L-cuts of 1–2 s over look footage; name and role lower-third in the label style for 3 s, never boxed.

## 8. Sound
- Bed: minimal electronic, downtempo or piano, 80–100 BPM, −22 LUFS under voice.
- Effects: paper page turn on page slides (soft), camera shutter on still reveals only if footage is absent.
- Mix: voice first, close and quiet; final −14 LUFS integrated.

## 9. Build recipe and checks
- Engine and templates: HyperFrames; `templates/kinetic-title` (masthead), `cover-still` (cover page), `word-captions` (sentence mode); `tools/cutout.py` for the head-over-masthead cut-out; Remotion optional for long lookbook footage.
- Signature scenes:
  - masthead crop: masthead fades in, photo wipes in below, cut-out head layer sits above the letters.
  - look card: full-bleed look with "LOOK 07" label and a two-line product credit (name, price from the brand) sliding up 30 px.
  - detail triptych: three tall crops (fabric, accessory, face) slide in 80 ms apart, each 320×1200.
  - pull quote: oxblood quote mark 300 px, quote in Bodoni italic 84 px, attribution label beneath.
- Steps: 1) gather images, credits and product facts; 2) choose crops (heads and hems kept); 3) lay out pages; 4) cut to music; 5) QA type and credits.
- Style checks: masthead overlap looks intentional (head over at least two letters, no halo); one oxblood element per page; credits complete.
- Common failures: too many words per page (move them to captions), hairlines vanishing at small sizes, crops cutting hands or hems awkwardly.

## Overrides
None (library copy).

## Credits
Original motionforge style, drawing on the general tradition of print fashion magazine layout and high-contrast didone typography.
