#!/usr/bin/env python3
"""motionforge brand-kit helper (standard library only).

Two jobs:

  extract  Draft a brand.json from evidence: CSS files, a local front-end folder, an HTML file, or a URL.
           Every value records where it came from; anything not found stays null and is listed in "missing".
           Nothing is invented. Review the draft with the user before using it.

  check    Validate a brand.json: required fields, hex colors, WCAG contrast of the key pairs,
           font licenses, logo files on disk, watermark and outro settings.

Usage:
  python3 brand.py extract --css site.css --css theme.css -o brand/brand.json
  python3 brand.py extract --repo ../my-app/web -o brand/brand.json
  python3 brand.py extract --url https://example.com -o brand/brand.json
  python3 brand.py check brand/brand.json

Exit codes: 0 ok, 1 check found FAIL, 2 bad input.
"""
from __future__ import annotations

import argparse
import colorsys
import json
import os
import re
import sys
import urllib.parse
import urllib.request
from collections import Counter
from html.parser import HTMLParser

MAX_BYTES = 2_000_000
MAX_SHEETS = 30
TIMEOUT = 15
CORNERS = {"top-left", "top-right", "bottom-left", "bottom-right"}
SKIP_DIRS = {"node_modules", ".git", "dist", "build", ".next", "out", "coverage", "vendor"}

# ---------------------------------------------------------------- colors

NAMED = {"white": "#FFFFFF", "black": "#000000", "transparent": None}
HEX_RE = re.compile(r"#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b")
FUNC_RE = re.compile(r"(rgba?|hsla?)\(\s*([^)]*)\)", re.I)


def norm_hex(h: str) -> str | None:
    h = h.strip().lstrip("#")
    if len(h) in (3, 4):
        h = "".join(c * 2 for c in h[:3])
    elif len(h) in (6, 8):
        h = h[:6]
    else:
        return None
    return "#" + h.upper()


def parse_color(value: str) -> str | None:
    value = value.strip()
    m = HEX_RE.search(value)
    if m:
        return norm_hex(m.group(0))
    m = FUNC_RE.search(value)
    if m:
        kind = m.group(1).lower()
        parts = [p for p in re.split(r"[\s,/]+", m.group(2).strip()) if p]
        if len(parts) < 3:
            return None
        try:
            if kind.startswith("rgb"):
                rgb = [float(p[:-1]) * 2.55 if p.endswith("%") else float(p) for p in parts[:3]]
            else:
                hue = float(re.sub(r"deg$", "", parts[0]))
                s = float(parts[1].rstrip("%")) / 100
                lum = float(parts[2].rstrip("%")) / 100
                r, g, b = colorsys.hls_to_rgb((hue % 360) / 360, lum, s)
                rgb = [r * 255, g * 255, b * 255]
        except ValueError:
            return None
        return "#" + "".join(f"{max(0, min(255, round(c))):02X}" for c in rgb)
    low = value.lower()
    if low in NAMED:
        return NAMED[low]
    return None


def rel_lum(hex_color: str) -> float:
    h = hex_color.lstrip("#")
    out = []
    for i in (0, 2, 4):
        c = int(h[i:i + 2], 16) / 255
        out.append(c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4)
    return 0.2126 * out[0] + 0.7152 * out[1] + 0.0722 * out[2]


def contrast(a: str, b: str) -> float:
    la, lb = sorted((rel_lum(a), rel_lum(b)), reverse=True)
    return (la + 0.05) / (lb + 0.05)


def saturation(hex_color: str) -> float:
    h = hex_color.lstrip("#")
    r, g, b = (int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))
    return colorsys.rgb_to_hls(r, g, b)[2]

# ---------------------------------------------------------------- evidence collection


