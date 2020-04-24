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
    x: 0,
    y: 0,
  },
  {
    dir: W,
    centro: LIBRE,
    x: 3,
    y: 0,
    soloManiobra: true,
  },
];
