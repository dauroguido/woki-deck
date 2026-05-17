# Handoff — Rediseño Woki Deck (mayo 2026)

> Documento de cierre del ciclo de trabajo del 2026-05-16 al 2026-05-17. Recoge qué cambió, por qué, decisiones tomadas y deuda técnica conocida. Si volvés acá en 3 meses sin recordar nada, leer esto primero.

## Por qué se hizo este ciclo

El deck pre-rediseño no sostenía en frío las dos ideas-ancla que el negocio necesita posicionar:

1. **Woki es reservas Y hospitalidad** (no una cosa o la otra).
2. **El Hospitality Manager es el gamechanger** — las herramientas las podría tener cualquiera; lo que las hace únicas son los datos del HM alimentándolas.

El brief completo del rediseño está en [`woki-deck-brief.md`](./woki-deck-brief.md). Es la fuente de verdad para entender por qué cada sección del deck tiene la forma que tiene.

## Estado final del deck (orden de secciones)

1. **Apertura** — tagline + proof `+700 restaurantes` + grilla de 9 logos partners
2. **Problema** — fusionada con calculadora: pregunta retórica + 3 stats (5%/51%/67%) + calculadora interactiva + cierre puente + 1 línea de disclaimer
3. **Hospitality Manager — parte A** — `Hospitality Manager` + subtítulo gamechanger + transformación Excel → bridge → perfil María
4. **Hospitality Manager — Núcleo (3B)** — fondo dark Ink, paleta B2B oficial (no más AI gradient cyan/magenta/naranja), 5 fuentes de datos + core orb + 6 productos potenciados
5. **Antes del servicio** — sin tabs, 3 bloques verticales: perfil del restaurante (mockup HTML, no más PNG), campañas y email segmentado, eventos y experiencias
6. **Michelin** — perfil + conector + panel Woki con reservas entrantes
7. **Pagos** *(nueva sección)* — mockup panel de cobros + 3 use cases + 2 diferenciales (+95% cobrabilidad, tarjetas internacionales) + nota Yuno
8. **Banner integraciones** — `Integrá todas tus herramientas en una sola plataforma.`
9. **Durante el servicio** — brief pre-servicio + Guest Center (sin cambios)
10. **Después del servicio** — reseñas unificadas + tabla campañas + ops grid + mención reporte mensual
11. **Bloque puente** *(nuevo)* — `MIGRACIÓN SIN PÉRDIDAS / Lo que ya hacés con tu sistema, en Woki funciona igual o mejor.`
12. **Implementación** — 72hs + 3 pasos
13. **Cierre** — 9 logos partners + 2 CTAs diferenciados (`Agendá tu demo` / `Hablanos por WhatsApp`) + frase emocional

Side-nav refleja este orden (sin dot para Resultados, que se eliminó, ni para hm-nucleo, que comparte dot con hospitality-manager).

## Historial de commits del ciclo

| Commit | Resumen |
|---|---|
| `57ba70c` | Reestructura: Pagos, núcleo B2B, fusión problema+calc, side-nav reordenado, sec Resultados eliminada |
| `665dfd9` | Primera pasada responsive: breakpoints 900/768/560 |
| `c62a46b` | Ajustes mobile: copy, layout, simetría (Ness oculto en mobile, Permanencia oculta en 560) |
| `83178ac` | Mockup HTML del perfil de restaurante (reemplaza `woki-mare.png`), reseñas, tabla card-list |
| `0b4c56a` | Fixes mobile críticos: min-height:100vh fix con specificity correcta, items núcleo no dimmed |
| `71fe90d` | Anchoita más grande (apertura+cierre) + overflow logos cierre mobile |

## Decisiones clave (con racional)

### Editoriales
- **Eliminado el chip "Powered by AI · Incluido en todos los planes Woki"** de la sec HM parte A — feedback editorial del usuario.
- **Disclaimer único** debajo de la calculadora en lugar de los dos largos originales — más legible, menos pisado.
- **Email mockup como Gmail** (avatar circular + from/to + subject grande) — antes parecía un H4 plano, ahora se lee como mail real.
- **Mockup del perfil del restaurante** rehecho como HTML+CSS inspirado en wokiapp.com (foto + nombre + rating + selector personas + tabs + promo). Antes era `woki-mare.png` (7.6MB) que se rompía visualmente en mobile.

