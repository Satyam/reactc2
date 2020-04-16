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
  TRIPLE,
  CRUCE,
  SENAL,
  NORMAL,
  DESVIADO,
  IZQ,
  CENTRO,
  DER,
  VERDE,
  AMARILLO,
  ROJO,
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
} = require('./constantes');

const validate = (what, schema) => {
  const { error, warning } = schema.validate(what);
  if (error) {
    console.error(error);
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
  enclavamientos: {},
  senales: {},
  bloques: {},
};

// Ids should be valid DOM id attributes.
// Ids starting with a digit are prefixed with an underscore
const buildId = (idSector, { x, y, dir }) =>
  (dir ? [idSector, x, y, dir].join('_') : [idSector, x, y].join('_'))
    .replace(/\W/g, '_')
    .replace(/(^\d)/, '_$1');

const buildIdBloque = (idSector, bloque) =>
  `${idSector}__${bloque}`.replace(/\W/g, '_').replace(/(^\d)/, '_$1');

// various standard types
const dir = j.valid(N, NE, E, SE, S, SW, W, NW).required();
const color = j.valid(VERDE, AMARILLO, ROJO);
const icd = j.valid(IZQ, CENTRO, DER);
const cambios = j.valid(NORMAL, DESVIADO, IZQ, CENTRO, DER);
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
  validateConst(TRIPLE, 'triple');
  validateConst(CRUCE, 'cruce');
  validateConst(SENAL, 'senal');
  validateConst(NORMAL, 'normal');
  validateConst(DESVIADO, 'desviado');
  validateConst(IZQ, 'izq');
  validateConst(CENTRO, 'centro');
  validateConst(DER, 'der');
  validateConst(VERDE, 1);
  validateConst(AMARILLO, 2);
  validateConst(ROJO, 3);
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
      descr: j.string(),
      bloque: j.string(),
    })
    .append(coords);

  const puntas = j.array().items(dir).length(2).unique().required();

  const celdaLinea = baseCelda.append({
    tipo: j.valid(LINEA),
    puntas,
  });

  const celdaCambio = baseCelda.append({
    tipo: j.valid(CAMBIO),
    posicion: j.valid(NORMAL, DESVIADO),
    punta: dir,
    ramas: j.object({ [NORMAL]: dir, [DESVIADO]: dir }),
  });

  const celdaParagolpe = baseCelda.append({
    tipo: j.valid(PARAGOLPE),
    punta: dir,
  });

  const celdaTriple = baseCelda.append({
    tipo: j.valid(TRIPLE),
    posicion: icd,
    punta: dir,
    ramas: j.object({ [IZQ]: dir, [CENTRO]: dir, [DER]: dir }),
  });

  const celdaCruce = baseCelda.append({
    tipo: j.valid(CRUCE),
    linea1: j.object({
      puntas,
      nivel: j.number().integer().min(0),
    }),
    linea2: j.object({
      puntas,
      nivel: j.number().integer().min(0),
    }),
    nivel: j.boolean(),
  });

  validate(
    celdas,
    j
      .array()
      .items(
        j
          .alternatives()
          .try(celdaLinea, celdaCambio, celdaParagolpe, celdaTriple, celdaCruce)
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
      const idBloque = buildIdBloque(idSector, c.bloque);

      if (!salida.bloques[idBloque]) {
        salida.bloques[idBloque] = {
          celdas: [],
          descr: c.bloque,
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

function validateSenales(name) {
  console.log('  Senales');

  const senales = require(`./${name}/senales.js`).senales;

  const baseSenales = j
    .object({
      dir,
      [IZQ]: color,
      [CENTRO]: color,
      [DER]: color,
      soloManual: j.boolean(),
    })
    .append(coords)
    .or(IZQ, CENTRO, DER);

  validate(
    senales,
    j
      .array()
      .items(baseSenales)
      .unique(
        (a, b) =>
          a.idSector === b.idSector &&
          a.x === b.x &&
          a.y === b.y &&
          a.dir === b.dir
      )
  );

  return senales;
}

function processSenales(idSector, senales) {
  salida.senales = senales.reduce((ss, s) => {
    const idSenal = buildId(idSector, s);
    if (ss[idSenal]) throw new Error(`Clave duplicada en Señales: ${idSenal}`);

    return {
      ...ss,
      [idSenal]: {
        ...s,
        idSenal,
        idSector,
      },
    };
  }, salida.senales);
}

function validateEnclavamientos(name) {
  console.log('  Enclavamientos');

  const enclavamientos = require(`./${name}/enclavamientos.js`).enclavamientos;

  const depCambioCambio = j
    .object({
      tipo: j.valid(CAMBIO),
    })
    .append(coords)
    .append({
      [NORMAL]: cambios,
      [DESVIADO]: cambios,
      [IZQ]: cambios,
      [CENTRO]: cambios,
      [DER]: cambios,
    })
    .or(NORMAL, DESVIADO)
    .without(NORMAL, [IZQ, CENTRO, DER])
    .without(DESVIADO, [IZQ, CENTRO, DER]);

  const depSenalSenal = j
    .object({
      tipo: j.valid(SENAL),
      dir,
      luces: j.array().items(
        j.object({
          luzOrigen: icd,
          cuando: color,
          luzAfectada: icd,
          estado: color,
        })
      ),
    })
    .append(coords);

  const depSenalCambio = j
    .object({
      tipo: j.valid(CAMBIO),
      [NORMAL]: j.object({
        [IZQ]: color,
        [CENTRO]: color,
        [DER]: color,
      }),
      [DESVIADO]: j.object({
        [IZQ]: color,
        [CENTRO]: color,
        [DER]: color,
      }),
      [IZQ]: j.object({
        [IZQ]: color,
        [CENTRO]: color,
        [DER]: color,
      }),
      [CENTRO]: j.object({
        [IZQ]: color,
        [CENTRO]: color,
        [DER]: color,
      }),
      [DER]: j.object({
        [IZQ]: color,
        [CENTRO]: color,
        [DER]: color,
      }),
    })
    .append(coords);

  const depSenalBloque = j.object({
    tipo: j.valid(BLOQUE),
    bloque: j.string().required(),
    luzAfectada: icd,
  });

  const depSenalFijo = j.object({
    tipo: j.valid(FIJO),
    luzAfectada: icd,
    estado: color,
  });

  const depsCambio = depCambioCambio;
  const depsSenal = j
    .alternatives()
    .try(depSenalSenal, depSenalCambio, depSenalBloque, depSenalFijo);

  const baseEncl = j.object({}).append(coords);

  const enclCambio = baseEncl.append({
    tipo: CAMBIO,
    dependencias: j.array().items(depsCambio),
  });

  const enclSenal = baseEncl.append({
    tipo: SENAL,
    dir,
    dependencias: j.array().items(depsSenal),
  });

  validate(
    enclavamientos,
    j
      .array()
      .items(j.alternatives().try(enclCambio, enclSenal))
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

    const senales = validateSenales(name);
    processSenales(name, senales);

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
