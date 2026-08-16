function linea(char = '-', ancho = 46) {
  return char.repeat(ancho);
}

function imprimirResumen(gastos, balances, pagos) {
  const total = gastos.reduce((suma, gasto) => suma + gasto.monto, 0);

  console.log('');
  console.log('GASTOS DEL VIAJE');
  console.log(linea('='));

  for (const gasto of gastos) {
    const monto = gasto.monto.toFixed(2).padStart(9);
    console.log(`${monto} USD  ${gasto.concepto}  (pagó ${gasto.pagadoPor})`);
  }

  console.log(linea());
  console.log(`${total.toFixed(2).padStart(9)} USD  total`);
  console.log('');

  console.log('BALANCES');
  console.log(linea('='));

  for (const [nombre, saldo] of Object.entries(balances)) {
    const signo = saldo >= 0 ? '+' : '';
    console.log(`${nombre.padEnd(12)} ${signo}${saldo.toFixed(2)}`);
  }

  console.log('');
  console.log('QUIEN LE PAGA A QUIEN');
  console.log(linea('='));

  if (pagos.length === 0) {
    console.log('Nadie debe nada. Milagro.');
  }

  for (const pago of pagos) {
    console.log(`${pago.de} -> ${pago.a}: ${pago.monto.toFixed(2)} USD`);
  }

  console.log('');
}

module.exports = { imprimirResumen, linea };
