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
    dir: W,
    centro: VERDE,
    der: ROJO,
    x: 0,
    y: 0,
  },
  {
    dir: E,
    centro: VERDE,
    izq: ROJO,
    x: 1,
    y: 0,
  },
  {
    dir: W,
    centro: VERDE,
    izq: ROJO,
    x: 0,
    y: 1,
  },
  {
    dir: E,
    centro: VERDE,
    der: ROJO,
    x: 1,
    y: 1,
  },
];
