/* eslint-disable no-unused-vars*/
import {
  CAMBIO,
  SEMAFORO,
  NORMAL,
  DESVIADO,
  ALTERNATIVA,
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
        alts: [
          { cuando: NORMAL, posicion: NORMAL },
          { cuando: DESVIADO, posicion: DESVIADO },
        ],
      },
      {
        x: 4,
        y: 5,
        tipo: CAMBIO,
        alts: [
          {
            cuando: DESVIADO,
            posicion: NORMAL,
          },
        ],
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
        alts: [
          { cuando: NORMAL, posicion: NORMAL },
          { cuando: DESVIADO, posicion: DESVIADO },
        ],
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
        alts: [
          { cuando: NORMAL, posicion: NORMAL },
          { cuando: DESVIADO, posicion: DESVIADO },
        ],
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
        alts: [
          { cuando: NORMAL, posicion: NORMAL },
          { cuando: DESVIADO, posicion: DESVIADO },
        ],
      },
      {
        x: 4,
        y: 5,
        tipo: CAMBIO,
        alts: [{ cuando: DESVIADO, posicion: NORMAL }],
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
        alts: [
          { cuando: ALTERNATIVA, centro: ALTO, der: ALTO },
          {
            cuando: NORMAL,
            izq: ALTO,
            der: ALTO,
          },
          {
            cuando: DESVIADO,
            izq: ALTO,
            centro: ALTO,
          },
        ],
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
        alts: [
          {
            cuando: NORMAL,
            der: ALTO,
          },
          {
            cuando: DESVIADO,
            centro: ALTO,
            der: PRECAUCION,
          },
        ],
      },
      {
        x: 5,
        y: 4,
        tipo: CAMBIO,
        alts: [{ cuando: DESVIADO, centro: ALTO, der: ALTO }],
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
        alts: [
          { cuando: NORMAL, izq: ALTO },
          {
            cuando: DESVIADO,
            izq: PRECAUCION,
            centro: ALTO,
          },
        ],
      },
    ],
  },
];
