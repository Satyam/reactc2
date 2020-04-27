require('@babel/register')({
  ignore: [],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: true,
        },
      },
    ],
  ],
});
const fs = require('fs');
const util = require('util');
const j = require('@hapi/joi');

const {
  LINEA,
  CAMBIO,
  PARAGOLPE,
  CRUCE,
  SEMAFORO,
  NORMAL,
  DESVIADO,
  ALTERNATIVA,
  IZQ,
  CENTRO,
  DER,
  LIBRE,
  PRECAUCION,
  ALTO,
  N,
  NE,
  E,
  SE,
  S,
  SW,
  W,
  NW,
  BLOQUE,
  FIJO,
  AUTOMATICO,
  MANIOBRA,
  BLOQUEADO,
} = require('./constantes');

const validate = (what, schema) => {
  const { error, warning } = schema.validate(what);
  if (error) {
    if (error.name === 'ValidationError') {
      console.error(JSON.stringify(error.details, null, 2));
    } else {
      console.error(error);
    }
    process.exit(1);
  }
  if (warning) {
    console.warn(warning);
    process.exit(1);
  }
};

const salida = {
  sectores: {},
  celdas: {},
  automatizaciones: {},
  semaforos: {},
  bloques: {},
  enclavamientos: {},
};

// Ids should be valid DOM id attributes.
// Ids starting with a digit are prefixed with an underscore
const buildId = (idSector, { x, y, dir }) =>
  (dir ? [idSector, x, y, dir].join('_') : [idSector, x, y].join('_'))
    .replace(/\W/g, '_')
    .replace(/(^\d)/, '_$1');

const buildIdBloque = (idSector, { bloque }) =>
  `${idSector}__${bloque}`.replace(/\W/g, '_').replace(/(^\d)/, '_$1');

// various standard types
const dir = j.valid(N, NE, E, SE, S, SW, W, NW).required();
const aspecto = j.valid(LIBRE, PRECAUCION, ALTO);
const icd = j.valid(IZQ, CENTRO, DER);
const cambios = j.valid(NORMAL, DESVIADO, ALTERNATIVA);
const coords = {
  x: j.number().integer().min(0).required(),
  y: j.number().integer().min(0).required(),
};

function validateConstants() {
  console.log('Constantes');

  const validateConst = (c, v) => validate(c, j.valid(v));
  validateConst(LINEA, 'linea');
  validateConst(CAMBIO, 'cambio');
  validateConst(PARAGOLPE, 'paragolpe');
  validateConst(CRUCE, 'cruce');
  validateConst(SEMAFORO, 'semaforo');
  validateConst(NORMAL, 0);
  validateConst(DESVIADO, 1);
  validateConst(ALTERNATIVA, 2);
  validateConst(IZQ, 'izq');
  validateConst(CENTRO, 'centro');
  validateConst(DER, 'der');
  validateConst(LIBRE, 1);
  validateConst(PRECAUCION, 2);
  validateConst(ALTO, 3);
  validateConst(N, 'N');
  validateConst(NE, 'NE');
  validateConst(E, 'E');
  validateConst(SE, 'SE');
  validateConst(S, 'S');
  validateConst(SW, 'SW');
  validateConst(W, 'W');
  validateConst(NW, 'NW');
  validateConst(BLOQUE, 'bloque');
  validateConst(FIJO, 'fijo');
  validateConst(AUTOMATICO, 0);
  validateConst(MANIOBRA, 1);
  validateConst(BLOQUEADO, 2);
}

function validateSector(name) {
  console.log('  Sector');

  const sector = require(`./${name}/sector.js`).sector;
  validate(
    sector,
    j.object({
      descr: j.string().required(),
      descrCorta: j.string().max(30).required(),
      ancho: j.number().positive().integer().required().min(1),
      alto: j.number().positive().integer().required().min(1),
    })
  );
  return sector;
}

function processSector(idSector, sector) {
  Object.assign(salida.sectores, {
    [idSector]: {
      ...sector,
      idSector,
    },
  });
}

