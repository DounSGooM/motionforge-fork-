# Contributing to motionforge

Thanks for helping. motionforge is used by agents first and people second, so contributions are judged on one question: does it make the agent produce a better video with fewer surprises?

## Good first contributions
- **A new style**: copy `skills/style-library/styles/_template/STYLE.md`, fill every section, add a row to `skills/style-library/styles/README.md`.
- **A language list**: improve hook patterns or banned phrases in `skills/script-and-hooks/i18n/<lang>.md`. Native speakers only, please.
- **A template**: a small, seekable scene in `templates/<name>/` with `index.html` and `params.json`.
- **A check**: a QA script in `tools/` with a usage docstring and a clear PASS / WARN / FAIL output.

## Rules
1. **Original work only.** Do not paste code, prompts or text from other projects. Ideas are welcome; write them in your own words and structure.
2. **No third-party media.** No videos, images, music, fonts or voice recordings unless the license allows redistribution, and then list them in `THIRD_PARTY.md`.
3. **No personal data.** No API keys, voice IDs, client names or real people's likeness in examples. Use fictional brands (see `skills/brand-kit/examples/northwind.brand.json`).
4. **Deterministic scenes.** Every frame must be a function of time. No `Date.now()`, no unseeded randomness, no free-running CSS animation.
5. **Skills are for agents.** Numbered steps, exact commands, explicit gates. Short beats long.
6. **No banned phrases.** Docs and examples follow the lists in `skills/script-and-hooks/i18n/`.

## Pull requests
- One topic per PR. Describe what changes for the agent and how you tested it (render a short clip or a still and attach it).
- Run the syntax checks you touched: `python3 -m py_compile tools/*.py`, `node --check tools/*.mjs`.
- By contributing you agree your work is released under the MIT License.
