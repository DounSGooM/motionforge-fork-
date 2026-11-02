#!/usr/bin/env node
/*
 * textcheck.mjs — find text that is cut off, overlapping, clipped by its box, or under the phone UI
 * © 2026 motionforge contributors, MIT
 *
 * A contact sheet at thumbnail size hides these problems; this tool measures them.
 * Works on HyperFrames scenes (DOM text) and canvas pages (window.TEXTS(t)).
 *
 * usage
 *   node tools/textcheck.mjs <page> [--every 0.25] [--safe 220,380,120] [--allow 3.0-4.5,10-12]
 *                                   [--size 1080x1920] [--root DIR] [--timeline main]
 *   node tools/textcheck.mjs <page> --dump <t> [--out boxes.json]     # text boxes at one moment
 *
 *   --every S     sample step in seconds (default 0.25)
 *   --safe T,B,R  phone UI zones for vertical video, in px at 1080x1920 (scaled to the frame):
 *                 top T (status bar, account name), bottom B (caption, buttons), right R (like/share rail)
 *   --allow A-B   time ranges where crowding is intentional (a burst of bubbles flying past)
 *
 * Reports
 *   FAIL  cut off by the frame edge      (more than 3 px outside the frame)
 *   FAIL  overlaps other text            (intersection > 20 % of the smaller box)
 *   FAIL  clipped by its own box         (DOM only: scrollWidth/Height larger than an overflow-hidden box)
 *   WARN  under the phone UI             (inside a --safe zone; vertical video only)
 * Exit: 0 no FAIL, 1 FAIL found, 2 usage error.
 */
import fs from "node:fs";
import path from "node:path";
import { collectTexts, openPage, pageInfo, resolvePage, seek } from "../engines/canvas/render.mjs";

const argv = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = argv.indexOf("--" + name);
  return i >= 0 ? argv[i + 1] : fallback;
};
const target = argv[0];
if (!target || target.startsWith("--") || !resolvePage(target)) {
  console.error("usage: node tools/textcheck.mjs <page> [--every 0.25] [--safe 220,380,120] [--allow a-b] [--dump t]");
  process.exit(2);
}

const sizeArg = opt("size");
const [vw, vh] = sizeArg ? sizeArg.split("x").map(Number) : [1080, 1920];
const session = await openPage(target, { width: vw, height: vh, root: opt("root") });
const info = await pageInfo(session.page, opt("timeline", "main"));
const W = vw, H = vh;

/* ---------- dump mode: boxes at one moment, e.g. for tools/cover_safe_area.py --boxes ---------- */
if (opt("dump") !== undefined) {
  const t = Number(opt("dump"));
  await seek(session.page, t, opt("timeline", "main"));
  const boxes = await collectTexts(session.page, t);
  const json = JSON.stringify(boxes.map((b) => ({ ...b, x0: Math.round(b.x0), y0: Math.round(b.y0), x1: Math.round(b.x1), y1: Math.round(b.y1) })), null, 1);
  if (opt("out")) fs.writeFileSync(opt("out"), json);
  else console.log(json);
  await session.close();
  process.exit(0);
}

const step = Number(opt("every", 0.25));
const [safeTop, safeBottom, safeRight] = (opt("safe", "220,380,120")).split(",").map((v) => (Number(v) * H) / 1920);
const vertical = H > W;
const allowed = (opt("allow", "") || "")
  .split(",")
  .filter(Boolean)
  .map((r) => r.split("-").map(Number));
const isAllowed = (t) => allowed.some(([a, b]) => t >= a - 1e-6 && t <= b + 1e-6);

const issues = new Map(); // key -> { level, kind, label, t0, t1, frames }
const note = (level, kind, label, t) => {
  const key = `${kind}|${label}`;
  const hit = issues.get(key);
  if (hit) { hit.t1 = t; hit.frames++; }
  else issues.set(key, { level, kind, label, t0: t, t1: t, frames: 1, allowed: isAllowed(t) });
};
const short = (s) => (s.length > 36 ? s.slice(0, 35) + "…" : s);
const area = (b) => Math.max(0, b.x1 - b.x0) * Math.max(0, b.y1 - b.y0);

let samples = 0;
for (let t = 0; t <= info.duration + 1e-9; t += step) {
  const tt = Math.round(t * 1000) / 1000;
  await seek(session.page, tt, opt("timeline", "main"));
  const boxes = (await collectTexts(session.page, tt)).filter((b) => b.x1 - b.x0 > 2 && b.y1 - b.y0 > 2);
  samples++;

  for (const b of boxes) {
    const label = short(b.text);
    if (b.text.trim().length > 1 && (b.x0 < -3 || b.y0 < -3 || b.x1 > W + 3 || b.y1 > H + 3)) {
      note("FAIL", "cut off by the frame edge", label, tt);
    } else if (vertical && (b.y0 < safeTop || b.y1 > H - safeBottom || (b.x1 > W - safeRight && b.y1 > H * 0.45))) {
      note("WARN", "under the phone UI", label, tt);
    }
  }
  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i], b = boxes[j];
      if (a.text === b.text) continue;
      const inter = { x0: Math.max(a.x0, b.x0), y0: Math.max(a.y0, b.y0), x1: Math.min(a.x1, b.x1), y1: Math.min(a.y1, b.y1) };
      if (inter.x1 <= inter.x0 || inter.y1 <= inter.y0) continue;
      if (area(inter) > 0.2 * Math.min(area(a), area(b))) note("FAIL", "overlaps other text", `"${short(a.text)}" × "${short(b.text)}"`, tt);
    }
  }

  // DOM pages: text bigger than an overflow-hidden box that holds it
  const clipped = await session.page.evaluate(() => {
    if (typeof window.TEXTS === "function") return [];
    const out = [];
    for (const el of document.body.querySelectorAll("*")) {
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden" || Number(cs.opacity) < 0.05) continue;
      if (!/(hidden|clip)/.test(cs.overflow + cs.overflowX + cs.overflowY)) continue;
      if (!el.textContent.trim()) continue;
      if (el.scrollWidth > el.clientWidth + 2 || el.scrollHeight > el.clientHeight + 2) {
        const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
        if (hasText) out.push(el.textContent.replace(/\s+/g, " ").trim());
      }
    }
    return out;
  });
  for (const text of clipped) note("FAIL", "clipped by its own box", short(text), tt);
}
await session.close();

/* ---------- report ---------- */
const list = [...issues.values()].sort((a, b) => a.t0 - b.t0);
const fails = list.filter((i) => i.level === "FAIL" && !i.allowed);
const warns = list.filter((i) => i.level === "WARN" && !i.allowed);
const okd = list.filter((i) => i.allowed);
console.log(`textcheck: ${path.relative(process.cwd(), resolvePage(target))}, ${W}x${H}, ${samples} samples every ${step}s`);
for (const i of [...fails, ...warns]) {
  const when = i.t1 > i.t0 ? `${i.t0.toFixed(2)}–${i.t1.toFixed(2)}s` : `${i.t0.toFixed(2)}s`;
  console.log(`  ${i.level}  ${i.kind}: ${i.label}  at ${when} (${i.frames} samples)`);
}
if (okd.length) console.log(`  OK    ${okd.length} issue(s) inside --allow ranges`);
console.log(`text: ${fails.length ? "FAIL" : "PASS"} (${fails.length} fail, ${warns.length} warn)`);
process.exit(fails.length ? 1 : 0);