class Evidence:
    def __init__(self) -> None:
        self.vars: dict[str, tuple[str, str]] = {}          # --name -> (raw value, source)
        self.colors: Counter[str] = Counter()               # hex -> uses
        self.color_src: dict[str, str] = {}
        self.decl: list[tuple[str, str, str, str]] = []     # (selector, prop, value, source)
        self.fonts: Counter[str] = Counter()
        self.font_src: dict[str, str] = {}
        self.font_faces: set[str] = set()
        self.logos: list[tuple[int, str, str]] = []         # (score, path/url, source)
        self.meta: dict[str, str] = {}

    def add_css(self, css: str, source: str) -> None:
        css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
        for m in re.finditer(r"@font-face\s*{([^}]*)}", css, re.I):
            fam = re.search(r"font-family\s*:\s*([^;]+)", m.group(1), re.I)
            if fam:
                self.font_faces.add(clean_family(fam.group(1)))
        for block in re.finditer(r"([^{}@]+){([^{}]*)}", css):
            selector = " ".join(block.group(1).split())[:120]
            for prop, value in re.findall(r"([-\w]+)\s*:\s*([^;]+)", block.group(2)):
                prop = prop.strip().lower()
                value = value.strip()
                if prop.startswith("--"):
                    self.vars.setdefault(prop, (value, f"{source} {selector}"))
                self.decl.append((selector, prop, value, source))
                if prop in ("font-family", "font") or prop.startswith("--font"):
                    fam = clean_family(value.split(",")[0] if prop != "font" else value.split(",")[0].split()[-1])
                    if fam and not fam.startswith("var("):
                        self.fonts[fam] += 1
                        self.font_src.setdefault(fam, f"{source} {selector}")
                for hit in list(HEX_RE.finditer(value)) + list(FUNC_RE.finditer(value)):
                    hx = parse_color(hit.group(0))
                    if hx:
                        self.colors[hx] += 1
                        self.color_src.setdefault(hx, f"{source} {selector} {prop}")

    def resolve(self, value: str, depth: int = 0) -> str | None:
        m = re.search(r"var\(\s*(--[\w-]+)\s*(?:,\s*([^)]+))?\)", value)
        if m and depth < 8:
            name, fallback = m.group(1), m.group(2)
            if name in self.vars:
                return self.resolve(self.vars[name][0], depth + 1)
            return self.resolve(fallback, depth + 1) if fallback else None
        return parse_color(value)


def clean_family(s: str) -> str:
    return s.strip().strip("'\"").strip()


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.sheets: list[str] = []
        self.inline_css: list[str] = []
        self.meta: dict[str, str] = {}
        self.logos: list[tuple[int, str]] = []
        self.fonts_links: list[str] = []
        self._in_style = False
        self._in_header = 0
        self.title = ""
        self._in_title = False

    def handle_starttag(self, tag, attrs):
        a = {k: (v or "") for k, v in attrs}
        if tag == "link":
            rel = a.get("rel", "").lower()
            href = a.get("href", "")
            if "stylesheet" in rel and href:
                (self.fonts_links if "fonts.googleapis.com" in href else self.sheets).append(href)
            if "icon" in rel and href:
                self.logos.append((1, href))
        elif tag == "meta":
            key = (a.get("name") or a.get("property") or "").lower()
            if key in ("theme-color", "og:image", "og:site_name", "description", "og:title"):
                self.meta[key] = a.get("content", "")
        elif tag == "style":
            self._in_style = True
        elif tag in ("header", "nav"):
            self._in_header += 1
        elif tag == "title":
            self._in_title = True
        elif tag == "img":
            blob = " ".join([a.get("src", ""), a.get("alt", ""), a.get("class", ""), a.get("id", "")]).lower()
            if "logo" in blob or "brand" in blob:
                self.logos.append((5 + (3 if self._in_header else 0), a.get("src", "")))
        if a.get("style"):
            self.inline_css.append("x{" + a["style"] + "}")

    def handle_endtag(self, tag):
        if tag == "style":
            self._in_style = False
        elif tag in ("header", "nav") and self._in_header:
            self._in_header -= 1
        elif tag == "title":
            self._in_title = False

    def handle_data(self, data):
        if self._in_style:
            self.inline_css.append(data)
        elif self._in_title:
            self.title += data.strip()


def fetch(url: str) -> str:
    if urllib.parse.urlparse(url).scheme not in ("http", "https"):
        raise ValueError(f"only http(s) URLs are allowed: {url}")
    req = urllib.request.Request(url, headers={"User-Agent": "motionforge-brand-kit/0.1"})
    with urllib.request.urlopen(req, timeout=TIMEOUT) as r:  # noqa: S310 (scheme checked above)
        return r.read(MAX_BYTES).decode("utf-8", errors="replace")


