const fs = require('fs');

function leerGastos(ruta) {
  const contenido = fs.readFileSync(ruta, 'utf8');
  const datos = JSON.parse(contenido);
  return datos.gastos;
}

function participantes(gastos) {
  const nombres = new Set();
  for (const gasto of gastos) {
    nombres.add(gasto.pagadoPor);
    for (const persona of gasto.entre) {
      nombres.add(persona);
    }
  }
  return Array.from(nombres);
}

module.exports = { leerGastos, participantes };
