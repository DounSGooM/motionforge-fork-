#!/usr/bin/env python3
# /// script
# requires-python = ">=3.9"
# dependencies = ["pillow>=10"]
# [tool.motionforge]
# needs = ["ffmpeg + ffprobe on PATH"]
# ///
"""
contact_sheet.py — one image with N frames of a video, each labelled with its timestamp.
Look at it before every delivery: overlapping or cut-off text, empty scenes, missing letters.
© 2026 motionforge contributors, MIT

usage
  python3 tools/contact_sheet.py <video.mp4> [--n 12 | --every 1.5] [--cols 4] [--width 300]
                                 [--out sheet.jpg] [--guide 3:4] [--safe 240,1680]

  --n N          N frames spread evenly (default 12; first at 0.25 s, last 0.25 s before the end)
  --every S      one frame every S seconds instead of --n
  --cols C       frames per row (default 4)
  --width W      width of one cell in px (default 300; 360 is "phone size")
  --guide 3:4    draw the centred crop a profile grid shows (3:4 for Instagram, 1:1 also works)
  --safe A,B     draw horizontal lines at source y = A and y = B (e.g. 240,1680 for 1080x1920)
  --out FILE     default: <video>-sheet.jpg
"""
import argparse
import os
import subprocess
import sys
import tempfile


def probe(video):
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height:format=duration",
         "-of", "default=noprint_wrappers=1", video],
        capture_output=True, text=True, check=True,
    ).stdout
    info = dict(line.split("=", 1) for line in out.strip().splitlines() if "=" in line)
    return int(info["width"]), int(info["height"]), float(info["duration"])


def grab(video, t, dest):
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", f"{t:.3f}", "-i", video, "-frames:v", "1", dest], check=True)


def stamp(seconds):
    m, s = divmod(seconds, 60)
    return f"{int(m)}:{s:05.2f}"


def main():
    ap = argparse.ArgumentParser(description="Contact sheet of a video (see the module docstring).")
    ap.add_argument("video")
    ap.add_argument("--n", type=int, default=12)
    ap.add_argument("--every", type=float)
    ap.add_argument("--cols", type=int, default=4)
    ap.add_argument("--width", type=int, default=300)
    ap.add_argument("--out")
    ap.add_argument("--guide", help="crop guide aspect, e.g. 3:4 or 1:1")
    ap.add_argument("--safe", help="two source y values, e.g. 240,1680")
    args = ap.parse_args()

    try:
        from PIL import Image, ImageDraw, ImageFont
    except ImportError:
        sys.exit("contact_sheet: needs Pillow (pip install pillow)")

    w, h, dur = probe(args.video)
    if args.every:
        times, t = [], 0.0
        while t < dur - 0.05:
            times.append(t)
            t += args.every
    else:
        n = max(1, args.n)
        a, b = min(0.25, dur / 4), max(0.0, dur - 0.25)
        times = [a + (b - a) * i / max(1, n - 1) for i in range(n)]

    cell_w = args.width
    cell_h = round(cell_w * h / w)
    scale = cell_w / w
    label_h = 30
    cols = max(1, min(args.cols, len(times)))
    rows = (len(times) + cols - 1) // cols
    gap = 8
    sheet = Image.new("RGB", (cols * (cell_w + gap) + gap, rows * (cell_h + label_h + gap) + gap), (24, 24, 26))
    draw = ImageDraw.Draw(sheet)
    try:
        font = ImageFont.load_default(size=20)
    except TypeError:  # Pillow < 10.1
        font = ImageFont.load_default()

    guide = None
    if args.guide:
        gw, gh = (float(x) for x in args.guide.split(":"))
        if w / h < gw / gh:  # frame is narrower than the guide: guide spans the width
            box_w, box_h = w, w * gh / gw
        else:
            box_w, box_h = h * gw / gh, h
        guide = ((w - box_w) / 2 * scale, (h - box_h) / 2 * scale, (w + box_w) / 2 * scale, (h + box_h) / 2 * scale)
    safe = [float(v) * scale for v in args.safe.split(",")] if args.safe else []

    with tempfile.TemporaryDirectory() as tmp:
        for i, t in enumerate(times):
            path = os.path.join(tmp, f"f{i:03d}.png")
            grab(args.video, t, path)
            frame = Image.open(path).convert("RGB").resize((cell_w, cell_h), Image.LANCZOS)
            fd = ImageDraw.Draw(frame)
            if guide:
                fd.rectangle(guide, outline=(255, 210, 0), width=2)
            for y in safe:
                fd.line([(0, y), (cell_w, y)], fill=(255, 70, 70), width=2)
            x0 = gap + (i % cols) * (cell_w + gap)
            y0 = gap + (i // cols) * (cell_h + label_h + gap)
            sheet.paste(frame, (x0, y0 + label_h))
            draw.text((x0 + 4, y0 + 4), f"{i + 1:>2}  {stamp(t)}", fill=(235, 235, 235), font=font)

    out = args.out or os.path.splitext(args.video)[0] + "-sheet.jpg"
    sheet.save(out, quality=88)
    print(out)


if __name__ == "__main__":
    main()
