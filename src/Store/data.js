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
export const PRIMARIA = 'primaria';
// Cambio:
export const NORMAL = 'normal';
export const DESVIADO = 'desviado';
// Triple
export const IZQ = 'izq';
export const CENTRO = 'centro';
export const DER = 'der';
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
  'simpleDesvio:0,0': {
    tipo: CAMBIO,
    x: 0,
    y: 0,
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
    senales: ['simpleDesvio:0,0:W'],
    idSector: 'simpleDesvio',
  },
  'cruceDobleCambio:0,0': {
    tipo: CAMBIO,
    x: 0,
    y: 0,
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
    senales: ['cruceDobleCambio:0,0:W'],
    idSector: 'cruceDobleCambio',
  },
  'cruceDobleCambio:1,0': {
    tipo: CAMBIO,
    x: 1,
    y: 0,
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
    senales: ['cruceDobleCambio:1,0:E'],
    idSector: 'cruceDobleCambio',
  },
  'cruceDobleCambio:0,1': {
    tipo: CAMBIO,
    x: 0,
    y: 1,
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
    senales: ['cruceDobleCambio:0,1:W'],
    idSector: 'cruceDobleCambio',
  },
  'cruceDobleCambio:1,1': {
    tipo: CAMBIO,
    x: 1,
    y: 1,
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
    senales: ['cruceDobleCambio:1,1:E'],
    idSector: 'cruceDobleCambio',
  },
  'senalesEncadenadas:0,0': {
    tipo: LINEA,
    desde: {
      dir: W,
    },
    hacia: {
      dir: E,
    },
    x: 0,
    y: 0,
    idSector: 'senalesEncadenadas',
    senales: ['senalesEncadenadas:0,0:W'],
  },
  'senalesEncadenadas:1,0': {
    tipo: LINEA,
    desde: {
      dir: W,
    },
    hacia: {
      dir: E,
    },
    x: 1,
    y: 0,
    idSector: 'senalesEncadenadas',
  },
  'senalesEncadenadas:2,0': {
    tipo: LINEA,
    desde: {
      dir: W,
    },
    hacia: {
      dir: E,
    },
    x: 2,
    y: 0,
    idSector: 'senalesEncadenadas',
  },
  'senalesEncadenadas:3,0': {
    tipo: LINEA,
    desde: {
      dir: W,
    },
    hacia: {
      dir: E,
    },
    x: 3,
    y: 0,
    idSector: 'senalesEncadenadas',
    senales: ['senalesEncadenadas:3,0:W'],
  },
};
export const senales = {
  'constitucion:5,3:E': {
    idSector: 'constitucion',
    primaria: VERDE,
    dir: E,
  },
  'constitucion:8,3:SE': {
    idSector: 'constitucion',
    dir: SE,
    primaria: VERDE,
    izq: ROJO,
  },
  'constitucion:2,4:W': {
    idSector: 'constitucion',
    dir: W,
    primaria: VERDE,
    izq: ROJO,
    der: ROJO,
  },
  'constitucion:4,4:W': {
    idSector: 'constitucion',
    dir: W,
    primaria: VERDE,
    der: ROJO,
  },
  'simpleDesvio:0,0:W': {
    idSector: 'simpleDesvio',
    dir: W,
    primaria: VERDE,
    izq: ROJO,
  },
  'cruceDobleCambio:0,0:W': {
    idSector: 'cruceDobleCambio',
    dir: W,
    primaria: VERDE,
    der: ROJO,
  },
  'cruceDobleCambio:1,0:E': {
    idSector: 'cruceDobleCambio',
    dir: E,
    primaria: VERDE,
    izq: ROJO,
  },
  'cruceDobleCambio:0,1:W': {
    idSector: 'cruceDobleCambio',
    dir: W,
    primaria: VERDE,
    izq: ROJO,
  },
  'cruceDobleCambio:1,1:E': {
    idSector: 'cruceDobleCambio',
    dir: E,
    primaria: VERDE,
    der: ROJO,
  },
  'senalesEncadenadas:0,0:W': {
    idSector: 'senalesEncadenadas',
    dir: W,
    primaria: VERDE,
  },
  'senalesEncadenadas:3,0:W': {
    idSector: 'senalesEncadenadas',
    dir: W,
    primaria: VERDE,
  },
};
export const enclavamientos = [
  {
    idTarget: 'constitucion:4,4',
    tipo: CAMBIO,
    idSector: 'constitucion',
    dependencias: [
      {
        idSource: 'constitucion:5,5',
        tipo: CAMBIO,
        [NORMAL]: NORMAL,
        [DESVIADO]: DESVIADO,
      },
      {
        idSource: 'constitucion:4,5',
        tipo: CAMBIO,
        [DESVIADO]: NORMAL,
      },
    ],
  },
  {
    idTarget: 'constitucion:4,5',
    tipo: CAMBIO,
    idSector: 'constitucion',
    dependencias: [
      {
        idSource: 'constitucion:5,4',
        tipo: CAMBIO,
        [NORMAL]: NORMAL,
        [DESVIADO]: DESVIADO,
      },
    ],
  },
  {
    idTarget: 'constitucion:5,4',
    tipo: CAMBIO,
    idSector: 'constitucion',
    dependencias: [
      {
        idSource: 'constitucion:4,5',
        tipo: CAMBIO,
        [NORMAL]: NORMAL,
        [DESVIADO]: DESVIADO,
      },
    ],
  },
  {
    idTarget: 'constitucion:5,5',
    tipo: CAMBIO,
    idSector: 'constitucion',
    dependencias: [
      {
        idSource: 'constitucion:4,4',
        tipo: CAMBIO,
        [NORMAL]: NORMAL,
        [DESVIADO]: DESVIADO,
      },
      {
        idSource: 'constitucion:4,5',
        tipo: CAMBIO,
        [DESVIADO]: NORMAL,
      },
    ],
  },
  {
    idTarget: 'constitucion:2,4:W',
    tipo: SENAL,
    idSector: 'constitucion',
    dependencias: [
      {
        idSource: 'constitucion:2,4',
        tipo: CAMBIO,
        [IZQ]: {
          primaria: ROJO,
          der: ROJO,
        },
        [CENTRO]: {
          izq: ROJO,
          der: ROJO,
        },
        [DER]: {
          izq: ROJO,
          primaria: ROJO,
        },
      },
    ],
  },
  {
    idTarget: 'constitucion:4,4:W',
    tipo: SENAL,
    idSector: 'constitucion',
    dependencias: [
      {
        idSource: 'constitucion:4,4',
        tipo: CAMBIO,
        [NORMAL]: {
          der: ROJO,
        },
        [DESVIADO]: {
          primaria: ROJO,
          der: AMARILLO,
        },
      },
      {
        idSource: 'constitucion:5,4',
        tipo: CAMBIO,
        [DESVIADO]: {
          primaria: ROJO,
          der: ROJO,
        },
      },
    ],
  },
  {
    idTarget: 'constitucion:8,3:SE',
    tipo: SENAL,
    idSector: 'constitucion',
    dependencias: [
      {
        idSource: 'constitucion:8,3',
        tipo: CAMBIO,
        [NORMAL]: {
          izq: ROJO,
        },
        [DESVIADO]: {
          izq: AMARILLO,
          primaria: ROJO,
        },
      },
    ],
  },
  {
    idTarget: 'simpleDesvio:0,0:W',
    tipo: SENAL,
    idSector: 'simpleDesvio',
    dependencias: [
      {
        idSource: 'simpleDesvio:0,0',
        tipo: CAMBIO,
        [NORMAL]: {
          izq: ROJO,
        },
        [DESVIADO]: {
          izq: AMARILLO,
          primaria: ROJO,
        },
      },
    ],
  },
  {
    idTarget: 'cruceDobleCambio:0,0',
    tipo: CAMBIO,
    idSector: 'cruceDobleCambio',
    dependencias: [
      {
        idSource: 'cruceDobleCambio:1,1',
        tipo: CAMBIO,
        [NORMAL]: NORMAL,
        [DESVIADO]: DESVIADO,
      },
      {
        idSource: 'cruceDobleCambio:0,1',
        tipo: CAMBIO,
        [DESVIADO]: NORMAL,
      },
    ],
  },
  {
    idTarget: 'cruceDobleCambio:0,1',
    tipo: CAMBIO,
    idSector: 'cruceDobleCambio',
    dependencias: [
      {
        idSource: 'cruceDobleCambio:1,0',
        tipo: CAMBIO,
        [NORMAL]: NORMAL,
        [DESVIADO]: DESVIADO,
      },
      {
        idSource: 'cruceDobleCambio:0,0',
        tipo: CAMBIO,
        [DESVIADO]: NORMAL,
      },
    ],
  },
  {
    idTarget: 'cruceDobleCambio:1,0',
    tipo: CAMBIO,
    idSector: 'cruceDobleCambio',
    dependencias: [
      {
        idSource: 'cruceDobleCambio:0,1',
        tipo: CAMBIO,
        [NORMAL]: NORMAL,
        [DESVIADO]: DESVIADO,
      },
      {
        idSource: 'cruceDobleCambio:1,1',
        tipo: CAMBIO,
        [DESVIADO]: NORMAL,
      },
    ],
  },
  {
    idTarget: 'cruceDobleCambio:1,1',
    tipo: CAMBIO,
    idSector: 'cruceDobleCambio',
    dependencias: [
      {
        idSource: 'cruceDobleCambio:0,0',
        tipo: CAMBIO,
        [NORMAL]: NORMAL,
        [DESVIADO]: DESVIADO,
      },
      {
        idSource: 'cruceDobleCambio:0,1',
        tipo: CAMBIO,
        [DESVIADO]: NORMAL,
      },
    ],
  },
  {
    idTarget: 'cruceDobleCambio:0,0:W',
    tipo: SENAL,
    idSector: 'cruceDobleCambio',
    dependencias: [
      {
        idSource: 'cruceDobleCambio:0,0',
        tipo: CAMBIO,
        [NORMAL]: {
          der: ROJO,
        },
        [DESVIADO]: {
          primaria: ROJO,
          der: AMARILLO,
        },
      },
      {
        idSource: 'cruceDobleCambio:1,0',
        tipo: CAMBIO,
        [DESVIADO]: {
          primaria: ROJO,
          der: ROJO,
        },
      },
    ],
  },
  {
    idTarget: 'cruceDobleCambio:1,0:E',
    tipo: SENAL,
    idSector: 'cruceDobleCambio',
    dependencias: [
      {
        idSource: 'cruceDobleCambio:1,0',
        tipo: CAMBIO,
        [NORMAL]: {
          izq: ROJO,
        },
        [DESVIADO]: {
          primaria: ROJO,
          izq: AMARILLO,
        },
      },
      {
        idSource: 'cruceDobleCambio:0,0',
        tipo: CAMBIO,
        [DESVIADO]: {
          primaria: ROJO,
          izq: ROJO,
        },
      },
    ],
  },
  {
    idTarget: 'cruceDobleCambio:0,1:W',
    tipo: SENAL,
    idSector: 'cruceDobleCambio',
    dependencias: [
      {
        idSource: 'cruceDobleCambio:0,1',
        tipo: CAMBIO,
        [NORMAL]: {
          izq: ROJO,
        },
        [DESVIADO]: {
          primaria: ROJO,
          izq: AMARILLO,
        },
      },
      {
        idSource: 'cruceDobleCambio:1,1',
        tipo: CAMBIO,
        [DESVIADO]: {
          primaria: ROJO,
          izq: ROJO,
        },
      },
    ],
  },
  {
    idTarget: 'cruceDobleCambio:1,1:E',
    tipo: SENAL,
    idSector: 'cruceDobleCambio',
    dependencias: [
      {
        idSource: 'cruceDobleCambio:1,1',
        tipo: CAMBIO,
        [NORMAL]: {
          der: ROJO,
        },
        [DESVIADO]: {
          primaria: ROJO,
          der: AMARILLO,
        },
      },
      {
        idSource: 'cruceDobleCambio:0,1',
        tipo: CAMBIO,
        [DESVIADO]: {
          primaria: ROJO,
          der: ROJO,
        },
      },
    ],
  },
  {
    idTarget: 'senalesEncadenadas:0,0:W',
    tipo: SENAL,
    idSector: 'senalesEncadenadas',
    dependencias: [
      {
        idSource: 'senalesEncadenadas:3,0:W',
        tipo: SENAL,
        luces: [
          {
            luzSource: PRIMARIA,
            cuando: ROJO,
            luzTarget: PRIMARIA,
            estado: AMARILLO,
          },
        ],
      },
    ],
  },
];
export const sectores = {
  constitucion: {
    idSector: 'constitucion',
    descrCorta: 'Constitución',
    descr: 'Estación Constitución, Ciudad de Buenos Aires, Argentina',
    ancho: 11,
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
  simpleDesvio: {
    idSector: 'simpleDesvio',
    descrCorta: '1- Desvío Simple',
    descr: 'Una única celda con un cambio y señal',
    ancho: 1,
    alto: 1,
    celdas: ['simpleDesvio:0,0'],
  },
  cruceDobleCambio: {
    idSector: 'cruceDobleCambio',
    descrCorta: '2- Doble cambio de vías',
    descr: 'Vías paralelas con cambios cruzados y señales',
    ancho: 2,
    alto: 2,
    celdas: [
      'cruceDobleCambio:0,0',
      'cruceDobleCambio:0,1',
      'cruceDobleCambio:1,0',
      'cruceDobleCambio:1,1',
    ],
  },
  senalesEncadenadas: {
    idSector: 'senalesEncadenadas',
    descrCorta: '3- Señales encadenadas',
    descr: 'Señal en amarillo cuando la siguiente está en rojo',
    ancho: 4,
    alto: 1,
    celdas: [
      'senalesEncadenadas:0,0',
      'senalesEncadenadas:1,0',
      'senalesEncadenadas:2,0',
      'senalesEncadenadas:3,0',
    ],
  },
};
