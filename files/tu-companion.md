# Tu propio companion

El `brief-diario` que te llevaste de la sesión 4 es **un ejemplo**, no la respuesta.
Sirve si tu día se parece al mío. Esta es la receta para armar el tuyo, que es el
que de verdad vas a abrir todas las mañanas.

Toma como media hora la primera vez. Funciona igual en Claude Code, en Antigravity
o en cualquier agent que lea skills - las diferencias están al final, en el paso 7.

---

## Primero: la pregunta

Casi todo el mundo empieza mal, preguntándose *"¿qué puedo automatizar con esto?"*.
Esa pregunta no tiene fondo y te deja armando algo que suena bien y no usas.

**La pregunta que sirve es:** ¿cuál me hago todos los días y contesto a mano?

Tiene que ser una pregunta que ya te haces. No una que deberías hacerte.

| La pregunta | El companion que sale |
|---|---|
| ¿Qué tengo hoy y qué se me quedó sin contestar? | El `brief-diario` de la sesión |
| ¿Qué PR está esperando por mí y hace cuánto? | El de guardia del repo |
| ¿Qué se rompió anoche mientras yo dormía? | El de los errores de producción |
| ¿Qué le prometí a alguien esta semana y no he hecho? | El de los compromisos |
| ¿En qué se fue la plata este mes? | El de los gastos |
| ¿Qué cambió en el repo desde que me fui de vacaciones? | El de volver a entrar |

**Tres pruebas para saber si la tuya sirve.** Si falla una, todavía no es:

1. **La contestas hoy a mano.** Si nunca la has contestado, no sabes cómo se ve
   la respuesta buena, y entonces no vas a poder verificar la del agent.
2. **La respuesta cambia todos los días.** Si la respuesta de hoy sirve para el
   viernes, no necesitas un companion: necesitas un documento.
3. **La respuesta está repartida en dos o tres sitios.** Si está toda en una sola
   pantalla, abre esa pantalla. Un agent no te ahorra nada ahí.

La tercera es la que hace que valga la pena. El valor del `brief-diario` no es que
lea el correo: es que **cruza** el correo con el calendario, que es lo que tú no
ibas a hacer porque son dos pestañas distintas.

---

## Paso 1 · Escribe la respuesta antes de tocar nada

Coge un papel y **escribe a mano la respuesta que quieres**, con datos inventados.
Como si el companion ya existiera y te acabara de contestar.

```
QUÉ ME TOCA
  PR #412 de Marta - 2 días esperando - toca a auth, revisa con calma
  PR #418 de Luis - 4 horas - cambio de copy, se aprueba rápido

QUÉ ESTÁ TRABADO
  #405 lleva 6 días sin review de nadie

NO TE METAS
  #420 todavía está en draft
```

Esto es diez minutos y es el paso que más se salta la gente. Sin él vas a aceptar
la primera cosa que el agent te devuelva, porque no tienes con qué compararla.
Con él ya sabes qué estás pidiendo.

**Fíjate en el formato:** bloques fijos con nombre. No un párrafo. Un párrafo
distinto cada mañana no se lee en diagonal, y todo esto se lee en diagonal.

---

## Paso 2 · De la respuesta salen las tools

Ahora subraya en tu respuesta inventada **de dónde sale cada dato**. Eso te dice
exactamente qué MCP conectar y - más importante - cuáles *no*.

| Si tu respuesta menciona | Conectas |
|---|---|
| correos, quién escribió, qué falta contestar | el MCP de tu correo |
| reuniones, horas, quién viene | el de tu calendario |
| PRs, issues, quién revisó qué | el de GitHub o GitLab |
| errores, caídas, alertas de anoche | el de tu monitoreo |
| tickets, tareas, sprints | el de tu tracker |
| números de tu producto | el de tu base de datos |

**Conecta solo lo que tu respuesta necesita.** Cada MCP conectado le cuesta context
al agent en *cada* llamada: la lista de tools viaja completa, con nombre,
descripción y parámetros de cada una. Cinco servers conectados "por si acaso" es
menos sitio para tu trabajo, y un agent que escoge peor porque tiene cien tools
donde le bastaban seis.

---

## Paso 3 · Conecta, y haz el inventario antes de pedirle nada

Con el MCP conectado, **antes** de darle la tarea, pégale esto:

```
Ya tienes conectado un MCP nuevo. Antes de que te pida nada con él:

1. Lístame las tools que te dio, con lo que hace cada una en una línea.
2. Dime cuáles de ellas pueden cambiar o borrar algo, y cuáles solo leen.
3. Escoge la tarea más chica que puedas hacer con las de solo lectura,
   hazla, y muéstrame el resultado.

Después de eso, y no antes, seguimos con lo demás.
```

El punto 2 es el que importa. Saber cuáles escriben - antes de darle una tarea -
es la diferencia entre aprobar permisos leyendo y aprobar permisos por cansancio.

**Tu companion debería usar solo tools de lectura.** Si algún paso necesita
escribir, que lo deje propuesto: un borrador, no un envío.

---

## Paso 4 · La v1, en menos de 25 líneas

Llena esta plantilla. Se guarda como `SKILL.md` dentro de una carpeta con el
nombre de tu companion:

