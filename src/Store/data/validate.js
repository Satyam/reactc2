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

// --- Constantes

console.log('**** Constantes ****');

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

const { sectores, celdas, senales, enclavamientos } = require('./');

// various standard types
const idSector = j.string().required();
const dir = j.valid(N, NE, E, SE, S, SW, W, NW).required();
const color = j.valid(VERDE, AMARILLO, ROJO);
const icd = j.valid(IZQ, CENTRO, DER);
const cambios = j.valid(NORMAL, DESVIADO, IZQ, CENTRO, DER);
const coords = {
  x: j
    .number()
    .integer()
    .min(0)
    .required(),
  y: j
    .number()
    .integer()
    .min(0)
    .required(),
};

// --- Sectores
console.log('**** Sectores ****');

validate(
  sectores,
  j
    .array()
    .items(
      j.object({
        idSector,
        descr: j.string().required(),
        descrCorta: j
          .string()
          .max(30)
          .required(),
        ancho: j
          .number()
          .positive()
          .integer()
          .required()
          .min(1),
        alto: j
          .number()
          .positive()
          .integer()
          .required()
          .min(1),
      })
    )
    .unique(
      (a, b) => a.idSector === b.idSector || a.descrCorta === b.descrCorta
    )
);

// ---- Celdas

const baseCelda = j
  .object({
    idSector,
    despachador: j.array().items(dir),
  })
  .append(coords);

const puntas = j
  .array()
  .items(dir)
  .length(2)
  .unique()
  .required();

const celdaLinea = baseCelda.append({
  tipo: j.valid(LINEA),
  puntas,
});

const celdaCambio = baseCelda.append({
  tipo: j.valid(CAMBIO),
  posicionInicial: j.valid(NORMAL, DESVIADO),
  punta: dir,
  ramas: j.object({ [NORMAL]: dir, [DESVIADO]: dir }),
});

const celdaParagolpe = baseCelda.append({
  tipo: j.valid(PARAGOLPE),
  punta: dir,
});

const celdaTriple = baseCelda.append({
  tipo: j.valid(TRIPLE),
  posicionInicial: icd,
  punta: dir,
  ramas: j.object({ [IZQ]: dir, [CENTRO]: dir, [DER]: dir }),
});

const celdaCruce = baseCelda.append({
  tipo: j.valid(CRUCE),
  linea1: j.object({
    puntas,
    nivel: j
      .number()
      .integer()
      .min(0),
  }),
  linea2: j.object({
    puntas,
    nivel: j
      .number()
      .integer()
      .min(0),
  }),
  nivel: j.boolean(),
});

console.log('*** Celdas ****');
validate(
  celdas,
  j
    .array()
    .items(
      j
        .alternatives()
        .try(celdaLinea, celdaCambio, celdaParagolpe, celdaTriple, celdaCruce)
    )
    .unique((a, b) => a.idSector === b.idSector && a.x === b.x && a.y === b.y)
);

// ---- Señales

const baseSenales = baseCelda
  .append({
    dir,
    [IZQ]: color,
    [CENTRO]: color,
    [DER]: color,
    soloManual: j.boolean(),
  })
  .or(IZQ, CENTRO, DER);

console.log('*** Senales ****');
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

// ---- Enclavamientos

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

const depsCambio = depCambioCambio;
const depsSenal = j.alternatives().try(depSenalSenal, depSenalCambio);

const baseEncl = j
  .object({
    idSector,
  })
  .append(coords);

const enclCambio = baseEncl.append({
  tipo: CAMBIO,
  dependencias: j.array().items(depsCambio),
});

const enclSenal = baseEncl.append({
  tipo: SENAL,
  dir,
  dependencias: j.array().items(depsSenal),
});
console.log('*** Enclavamientos ****');

validate(
  enclavamientos,
  j
    .array()
    .items(j.alternatives().try(enclCambio, enclSenal))
    .unique(
      (a, b) =>
        a.idSector === b.idSector &&
        a.x === b.x &&
        a.y === b.y &&
        a.tipo === b.tipo &&
        a.dir === b.dir
    )
);

console.log('********* done **************');
