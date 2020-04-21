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
} from '../constantes';
/* eslint-enable no-unused-vars*/

export const automatizaciones = [
  {
    x: 0,
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

    deps: [
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

    deps: [
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

    deps: [
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
    tipo: SEMAFORO,

    deps: [
      {
        x: 0,
        y: 0,
        tipo: CAMBIO,
        normal: {
          der: ALTO,
        },
        desviado: {
          centro: ALTO,
          der: PRECAUCION,
        },
      },
      {
        x: 1,
        y: 0,
        tipo: CAMBIO,
        desviado: {
          centro: ALTO,
          der: ALTO,
        },
      },
    ],
  },
  {
    x: 1,
    y: 0,
    dir: E,
    tipo: SEMAFORO,

    deps: [
      {
        x: 1,
        y: 0,
        tipo: CAMBIO,
        normal: {
          izq: ALTO,
        },
        desviado: {
          centro: ALTO,
          izq: PRECAUCION,
        },
      },
      {
        x: 0,
        y: 0,
        tipo: CAMBIO,
        desviado: {
          centro: ALTO,
          izq: ALTO,
        },
      },
    ],
  },
  {
    x: 0,
    y: 1,
    dir: W,
    tipo: SEMAFORO,

    deps: [
      {
        x: 0,
        y: 1,
        tipo: CAMBIO,
        normal: {
          izq: ALTO,
        },
        desviado: {
          centro: ALTO,
          izq: PRECAUCION,
        },
      },
      {
        x: 1,
        y: 1,
        tipo: CAMBIO,
        desviado: {
          centro: ALTO,
          izq: ALTO,
        },
      },
    ],
  },
  {
    x: 1,
    y: 1,
    dir: E,
    tipo: SEMAFORO,

    deps: [
      {
        x: 1,
        y: 1,
        tipo: CAMBIO,
        normal: {
          der: ALTO,
        },
        desviado: {
          centro: ALTO,
          der: PRECAUCION,
        },
      },
      {
        x: 0,
        y: 1,
        tipo: CAMBIO,
        desviado: {
          centro: ALTO,
          der: ALTO,
        },
      },
    ],
  },
];
