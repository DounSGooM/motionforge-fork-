#!/usr/bin/env node
/*
 * motionforge page renderer — stills and MP4s from any seekable HTML page (Playwright + ffmpeg)
 * © 2026 motionforge contributors, MIT
 *
 * Works with two kinds of page:
 *   canvas contract   window.render(t), window.READY, window.DUR  (see engines/canvas/README.md)
 *   HyperFrames scene window.__timelines[id] (a paused GSAP timeline) + #root[data-duration]
 *
 * usage
 *   node engines/canvas/render.mjs info  <page>
 *   node engines/canvas/render.mjs still <page> <t> [<t> ...] [--every 0.5] [--out dir]
 *   node engines/canvas/render.mjs video <page> [--fps 30] [--workers 2] [--from 0] [--to DUR] [--out file.mp4]
 *
 *   <page>        a folder holding index.html, or an .html file
 *   --size WxH    viewport (default: window.SIZE, then #root data-width/height, then 1080x1920)
 *   --root DIR    folder served over HTTP (default: the page's folder). Use it when the page
 *                 imports files from a parent folder, e.g. --root . for /engines/canvas/lib.js
 *   --query k=v   appended to the page URL as ?k=v (pages can read options from location.search)
 *   --timeline ID which window.__timelines entry to seek (default "main", else the first one)
 *
 * Needs: npm i -D playwright && npx playwright install chromium ; ffmpeg on PATH for video.
 * Exit codes: 0 ok, 1 page or ffmpeg error, 2 usage error.
 *
 * Other tools import { openPage, seek, pageInfo, collectTexts } from this file.
 */
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawn, spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

/* ------------------------------------------------------------------ playwright */

export async function loadChromium() {
  // local install first, then a global one (npm i -g playwright)
  let globalRoot = null;
  try {
    globalRoot = execFileSync("npm", ["root", "-g"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    /* npm not on PATH */
  }
  const candidates = ["playwright", "playwright-core"];
  if (globalRoot) candidates.push(...candidates.map((n) => pathToFileURL(path.join(globalRoot, n, "index.mjs")).href));
  for (const name of candidates) {
    try {
      const mod = await import(name);
      return (mod.default ?? mod).chromium;
    } catch {
      /* try the next one */
    }
  }
  console.error("render: Playwright is not installed. Run: npm i -D playwright && npx playwright install chromium");
  process.exit(1);
}

/* ------------------------------------------------------------------ static server */

const MIME = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".webp": "image/webp", ".gif": "image/gif", ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf", ".otf": "font/otf",
  ".mp4": "video/mp4", ".webm": "video/webm", ".mp3": "audio/mpeg", ".wav": "audio/wav", ".glb": "model/gltf-binary", ".hdr": "application/octet-stream",
};

/** Serve `root` on 127.0.0.1 (random port). Fonts and ES modules need http://, not file://. */
export function serveDir(root) {
  const base = path.resolve(root);
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
    const file = path.resolve(base, "." + urlPath);
    if (file !== base && !file.startsWith(base + path.sep)) {
      res.writeHead(403).end();
      return;
    }
    fs.stat(file, (err, st) => {
      if (err || !st.isFile()) {
        res.writeHead(404).end();
        return;
      }
      res.writeHead(200, { "content-type": MIME[path.extname(file).toLowerCase()] ?? "application/octet-stream", "cache-control": "no-store" });
      fs.createReadStream(file).pipe(res);
    });
  });
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () => resolve({ server, port: server.address().port })));
}

/* ------------------------------------------------------------------ page helpers */

/** Resolve "<folder>" or "<file.html>" to an absolute html path. */
export function resolvePage(target) {
  if (!target) return null;
  const abs = path.resolve(target);
  const html = fs.existsSync(abs) && fs.statSync(abs).isDirectory() ? path.join(abs, "index.html") : abs;
  return fs.existsSync(html) ? html : null;
}

/**
 * Open a page and wait until it can be seeked.
 * Returns { browser, page, close }. Page errors are printed; `strict` makes them fatal.
 */