function validateCeldas(name) {
  console.log('  Celdas');

  const celdas = require(`./${name}/celdas.js`).celdas;
  const baseCelda = j
    .object({
      despachador: j.array().items(dir),
      nombre: j.string(),
      bloque: j.string(),
    })
    .append(coords);

  const puntas = j.array().items(dir).length(2).unique().required();

  const celdaLinea = baseCelda.append({
    tipo: j.valid(LINEA).required(),
    puntas,
    longitud: j.number().positive(),
  });

  const celdaCambio = baseCelda.append({
    tipo: j.valid(CAMBIO).required(),
    posicion: j.valid(NORMAL, DESVIADO),
    punta: dir,
    ramas: j.array().items(dir).min(2).max(3),
  });

  const celdaParagolpe = baseCelda.append({
    tipo: j.valid(PARAGOLPE).required(),
    punta: dir,
    rebota: j.boolean(),
  });

  const celdaCruce = baseCelda.append({
    tipo: j.valid(CRUCE).required(),
    linea1: j.object({
      puntas,
      nivel: j.number().integer().min(0),
    }),
    linea2: j.object({
      puntas,
      nivel: j.number().integer().min(0),
    }),
  });

  validate(
    celdas,
    j
      .array()
      .items(
        j
          .alternatives()
          .try(celdaLinea, celdaCambio, celdaParagolpe, celdaCruce)
      )
      .unique((a, b) => a.x === b.x && a.y === b.y)
  );

  return celdas;
}

function processCeldas(idSector, celdas) {
  salida.celdas = celdas.reduce((cs, c) => {
    const idCelda = buildId(idSector, c);
    if (cs[idCelda]) throw new Error(`Clave duplicada en Celdas: ${idCelda}`);
    if (c.bloque) {
      const idBloque = buildIdBloque(idSector, c);

      if (!salida.bloques[idBloque]) {
        salida.bloques[idBloque] = {
          celdas: [],
          nombre: c.bloque,
        };
      }
      salida.bloques[idBloque].celdas.push(idCelda);
      return {
        ...cs,
        [idCelda]: {
          ...c,
          idCelda,
          idSector,
          idBloque,
        },
      };
    }
    return {
      ...cs,
      [idCelda]: {
        ...c,
        idCelda,
        idSector,
      },
    };
  }, salida.celdas);
}

function validateSemaforos(name) {
  console.log('  Semaforos');

  const semaforos = require(`./${name}/semaforos.js`).semaforos;

  const baseSemaforos = j
    .object({
      dir,
      [IZQ]: aspecto,
      [CENTRO]: aspecto,
      [DER]: aspecto,
      soloManiobra: j.boolean(),
      nombre: j.string(),
    })
    .append(coords)
    .or(IZQ, CENTRO, DER);

  validate(
    semaforos,
    j
      .array()
      .items(baseSemaforos)
      .unique(
        (a, b) =>
          a.idSector === b.idSector &&
          a.x === b.x &&
          a.y === b.y &&
          a.dir === b.dir
      )
  );

  return semaforos;
}

function processSemaforos(idSector, semaforos) {
  salida.semaforos = semaforos.reduce((ss, s) => {
    const idSemaforo = buildId(idSector, s);
    if (ss[idSemaforo])
      throw new Error(`Clave duplicada en Semaforos: ${idSemaforo}`);

    return {
      ...ss,
      [idSemaforo]: {
        modo: AUTOMATICO,
        ...s,
        idSemaforo,
        idSector,
      },
    };
  }, salida.semaforos);
}

function validateAutomatizaciones(name) {
  console.log('  Automatizaciones');

  const automatizaciones = require(`./${name}/automatizaciones.js`)
    .automatizaciones;

  const depCambioCambio = j
    .object({
      tipo: j.valid(CAMBIO).required(),
      alts: j.array().items(
        j.object({
          cuando: cambios,
          posicion: cambios,
        })
      ),
    })
    .append(coords);

  const depSemaforoSemaforo = j
    .object({
      tipo: j.valid(SEMAFORO).required(),
      dir,
      senales: j
        .array()
        .items(
          j.object({
            cuando: aspecto.required(),
            senalAfectada: icd.required(),
            aspecto: aspecto.required(),
          })
        )
        .required(),
    })
    .append(coords);

  const depSemaforoCambio = j
    .object({
      tipo: j.valid(CAMBIO).required(),
      alts: j.array().items(
        j.object({
          cuando: cambios.required(),
          [IZQ]: aspecto,
          [CENTRO]: aspecto,
          [DER]: aspecto,
        })
      ),
    })
    .append(coords);

  const depSemaforoBloque = j.object({
    tipo: j.valid(BLOQUE).required(),
    bloque: j.string().required(),
    senalAfectada: icd.required(),
  });

  const depSemaforoFijo = j.object({
    tipo: j.valid(FIJO).required(),
    senalAfectada: icd.required(),
    aspecto: aspecto.required(),
  });

  const depsCambio = depCambioCambio;
  const depsSemaforo = j
    .alternatives()
    .try(
      depSemaforoSemaforo,
      depSemaforoCambio,
      depSemaforoBloque,
      depSemaforoFijo
    );

  const baseAutom = j.object({}).append(coords);

  const automCambio = baseAutom.append({
    tipo: j.valid(CAMBIO).required(),
    deps: j.array().items(depsCambio).required(),
  });

  const automSemaforo = baseAutom.append({
    tipo: j.valid(SEMAFORO).required(),
    dir,
    deps: j.array().items(depsSemaforo).required(),
  });

  const depsBloque = j
    .object({
      tipo: j.valid(BLOQUE).required(),
      bloque: j.string().required(),
      posicion: cambios.required(),
    })
    .append(coords);

  const automBloque = j.object({
    tipo: j.valid(BLOQUE).required(),
    bloque: j.string().required(),
    deps: j.array().items(depsBloque).required(),
  });

  validate(
    automatizaciones,
    j
      .array()
      .items(j.alternatives().try(automCambio, automSemaforo, automBloque))
      .unique((a, b) =>
        a.tipo === BLOQUE && b.tipo === BLOQUE
          ? a.bloque === b.bloque
          : a.x === b.x && a.y === b.y && a.tipo === b.tipo && a.dir === b.dir
      )
  );

  return automatizaciones;
}

