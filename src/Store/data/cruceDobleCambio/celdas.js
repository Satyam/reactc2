/* eslint-disable no-unused-vars*/
import {
  LINEA,
  CAMBIO,
  PARAGOLPE,
  CRUCE,
  NORMAL,
  CENTRO,
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

export const celdas = [
  {
    tipo: CAMBIO,
    x: 0,
    y: 0,
    punta: W,
    ramas: [E, SE],
  },
  {
    tipo: CAMBIO,
    x: 1,
    y: 0,
    punta: E,
    ramas: [W, SW],
  },
  {
    tipo: CAMBIO,
    x: 0,
    y: 1,
    punta: W,
    ramas: [E, NE],
  },
  {
    tipo: CAMBIO,
    x: 1,
    y: 1,
    punta: E,
    ramas: [W, NW],
  },
];
