/* eslint-disable no-unused-vars*/
import {
  CAMBIO,
  SEMAFORO,
  NORMAL,
  DESVIADO,
  IZQ,
  CENTRO,
  DER,
  LIBRE,
  PRECAUCION,
  ALTO,
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

export const automatizaciones = [
  {
    x: 0,
    y: 0,
    dir: W,
    tipo: SEMAFORO,
    deps: [
      {
        x: 0,
        y: 0,
        tipo: CAMBIO,
        alts: [
          {
            cuando: NORMAL,
            izq: ALTO,
          },
          { cuando: DESVIADO, izq: PRECAUCION, centro: ALTO },
        ],
      },
    ],
  },
];