function processAutomatizaciones(idSector, automatizaciones) {
  salida.automatizaciones = automatizaciones.reduce((es, e) => {
    const idAutom =
      e.tipo === BLOQUE ? buildIdBloque(idSector, e) : buildId(idSector, e);
    if (es[idAutom])
      throw new Error(`Clave duplicada en Automatizaciones: ${idAutom}`);
    return {
      ...es,
      [idAutom]: {
        ...e,
        idAutom,
        idSector,
      },
    };
  }, salida.automatizaciones);
}

function validateEnclavamientos(name) {
  console.log('  Enclavamientos');

  const depCambioBloque = j.object({
    tipo: j.valid(BLOQUE).required(),
    bloque: j.string(),
  });

  const depCambioSemaforo = j
    .object({
      tipo: j.valid(SEMAFORO).required(),
      dir,
      aspecto,
    })
    .append(coords);

  const depsCambio = j.alternatives().try(depCambioBloque, depCambioSemaforo);

  const baseEncl = j.object({}).append(coords);

  const enclCambio = baseEncl.append({
    tipo: j.valid(CAMBIO).required(),
    deps: j.array().items(depsCambio).required(),
  });

  const enclavamientos = require(`./${name}/enclavamientos.js`).enclavamientos;
  validate(
    enclavamientos,
    j
      .array()
      .items(j.alternatives().try(enclCambio))
      .unique(
        (a, b) =>
          a.x === b.x && a.y === b.y && a.tipo === b.tipo && a.dir === b.dir
      )
  );

  return enclavamientos;
}
function processEnclavamientos(idSector, enclavamientos) {
  salida.enclavamientos = enclavamientos.reduce((es, e) => {
    const idEncl = buildId(idSector, e);
    if (es[idEncl])
      throw new Error(`Clave duplicada en Enclavamientos: ${idEncl}`);
    return {
      ...es,
      [idEncl]: {
        ...e,
        idEncl,
        idSector,
      },
    };
  }, salida.enclavamientos);
}

// This is where it starts validating and processing

validateConstants();

const dirs = fs.readdirSync('./', { withFileTypes: true });
dirs.forEach((d) => {
  if (d.isDirectory() && !d.name.startsWith('_')) {
    const name = d.name;
    console.log(name);
    const sector = validateSector(name);
    processSector(name, sector);

    const celdas = validateCeldas(name);
    processCeldas(name, celdas);

    const semaforos = validateSemaforos(name);
    processSemaforos(name, semaforos);

    const automatizaciones = validateAutomatizaciones(name);
    processAutomatizaciones(name, automatizaciones);

    const enclavamientos = validateEnclavamientos(name);
    processEnclavamientos(name, enclavamientos);
  }
});

console.log('Grabando Salida');
fs.writeFileSync(
  './index.js',
  `
export * from './constantes.js'
${Object.keys(salida)
  .map(
    (el) =>
      `export const ${el} =  ${util.inspect(salida[el], {
        depth: null,
        maxArrayLength: null,
        // breakLength: Infinity,
      })}
  `
  )
  .join('\n')}
    `
);

console.log('Fin');
process.exit();
