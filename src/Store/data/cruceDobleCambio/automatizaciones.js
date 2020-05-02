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
} from '../../constantes';
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
        alts: [
          { cuando: NORMAL, posicion: NORMAL },
          { cuando: DESVIADO, posicion: DESVIADO },
        ],
      },
      {
        x: 0,
        y: 1,
        tipo: CAMBIO,
        alts: [{ cuando: DESVIADO, posicion: NORMAL }],
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
        alts: [
          { cuando: NORMAL, posicion: NORMAL },
          { cuando: DESVIADO, posicion: DESVIADO },
        ],
      },
      {
        x: 0,
        y: 0,
        tipo: CAMBIO,
        alts: [{ cuando: DESVIADO, posicion: NORMAL }],
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
        alts: [
          { cuando: NORMAL, posicion: NORMAL },
          { cuando: DESVIADO, posicion: DESVIADO },
        ],
      },
      {
        x: 1,
        y: 1,
        tipo: CAMBIO,
        alts: [{ cuando: DESVIADO, posicion: NORMAL }],
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
        alts: [
          { cuando: NORMAL, posicion: NORMAL },
          { cuando: DESVIADO, posicion: DESVIADO },
        ],
      },
      {
        x: 0,
        y: 1,
        tipo: CAMBIO,
        alts: [{ cuando: DESVIADO, posicion: NORMAL }],
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
        alts: [
          { cuando: NORMAL, der: ALTO },
          { cuando: DESVIADO, centro: ALTO, der: PRECAUCION },
        ],
      },
      {
        x: 1,
        y: 0,
        tipo: CAMBIO,
        alts: [{ cuando: DESVIADO, centro: ALTO, der: ALTO }],
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
        alts: [
          { cuando: NORMAL, izq: ALTO },
          { cuando: DESVIADO, centro: ALTO, izq: PRECAUCION },
        ],
      },
      {
        x: 0,
        y: 0,
        tipo: CAMBIO,
        alts: [{ cuando: DESVIADO, centro: ALTO, izq: ALTO }],
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
        alts: [
          { cuando: NORMAL, izq: ALTO },
          { cuando: DESVIADO, centro: ALTO, izq: PRECAUCION },
        ],
      },
      {
        x: 1,
        y: 1,
        tipo: CAMBIO,
        alts: [{ cuando: DESVIADO, centro: ALTO, izq: ALTO }],
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
        alts: [
          { cuando: NORMAL, der: ALTO },
          { cuando: DESVIADO, centro: ALTO, der: PRECAUCION },
        ],
      },
      {
        x: 0,
        y: 1,
        tipo: CAMBIO,
        alts: [{ cuando: DESVIADO, centro: ALTO, der: ALTO }],
      },
    ],
  },
];
