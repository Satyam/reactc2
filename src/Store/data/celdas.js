import {
  LINEA,
  CAMBIO,
  PARAGOLPE,
  TRIPLE,
  CRUCE,
  NORMAL,
  CENTRO,
  N,
  NE,
  E,
  SE,
  S,
  SW,
  W,
  NW,
} from './constantes';

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
