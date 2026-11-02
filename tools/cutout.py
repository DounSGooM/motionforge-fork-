#!/usr/bin/env python3
# /// script
# requires-python = ">=3.9"
# dependencies = ["rembg>=2.0", "pillow>=10", "onnxruntime"]
# [tool.motionforge]
# needs = ["ffmpeg on PATH (only when the input is a video)"]
# ///
"""
cutout.py — remove the background from talking-head frames for the "pop-out" effect
(the head overlaps the top edge of the card the clip plays in).
© 2026 motionforge contributors, MIT

usage
  python3 tools/cutout.py <video.mp4 | frames_dir> <out_dir>
                          [--fps 30] [--start 0] [--duration 5]
                          [--crop X Y W H] [--auto-crop] [--pad 40]
                          [--model u2net_human_seg]

  input        a video (frames are extracted with ffmpeg) or a folder of PNG/JPG frames
  out_dir      receives 0001.png, 0002.png, ... (RGBA, transparent background)
  --crop       keep only this box (pixels in the source frame), e.g. the head + hair area
  --auto-crop  compute one box that holds the subject in EVERY frame (union of alpha bounds)
               plus --pad pixels, and crop all frames to it; prints the box so you can place
               the PNG sequence at the same offset in your composition
  --model      any rembg model; u2net_human_seg keeps hair edges best for people

notes
  * Speed is roughly 0.5–1.5 s per 1080p frame on CPU; cut only the seconds you need.
  * Models download on first use into $U2NET_HOME (default ~/.u2net). Set U2NET_HOME to keep them elsewhere.
  * Use this only on footage of people who agreed to be filmed and edited.
"""
import argparse
import glob
import json
import os
import subprocess
import sys
import tempfile


def extract_frames(video, dest, fps, start, duration):
    cmd = ["ffmpeg", "-y", "-loglevel", "error"]
    if start:
        cmd += ["-ss", str(start)]
    cmd += ["-i", video]
    if duration:
        cmd += ["-t", str(duration)]
    cmd += ["-vf", f"fps={fps}", os.path.join(dest, "%04d.png")]
    subprocess.run(cmd, check=True)


def union_box(images, pad, threshold=16):
    box = None
    for im in images:
        alpha = im.getchannel("A").point(lambda v: 255 if v > threshold else 0)
        b = alpha.getbbox()
        if not b:
            continue
        box = b if box is None else (min(box[0], b[0]), min(box[1], b[1]), max(box[2], b[2]), max(box[3], b[3]))
    if box is None:
        return None
    w, h = images[0].size
    return (max(0, box[0] - pad), max(0, box[1] - pad), min(w, box[2] + pad), min(h, box[3] + pad))


def main():
    ap = argparse.ArgumentParser(description="Background removal for talking-head frames (see the module docstring).")
    ap.add_argument("source")
    ap.add_argument("out_dir")
    ap.add_argument("--fps", type=float, default=30)
    ap.add_argument("--start", type=float, default=0)
    ap.add_argument("--duration", type=float, default=0)
    ap.add_argument("--crop", type=int, nargs=4, metavar=("X", "Y", "W", "H"))
    ap.add_argument("--auto-crop", action="store_true")
    ap.add_argument("--pad", type=int, default=40)
    ap.add_argument("--model", default="u2net_human_seg")
    args = ap.parse_args()

    try:
        from PIL import Image
        from rembg import new_session, remove
    except ImportError:
        sys.exit("cutout: needs rembg and pillow (pip install rembg pillow onnxruntime)")

    os.makedirs(args.out_dir, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        if os.path.isdir(args.source):
            frames = sorted(glob.glob(os.path.join(args.source, "*.png")) + glob.glob(os.path.join(args.source, "*.jpg")))
        else:
            extract_frames(args.source, tmp, args.fps, args.start, args.duration)
            frames = sorted(glob.glob(os.path.join(tmp, "*.png")))
        if not frames:
            sys.exit("cutout: no frames found")

        session = new_session(args.model)
        results = []
        for i, path in enumerate(frames, 1):
            im = Image.open(path).convert("RGB")
            if args.crop:
                x, y, w, h = args.crop
                im = im.crop((x, y, x + w, y + h))
            results.append(remove(im, session=session).convert("RGBA"))
            if i % 25 == 0 or i == len(frames):
                print(f"cutout: {i}/{len(frames)}", file=sys.stderr)

    box = None
    if args.auto_crop:
        box = union_box(results, args.pad)
        if box:
            results = [im.crop(box) for im in results]
    for i, im in enumerate(results, 1):
        im.save(os.path.join(args.out_dir, f"{i:04d}.png"))

    offset = {"x": 0, "y": 0}
    if args.crop:
        offset = {"x": args.crop[0], "y": args.crop[1]}
    if box:
        offset = {"x": offset["x"] + box[0], "y": offset["y"] + box[1]}
    info = {"frames": len(results), "fps": args.fps, "offset": offset, "size": list(results[0].size), "model": args.model}
    with open(os.path.join(args.out_dir, "cutout.json"), "w") as f:
        json.dump(info, f, indent=1)
    print(json.dumps(info))


if __name__ == "__main__":
    main()
