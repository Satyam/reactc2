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
} from '../constantes';
/* eslint-enable no-unused-vars*/

export const enclavamientos = [
  {
    x: 3,
    y: 0,
    dir: W,
    tipo: SENAL,
    dependencias: [
      {
        tipo: BLOQUE,
        bloque: 'dos',
        luzAfectada: CENTRO,
      },
      {
        x: 7,
        y: 0,
        dir: W,
        tipo: SENAL,
        luces: [
          {
            luzOrigen: CENTRO,
            cuando: ROJO,
            luzAfectada: CENTRO,
            estado: AMARILLO,
          },
        ],
      },
    ],
  },
  {
    x: 7,
    y: 0,
    dir: W,
    tipo: SENAL,
    dependencias: [
      {
        tipo: BLOQUE,
        bloque: 'tres',
        luzAfectada: CENTRO,
      },
    ],
  },
  {
    x: 5,
    y: 0,
    dir: E,
    tipo: SENAL,
    dependencias: [
      {
        tipo: BLOQUE,
        bloque: 'dos',
        luzAfectada: CENTRO,
      },
      {
        x: 1,
        y: 0,
        dir: E,
        tipo: SENAL,
        luces: [
          {
            luzOrigen: CENTRO,
            cuando: ROJO,
            luzAfectada: CENTRO,
            estado: AMARILLO,
          },
        ],
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
        tipo: BLOQUE,
        bloque: 'uno',
        luzAfectada: CENTRO,
      },
    ],
  },
];
