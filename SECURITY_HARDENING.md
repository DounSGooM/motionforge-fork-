# MotionForge — Security Hardening (work in progress)

This branch contains targeted safeguards for the upstream MotionForge revision. **No merge or release is authorized by this document.**

## Changes
- `engines/hyperframes/scripts/new-scene.sh`: reject template paths, traversal and unexpected characters; encode `<`, `>` and `&` in JSON inserted into inline HTML scripts.
- `engines/canvas/render.mjs`: restrict Chromium resource requests to the per-render loopback origin and block service workers.
- `tools/avatar/avatar.py`: apply an HTTPS/hostname-constrained redirect handler to Wiro API requests with authentication headers.
- `tests/test_security_hardening.py`: regression tests targeting these controls.

## Verify before using or merging
1. Review the exact diff against upstream.
2. Run `python3 -m unittest discover -s tests -p 'test_security_hardening.py' -v`.
3. Run existing avatar unit tests and normal scene-generation/render flows.
4. Test Chromium's network policy against remote, local-service, redirect and WebSocket access. Playwright routing is not equivalent to an OS-level firewall.
5. Resolve dependency versions and scan packages for known vulnerabilities.
6. Review any template HTML, agent instructions, external asset handling, subprocess calls, and third-party code before using untrusted inputs.
7. Install and test only in an isolated account/container with no production secrets.

## Limits
The changes here are *defense in depth*, not a claim that arbitrary generated browser code is fully sandboxed. The browser's network permissions and all external asset/connector flows require additional tests. An agent with elevated shell permissions can bypass browser-only restrictions.

## Source and attribution
Original project: https://github.com/aykutucesai/motionforge
Preserve original MIT license, copyright and third-party license notices.

## Extended verification (2026-11-09)
- The continuous integration workflow also runs a real Playwright Chromium scene that tries HTTPS Internet access, a separate localhost HTTP service, and a WebSocket handshake. Its scene root must remain accessible.
- The local HTTP file server is also tested against malicious URL encodings, traversal, and a symlink pointing outside its allowed root.
- The original Python suite includes an actual `kinetic-title` scene generated with a hostile HTML `</script>` payload; the result must preserve the JSON value without emitting an executable script.
- A separate GitHub Actions job audits a resolved, **ephemeral** npm dependency graph and Python packages. The audit manifest overrides indirect `undici` with **7.30.2** because previous test resolutions produced a high-severity advisory with vulnerable 7.0.0–7.30.0 releases. This is NOT a production dependency lock or an upstream fix; real projects must pin the resolved graph and re-check the actual installed packages before use.
- No code executes any paid APIs in CI and no production credentials are provided.

## Remaining work before any merge
- Test full HyperFrames rendering end-to-end on macOS arm64 and confirm that frame assets remain functional with the deny-by-default network policy.
- Review all executable templates and dependency installation entrypoints, add signed/pinned versions to installation guidance.
- Decide whether the CLI should disallow even same-host redirects on authenticated Wiro POST operations.
- Have another reviewer inspect the full diff. Keep PR #1 as draft.
