/* eslint-disable no-unused-vars*/
import {
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
} from './constantes';
/* eslint-enable no-unused-vars */

export const senales = {
  'constitucion:5,3:E': {
    idSector: 'constitucion',
    primaria: VERDE,
    dir: E,
  },
  'constitucion:8,3:SE': {
    idSector: 'constitucion',
    dir: SE,
    primaria: VERDE,
    izq: ROJO,
  },
  'constitucion:2,4:W': {
    idSector: 'constitucion',
    dir: W,
    primaria: VERDE,
    izq: ROJO,
    der: ROJO,
  },
  'constitucion:4,4:W': {
    idSector: 'constitucion',
    dir: W,
    primaria: VERDE,
    der: ROJO,
  },
  'simpleDesvio:0,0:W': {
    idSector: 'simpleDesvio',
    dir: W,
    primaria: VERDE,
    izq: ROJO,
  },
  'cruceDobleCambio:0,0:W': {
    idSector: 'cruceDobleCambio',
    dir: W,
    primaria: VERDE,
    der: ROJO,
  },
  'cruceDobleCambio:1,0:E': {
    idSector: 'cruceDobleCambio',
    dir: E,
    primaria: VERDE,
    izq: ROJO,
  },
  'cruceDobleCambio:0,1:W': {
    idSector: 'cruceDobleCambio',
    dir: W,
    primaria: VERDE,
    izq: ROJO,
  },
  'cruceDobleCambio:1,1:E': {
    idSector: 'cruceDobleCambio',
    dir: E,
    primaria: VERDE,
    der: ROJO,
  },
  'senalesEncadenadas:0,0:W': {
    idSector: 'senalesEncadenadas',
    dir: W,
    primaria: VERDE,
  },
  'senalesEncadenadas:3,0:W': {
    idSector: 'senalesEncadenadas',
    dir: W,
    primaria: VERDE,
  },
};
