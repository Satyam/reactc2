/* eslint-disable no-unused-vars*/
import {
  CAMBIO,
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

export const enclavamientos = [
  {
    x: 1,
    y: 0,
    tipo: CAMBIO,

    dependencias: [
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

    dependencias: [
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

    dependencias: [
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

    dependencias: [
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

    dependencias: [
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

    dependencias: [
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

    dependencias: [
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

    dependencias: [
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
    tipo: SENAL,
    dependencias: [
      {
        tipo: BLOQUE,
        bloque: OESTE_10,
        luzAfectada: DER,
      },
      {
        tipo: CAMBIO,
        x: 1,
        y: 0,
        normal: {
          der: ROJO,
        },
        desviado: {
          der: AMARILLO,
        },
      },
      {
        x: 3,
        y: 1,
        dir: W,
        tipo: SENAL,
        luces: [
          {
            cuando: ROJO,
            luzAfectada: DER,
            estado: AMARILLO,
          },
        ],
      },
      {
        tipo: FIJO,
        luzAfectada: CENTRO,
        estado: ROJO,
      },
    ],
  },
  {
    x: 1,
    y: 1,
    dir: W,
    tipo: SENAL,
    dependencias: [
      {
        tipo: CAMBIO,
        x: 1,
        y: 1,
        desviado: {
          centro: ROJO,
        },
      },
      {
        tipo: CAMBIO,
        x: 2,
        y: 1,
        desviado: {
          centro: ROJO,
        },
      },
      {
        tipo: BLOQUE,
        bloque: OESTE_11,
        luzAfectada: CENTRO,
      },
      {
        x: 3,
        y: 1,
        dir: W,
        tipo: SENAL,
        luces: [
          {
            cuando: ROJO,
            luzAfectada: DER,
            estado: AMARILLO,
          },
        ],
      },
      {
        tipo: FIJO,
        luzAfectada: IZQ,
        estado: ROJO,
      },
    ],
  },

  {
    x: 2,
    y: 0,
    dir: E,
    tipo: SENAL,
    dependencias: [
      {
        tipo: BLOQUE,
        bloque: OESTE_20,
        luzAfectada: CENTRO,
      },
      {
        tipo: BLOQUE,
        bloque: OESTE_20,
        luzAfectada: IZQ,
      },
      {
        tipo: BLOQUE,
        bloque: P_OESTE_N,
        luzAfectada: CENTRO,
      },
      {
        tipo: BLOQUE,
        bloque: P_OESTE_S,
        luzAfectada: IZQ,
      },
      {
        tipo: CAMBIO,
        x: 2,
        y: 0,
        normal: {
          izq: ROJO,
        },
        desviado: {
          centro: ROJO,
          izq: AMARILLO,
        },
      },
      {
        tipo: CAMBIO,
        x: 1,
        y: 0,
        desviado: {
          centro: ROJO,
        },
      },
    ],
  },
  {
    x: 2,
    y: 1,
    dir: E,
    tipo: SENAL,
    dependencias: [
      {
        tipo: FIJO,
        luzAfectada: DER,
        estado: ROJO,
      },
      {
        tipo: FIJO,
        luzAfectada: CENTRO,
        estado: ROJO,
      },
      {
        tipo: CAMBIO,
        x: 2,
        y: 1,
        normal: {
          der: ROJO,
        },
        desviado: {
          centro: ROJO,
          der: AMARILLO,
        },
      },
      {
        tipo: CAMBIO,
        x: 1,
        y: 1,
        desviado: {
          centro: ROJO,
        },
      },
    ],
  },

  {
    x: 7,
    y: 1,
    dir: E,
    tipo: SENAL,
    dependencias: [
      {
        tipo: CAMBIO,
        x: 7,
        y: 1,
        normal: {
          der: ROJO,
        },
        desviado: {
          der: AMARILLO,
        },
      },
      {
        tipo: FIJO,
        luzAfectada: CENTRO,
        estado: ROJO,
      },
      {
        tipo: BLOQUE,
        bloque: ESTE_71,
        luzAfectada: DER,
      },
      {
        x: 5,
        y: 0,
        dir: E,
        tipo: SENAL,
        luces: [
          {
            cuando: ROJO,
            luzAfectada: DER,
            estado: AMARILLO,
          },
        ],
      },
      {
        tipo: FIJO,
        luzAfectada: CENTRO,
        estado: ROJO,
      },
    ],
  },
  {
    x: 7,
    y: 0,
    dir: E,
    tipo: SENAL,
    dependencias: [
      {
        tipo: CAMBIO,
        x: 7,
        y: 0,
        desviado: {
          centro: ROJO,
        },
      },
      {
        tipo: CAMBIO,
        x: 6,
        y: 0,
        desviado: {
          centro: ROJO,
        },
      },
      {
        tipo: BLOQUE,
        bloque: ESTE_70,
        luzAfectada: CENTRO,
      },
      {
        x: 5,
        y: 1,
        dir: E,
        tipo: SENAL,
        luces: [
          {
            cuando: ROJO,
            luzAfectada: IZQ,
            estado: AMARILLO,
          },
        ],
      },
      {
        tipo: FIJO,
        luzAfectada: IZQ,
        estado: ROJO,
      },
    ],
  },

  {
    x: 6,
    y: 1,
    dir: W,
    tipo: SENAL,
    dependencias: [
      {
        tipo: BLOQUE,
        bloque: ESTE_61,
        luzAfectada: IZQ,
      },
      {
        tipo: BLOQUE,
        bloque: ESTE_61,
        luzAfectada: CENTRO,
      },
      {
        tipo: BLOQUE,
        bloque: P_ESTE_S,
        luzAfectada: CENTRO,
      },
      {
        tipo: BLOQUE,
        bloque: P_ESTE_N,
        luzAfectada: IZQ,
      },
      {
        tipo: CAMBIO,
        x: 7,
        y: 0,
        normal: {
          izq: ROJO,
        },
        desviado: {
          centro: ROJO,
          izq: AMARILLO,
        },
      },
      {
        tipo: CAMBIO,
        x: 7,
        y: 1,
        desviado: {
          centro: ROJO,
        },
      },
    ],
  },
  {
    x: 6,
    y: 0,
    dir: W,
    tipo: SENAL,
    dependencias: [
      {
        tipo: BLOQUE,
        bloque: ESTE_60,
        luzAfectada: DER,
      },
      {
        tipo: BLOQUE,
        bloque: ESTE_60,
        luzAfectada: CENTRO,
      },
      {
        tipo: CAMBIO,
        x: 6,
        y: 0,
        normal: {
          der: ROJO,
        },
        desviado: {
          centro: ROJO,
          der: AMARILLO,
        },
      },
      {
        tipo: CAMBIO,
        x: 7,
        y: 0,
        desviado: {
          centro: ROJO,
        },
      },
      {
        tipo: FIJO,
        luzAfectada: CENTRO,
        estado: ROJO,
      },
    ],
  },
  {
    tipo: SENAL,
    x: 3,
    y: 1,
    dir: W,
    dependencias: [
      {
        tipo: BLOQUE,
        bloque: SUR,
        luzAfectada: CENTRO,
      },
      {
        tipo: SENAL,
        x: 6,
        y: 1,
        dir: W,
        luces: [
          {
            cuando: ROJO,
            luzAfectada: CENTRO,
            estado: AMARILLO,
          },
        ],
      },
    ],
  },
  {
    tipo: SENAL,
    x: 5,
    y: 0,
    dir: E,
    dependencias: [
      {
        tipo: BLOQUE,
        bloque: NORTE,
        luzAfectada: CENTRO,
      },
      {
        tipo: SENAL,
        x: 2,
        y: 0,
        dir: E,
        luces: [
          {
            cuando: ROJO,
            luzAfectada: CENTRO,
            estado: AMARILLO,
          },
        ],
      },
    ],
  },
  {
    tipo: BLOQUE,
    bloque: OESTE_10,
    dependencias: [
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
    dependencias: [
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
    dependencias: [
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
    dependencias: [
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
    dependencias: [
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
    dependencias: [
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
    dependencias: [
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
    dependencias: [
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
