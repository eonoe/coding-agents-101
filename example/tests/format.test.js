const { describe, test } = require('node:test');
const assert = require('node:assert/strict');

const { calcularBalances, liquidar } = require('../src/balance');
const { imprimirResumen, linea } = require('../src/format');

// `imprimirResumen` escribe directo a la consola, asi que la interceptamos.
// Sin dependencias: se reemplaza `console.log` y se restaura siempre en el `finally`.
function capturar(fn) {
  const original = console.log;
  const lineas = [];

  console.log = (...args) => lineas.push(args.join(' '));
  try {
    fn();
  } finally {
    console.log = original;
  }

  return lineas;
}

function montosImpresos(lineas) {
  return lineas.join('\n').match(/-?\d+\.\d+/g) || [];
}

const GASTOS = [
  { concepto: 'Cena', monto: 90, moneda: 'USD', pagadoPor: 'Ana', entre: ['Ana', 'Luis', 'Marta'] },
  { concepto: 'Taxi', monto: 30, moneda: 'USD', pagadoPor: 'Luis', entre: ['Ana', 'Luis', 'Marta'] },
];

describe('linea', () => {
  test('por defecto son 46 guiones', () => {
    assert.equal(linea(), '-'.repeat(46));
  });

  test('acepta otro caracter y otro ancho', () => {
    assert.equal(linea('=', 10), '='.repeat(10));
  });
});

describe('imprimirResumen', () => {
  test('imprime las tres secciones del reporte', () => {
    const balances = calcularBalances(GASTOS);
    const lineas = capturar(() => imprimirResumen(GASTOS, balances, liquidar(balances)));
    const salida = lineas.join('\n');

    assert.match(salida, /GASTOS DEL VIAJE/);
    assert.match(salida, /BALANCES/);
    assert.match(salida, /QUIEN LE PAGA A QUIEN/);
  });

  test('lista cada gasto con su concepto y quien pago', () => {
    const balances = calcularBalances(GASTOS);
    const salida = capturar(() =>
      imprimirResumen(GASTOS, balances, liquidar(balances))
    ).join('\n');

    assert.match(salida, /Cena.*\(pagó Ana\)/);
    assert.match(salida, /Taxi.*\(pagó Luis\)/);
  });

  test('suma el total de los gastos', () => {
    const balances = calcularBalances(GASTOS);
    const salida = capturar(() =>
      imprimirResumen(GASTOS, balances, liquidar(balances))
    ).join('\n');

    assert.match(salida, /120\.00 USD {2}total/);
  });

  test('marca el signo de los saldos a favor', () => {
    const balances = calcularBalances(GASTOS);
    const salida = capturar(() =>
      imprimirResumen(GASTOS, balances, liquidar(balances))
    ).join('\n');

    assert.match(salida, /Ana\s+\+50\.00/);
    assert.match(salida, /Marta\s+-40\.00/);
  });

  test('sin pagos avisa que nadie debe nada', () => {
    const salida = capturar(() => imprimirResumen([], { Ana: 0, Luis: 0 }, [])).join('\n');

    assert.match(salida, /Nadie debe nada\. Milagro\./);
  });

  test('escribe cada pago como `de -> a: monto`', () => {
    const balances = calcularBalances(GASTOS);
    const salida = capturar(() =>
      imprimirResumen(GASTOS, balances, liquidar(balances))
    ).join('\n');

    assert.match(salida, /Marta -> Ana: 40\.00 USD/);
  });

  // AGENTS.md 3: los montos en consola se redondean a 2 decimales.
  test('todos los montos salen con dos decimales', () => {
    const gastos = [
      { concepto: 'Alquiler', monto: 100, moneda: 'USD', pagadoPor: 'Ana', entre: ['Ana', 'Luis', 'Marta'] },
    ];
    const balances = calcularBalances(gastos);
    const lineas = capturar(() => imprimirResumen(gastos, balances, liquidar(balances)));

    for (const monto of montosImpresos(lineas)) {
      assert.match(monto, /^-?\d+\.\d{2}$/, `"${monto}" no tiene exactamente dos decimales`);
    }
  });

  // `liquidar` compara saldos con igualdad flotante exacta (src/balance.js:56-57) y no usa
  // ningun epsilon, asi que puede emitir transferencias de ~1e-14 que el reporte imprime
  // como "0.00 USD": una linea que le pide al usuario hacer un pago de nada.
  test('no deberia imprimir pagos de 0.00 USD', { todo: true }, () => {
    const nombres = ['Ana', 'Luis', 'Marta', 'Pedro', 'Sofia'];
    const gastos = nombres.map((nombre, i) => ({
      concepto: `Gasto de ${nombre}`,
      monto: 100 + i * 7,
      moneda: 'USD',
      pagadoPor: nombre,
      entre: nombres,
    }));
    const balances = calcularBalances(gastos);
    const lineas = capturar(() => imprimirResumen(gastos, balances, liquidar(balances)));

    const pagosVacios = lineas.filter((l) => /->.*: -?0\.00 USD/.test(l));
    assert.deepEqual(pagosVacios, []);
  });
});
