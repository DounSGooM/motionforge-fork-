# direction.json

The direction file is the contract between the plan and the build. Write it after the script is approved and the style is chosen, before any scene code. Scenes that break it are wrong, not creative.

## Schema

```json
{
  "slug": "string",
  "language": "en | tr | es | pt-BR | fr | de | zh-CN | ja | ko | hi",
  "format": { "main": "9:16", "extra": ["1:1"], "width": 1080, "height": 1920, "fps": 30 },
  "story_format": "1..8 (see story-formats.md)",
  "style": "skills/style-library/styles/<id>",
  "brand": "brand.json | null",
  "concept": "one sentence a stranger could repeat",
  "visual_rule": "what each color and each kind of motion means in this video",
  "motif": "one element that comes back in a new role in several scenes",
  "approved_by": "user | agent",
  "scenes": [
    {
      "id": "kebab-case",
      "start": 0.0,
      "end": 3.2,
      "cue": "the spoken word that opens this scene",
      "engine": "hyperframes | canvas | remotion | footage",
      "template": "templates/<name> | null",
      "layout": "where the hero sits and what fills the rest",
      "entrance": "how the hero arrives",
      "hero": "the one thing the eye must land on",
      "on_screen_text": "exact text, in the video language",
      "assets": ["assets/logo/x.svg"],
      "sfx": [{ "name": "whoosh", "at_word": "launch" }],
      "notes": "optional"
    }
  ]
}
```

`start`/`end` are copied from `audio/words.json` after timing; before the voice exists use estimates and mark `"estimate": true` on the scene.

## Validity rules (check them yourself before building)
1. Every scene has `layout`, `entrance` and `hero`.
2. Not all scenes share the same layout; not all share the same entrance.
3. Two neighbouring scenes never share the same layout **and** entrance.
4. Scenes cover the runtime with no gaps or overlaps; no scene shorter than 1 s.
5. A cut never falls inside a spoken word.
6. `on_screen_text` contains no phrase from the banned list of `language`.
7. `motif` appears in at least three scenes and changes role at least once.
8. If `approved_by` is `agent`, say so at delivery.

## Example (fictional)

```json
{
  "slug": "inbox-zero-in-4-moves",
  "language": "en",
  "format": { "main": "9:16", "extra": [], "width": 1080, "height": 1920, "fps": 30 },
  "story_format": 6,
  "style": "skills/style-library/styles/creator-reels-dark",
  "brand": null,
  "concept": "Four filters turn a 2,000-mail inbox into a list you can finish before lunch.",
  "visual_rule": "Charcoal ground, white type, lime only on mails that are done. Things that are cleared slide out left; nothing fades.",
  "motif": "The unread counter: big number in the hook, a step tag later, a zero at the end.",
  "approved_by": "user",
  "scenes": [
    { "id": "hook", "start": 0, "end": 2.6, "cue": "Two", "engine": "hyperframes", "template": "templates/stat-counter",
      "layout": "giant counter bleeding off the right edge, presenter card below", "entrance": "hard cut, counter already moving",
      "hero": "the number 2,000", "on_screen_text": "2,000 unread", "assets": [], "sfx": [] },
    { "id": "filter-1", "start": 2.6, "end": 8.1, "cue": "first", "engine": "hyperframes", "template": "templates/browser-window",
      "layout": "real mail client screenshot in a browser frame, zoom on the filter menu", "entrance": "push-in from full window",
      "hero": "the filter rule", "on_screen_text": "1/4  Newsletters → Later", "assets": ["assets/screens/filters.png"],
      "sfx": [{ "name": "click", "at_word": "filter" }] }
  ]
}
```
