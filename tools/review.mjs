#!/usr/bin/env node
/*
 * review.mjs — first-pass review of a finished video: sheets to look at + numbers to act on
 * © 2026 motionforge contributors, MIT
 *
 * usage
 *   node tools/review.mjs <video.mp4> [--out dir] [--every 1] [--dead-max 3] [--words words.json] [--safe 220,380,120]
 *
 * Writes into <out> (default <video dir>/review/):
 *   sheet.jpg     one frame every --every seconds, timestamped, phone-UI zones tinted red (vertical video)
 *   phone.jpg     one frame per second at 360 px wide — read every caption at this size
 *   report.json   all numbers below
 * Prints:
 *   OPENING      does the first second move? (a static first second loses the scroll)
 *   PACING       cuts, shot lengths, cuts per 10 s
 *   DEAD BEATS   stretches longer than --dead-max where the picture barely changes
 *   FLAT FRAMES  frames with almost no contrast (black/blank flashes)
 *   SOUND        integrated loudness, true peak, silence at the head/tail
 *   VOICE        (with --words) words per second and the longest pause
 * Exit: 0 no FAIL, 1 FAIL (flat frames, missing audio, peak > -1 dBTP), 2 usage error.
 * It does not replace looking: open sheet.jpg and phone.jpg every time.
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const argv = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = argv.indexOf("--" + name);
  return i >= 0 ? argv[i + 1] : fallback;
};
const video = argv[0];
if (!video || video.startsWith("--") || !fs.existsSync(video)) {
  console.error("usage: node tools/review.mjs <video.mp4> [--out dir] [--every 1] [--dead-max 3] [--words words.json]");
  process.exit(2);
}
const outDir = opt("out", path.join(path.dirname(video), "review"));
const every = Number(opt("every", 1));
const deadMax = Number(opt("dead-max", 3));
fs.mkdirSync(outDir, { recursive: true });

const ff = (args, opts = {}) => spawnSync("ffmpeg", ["-hide_banner", "-v", "error", ...args], { maxBuffer: 1 << 30, ...opts });
const probe = spawnSync("ffprobe", ["-v", "error", "-show_entries", "stream=codec_type,width,height,r_frame_rate:format=duration", "-of", "json", video], { encoding: "utf8" });
if (probe.error) { console.error("review: ffprobe is not on PATH"); process.exit(1); }
const meta = JSON.parse(probe.stdout);
const vs = meta.streams.find((s) => s.codec_type === "video");
const hasAudio = meta.streams.some((s) => s.codec_type === "audio");
const [num, den] = vs.r_frame_rate.split("/").map(Number);
const FPS = num / (den || 1), W = vs.width, H = vs.height, DUR = Number(meta.format.duration);
const vertical = H > W;
const report = { video, width: W, height: H, fps: FPS, duration: DUR, warnings: [], failures: [] };
const warn = (msg) => { report.warnings.push(msg); console.log("  WARN  " + msg); };
const fail = (msg) => { report.failures.push(msg); console.log("  FAIL  " + msg); };
console.log(`review: ${path.basename(video)} ${W}x${H} @ ${FPS.toFixed(2)} fps, ${DUR.toFixed(2)} s, audio: ${hasAudio ? "yes" : "no"}`);

/* ------------------------------------------------------------------ sheets */
{
  const [st, sb, sr] = opt("safe", "220,380,120").split(",").map((v) => Math.round((Number(v) * H) / 1920));
  const zones = vertical
    ? `drawbox=x=0:y=0:w=iw:h=${st}:color=red@0.25:t=fill,drawbox=x=0:y=ih-${sb}:w=iw:h=${sb}:color=red@0.25:t=fill,` +
      `drawbox=x=iw-${sr}:y=${st}:w=${sr}:h=ih-${st + sb}:color=red@0.18:t=fill,`
    : "";
  const cellW = vertical ? 270 : 400, cols = vertical ? 6 : 4;
  const rows = Math.max(1, Math.ceil(DUR / every / cols));
  const label = `drawtext=text='%{pts\\:hms}':x=12:y=12:fontsize=${Math.round(H / 32)}:fontcolor=white:box=1:boxcolor=black@0.6:boxborderw=8,`;
  const sheet = path.join(outDir, "sheet.jpg");
  const tail = `fps=1/${every},scale=${cellW}:-2,tile=${cols}x${rows}:padding=6:color=0x18181a`;
  let ok = ff(["-y", "-i", video, "-vf", `${zones}${label}${tail}`, "-frames:v", "1", "-q:v", "3", sheet]).status === 0;
  if (!ok) ok = ff(["-y", "-i", video, "-vf", `${zones}${tail}`, "-frames:v", "1", "-q:v", "3", sheet]).status === 0; // ffmpeg without drawtext
  console.log(ok ? `SHEET        ${sheet}` : "SHEET        failed");
  const phone = path.join(outDir, "phone.jpg");
  const prow = Math.max(1, Math.ceil(DUR / 6));
  ok = ff(["-y", "-i", video, "-vf", `fps=1,scale=360:-2,tile=6x${prow}:padding=4`, "-frames:v", "1", "-q:v", "3", phone]).status === 0;
  console.log(ok ? `PHONE        ${phone} (one frame a second at 360 px)` : "PHONE        failed");
}

