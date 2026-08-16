# Cómo revisar lo que escribió un agent

Revisar código de un agent no es lo mismo que revisar código de un compañero. Con un
compañero asumes intención: si hizo algo raro, por algo fue. Esa suposición con un
agent te sale cara. Produce código que se ve bien por defecto, y "se ve bien" es
justamente lo que se cuela en una revisión rápida.

Esto es la sesión 3 completa. Hoy te lo llevas para que lo uses desde ya.

---

## Antes de leer nada

```bash
git status
git diff --stat
```

Empieza siempre por la lista de archivos, antes de abrir el código.

La pregunta que importa aquí no es si el cambio está bien, sino **por qué tocó ese
archivo**. Un archivo que no esperabas ver en la lista es la señal de alarma más barata
que existe: cuesta cinco segundos y atrapa más problemas que leerte el diff línea por
línea.

Si tocó más archivos de los que pediste, para ahí. No sigas revisando: acota la
tarea y pídesela otra vez más chica.

---

## Los seis pases

En orden. Los primeros tres atrapan casi todo, y son rápidos.

### 1 · ¿Inventó algo?

Lo más común y lo más difícil de ver, porque lo inventado se ve igual de bien que lo
real.

- [ ] ¿Existen de verdad las funciones, métodos y campos que llama?
- [ ] ¿Existen las librerías que importó, y están en las dependencias?
- [ ] ¿Los comandos que documentó corren de verdad? **Corre uno.**
- [ ] ¿Los archivos y rutas que menciona existen con ese nombre exacto?

> La versión rápida: agarra la afirmación más específica del cambio y verifícala.
> Si esa está mal, revisa todo con lupa. Si está bien, tampoco te confíes, pero sigue.

### 2 · ¿Hizo lo que le pediste, ni más ni menos?

- [ ] ¿Resuelve lo que pediste?
- [ ] ¿Hizo cosas de más que no pediste? (renombrar, "limpiar", reformatear)
- [ ] ¿Borró algo que no mencionó?
- [ ] ¿Cambió comportamiento público sin decirlo?

> El código de más es más peligroso que el código malo. El malo lo ves; el de más
> pasa porque se ve prolijo.

### 3 · ¿Y si algo sale mal?

Aquí es donde un agent falla parejo, porque el camino feliz es lo que optimiza.

- [ ] ¿Qué pasa con `null`, `undefined`, lista vacía, string vacío?
- [ ] ¿Los errores se manejan o se tragan? **Un `catch` vacío es un bug.**
- [ ] ¿Qué pasa si falla la red, el disco, la query?
- [ ] Los números: ¿decimales, redondeo, división por cero?

### 4 · ¿Encaja con este proyecto?

- [ ] ¿Sigue las convenciones que ya existen, o trajo las suyas?
- [ ] ¿Reimplementó algo que ya estaba en el repo? (pasa muchísimo)
- [ ] ¿Agregó una dependencia que no hacía falta?
- [ ] ¿Los nombres suenan al dominio de este proyecto o a genéricos de tutorial?

### 5 · Seguridad, aunque la tarea no fuera de seguridad

- [ ] ¿Hay secretos, keys o tokens escritos en el código?
- [ ] Entrada del usuario: ¿validada antes de usarse?
- [ ] SQL armado con concatenación de strings.
- [ ] ¿Bajó algún permiso o control que ya existía?

### 6 · Los tests, si escribió

- [ ] ¿Fallan si rompes el código a propósito? **Si no fallan, no son tests.**
- [ ] ¿Prueban comportamiento o prueban la implementación línea por línea?
- [ ] ¿Hay algún assert que no puede fallar nunca (`expect(true).toBe(true)`)?

---

## Cómo se empuja de vuelta

El error más caro es aceptar un cambio a medias porque rechazarlo completo da pereza.
Tienes tres salidas y son distintas:

| Situación | Qué haces |
|---|---|
| Está bien casi todo, con un pedazo malo | **Quédate con lo bueno y arregla lo malo tú.** Suele ser lo más rápido. |
| El enfoque está mal desde la raíz | `git checkout .` y vuelve a pedirlo con más restricciones. **No lo negocies parche por parche.** |
| No entiendes por qué hizo algo | Pregúntale antes de aceptarlo. Si la explicación no se sostiene, no se sostiene el código. |

Y una regla que ahorra noches: si no entiendes un cambio, no lo mergeas. Da igual que
los tests pasen. El código que no entiendes lo vas a mantener tú igual.

---

## Frases que sirven

Para que se revise a sí mismo antes de que lo revises tú:

```
Revisa lo que acabas de escribir como si fueras un reviewer hostil. Para cada
afirmación, cítame archivo y línea que la respalde. Lístame lo que no puedas
respaldar.
```

Para sacarle lo que no te dijo:

```
¿Qué asumiste al hacer esto que yo no te dije explícitamente?
```

```
¿Qué se rompe con este cambio? Dime los casos, no me digas que no se rompe nada.
```

---

## La señal de que estás revisando bien

Que encuentres algo. Siempre.

Si llevas varias revisiones seguidas sin encontrar nada, lo más probable no es que el
agent se haya vuelto perfecto. Es que dejaste de revisar y empezaste a hojear. Así es
como la calidad se cae sin que nadie lo note, y cuesta meses darse cuenta.
