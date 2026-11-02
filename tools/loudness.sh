#!/usr/bin/env bash
# loudness.sh — measure and normalise loudness (EBU R128) with ffmpeg
# © 2026 motionforge contributors, MIT
#
# usage
#   tools/loudness.sh measure <file> [<file> ...]
#       integrated loudness (LUFS), loudness range (LU) and true peak (dBTP) of each file
#   tools/loudness.sh compare <voice-only> <mix>
#       is the voice still on top? prints both and the difference; warns when the mix is more
#       than 3 LU louder than the voice alone (music/sfx are drowning the voice) or quieter.
#       Compare BEFORE normalising (both files at their mixing levels).
#   tools/loudness.sh normalize <in> <out> [target=-14] [peak=-1.5]
#       two-pass loudnorm: pass 1 measures, pass 2 applies a linear gain with the measured
#       values (one pass misses the target by ~0.5 LU). Video is stream-copied if present.
#
# Targets: -14 LUFS / true peak <= -1 dBTP suits Reels, Shorts, TikTok and YouTube.
# Exit codes: 0 ok, 1 ffmpeg error or check failed, 2 usage error.
set -euo pipefail

die() { echo "loudness: $*" >&2; exit 1; }
usage() { sed -n '2,20p' "$0" >&2; exit 2; }
command -v ffmpeg >/dev/null 2>&1 || die "ffmpeg is not on PATH"

# prints "I LRA TP" for one file
measure_one() {
  local file="$1" report
  [ -f "$file" ] || die "no file: $file"
  report=$(ffmpeg -hide_banner -nostats -i "$file" -vn -af ebur128=peak=true -f null - 2>&1) || die "ffmpeg could not read $file"
  # the summary block at the end holds "I:", "LRA:" and "Peak:" lines
  echo "$report" | awk '
    /Summary:/ { s = 1 }
    s && $1 == "I:"    { i = $2 }
    s && $1 == "LRA:"  { lra = $2 }
    s && $1 == "Peak:" { tp = $2 }
    END { if (i == "") exit 1; printf "%s %s %s\n", i, lra, tp }' || die "no loudness summary for $file (does it have audio?)"
}

cmd="${1:-}"; shift || true
case "$cmd" in
  measure)
    [ $# -ge 1 ] || usage
    printf '%-40s %10s %8s %10s\n' "file" "LUFS" "LRA" "peak dBTP"
    for f in "$@"; do
      read -r i lra tp < <(measure_one "$f")
      printf '%-40s %10s %8s %10s\n' "$(basename "$f")" "$i" "$lra" "$tp"
    done
    ;;

  compare)
    [ $# -eq 2 ] || usage
    read -r vi _ vtp < <(measure_one "$1")
    read -r mi _ mtp < <(measure_one "$2")
    diff=$(awk -v a="$mi" -v b="$vi" 'BEGIN { printf "%.1f", a - b }')
    echo "voice only : $vi LUFS (peak $vtp dBTP)"
    echo "mix        : $mi LUFS (peak $mtp dBTP)"
    echo "mix - voice: $diff LU"
    status=0
    if awk -v d="$diff" 'BEGIN { exit !(d > 3) }'; then
      echo "WARN: the mix is $diff LU louder than the voice alone — music or sfx are probably covering the voice; lower them (aim for +0.5 to +2 LU)."
      status=1
    elif awk -v d="$diff" 'BEGIN { exit !(d < -1) }'; then
      echo "WARN: the mix is quieter than the voice alone — check that the voice track is not ducked or attenuated."
      status=1
    else
      echo "OK: the voice carries the mix."
    fi
    if awk -v p="$mtp" 'BEGIN { exit !(p > -1) }'; then echo "WARN: mix true peak $mtp dBTP is above -1 dBTP; normalise before delivery."; status=1; fi
    exit $status
    ;;

  normalize)
    [ $# -ge 2 ] || usage
    in="$1"; out="$2"; target="${3:--14}"; peak="${4:--1.5}"
    [ -f "$in" ] || die "no file: $in"
    [ "$in" != "$out" ] || die "write to a new file, not over the input"
    pass1=$(ffmpeg -hide_banner -nostats -i "$in" -vn -af "loudnorm=I=$target:TP=$peak:LRA=11:print_format=json" -f null - 2>&1) || die "pass 1 failed"
    json=$(echo "$pass1" | sed -n '/^{/,/^}/p')
    field() { echo "$json" | sed -n "s/.*\"$1\" *: *\"\([^\"]*\)\".*/\1/p"; }
    mi=$(field input_i); mtp=$(field input_tp); mlra=$(field input_lra); mth=$(field input_thresh); off=$(field target_offset)
    case "$mi" in ''|*inf*) die "the input is silent or could not be measured";; esac
    filter="loudnorm=I=$target:TP=$peak:LRA=11:measured_I=$mi:measured_TP=$mtp:measured_LRA=$mlra:measured_thresh=$mth:offset=$off:linear=true"
    has_video=$(ffprobe -v error -select_streams v:0 -show_entries stream=codec_type -of csv=p=0 "$in" 2>/dev/null || true)
    tmp="${out%.*}.tmp.${out##*.}"
    if [ -n "$has_video" ]; then
      ffmpeg -y -hide_banner -loglevel error -i "$in" -c:v copy -af "$filter,aresample=48000" -c:a aac -b:a 256k -movflags +faststart "$tmp" || { rm -f "$tmp"; die "pass 2 failed"; }
    else
      ffmpeg -y -hide_banner -loglevel error -i "$in" -af "$filter,aresample=48000" "$tmp" || { rm -f "$tmp"; die "pass 2 failed"; }
    fi
    mv "$tmp" "$out"
    read -r oi olra otp < <(measure_one "$out")
    echo "in : $mi LUFS, peak $mtp dBTP"
    echo "out: $oi LUFS, LRA $olra LU, peak $otp dBTP -> $out"
    if awk -v i="$oi" -v t="$target" -v p="$otp" 'BEGIN { exit !(i < t - 1 || i > t + 1 || p > -1) }'; then
      echo "WARN: missed the target. A clipping or very peaky mix defeats loudnorm; lower the hot parts and run again." >&2
      exit 1
    fi
    ;;

  *) usage ;;
esac
