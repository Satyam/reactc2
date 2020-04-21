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
    x: 4,
    y: 4,
    tipo: CAMBIO,

    deps: [
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

    deps: [
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

    deps: [
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

    deps: [
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
    tipo: SEMAFORO,

    deps: [
      {
        x: 2,
        y: 4,
        tipo: CAMBIO,
        izq: {
          centro: ALTO,
          der: ALTO,
        },
        centro: {
          izq: ALTO,
          der: ALTO,
        },
        der: {
          izq: ALTO,
          centro: ALTO,
        },
      },
    ],
  },
  {
    x: 4,
    y: 4,
    dir: W,
    tipo: SEMAFORO,

    deps: [
      {
        x: 4,
        y: 4,
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
        x: 5,
        y: 4,
        tipo: CAMBIO,
        desviado: {
          centro: ALTO,
          der: ALTO,
        },
      },
    ],
  },
  {
    x: 8,
    y: 3,
    dir: SE,
    tipo: SEMAFORO,

    deps: [
      {
        x: 8,
        y: 3,
        tipo: CAMBIO,
        normal: {
          izq: ALTO,
        },
        desviado: {
          izq: PRECAUCION,
          centro: ALTO,
        },
      },
    ],
  },
];