### Responsive
- **Ness oculto en mobile** en grilla apertura y cierre → 8 logos en 2×4 simétrico en lugar de 9 con hueco.
- **Permanencia (la métrica flat) oculta a 560** en ops-grid → 4 cajas en 2×2 simétrico.
- **Una sola card de evento en mobile** ("Cena maridaje") — antes 3 ocupaban scroll vertical innecesario.
- **Tabla métricas de marketing convertida a card-list en mobile** vía `data-label` attributes en `<td>` + CSS responsive. Sin scroll horizontal.
- **Solo 2 filas visibles de la tabla en mobile** (Email + Evento) — las otras 2 ocultas.
- **Anchoita override específico** (`img[alt="Anchoita"]` en apertura, `data-w="oval"` en cierre) — el logo es oval con mucho aire negativo interno, necesita 30-40% más altura que los demás para pesar visualmente parejo.

### Paleta y branding
- **Sec 3B Núcleo re-paletada** del gradient AI (cyan/magenta/naranja) al gradiente B2B oficial (`#202B3F → #0066CC`) + fondo Ink `#0E0F12`. La parte A (HM hero) y el guest center mantienen el AI gradient — son secciones donde el ángulo "Powered by AI" tiene sentido.

## Stack técnico

- **HTML + CSS + JS inline** en `index.html` (~3500 líneas). Cero build, cero npm.
- **Lucide icons** vía CDN (`unpkg.com`). Se inicializan llamando `lucide.createIcons()` en el JS inline.
- **Fuentes** Mona Sans (display) + Figtree (body) vía CDN.
- **Vercel** sirve `index.html` por default. `vercel.json` solo configura `cleanUrls`.
- **Imágenes externas** desde `images.unsplash.com` para el mockup mare y los cards de eventos.

## Convenciones

Ver [`CLAUDE.md`](./CLAUDE.md) para el detalle. Lo más importante:

- **Cambios responsive viven dentro de `@media (max-width: ...)`** — nunca tocar desktop sin querer.
- **Breakpoints**: 960 / 900 / 880 / 768 / 560. No agregar más.
- **Selectores responsive necesitan specificity correcta**: si tocás algo que tiene una regla `.s-hm .selector` o `.s-hm-dark .selector` en desktop, tu override debe incluir esos selectores también, no solo `.selector`.
- **No usar `!important` salvo para anular pseudo-elementos heredados** (precedente: `.cierre-partners__cell::after { display:none !important }` en mobile).

## Deuda técnica conocida

- **CSS dead code residual**: `.problema__dashboard`, clases relacionadas al dashboard mockup que se eliminó de Problema. CSS sigue en el archivo, sin uso. No crítico.
- **AI gradient hardcoded en parte A y guest center**: los colores `#1AAFDE / #B210FF / #FFAD5C` aparecen en ~10 lugares fuera de 3B. Funcionan, pero si en el futuro se quiere alinear todo a B2B, hay que tocar todos esos puntos.
- **`scroll-behavior: smooth`** en el `<html>` puede entrar en conflicto con scripts que hacen `scrollIntoView` programático. En la última sesión vi rebotes raros cuando emulaba mobile, no en producción.
- **Top-nav visible en mobile**: la `.top-nav` aparece en mobile con el logo Woki + botón "Escribinos". El CTA "Escribinos" del nav se oculta a 560, pero el logo sigue. Funciona pero ocupa 52px arriba. Se puede decidir ocultar más adelante.
- **`woki-profile.png`** se usa en la sec HM parte A (perfil de María). Es la única imagen propia "pesada" (216KB) que queda en el repo. Si en el futuro se quiere optimizar peso, podría reemplazarse por SVG / mockup HTML como hicimos con Mare.

## Archive

La carpeta [`archive/`](./archive/) tiene archivos huérfanos preservados pero ya no usados:

- `woki-deck.html` — versión anterior del deck (pre-fusión problema+calc)
- `woki-pitch.html` — versión más antigua, anterior a `woki-deck.html`
- `woki-mare.png` (7.6MB) — mockup PNG del perfil de Mare. Reemplazado por mockup HTML en `index.html`.
- `fb.png`, `whatsapp.png` — íconos sociales no referenciados en ninguna parte.

Si pasaron 6 meses y nadie los reclamó, se pueden borrar del archivo.
