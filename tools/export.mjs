#!/usr/bin/env node
/*
 * export.mjs — make other aspect ratios from one finished video (ffmpeg only)
 * © 2026 motionforge contributors, MIT
 *
 * usage
 *   node tools/export.mjs <video.mp4> [--formats 1:1,16:9,4:5] [--mode fill|crop] [--focus 0.5,0.4]
 *                                     [--out dir] [--crf 18] [--share]
 *
 *   --formats  any of 9:16 (1080x1920), 1:1 (1080x1080), 4:5 (1080x1350), 16:9 (1920x1080)
 *              default: 1:1,16:9
 *   --mode     fill (default): the whole frame stays visible, centred, on a blurred and darkened
 *                              copy of itself that fills the new frame. Nothing is lost.
 *              crop:           scale to cover the new frame and crop. Loses edges; pick the
 *                              point to keep with --focus.
 *   --focus    x,y fractions of the source to keep centred in crop mode (default 0.5,0.4 —
 *              slightly above centre, where faces and titles usually sit)
 *   --share    also write a smaller copy (CRF 26) of each output for messaging apps
 *
 * Output: <out>/<name>-<W>x<H>.mp4 with the audio stream copied unchanged.
 * A layout designed for 9:16 rarely reads well in 16:9; for important deliveries, re-render the
 * scenes at the new size instead (HyperFrames/canvas pages can read the size) and use this tool
 * for quick versions.
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const SIZES = { "9:16": [1080, 1920], "1:1": [1080, 1080], "4:5": [1080, 1350], "16:9": [1920, 1080] };

const argv = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = argv.indexOf("--" + name);
  return i >= 0 ? argv[i + 1] : fallback;
};
const input = argv[0];
if (!input || input.startsWith("--") || !fs.existsSync(input)) {
  console.error("usage: node tools/export.mjs <video.mp4> [--formats 1:1,16:9] [--mode fill|crop] [--focus 0.5,0.4] [--out dir]");
  process.exit(2);
}
const formats = opt("formats", "1:1,16:9").split(",");
const mode = opt("mode", "fill");
const [fx, fy] = opt("focus", "0.5,0.4").split(",").map(Number);
const crf = String(opt("crf", 18));
const outDir = opt("out", path.join(path.dirname(input), "exports"));
const base = path.basename(input, path.extname(input));
if (!["fill", "crop"].includes(mode)) { console.error("export: --mode must be fill or crop"); process.exit(2); }
for (const f of formats) if (!SIZES[f]) { console.error(`export: unknown format ${f} (use ${Object.keys(SIZES).join(", ")})`); process.exit(2); }
fs.mkdirSync(outDir, { recursive: true });

const run = (args) => {
  const r = spawnSync("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", ...args], { stdio: "inherit" });
  if (r.error?.code === "ENOENT") { console.error("export: ffmpeg is not on PATH"); process.exit(1); }
  return r.status === 0;
};

function filterFor(w, h) {
  if (mode === "crop") {
    // scale to cover, then crop around the focus point (clamped to the frame)
    return `[0:v]scale=${w}:${h}:force_original_aspect_ratio=increase,` +
      `crop=${w}:${h}:'min(max(iw*${fx}-${w}/2,0),iw-${w})':'min(max(ih*${fy}-${h}/2,0),ih-${h})',setsar=1[v]`;
  }
  // fill: blurred cover copy behind a fitted copy
  return `[0:v]split=2[a][b];` +
    `[a]scale=${w}:${h}:force_original_aspect_ratio=increase,crop=${w}:${h},boxblur=28:2,eq=brightness=-0.12:saturation=0.9[bg];` +
    `[b]scale=${w}:${h}:force_original_aspect_ratio=decrease[fg];` +
    `[bg][fg]overlay=(W-w)/2:(H-h)/2,setsar=1[v]`;
}

let failed = 0;
for (const f of formats) {
  const [w, h] = SIZES[f];
  const out = path.join(outDir, `${base}-${w}x${h}.mp4`);
  const ok = run(["-i", input, "-filter_complex", filterFor(w, h), "-map", "[v]", "-map", "0:a?", "-c:v", "libx264", "-preset", "slow",
    "-crf", crf, "-pix_fmt", "yuv420p", "-c:a", "copy", "-movflags", "+faststart", out]);
  if (!ok) { failed++; console.error(`export: ${f} failed`); continue; }
  console.log(`export: ${f} -> ${out}`);
  if (argv.includes("--share")) {
    const small = path.join(outDir, `${base}-${w}x${h}-share.mp4`);
    if (run(["-i", out, "-c:v", "libx264", "-preset", "slow", "-crf", "26", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", small])) {
      console.log(`export: ${f} share copy -> ${small}`);
    }
  }
}
process.exit(failed ? 1 : 0);
