# Prompts que vale la pena guardar

No es una librería de 200 prompts que nunca vas a volver a abrir. Son los pocos que
usas todas las semanas.

Funcionan igual en Claude Code, Codex CLI, opencode, Antigravity CLI o un GUI. Si un
prompt solo funciona en una herramienta, es un truco, no un prompt.

---

## Los tres de la sesión 1

La razón de que sean tres y no uno: **un prompt grande te devuelve una caja negra.**
Tres te dejan ver el loop y revisar cada paso por separado.

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

> **Por qué la última línea.** Es la mitad del valor del prompt. Te muestra qué entró
> al context y, más importante, **qué no leyó**. Casi siempre la respuesta te sorprende.
> Si contestó sin leer los archivos que importan, ya sabes por qué la respuesta es floja.

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

> **Por qué `## Sin confirmar`.** Un agent que no sabe algo igual te lo escribe con
> total seguridad. Esa sección no evita que invente: **hace visible lo que inventó.**
> Es la diferencia entre un error que encuentras hoy y uno que encuentras en producción.

### 3 · Verify — que se revise como si no fuera suyo

```
Revisa el ONBOARDING.md que acabas de escribir como si fueras un reviewer hostil.
Para cada afirmación, busca en el repo la evidencia que la respalda y cítame
archivo y línea. Lístame todo lo que NO puedas respaldar con evidencia.
```

Y después la parte que de verdad importa, que la haces tú y no él:

```bash
git status
git diff --stat
```

Lee la sección `## Sin confirmar`. Y **corre un comando del setup que escribió.**
Si el comando no funciona, acabas de encontrar el primer error.

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

> **El split proponer → escoger es el prompt más importante de esta lista.**
> El humano decide el alcance, el agent ejecuta. Al revés es como se producen los
> pull requests de 900 líneas que nadie revisa.

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

> Una sesión larga y confundida no se arregla explicándole mejor. Se arregla
> **reseteándola.** Es el remedio más subestimado que hay.

### Reproducir antes de arreglar

```
Antes de arreglar nada: escribe el caso mínimo que reproduce este bug y córrelo
para confirmar que falla. Enséñame la salida.
```

---

## Lo que hace que un prompt funcione

Después de todo esto, cuatro cosas se repiten:

1. **Dile qué NO tocar.** "No modifiques ningún otro archivo" ahorra más tiempo que
   cualquier instrucción positiva.
2. **Pídele el trabajo por pasos, no de un tirón.** Un paso que puedes revisar vale
   más que cinco que no.
3. **Pídele evidencia, no confianza.** "Cítame archivo y línea" cambia la respuesta.
4. **Dale una salida para la duda.** Si no le das dónde poner lo que no sabe, se lo
   inventa dentro del texto normal.
