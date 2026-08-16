const TASAS = {
  USD: 1,
  DOP: 0.017,
  EUR: 1.08,
};

function validarGastos(gastos) {
  for (const gasto of gastos) {
    const tasa = TASAS[gasto.moneda] || 1;
    gasto.monto = gasto.monto * tasa;
    gasto.moneda = 'USD';
  }
  return gastos;
}

function calcularBalances(gastos) {
  const balances = {};

  for (const gasto of gastos) {
    const porPersona = gasto.monto / gasto.entre.length;

    balances[gasto.pagadoPor] = (balances[gasto.pagadoPor] || 0) + gasto.monto;

    for (const persona of gasto.entre) {
      balances[persona] = (balances[persona] || 0) - porPersona;
    }
  }

  return balances;
}

function liquidar(balances) {
  const deudores = [];
  const acreedores = [];

  for (const [nombre, saldo] of Object.entries(balances)) {
    if (saldo < 0) deudores.push({ nombre, saldo: -saldo });
    if (saldo > 0) acreedores.push({ nombre, saldo });
  }

  deudores.sort((a, b) => b.saldo - a.saldo);
  acreedores.sort((a, b) => b.saldo - a.saldo);

  const pagos = [];
  let i = 0;
  let j = 0;

  while (i < deudores.length && j < acreedores.length) {
    const monto = Math.min(deudores[i].saldo, acreedores[j].saldo);

    pagos.push({ de: deudores[i].nombre, a: acreedores[j].nombre, monto });

    deudores[i].saldo -= monto;
    acreedores[j].saldo -= monto;

    if (deudores[i].saldo === 0) i++;
    if (acreedores[j].saldo === 0) j++;
  }

  return pagos;
}

module.exports = { validarGastos, calcularBalances, liquidar, TASAS };
