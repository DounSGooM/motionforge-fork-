# The independent critic

## Why a separate agent
The builder knows the intent and reads it into every frame. A reviewer who only gets the pictures judges what a viewer will actually see, including when the sound is off. The critic therefore runs in a **new context**: it has not seen the code, the script, the direction file or this conversation.

## When
- Once, after the builder's own sheet review has no open FIX and before the full-quality render.
- A second round only if the first returned FIX on more than a third of the panels, or a scene was rebuilt from scratch.

## What the critic gets
- `qa/sheet.png` (start/middle/end of each scene, time-stamped) and `qa/phone.png` (one frame per second at 360 px).
- Up to 4 full-size stills, only of moments the builder is unsure about.
- The 5-line brief **minus** anything that describes the visuals: goal, audience, platform/format, length, language.
- Nothing else: no script, no code, no claim list, no style name.

## How to start it
- Claude Code: launch a subagent (Agent/Task tool, general-purpose) with the prompt below and the image paths; do not pass conversation history.
- Codex, Cursor or others: open a new session or thread in the same folder with only this prompt.
- No way to start a separate context: skip it and state at delivery "no independent review was possible".

## Prompt (fill the brackets, send as is)

```
You are reviewing a short video you have never seen before. You did not make it and you have no other
information about it. Look at these images:
- <path>/qa/sheet.png : for each scene, its first, middle and last frame, in order, with timestamps.
- <path>/qa/phone.png : one frame per second at phone size.
[- <path>/qa/stills/<file>.png : full-size frames, optional]

Format: <9:16 | 1:1 | 4:5 | 16:9>. Platform: <…>. Audience: <one line>. Language of on-screen text: <…>.

Answer in this order, briefly:

A. From the pictures alone, in three lines: what is this video about, who is it for, and what does it ask
   the viewer to do?

B. Frame zero: if a viewer saw only the first frame, would they know what the video promises? yes/no + why.

C. For every panel, PASS or FIX with one line. Look for:
   - text that is clipped, overlapping, too small to read at phone size, or low in contrast;
   - text or key elements sitting where platform buttons and captions usually are (right edge, bottom);
   - a scene whose first frame shows nothing readable;
   - two things competing for attention, or nothing telling the eye where to look;
   - neighbouring scenes with the same composition (same text position, same card, same entrance);
   - colors that do not belong to the rest of the video; full-frame purple/blue gradients, grid backgrounds,
     generic glow, everything centered, emoji used as icons;
   - logos or interfaces that look fake or hand-drawn where a real one is expected;
   - characters that render in a different font from their neighbours (missing glyphs);
   - a last frame that does not close the idea.

D. The weakest scene, and the single reason.

Do not praise. Do not propose a new concept or rewrite the video. Name the defect and the panel.
```

## Using the answer
1. Compare part A with the real brief. If the critic could not tell what the video says or asks, the on-screen story fails without sound: fix on-screen text and key visuals, not the animation curves.
2. Part B "no" is a FAIL for check X7.
3. Every FIX is either fixed or answered in one written line in `qa/report.md` (why it is not a defect). Do not start another critic to get a different opinion.
4. Report at delivery: critic ran (yes/no), number of FIX, how many fixed, how many rebutted.
