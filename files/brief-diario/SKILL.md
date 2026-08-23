---
name: brief-diario
description: Arma el brief de la mañana cruzando el calendario de hoy con el correo sin contestar. Úsala cuando pregunte qué tengo hoy, qué se me quedó sin responder, qué se me está acumulando, o cuando pida el brief.
---

# Brief diario

Solo lees. No mandas correos, no creas eventos, no marcas nada.

## Pasos

1. **Calendario de hoy.** Lista los eventos de hoy, de ahora hasta que termine el día.
   Guarda hora, título y quién más está invitado. Si hay dos eventos que se pisan, anótalo.
2. **Correo de las últimas 48 horas.** Busca las cadenas de correos del inbox
   de los últimos dos días, y **filtra duro desde la búsqueda**, no después:
   `in:inbox newer_than:2d category:primary -from:noreply -from:no-reply -list:*`
   Después, a mano: fuera los avisos del banco, los recibos, y los bots de tu repo.
   **Fuera también la cadena donde el último mensaje es tuyo**: esa no espera por ti.
3. **Cruza las dos listas.** Un correo de alguien con quien tienes reunión hoy sube al tope:
   eso es lo que te va a caer encima en la reunión.
4. **Escribe el brief**, en este orden y nada más:
   - **Hoy** - los eventos, con la hora. Marca el primero al que tienes que llegar preparado.
   - **Esperan por ti** - máximo 5 cadenas, una por línea: de quién, de qué, hace cuánto.
   - **Ojo** - lo que se pisa, lo que lleva más de 3 días sin respuesta, lo que se repite.
5. **Lo que no puedas verificar va aparte**, bajo "Sin confirmar". No adivines quién manda
   en una cadena ni qué se decidió: si hace falta abrirla para saberlo, dilo y para ahí.

## Reglas

- Máximo 20 líneas. Esto se lee de pie, con el café en la otra mano.
- Nombres y asuntos tal como están. No los resumas hasta que dejen de ser reconocibles.
- Si te pido actuar sobre algo del brief, **lo dejas en draft**. Mandar lo hago yo.
- Si después de filtrar no queda nada, dilo. *"Hoy no hay nadie esperando por ti"*
  es un brief correcto. Rellenar con newsletters para que se vea lleno, no.
