# Woki Deck

Sales deck B2B de Woki — sistema de reservas y hospitalidad para los mejores restaurantes.

Sitio estático monolítico en HTML, CSS y JS inline. Sin build, sin dependencias de instalación local. Deployado en Vercel desde `main`.

**URL:** woki-hospitality.vercel.app

## Estructura

```
.
├── index.html              # El deck completo (HTML + CSS + JS inline)
├── vercel.json             # Config de Vercel (cleanUrls)
├── assets/logos/           # Isologo oficial Woki B2B (4 variantes SVG)
├── logos-partners/         # Logos restaurantes (apertura + cierre)
├── logos-integraciones/    # Logos del banner de integraciones
├── woki-profile.png        # Foto del perfil de María (sec HM parte A)
├── woki-deck-brief.md      # Brief original del rediseño 2026-05
├── CLAUDE.md               # Instrucciones para sesiones de Claude Code
├── HANDOFF.md              # Contexto histórico del último ciclo de trabajo
└── archive/                # Versiones anteriores y assets no usados
```

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
1. Editar `index.html` directamente.
2. Probar local (server arriba) en desktop y mobile.
3. `git add index.html && git commit -m "..." && git push origin main`.
4. Vercel deploya en ~30s.

Ver `CLAUDE.md` para convenciones específicas sobre dónde tocar cada cosa.
