const { describe, test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { leerGastos, participantes } = require('../src/parser');

const FIXTURE = path.join(__dirname, 'gastos-ejemplo.json');
const temporales = [];

// Escribe un archivo temporal fuera del repo para no ensuciar `tests/` con fixtures nuevos.
function archivoTemporal(contenido) {
  const ruta = path.join(
    fs.mkdtempSync(path.join(os.tmpdir(), 'gastos-viaje-')),
    'gastos.json'
  );
  fs.writeFileSync(ruta, contenido, 'utf8');
  temporales.push(path.dirname(ruta));
  return ruta;
}

after(() => {
  for (const dir of temporales) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

describe('leerGastos', () => {
  test('lee el fixture de ejemplo', () => {
    const gastos = leerGastos(FIXTURE);

    assert.equal(gastos.length, 5);
    assert.equal(gastos[0].concepto, 'Airbnb dos noches');
    assert.equal(gastos[0].moneda, 'DOP');
    assert.deepEqual(gastos[0].entre, ['Ana', 'Luis', 'Marta']);
  });

  test('lee un arreglo de gastos vacio', () => {
    const ruta = archivoTemporal(JSON.stringify({ viaje: 'ninguno', gastos: [] }));

    assert.deepEqual(leerGastos(ruta), []);
  });

  test('ignora las claves del JSON que no sean `gastos`', () => {
    const ruta = archivoTemporal(
      JSON.stringify({ viaje: 'Jarabacoa', notas: 'llovio', gastos: [{ concepto: 'peaje' }] })
    );

    assert.deepEqual(leerGastos(ruta), [{ concepto: 'peaje' }]);
  });

  // AGENTS.md 4.2: "Proveer mensajes de error claros cuando el archivo no exista".
  // Hoy sale el ENOENT crudo de `fs.readFileSync` (src/parser.js:4) como stack trace.
  test('deberia dar un mensaje claro si el archivo no existe', { todo: true }, () => {
    assert.throws(() => leerGastos(path.join(os.tmpdir(), 'no-existe-jamas.json')), {
      message: /no (existe|se encontro|se pudo leer)/i,
    });
  });

  // AGENTS.md 4.2: lo mismo para JSON invalido; hoy escapa el SyntaxError de JSON.parse.
  test('deberia dar un mensaje claro si el JSON es invalido', { todo: true }, () => {
    const ruta = archivoTemporal('{ esto no es json');

    assert.throws(() => leerGastos(ruta), { message: /json .*(invalido|mal formado)/i });
  });

  // AGENTS.md 4.1: "La propiedad `gastos` debe ser un arreglo no vacio".
  // Hoy retorna `undefined` y el error aparece mas tarde como un TypeError opaco
  // dentro de `validarGastos`.
  test('deberia rechazar un JSON sin la clave `gastos`', { todo: true }, () => {
    const ruta = archivoTemporal(JSON.stringify({ viaje: 'sin gastos' }));

    assert.throws(() => leerGastos(ruta));
  });
});

// `participantes` esta exportada pero no la llama nadie (ni index.js ni src/).
// Queda cubierta para que el dia que se conecte al CLI ya tenga red.
describe('participantes', () => {
  test('junta a quien pago y a quien dividio, sin repetir', () => {
    const gastos = [
      { pagadoPor: 'Ana', entre: ['Ana', 'Luis'] },
      { pagadoPor: 'Marta', entre: ['Ana', 'Marta'] },
    ];

    assert.deepEqual(participantes(gastos).sort(), ['Ana', 'Luis', 'Marta']);
  });

  test('incluye a quien pago aunque no aparezca en `entre`', () => {
    const gastos = [{ pagadoPor: 'Pedro', entre: ['Ana'] }];

    assert.deepEqual(participantes(gastos).sort(), ['Ana', 'Pedro']);
  });

  test('sin gastos no hay participantes', () => {
    assert.deepEqual(participantes([]), []);
  });
});
