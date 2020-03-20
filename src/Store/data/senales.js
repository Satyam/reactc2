/* eslint-disable no-unused-vars*/
import {
  VERDE,
  AMARILLO,
  ROJO,
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
} from './constantes';
/* eslint-enable no-unused-vars */

export const senales = [
  {
    idSector: 'constitucion',
    [CENTRO]: VERDE,
    dir: E,
    x: 5,
    y: 3,
  },
  {
    idSector: 'constitucion',
    dir: SE,
    [CENTRO]: VERDE,
    [IZQ]: ROJO,
    x: 8,
    y: 3,
  },
  {
    idSector: 'constitucion',
    dir: W,
    [CENTRO]: VERDE,
    [IZQ]: ROJO,
    [DER]: ROJO,
    x: 2,
    y: 4,
  },
  {
    idSector: 'constitucion',
    dir: W,
    [CENTRO]: VERDE,
    [DER]: ROJO,
    x: 4,
    y: 4,
  },
  {
    idSector: 'simpleDesvio',
    dir: W,
    [CENTRO]: VERDE,
    [IZQ]: ROJO,
    x: 0,
    y: 0,
  },
  {
    idSector: 'cruceDobleCambio',
    dir: W,
    [CENTRO]: VERDE,
    [DER]: ROJO,
    x: 0,
    y: 0,
  },
  {
    idSector: 'cruceDobleCambio',
    dir: E,
    [CENTRO]: VERDE,
    [IZQ]: ROJO,
    x: 1,
    y: 0,
  },
  {
    idSector: 'cruceDobleCambio',
    dir: W,
    [CENTRO]: VERDE,
    [IZQ]: ROJO,
    x: 0,
    y: 1,
  },
  {
    idSector: 'cruceDobleCambio',
    dir: E,
    [CENTRO]: VERDE,
    [DER]: ROJO,
    x: 1,
    y: 1,
  },
  {
    idSector: 'senalesEncadenadas',
    dir: W,
    [CENTRO]: VERDE,
    x: 0,
    y: 0,
  },
  {
    idSector: 'senalesEncadenadas',
    dir: W,
    [CENTRO]: VERDE,
    x: 3,
    y: 0,
    soloManual: true,
  },
];
