# Claude Code — Instrucciones para este repo

Este archivo se lee automáticamente al iniciar una sesión de Claude Code en este directorio. Contiene contexto técnico y convenciones específicas del proyecto.

## Qué es esto

Sales deck B2B de Woki, sitio estático monolítico. **Todo el deck vive en `index.html`** (~3500 líneas, HTML + CSS + JS inline). Deployado en Vercel desde `main`. Sin build, sin npm.

Antes de hacer cambios no triviales, leer:
- [`HANDOFF.md`](./HANDOFF.md) — qué pasó en el último ciclo de trabajo, decisiones tomadas, deuda técnica.
- [`woki-deck-brief.md`](./woki-deck-brief.md) — el brief estratégico del rediseño 2026-05. Es la fuente de verdad para entender el "por qué" de cada sección.

## Estructura

```
index.html                  # Deck completo. ÚNICO archivo a editar para cambios.
logos-partners/             # Logos restaurantes (apertura + cierre)
logos-integraciones/        # Logos integraciones (banner)
woki-profile.png            # Foto del perfil de María (sec HM parte A)
vercel.json                 # cleanUrls = true. No tocar salvo necesidad.
woki-deck-brief.md          # Brief estratégico del rediseño
HANDOFF.md                  # Contexto histórico del último ciclo
README.md                   # Overview público del repo
archive/                    # Versiones anteriores, no usar
```

## Convenciones que tenés que respetar

### 1. Cero build, cero dependencias

No introducir bundlers, ni Tailwind, ni preprocessors, ni `package.json`. Si necesitás una librería, traela por CDN (precedente: Lucide vía `unpkg.com`).

### 2. Cambios responsive viven dentro de `@media`

Nunca tocar las reglas desktop "por accidente" cuando se está arreglando mobile. Toda intervención mobile va dentro de:

- `@media (max-width: 960px)` — tablet grande (sec 3 transformación pasa a 1fr)
- `@media (max-width: 900px)` — tablet (la mayoría de overrides — grids 2/3 col → 1 col)
- `@media (max-width: 880px)` — pagos pasa a 1fr
- `@media (max-width: 768px)` — mobile estándar (side-nav oculto, paddings compactos)
- `@media (max-width: 560px)` — mobile chico (Anchoita override extra, ops-grid sin Permanencia, etc)

**No agregar breakpoints nuevos.** Reusar los existentes.

### 3. Specificity en overrides responsive

Hay reglas en desktop con selectores compuestos del tipo `.s-hm .section__inner` o `.s-hm-dark .section__inner` (specificity 0,0,2,0). Si tu override solo usa `.section__inner` (0,0,1,0), pierde por specificity y NO se aplica en mobile.

**Cuando hagas override responsive, replicá el selector compuesto:**

```css
@media (max-width: 768px) {
  .section__inner,
  .s-hm .section__inner,
  .s-hm-dark .section__inner { padding: 32px 22px; }
}
```

Si te encontrás con un fix mobile que "no se aplica" aunque el media query matchea, esta es la causa el 90% de las veces. Inspeccionar specificity con DevTools antes de agregar `!important`.

### 4. `!important` solo para anular pseudo-elementos heredados

Precedente válido: `.cierre-partners__cell::after { display:none !important }` para anular los flourishes dorados nth-child(3n) cuando la grilla pasa a 2 columnas en mobile. Para todo lo demás, resolver con specificity correcta.

### 5. Reglas de "grilla simétrica"

Si una grilla queda impar en mobile (2 columnas con un hueco), preferí **ocultar uno** antes que dejar el hueco. Precedente:
- Apertura/cierre: 9 logos → ocultar Ness (`:nth-child(8) { display:none }`) en mobile → 8 en 2×4.
- Ops-grid: 5 cajas → ocultar Permanencia (la flat, `:first-child { display:none }`) en `@560` → 4 en 2×2.

### 6. Paleta B2B oficial

Variables CSS en `:root` (líneas ~47-50 de `index.html`):

```css
--b2b-50:  #EEF4FC
--b2b-100: #D6E4F7
--b2b-500: #0066CC   /* brand principal */
--b2b-800: #132F60
--b2b-900: #202B3F
--b2b-gradient: linear-gradient(60deg, #202B3F 0%, #0066CC 100%)
```

