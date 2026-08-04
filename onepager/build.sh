#!/usr/bin/env bash
# Genera los entregables de un one pager.
#
#   ./onepager/build.sh [slug]        # slug por defecto: bigbox
#
# Convención de esta carpeta: cada one pager vive en onepager/<slug>/index.html
# y sus entregables se generan al lado. Para sumar uno nuevo, creá la carpeta
# con su index.html y corré este script con el slug.
#
# Salidas (en onepager/<slug>/):
#   woki-onepager-<slug>.pdf          variante a (la principal)
#   woki-onepager-<slug>-{b,c,d}.pdf  variantes de titular (?v=)
#   woki-<slug>-story.jpg             1080×1920 para WhatsApp (?fmt=story)
#
# Necesita un server HTTP local: las rutas absolutas de fuentes, logos e
# imágenes (/assets/…, /logos-partners/…) no cargan desde file://.
set -euo pipefail

SLUG="${1:-bigbox}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="$ROOT/onepager/$SLUG"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT=8765
BASE="http://localhost:$PORT/onepager/$SLUG/index.html"

if [ ! -f "$OUT/index.html" ]; then
  echo "✗ No existe $OUT/index.html" >&2
  exit 1
fi

cd "$ROOT"
if ! lsof -ti:$PORT >/dev/null 2>&1; then
  python3 -m http.server $PORT >/dev/null 2>&1 &
  SERVER_PID=$!
  trap 'kill $SERVER_PID' EXIT
  sleep 1
fi

for v in a b c d; do
  [ "$v" = "a" ] && name="woki-onepager-$SLUG.pdf" || name="woki-onepager-$SLUG-$v.pdf"
  "$CHROME" --headless --disable-gpu --no-pdf-header-footer \
    --virtual-time-budget=8000 \
    --print-to-pdf="$OUT/$name" "$BASE?v=$v" 2>/dev/null
  echo "→ $name  $(du -h "$OUT/$name" | cut -f1)"
done

"$CHROME" --headless --disable-gpu --hide-scrollbars \
  --virtual-time-budget=8000 --window-size=1080,1920 \
  --screenshot="/tmp/woki-$SLUG-story.png" "$BASE?fmt=story" 2>/dev/null
sips -s format jpeg -s formatOptions 88 "/tmp/woki-$SLUG-story.png" \
  --out "$OUT/woki-$SLUG-story.jpg" >/dev/null
echo "→ woki-$SLUG-story.jpg  $(du -h "$OUT/woki-$SLUG-story.jpg" | cut -f1)"
