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
} from '../../constantes';
/* eslint-enable no-unused-vars */

export const semaforos = [
  {
    centro: LIBRE,
    dir: E,
    x: 5,
    y: 3,
  },
  {
    dir: SE,
    centro: LIBRE,
    izq: ALTO,
    x: 8,
    y: 3,
  },
  {
    dir: W,
    centro: LIBRE,
    izq: ALTO,
    der: ALTO,
    x: 2,
    y: 4,
  },
  {
    dir: W,
    centro: LIBRE,
    der: ALTO,
    x: 4,
    y: 4,
  },
];
