# Coding Agents 101 - materiales

Los materiales del workshop **Coding Agents 101**: cuatro sesiones en vivo sobre cómo
sacarle trabajo real a un coding agent en vez de usarlo como autocomplete caro.

**Empieza aquí → <https://eonoe.github.io/coding-agents-101/>**

| Página | Para qué |
|---|---|
| `/` | Los cuatro días. Marca cuál es hoy. |
| `/dia-1/` … `/dia-4/` | Lo de esa sesión: los prompts, la tarea y el homework |
| `/kit/` | Lo que no cambia: instalación, glosario, camino sin terminal, descargas |

Los atajos `/1/`, `/2/`, `/3/` y `/4/` llevan al día que toca. Son más fáciles de
decir en voz alta durante una llamada que `/dia-2/`.

## Qué hay en este repo

| Ruta | Qué es |
|---|---|
| [`index.html`](index.html) | El hub de los cuatro días |
| [`kit/`](kit/) | La referencia que sirve para las cuatro sesiones |
| [`dia-1/`](dia-1/) … `dia-4/` | Una página por sesión |
| [`assets/kit.css`](assets/kit.css) | Los estilos, compartidos por todas las páginas |
| [`slides.html`](slides.html) | Las láminas de los segmentos de concepto |
| [`files/AGENTS.md`](files/AGENTS.md) | Plantilla de `AGENTS.md` para tu proyecto |
| [`files/revision.md`](files/revision.md) | Checklist para revisar lo que escribió un agent |
| [`files/prompts.md`](files/prompts.md) | Los prompts que vale la pena guardar |
| [`example/`](example/) | Un proyecto de práctica, por si no traes repo propio |

## Publicar el día siguiente

Cada `dia-N/index.html` arranca como una página de "todavía no". El día que toca:

1. Le pones el contenido de esa sesión. La estructura de `dia-1/` sirve de molde:
   hero, secciones, y la barra `daynav` al final.
2. **En `index.html`, le agregas `data-lista="si"` a la tarjeta de ese día.**

El segundo paso es fácil de olvidar y es el que cambia el badge en el hub:

```html
<a class="day" href="dia-2/" data-fecha="2026-08-18" data-lista="si">
```

Las tarjetas señalan dos cosas distintas y por eso hacen falta los dos atributos:

| Atributo | Qué dice | Badge |
|---|---|---|
| `data-fecha` | cuándo es la sesión | `hoy` si es hoy, atenuada si ya pasó |
| `data-lista` | si la página ya tiene contenido | `lista` con contenido, `pronto` sin él |

Sin separarlos, el día 1 diría "pronto" el domingo aunque su página ya esté escrita.

Los estilos viven en `assets/kit.css`, así que **no se copian estilos entre páginas**.
Si tocas el CSS, cambia en las cinco a la vez.

## El proyecto de práctica

Si no puedes usar código de tu empresa, o simplemente no traes un repo a mano:

```bash
git clone https://github.com/eonoe/coding-agents-101
cd coding-agents-101/example
git checkout -b agente-sesion-1
node index.js
```

**Abre tu agent dentro de `example/`, no en la raíz del repo.** Si lo abres afuera va a
leer estos materiales en vez del proyecto, y el ejercicio pierde la gracia.

Es un CLI que divide los gastos de un viaje. No necesita instalar nada, corre con Node,
y tiene los problemas que tiene cualquier proyecto real al que nadie le ha dado cariño
en un tiempo. Esa es la idea.

## Correrlo local

Es HTML estático, sin build y sin framework.

```bash
python3 -m http.server 8765
```

Después abre <http://localhost:8765/>. Los links internos son relativos porque GitHub
Pages sirve esto bajo `/coding-agents-101/`, así que no uses rutas que empiecen con `/`.

## Las cuatro sesiones

1. **Pon un coding agent a trabajar** - el loop `gather → act → verify`, y ponerlo a hacer algo real
2. **Context** - por qué no leyó lo que creías, y tu primer `AGENTS.md`
3. **Revisión** - leer lo que escribió y empujar de vuelta
4. **Que quede** - workflows reutilizables, los límites, y preguntas abiertas

El workshop completo: <https://eonoe.github.io/>
