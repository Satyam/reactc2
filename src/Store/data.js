// Tipos de celda
export const LINEA = 'linea';
export const CAMBIO = 'cambio';
export const TRIPLE = 'triple';
export const CRUCE = 'cruce';
export const PARAGOLPE = 'paragolpe';
export const SENAL = 'senal';
// Luces:
export const VERDE = 'verde';
export const AMARILLO = 'amarillo';
export const ROJO = 'rojo';
// Cambio:
export const NORMAL = 'normal';
export const DESVIADO = 'desviado';
// Triple
export const IZQ = 'izquierda';
export const CENTRO = 'centro';
export const DER = 'derecha';
// Direcciones:
export const N = 'N';
export const NE = 'NE';
export const E = 'E';
export const SE = 'SE';
export const S = 'S';
export const SW = 'SW';
export const W = 'W';
export const NW = 'NW';

export const celdas = {
  'constitucion:5,0': {
    tipo: LINEA,
    desde: {
      dir: N,
    },
    hacia: {
      dir: S,
    },
    x: 5,
    y: 0,
    idSector: 'constitucion',
  },
  'constitucion:6,0': {
    tipo: LINEA,
    desde: {
      dir: N,
    },
    hacia: {
      dir: S,
    },
    x: 6,
    y: 0,
    idSector: 'constitucion',
  },
  'constitucion:5,1': {
    tipo: LINEA,
    desde: {
      dir: N,
    },
    hacia: {
      dir: SW,
    },
    x: 5,
    y: 1,
    idSector: 'constitucion',
  },
  'constitucion:6,1': {
    tipo: LINEA,
    desde: {
      dir: N,
    },
    hacia: {
      dir: SE,
    },
    x: 6,
    y: 1,
    idSector: 'constitucion',
  },
  'constitucion:4,2': {
    tipo: LINEA,
    desde: {
      dir: NE,
    },
    hacia: {
      dir: SW,
    },
    x: 4,
    y: 2,
    idSector: 'constitucion',
  },
  'constitucion:7,2': {
    tipo: LINEA,
    desde: {
      dir: NW,
    },
    hacia: {
      dir: SE,
    },
    x: 7,
    y: 2,
    idSector: 'constitucion',
  },
  'constitucion:3,3': {
    tipo: LINEA,
    desde: {
      dir: NE,
    },
    hacia: {
      dir: SW,
    },
    x: 3,
    y: 3,
    idSector: 'constitucion',
  },
  'constitucion:4,3': {
    tipo: LINEA,
    desde: {
      dir: SW,
    },
    hacia: {
      dir: E,
    },
    x: 4,
    y: 3,
    idSector: 'constitucion',
  },
  'constitucion:5,3': {
    tipo: LINEA,
    desde: {
      dir: W,
    },
    hacia: {
      dir: E,
    },
    senales: ['constitucion:5,3:E'],
    x: 5,
    y: 3,
    idSector: 'constitucion',
  },
  'constitucion:6,3': {
    tipo: LINEA,
    desde: {
      dir: W,
    },
    hacia: {
      dir: E,
    },
    x: 6,
    y: 3,
    idSector: 'constitucion',
  },
  'constitucion:7,3': {
    tipo: LINEA,
    desde: {
      dir: W,
    },
    hacia: {
      dir: E,
    },
    x: 7,
    y: 3,
    idSector: 'constitucion',
  },
  'constitucion:8,3': {
    tipo: CAMBIO,
    posicionInicial: NORMAL,
    punta: {
      dir: SE,
    },
    ramas: {
      normal: {
        dir: NW,
      },
      desviado: {
        dir: W,
      },
    },
    senales: ['constitucion:8,3:SE'],
    x: 8,
    y: 3,
    idSector: 'constitucion',
  },
  'constitucion:0,4': {
    tipo: PARAGOLPE,
    desde: {
      dir: E,
    },
    x: 0,
    y: 4,
    idSector: 'constitucion',
  },
  'constitucion:1,4': {
    tipo: LINEA,
    desde: {
      dir: W,
    },
    hacia: {
      dir: E,
    },
    x: 1,
    y: 4,
    idSector: 'constitucion',
  },
  'constitucion:2,4': {
    tipo: TRIPLE,
    posicionInicial: CENTRO,
    punta: {
      dir: W,
    },
    ramas: {
      centro: {
        dir: E,
      },
      izq: {
        dir: NE,
      },
      der: {
        dir: SE,
      },
    },
    senales: ['constitucion:2,4:W'],
    x: 2,
    y: 4,
    idSector: 'constitucion',
  },
  'constitucion:3,4': {
    tipo: CRUCE,
    l1: {
      desde: {
        dir: SW,
      },
      hacia: {
        dir: NE,
      },
    },
    l2: {
      desde: {
        dir: W,
      },
      hacia: {
        dir: E,
      },
    },
    x: 3,
    y: 4,
    idSector: 'constitucion',
  },
  'constitucion:4,4': {
    tipo: CAMBIO,
    posicionInicial: NORMAL,
    punta: {
      dir: W,
    },
    ramas: {
      normal: {
        dir: E,
      },
      desviado: {
        dir: SE,
      },
    },
    senales: ['constitucion:4,4:W'],
    x: 4,
    y: 4,
    idSector: 'constitucion',
  },
  'constitucion:5,4': {
    tipo: CAMBIO,
    posicionInicial: NORMAL,
    punta: {
      dir: E,
    },
    ramas: {
      normal: {
        dir: W,
      },
      desviado: {
        dir: SW,
      },
    },
    x: 5,
    y: 4,
    idSector: 'constitucion',
  },
  'constitucion:6,4': {
    tipo: LINEA,
    desde: {
      dir: W,
    },
    hacia: {
      dir: SE,
    },
    x: 6,
    y: 4,
    idSector: 'constitucion',
  },
  'constitucion:9,4': {
    tipo: LINEA,
    desde: {
      dir: NW,
    },
    hacia: {
      dir: SE,
    },
    x: 9,
    y: 4,
    idSector: 'constitucion',
  },
  'constitucion:0,5': {
    tipo: PARAGOLPE,
    desde: {
      dir: E,
    },
    x: 0,
    y: 5,
    idSector: 'constitucion',
  },
  'constitucion:1,5': {
    tipo: LINEA,
    desde: {
      dir: W,
    },
    hacia: {
      dir: E,
    },
    x: 1,
    y: 5,
    idSector: 'constitucion',
  },
  'constitucion:2,5': {
    tipo: CAMBIO,
    posicionInicial: NORMAL,
    punta: {
      dir: W,
    },
    ramas: {
      normal: {
        dir: E,
      },
      desviado: {
        dir: NE,
      },
    },
    x: 2,
    y: 5,
    idSector: 'constitucion',
  },
  'constitucion:3,5': {
    tipo: CRUCE,
    l1: {
      desde: {
        dir: NW,
      },
      hacia: {
        dir: SE,
      },
    },
    l2: {
      desde: {
        dir: W,
      },
      hacia: {
        dir: E,
      },
    },
    x: 3,
    y: 5,
    idSector: 'constitucion',
  },
  'constitucion:4,5': {
    tipo: CAMBIO,
    posicionInicial: NORMAL,
    punta: {
      dir: W,
    },
    ramas: {
      normal: {
        dir: E,
      },
      desviado: {
        dir: NE,
      },
    },
    x: 4,
    y: 5,
    idSector: 'constitucion',
  },
  'constitucion:5,5': {
    tipo: CAMBIO,
    posicionInicial: NORMAL,
    punta: {
      dir: E,
    },
    ramas: {
      normal: {
        dir: W,
      },
      desviado: {
        dir: NW,
      },
    },
    x: 5,
    y: 5,
    idSector: 'constitucion',
  },
  'constitucion:6,5': {
    tipo: LINEA,
    desde: {
      dir: W,
    },
    hacia: {
      dir: SE,
    },
    x: 6,
    y: 5,
    idSector: 'constitucion',
  },
  'constitucion:7,5': {
    tipo: LINEA,
    desde: {
      dir: NW,
    },
    hacia: {
      dir: SE,
    },
    x: 7,
    y: 5,
    idSector: 'constitucion',
  },
  'constitucion:10,5': {
    tipo: LINEA,
    desde: {
      dir: NW,
    },
    hacia: {
      dir: SE,
    },
    x: 10,
    y: 5,
    idSector: 'constitucion',
  },
};
export const senales = {
  'constitucion:5,3:E': {
    primaria: {
      estado: VERDE,
    },
    dir: E,
  },
  'constitucion:8,3:SE': {
    dir: SE,
    primaria: {
      estado: VERDE,
    },
    izq: {
      estado: ROJO,
    },
  },
  'constitucion:2,4:W': {
    dir: W,
    primaria: {
      estado: VERDE,
    },
    izq: {
      estado: ROJO,
    },
    der: {
      estado: ROJO,
    },
  },
  'constitucion:4,4:W': {
    primaria: {
      estado: VERDE,
    },
    der: {
      estado: ROJO,
    },
    dir: W,
  },
};
export const enclavamientos = {
  'constitucion:4,4': {
    tipo: CAMBIO,
    'constitucion:5,5': {
      [NORMAL]: NORMAL,
      [DESVIADO]: DESVIADO,
    },
    'constitucion:4,5': {
      [DESVIADO]: NORMAL,
    },
    'constitucion:5,4': {
      [DESVIADO]: NORMAL,
    },
  },
  'constitucion:4,5': {
    tipo: CAMBIO,
    'constitucion:5,4': {
      [NORMAL]: NORMAL,
      [DESVIADO]: DESVIADO,
    },
  },
  'constitucion:5,4': {
    tipo: CAMBIO,
    'constitucion:4,5': {
      [NORMAL]: NORMAL,
      [DESVIADO]: DESVIADO,
    },
  },
  'constitucion:5,5': {
    tipo: CAMBIO,
    'constitucion:4,4': {
      [NORMAL]: NORMAL,
      [DESVIADO]: DESVIADO,
    },
    'constitucion:4,5': {
      [DESVIADO]: NORMAL,
    },
    'constitucion:5,4': {
      [DESVIADO]: NORMAL,
    },
  },
  'constitucion:2,4:W': {
    tipo: SENAL,
    'constitucion:2,4': {
      izq: {
        izq: VERDE,
        primaria: ROJO,
        der: ROJO,
      },
      centro: {
        izq: ROJO,
        primaria: VERDE,
        der: ROJO,
      },
      der: {
        izq: ROJO,
        primaria: ROJO,
        der: VERDE,
      },
    },
  },
  'constitucion:4,4:W': {
    tipo: SENAL,
    'constitucion:4,4': {
      [NORMAL]: {
        der: ROJO,
      },
      [DESVIADO]: {
        primaria: ROJO,
        der: AMARILLO,
      },
    },
    'constitucion:5,4': {
      [NORMAL]: {
        der: ROJO,
      },
      [DESVIADO]: {
        primaria: ROJO,
        der: AMARILLO,
      },
    },
  },
  'constitucion:8,3:SE': {
    tipo: SENAL,
    'constitucion:8,3': {
      [NORMAL]: {
        izq: ROJO,
        primaria: VERDE,
      },
      [DESVIADO]: {
        izq: AMARILLO,
        primaria: ROJO,
      },
    },
  },
};
export const sectores = {
  constitucion: {
    idSector: 'constitucion',
    descrCorta: 'Constitución',
    descr: 'Estación Constitución, Ciudad de Buenos Aires, Argentina',
    ancho: 16,
    alto: 7,
    celdas: [
      'constitucion:5,0',
      'constitucion:6,0',
      'constitucion:5,1',
      'constitucion:6,1',
      'constitucion:4,2',
      'constitucion:7,2',
      'constitucion:3,3',
      'constitucion:4,3',
      'constitucion:5,3',
      'constitucion:6,3',
      'constitucion:7,3',
      'constitucion:8,3',
      'constitucion:0,4',
      'constitucion:1,4',
      'constitucion:2,4',
      'constitucion:3,4',
      'constitucion:4,4',
      'constitucion:5,4',
      'constitucion:6,4',
      'constitucion:9,4',
      'constitucion:0,5',
      'constitucion:1,5',
      'constitucion:2,5',
      'constitucion:3,5',
      'constitucion:4,5',
      'constitucion:5,5',
      'constitucion:6,5',
      'constitucion:7,5',
      'constitucion:10,5',
    ],
  },
};
