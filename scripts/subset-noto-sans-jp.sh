#!/usr/bin/env bash
# Subset Noto Sans JP to ~650KB.
#
# Strategy: include all hiragana / katakana / CJK punctuation / halfwidth-fullwidth
# plus the 2,136 jōyō kanji and every Japanese character that actually appears
# in src/. Drop hinting and color tables. Output is woff2, overwriting
# public/fonts/noto-sans-jp.woff2 in place.
#
# Usage:
#   1. Place the full upstream Noto Sans JP woff2 at FULL_FONT (see below) — get
#      it from https://github.com/notofonts/noto-cjk (Variable, JP region).
#   2. Run:  ./scripts/subset-noto-sans-jp.sh
#
# Requirements:
#   pip install fonttools brotli
#
# Re-run any time the codebase gains many new kanji (rare).
set -euo pipefail

FULL_FONT="${FULL_FONT:-/tmp/noto-sans-jp-full.woff2}"
OUT="public/fonts/noto-sans-jp.woff2"
JOYO_URL="https://raw.githubusercontent.com/davidluzgouveia/kanji-data/master/kanji.json"

if [ ! -f "$FULL_FONT" ]; then
  echo "Full font not found at $FULL_FONT" >&2
  echo "Download the upstream Noto Sans JP variable woff2 and set FULL_FONT." >&2
  exit 1
fi

if ! command -v pyftsubset >/dev/null 2>&1; then
  echo "pyftsubset not found. Install: pip install fonttools brotli" >&2
  exit 1
fi

WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT

# Build the kept-codepoints text file
curl -sSfL "$JOYO_URL" -o "$WORK/kanji.json"

python3 - "$WORK/kanji.json" "$WORK/chars.txt" <<'PY'
import json, os, sys, glob

kanji_json, out_path = sys.argv[1], sys.argv[2]
data = json.load(open(kanji_json))
# Jōyō kanji = grades 1-6 (kyōiku) + 8 (secondary jōyō); excludes jinmeiyō.
joyo = {k for k, v in data.items() if v.get('grade') in (1, 2, 3, 4, 5, 6, 8)}

# Hiragana, katakana, CJK punctuation, halfwidth/fullwidth (full blocks)
kana_punct = set()
for lo, hi in [(0x3000, 0x303F), (0x3040, 0x309F), (0x30A0, 0x30FF),
               (0x31F0, 0x31FF), (0xFF00, 0xFFEF)]:
    kana_punct |= {chr(c) for c in range(lo, hi + 1)}

# Common general punctuation actually used in mixed Japanese text
general_punct = {chr(c) for c in [0x2010, 0x2013, 0x2014, 0x2015, 0x2018,
                                    0x2019, 0x201C, 0x201D, 0x2025, 0x2026,
                                    0x2030, 0x2032, 0x2033, 0x203B, 0x2042, 0x2049]}

# Every Japanese character actually present in src/
used = set()
for pat in ('src/**/*.astro', 'src/**/*.ts', 'src/**/*.tsx',
            'src/**/*.md', 'src/**/*.mdx', 'src/**/*.json'):
    for path in glob.glob(pat, recursive=True):
        try:
            with open(path, encoding='utf-8') as f:
                for ch in f.read():
                    cp = ord(ch)
                    if (0x3000 <= cp <= 0x303F or 0x3040 <= cp <= 0x309F or
                        0x30A0 <= cp <= 0x30FF or 0x31F0 <= cp <= 0x31FF or
                        0x4E00 <= cp <= 0x9FFF or 0xFF00 <= cp <= 0xFFEF):
                        used.add(ch)
        except (UnicodeDecodeError, FileNotFoundError):
            pass

final = joyo | kana_punct | general_punct | used
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(''.join(sorted(final)))
print(f'Subset size: {len(final)} codepoints '
      f'(jōyō={len(joyo)}, kana/punct={len(kana_punct)}, '
      f'codebase={len(used)})')
PY

pyftsubset "$FULL_FONT" \
  --output-file="$OUT" \
  --flavor=woff2 \
  --text-file="$WORK/chars.txt" \
  --layout-features='kern,liga,clig,dlig,locl,calt' \
  --no-hinting \
  --desubroutinize \
  --drop-tables+=DSIG,VORG,EBDT,EBLC,EBSC,SVG,COLR,CPAL,CBDT,CBLC,sbix

echo "Wrote $OUT ($(du -h "$OUT" | cut -f1))"