def collect_html(html: str, base: str, ev: Evidence, warnings: list[str], remote: bool) -> None:
    p = PageParser()
    p.feed(html)
    ev.meta.update(p.meta)
    if p.title:
        ev.meta["title"] = p.title
    for css in p.inline_css:
        ev.add_css(css, f"{base} <style>")
    for href in p.sheets[:MAX_SHEETS]:
        src = urllib.parse.urljoin(base, href)
        try:
            css = fetch(src) if remote else open(resolve_local(base, href), encoding="utf-8", errors="replace").read()
            ev.add_css(css, src)
        except Exception as exc:  # network or file errors are reported, not fatal
            warnings.append(f"stylesheet not read: {src} ({exc.__class__.__name__})")
    for link in p.fonts_links:
        for fam in re.findall(r"family=([^&:]+)", link):
            name = urllib.parse.unquote_plus(fam)
            ev.fonts[name] += 3
            ev.font_src.setdefault(name, f"{base} Google Fonts link")
    for score, src in p.logos:
        ev.logos.append((score, urllib.parse.urljoin(base, src), base))
    if "og:image" in p.meta:
        ev.logos.append((0, urllib.parse.urljoin(base, p.meta["og:image"]), "og:image"))


def resolve_local(base: str, href: str) -> str:
    return os.path.normpath(os.path.join(os.path.dirname(base), href.split("?")[0]))


def collect_repo(root: str, ev: Evidence, warnings: list[str]) -> None:
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS and not d.startswith(".")]
        for fn in filenames:
            path = os.path.join(dirpath, fn)
            low = fn.lower()
            try:
                if low.endswith((".css", ".scss")) and os.path.getsize(path) < MAX_BYTES:
                    ev.add_css(open(path, encoding="utf-8", errors="replace").read(), path)
                elif re.search(r"(logo|brand|wordmark|mark)", low) and low.endswith((".svg", ".png", ".webp", ".jpg")):
                    ev.logos.append((6 if low.endswith(".svg") else 4, path, "file name"))
                elif low == "package.json":
                    data = json.load(open(path, encoding="utf-8"))
                    if data.get("name"):
                        ev.meta.setdefault("package", data["name"])
                    for dep in data.get("dependencies", {}):
                        if dep.startswith("@fontsource/"):
                            fam = dep.split("/", 1)[1].replace("-", " ").title()
                            ev.fonts[fam] += 3
                            ev.font_src.setdefault(fam, f"{path} dependency {dep}")
            except (OSError, ValueError) as exc:
                warnings.append(f"skipped {path} ({exc.__class__.__name__})")

# ---------------------------------------------------------------- draft


ROLE_HINTS = {
    "bg": ("background", "bg", "surface", "paper", "canvas", "base"),
    "ink": ("foreground", "fg", "text", "ink", "body-color", "content"),
    "accent": ("primary", "brand", "accent", "cta", "highlight", "action"),
    "accent_2": ("secondary", "accent-2", "accent2", "tertiary"),
    "muted": ("muted", "subtle", "gray", "grey", "neutral"),
    "line": ("border", "line", "divider", "stroke", "outline"),
}


def pick_role(ev: Evidence, role: str, used: set[str]) -> tuple[str | None, str | None]:
    best: tuple[float, str, str] | None = None
    for name, (raw, src) in ev.vars.items():
        hx = ev.resolve(raw)
        if not hx or hx in used:
            continue
        key = name.lower()
        score = 0.0
        for i, hint in enumerate(ROLE_HINTS[role]):
            if hint in key:
                score = max(score, 10 - i)
        if not score:
            continue
        if role in ("accent", "accent_2"):
            score += 4 * saturation(hx)
        score += min(ev.colors.get(hx, 0), 20) / 10
        if best is None or score > best[0]:
            best = (score, hx, f"CSS variable {name} ({src})")
    if best:
        return best[1], best[2]
    # fall back to declarations on root/body
    if role in ("bg", "ink"):
        props = ("background-color", "background") if role == "bg" else ("color",)
        for selector, prop, value, src in ev.decl:
            if prop in props and re.search(r"(^|[\s,])(:root|html|body)\b", selector):
                hx = ev.resolve(value)
                if hx and hx not in used:
                    return hx, f"{prop} on {selector} ({src})"
    if role == "accent":
        cands = sorted((c for c in ev.colors if c not in used and saturation(c) > 0.45),
                       key=lambda c: (-ev.colors[c], c))
        if cands:
            return cands[0], f"most used saturated color ({ev.colors[cands[0]]} uses) - heuristic, confirm"
    return None, None


