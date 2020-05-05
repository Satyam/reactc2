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
  INFO,
  WARNING,
  DANGER,
  UNLOADED,
  LOADING,
  LOADED,
} = require('../constantes');

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
  validateConst(INFO, 'info');
  validateConst(WARNING, 'warning');
  validateConst(DANGER, 'danger');
  validateConst(UNLOADED, 'unloaded');
  validateConst(LOADING, 'loading');
  validateConst(LOADED, 'loaded');
}

function validateSector(sector) {
  validate(
    sector,
    j.object({
      descr: j.string().required(),
      descrCorta: j.string().max(30).required(),
      ancho: j.number().positive().integer().required().min(1),
      alto: j.number().positive().integer().required().min(1),
    })
  );
}

function validateCeldas(celdas) {
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
  const bloques = {};
  const idCeldas = [];
  const cs = celdas.map((c) => {
    const idCelda = buildId(idSector, c);
    if (idCeldas.includes(idCelda))
      throw new Error(`Clave duplicada en Celdas: ${idCelda}`);
    idCeldas.push(idCelda);

    if (c.bloque) {
      const idBloque = buildIdBloque(idSector, c);

      if (!bloques[idBloque]) {
        bloques[idBloque] = {
          celdas: [],
          nombre: c.bloque,
          idBloque,
        };
      }
      bloques[idBloque].celdas.push(idCelda);
      return {
        ...c,
        idCelda,
        idSector,
        idBloque,
      };
    }
    return {
      ...c,
      idCelda,
      idSector,
    };
  });
  return {
    celdas: cs,
    bloques: Object.values(bloques),
  };
}

function validateSemaforos(semaforos) {
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
  const ids = [];
  return semaforos.map((s) => {
    const idSemaforo = buildId(idSector, s);

    if (ids.includes(idSemaforo))
      throw new Error(`Clave duplicada en Semaforos: ${idSemaforo}`);
    ids.push(idSemaforo);

    return {
      modo: AUTOMATICO,
      ...s,
      idSemaforo,
      idSector,
    };
  });
}

function validateAutomatizaciones(automatizaciones) {
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
  const ids = [];
  return automatizaciones.map((e) => {
    const idAutom =
      e.tipo === BLOQUE ? buildIdBloque(idSector, e) : buildId(idSector, e);
    if (ids.includes(idAutom))
      throw new Error(`Clave duplicada en Automatizaciones: ${idAutom}`);
    ids.push(idAutom);
    return {
      ...e,
      idAutom,
      idSector,
    };
  });
}

function validateEnclavamientos(enclavamientos) {
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
  const ids = [];
  return enclavamientos.map((e) => {
    const idEncl = buildId(idSector, e);
    if (ids.includes(idEncl))
      throw new Error(`Clave duplicada en Enclavamientos: ${idEncl}`);
    ids.push(idEncl);
    return {
      ...e,
      idEncl,
      idSector,
    };
  });
}

// This is where it starts validating and processing

validateConstants();

const dirs = fs.readdirSync('./', { withFileTypes: true });

const sectores = [];

dirs.forEach((d) => {
  if (d.isDirectory() && !d.name.startsWith('_')) {
    const idSector = d.name;
    const fd = fs.openSync(`./_salida/${idSector}.js`, 'w');

    const grabar = (name, values) => {
      console.log('  ', name);
      fs.writeSync(
        fd,
        `export const ${name} =  ${util.inspect(values, {
          depth: null,
          maxArrayLength: null,
        })};\n`
      );
    };
    console.log(idSector);

    console.log('   sector');
    const sector = require(`./${idSector}/sector.js`).sector;
    validateSector(sector);
    sectores.push({
      ...sector,
      idSector,
    });

    let path = `./${idSector}/celdas.js`;
    if (fs.existsSync(path)) {
      const celdas = require(path).celdas;
      validateCeldas(celdas);
      const salida = processCeldas(idSector, celdas);
      grabar('celdas', salida.celdas);
      grabar('bloques', salida.bloques);
    } else {
      throw new Error(`La definición de celdas es obligatoria. Falta ${path}`);
    }

    path = `./${idSector}/semaforos.js`;
    if (fs.existsSync(path)) {
      const semaforos = require(path).semaforos;
      validateSemaforos(semaforos);
      grabar('semaforos', processSemaforos(idSector, semaforos));
    } else {
      grabar();
    }

    path = `./${idSector}/automatizaciones.js`;
    if (fs.existsSync(path)) {
      const automatizaciones = require(path).automatizaciones;
      validateAutomatizaciones(automatizaciones);
      grabar(
        'automatizaciones',
        processAutomatizaciones(idSector, automatizaciones)
      );
    }

    path = `./${idSector}/enclavamientos.js`;
    if (fs.existsSync(path)) {
      const enclavamientos = require(path).enclavamientos;
      validateEnclavamientos(enclavamientos);
      grabar('enclavamientos', processEnclavamientos(idSector, enclavamientos));
    }
    fs.closeSync(fd);
  }
});

console.log('Grabando Sectores');

fs.writeFileSync(
  './_salida/_sectores.js',

  `export default ${util.inspect(sectores, {
    depth: null,
    maxArrayLength: null,
  })}
  `
);
console.log('Fin');
process.exit();
