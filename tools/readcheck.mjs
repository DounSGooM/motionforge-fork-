#!/usr/bin/env node
/*
 * readcheck.mjs — does every on-screen text stay long enough to be read?
 * © 2026 motionforge contributors, MIT
 *
 * For each text (same id + same string = one piece) the tool measures its first continuous
 * stretch fully inside the frame and compares it with the time a viewer needs:
 *
 *   needed = lead + letters / cps + cjk / cjkCps        (never below --min)
 *   defaults: lead 0.6 s (eyes find the text), cps 14 letters/s, cjkCps 5 chars/s, min 1.2 s
 *
 * Captions that follow the voice are exempt by nature (they are read while heard): skip them with
 * --ignore "caption" (substring of the id). Canvas pages must provide window.TEXTS(t); for a
 * typewriter, report the FULL string from its first frame, not the letters typed so far.
 *
 * usage
 *   node tools/readcheck.mjs <page> [--step 0.05] [--cps 14] [--cjk-cps 5] [--lead 0.6] [--min 1.2]
 *                                   [--ignore id1,id2] [--size 1080x1920] [--root DIR]
 * Exit: 0 all readable, 1 some too short or never fully visible, 2 not checked (no text found).
 */
import path from "node:path";
import { collectTexts, openPage, pageInfo, resolvePage, seek } from "../engines/canvas/render.mjs";

const argv = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = argv.indexOf("--" + name);
  return i >= 0 ? argv[i + 1] : fallback;
};
const target = argv[0];
if (!target || target.startsWith("--") || !resolvePage(target)) {
  console.error("usage: node tools/readcheck.mjs <page> [--step 0.05] [--cps 14] [--lead 0.6] [--min 1.2] [--ignore ids]");
  process.exit(2);
}

const STEP = Number(opt("step", 0.05));
const CPS = Number(opt("cps", 14));
const CJK_CPS = Number(opt("cjk-cps", 5));
const LEAD = Number(opt("lead", 0.6));
const MIN = Number(opt("min", 1.2));
const IGNORE = (opt("ignore", "") || "").split(",").filter(Boolean);
const [W, H] = (opt("size", "1080x1920")).split("x").map(Number);

const session = await openPage(target, { width: W, height: H, root: opt("root") });
const info = await pageInfo(session.page, opt("timeline", "main"));
if (!(info.duration > 0)) {
  console.error("readcheck: NOT CHECKED — the page reports no duration");
  await session.close();
  process.exit(2);
}

const pieces = new Map(); // key -> { id, text, first, start, run, closed, partial }
for (let t = 0; t <= info.duration + 1e-9; t += STEP) {
  const tt = Math.round(t * 1000) / 1000;
  await seek(session.page, tt, opt("timeline", "main"));
  const seen = new Set();
  for (const b of await collectTexts(session.page, tt)) {
    const id = String(b.id);
    if (IGNORE.some((x) => id.includes(x)) || !b.text.trim()) continue;
    const key = `${id}\u0000${b.text}`;
    const inside = b.x0 >= -1 && b.y0 >= -1 && b.x1 <= W + 1 && b.y1 <= H + 1;
    const p = pieces.get(key) ?? { id, text: b.text, first: tt, start: null, run: 0, closed: false, partial: true };
    pieces.set(key, p);
    if (!inside || p.closed) continue;
    p.partial = false;
    if (p.start === null) p.start = tt;
    p.run = Math.min(tt + STEP, info.duration) - p.start;
    seen.add(key);
  }
  for (const [key, p] of pieces) if (p.start !== null && !seen.has(key)) p.closed = true; // only the first stretch counts
}
await session.close();

if (!pieces.size) {
  console.error("readcheck: NOT CHECKED — no text found over the whole film (canvas pages need window.TEXTS(t))");
  process.exit(2);
}

const isCJK = (ch) => /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u.test(ch);
const needed = (text) => {
  let letters = 0, cjk = 0;
  for (const ch of text) {
    if (/\s/.test(ch)) continue;
    if (isCJK(ch)) cjk++;
    else letters++;
  }
  return Math.max(MIN, LEAD + letters / CPS + cjk / CJK_CPS);
};

let bad = 0;
console.log(`readcheck: ${path.relative(process.cwd(), resolvePage(target))}, ${pieces.size} text pieces, step ${STEP}s`);
for (const p of [...pieces.values()].sort((a, b) => a.first - b.first)) {
  const label = JSON.stringify(p.text.length > 40 ? p.text.slice(0, 39) + "…" : p.text);
  if (p.partial) {
    bad++;
    console.log(`  BAD  ${p.id.padEnd(16)} ${p.first.toFixed(2)}s  never fully inside the frame  ${label}`);
    continue;
  }
  const need = needed(p.text);
  const ok = p.run + 1e-6 >= need;
  if (!ok) bad++;
  console.log(`  ${ok ? "ok " : "BAD"}  ${p.id.padEnd(16)} ${p.start.toFixed(2)}s  on ${p.run.toFixed(2)}s, needs ${need.toFixed(2)}s  ${label}`);
}
console.log(`read: ${bad ? "FAIL" : "PASS"} (${bad} too short)`);
process.exit(bad ? 1 : 0);
