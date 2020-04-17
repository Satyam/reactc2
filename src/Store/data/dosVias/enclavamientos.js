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
  NOR_ESTE,
  SUD_ESTE,
  NOR_OESTE,
  SUD_OESTE,
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
        bloque: NOR_OESTE,
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
        x: 2,
        y: 1,
        desviado: {
          centro: ROJO,
        },
      },
      {
        tipo: BLOQUE,
        bloque: SUD_OESTE,
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
        bloque: NOR_OESTE,
        luzAfectada: CENTRO,
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
        bloque: SUD_ESTE,
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
        x: 6,
        y: 0,
        desviado: {
          centro: ROJO,
        },
      },
      {
        tipo: BLOQUE,
        bloque: NOR_ESTE,
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
        bloque: SUD_ESTE,
        luzAfectada: IZQ,
      },
      {
        tipo: BLOQUE,
        bloque: SUD_ESTE,
        luzAfectada: CENTRO,
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
        bloque: NOR_ESTE,
        luzAfectada: DER,
      },
      {
        tipo: BLOQUE,
        bloque: NOR_ESTE,
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
    bloque: NOR_ESTE,
    dependencias: [
      {
        tipo: BLOQUE,
        bloque: SUD_ESTE,
        x: 7,
        y: 0,
        posicion: DESVIADO,
      },
      {
        tipo: BLOQUE,
        bloque: SUD_ESTE,
        x: 6,
        y: 0,
        posicion: DESVIADO,
      },
    ],
  },
  {
    tipo: BLOQUE,
    bloque: SUD_ESTE,
    dependencias: [
      {
        tipo: BLOQUE,
        bloque: NOR_ESTE,
        x: 7,
        y: 1,
        posicion: DESVIADO,
      },
      {
        tipo: BLOQUE,
        bloque: NOR_ESTE,
        x: 6,
        y: 1,
        posicion: DESVIADO,
      },
    ],
  },
  {
    tipo: BLOQUE,
    bloque: NOR_OESTE,
    dependencias: [
      {
        tipo: BLOQUE,
        bloque: SUD_OESTE,
        x: 2,
        y: 0,
        posicion: DESVIADO,
      },
      {
        tipo: BLOQUE,
        bloque: SUD_OESTE,
        x: 1,
        y: 0,
        posicion: DESVIADO,
      },
    ],
  },
  {
    tipo: BLOQUE,
    bloque: SUD_OESTE,
    dependencias: [
      {
        tipo: BLOQUE,
        bloque: NOR_OESTE,
        x: 2,
        y: 1,
        posicion: DESVIADO,
      },
      {
        tipo: BLOQUE,
        bloque: NOR_OESTE,
        x: 1,
        y: 1,
        posicion: DESVIADO,
      },
    ],
  },
];
