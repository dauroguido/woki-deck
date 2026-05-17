# Brief de mejoras para la presentación Woki

> Documento de trabajo para implementar mejoras sobre la presentación actual del deck (`woki-deck.vercel.app`). Cubre cambios de copy, estructura, branding y agregados nuevos. Ordenado para ejecución secuencial.

---

## Posicionamiento que tiene que sostener cada decisión

Antes de tocar nada, dos ideas-ancla que el deck tiene que reforzar en todo momento:

1. **Woki es reservas Y hospitalidad**, no una cosa o la otra. El sistema de reservas está a la altura o por encima de cualquier competidor — pero lo que justifica pasarse es todo el resto: HM, marketing, briefs, métricas, pagos. Esto resuelve la objeción "ya tengo un sistema" sin pedir disculpas.

2. **El Hospitality Manager es el gamechanger.** Las herramientas que tiene Woki alrededor (email marketing, ads, briefs, perfiles) las podría tener cualquiera. Lo que las hace únicas es el HM alimentándolas con insights que ningún otro sistema tiene. *Mismas herramientas, datos imposibles de replicar.* Ese es el ángulo.

---

## Sección 1 — Apertura

Hoy: logo + tagline + océano blanco. Hay que llenar el viewport.

**Cambios:**

Mantener el tagline ("El sistema de reservas y hospitalidad para los mejores restaurantes.") como está.

Agregar **debajo del tagline**, un proof point breve. Como cobrabilidad sale de la apertura (necesita contexto), reemplazar por algo que comunique escala + categoría sin necesidad de explicación. Opciones, en orden de preferencia:

- **"+700 restaurantes en Argentina, Chile y la región."** — breve, regional, número real.
- **"+700 restaurantes confían en Woki."** — más simple, aspiracional.
- **"Líder en Argentina y Chile. +700 restaurantes."** — combina categoría y escala.

Recomendación: la primera.

Agregar **la grilla de logos de partners abajo del proof**. El CSS de `.apertura__logos` ya existe en el código, solo está sin HTML que lo use. Recuperarlo con los mismos 9 logos del cierre (Trescha, La Cabrera, Madre Rojas, Lagarde, Anchoita, Gardiner, Ajo Negro, Ness, La Mar) sobre el fondo dark navy que ya tiene definido. Esto hace todo el trabajo aspiracional en los primeros 3 segundos.

---

## Sección 2 — Problema + Dimensionamiento + Calculadora (fusión)

Esta es la fusión más fuerte. Hoy son dos secciones (la 2 y la 8) que no se hablan. La 2 plantea el problema con un dashboard genérico y la 8 cierra con la calculadora. Funcionan mejor juntas, al principio.

**Nueva estructura propuesta para la sección 2:**

1. **Pregunta retórica** (mantener exactamente como está):
   > *"¿Cuántos clientes salieron de tu restaurante encantados… y nunca más volvieron?"*

2. **Eliminar el dashboard mockup** (el panel azul con KPIs y barras). Era un placeholder ilustrativo que ahora hace ruido frente al nuevo flujo.

3. **Las 3 stats de fuente** (las que estaban en sección 8) — 5% / 51% / 67% con sus copies y notas al pie. Quedan exactamente como en la 8 actual, solo que ahora dimensionan el problema en vez de cerrarlo.

4. **La calculadora** (la misma de la sec 8 actual), debajo de las stats. Mismo diseño, misma lógica.

5. **Cierre puente** — una frase que conecta la magnitud del problema con la promesa Woki:
   > *"Woki te da las herramientas para que esto cambie. Empezando por conocer a tus clientes de verdad."*

   Esa frase hace doble trabajo: cierra el problema y sirve de hook para entrar al HM en la sección siguiente.

**Consecuencia:** la sección 8 "Resultados" actual desaparece como standalone. La narrativa queda: problema (con escala y plata real) → solución (HM como puerta de entrada) → cómo se ve en cada momento del servicio → implementación → cierre. Una sección menos, más fuerza al inicio.

---

## Sección 3 — Hospitality Manager (parte A)

El concepto y el visual están bien. Lo que necesita ajuste es el copy para que se lea **el ángulo del gamechanger**: HM no es "un dashboard de clientes más", es lo que convierte tus herramientas comunes en algo único.

