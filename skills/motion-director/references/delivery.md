# Delivery and revisions

## Files
| File | Notes |
|---|---|
| `renders/<slug>-v<N>.mp4` | H.264, yuv420p, BT.709, AAC 48 kHz, `+faststart`, −14 LUFS (or the agreed target) |
| `renders/<slug>-v<N>-<w>x<h>.mp4` | extra formats from `tools/export.mjs` |
| `renders/cover.png` | 1080×1920; all text inside the 3:4 crop (y 240–1680); `tools/cover_safe_area.py` passes |
| `qa/sheet.png` | final contact sheet |
| `renders/captions.srt` | sidecar captions in the video language |
| `renders/post.md` | caption/description package (below) |
| `assets/CREDITS.md` | every third-party photo, logo, track, with license |

## Cover
Build it from `templates/cover-still`: one strong frame (presenter or hero visual), the hook in 2–5 words at headline size, one accent word, at most 2–3 small supporting elements. Check it at 270 px wide; if the words are not readable there, cut words.

## Post package (`renders/post.md`), in the video language
1. **Caption / description:** first line repeats the hook in new words; 3–5 short lines of value; one call to action (save, send to a friend, comment a keyword); 5–15 relevant hashtags. Instagram limit 2,200 characters; keep it plain text.
2. **Pinned comment or long description** (if the video promises a resource): numbered steps, links the user provided, nothing invented.
3. **Short post for X/Threads** (if asked): under 280 characters, plus an optional reply with the link.
Check every line against the banned-phrase list of the language.

## The delivery message (to the user, in their language)
Keep it short and plain:
- length, format, scene flow in one line each;
- what is mock or illustrative (invented names, numbers, UI);
- QA numbers: LUFS, true peak, text check result, open WARNs;
- who approved the look (user or agent) and whether the independent critic ran, with its FIX count;
- what fell back to an alternative (scratch voice, generated music, simplified scene);
- what you could not verify (you cannot hear the mix; ask them to listen on a phone).

## Revisions by timestamp
1. The user says "at 0:12 change X". Convert to seconds; find the scene whose window contains it in `direction.json`.
2. Render a still at that exact time and look at it before editing.
3. Edit only that scene (or the shared component, if the issue is shared, then re-check every scene that uses it).
4. Re-run lint, text check and a still of the changed scene; re-render the scene and re-assemble.
5. Deliver as the next version (`-v2`, `-v3`); never overwrite an earlier version.
6. Voice-only changes: regenerate only the changed lines (consent gate again if paid), re-time, re-mix, remux; scenes cued from `words.json` move with it. Check any cue whose word changed.
