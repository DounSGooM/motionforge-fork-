import assert from "node:assert/strict";
import { test } from "node:test";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sceneTool = path.join(root, "engines/hyperframes/scripts/new-scene.sh");
const renderer = path.join(root, "engines/canvas/render.mjs");
const run = (command, args, options = {}) => {
  const result = spawnSync(command, args, {
    cwd: root, encoding: "utf8", timeout: 120000, maxBuffer: 5 * 1024 * 1024,
    ...options,
  });
  assert.equal(result.error, undefined, String(result.error));
  assert.equal(result.status, 0, `${command} ${args.join(" ")} failed:\n${result.stdout}\n${result.stderr}`);
  return result.stdout;
};

test("real starter scene renders deterministic stills and an H.264 MP4 with network restrictions enabled", {timeout: 180000}, () => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), "mf-render-e2e-"));
  try {
    run("bash", [sceneTool, "scene", "--dest", temp]);
    const scene = path.join(temp, "scene");
    assert.ok(fs.statSync(path.join(scene, "assets/vendor/gsap.min.js")).size > 10000,
      "GSAP must be copied from the installed npm package; a missing dependency invalidates this test");

    const metadata = JSON.parse(run("node", [renderer, "info", scene]));
    assert.equal(metadata.kind, "hyperframes");
    assert.equal(metadata.duration, 5);

    const stillDir = path.join(temp, "stills");
    run("node", [renderer, "still", scene, "0.2", "2.5", "--size", "320x568", "--out", stillDir]);
    const image0 = fs.readFileSync(path.join(stillDir, "t_0.20.png"));
    const image1 = fs.readFileSync(path.join(stillDir, "t_2.50.png"));
    assert.ok(image0.length > 500, "first still should contain meaningful image data");
    assert.ok(image1.length > 500, "second still should contain meaningful image data");
    assert.notDeepEqual(image0, image1, "a real animation must change frames over time");

    const mp4 = path.join(temp, "smoke.mp4");
    run("node", [renderer, "video", scene, "--size", "320x568", "--from", "0", "--to", "1",
      "--fps", "8", "--workers", "2", "--out", mp4]);
    assert.ok(fs.statSync(mp4).size > 1000, "video cannot be empty");
    const probe = JSON.parse(run("ffprobe", ["-v", "error", "-select_streams", "v:0",
      "-show_entries", "stream=codec_name,width,height,nb_frames", "-of", "json", mp4]));
    const video = probe.streams[0];
    assert.equal(video.codec_name, "h264");
    assert.equal(video.width, 320);
    assert.equal(video.height, 568);
    assert.equal(Number(video.nb_frames), 8, "8 frames for one second at 8fps");
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
});
