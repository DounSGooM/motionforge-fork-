# MotionForge Secure — isolated Apple Silicon trial

**Status: security review branch, not a trusted release.** Only test with disposable media. No access to production folders, SSH keys, Stripe keys or GitHub tokens should be given to the rendering agent.

## Manual macOS arm64 smoke test (after CI is green)

1. Use a separate macOS standard user account (not administrator) and a clean folder. Install trusted Homebrew, Node.js 22+, Python 3.11 and FFmpeg separately from their official sources.
2. Clone **your fork**, not upstream:

   ```bash
   git clone https://github.com/DounSGooM/motionforge-fork-.git
   cd motionforge-fork-
   git switch security-hardening
   git rev-parse HEAD
   ```

   Compare the SHA against the reviewed PR head before continuing.
3. Check every dependency and version manually. The CI currently resolves test packages dynamically, so installation is **not yet cryptographically/reproducibly locked**. Do **not** use `npm install -g`, `sudo npm install`, or automatically accept arbitrary agent commands.
4. **Reproducible installation:** the branch now contains reviewed `package.json` and `package-lock.json` pinned to one resolution, including `undici@7.30.2`. Once the branch SHA matches the reviewed CI result, use `npm ci --ignore-scripts --no-fund` (never `npm install` in the initial test), followed by `npx --no-install playwright install chromium`. Run `npm audit --audit-level=high` before executing MotionForge. Browser downloads and macOS FFmpeg packages are external binaries and are **not** locked by npm; install them only from trusted sources and test separately.
5. Validate that `node`, `ffmpeg`, `ffprobe`, and Chromium are available, then run:
   ```bash
   node --test tests/test_browser_security.mjs tests/test_render_smoke.mjs tests/test_multiscene.mjs
   python3 -m unittest discover -s tests -p 'test_security_hardening.py' -v
   ```
6. Never run Claude Code with bypassed permission prompts or with secrets in its environment for these trials. Browser request routing is not an OS network sandbox. Prefer an OS firewall that denies network access to untrusted rendering processes.

## Acceptance conditions
- GitHub Actions Linux security, macOS arm64 smoke and dependency audits are green.
- Local smoke test also passes on the actual M1 computer.
- The resolved install dependencies have a reviewed, committed lock and no high/critical advisories at installation time.
- No merge of draft PR #1 before the user approves a separate full diff review.

This document is an operational checklist, not a guarantee that an agent-executed template is safe.

## Pinned release candidate manifest

The working branch now has an exact-version npm manifest and a committed lockfile. `npm ci` verifies the dependency graph against the committed package lock (including published integrity hashes), and CI runs `npm audit` on the **same graph used by the render jobs**. The lockfile deliberately does not cover Python, FFmpeg, Homebrew or downloaded Chromium; those still need separate provenance and updates.

Keep the PR in draft, and do not grant agent-wide filesystem access. Passing CI does not equal a security certification.
