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
} from '../constantes';
/* eslint-enable no-unused-vars*/

export const enclavamientos = [
  {
    x: 0,
    y: 0,
    dir: W,
    tipo: SENAL,
    dependencias: [
      {
        x: 3,
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
];
