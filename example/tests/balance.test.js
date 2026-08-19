const { describe, test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const { leerGastos } = require('../src/parser');
const { validarGastos, calcularBalances, liquidar, TASAS } = require('../src/balance');
const { verificarTodas, limiteTransferencias } = require('./helpers/invariantes');

const FIXTURE = path.join(__dirname, 'gastos-ejemplo.json');

function gasto(campos) {
  return {
    concepto: 'algo',
    monto: 90,
    moneda: 'USD',
    pagadoPor: 'Ana',
    entre: ['Ana', 'Luis', 'Marta'],
    ...campos,
  };
}

describe('validarGastos', () => {
  test('convierte DOP a USD con la tasa de TASAS', () => {
    const gastos = [gasto({ monto: 1000, moneda: 'DOP' })];
    validarGastos(gastos);

    assert.equal(gastos[0].monto, 1000 * TASAS.DOP);
    assert.equal(gastos[0].moneda, 'USD');
  });

  test('convierte EUR a USD con la tasa de TASAS', () => {
    const gastos = [gasto({ monto: 60, moneda: 'EUR' })];
    validarGastos(gastos);

    assert.equal(gastos[0].monto, 60 * TASAS.EUR);
    assert.equal(gastos[0].moneda, 'USD');
  });

  test('deja los montos en USD sin tocar', () => {
    const gastos = [gasto({ monto: 95, moneda: 'USD' })];
    validarGastos(gastos);

    assert.equal(gastos[0].monto, 95);
    assert.equal(gastos[0].moneda, 'USD');
  });

  // AGENTS.md 3 marca esto para arreglar al refactorizar: "preferir retornar copias limpias".
  // El test fija el comportamiento actual para que el refactor sea deliberado, no accidental.
  test('muta el arreglo de entrada en vez de retornar una copia', () => {
    const gastos = [gasto({ monto: 1000, moneda: 'DOP' })];
    const original = gastos[0];
    const retorno = validarGastos(gastos);

    assert.equal(retorno, gastos, 'retorna el mismo arreglo que recibio');
    assert.equal(retorno[0], original, 'muta el mismo objeto gasto');
    assert.equal(original.monto, 17, 'el objeto del llamador quedo convertido');
  });

  test('convertir dos veces no vuelve a aplicar la tasa', () => {
    // Se salva por accidente: reescribe `moneda` a 'USD' y TASAS.USD es 1.
    const gastos = [gasto({ monto: 1000, moneda: 'DOP' })];
    validarGastos(gastos);
    validarGastos(gastos);

    assert.equal(gastos[0].monto, 17);
  });

  // AGENTS.md 4.1: una moneda fuera de TASAS debe alertar o lanzar error controlado.
  // Hoy `TASAS[gasto.moneda] || 1` (src/balance.js:9) la trata como USD en silencio.
  test('deberia rechazar una moneda desconocida', { todo: true }, () => {
    const gastos = [gasto({ monto: 1000, moneda: 'COP' })];
    assert.throws(() => validarGastos(gastos));
  });
});

describe('calcularBalances', () => {
  test('una persona paga y se divide en partes iguales', () => {
    const balances = calcularBalances([gasto({ monto: 90 })]);

    assert.deepEqual(balances, { Ana: 60, Luis: -30, Marta: -30 });
  });

  test('pagar solo por uno mismo deja el balance en cero', () => {
    const balances = calcularBalances([gasto({ monto: 50, entre: ['Ana'] })]);

    assert.deepEqual(balances, { Ana: 0 });
  });

  test('una lista vacia no produce participantes', () => {
    assert.deepEqual(calcularBalances([]), {});
  });

  test('acumula gastos en varias monedas sobre el fixture', () => {
    const gastos = validarGastos(leerGastos(FIXTURE));
    const balances = calcularBalances(gastos);

    assert.deepEqual(Object.keys(balances).sort(), ['Ana', 'Luis', 'Marta']);
    for (const saldo of Object.values(balances)) {
      assert.ok(Number.isFinite(saldo), 'todos los saldos son numeros finitos');
    }
  });

  // AGENTS.md 4.2 pide evitar la division por cero. Hoy src/balance.js:16 divide entre
  // `gasto.entre.length` sin comprobarlo y contamina todos los balances con NaN.
  test('deberia rechazar un gasto con `entre` vacio', { todo: true }, () => {
    assert.throws(() => calcularBalances([gasto({ entre: [] })]));
  });

  // AGENTS.md 5.3 lo lista como caso borde: hoy Ana paga dos de las tres partes.
  test('deberia cobrar una sola vez a un nombre duplicado en `entre`', { todo: true }, () => {
    const balances = calcularBalances([gasto({ monto: 90, entre: ['Ana', 'Ana', 'Luis'] })]);

    assert.deepEqual(balances, { Ana: 45, Luis: -45 });
  });
});

describe('liquidar', () => {
  test('sin deudas no genera pagos', () => {
    const balances = { Ana: 0, Luis: 0 };
    const pagos = liquidar(balances);

    assert.deepEqual(pagos, []);
    verificarTodas(balances, pagos);
  });

  test('dos personas se saldan con una sola transferencia', () => {
    const balances = { Ana: 50, Luis: -50 };
    const pagos = liquidar(balances);

    assert.deepEqual(pagos, [{ de: 'Luis', a: 'Ana', monto: 50 }]);
    verificarTodas(balances, pagos);
  });

  test('decimales periodicos (100/3) se liquidan dentro de la tolerancia', () => {
    const balances = calcularBalances([gasto({ monto: 100 })]);
    const pagos = liquidar(balances);

    assert.equal(pagos.length, 2);
    for (const pago of pagos) {
      assert.equal(pago.a, 'Ana');
      assert.ok(Math.abs(pago.monto - 100 / 3) < 1e-6);
    }
    verificarTodas(balances, pagos);
  });

  test('empareja al deudor mas grande con el acreedor mas grande', () => {
    const balances = { Ana: 60, Luis: -45, Marta: -15 };
    const pagos = liquidar(balances);

    assert.deepEqual(pagos, [
      { de: 'Luis', a: 'Ana', monto: 45 },
      { de: 'Marta', a: 'Ana', monto: 15 },
    ]);
    verificarTodas(balances, pagos);
  });

  test('respeta el limite de n-1 con varios deudores y acreedores', () => {
    const balances = { Ana: 40, Luis: 20, Marta: -35, Pedro: -25 };
    const pagos = liquidar(balances);

    limiteTransferencias(balances, pagos);
    verificarTodas(balances, pagos);
  });
});

describe('integracion sobre el fixture', () => {
  test('la cadena completa cumple las cinco invariantes', () => {
    const gastos = validarGastos(leerGastos(FIXTURE));
    const balances = calcularBalances(gastos);
    const pagos = liquidar(balances);

    verificarTodas(balances, pagos);
  });
});