def draft(ev: Evidence, warnings: list[str]) -> dict:
    colors: dict[str, dict | None] = {}
    used: set[str] = set()
    for role in ("bg", "ink", "accent", "accent_2", "muted", "line"):
        hx, src = pick_role(ev, role, used)
        if hx:
            used.add(hx)
            colors[role] = {"hex": hx, "name": None, "use": None, "source": src}
        else:
            colors[role] = None
    if not (colors.get("bg") and colors.get("ink")) and ev.meta.get("theme-color"):
        warnings.append(f"theme-color meta is {ev.meta['theme-color']}; consider it for bg or accent")

    fams = [f for f, _ in ev.fonts.most_common() if f.lower() not in
            ("inherit", "initial", "sans-serif", "serif", "monospace", "system-ui", "-apple-system")]
    mono = next((f for f in fams if re.search(r"mono|code|courier", f, re.I)), None)
    text = [f for f in fams if f != mono]

    def font(fam, fallback="sans-serif"):
        if not fam:
            return None
        return {"family": fam, "weights": [], "license": None, "files": [],
                "fallback": fallback, "source": ev.font_src.get(fam)}

    logos = sorted(ev.logos, key=lambda x: -x[0])
    brand = {
        "$schema": "motionforge/brand@1",
        "name": ev.meta.get("og:site_name") or ev.meta.get("title") or ev.meta.get("package"),
        "colors": colors,
        "gradients": [],
        "fonts": {"display": font(text[0] if text else None),
                  "body": font(text[1] if len(text) > 1 else (text[0] if text else None)),
                  "mono": font(mono, "monospace")},
        "logo": {"primary_on_dark": None, "primary_on_light": None, "icon": None,
                 "candidates": [{"path": p, "source": s} for _, p, s in logos[:8]]},
        "watermark": None,
        "outro": None,
        "voice": {"register": None, "tone": [], "cta": None, "words_prefer": [], "words_avoid": []},
        "do": [],
        "dont": [],
        "evidence": {"description": ev.meta.get("description"), "title": ev.meta.get("title"),
                     "color_counts": dict(ev.colors.most_common(12))},
    }
    missing = [f"colors.{k}" for k, v in colors.items() if v is None]
    missing += [f"fonts.{k}" for k, v in brand["fonts"].items() if v is None]
    missing += ["fonts.*.license", "logo (pick from candidates)", "voice", "outro", "watermark"]
    brand["missing"] = missing
    brand["warnings"] = warnings
    return brand

# ---------------------------------------------------------------- check


