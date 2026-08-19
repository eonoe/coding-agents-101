# Guía para Agentes de IA (AGENTS.md)

Este documento contiene las directrices, arquitectura, convenciones y prácticas de validación y pruebas para trabajar en el proyecto **gastos-viaje**.

---

## 1. Visión General del Proyecto

`gastos-viaje` es una herramienta CLI en Node.js que procesa los gastos de un viaje grupal con múltiples monedas, calcula el balance neto de cada participante y determina la secuencia óptima de transferencias (*quién le paga a quién*) minimizando el número de pagos.

### Principios Fundamentales
- **Cero dependencias externas:** El proyecto utiliza JavaScript estándar con las librerías nativas de Node.js (`fs`, `path`, `node:test`, `node:assert`). No agregar dependencias de `npm` a menos que sea explícitamente solicitado.
- **Simplicidad y modularidad:** Funciones pequeñas, comprensibles y con responsabilidad única.
- **Robustez numérica:** Cuidado especial con la precisión de punto flotante en operaciones monetarias.

---

## 2. Arquitectura y Estructura de Archivos

```text
├── AGENTS.md               # Instrucciones y directrices para agentes de IA
├── CLAUDE.md               # Referencia rápida de cumplimiento de AGENTS.md
├── README.md               # Documentación para usuarios
├── package.json            # Metadatos del paquete y scripts
├── index.js                # Punto de entrada CLI
├── src/
│   ├── parser.js           # Lectura de JSON y extracción de participantes
│   ├── balance.js          # Conversión de tasas, cálculo de balances y algoritmo de liquidación
│   └── format.js           # Formato de texto y presentación de resultados en terminal
└── tests/
    └── gastos-ejemplo.json # Fixture con datos de prueba reales
```

### Flujo de Datos
1. `parser.js: leerGastos(ruta)`: Lee y parsea el archivo JSON a un arreglo de gastos.
2. `balance.js: validarGastos(gastos)`: Convierte montos a la moneda base (`USD`) usando `TASAS`.
3. `balance.js: calcularBalances(gastos)`: Calcula el saldo neto de cada participante (`+` a favor, `-` en contra).
4. `balance.js: liquidar(balances)`: Algoritmo voraz (*greedy*) que empareja deudores con acreedores para minimizar transferencias.
5. `format.js: imprimirResumen(gastos, balances, pagos)`: Imprime el reporte formateado en la consola.

---

## 3. Convenciones de Código y Estilo

- **Módulos:** Usar CommonJS (`require` / `module.exports`).
- **Nomenclatura:**
  - Código y variables de dominio en español: `gastos`, `pagadoPor`, `entre`, `monto`, `moneda`, `balances`, `pagos`, `deudores`, `acreedores`.
  - Nombres de funciones en infinitivo o descriptivos: `leerGastos`, `calcularBalances`, `liquidar`, `imprimirResumen`.
- **Inmutabilidad:** Evitar mutar los arreglos u objetos de entrada cuando no sea necesario. (Nota: `validarGastos` actualmente muta el objeto; al refactorizar, preferir retornar copias limpias).
- **Formato numérico:** Los montos mostrados en consola deben redondearse a 2 decimales (`.toFixed(2)`).

---

## 4. Prácticas de Validación

Cualquier cambio que afecte la entrada de datos o procesamiento debe contemplar las siguientes validaciones:

### 4.1 Validación de Estructura de Entrada (JSON)
- El archivo debe ser un JSON válido.
- La propiedad `gastos` debe ser un arreglo no vacío.
- Cada elemento de `gastos` debe cumplir:
  - `concepto`: `string` no vacío.
  - `monto`: `number` positivo mayor a cero (`monto > 0`).
  - `moneda`: `string` soportado en `TASAS` (`USD`, `DOP`, `EUR`). Si no se reconoce, debe alertar o lanzar un error controlado.
  - `pagadoPor`: `string` no vacío.
  - `entre`: arreglo no vacío de `string`s con al menos un participante.

### 4.2 Manejo de Errores
- Proveer mensajes de error claros cuando:
  - El archivo especificado no exista o no sea accesible.
  - El formato JSON sea inválido.
  - Se intente dividir entre un arreglo `entre` vacío (evitar división por cero / `NaN`).

---

## 5. Prácticas de Pruebas (Testing)

### 5.1 Framework de Pruebas
- Usar el **Test Runner nativo de Node.js** (`node --test` y `node:assert/strict`), disponible de forma nativa sin instalar dependencias externas.
- Ejecutar tests con:
  ```bash
  node --test
  # o vía npm si está configurado en package.json:
  npm test
  ```

### 5.2 Invariantes Matemáticas Obligatorias
Todo test que verifique el cálculo y liquidación de gastos debe validar las siguientes invariantes:

1. **Suma Cero de Balances:**
   $$\sum \text{balances} = 0$$
   *(La suma de todos los saldos netos debe ser cero, tolerando delta de punto flotante menor a $10^{-6}$)*.
2. **Conservación del Total:**
   $$\sum \text{monto pagos generados} = \sum \text{saldo de acreedores} = \sum |\text{saldo de deudores}|$$
3. **Límite de Transferencias:**
   $$\text{número de pagos} \le (\text{número de participantes} - 1)$$
4. **Auto-pago nulo:**
   Ninguna transacción puede tener `pago.de === pago.a`.
5. **No Deuda Residual:**
   Tras aplicar los pagos calculados, el saldo final de todos los participantes debe ser exactamente $0$.

### 5.3 Casos de Prueba Críticos a Cubrir
- **Casos Base:**
  - 1 persona paga y todos dividen en partes iguales.
  - 1 persona paga solo por sí misma (balance debe quedar en 0).
  - Gastos en diferentes monedas (`USD`, `DOP`, `EUR`).
- **Casos Borde (Edge Cases):**
  - Lista de gastos vacía (`gastos: []`).
  - Balances ya saldados de antemano (debe retornar 0 pagos / mensaje de no deudas).
  - Participantes con nombres duplicados en `entre`.
  - División periódica con decimales repetitivos (ej. $100 / 3 = 33.333...$).

---

## 6. Checklist para el Agente antes de Completar una Tarea

- [ ] ¿Se respetó el principio de cero dependencias externas?
- [ ] ¿Se ejecutaron los tests con `node --test` y pasaron satisfactoriamente?
- [ ] ¿Se verificó que `node index.js` y `node index.js tests/gastos-ejemplo.json` funcionen correctamente?
- [ ] ¿Se mantienen las invariantes de balance ($\sum balances = 0$)?
- [ ] ¿El código sigue la nomenclatura en español consistente con el resto del proyecto?
