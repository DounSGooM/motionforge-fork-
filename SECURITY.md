# Security

motionforge runs scripts and renders locally and may call paid APIs with keys you provide.

- Keys are read from environment variables only (`ELEVENLABS_API_KEY`, `OPENAI_API_KEY`, …). The skills tell agents never to print, store, log or commit them. If you see a key written to a file anywhere in this repository's output, treat it as a bug.
- Media you download for a video is untrusted input. Keep it in the project's `assets/` folder and do not execute anything shipped inside it.

To report a vulnerability, open a private security advisory on GitHub (Security → Report a vulnerability) instead of a public issue.