/* ------------------------------------------------------------------ motion analysis on tiny grayscale frames */
const SW = 64, SH = Math.max(2, Math.round((SW * H) / W / 2) * 2), PX = SW * SH;
const raw = ff(["-i", video, "-vf", `scale=${SW}:${SH},format=gray`, "-f", "rawvideo", "-"]).stdout;
const frames = Math.floor(raw.length / PX);
const diff = (a, b) => {
  let s = 0;
  for (let i = 0; i < PX; i++) s += Math.abs(raw[a * PX + i] - raw[b * PX + i]);
  return s / PX;
};
const median = (xs) => { const s = [...xs].sort((a, b) => a - b); return s[Math.floor(s.length / 2)] ?? 0; };
const step = [0];
for (let f = 1; f < frames; f++) step.push(diff(f - 1, f));

console.log("\nOPENING");
{
  const n = Math.min(frames - 1, Math.round(FPS));
  const change = n > 0 ? diff(0, n) : 0;
  report.openingChange = change;
  if (change < 2) warn(`the first second barely changes (mean diff ${change.toFixed(2)}): start on motion, a bold word or a face`);
  else console.log(`  ok    first second changes (mean diff ${change.toFixed(2)})`);
}

console.log("\nPACING");
{
  const med = median(step.slice(1));
  const threshold = Math.max(18, med * 6);
  const cuts = [];
  for (let f = 1; f < frames; f++) if (step[f] > threshold && (!cuts.length || f - cuts[cuts.length - 1] > FPS * 0.2)) cuts.push(f);
  const bounds = [0, ...cuts, frames];
  const shots = bounds.slice(1).map((b, i) => (b - bounds[i]) / FPS);
  report.cuts = cuts.map((f) => +(f / FPS).toFixed(2));
  report.shots = { count: shots.length, mean: shots.reduce((a, b) => a + b, 0) / shots.length, shortest: Math.min(...shots), longest: Math.max(...shots) };
  console.log(`  ${cuts.length} hard cuts, ${shots.length} shots: mean ${report.shots.mean.toFixed(2)} s, shortest ${report.shots.shortest.toFixed(2)} s, longest ${report.shots.longest.toFixed(2)} s, ${((cuts.length / DUR) * 10).toFixed(1)} cuts / 10 s`);
  if (report.shots.longest > 8) warn(`a ${report.shots.longest.toFixed(1)} s shot without a cut — make sure something new happens inside it`);
}

console.log("\nDEAD BEATS");
{
  const lag = Math.max(1, Math.round(FPS / 2)), hop = Math.max(1, Math.round(FPS / 4));
  const pts = [];
  for (let f = lag; f < frames; f += hop) pts.push([f / FPS, diff(f - lag, f)]);
  const still = Math.max(0.6, 0.25 * median(pts.map((p) => p[1])));
  const runs = [];
  let start = null;
  for (const [t, d] of [...pts, [DUR, Infinity]]) {
    if (d < still && start === null) start = t;
    else if (d >= still && start !== null) { if (t - start >= deadMax) runs.push([start, t]); start = null; }
  }
  report.deadBeats = runs;
  for (const [a, b] of runs) warn(`${a.toFixed(1)}–${b.toFixed(1)} s: ${(b - a).toFixed(1)} s with nothing new on screen — add a move, a reveal or a cut`);
  if (!runs.length) console.log(`  ok    nothing static for ${deadMax} s or longer`);
}

