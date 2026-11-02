#!/usr/bin/env python3
# /// script
# requires-python = ">=3.9"
# dependencies = []
# [tool.motionforge]
# optional = ["faster-whisper>=1.0  (best: real word timestamps, runs locally)", "openai-whisper  (segment fallback ASR)"]
# needs = ["ffmpeg + ffprobe on PATH"]
# ///
"""
word_timings.py — word-level timestamps for a voiceover, for captions and word-synced cues.
© 2026 motionforge contributors, MIT

usage
  python3 tools/word_timings.py voice.wav --out words.json [--segments-out segments.json]
                                [--language en] [--model small] [--engine auto|words|segments]
                                [--text script.txt] [--min-silence 0.35] [--noise-db -35]

output
  words.json     [{"w": "Hello", "s": 0.12, "e": 0.48}, ...]          (seconds)
  segments.json  [{"start": 0.12, "end": 2.9, "text": "Hello there."}, ...]
  The same shapes are read by engines/remotion/kit/brand-kit.tsx (wordTimer, buildChunks).

engines
  words     faster-whisper with word_timestamps=True. Accurate to a frame or two.
  segments  fallback when faster-whisper is not installed (or --engine segments):
              1. ffmpeg silencedetect splits the audio into speech segments at pauses
              2. each segment gets its text: from --text (the script you sent to TTS, spread
                 over the segments by duration) or from per-segment ASR (faster-whisper without
                 word timestamps, or openai-whisper)
              3. words inside a segment are spread by length (longer words take longer)
            Expect ±0.1–0.3 s per word: fine for captions, check hard cues by ear.
  auto      words when faster-whisper imports, otherwise segments (default).

Always pass --text when you have the script: ASR misspells names and numbers, the script does not.
With --engine words and --text, the ASR timing is kept and only the word count is compared.
"""
import argparse
import json
import os
import re
import subprocess
import sys
import tempfile


# ---------------------------------------------------------------- audio helpers

def probe_duration(path):
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path],
        capture_output=True, text=True, check=True,
    ).stdout.strip()
    return float(out)


def speech_segments(path, noise_db, min_silence, pad=0.05):
    """Speech stretches between pauses, from ffmpeg silencedetect."""
    proc = subprocess.run(
        ["ffmpeg", "-hide_banner", "-nostats", "-i", path, "-af",
         f"silencedetect=noise={noise_db}dB:d={min_silence}", "-f", "null", "-"],
        capture_output=True, text=True,
    )
    total = probe_duration(path)
    silences, start = [], None
    for line in proc.stderr.splitlines():
        m = re.search(r"silence_start: (-?[\d.]+)", line)
        if m:
            start = max(0.0, float(m.group(1)))
        m = re.search(r"silence_end: ([\d.]+)", line)
        if m and start is not None:
            silences.append((start, float(m.group(1))))
            start = None
    if start is not None:
        silences.append((start, total))

    segments, cursor = [], 0.0
    for a, b in silences:
        if a - cursor > 0.08:
            segments.append([max(0.0, cursor - pad), min(total, a + pad)])
        cursor = b
    if total - cursor > 0.08:
        segments.append([max(0.0, cursor - pad), total])
    return [{"start": round(a, 3), "end": round(b, 3), "text": ""} for a, b in segments]


def cut(path, start, end, dest):
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-ss", f"{start:.3f}", "-to", f"{end:.3f}", "-i", path,
         "-ac", "1", "-ar", "16000", dest],
        check=True,
    )


# ---------------------------------------------------------------- text helpers

def word_weight(word):
    letters = len(re.sub(r"[^\w]", "", word)) or 1
    pause = 1.2 if re.search(r"[.!?…]$", word) else 0.6 if re.search(r"[,;:]$", word) else 0.0
    return max(2, letters) + 1.5 + pause


def spread(segment, words):
    """Place words inside one segment proportionally to their weight."""
    if not words:
        return []
    weights = [word_weight(w) for w in words]
    total = sum(weights)
    t, span = segment["start"], segment["end"] - segment["start"]
    out = []
    for w, k in zip(words, weights):
        d = span * k / total
        out.append({"w": w, "s": round(t, 3), "e": round(t + d, 3)})
        t += d
    return out


def snap_to_punctuation(words, index, lo, hi):
    """Move a split index to the nearest word ending a sentence (or clause) within reach."""
    reach = max(2, round(len(words) * 0.08))
    for pattern in (r"[.!?…]$", r"[,;:]$"):
        best = None
        for j in range(max(lo + 1, index - reach), min(hi, index + reach) + 1):
            if re.search(pattern, words[j - 1]) and (best is None or abs(j - index) < abs(best - index)):
                best = j
        if best is not None:
            return best
    return index


