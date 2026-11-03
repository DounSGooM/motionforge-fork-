<!-- motionforge style · © 2026 motionforge contributors, MIT -->
# Case Study

> A three-act business story on warm stone: an editorial serif chapter card for Problem, Approach and Result, greyed "before" captures, and a teal metric delta that only appears once the result is proven.

| Category | Engine | Best for | Effort |
|---|---|---|---|
| Business, B2B & local | hyperframes (remotion for interview-led edits) | client case studies, project retrospectives, agency portfolios, B2B proof stories | medium |

## 1. Essence
- In one sentence: a short, honest story of a problem solved, told like a magazine feature with numbers.
- Three adjectives: editorial, evidential, restrained.
- Signature move: the "before" capture sits desaturated; on the word "after" it regains colour from left to right and a teal "from → to" metric lands beside it.

## 2. Use it for / avoid it for
- Use for: agency and consultancy work, SaaS customer stories, freelancer portfolios, internal project wins.
- Avoid for: product launches (use `saas-launch-glass`), anything without a measurable result. Client name, logo and screenshots only with the client's written permission; every metric states its period and baseline ("Mar–Jun 2026 vs. prior quarter"); quotes are real, attributed and approved.

## 3. Palette
| Token | Hex | Job |
|---|---|---|
| background | #E8E6E1 | warm stone |
| ink | #121212 | headlines, body, chapter numerals |
| accent | #00A88F | teal: result metrics, the "after" state, the Result chapter rule |
| support | #8A857C | muted labels, the problem state, timelines |
| card | #FAF9F6 | quote and metric cards |

Rules: teal is reserved for results, so it never appears in the Problem chapter. Problem visuals are desaturated to 20 %; colour returns in the Result chapter.

## 4. Type
- Display: Newsreader (OFL) 600, 96–130 px, sentence case, tracking −0.02 em; italic for chapter names.
- Body / captions: Hanken Grotesk (OFL) 500, 44–50 px.
- Metrics: Hanken Grotesk 800, tabular, 150–200 px; "from" value 60 % size in support grey.
- Labels: Hanken Grotesk 700, 26–28 px, uppercase, tracking 0.14 em ("CHAPTER 02 · APPROACH").
- Language coverage: both have latin-ext on Fontsource; fallback Georgia / system-ui.

## 5. Surfaces and texture
- Background: flat stone with static paper grain 0.04.
- Materials: cards radius 8 px with 1 px #CFCBC3 border; real captures in a thin browser frame; client photos in plain rectangles.
- Lines: 2 px ink rules under chapter titles; teal 6 px rule only in the Result chapter.
- Never: drawn grid backdrops, stock "success" imagery, purple gradients, logos of clients who did not approve.

## 6. Framing and layout
- 9:16 zones: chapter label y 260–310; title y 330–560; evidence (capture, chart, photo) y 600–1180; caption or quote y 1200–1480.
- Other formats: 16:9 two columns (evidence left 60 %, text right); 1:1 evidence over a two-line caption.
- Density: one piece of evidence per frame; max two metrics side by side.

## 7. Motion
- Entrances: titles fade up by line, 30 px rise, 0.5 s power3.out, 0.12 s stagger; evidence slides in 80 px from the right, 0.6 s power3.out.
- Exits: fade 0.3 s; chapter cards cut out hard.
- Holds and rhythm: chapter card 1.5 s; evidence shots 2.5–4 s; metrics hold ≥ 2 s.
- Transitions: chapter cards between acts (hard cut in, hard cut out); within a chapter, 0.3 s crossfades.
- Camera: 3 % push on captures; zoom 1.6× to the changed detail with a teal box.
- Frame rate feel: calm 30 fps.
- Edit grammar: documentary-style business story in three acts (≈ 25 / 35 / 40 % of runtime). Client interview soundbites 4–6 s with a lower-third (name, role, company) in at 0.4 s, held 3.5 s. J-cut each chapter: the next soundbite starts 0.5 s before its chapter card leaves. Before/after shown as a cut on the word "after" or as a wipe. Average shot 3 s.

## 8. Sound
- Bed: minimal piano or soft pulse, 80–96 BPM, −28 LUFS; drops out for the main result line.
- Effects: soft page turn on chapter cards, a low rising tone into the result metric.
- Mix: voice and interviews first; final −14 LUFS integrated.

## 9. Build recipe and checks
- Engine and templates: hyperframes; `browser-window` for real deliverables, `stat-counter` for result metrics, `kinetic-title` for chapter titles, `chat-thread` for the client brief if real messages are approved; Remotion for interview-led edits.
- Signature scenes:
  - Chapter card: numeral "02" 260 px in Newsreader, italic chapter name slides in 0.4 s, 2 px rule draws 0.5 s.
  - Colour return: before-capture at 20 % saturation; on "after" a left-to-right wipe (0.8 s power2.inOut) restores colour.
  - Metric delta: "from" value in grey, arrow draws 0.3 s, teal "to" value counts up 1.0 s, period line below.
  - Project timeline: a horizontal line with week markers, 4–6 milestone dots pop 0.1 s apart, today marker in teal.
  - Client quote card: real quote, max 22 words, attribution and photo (approved).
- Steps: 1) gather permission, metrics with baselines, and quotes; 2) write the three-act outline (≤ 2 sentences each); 3) collect captures; 4) build and time; 5) claim check with the client.
- Style checks: teal never appears before the Result chapter; every metric has a baseline and period; client approval recorded in the project notes.
- Common failures: Problem chapter running too long, vanity metrics without a baseline, unapproved logos.

## Overrides
None in the library copy; project copies list their changes here.

## Credits
Original motionforge style, drawing on the general tradition of magazine feature layouts and documentary interview films.