console.log("\nFLAT FRAMES");
{
  const flat = [];
  for (let f = 0; f < frames; f++) {
    let lo = 255, hi = 0;
    for (let i = f * PX; i < (f + 1) * PX; i++) { const v = raw[i]; if (v < lo) lo = v; if (v > hi) hi = v; }
    if (hi - lo < 6) flat.push(f);
  }
  report.flatFrames = flat;
  // a dark first/last half second is usually a fade; a blank frame in the middle is a bug
  const edge = (f) => f < FPS * 0.5 || f >= frames - FPS * 0.5;
  const middle = flat.filter((f) => !edge(f));
  if (middle.length) fail(`${middle.length} flat frame(s) (blank/black) inside the video, first at ${(middle[0] / FPS).toFixed(2)} s`);
  if (flat.length - middle.length) warn(`${flat.length - middle.length} flat frame(s) in the first/last 0.5 s — fine for a fade, not for the opening frame of a hook`);
  if (!flat.length) console.log("  ok    none");
}

console.log("\nSOUND");
if (!hasAudio) {
  fail("no audio stream");
} else {
  const eb = spawnSync("ffmpeg", ["-hide_banner", "-nostats", "-i", video, "-vn", "-af", "ebur128=peak=true", "-f", "null", "-"], { encoding: "utf8" }).stderr || "";
  const summary = eb.slice(eb.lastIndexOf("Summary:"));
  const grab = (re) => { const m = summary.match(re); return m ? Number(m[1]) : null; };
  const I = grab(/I:\s+(-?[\d.]+) LUFS/), TP = grab(/Peak:\s+(-?[\d.]+) dBFS/), LRA = grab(/LRA:\s+(-?[\d.]+) LU/);
  report.loudness = { integrated: I, truePeak: TP, range: LRA };
  console.log(`  ${I} LUFS integrated, range ${LRA} LU, true peak ${TP} dBTP (target about -14 LUFS, peak <= -1)`);
  if (I !== null && (I < -17 || I > -12)) warn(`loudness ${I} LUFS is far from -14: run tools/loudness.sh normalize`);
  if (TP !== null && TP > -1) fail(`true peak ${TP} dBTP is above -1 dBTP (clips after platform encoding)`);
  const sd = spawnSync("ffmpeg", ["-hide_banner", "-nostats", "-i", video, "-vn", "-af", "silencedetect=noise=-45dB:d=0.6", "-f", "null", "-"], { encoding: "utf8" }).stderr || "";
  const starts = [...sd.matchAll(/silence_start: (-?[\d.]+)/g)].map((m) => Math.max(0, Number(m[1])));
  if (starts.some((s) => s < 0.05)) warn("the video opens with 0.6 s+ of silence — the voice or a sound should start at once");
}

const wordsFile = opt("words");
if (wordsFile) {
  console.log("\nVOICE");
  const words = JSON.parse(fs.readFileSync(wordsFile, "utf8"));
  const spoken = words.length ? words[words.length - 1].e - words[0].s : 0;
  let gap = 0, gapAt = 0;
  for (let i = 1; i < words.length; i++) if (words[i].s - words[i - 1].e > gap) { gap = words[i].s - words[i - 1].e; gapAt = words[i - 1].e; }
  const wps = spoken > 0 ? words.length / spoken : 0;
  report.voice = { words: words.length, wordsPerSecond: wps, longestPause: gap, longestPauseAt: gapAt, firstWordAt: words[0]?.s ?? null };
  console.log(`  ${words.length} words, ${wps.toFixed(2)} words/s, longest pause ${gap.toFixed(2)} s at ${gapAt.toFixed(2)} s, first word at ${(words[0]?.s ?? 0).toFixed(2)} s`);
  if (wps > 3.6) warn(`${wps.toFixed(2)} words/s is hard to follow with on-screen text; cut words or slow the voice`);
  if ((words[0]?.s ?? 0) > 0.5) warn(`the first word starts at ${words[0].s.toFixed(2)} s; the hook should be heard within 0.5 s`);
  if (gap > 1.2) warn(`a ${gap.toFixed(2)} s pause at ${gapAt.toFixed(2)} s — intended? fill it with a visual beat or tighten it`);
}

fs.writeFileSync(path.join(outDir, "report.json"), JSON.stringify(report, null, 1));
console.log(`\nreview: ${report.failures.length ? "FAIL" : "PASS"} (${report.failures.length} fail, ${report.warnings.length} warn) -> ${path.join(outDir, "report.json")}`);
process.exit(report.failures.length ? 1 : 0);
