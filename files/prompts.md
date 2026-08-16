# Prompts que vale la pena guardar

Hay listas de doscientos prompts dando vueltas por internet. Nunca volví a abrir
ninguna. Estos son los pocos que sí uso todas las semanas.

Funcionan igual en Claude Code, Codex CLI, opencode, Antigravity CLI o un GUI. Un
prompt que solo funciona en una herramienta es un truco de esa herramienta.

---

## Los tres de la sesión 1

¿Por qué tres y no uno? Porque un prompt grande te devuelve una caja negra. Con tres
ves el loop por dentro y puedes revisar cada paso por separado.

### 1 · Gather — que lea antes de tocar

```
Explora este repositorio sin modificar nada.

Explícame:
1. Qué hace este proyecto, en 3 frases.
2. Cuál es el punto de entrada y cómo se ejecuta localmente.
3. Los 5 archivos o carpetas más importantes, y para qué sirve cada uno.
4. Una cosa que te parezca confusa, inconsistente o mal documentada.

No escribas ni modifiques ningún archivo todavía.
Al final, dime exactamente qué archivos leíste para responder esto.
```

> Esa última línea vale tanto como el resto del prompt. Te muestra qué entró al context
> y, sobre todo, qué se quedó afuera. La lista casi siempre sorprende. Si te contestó
> sin abrir los archivos que de verdad mandan, ahí tienes explicada la respuesta floja.

### 2 · Act — que escriba, con la incertidumbre a la vista

```
Ahora escribe un archivo nuevo llamado ONBOARDING.md en la raíz del repo.

Audiencia: una persona senior que entra al equipo el lunes y nunca vio este código.
Incluye: qué hace el proyecto, cómo levantarlo paso a paso, la estructura de
carpetas, y las 3 cosas que más confunden a alguien nuevo aquí.

Reglas:
- Solo afirma cosas que puedas verificar leyendo el repo.
- Si no estás seguro de algo, ponlo bajo una sección "## Sin confirmar"
  en vez de inventarlo.
- No modifiques ningún otro archivo.
```

> Un agent que no sabe algo te lo escribe igual, y con la misma seguridad con la que
> escribe lo que sí sabe. La sección `## Sin confirmar` no le quita la maña de inventar.
> Lo que hace es mover el invento a un lugar donde lo ves hoy y no en producción.

### 3 · Verify — que se revise como si no fuera suyo

```
Revisa el ONBOARDING.md que acabas de escribir como si fueras un reviewer hostil.
Para cada afirmación, busca en el repo la evidencia que la respalda y cítame
archivo y línea. Lístame todo lo que NO puedas respaldar con evidencia.
```

Después viene la parte que te toca a ti:

```bash
git status
git diff --stat
```

Lee la sección `## Sin confirmar`. Después corre uno de los comandos de setup que
escribió. Si no funciona, ahí está tu primer error.

---

## Para un cambio de código

La trampa de "arregla este bug" es que no tiene límites. Pónselos, y quédate tú con
la decisión.

### Proponer (tú escoges, él no)

```
Sin escribir código todavía: lístame 3 cambios chicos y concretos que mejorarían
este repo. Cada uno tiene que cumplir:
(a) tocar como máximo 2 archivos,
(b) que yo pueda verificar que funciona corriendo un comando,
(c) que no cambie el comportamiento público.

Para cada uno dime qué archivos tocarías y qué comando correría yo para verificar.
```

### Ejecutar

```
Haz el número 2. Cuando termines, dime exactamente qué comando tengo que correr
para verificar que funciona, y qué debería ver si está bien.
```

> Si te llevas un solo prompt de esta lista, llévate este. Partirlo en proponer y
> escoger deja el alcance en manos del humano y la ejecución en manos del agent.
> Cuando se hace al revés salen esos pull requests de 900 líneas que nadie revisa.

---

## De uso diario

### Entender código ajeno

```
Explícame qué hace este archivo y por qué existe. Dime también quién lo llama
y qué se rompería si lo borro.
```

### Antes de mandar a review

```
Revisa el diff que está sin commitear como si fueras el reviewer más quisquilloso
del equipo. No arregles nada todavía. Lístame los problemas ordenados por gravedad
y dime cuáles son de corrección y cuáles son de gusto personal.
```

### Cuando se enredó y ya no avanza

No discutas con él. Sesión nueva, y arranca así:

```
Empecemos de cero. Solo lee estos archivos: [lista].
El objetivo es [una frase]. No toques nada más.
```

> A una sesión larga y confundida no la arreglas explicándole mejor. La arreglas
> reseteándola. Es el remedio que menos se usa y el que más funciona.

### Reproducir antes de arreglar

```
Antes de arreglar nada: escribe el caso mínimo que reproduce este bug y córrelo
para confirmar que falla. Enséñame la salida.
```

---

## Lo que tienen en común

Mirando la lista completa, hay cuatro cosas que se repiten.

Dile qué no tocar. La frase "no modifiques ningún otro archivo" me ha ahorrado más
tiempo que cualquier instrucción positiva que se me haya ocurrido.

Pídele el trabajo por pasos. Un paso que puedes revisar vale más que cinco que no.

Pide evidencia en lugar de confianza. "Cítame archivo y línea" cambia la respuesta que
te da, no solo cómo la presenta.

Y dale un lugar donde poner lo que no sabe. Si no se lo das, lo mete en medio del texto
normal, con el mismo tono seguro que todo lo demás, y ahí ya no lo distingues.
