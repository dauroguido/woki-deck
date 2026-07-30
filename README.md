# Woki Deck

Sales deck B2B de Woki — sistema de reservas y hospitalidad para los mejores restaurantes.

Sitio estático monolítico en HTML, CSS y JS inline. Sin build, sin dependencias de instalación local. Deployado en Vercel desde `main`.

**URL:** https://woki-deck.vercel.app

## Estructura

```
.
├── index.html              # Deck base (HTML + CSS + JS inline) — español rioplatense (AR)
├── vigil.html              # Deck personalizado Universo Vigil — AR
├── aramburu.html           # Deck personalizado Aramburu — AR
│
├── cl/                     # Versión chilena (tuteo + $ neutro)
│   ├── index.html
│   ├── vigil.html
│   └── aramburu.html
│
├── assets/logos/           # Isologo oficial Woki B2B (4 variantes SVG)
├── logos-partners/         # Logos restaurantes (apertura + cierre)
├── logos-integraciones/    # Logos del banner de integraciones
├── woki-profile.png        # Foto del perfil de María (sec HM parte A)
│
├── vercel.json             # Config de Vercel (cleanUrls)
├── woki-deck-brief.md      # Brief original del rediseño 2026-05
├── CLAUDE.md               # Instrucciones para sesiones de Claude Code
├── HANDOFF.md              # Contexto histórico del último ciclo de trabajo
└── archive/                # Versiones anteriores y assets no usados
```

### Versionado por idioma

- **Root** (`index.html`, `vigil.html`, `aramburu.html`): versión default en español rioplatense. Referencia assets con rutas relativas (`assets/...`, `logos-partners/...`).
- **`cl/`**: versión chilena. Mismas tres páginas adaptadas a tuteo y léxico CL (garzón, etc.) con moneda neutra (`$`). Referencia assets con **rutas absolutas** (`/assets/...`, `/logos-partners/...`, `/woki-profile.png`) para no duplicar carpetas.
- Para sumar una localización nueva (`mx/`, `uy/`, etc.) repetir el patrón de `cl/`: copiar los tres HTML, adaptar copy, y dejar todas las refs de assets con `/` inicial.

### URLs públicas (Vercel con `cleanUrls: true`)

| Path | Sirve |
|---|---|
| `/` | `index.html` (AR base) |
| `/vigil` | `vigil.html` (AR) |
| `/aramburu` | `aramburu.html` (AR) |
| `/cl` | `cl/index.html` (CL base) |
| `/cl/vigil` | `cl/vigil.html` (CL) |
| `/cl/aramburu` | `cl/aramburu.html` (CL) |

## Local preview

```sh
cd ~/Downloads/woki-deck-prod
python3 -m http.server 8765
```

Abrí `http://localhost:8765/index.html`. Para revisar mobile, usá Chrome DevTools → device toolbar (Cmd+Shift+M) a 375 / 390 / 768 px.

## Deploy

Vercel deployea automático al hacer `git push origin main`. El deck se sirve directo desde `index.html` en la raíz.

## Stack visual

- Tipografía display: **Mona Sans** (CDN fonts.cdnfonts.com)
- Tipografía body: **Figtree** (Google Fonts)
- Íconos: **Lucide** (CDN unpkg)
- Paleta B2B oficial definida en `:root` (variables `--b2b-*`)
- Sin frameworks, sin bundler

## Mantenimiento

Para modificar el deck:
1. Editar el archivo correspondiente (root para AR, `cl/` para CL).
2. Probar local (server arriba) en desktop y mobile, en `/` y `/cl/`.
3. `git add <archivos> && git commit -m "..." && git push origin main`.
4. Vercel deploya en ~30s.

Si tocás copy compartido entre AR y CL, replicar en ambas versiones para mantenerlas en paridad.

Ver `CLAUDE.md` para convenciones específicas sobre dónde tocar cada cosa.