**Cambios:**

Mantener:
- El "Powered by AI · Incluido en todos los planes Woki"
- El nombre "Hospitality Manager" con la tipografía hero en gradiente
- El esquema visual antes/después (Excel → flecha → perfil de María)

Cambiar el subtítulo. Hoy dice: *"Pasá de números y estadísticas a conocimiento real sobre tus clientes."*

Reemplazar por algo que conecte con el ángulo del gamechanger. Opciones:

- *"Email marketing, campañas, briefs, perfiles. Las herramientas las tienen todos. Lo que Woki sabe sobre tu cliente, no."*
- *"Las mismas herramientas que ves en cualquier lado, alimentadas por datos que solo Woki tiene."*
- *"El cerebro que convierte cada herramienta de Woki en una máquina hecha a medida de tu restaurante."*

**Recomendación: la tercera**, porque hace de puente directo con la sec 3B ("El cerebro detrás de cada herramienta de Woki"). Mantiene una idea-ancla repetida con dos formulaciones distintas.

Las etiquetas "El status quo" y "Perfil accionable con IA" en las dos columnas funcionan, no tocar.

---

## Sección 3B — El núcleo (re-paletado)

Concepto: mantener. Cambiar paleta.

Hoy usa cyan / violeta neón / naranja sobre near-black. Es visualmente fuerte pero rompe el manual de marca B2B, que pide minimalismo y caliente las comunicaciones B2B para que no queden frías. Para el lector típico (dueño de fine dining, café, bodega) genera disonancia con el resto del sistema.

**Migración a paleta B2B oficial:**

- **Fondo**: cambiar de `#060912` a `#202B3F` (Azul 2 del manual) o `#0E0F12` (ink).
- **Gradiente del núcleo y de las líneas**: pasar de `#1AAFDE → #B210FF → #FFAD5C` al gradiente B2B oficial `#202B3F → #0066CC`. Si necesitás un tercer color para los acentos, agregar un toque del `#EEF4FC` (B2B-50) para los highlights, no naranja neón.
- **Glow/aurora del fondo**: usar rgba del `#0066CC` en lugar de los tonos púrpura/cyan actuales.
- **Eyebrow "El núcleo · IA en tiempo real"**: usar el mismo gradiente B2B en lugar del actual.

El concepto, la composición orbital y los items conectados quedan idénticos. Solo cambia el tinte.

Mantener el copy del título ("El cerebro detrás de cada herramienta de Woki") y el subtítulo.

---

## Sección 4 — Antes del servicio

**Eliminar las tabs.** En leave-behind las tabs son veneno: la persona que abre el deck por segunda mano nunca clickea, y se pierde 2 de los 3 argumentos. Convertir las 3 tabs en 3 bloques verticales que se ven con scroll. El orden actual está bien (Perfil del restaurante → Campañas y email segmentado → Eventos y experiencias).

**Cambios de copy:**

- Título: hoy dice *"Activás tu base con audiencias precisas."* — "audiencias" es jerga de marketing digital. Cambiar por:
  > *"Activá los clientes que ya tenés."*

- Subtítulo: hoy dice *"Tres formas de convertir tu base de datos en reservas reales."* — "base de datos" es frío. Cambiar por:
  > *"Tres formas de convertir tus clientes en visitas que se repiten."*

**Mantener:**
- Los 3 bloques internos (Perfil con callouts, Email segmentado con sub-tabs, Eventos con cards y precios).
- Los precios actuales en los cards de eventos. No tocarlos.

**Nota técnica:** las sub-tabs internas del bloque "Campañas y email segmentado" (Recuperar dormidos / Fidelizar nuevos / Mantener fieles) son aceptables porque ya está adentro del bloque y son una microelección. No sacarlas.

---

## Sección 5 — Michelin

**No integrar, no mover radicalmente.** Es diferencial fuerte y merece sección propia. La ubicación actual (después de "Antes del servicio", antes de "Integraciones") funciona si la enmarcamos como "el canal de captación premium". El arco antes/durante/después se entiende igual porque Michelin opera en el "antes" (genera reservas que ingresan).

