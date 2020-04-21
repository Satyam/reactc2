/* eslint-disable no-unused-vars*/
import {
  LIBRE,
  PRECAUCION,
  ALTO,
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

export const semaforos = [
  {
    dir: W,
    centro: LIBRE,
    der: ALTO,
    x: 0,
    y: 0,
  },
  {
    dir: E,
    centro: LIBRE,
    izq: ALTO,
    x: 1,
    y: 0,
  },
  {
    dir: W,
    centro: LIBRE,
    izq: ALTO,
    x: 0,
    y: 1,
  },
  {
    dir: E,
    centro: LIBRE,
    der: ALTO,
    x: 1,
    y: 1,
  },
];
