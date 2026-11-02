#!/usr/bin/env python3
# /// script
# requires-python = ">=3.9"
# dependencies = ["pillow>=10"]
# ///
"""
cover_safe_area.py — check that the text on a vertical cover stays where every app shows it.
© 2026 motionforge contributors, MIT

Profile grids crop a 9:16 cover to a centred 3:4 (or 1:1) window, and the app UI covers the top
and bottom of the full-screen view. For 1080x1920 the band that survives everywhere is roughly
y = 240 .. 1680 (scaled proportionally for other sizes).

usage
  python3 tools/cover_safe_area.py cover.png --boxes boxes.json [--top 240 --bottom 1680]
  python3 tools/cover_safe_area.py cover.png --detect [--debug overlay.png]

  --boxes FILE   exact mode: JSON list of text boxes [{"text": "...", "x0":..,"y0":..,"x1":..,"y1":..}]
                 in image pixels (export it from the page: window.TEXTS(t) or tools/textcheck.mjs --dump)
  --detect       heuristic mode, no OCR: finds rows outside the band that hold many sharp, high-contrast
                 edges (which is what text looks like) and reports them
  --margin PX    horizontal margin text must keep from the left/right edge (default 60, exact mode only)
  --debug FILE   write the image with the band and the flagged rows drawn on it

limits of --detect
  * It cannot tell text from other detail: a sharp photo, a logo or a striped shirt near the edges
    is flagged too, and thin, low-contrast or very blurred text can be missed.
  * Treat its result as "look here", not as proof. Prefer --boxes whenever the cover is built from
    a page you control.
exit codes: 0 inside, 1 something outside (or flagged), 2 usage error
"""
import argparse
import json
import sys


def band_for(height, top, bottom):
    k = height / 1920
    return round(top * k), round(bottom * k)


def check_boxes(width, height, boxes, top, bottom, margin):
    problems = []
    for b in boxes:
        name = (b.get("text") or b.get("id") or "?")[:40]
        if b["y0"] < top:
            problems.append(f'"{name}" starts at y={b["y0"]:.0f}, above the safe band (y >= {top})')
        if b["y1"] > bottom:
            problems.append(f'"{name}" ends at y={b["y1"]:.0f}, below the safe band (y <= {bottom})')
        if b["x0"] < margin or b["x1"] > width - margin:
            problems.append(f'"{name}" is within {margin}px of the side edge (x {b["x0"]:.0f}..{b["x1"]:.0f})')
    return problems


def detect_rows(image, top, bottom, edge_threshold=60, row_fraction=0.04, min_run=6):
    """Rows outside [top, bottom] where more than row_fraction of pixels are strong edges."""
    from PIL import ImageFilter

    gray = image.convert("L")
    edges = gray.filter(ImageFilter.FIND_EDGES).point(lambda v: 255 if v > edge_threshold else 0)
    w, h = edges.size
    px = edges.load()
    flagged, runs, start = [], [], None
    for y in range(h):
        if top <= y <= bottom:
            hot = False
        else:
            count = sum(1 for x in range(0, w, 2) if px[x, y])
            hot = count > row_fraction * (w / 2)
        if hot and start is None:
            start = y
        if not hot and start is not None:
            if y - start >= min_run:
                runs.append((start, y))
            start = None
    if start is not None and h - start >= min_run:
        runs.append((start, h))
    for a, b in runs:
        flagged.append(f"rows {a}-{b}: dense high-contrast detail {'above' if b <= top else 'below'} the safe band (text?)")
    return flagged, runs


def main():
    ap = argparse.ArgumentParser(description="Cover safe-area check (see the module docstring).")
    ap.add_argument("image")
    ap.add_argument("--boxes")
    ap.add_argument("--detect", action="store_true")
    ap.add_argument("--top", type=int, default=240, help="band top for a 1920 px tall image")
    ap.add_argument("--bottom", type=int, default=1680, help="band bottom for a 1920 px tall image")
    ap.add_argument("--margin", type=int, default=60)
    ap.add_argument("--debug")
    args = ap.parse_args()
    if not args.boxes and not args.detect:
        ap.error("give --boxes FILE or --detect")

    try:
        from PIL import Image, ImageDraw
    except ImportError:
        sys.exit("cover_safe_area: needs Pillow (pip install pillow)")

    image = Image.open(args.image).convert("RGB")
    w, h = image.size
    top, bottom = band_for(h, args.top, args.bottom)
    print(f"{args.image}: {w}x{h}, safe band y {top}..{bottom}")

    problems, runs = [], []
    if args.boxes:
        boxes = json.load(open(args.boxes, encoding="utf-8"))
        problems += check_boxes(w, h, boxes, top, bottom, args.margin)
    if args.detect:
        flagged, runs = detect_rows(image, top, bottom)
        problems += flagged

    if args.debug:
        dbg = image.copy()
        d = ImageDraw.Draw(dbg, "RGBA")
        d.rectangle([0, 0, w, top], fill=(255, 0, 0, 50))
        d.rectangle([0, bottom, w, h], fill=(255, 0, 0, 50))
        for a, b in runs:
            d.rectangle([0, a, w, b], outline=(255, 220, 0, 255), width=4)
        dbg.save(args.debug)
        print("debug image:", args.debug)

    for p in problems:
        print("  OUTSIDE  " + p)
    print("cover safe area:", "FAIL" if problems else "PASS")
    sys.exit(1 if problems else 0)


if __name__ == "__main__":
    main()
