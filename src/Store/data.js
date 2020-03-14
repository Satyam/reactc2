export const celdas = {
  'constitucion:5,0': {
    tipo: 'linea',
    desde: {
      dir: 'N',
    },
    hacia: {
      dir: 'S',
    },
    x: 5,
    y: 0,
    idSector: 'constitucion',
  },
  'constitucion:6,0': {
    tipo: 'linea',
    desde: {
      dir: 'N',
    },
    hacia: {
      dir: 'S',
    },
    x: 6,
    y: 0,
    idSector: 'constitucion',
  },
  'constitucion:5,1': {
    tipo: 'linea',
    desde: {
      dir: 'N',
    },
    hacia: {
      dir: 'SW',
    },
    x: 5,
    y: 1,
    idSector: 'constitucion',
  },
  'constitucion:6,1': {
    tipo: 'linea',
    desde: {
      dir: 'N',
    },
    hacia: {
      dir: 'SE',
    },
    x: 6,
    y: 1,
    idSector: 'constitucion',
  },
  'constitucion:4,2': {
    tipo: 'linea',
    desde: {
      dir: 'NE',
    },
    hacia: {
      dir: 'SW',
    },
    x: 4,
    y: 2,
    idSector: 'constitucion',
  },
  'constitucion:7,2': {
    tipo: 'linea',
    desde: {
      dir: 'NW',
    },
    hacia: {
      dir: 'SE',
    },
    x: 7,
    y: 2,
    idSector: 'constitucion',
  },
  'constitucion:3,3': {
    tipo: 'linea',
    desde: {
      dir: 'NE',
    },
    hacia: {
      dir: 'SW',
    },
    x: 3,
    y: 3,
    idSector: 'constitucion',
  },
  'constitucion:4,3': {
    tipo: 'linea',
    desde: {
      dir: 'SW',
    },
    hacia: {
      dir: 'E',
    },
    x: 4,
    y: 3,
    idSector: 'constitucion',
  },
  'constitucion:5,3': {
    tipo: 'linea',
    desde: {
      dir: 'W',
    },
    hacia: {
      dir: 'E',
    },
    senales: ['constitucion:5,3:E'],
    x: 5,
    y: 3,
    idSector: 'constitucion',
  },
  'constitucion:6,3': {
    tipo: 'linea',
    desde: {
      dir: 'W',
    },
    hacia: {
      dir: 'E',
    },
    x: 6,
    y: 3,
    idSector: 'constitucion',
  },
  'constitucion:7,3': {
    tipo: 'linea',
    desde: {
      dir: 'W',
    },
    hacia: {
      dir: 'E',
    },
    x: 7,
    y: 3,
    idSector: 'constitucion',
  },
  'constitucion:8,3': {
    tipo: 'cambio',
    posicionInicial: 'normal',
    punta: {
      dir: 'SE',
    },
    ramas: {
      normal: {
        dir: 'NW',
      },
      desviado: {
        dir: 'W',
      },
    },
    senales: ['constitucion:8,3:SE'],
    x: 8,
    y: 3,
    idSector: 'constitucion',
  },
  'constitucion:0,4': {
    tipo: 'paragolpe',
    desde: {
      dir: 'E',
    },
    x: 0,
    y: 4,
    idSector: 'constitucion',
  },
  'constitucion:1,4': {
    tipo: 'linea',
    desde: {
      dir: 'W',
    },
    hacia: {
      dir: 'E',
    },
    x: 1,
    y: 4,
    idSector: 'constitucion',
  },
  'constitucion:2,4': {
    tipo: 'triple',
    posicionInicial: 'centro',
    punta: {
      dir: 'W',
    },
    ramas: {
      centro: {
        dir: 'E',
      },
      izq: {
        dir: 'NE',
      },
      der: {
        dir: 'SE',
      },
    },
    senales: ['constitucion:2,4:W'],
    x: 2,
    y: 4,
    idSector: 'constitucion',
  },
  'constitucion:3,4': {
    tipo: 'cruce',
    l1: {
      desde: {
        dir: 'SW',
      },
      hacia: {
        dir: 'NE',
      },
    },
    l2: {
      desde: {
        dir: 'W',
      },
      hacia: {
        dir: 'E',
      },
    },
    x: 3,
    y: 4,
    idSector: 'constitucion',
  },
  'constitucion:4,4': {
    tipo: 'cambio',
    posicionInicial: 'normal',
    punta: {
      dir: 'W',
    },
    ramas: {
      normal: {
        dir: 'E',
      },
      desviado: {
        dir: 'SE',
      },
    },
    senales: ['constitucion:4,4:W'],
    x: 4,
    y: 4,
    idSector: 'constitucion',
  },
  'constitucion:5,4': {
    tipo: 'cambio',
    posicionInicial: 'normal',
    punta: {
      dir: 'E',
    },
    ramas: {
      normal: {
        dir: 'W',
      },
      desviado: {
        dir: 'SW',
      },
    },
    x: 5,
    y: 4,
    idSector: 'constitucion',
  },
  'constitucion:6,4': {
    tipo: 'linea',
    desde: {
      dir: 'W',
    },
    hacia: {
      dir: 'SE',
    },
    x: 6,
    y: 4,
    idSector: 'constitucion',
  },
  'constitucion:9,4': {
    tipo: 'linea',
    desde: {
      dir: 'NW',
    },
    hacia: {
      dir: 'SE',
    },
    x: 9,
    y: 4,
    idSector: 'constitucion',
  },
  'constitucion:0,5': {
    tipo: 'paragolpe',
    desde: {
      dir: 'E',
    },
    x: 0,
    y: 5,
    idSector: 'constitucion',
  },
  'constitucion:1,5': {
    tipo: 'linea',
    desde: {
      dir: 'W',
    },
    hacia: {
      dir: 'E',
    },
    x: 1,
    y: 5,
    idSector: 'constitucion',
  },
  'constitucion:2,5': {
    tipo: 'cambio',
    posicionInicial: 'normal',
    punta: {
      dir: 'W',
    },
    ramas: {
      normal: {
        dir: 'E',
      },
      desviado: {
        dir: 'NE',
      },
    },
    x: 2,
    y: 5,
    idSector: 'constitucion',
  },
  'constitucion:3,5': {
    tipo: 'cruce',
    l1: {
      desde: {
        dir: 'NW',
      },
      hacia: {
        dir: 'SE',
      },
    },
    l2: {
      desde: {
        dir: 'W',
      },
      hacia: {
        dir: 'E',
      },
    },
    x: 3,
    y: 5,
    idSector: 'constitucion',
  },
  'constitucion:4,5': {
    tipo: 'cambio',
    posicionInicial: 'normal',
    punta: {
      dir: 'W',
    },
    ramas: {
      normal: {
        dir: 'E',
      },
      desviado: {
        dir: 'NE',
      },
    },
    x: 4,
    y: 5,
    idSector: 'constitucion',
  },
  'constitucion:5,5': {
    tipo: 'cambio',
    posicionInicial: 'normal',
    punta: {
      dir: 'E',
    },
    ramas: {
      normal: {
        dir: 'W',
      },
      desviado: {
        dir: 'NW',
      },
    },
    x: 5,
    y: 5,
    idSector: 'constitucion',
  },
  'constitucion:6,5': {
    tipo: 'linea',
    desde: {
      dir: 'W',
    },
    hacia: {
      dir: 'SE',
    },
    x: 6,
    y: 5,
    idSector: 'constitucion',
  },
  'constitucion:7,5': {
    tipo: 'linea',
    desde: {
      dir: 'NW',
    },
    hacia: {
      dir: 'SE',
    },
    x: 7,
    y: 5,
    idSector: 'constitucion',
  },
  'constitucion:10,5': {
    tipo: 'linea',
    desde: {
      dir: 'NW',
    },
    hacia: {
      dir: 'SE',
    },
    x: 10,
    y: 5,
    idSector: 'constitucion',
  },
};
export const senales = {
  'constitucion:5,3:E': {
    primaria: {
      estado: 'verde',
    },
    dir: 'E',
  },
  'constitucion:8,3:SE': {
    dir: 'SE',
    primaria: {
      estado: 'verde',
    },
    izq: {
      estado: 'rojo',
    },
  },
  'constitucion:2,4:W': {
    dir: 'W',
    primaria: {
      estado: 'verde',
    },
    izq: {
      estado: 'rojo',
    },
    der: {
      estado: 'rojo',
    },
  },
  'constitucion:4,4:W': {
    primaria: {
      estado: 'verde',
    },
    der: {
      estado: 'rojo',
    },
    dir: 'W',
  },
};
export const enclavamientos = {
  'constitucion:4,4': {
    tipo: 'cambio',
    'constitucion:5,5': {
      normal: 'normal',
      desviado: 'desviado',
    },
    'constitucion:4,5': {
      desviado: 'normal',
    },
    'constitucion:5,4': {
      desviado: 'normal',
    },
  },
  'constitucion:4,5': {
    tipo: 'cambio',
    'constitucion:5,4': {
      normal: 'normal',
      desviado: 'desviado',
    },
  },
  'constitucion:5,4': {
    tipo: 'cambio',
    'constitucion:4,5': {
      normal: 'normal',
      desviado: 'desviado',
    },
  },
  'constitucion:5,5': {
    tipo: 'cambio',
    'constitucion:4,4': {
      normal: 'normal',
      desviado: 'desviado',
    },
    'constitucion:4,5': {
      desviado: 'normal',
    },
    'constitucion:5,4': {
      desviado: 'normal',
    },
  },
  'constitucion:2,4:W': {
    tipo: 'senal',
    'constitucion:2,4': {
      izq: {
        izq: 'verde',
        primaria: 'rojo',
        der: 'rojo',
      },
      centro: {
        izq: 'rojo',
        primaria: 'verde',
        der: 'rojo',
      },
      der: {
        izq: 'rojo',
        primaria: 'rojo',
        der: 'verde',
      },
    },
  },
  'constitucion:4,4:W': {
    tipo: 'senal',
    'constitucion:4,4': {
      normal: {
        der: 'rojo',
      },
      desviado: {
        primaria: 'rojo',
        der: 'amarillo',
      },
    },
    'constitucion:5,4': {
      normal: {
        der: 'rojo',
      },
      desviado: {
        primaria: 'rojo',
        der: 'amarillo',
      },
    },
  },
  'constitucion:8,3:SE': {
    tipo: 'senal',
    'constitucion:8,3': {
      normal: {
        izq: 'rojo',
        primaria: 'verde',
      },
      desviado: {
        izq: 'amarillo',
        primaria: 'rojo',
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
