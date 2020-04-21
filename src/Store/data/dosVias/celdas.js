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
} from '../constantes';
/* eslint-enable no-unused-vars*/

import {
  NORTE,
  SUR,
  OESTE_10,
  OESTE_11,
  OESTE_20,
  OESTE_21,
  P_OESTE_N,
  P_OESTE_S,
  ESTE_60,
  ESTE_61,
  ESTE_70,
  ESTE_71,
  P_ESTE_N,
  P_ESTE_S,
} from './bloques';

export const celdas = [
  {
    tipo: PARAGOLPE,
    x: 0,
    y: 0,
    punta: E,
    despachador: [E],
    rebota: true,
    bloque: P_OESTE_N,
  },
  {
    tipo: PARAGOLPE,
    x: 0,
    y: 1,
    punta: E,
    despachador: [E],
    rebota: true,
    bloque: P_OESTE_S,
  },

  {
    tipo: CAMBIO,
    x: 1,
    y: 0,
    punta: W,
    ramas: [E, SE],
    bloque: OESTE_10,
  },
  {
    tipo: CAMBIO,
    x: 1,
    y: 1,
    punta: W,
    ramas: [E, NE],
    bloque: OESTE_11,
  },
  {
    tipo: CAMBIO,
    x: 2,
    y: 0,
    punta: E,
    ramas: [W, SW],
    bloque: OESTE_20,
  },
  {
    tipo: CAMBIO,
    x: 2,
    y: 1,
    punta: E,
    ramas: [W, NW],
    bloque: OESTE_21,
  },

  {
    tipo: LINEA,
    x: 3,
    y: 0,
    puntas: [E, W],
    bloque: NORTE,
  },
  {
    tipo: LINEA,
    x: 3,
    y: 1,
    puntas: [E, W],
    bloque: SUR,
  },
  {
    tipo: LINEA,
    x: 4,
    y: 0,
    puntas: [E, W],
    bloque: NORTE,
  },
  {
    tipo: LINEA,
    x: 4,
    y: 1,
    puntas: [E, W],
    bloque: SUR,
  },
  {
    tipo: LINEA,
    x: 5,
    y: 0,
    puntas: [E, W],
    bloque: NORTE,
  },
  {
    tipo: LINEA,
    x: 5,
    y: 1,
    puntas: [E, W],
    bloque: SUR,
  },

  {
    tipo: CAMBIO,
    x: 6,
    y: 0,
    punta: W,
    ramas: [E, SE],
    bloque: ESTE_60,
  },
  {
    tipo: CAMBIO,
    x: 6,
    y: 1,
    punta: W,
    ramas: [E, NE],
    bloque: ESTE_61,
  },
  {
    tipo: CAMBIO,
    x: 7,
    y: 0,
    punta: E,
    ramas: [W, SW],
    bloque: ESTE_70,
  },
  {
    tipo: CAMBIO,
    x: 7,
    y: 1,
    punta: E,
    ramas: [W, NW],
    bloque: ESTE_71,
  },
  {
    tipo: PARAGOLPE,
    x: 8,
    y: 0,
    punta: W,
    despachador: [W],
    rebota: true,
    bloque: P_ESTE_N,
  },
  {
    tipo: PARAGOLPE,
    x: 8,
    y: 1,
    punta: W,
    despachador: [W],
    rebota: true,
    bloque: P_ESTE_S,
  },
];
