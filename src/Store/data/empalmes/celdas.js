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
    tipo: LINEA,
    x: 1,
    y: 0,
    puntas: [E, W],
    despachador: [E, W],
  },
  {
    tipo: PARAGOLPE,
    x: 0,
    y: 2,
    punta: E,
    rebota: true,
  },
  {
    tipo: PARAGOLPE,
    x: 2,
    y: 2,
    punta: W,
    rebota: true,
  },
];