def assign_script(segments, script_words):
    """Give each speech segment a share of the script proportional to its duration,
    preferring to split where the script has punctuation (pauses usually fall there)."""
    total = sum(s["end"] - s["start"] for s in segments) or 1.0
    n, used, acc = len(script_words), 0, 0.0
    for i, seg in enumerate(segments):
        acc += seg["end"] - seg["start"]
        if i == len(segments) - 1:
            upto = n
        else:
            upto = snap_to_punctuation(script_words, round(n * acc / total), used, n - 1)
            upto = max(used, min(upto, n))
        seg["text"] = " ".join(script_words[used:upto])
        used = upto
    return segments


# ---------------------------------------------------------------- engines

def load_faster_whisper(model):
    try:
        from faster_whisper import WhisperModel
    except ImportError:
        return None
    return WhisperModel(model, device="auto", compute_type="int8")


def engine_words(path, args):
    model = load_faster_whisper(args.model)
    if model is None:
        return None
    segs, _info = model.transcribe(path, word_timestamps=True, language=args.language, beam_size=5, vad_filter=False)
    words, segments = [], []
    for s in segs:
        segments.append({"start": round(s.start, 3), "end": round(s.end, 3), "text": s.text.strip()})
        for w in s.words or []:
            token = w.word.strip()
            if token:
                words.append({"w": token, "s": round(w.start, 3), "e": round(w.end, 3)})
    return words, segments


def transcribe_segment(model_kind, model, wav, language):
    if model_kind == "faster-whisper":
        segs, _ = model.transcribe(wav, language=language, beam_size=5)
        return " ".join(s.text.strip() for s in segs)
    result = model.transcribe(wav, language=language)
    return result.get("text", "").strip()


def engine_segments(path, args):
    segments = speech_segments(path, args.noise_db, args.min_silence)
    if not segments:
        sys.exit("word_timings: no speech found (try a higher --noise-db, e.g. -30)")

    if args.text:
        script = open(args.text, encoding="utf-8").read().split()
        assign_script(segments, script)
    else:
        model_kind, model = None, load_faster_whisper(args.model)
        if model is not None:
            model_kind = "faster-whisper"
        else:
            try:
                import whisper  # openai-whisper
                model_kind, model = "openai-whisper", whisper.load_model(args.model)
            except ImportError:
                sys.exit("word_timings: no ASR available. Pass --text script.txt, or pip install faster-whisper")
        with tempfile.TemporaryDirectory() as tmp:
            for i, seg in enumerate(segments):
                wav = os.path.join(tmp, f"seg{i}.wav")
                cut(path, seg["start"], seg["end"], wav)
                seg["text"] = transcribe_segment(model_kind, model, wav, args.language)

    words = []
    for seg in segments:
        words.extend(spread(seg, seg["text"].split()))
    return words, segments


# ---------------------------------------------------------------- main

def main():
    ap = argparse.ArgumentParser(description="Word timestamps for a voiceover (see the module docstring).")
    ap.add_argument("audio")
    ap.add_argument("--out", default="words.json")
    ap.add_argument("--segments-out")
    ap.add_argument("--language", default=None, help="ISO code such as en, tr, de (default: detect)")
    ap.add_argument("--model", default="small", help="Whisper model name or local folder (default: small)")
    ap.add_argument("--engine", choices=["auto", "words", "segments"], default="auto")
    ap.add_argument("--text", help="the exact script that was spoken (UTF-8 text file)")
    ap.add_argument("--min-silence", type=float, default=0.35, help="pause length that splits segments (s)")
    ap.add_argument("--noise-db", type=float, default=-35, help="silence threshold in dB")
    args = ap.parse_args()

    if not os.path.isfile(args.audio):
        sys.exit(f"word_timings: no file {args.audio}")

    result = None
    if args.engine in ("auto", "words"):
        result = engine_words(args.audio, args)
        if result is None and args.engine == "words":
            sys.exit("word_timings: faster-whisper is not installed (pip install faster-whisper)")
        if result is not None and args.text:
            expected = len(open(args.text, encoding="utf-8").read().split())
            if abs(expected - len(result[0])) > max(2, expected * 0.05):
                print(f"warning: script has {expected} words, ASR heard {len(result[0])}. Check names and numbers.", file=sys.stderr)
    if result is None:
        result = engine_segments(args.audio, args)
        print("note: segment fallback — word times are estimates (±0.1–0.3 s)", file=sys.stderr)

    words, segments = result
    with open(args.out, "w", encoding="utf-8") as f:
        json.dump(words, f, ensure_ascii=False, indent=1)
    if args.segments_out:
        with open(args.segments_out, "w", encoding="utf-8") as f:
            json.dump(segments, f, ensure_ascii=False, indent=1)
    for w in words:
        print(f'{w["s"]:7.2f}  {w["w"]}')
    print(f"{len(words)} words in {len(segments)} segments -> {args.out}", file=sys.stderr)


if __name__ == "__main__":
    main()