**Único cambio de copy sugerido**, para hacer más claro el carácter de canal exclusivo:

- Subtítulo: hoy dice *"Woki es el sistema integrado para que los restaurantes de la Guía Michelin reciban reservas directo en su panel."* — repite lo del título. Cambiar por:
  > *"El único sistema integrado con la Guía. Reservas directas, sin intermediarios, en tu panel de siempre."*

El resto (mockup del perfil Michelin, conector, panel Woki con reservas entrantes) está bien.

---

## NUEVA Sección — Pagos

**Posición:** insertar entre Michelin y el banner de Integraciones.

**Título:** *"Cobrá lo que tu restaurante necesita, sin fricciones."*

**Subtítulo:** *"Una pasarela de pagos hecha a medida para la gastronomía."*

**3 use cases visualizados** (cards o bloques horizontales):

1. **Anticipos para eventos y experiencias** — *"Cobrá la reserva como si fuera una entrada. Para tus menús degustación, maridajes y aperturas."*
2. **Garantías para grupos y horarios pico** — *"Pedí tarjeta en garantía configurable por tamaño, día, sector u horario."*
3. **Penalidades por no-show** — *"Cobrá automáticamente si la reserva no se presenta. El monto y la lógica los definís vos."*

**Capa adicional** debajo de los use cases, dos diferenciales destacados:

> **Tarjetas internacionales sin fricción** — los turistas y huéspedes reservan y pagan desde cualquier país.
>
> **+95% de cobrabilidad** — la tasa más alta de LatAm, gracias a la pasarela hecha a medida con Yuno.

Acá la cobrabilidad sí tiene contexto y suma. No ponerla en la apertura.

**Diseño:** mantener la línea visual del resto (cards blancos con borde suave, número o ícono lucide, copy en jerarquía limpia). Mencionar "Yuno" en una nota pequeña al pie del slot 3, no en el título.

---

## Banner Integraciones

Cambio mínimo. Hoy el eyebrow dice "Integraciones nativas" y el título "Conectado con los sistemas que tu restaurante ya usa."

Reemplazar el título por:

> *"Integrá todas tus herramientas en una sola plataforma."*

El eyebrow "Integraciones nativas" queda. La tira de logos queda. No agregar nada más.

---

## Sección 6 — Durante el servicio

**No tocar.** Es la mejor sección del deck. Brief pre-servicio + GuestCenter + perfil expandido. Quedó como está.

---

## Sección 7 — Después del servicio

**Cambio de título.** Hoy dice *"Analizá las métricas operativas, de marketing y de reseñas de tu restaurante."* — descriptivo y plano. Cambiar por:

> *"Cada turno te deja datos. Woki los convierte en decisiones."*

Subtítulo actual ("Lo que aprendés de cada turno se vuelve la decisión del próximo") está bien, queda.

**Agregar** una mención del reporte mensual automático — resuena con los dueños no-data-savvy. Puede ser una línea al pie de la sección o un cuarto bloque pequeño:

> *"Y todos los meses te llega al mail un resumen con lo más importante. Para que conocer tu restaurante no sea una tarea más."*

**Detalle menor pero útil:** en la grilla de Métricas Operativas, las 6 cajas tienen todas flechas verdes hacia arriba. Una con flecha roja o flat le daría credibilidad a la demo. No es crítico.

---

## NUEVO bloque puente — "Lo que ya hacés sigue. Todo lo demás cambia."

Esta es la traducción del pedido sobre el sistema de reservas. No necesita una sección entera, es una frase puente arriba de Implementación.

**Posición:** justo antes del slide de Implementación, como capa visual que ocupa medio viewport. Puede compartir contenedor con Implementación (no necesita ser sección scrollable propia con `min-height:100vh`).

**Estructura:**

Eyebrow chiquito: `MIGRACIÓN SIN PÉRDIDAS`

Headline grande:

> *"Lo que ya hacés con tu sistema, en Woki funciona igual o mejor."*

Subline:

> *"Pero lo que cambia es todo lo demás: cómo conocés a tus clientes, cómo los recuperás, cómo planificás cada turno, cómo medís lo que pasa."*

