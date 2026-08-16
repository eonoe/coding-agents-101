# gastos-viaje

Divide los gastos de un viaje entre varias personas y calcula quien le paga a quien,
minimizando la cantidad de transferencias.

Nacio de un fin de semana en Cabarete donde nadie se acordaba de quien habia pagado
que cosa.

## Instalacion

```bash
npm install
```

## Uso

```bash
node app.js gastos.json
```

Si no le pasas un archivo, usa los datos de ejemplo.

Tambien puedes sacar la salida en JSON para pasarsela a otra herramienta:

```bash
node app.js gastos.json --json
```

## Formato del archivo

```json
{
  "viaje": "nombre del viaje",
  "gastos": [
    {
      "concepto": "que fue",
      "monto": 1200,
      "moneda": "DOP",
      "pagadoPor": "Ana",
      "entre": ["Ana", "Luis"]
    }
  ]
}
```

Monedas soportadas: `USD`, `DOP`, `EUR`. Todo se convierte a USD antes de calcular.

## Tests

```bash
npm test
```

## Estructura

- `index.js` - entrada
- `src/parser.js` - lectura y validacion del archivo de gastos
- `src/balance.js` - el calculo de balances y la liquidacion
- `src/format.js` - la salida en consola
- `tests/` - los tests

## Pendiente

- [ ] Soportar mas monedas (las tasas estan hardcodeadas)
- [ ] Manejar el caso de gastos con montos negativos (reembolsos)
- [ ] Modo interactivo
