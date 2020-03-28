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
    x: 0,
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
];