Esto resuelve la objeción "ya tengo un sistema" antes de mostrar el "72hs" de implementación. Psicológicamente baja la fricción en el momento exacto.

---

## Sección — Implementación

Simplificar.

**Mantener:** el "72hs" gigante, los 3 pasos (Migración / Configuración / Capacitación), los íconos.

**Cambiar el subtítulo.** Hoy dice *"Migrás tus datos, configuramos Woki y capacitamos a tu equipo. Estás operativo en menos de 72 horas."* — repite el "72hs" que ya está gigante.

Reemplazar por algo más corto que enfatice "poco esfuerzo":

> *"Lo hacemos nosotros. Vos te ocupás del restaurante."*

Sub-bajada opcional:

> *"Migración, configuración y capacitación incluidas."*

---

## Sección 8 — Resultados → ELIMINAR

Como la calculadora y las 3 stats se subieron a la sección 2, esta sección se elimina entera. La transición queda:

> ... Después del servicio → bloque puente "Lo que ya hacés sigue..." → Implementación → Cierre

Si queda corto sin un cierre conceptual antes de implementación, una alternativa es agregar un slide-resumen tipo *"Esto es lo que cambia cuando elegís Woki"* con 4 bullets-fuerza. Pero la recomendación es **no agregarlo**: la pieza queda más corta y más fuerte sin él.

---

## Sección 10 — Cierre

**Mantener:** título *"Los mejores restaurantes ya están en Woki."*, la grilla de partners, el flourish SVG arriba y abajo.

**Cambios:**

- Eliminar el botón "Descargar PDF" (ya hecho, confirmar que esté en deploy).
- Diferenciar los dos CTAs. Hoy ambos van al mismo WhatsApp con copies similares. Sugerencias:
  - **Primario:** *"Agendá tu demo"*
  - **Secundario:** *"Hablanos por WhatsApp"*
- Agregar una frase emocional debajo de los CTAs:
  > *"Marcá la diferencia con tu hospitalidad. Te acompañamos."*

Esta frase recoge dos guiños del manual de marca: "marcá la diferencia" (tagline B2B explícito) y "te acompañamos" (tono cercano del voice oficial).

---

## Orden final del deck propuesto

1. **Apertura** — tagline + proof "+700 restaurantes…" + grilla partners
2. **Problema + dimensionamiento + calculadora** — fusión nueva
3. **Hospitality Manager — parte A** — copy reescrito con ángulo gamechanger
4. **Hospitality Manager — el núcleo** — re-paletado a B2B oficial
5. **Antes del servicio** — sin tabs, 3 bloques verticales
6. **Michelin** — copy del subtítulo afinado
7. **Pagos** — *(sección nueva)*
8. **Banner integraciones** — solo cambia el título
9. **Durante el servicio** — sin cambios
10. **Después del servicio** — título nuevo + mención del reporte mensual
11. **Puente "Lo que ya hacés sigue. Todo lo demás cambia"** — frase grande sobre implementación
12. **Implementación** — subtítulo más corto
13. **Cierre** — sin PDF, CTAs diferenciados, frase emocional

Total: 12 secciones reales + 1 puente. Equivalente o más corto que el deck actual.

---

## Notas para Claude Code

- Todos los cambios de copy son sugerencias concretas: copiar tal cual o pedir variantes.
- El re-paletado de la sección 3B es el cambio más invasivo a nivel código. Es cambiar variables del gradiente y de los rgba del fondo en un solo lugar — centralizar los tokens si no lo están.
- La sección nueva de Pagos no tiene un mockup definido en este brief. Si se quiere un mockup tipo el de Mare en sec 4 (tablet con interfaz de pago de Woki), pedirlo aparte. Si no, los 3 cards horizontales + capa de diferenciales bastan.
- La fusión de sec 2 + sec 8 implica mover componentes existentes, no rehacerlos. La calculadora ya está construida.
- El bloque puente "Lo que ya hacés sigue" puede compartir contenedor con el slide de Implementación.
- Actualizar el side-nav (los dots de la derecha) para que refleje el nuevo orden de secciones y los nuevos IDs (`pagos`, etc.).
- Actualizar los meta tags (`og:description`) para reflejar números coherentes con el contenido del deck.
