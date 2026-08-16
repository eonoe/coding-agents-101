# AGENTS.md - plantilla

Copia este archivo a la raíz de tu proyecto como `AGENTS.md` y llénalo.

Casi todos los coding agents lo leen solos al arrancar una sesión. Claude Code lee
`CLAUDE.md` además de este; si usas Claude Code, un `CLAUDE.md` con una línea que
diga `Lee AGENTS.md` te evita mantener dos archivos.

**Esto lo trabajamos a fondo en la sesión 2.** Hoy te lo llevas para que exista.

---

## Cómo llenarlo sin perder la tarde

Tres reglas separan un AGENTS.md que sirve de uno que el agent ignora.

La primera: escribe solo lo que no puede deducir leyendo el repo. Que uses React ya lo
ve en el `package.json`. Que los componentes nuevos van en `src/features/` y no en
`src/components/` no lo ve en ningún lado, y eso es justamente lo que va aquí.

La segunda: cada línea tiene que cambiar algo que el agent haría distinto. Bórrala
mentalmente. Si el resultado es el mismo, sobra.

La tercera: empieza corto. Quince líneas hoy, y una regla más cada vez que el agent
haga algo que te dé rabia. Es más rápido que sentarte a escribirlo completo, y termina
mejor, porque cada regla nació de un problema real.

Cuidado con el archivo largo y desactualizado. Un AGENTS.md de 200 líneas que nadie
mantiene hace más daño que uno de 20 que está al día, porque el agent se lo cree
completo.

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

[Si hace falta algo antes (variables de entorno, una base de datos, un servicio
levantado), dilo aquí. Es lo primero con lo que el agent se va a tropezar.]

## Estructura

[Solo las carpetas donde el agent va a tener que trabajar de verdad. No pegues el
árbol completo: eso ya lo puede ver.]

- `ruta/` - qué vive aquí y qué NO
- `ruta/` - qué vive aquí y qué NO

[Si alguna carpeta tiene un nombre que engaña, dilo explícito. Eso vale por diez
líneas de descripción.]

## Convenciones

[Las decisiones que ya tomaron y que no se discuten en cada PR.]

- [Nombres: cómo se llaman los archivos, los tests, los branches.]
- [Errores: se lanzan, se devuelven, se loguean. Escoge y dilo.]
- [Tests: qué se testea de verdad y qué no vale la pena.]
- [Formato: si hay linter o formatter, nombra el comando en vez de describir el estilo.]

## Lo que no se toca

[La sección más valiosa del archivo. Lo que se rompe si alguien lo mueve
sin saber.]

- `archivo/carpeta` - por qué no se toca
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

Leerlo no te dice nada. Pruébalo: abre una sesión nueva en frío, pídele una tarea chica
pero real de tu proyecto, y fíjate si respetó tus convenciones sin que se las repitieras.

Lo que haya ignorado está mal escrito, o directamente no estaba. Eso es lo que arreglas.

Hay una prueba todavía más dura. Pídele que haga algo que viole una de tus reglas. Si el
archivo está bien escrito, te dice que no puede, o al menos pregunta antes.
