/* eslint-disable no-unused-vars*/
import {
  VERDE,
  AMARILLO,
  ROJO,
  IZQ,
  CENTRO,
  DER,
  N,
  NE,
  E,
  SE,
  S,
  SW,
  W,
  NW,
} from '../constantes';
/* eslint-enable no-unused-vars */

export const senales = [
  {
    centro: VERDE,
    dir: E,
    x: 5,
    y: 3,
  },
  {
    dir: SE,
    centro: VERDE,
    izq: ROJO,
    x: 8,
    y: 3,
  },
  {
    dir: W,
    centro: VERDE,
    izq: ROJO,
    der: ROJO,
    x: 2,
    y: 4,
  },
  {
    dir: W,
    centro: VERDE,
    der: ROJO,
    x: 4,
    y: 4,
  },
];