Reutilizar siempre. Solo el bloque de la sec 3 parte A y el guest center mantienen el AI gradient hardcoded (cyan/magenta/naranja) por ser secciones donde el ángulo "Powered by AI" tiene sentido — no replicar ese gradient en otras secciones.

### 7. Antes de modificar

- Levantar server local: `python3 -m http.server 8765` (preferí background)
- Abrir `http://localhost:8765/index.html` en Chrome
- Probar desktop y mobile (DevTools → device toolbar) **antes** del commit

### 8. No tocar el JS sin entender qué hace

Hay JS al final de `index.html` que maneja:
- Side-nav dots (`IntersectionObserver` para activar el dot de la sección visible)
- Calculadora de retención (input listeners en `#calc-cubiertos` / `#calc-ticket`)
- Auto-hide top nav on scroll down
- Reveal animations (`IntersectionObserver` que agrega `.is-visible`)
- Hover interactions del núcleo (3B diagram)
- Cards expandibles de Después del servicio

Cambios estructurales en CSS pueden romper el JS si dependés de selectores específicos. Si removés clases que el JS busca, actualizar también el JS.

## Flujo típico para una tarea

1. Leer el pedido. Si toca contenido editorial, validar contra el brief.
2. Identificar qué sección/clase tocar.
3. Levantar server local.
4. Hacer el cambio en `index.html`.
5. Probar desktop (1280+) y mobile (Chrome DevTools 375 / 390 / 768).
6. Si tocaste responsive: verificar que desktop sigue idéntico.
7. `git add index.html && git commit -m "..." && git push origin main`.
8. Vercel deploya solo.

## Para debug visual mobile sin DevTools

Si necesitás capturar mobile programáticamente (caso: querés que Claude visualice por sí mismo), Chrome desktop tiene un mínimo de ancho de ventana y los media queries no se disparan a 420 px. Solución que funcionó: cargar el deck dentro de un iframe de width fijo en una página simple. El iframe SÍ tiene su propio viewport CSS y los `@media` se evalúan correctamente.

```js
document.body.innerHTML = `
  <iframe src="http://localhost:8765/index.html"
    style="width:420px;height:880px;border:0"></iframe>
`;
```

Esto se hizo en la sesión del 2026-05-17 con `Claude_in_Chrome` MCP para hacer debug iterativo.

## No hacer

- **No crear nuevos archivos `.html`** para variantes del deck. Todo va en `index.html`.
- **No agregar `package.json`** ni node_modules.
- **No usar Tailwind, styled-components, ni preprocessors.**
- **No tocar `archive/`** salvo para sumar archivos viejos al archivo.
- **No commitear `.DS_Store`** ni `.claude/` (ambos en `.gitignore`).
- **No push directo a main sin probar local** primero, especialmente cambios responsive.

## Si rompiste algo en mobile

Lista de problemas que ya aparecieron una vez (para no repetirlos):

| Síntoma | Causa | Fix |
|---|---|---|
| Espacio enorme entre secciones | `.s-hm { min-height: 100vh }` ganando por specificity | Override con `.s-hm`, `.s-hm-dark`, `.problema__wrap`, `.apertura__wrap` explícitos en `@768` |
| Logo Anchoita se ve chico | Es oval con mucho aire negativo | Override específico `img[alt="Anchoita"]` con max-height 30-40% mayor |
| Mockup del perfil del restaurante invisible | `.mare-showcase` es flex row con callouts que comen el espacio | `flex-direction: column` en mobile + `width: 100%` en callouts |
| Items del núcleo dimmed en mobile | `has-hover` state pegado del JS de desktop | Override `.hm-diagram.has-hover .hm-item:not(.is-hovered) { opacity:1 }` en mobile |
| Logos del cierre cortados en mobile | max-width agresivo + padding generoso | Bajar padding wrap + `max-width: 90% !important` global en los logos |
| Tabla campañas con scroll horizontal en mobile | 4 columnas no entran | Convertir a card-list con `data-label` attributes + CSS `display:block` |
