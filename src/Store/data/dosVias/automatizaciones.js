/* eslint-disable no-unused-vars*/
import {
  CAMBIO,
  SEMAFORO,
  NORMAL,
  DESVIADO,
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
} from '../constantes';
/* eslint-enable no-unused-vars*/

import {
  NORTE,
  SUR,
  OESTE_10,
  OESTE_11,
  OESTE_20,
  OESTE_21,
  P_OESTE_N,
  P_OESTE_S,
  ESTE_60,
  ESTE_61,
  ESTE_70,
  ESTE_71,
  P_ESTE_N,
  P_ESTE_S,
} from './bloques';

export const automatizaciones = [
  {
    x: 1,
    y: 0,
    tipo: CAMBIO,

    deps: [
      {
        x: 2,
        y: 1,
        tipo: CAMBIO,
        normal: NORMAL,
        desviado: DESVIADO,
      },
      {
        x: 1,
        y: 1,
        tipo: CAMBIO,
        desviado: NORMAL,
      },
    ],
  },
  {
    x: 1,
    y: 1,
    tipo: CAMBIO,

    deps: [
      {
        x: 2,
        y: 0,
        tipo: CAMBIO,
        normal: NORMAL,
        desviado: DESVIADO,
      },
      {
        x: 1,
        y: 0,
        tipo: CAMBIO,
        desviado: NORMAL,
      },
    ],
  },
  {
    x: 2,
    y: 0,
    tipo: CAMBIO,

    deps: [
      {
        x: 1,
        y: 1,
        tipo: CAMBIO,
        normal: NORMAL,
        desviado: DESVIADO,
      },
      {
        x: 2,
        y: 1,
        tipo: CAMBIO,
        desviado: NORMAL,
      },
    ],
  },
  {
    x: 2,
    y: 1,
    tipo: CAMBIO,

    deps: [
      {
        x: 1,
        y: 0,
        tipo: CAMBIO,
        normal: NORMAL,
        desviado: DESVIADO,
      },
      {
        x: 1,
        y: 1,
        tipo: CAMBIO,
        desviado: NORMAL,
      },
    ],
  },

  {
    x: 6,
    y: 0,
    tipo: CAMBIO,

    deps: [
      {
        x: 7,
        y: 1,
        tipo: CAMBIO,
        normal: NORMAL,
        desviado: DESVIADO,
      },
      {
        x: 6,
        y: 1,
        tipo: CAMBIO,
        desviado: NORMAL,
      },
    ],
  },
  {
    x: 6,
    y: 1,
    tipo: CAMBIO,

    deps: [
      {
        x: 7,
        y: 0,
        tipo: CAMBIO,
        normal: NORMAL,
        desviado: DESVIADO,
      },
      {
        x: 6,
        y: 0,
        tipo: CAMBIO,
        desviado: NORMAL,
      },
    ],
  },
  {
    x: 7,
    y: 0,
    tipo: CAMBIO,

    deps: [
      {
        x: 6,
        y: 1,
        tipo: CAMBIO,
        normal: NORMAL,
        desviado: DESVIADO,
      },
      {
        x: 7,
        y: 1,
        tipo: CAMBIO,
        desviado: NORMAL,
      },
    ],
  },
  {
    x: 7,
    y: 1,
    tipo: CAMBIO,

    deps: [
      {
        x: 6,
        y: 0,
        tipo: CAMBIO,
        normal: NORMAL,
        desviado: DESVIADO,
      },
      {
        x: 6,
        y: 1,
        tipo: CAMBIO,
        desviado: NORMAL,
      },
    ],
  },

  {
    x: 1,
    y: 0,
    dir: W,
    tipo: SEMAFORO,
    deps: [
      {
        tipo: BLOQUE,
        bloque: OESTE_10,
        senalAfectada: DER,
      },
      {
        tipo: CAMBIO,
        x: 1,
        y: 0,
        normal: {
          der: ALTO,
        },
        desviado: {
          der: PRECAUCION,
        },
      },
      {
        x: 3,
        y: 1,
        dir: W,
        tipo: SEMAFORO,
        senales: [
          {
            cuando: ALTO,
            senalAfectada: DER,
            estado: PRECAUCION,
          },
        ],
      },
      {
        tipo: FIJO,
        senalAfectada: CENTRO,
        estado: ALTO,
      },
    ],
  },
  {
    x: 1,
    y: 1,
    dir: W,
    tipo: SEMAFORO,
    deps: [
      {
        tipo: CAMBIO,
        x: 1,
        y: 1,
        desviado: {
          centro: ALTO,
        },
      },
      {
        tipo: CAMBIO,
        x: 2,
        y: 1,
        desviado: {
          centro: ALTO,
        },
      },
      {
        tipo: BLOQUE,
        bloque: OESTE_11,
        senalAfectada: CENTRO,
      },
      {
        x: 3,
        y: 1,
        dir: W,
        tipo: SEMAFORO,
        senales: [
          {
            cuando: ALTO,
            senalAfectada: DER,
            estado: PRECAUCION,
          },
        ],
      },
      {
        tipo: FIJO,
        senalAfectada: IZQ,
        estado: ALTO,
      },
    ],
  },

  {
    x: 2,
    y: 0,
    dir: E,
    tipo: SEMAFORO,
    deps: [
      {
        tipo: BLOQUE,
        bloque: OESTE_20,
        senalAfectada: CENTRO,
      },
      {
        tipo: BLOQUE,
        bloque: OESTE_20,
        senalAfectada: IZQ,
      },
      {
        tipo: BLOQUE,
        bloque: P_OESTE_N,
        senalAfectada: CENTRO,
      },
      {
        tipo: BLOQUE,
        bloque: P_OESTE_S,
        senalAfectada: IZQ,
      },
      {
        tipo: CAMBIO,
        x: 2,
        y: 0,
        normal: {
          izq: ALTO,
        },
        desviado: {
          centro: ALTO,
          izq: PRECAUCION,
        },
      },
      {
        tipo: CAMBIO,
        x: 1,
        y: 0,
        desviado: {
          centro: ALTO,
        },
      },
    ],
  },
  {
    x: 2,
    y: 1,
    dir: E,
    tipo: SEMAFORO,
    deps: [
      {
        tipo: FIJO,
        senalAfectada: DER,
        estado: ALTO,
      },
      {
        tipo: FIJO,
        senalAfectada: CENTRO,
        estado: ALTO,
      },
      {
        tipo: CAMBIO,
        x: 2,
        y: 1,
        normal: {
          der: ALTO,
        },
        desviado: {
          centro: ALTO,
          der: PRECAUCION,
        },
      },
      {
        tipo: CAMBIO,
        x: 1,
        y: 1,
        desviado: {
          centro: ALTO,
        },
      },
    ],
  },

  {
    x: 7,
    y: 1,
    dir: E,
    tipo: SEMAFORO,
    deps: [
      {
        tipo: CAMBIO,
        x: 7,
        y: 1,
        normal: {
          der: ALTO,
        },
        desviado: {
          der: PRECAUCION,
        },
      },
      {
        tipo: FIJO,
        senalAfectada: CENTRO,
        estado: ALTO,
      },
      {
        tipo: BLOQUE,
        bloque: ESTE_71,
        senalAfectada: DER,
      },
      {
        x: 5,
        y: 0,
        dir: E,
        tipo: SEMAFORO,
        senales: [
          {
            cuando: ALTO,
            senalAfectada: DER,
            estado: PRECAUCION,
          },
        ],
      },
      {
        tipo: FIJO,
        senalAfectada: CENTRO,
        estado: ALTO,
      },
    ],
  },
  {
    x: 7,
    y: 0,
    dir: E,
    tipo: SEMAFORO,
    deps: [
      {
        tipo: CAMBIO,
        x: 7,
        y: 0,
        desviado: {
          centro: ALTO,
        },
      },
      {
        tipo: CAMBIO,
        x: 6,
        y: 0,
        desviado: {
          centro: ALTO,
        },
      },
      {
        tipo: BLOQUE,
        bloque: ESTE_70,
        senalAfectada: CENTRO,
      },
      {
        x: 5,
        y: 1,
        dir: E,
        tipo: SEMAFORO,
        senales: [
          {
            cuando: ALTO,
            senalAfectada: IZQ,
            estado: PRECAUCION,
          },
        ],
      },
      {
        tipo: FIJO,
        senalAfectada: IZQ,
        estado: ALTO,
      },
    ],
  },

  {
    x: 6,
    y: 1,
    dir: W,
    tipo: SEMAFORO,
    deps: [
      {
        tipo: BLOQUE,
        bloque: ESTE_61,
        senalAfectada: IZQ,
      },
      {
        tipo: BLOQUE,
        bloque: ESTE_61,
        senalAfectada: CENTRO,
      },
      {
        tipo: BLOQUE,
        bloque: P_ESTE_S,
        senalAfectada: CENTRO,
      },
      {
        tipo: BLOQUE,
        bloque: P_ESTE_N,
        senalAfectada: IZQ,
      },
      {
        tipo: CAMBIO,
        x: 7,
        y: 0,
        normal: {
          izq: ALTO,
        },
        desviado: {
          centro: ALTO,
          izq: PRECAUCION,
        },
      },
      {
        tipo: CAMBIO,
        x: 7,
        y: 1,
        desviado: {
          centro: ALTO,
        },
      },
    ],
  },
  {
    x: 6,
    y: 0,
    dir: W,
    tipo: SEMAFORO,
    deps: [
      {
        tipo: BLOQUE,
        bloque: ESTE_60,
        senalAfectada: DER,
      },
      {
        tipo: BLOQUE,
        bloque: ESTE_60,
        senalAfectada: CENTRO,
      },
      {
        tipo: CAMBIO,
        x: 6,
        y: 0,
        normal: {
          der: ALTO,
        },
        desviado: {
          centro: ALTO,
          der: PRECAUCION,
        },
      },
      {
        tipo: CAMBIO,
        x: 7,
        y: 0,
        desviado: {
          centro: ALTO,
        },
      },
      {
        tipo: FIJO,
        senalAfectada: CENTRO,
        estado: ALTO,
      },
    ],
  },
  {
    tipo: SEMAFORO,
    x: 3,
    y: 1,
    dir: W,
    deps: [
      {
        tipo: BLOQUE,
        bloque: SUR,
        senalAfectada: CENTRO,
      },
      {
        tipo: SEMAFORO,
        x: 6,
        y: 1,
        dir: W,
        senales: [
          {
            cuando: ALTO,
            senalAfectada: CENTRO,
            estado: PRECAUCION,
          },
        ],
      },
    ],
  },
  {
    tipo: SEMAFORO,
    x: 5,
    y: 0,
    dir: E,
    deps: [
      {
        tipo: BLOQUE,
        bloque: NORTE,
        senalAfectada: CENTRO,
      },
      {
        tipo: SEMAFORO,
        x: 2,
        y: 0,
        dir: E,
        senales: [
          {
            cuando: ALTO,
            senalAfectada: CENTRO,
            estado: PRECAUCION,
          },
        ],
      },
    ],
  },
  {
    tipo: BLOQUE,
    bloque: OESTE_10,
    deps: [
      {
        tipo: BLOQUE,
        bloque: OESTE_20,
        x: 1,
        y: 0,
        posicion: NORMAL,
      },
      {
        tipo: BLOQUE,
        bloque: OESTE_21,
        x: 1,
        y: 0,
        posicion: DESVIADO,
      },
    ],
  },
  {
    tipo: BLOQUE,
    bloque: OESTE_20,
    deps: [
      {
        tipo: BLOQUE,
        bloque: OESTE_10,
        x: 2,
        y: 0,
        posicion: NORMAL,
      },
      {
        tipo: BLOQUE,
        bloque: OESTE_11,
        x: 1,
        y: 0,
        posicion: DESVIADO,
      },
    ],
  },
  {
    tipo: BLOQUE,
    bloque: OESTE_11,
    deps: [
      {
        tipo: BLOQUE,
        bloque: OESTE_21,
        x: 1,
        y: 1,
        posicion: NORMAL,
      },
      {
        tipo: BLOQUE,
        bloque: OESTE_20,
        x: 1,
        y: 1,
        posicion: DESVIADO,
      },
    ],
  },
  {
    tipo: BLOQUE,
    bloque: OESTE_21,
    deps: [
      {
        tipo: BLOQUE,
        bloque: OESTE_11,
        x: 2,
        y: 1,
        posicion: NORMAL,
      },
      {
        tipo: BLOQUE,
        bloque: OESTE_10,
        x: 2,
        y: 1,
        posicion: DESVIADO,
      },
    ],
  },
  {
    tipo: BLOQUE,
    bloque: ESTE_60,
    deps: [
      {
        tipo: BLOQUE,
        bloque: ESTE_70,
        x: 6,
        y: 0,
        posicion: NORMAL,
      },
      {
        tipo: BLOQUE,
        bloque: ESTE_71,
        x: 6,
        y: 0,
        posicion: DESVIADO,
      },
    ],
  },
  {
    tipo: BLOQUE,
    bloque: ESTE_70,
    deps: [
      {
        tipo: BLOQUE,
        bloque: ESTE_60,
        x: 7,
        y: 0,
        posicion: NORMAL,
      },
      {
        tipo: BLOQUE,
        bloque: ESTE_61,
        x: 7,
        y: 0,
        posicion: DESVIADO,
      },
    ],
  },
  {
    tipo: BLOQUE,
    bloque: ESTE_61,
    deps: [
      {
        tipo: BLOQUE,
        bloque: ESTE_71,
        x: 6,
        y: 1,
        posicion: NORMAL,
      },
      {
        tipo: BLOQUE,
        bloque: ESTE_70,
        x: 6,
        y: 1,
        posicion: DESVIADO,
      },
    ],
  },
  {
    tipo: BLOQUE,
    bloque: ESTE_71,
    deps: [
      {
        tipo: BLOQUE,
        bloque: ESTE_61,
        x: 7,
        y: 1,
        posicion: NORMAL,
      },
      {
        tipo: BLOQUE,
        bloque: ESTE_60,
        x: 7,
        y: 1,
        posicion: DESVIADO,
      },
    ],
  },
];
