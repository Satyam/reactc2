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
} from './constantes';
/* eslint-enable no-unused-vars*/

import {
  CONSTITUCION,
  SIMPLE_DESVIO,
  CRUCE_DOBLE_CAMBIO,
  SENALES_ENCADENADAS,
} from './sectores';

export const enclavamientos = [
  {
    x: 4,
    y: 4,
    tipo: CAMBIO,
    idSector: CONSTITUCION,
    dependencias: [
      {
        x: 5,
        y: 5,
        tipo: CAMBIO,
        normal: NORMAL,
        desviado: DESVIADO,
      },
      {
        x: 4,
        y: 5,
        tipo: CAMBIO,
        desviado: NORMAL,
      },
    ],
  },
  {
    x: 4,
    y: 5,
    tipo: CAMBIO,
    idSector: CONSTITUCION,
    dependencias: [
      {
        x: 5,
        y: 4,
        tipo: CAMBIO,
        normal: NORMAL,
        desviado: DESVIADO,
      },
    ],
  },
  {
    x: 5,
    y: 4,
    tipo: CAMBIO,
    idSector: CONSTITUCION,
    dependencias: [
      {
        x: 4,
        y: 5,
        tipo: CAMBIO,
        normal: NORMAL,
        desviado: DESVIADO,
      },
    ],
  },
  {
    x: 5,
    y: 5,
    tipo: CAMBIO,
    idSector: CONSTITUCION,
    dependencias: [
      {
        x: 4,
        y: 4,
        tipo: CAMBIO,
        normal: NORMAL,
        desviado: DESVIADO,
      },
      {
        x: 4,
        y: 5,
        tipo: CAMBIO,
        desviado: NORMAL,
      },
    ],
  },
  {
    x: 2,
    y: 4,
    dir: W,
    tipo: SENAL,
    idSector: CONSTITUCION,
    dependencias: [
      {
        x: 2,
        y: 4,
        tipo: CAMBIO,
        izq: {
          centro: ROJO,
          der: ROJO,
        },
        centro: {
          izq: ROJO,
          der: ROJO,
        },
        der: {
          izq: ROJO,
          centro: ROJO,
        },
      },
    ],
  },
  {
    x: 4,
    y: 4,
    dir: W,
    tipo: SENAL,
    idSector: CONSTITUCION,
    dependencias: [
      {
        x: 4,
        y: 4,
        tipo: CAMBIO,
        normal: {
          der: ROJO,
        },
        desviado: {
          centro: ROJO,
          der: AMARILLO,
        },
      },
      {
        x: 5,
        y: 4,
        tipo: CAMBIO,
        desviado: {
          centro: ROJO,
          der: ROJO,
        },
      },
    ],
  },
  {
    x: 8,
    y: 3,
    dir: SE,
    tipo: SENAL,
    idSector: CONSTITUCION,
    dependencias: [
      {
        x: 8,
        y: 3,
        tipo: CAMBIO,
        normal: {
          izq: ROJO,
        },
        desviado: {
          izq: AMARILLO,
          centro: ROJO,
        },
      },
    ],
  },
  {
    x: 0,
    y: 0,
    dir: W,
    tipo: SENAL,
    idSector: SIMPLE_DESVIO,
    dependencias: [
      {
        x: 0,
        y: 0,
        tipo: CAMBIO,
        normal: {
          izq: ROJO,
        },
        desviado: {
          izq: AMARILLO,
          centro: ROJO,
        },
      },
    ],
  },
  {
    x: 0,
    y: 0,
    tipo: CAMBIO,
    idSector: CRUCE_DOBLE_CAMBIO,
    dependencias: [
      {
        x: 1,
        y: 1,
        tipo: CAMBIO,
        normal: NORMAL,
        desviado: DESVIADO,
      },
      {
        x: 0,
        y: 1,
        tipo: CAMBIO,
        desviado: NORMAL,
      },
    ],
  },
  {
    x: 0,
    y: 1,
    tipo: CAMBIO,
    idSector: CRUCE_DOBLE_CAMBIO,
    dependencias: [
      {
        x: 1,
        y: 0,
        tipo: CAMBIO,
        normal: NORMAL,
        desviado: DESVIADO,
      },
      {
        x: 0,
        y: 0,
        tipo: CAMBIO,
        desviado: NORMAL,
      },
    ],
  },
  {
    x: 1,
    y: 0,
    tipo: CAMBIO,
    idSector: CRUCE_DOBLE_CAMBIO,
    dependencias: [
      {
        x: 0,
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
    idSector: CRUCE_DOBLE_CAMBIO,
    dependencias: [
      {
        x: 0,
        y: 0,
        tipo: CAMBIO,
        normal: NORMAL,
        desviado: DESVIADO,
      },
      {
        x: 0,
        y: 1,
        tipo: CAMBIO,
        desviado: NORMAL,
      },
    ],
  },
  {
    x: 0,
    y: 0,
    dir: W,
    tipo: SENAL,
    idSector: CRUCE_DOBLE_CAMBIO,
    dependencias: [
      {
        x: 0,
        y: 0,
        tipo: CAMBIO,
        normal: {
          der: ROJO,
        },
        desviado: {
          centro: ROJO,
          der: AMARILLO,
        },
      },
      {
        x: 1,
        y: 0,
        tipo: CAMBIO,
        desviado: {
          centro: ROJO,
          der: ROJO,
        },
      },
    ],
  },
  {
    x: 1,
    y: 0,
    dir: E,
    tipo: SENAL,
    idSector: CRUCE_DOBLE_CAMBIO,
    dependencias: [
      {
        x: 1,
        y: 0,
        tipo: CAMBIO,
        normal: {
          izq: ROJO,
        },
        desviado: {
          centro: ROJO,
          izq: AMARILLO,
        },
      },
      {
        x: 0,
        y: 0,
        tipo: CAMBIO,
        desviado: {
          centro: ROJO,
          izq: ROJO,
        },
      },
    ],
  },
  {
    x: 0,
    y: 1,
    dir: W,
    tipo: SENAL,
    idSector: CRUCE_DOBLE_CAMBIO,
    dependencias: [
      {
        x: 0,
        y: 1,
        tipo: CAMBIO,
        normal: {
          izq: ROJO,
        },
        desviado: {
          centro: ROJO,
          izq: AMARILLO,
        },
      },
      {
        x: 1,
        y: 1,
        tipo: CAMBIO,
        desviado: {
          centro: ROJO,
          izq: ROJO,
        },
      },
    ],
  },
  {
    x: 1,
    y: 1,
    dir: E,
    tipo: SENAL,
    idSector: CRUCE_DOBLE_CAMBIO,
    dependencias: [
      {
        x: 1,
        y: 1,
        tipo: CAMBIO,
        normal: {
          der: ROJO,
        },
        desviado: {
          centro: ROJO,
          der: AMARILLO,
        },
      },
      {
        x: 0,
        y: 1,
        tipo: CAMBIO,
        desviado: {
          centro: ROJO,
          der: ROJO,
        },
      },
    ],
  },
  {
    x: 0,
    y: 0,
    dir: W,
    tipo: SENAL,
    idSector: SENALES_ENCADENADAS,
    dependencias: [
      {
        x: 3,
        y: 0,
        dir: W,
        tipo: SENAL,
        luces: [
          {
            luzSource: CENTRO,
            cuando: ROJO,
            luzTarget: CENTRO,
            estado: AMARILLO,
          },
        ],
      },
    ],
  },
];
