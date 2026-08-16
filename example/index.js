#!/usr/bin/env node

const path = require('path');
const { leerGastos } = require('./src/parser');
const { validarGastos, calcularBalances, liquidar } = require('./src/balance');
const { imprimirResumen } = require('./src/format');

const archivo = process.argv[2] || path.join(__dirname, 'tests', 'gastos-ejemplo.json');

const gastos = leerGastos(archivo);
validarGastos(gastos);

const balances = calcularBalances(gastos);
const pagos = liquidar(balances);

imprimirResumen(gastos, balances, pagos);
