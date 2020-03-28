/* eslint-disable no-unused-vars*/
import {
  LINEA,
  CAMBIO,
  PARAGOLPE,
  TRIPLE,
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
} from '../constantes';
/* eslint-enable no-unused-vars*/

export const celdas = [
  {
    tipo: CAMBIO,
    x: 0,
    y: 0,
    posicion: NORMAL,
    punta: W,
    ramas: {
      normal: E,
      desviado: NE,
    },
  },
];