export async function openPage(target, { width = 1080, height = 1920, root, query = "", strict = true, timeoutMs = 120000 } = {}) {
  const html = resolvePage(target);
  if (!html) throw new Error(`no page at "${target}" (expected a folder with index.html or an .html file)`);
  const serveRoot = path.resolve(root ?? path.dirname(html));
  const rel = path.relative(serveRoot, html);
  if (rel.startsWith("..")) throw new Error(`--root ${serveRoot} does not contain ${html}`);

  const { server, port } = await serveDir(serveRoot);
  const chromium = await loadChromium();
  const browser = await chromium.launch({ args: ["--font-render-hinting=none", "--force-color-profile=srgb", "--autoplay-policy=no-user-gesture-required"] });
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, serviceWorkers: "block" });
  // Restrict scene HTML to its own ephemeral local server. Deny remote origins and other localhost ports.
  const allowedOrigin = `http://127.0.0.1:${port}`;
  await context.route("**/*", async (route) => {
    try {
      if (new URL(route.request().url()).origin === allowedOrigin) return await route.continue();
    } catch { /* malformed or non-HTTP resource: deny */ }
    await route.abort("blockedbyclient");
  });
  const page = await context.newPage();

  page.on("pageerror", (err) => {
    console.error("[page error]", err.message);
    if (strict) process.exitCode = 1;
  });
  page.on("console", (msg) => {
    if (msg.type() === "error") console.error("[page console]", msg.text().slice(0, 300));
  });
  page.on("response", (r) => {
    if (r.status() >= 400 && !r.url().endsWith("/favicon.ico")) console.error(`[page] ${r.status()} ${r.url()}`);
  });

  const url = `http://127.0.0.1:${port}/${rel.split(path.sep).map(encodeURIComponent).join("/")}${query ? "?" + query : ""}`;
  await page.goto(url, { waitUntil: "load" });
  await page.waitForFunction(
    () => window.READY === true || (window.READY === undefined && window.__timelines && Object.keys(window.__timelines).length > 0),
    null,
    { timeout: timeoutMs },
  );
  await page.evaluate(() => (document.fonts ? document.fonts.ready.then(() => true) : true));

  const close = async () => {
    await browser.close();
    server.close();
  };
  return { browser, page, close };
}

/** Seek the page to second t (canvas contract or HyperFrames timeline). */
export async function seek(page, t, timelineId = "main") {
  await page.evaluate(
    async ({ t, timelineId }) => {
      if (typeof window.render === "function") {
        await window.render(t);
        return;
      }
      const all = window.__timelines || {};
      const tl = all[timelineId] || all[Object.keys(all)[0]];
      if (!tl) throw new Error("page has neither window.render(t) nor window.__timelines");
      tl.seek(t, false);
    },
    { t, timelineId },
  );
}

/** { kind, duration, width, height } read from the page. */
export async function pageInfo(page, timelineId = "main") {
  return page.evaluate((timelineId) => {
    const root = document.querySelector("[data-composition-id]");
    const all = window.__timelines || {};
    const tl = all[timelineId] || all[Object.keys(all)[0]];
    const kind = typeof window.render === "function" ? "canvas" : tl ? "hyperframes" : "unknown";
    const duration = Number(window.DUR) || Number(root?.dataset.duration) || (tl ? tl.duration() : 0);
    const size = Array.isArray(window.SIZE) ? window.SIZE : [Number(root?.dataset.width) || 0, Number(root?.dataset.height) || 0];
    return { kind, duration, width: size[0] || innerWidth, height: size[1] || innerHeight };
  }, timelineId);
}

/**
 * Every text visible at the current position: [{ id, text, x0, y0, x1, y1 }] in viewport pixels.
 * Uses window.TEXTS(t) when the page provides it (canvas pages must, the DOM has no text there);
 * otherwise walks the DOM: text grouped by its nearest block-level element, hidden or almost
 * transparent text (opacity product < 0.05) skipped, boxes cut to what overflow-clipping parents
 * can show. Limits: text drawn inside <canvas>, <img>/<svg> images or video is invisible to this
 * walk; text covered by another opaque element still counts as visible.
 */
