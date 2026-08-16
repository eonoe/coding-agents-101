# Coding Agents 101 — materiales

Los materiales del workshop **Coding Agents 101**: cuatro sesiones en vivo sobre cómo
sacarle trabajo real a un coding agent en vez de usarlo como autocomplete caro.

**El kit está aquí → <https://eonoe.github.io/coding-agents-101/>**

Ahí vive todo lo que se usa en vivo: los comandos de instalación por carril, los
prompts para copiar, el glosario y las descargas. Es la página que conviene dejar
abierta durante la sesión.

## Qué hay en este repo

| Ruta | Qué es |
|---|---|
| [`index.html`](index.html) | El kit de la sesión 1 |
| [`slides.html`](slides.html) | Las láminas de los segmentos de concepto |
| [`files/AGENTS.md`](files/AGENTS.md) | Plantilla de `AGENTS.md` para tu proyecto |
| [`files/revision.md`](files/revision.md) | Checklist para revisar lo que escribió un agent |
| [`files/prompts.md`](files/prompts.md) | Los prompts que vale la pena guardar |
| [`example/`](example/) | Un proyecto de práctica, por si no traes repo propio |

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

1. **Pon un coding agent a trabajar** — el loop `gather → act → verify`, y ponerlo a hacer algo real
2. **Context** — por qué no leyó lo que creías, y tu primer `AGENTS.md`
3. **Revisión** — leer lo que escribió y empujar de vuelta
4. **Que quede** — workflows reutilizables, los límites, y preguntas abiertas

El workshop completo: <https://eonoe.github.io/>
