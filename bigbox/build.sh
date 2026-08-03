#!/usr/bin/env bash
# Genera los entregables del one pager Woki × Bigbox.
# Necesita un server HTTP local: las fuentes por CDN y las rutas absolutas de
# logos no cargan desde file://.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="$ROOT/bigbox"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT=8765
BASE="http://localhost:$PORT/bigbox/index.html"

cd "$ROOT"
if ! lsof -ti:$PORT >/dev/null 2>&1; then
  python3 -m http.server $PORT >/dev/null 2>&1 &
  SERVER_PID=$!
  trap 'kill $SERVER_PID' EXIT
  sleep 1
fi

for v in a b c d; do
  [ "$v" = "a" ] && name="woki-onepager-bigbox.pdf" || name="woki-onepager-bigbox-$v.pdf"
  "$CHROME" --headless --disable-gpu --no-pdf-header-footer \
    --virtual-time-budget=8000 \
    --print-to-pdf="$OUT/$name" "$BASE?v=$v" 2>/dev/null
  echo "→ $name  $(du -h "$OUT/$name" | cut -f1)"
done

"$CHROME" --headless --disable-gpu --hide-scrollbars \
  --virtual-time-budget=8000 --window-size=1080,1920 \
  --screenshot="/tmp/woki-bigbox-story.png" "$BASE?fmt=story" 2>/dev/null
sips -s format jpeg -s formatOptions 88 /tmp/woki-bigbox-story.png \
  --out "$OUT/woki-bigbox-story.jpg" >/dev/null
echo "→ woki-bigbox-story.jpg  $(du -h "$OUT/woki-bigbox-story.jpg" | cut -f1)"
