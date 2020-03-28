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
} from '../constantes';
/* eslint-enable no-unused-vars*/

export const enclavamientos = [
  {
    x: 4,
    y: 4,
    tipo: CAMBIO,

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
];