def check(path: str) -> int:
    try:
        b = json.load(open(path, encoding="utf-8"))
    except (OSError, ValueError) as exc:
        print(f"FAIL  cannot read {path}: {exc}")
        return 2
    base = os.path.dirname(os.path.abspath(path))
    results: list[tuple[str, str]] = []

    def res(level, msg):
        results.append((level, msg))

    if not b.get("name"):
        res("FAIL", "name is missing")
    colors = b.get("colors") or {}
    for role in ("bg", "ink", "accent"):
        c = colors.get(role)
        if not c or not isinstance(c, dict) or not c.get("hex"):
            res("FAIL", f"colors.{role} is missing")
    hexes = {}
    for role, c in colors.items():
        if isinstance(c, dict) and c.get("hex"):
            hx = norm_hex(c["hex"]) if HEX_RE.fullmatch(c["hex"]) else None
            if not hx:
                res("FAIL", f"colors.{role}.hex is not a hex color: {c['hex']}")
            else:
                hexes[role] = hx
            if not c.get("use"):
                res("WARN", f"colors.{role} has no 'use' (say what this color means)")
    pairs = [("ink", "bg", 4.5), ("accent", "bg", 3.0)]
    if "surface" in hexes:
        pairs.append(("ink", "surface", 4.5))
    if "bg_light" in hexes and "ink_on_light" in hexes:
        pairs.append(("ink_on_light", "bg_light", 4.5))
    for fg, bg, need in pairs:
        if fg in hexes and bg in hexes:
            r = contrast(hexes[fg], hexes[bg])
            res("PASS" if r >= need else "WARN", f"contrast {fg}/{bg} = {r:.2f}:1 (needs {need}:1)")
    for g in b.get("gradients") or []:
        if len(g.get("stops", [])) < 2:
            res("FAIL", f"gradient {g.get('name')} needs at least two stops")
    for slot, f in (b.get("fonts") or {}).items():
        if not f:
            res("WARN" if slot == "mono" else "FAIL", f"fonts.{slot} is missing")
            continue
        if not f.get("license"):
            res("FAIL", f"fonts.{slot} ({f.get('family')}) has no license; ship only fonts you may redistribute")
        for fp in f.get("files") or []:
            if not os.path.exists(os.path.join(base, fp)):
                res("WARN", f"font file not found: {fp}")
        if f.get("subsets") is not None and "latin-ext" not in f["subsets"]:
            res("WARN", f"fonts.{slot} has no latin-ext subset (Turkish, Polish, Czech… will fall back)")
    logo = b.get("logo") or {}
    for key in ("primary_on_dark", "primary_on_light", "icon"):
        fp = logo.get(key)
        if not fp:
            res("WARN", f"logo.{key} not set")
        elif not re.match(r"https?://", fp) and not os.path.exists(os.path.join(base, fp)):
            res("FAIL", f"logo.{key} file not found: {fp}")
    wm = b.get("watermark")
    if wm:
        if wm.get("corner") not in CORNERS:
            res("FAIL", f"watermark.corner must be one of {sorted(CORNERS)}")
        if not 0 < float(wm.get("opacity", 0)) <= 1:
            res("FAIL", "watermark.opacity must be in (0, 1]")
        if wm.get("corner", "").endswith("right") and wm.get("corner", "").startswith("bottom"):
            res("WARN", "bottom-right watermark sits under the platform buttons on 9:16")
    outro = b.get("outro")
    if outro:
        if not (outro.get("handle") or outro.get("site")):
            res("WARN", "outro has neither handle nor site")
        if float(outro.get("duration_s", 0)) < 1.5:
            res("WARN", "outro shorter than 1.5 s is hard to read")
    voice = b.get("voice") or {}
    if not voice.get("register"):
        res("WARN", "voice.register not set (informal/formal address)")
    if not b.get("dont"):
        res("WARN", "no 'dont' rules; add at least the visual and wording no-gos")
    if b.get("missing"):
        res("WARN", f"draft still lists missing fields: {', '.join(b['missing'])}")

    for level, msg in results:
        print(f"{level:4}  {msg}")
    fails = sum(1 for lv, _ in results if lv == "FAIL")
    warns = sum(1 for lv, _ in results if lv == "WARN")
    print(f"\nbrand check: {'FAIL' if fails else 'PASS'} ({fails} fail, {warns} warn)")
    return 1 if fails else 0

# ---------------------------------------------------------------- cli


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    ex = sub.add_parser("extract", help="draft brand.json from CSS, a front-end folder, HTML or a URL")
    ex.add_argument("--css", action="append", default=[], help="CSS file (repeatable)")
    ex.add_argument("--repo", action="append", default=[], help="front-end folder, read only (repeatable)")
    ex.add_argument("--html", action="append", default=[], help="local HTML file (repeatable)")
    ex.add_argument("--url", action="append", default=[], help="page URL (repeatable)")
    ex.add_argument("-o", "--out", default="brand.json")
    ck = sub.add_parser("check", help="validate a brand.json")
    ck.add_argument("path")
    a = ap.parse_args()

    if a.cmd == "check":
        return check(a.path)

    if not (a.css or a.repo or a.html or a.url):
        print("give at least one of --css, --repo, --html, --url", file=sys.stderr)
        return 2
    ev, warnings = Evidence(), []
    for f in a.css:
        ev.add_css(open(f, encoding="utf-8", errors="replace").read(), f)
    for r in a.repo:
        collect_repo(r, ev, warnings)
    for h in a.html:
        collect_html(open(h, encoding="utf-8", errors="replace").read(), h, ev, warnings, remote=False)
    for u in a.url:
        try:
            collect_html(fetch(u), u, ev, warnings, remote=True)
        except Exception as exc:
            warnings.append(f"page not read: {u} ({exc.__class__.__name__}: {exc})")
    brand = draft(ev, warnings)
    os.makedirs(os.path.dirname(os.path.abspath(a.out)), exist_ok=True)
    with open(a.out, "w", encoding="utf-8") as fh:
        json.dump(brand, fh, ensure_ascii=False, indent=2)
    print(f"wrote {a.out}")
    for role, c in brand["colors"].items():
        print(f"  {role:9} {c['hex'] if c else 'null':8}  {c['source'] if c else ''}")
    print(f"  missing: {', '.join(brand['missing'])}")
    for w in warnings:
        print(f"  warning: {w}")
    print("Review with the user: confirm every color role, pick the logo, add font licenses, voice, outro, do/don't.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
