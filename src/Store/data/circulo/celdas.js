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
    tipo: LINEA,
    x: 1,
    y: 0,
    puntas: [SW, E],
    despachador: [SW],
  },
  {
    tipo: LINEA,
    x: 2,
    y: 0,
    puntas: [W, SE],
    despachador: [SE],
  },
  {
    tipo: LINEA,
    x: 0,
    y: 1,
    puntas: [NE, S],
  },
  {
    tipo: LINEA,
    x: 0,
    y: 3,
    puntas: [N, SE],
  },
  {
    tipo: LINEA,
    x: 1,
    y: 4,
    puntas: [NW, E],
  },
  {
    tipo: LINEA,
    x: 3,
    y: 1,
    puntas: [NW, S],
  },
  {
    tipo: CAMBIO,
    x: 3,
    y: 3,
    punta: N,
    ramas: {
      normal: SW,
      desviado: S,
    },
    posicion: NORMAL,
  },
  {
    tipo: CRUCE,
    x: 2,
    y: 4,
    linea1: {
      puntas: [W, NE],
    },
    linea2: {
      puntas: [NW, SE],
    },
  },

  {
    tipo: TRIPLE,
    posicion: CENTRO,
    punta: N,
    ramas: {
      centro: S,
      izq: SE,
      der: SW,
    },
    x: 0,
    y: 2,
  },
  {
    tipo: TRIPLE,
    posicion: CENTRO,
    punta: N,
    ramas: {
      centro: S,
      izq: SE,
      der: SW,
    },
    x: 5,
    y: 1,
    despachador: [N, S, SE, SW],
  },
  {
    tipo: CAMBIO,
    x: 5,
    y: 3,
    posicion: NORMAL,
    punta: W,
    ramas: {
      normal: E,
      desviado: NE,
    },
    despachador: [W, E, NE],
  },
  {
    tipo: PARAGOLPE,
    x: 3,
    y: 4,
    punta: N,
  },
  {
    tipo: LINEA,
    x: 3,
    y: 2,
    puntas: [N, S],
  },
  {
    tipo: LINEA,
    x: 1,
    y: 3,
    puntas: [NW, SE],
  },
];
