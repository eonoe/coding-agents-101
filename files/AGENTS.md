# AGENTS.md — plantilla

Copia este archivo a la raíz de tu proyecto como `AGENTS.md` y llénalo.

Casi todos los coding agents lo leen solos al arrancar una sesión. Claude Code lee
`CLAUDE.md` además de este; si usas Claude Code, un `CLAUDE.md` con una línea que
diga `Lee AGENTS.md` te evita mantener dos archivos.

**Esto lo trabajamos a fondo en la sesión 2.** Hoy te lo llevas para que exista.

---

## Cómo llenarlo sin perder la tarde

Tres reglas, y son las que separan un AGENTS.md que sirve de uno que se ignora:

1. **Escribe solo lo que el agent no puede deducir leyendo el repo.** Que uses React
   ya lo ve en el `package.json`. Que los componentes nuevos van en `src/features/` y
   no en `src/components/` no lo ve en ningún lado. Eso segundo es lo que va aquí.
2. **Cada línea tiene que cambiar algo que el agent haría distinto.** Si la borras y
   el resultado es el mismo, sobra.
3. **Empieza corto y agrega cuando te moleste algo.** La forma más rápida de llegar a
   un buen AGENTS.md es escribir 15 líneas hoy y agregar una regla cada vez que el
   agent haga algo que te dé rabia.

Un AGENTS.md de 200 líneas que nadie mantiene es peor que uno de 20 que está al día:
el agent se lo cree completo.

---

<!-- ─────────── de aquí para abajo empieza la plantilla ─────────── -->

# [Nombre del proyecto]

[Una o dos frases: qué es esto y para quién. Si alguien nuevo lee solo esto,
tiene que entender de qué va el negocio, no solo la tecnología.]

## Cómo correrlo

```bash
# El comando real para levantarlo en local. Pruébalo antes de escribirlo aquí.
```

```bash
# Cómo correr los tests.
```

[Si hace falta algo antes — variables de entorno, una base de datos, un servicio
levantado — dilo aquí. Es lo primero con lo que el agent se va a tropezar.]

## Estructura

[Solo las carpetas donde el agent va a tener que trabajar de verdad. No pegues el
árbol completo: eso ya lo puede ver.]

- `ruta/` — qué vive aquí y qué NO
- `ruta/` — qué vive aquí y qué NO

[Si alguna carpeta tiene un nombre que engaña, dilo explícito. Eso vale por diez
líneas de descripción.]

## Convenciones

[Las decisiones que ya tomaron y que no se discuten en cada PR.]

- [Nombres: cómo se llaman los archivos, los tests, las ramas.]
- [Errores: se lanzan, se devuelven, se loguean. Escoge y dilo.]
- [Tests: qué se testea de verdad y qué no vale la pena.]
- [Formato: si hay linter o formatter, nombra el comando en vez de describir el estilo.]

## Lo que no se toca

[La sección más valiosa del archivo. Lo que se rompe si alguien lo mueve
sin saber.]

- `archivo/carpeta` — por qué no se toca
- [Migraciones, código generado, cualquier cosa con un contrato hacia afuera.]

## Antes de dar algo por terminado

[La lista que quieres que corra sin que se lo recuerdes.]

- [ ] [comando de tests]
- [ ] [comando de lint / typecheck]
- [ ] [cualquier otra puerta de calidad]

## Cosas que sorprenden

[Lo que un dev nuevo pregunta en su primera semana. Si el equipo tiene una
explicación oral que se repite siempre, aquí es donde deja de ser oral.]

- [Esa cosa rara que parece un bug pero es a propósito, y por qué.]

<!-- ─────────── fin de la plantilla ─────────── -->

---

## Cómo saber si sirve

No lo leas para revisarlo. **Pruébalo:**

1. Sesión nueva, en frío.
2. Pídele una tarea chica pero real de tu proyecto.
3. Mira si respetó las convenciones sin que se las repitieras.

Lo que ignoró está mal escrito, o no estaba. Eso es lo que arreglas.

Y una prueba más honesta todavía: pídele que haga algo que **viole** una de tus
reglas. Si el archivo sirve, te va a decir que no puede o va a preguntar.