export async function collectTexts(page, t) {
  return page.evaluate((t) => {
    if (typeof window.TEXTS === "function") return window.TEXTS(t) || [];
    const visibleOpacity = (el) => {
      let o = 1;
      for (let e = el; e && e.nodeType === 1; e = e.parentElement) {
        const cs = getComputedStyle(e);
        if (cs.display === "none" || cs.visibility === "hidden") return 0;
        o *= Number(cs.opacity);
        if (o < 0.05) return 0;
      }
      return o;
    };
    const blockOf = (el) => {
      for (let e = el; e && e !== document.body; e = e.parentElement) {
        if (!getComputedStyle(e).display.startsWith("inline")) return e;
      }
      return document.body;
    };
    const pathOf = (el) => {
      if (el.id) return "#" + el.id;
      const parts = [];
      for (let e = el; e && e !== document.body; e = e.parentElement) {
        if (e.id) { parts.unshift("#" + e.id); break; }
        const idx = e.parentElement ? [...e.parentElement.children].indexOf(e) : 0;
        parts.unshift(`${e.tagName.toLowerCase()}:${idx}`);
      }
      return parts.join(">");
    };
    // the part of the viewport an element can actually show: intersect every overflow-clipping ancestor
    const clipBox = (el) => {
      let box = { x0: -Infinity, y0: -Infinity, x1: Infinity, y1: Infinity };
      for (let e = el; e && e !== document.documentElement; e = e.parentElement) {
        const cs = getComputedStyle(e);
        if (/(hidden|clip|auto|scroll)/.test(cs.overflowX + cs.overflowY)) {
          const r = e.getBoundingClientRect();
          box = { x0: Math.max(box.x0, r.left), y0: Math.max(box.y0, r.top), x1: Math.min(box.x1, r.right), y1: Math.min(box.y1, r.bottom) };
        }
      }
      return box;
    };
    const groups = new Map();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const text = node.textContent.replace(/\s+/g, " ").trim();
      if (!text) continue;
      const parent = node.parentElement;
      if (!parent || ["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE"].includes(parent.tagName)) continue;
      if (visibleOpacity(parent) === 0) continue;
      const range = document.createRange();
      range.selectNodeContents(node);
      const clip = clipBox(parent);
      const rects = [...range.getClientRects()]
        .map((r) => ({ left: Math.max(r.left, clip.x0), top: Math.max(r.top, clip.y0), right: Math.min(r.right, clip.x1), bottom: Math.min(r.bottom, clip.y1) }))
        .filter((r) => r.right - r.left > 1 && r.bottom - r.top > 1);
      if (!rects.length) continue;
      const block = blockOf(parent);
      const g = groups.get(block) || { id: pathOf(block), parts: [], x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity };
      g.parts.push(text);
      for (const r of rects) {
        g.x0 = Math.min(g.x0, r.left); g.y0 = Math.min(g.y0, r.top);
        g.x1 = Math.max(g.x1, r.right); g.y1 = Math.max(g.y1, r.bottom);
      }
      groups.set(block, g);
    }
    return [...groups.values()].map((g) => ({ id: g.id, text: g.parts.join(" "), x0: g.x0, y0: g.y0, x1: g.x1, y1: g.y1 }));
  }, t);
}

/* ------------------------------------------------------------------ CLI */

function parseArgs(argv) {
  const opts = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) opts[a.slice(2)] = argv[i + 1] !== undefined && !argv[i + 1].startsWith("--") ? argv[++i] : true;
    else opts._.push(a);
  }
  return opts;
}

function parseSize(value) {
  if (!value) return null;
  const m = /^(\d+)x(\d+)$/.exec(value);
  if (!m || +m[1] % 2 || +m[2] % 2) {
    console.error(`render: bad --size "${value}" (use WxH with even numbers, e.g. 1080x1920)`);
    process.exit(2);
  }
  return { width: +m[1], height: +m[2] };
}

/** Open the page at its declared size (probing once if --size was not given). */
async function openSized(target, opts) {
  const forced = parseSize(opts.size);
  const common = { root: opts.root, query: opts.query === true ? "" : opts.query || "" };
  let session = await openPage(target, { ...common, ...(forced ?? {}) });
  let info = await pageInfo(session.page, opts.timeline);
  if (!forced && (info.width !== 1080 || info.height !== 1920)) {
    await session.close();
    session = await openPage(target, { ...common, width: info.width, height: info.height });
    info = await pageInfo(session.page, opts.timeline);
  }
  if (forced) Object.assign(info, forced);
  return { session, info };
}

async function renderStills(target, opts) {
  const { session, info } = await openSized(target, opts);
  const times = opts._.slice(2).map(Number);
  if (opts.every) for (let t = 0; t <= info.duration + 1e-9; t += Number(opts.every)) times.push(Math.round(t * 1000) / 1000);
  if (!times.length || times.some((t) => !Number.isFinite(t))) {
    console.error("render: give one or more times in seconds, or --every <seconds>");
    process.exit(2);
  }
  const outDir = opts.out || path.join(path.dirname(resolvePage(target)), "stills");
  fs.mkdirSync(outDir, { recursive: true });
  for (const t of times) {
    await seek(session.page, t, opts.timeline);
    const file = path.join(outDir, `t_${t.toFixed(2)}.png`);
    await session.page.screenshot({ path: file });
    console.log(file);
  }
  await session.close();
}