```markdown
---
name: nombre-corto-con-guiones
description: [qué arma, en una línea]. Úsala cuando pregunte [la pregunta
  del principio, con las palabras que tú usarías de verdad].
---

# [Nombre]

Solo lees. No mandas nada, no borras nada, no cambias nada.

## Pasos

1. [De dónde sacas lo primero, y qué guardas de ahí]
2. [De dónde sacas lo segundo, y qué descartas - sé específico]
3. [El cruce: qué sube al tope y por qué]
4. Escribe la salida, en este orden y nada más:
   - [BLOQUE 1]: [qué va]
   - [BLOQUE 2]: [qué va, y cuántos como máximo]
   - [BLOQUE 3]: [qué va]
5. Lo que no puedas verificar va aparte, bajo "Sin confirmar".

## Reglas

- Máximo [N] líneas.
- [La regla que ya sabes que va a hacer falta]
- Si después de filtrar no queda nada, dilo. Un "hoy no hay nada" es una
  respuesta correcta. Rellenar para que se vea lleno, no.
```

**El `description` es la mitad del archivo.** No describe qué hace la skill:
describe **en qué situación estás tú** cuando hace falta. "Genera un resumen
diario" no dispara nunca. "Úsala cuando pregunte qué tengo hoy o qué se me quedó
sin responder" sí, porque eso es lo que tú vas a escribir.

Y **la línea de "si no queda nada, dilo"** hace más trabajo del que parece. Sin
ella, un agent al que le pediste tres bloques te llena los tres, aunque tenga que
inventar para lograrlo.

---

## Paso 5 · Córrela y mira el output malo

Aquí es donde la gente cierra el archivo y dice que esto no sirve.

**Tu v1 va a devolver basura. Eso es información, no un fracaso.**

Cuando se corrió el `brief-diario` por primera vez, el paso de "busca el correo de
los últimos dos días" devolvió **201 cadenas de correos**, y ni una era una persona
esperando respuesta: avisos del banco, recibos de Uber, newsletters y bots
comentando un PR. Con el filtro escrito dentro de la skill, los mismos dos días
bajaron a **2**. La skill no sirvió hasta la segunda versión, y la segunda versión
salió de mirar la primera.

Tres síntomas, y qué arreglar en cada uno:

| Lo que te devuelve | Qué está pasando | Dónde se arregla |
|---|---|---|
| Mucho, y casi todo es ruido | El paso de búsqueda es muy ancho | El **filtro**, dentro de la skill. No el prompt. |
| Poco, y le falta lo importante | Filtraste de más, o buscaste en el sitio equivocado | El mismo paso, aflojando una condición a la vez |
| Se ve bien, pero hay datos que no reconoces | Está rellenando para completar el formato | La regla de "si no queda nada, dilo" |

**El arreglo casi siempre va dentro del archivo, no en lo que le escribes.** Si lo
arreglas hablándole en el chat, mañana vuelve a estar malo: mañana es otra sesión
y ese chat ya no existe.

---

## Paso 6 · Pruébala en sesión limpia

Lo mismo que hiciste con el AGENTS.md, y por la misma razón. Si la pruebas en la
sesión donde la escribiste, el agent ya tiene los pasos en context y los sigue
aunque el archivo esté vacío. **No probaste nada.**

Cierra. Abre otra. **Escribe tu pregunta, tal como te sale, sin mencionar la skill.**

- **La cargó sola:** quedó.
- **No la cargó:** el `description` está escrito como título. Reescríbelo con las
  palabras que acabas de escribir tú, que son las de verdad.

Este es el único paso que no puedes saltarte, porque es el único que distingue un
archivo que sirve de un archivo que existe.

---

## Paso 7 · Que corra solo

Solo después de que el brief te haya servido varios días seguidos. Automatizar uno
que todavía no te sirve es garantizar que no lo vas a leer.

**Claude Code.** Lo más fácil es pedírselo con palabras, en cualquier sesión:
*"prográmame esto todos los días a las 7am"*. Guarda la tarea, y la tarea es - otra
vez - un `SKILL.md`, en `~/.claude/scheduled-tasks/<nombre>/`. Corre en tu máquina,
así que necesita la app abierta y la computadora despierta; si duerme a esa hora,
la corrida se salta. Para que corra aunque la computadora esté apagada, eso son las
routines, que van en la nube y llevan sus connectors aparte.

**Antigravity.** Tiene Scheduled Tasks: le pones horario, prompt y proyecto, y el
agent arranca solo en el fondo. La conversación te aparece después en el sidebar,
igual que si la hubieras abierto tú.

**Cualquier otro.** Si tu agent corre desde el terminal, un `cron` que lo llame y
te mande la salida hace lo mismo. Menos bonito, igual de útil.

**Tres reglas para el automático:**

1. **Nada que escriba hacia afuera.** Sin ti mirando, "propuesto, no enviado" deja
   de ser un consejo y pasa a ser lo único que te protege.
2. **Que sepa qué hora es.** Una tarea de las 7am puede correr a las 11pm si la
   máquina estuvo dormida. Pon la guardia dentro de la skill: *"si ya pasaron las
   10am, dilo en la primera línea"*.
3. **Léelo la primera semana.** Si a los cinco días lo estás pasando por alto, el
   problema no es el horario: es que la pregunta del principio no era tuya.

---

## La checklist

- [ ] La pregunta que ya me hago todos los días, escrita
- [ ] La respuesta que quiero, inventada a mano, con bloques fijos
- [ ] Los MCP que esa respuesta necesita - y solo esos - conectados
- [ ] El inventario hecho: sé cuáles tools leen y cuáles escriben
- [ ] La v1 escrita en menos de 25 líneas
- [ ] La corrí, salió mal, y arreglé **el archivo** y no el prompt
- [ ] La cargó sola en sesión limpia, sin que yo la nombrara
- [ ] Me sirvió varios días seguidos **antes** de programarla

---

Los materiales de las cuatro sesiones: <https://eonoe.github.io/coding-agents-101/>
