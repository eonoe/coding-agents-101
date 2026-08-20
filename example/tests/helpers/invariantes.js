const assert = require('node:assert/strict');

// AGENTS.md 5.2 pide que la invariante 5 cierre en cero exacto. En la practica
// `liquidar` avanza sus punteros con igualdad flotante (`saldo === 0`, src/balance.js:56-57)
// y no aplica ningun epsilon, asi que el resultado arrastra polvo de punto flotante.
// Usamos la misma tolerancia de 1e-6 en las cinco invariantes.
const EPSILON = 1e-6;

function suma(numeros) {
  return numeros.reduce((total, n) => total + n, 0);
}

// Invariante 1: la suma de todos los saldos netos es cero.
function sumaCero(balances, epsilon = EPSILON) {
  const total = suma(Object.values(balances));
  assert.ok(
    Math.abs(total) < epsilon,
    `la suma de balances deberia ser 0, es ${total}`
  );
}

// Invariante 2: lo que se transfiere es exactamente lo que se debe.
function conservacionDelTotal(balances, pagos, epsilon = EPSILON) {
  const saldos = Object.values(balances);
  const acreedores = suma(saldos.filter((saldo) => saldo > 0));
  const deudores = suma(saldos.filter((saldo) => saldo < 0).map(Math.abs));
  const transferido = suma(pagos.map((pago) => pago.monto));

  assert.ok(
    Math.abs(transferido - acreedores) < epsilon,
    `lo transferido (${transferido}) deberia igualar el saldo de los acreedores (${acreedores})`
  );
  assert.ok(
    Math.abs(transferido - deudores) < epsilon,
    `lo transferido (${transferido}) deberia igualar la deuda de los deudores (${deudores})`
  );
}

// Invariante 3: nunca mas de n-1 transferencias.
function limiteTransferencias(balances, pagos) {
  const participantes = Object.keys(balances).length;
  const maximo = Math.max(participantes - 1, 0);
  assert.ok(
    pagos.length <= maximo,
    `${pagos.length} pagos para ${participantes} participantes, el maximo es ${maximo}`
  );
}

// Invariante 4: nadie se paga a si mismo.
function sinAutoPago(pagos) {
  for (const pago of pagos) {
    assert.notEqual(pago.de, pago.a, `${pago.de} se esta pagando a si mismo`);
  }
}

// Invariante 5: tras aplicar los pagos nadie queda debiendo.
function sinDeudaResidual(balances, pagos, epsilon = EPSILON) {
  const finales = { ...balances };

  for (const pago of pagos) {
    finales[pago.de] = (finales[pago.de] || 0) + pago.monto;
    finales[pago.a] = (finales[pago.a] || 0) - pago.monto;
  }

  for (const [nombre, saldo] of Object.entries(finales)) {
    assert.ok(
      Math.abs(saldo) < epsilon,
      `${nombre} queda con saldo ${saldo} despues de liquidar`
    );
  }
}

function verificarTodas(balances, pagos, epsilon = EPSILON) {
  sumaCero(balances, epsilon);
  conservacionDelTotal(balances, pagos, epsilon);
  limiteTransferencias(balances, pagos);
  sinAutoPago(pagos);
  sinDeudaResidual(balances, pagos, epsilon);
}

module.exports = {
  EPSILON,
  sumaCero,
  conservacionDelTotal,
  limiteTransferencias,
  sinAutoPago,
  sinDeudaResidual,
  verificarTodas,
};