async function encodeRange(session, { fromFrame, toFrame, fps, file, timeline }) {
  const ff = spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(fps), "-c:v", "mjpeg", "-i", "-",
    "-c:v", "libx264", "-preset", "medium", "-crf", "16", "-pix_fmt", "yuv420p", "-r", String(fps), file], { stdio: ["pipe", "inherit", "inherit"] });
  let failed = null;
  const closed = new Promise((resolve) => ff.on("close", resolve));
  ff.on("error", (e) => { failed = e.code === "ENOENT" ? "ffmpeg is not on PATH" : e.message; });
  ff.stdin.on("error", () => { failed = failed ?? "ffmpeg closed its input early"; });
  try {
    for (let f = fromFrame; f < toFrame && !failed; f++) {
      await seek(session.page, f / fps, timeline);
      const jpg = await session.page.screenshot({ type: "jpeg", quality: 95 });
      if (failed) break;
      if (!ff.stdin.write(jpg)) await Promise.race([new Promise((r) => ff.stdin.once("drain", r)), closed]);
    }
  } finally {
    ff.stdin.end();
  }
  const code = await closed;
  if (failed || code !== 0) throw new Error(failed ?? `ffmpeg exit code ${code}`);
}

async function renderVideo(target, opts) {
  const fps = Number(opts.fps ?? 30);
  const workers = Math.max(1, Math.min(8, Number(opts.workers ?? 2)));
  if (!(fps > 0)) { console.error("render: --fps must be > 0"); process.exit(2); }
  const html = resolvePage(target);
  const out = path.resolve(opts.out || path.join(path.dirname(html), "renders", "video.mp4"));
  fs.mkdirSync(path.dirname(out), { recursive: true });

  const probe = await openSized(target, opts);
  const { info } = probe;
  await probe.session.close();
  if (!(info.duration > 0)) { console.error("render: the page reports no duration (set window.DUR or #root data-duration)"); process.exit(1); }

  const start = Math.round(Number(opts.from ?? 0) * fps);
  const end = Math.round(Number(opts.to ?? info.duration) * fps);
  const per = Math.ceil((end - start) / workers);
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "mf-render-"));
  const sizeOpts = { ...opts, size: `${info.width}x${info.height}` };
  const t0 = Date.now();
  console.log(`render: ${info.kind} page, ${info.width}x${info.height}, frames ${start}..${end - 1} @ ${fps} fps, ${workers} worker(s)`);

  try {
    const parts = [];
    await Promise.all(
      [...Array(workers)].map(async (_, w) => {
        const a = start + w * per;
        const b = Math.min(end, a + per);
        if (a >= b) return;
        const file = path.join(tmp, `part_${w}.mp4`);
        parts[w] = file;
        const { session } = await openSized(target, sizeOpts);
        try {
          await encodeRange(session, { fromFrame: a, toFrame: b, fps, file, timeline: opts.timeline });
        } finally {
          await session.close();
        }
      }),
    );
    const list = path.join(tmp, "parts.txt");
    fs.writeFileSync(list, parts.filter(Boolean).map((p) => `file '${path.basename(p)}'`).join("\n"));
    const join = spawnSync("ffmpeg", ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", "parts.txt", "-c", "copy", "-movflags", "+faststart", "joined.mp4"], { cwd: tmp, stdio: "inherit" });
    if (join.status !== 0) throw new Error("ffmpeg could not join the parts");
    fs.copyFileSync(path.join(tmp, "joined.mp4"), out);
    console.log(`render: wrote ${out} (${end - start} frames, ${((Date.now() - t0) / 1000).toFixed(1)} s)`);
  } catch (err) {
    console.error("render: failed —", err.message);
    process.exitCode = 1;
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const [cmd, target] = opts._;
  if (!["info", "still", "video"].includes(cmd) || !resolvePage(target)) {
    console.error("usage: node engines/canvas/render.mjs info|still|video <page> [options]  (see the header of this file)");
    process.exit(2);
  }
  if (cmd === "info") {
    const { session, info } = await openSized(target, opts);
    console.log(JSON.stringify(info, null, 2));
    await session.close();
  } else if (cmd === "still") {
    await renderStills(target, opts);
  } else {
    await renderVideo(target, opts);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    console.error("render:", err.message);
    process.exit(1);
  });
}
