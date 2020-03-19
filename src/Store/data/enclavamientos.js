/* eslint-disable no-unused-vars*/
import {
  CAMBIO,
  SENAL,
  NORMAL,
  DESVIADO,
  IZQ,
  CENTRO,
  PRIMARIA,
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
} from './constantes';
/* eslint-enable no-unused-vars*/

export const enclavamientos = [
  {
    x: 4,
    y: 4,
    tipo: CAMBIO,
    idSector: 'constitucion',
    dependencias: [
      {
        x: 5,
        y: 5,
        tipo: CAMBIO,
        [NORMAL]: NORMAL,
        [DESVIADO]: DESVIADO,
      },
      {
        x: 4,
        y: 5,
        tipo: CAMBIO,
        [DESVIADO]: NORMAL,
      },
    ],
  },
  {
    x: 4,
    y: 5,
    tipo: CAMBIO,
    idSector: 'constitucion',
    dependencias: [
      {
        x: 5,
        y: 4,
        tipo: CAMBIO,
        [NORMAL]: NORMAL,
        [DESVIADO]: DESVIADO,
      },
    ],
  },
  {
    x: 5,
    y: 4,
    tipo: CAMBIO,
    idSector: 'constitucion',
    dependencias: [
      {
        x: 4,
        y: 5,
        tipo: CAMBIO,
        [NORMAL]: NORMAL,
        [DESVIADO]: DESVIADO,
      },
    ],
  },
  {
    x: 5,
    y: 5,
    tipo: CAMBIO,
    idSector: 'constitucion',
    dependencias: [
      {
        x: 4,
        y: 4,
        tipo: CAMBIO,
        [NORMAL]: NORMAL,
        [DESVIADO]: DESVIADO,
      },
      {
        x: 4,
        y: 5,
        tipo: CAMBIO,
        [DESVIADO]: NORMAL,
      },
    ],
  },
  {
    x: 2,
    y: 4,
    dir: W,
    tipo: SENAL,
    idSector: 'constitucion',
    dependencias: [
      {
        x: 2,
        y: 4,
        tipo: CAMBIO,
        [IZQ]: {
          primaria: ROJO,
          der: ROJO,
        },
        [CENTRO]: {
          izq: ROJO,
          der: ROJO,
        },
        [DER]: {
          izq: ROJO,
          primaria: ROJO,
        },
      },
    ],
  },
  {
    x: 4,
    y: 4,
    dir: W,
    tipo: SENAL,
    idSector: 'constitucion',
    dependencias: [
      {
        x: 4,
        y: 4,
        tipo: CAMBIO,
        [NORMAL]: {
          der: ROJO,
        },
        [DESVIADO]: {
          primaria: ROJO,
          der: AMARILLO,
        },
      },
      {
        x: 5,
        y: 4,
        tipo: CAMBIO,
        [DESVIADO]: {
          primaria: ROJO,
          der: ROJO,
        },
      },
    ],
  },
  {
    x: 8,
    y: 3,
    dir: SE,
    tipo: SENAL,
    idSector: 'constitucion',
    dependencias: [
      {
        x: 8,
        y: 3,
        tipo: CAMBIO,
        [NORMAL]: {
          izq: ROJO,
        },
        [DESVIADO]: {
          izq: AMARILLO,
          primaria: ROJO,
        },
      },
    ],
  },
  {
    x: 0,
    y: 0,
    dir: W,
    tipo: SENAL,
    idSector: 'simpleDesvio',
    dependencias: [
      {
        x: 0,
        y: 0,
        tipo: CAMBIO,
        [NORMAL]: {
          izq: ROJO,
        },
        [DESVIADO]: {
          izq: AMARILLO,
          primaria: ROJO,
        },
      },
    ],
  },
  {
    x: 0,
    y: 0,
    tipo: CAMBIO,
    idSector: 'cruceDobleCambio',
    dependencias: [
      {
        x: 1,
        y: 1,
        tipo: CAMBIO,
        [NORMAL]: NORMAL,
        [DESVIADO]: DESVIADO,
      },
      {
        x: 0,
        y: 1,
        tipo: CAMBIO,
        [DESVIADO]: NORMAL,
      },
    ],
  },
  {
    x: 0,
    y: 1,
    tipo: CAMBIO,
    idSector: 'cruceDobleCambio',
    dependencias: [
      {
        x: 1,
        y: 0,
        tipo: CAMBIO,
        [NORMAL]: NORMAL,
        [DESVIADO]: DESVIADO,
      },
      {
        x: 0,
        y: 0,
        tipo: CAMBIO,
        [DESVIADO]: NORMAL,
      },
    ],
  },
  {
    x: 1,
    y: 0,
    tipo: CAMBIO,
    idSector: 'cruceDobleCambio',
    dependencias: [
      {
        x: 0,
        y: 1,
        tipo: CAMBIO,
        [NORMAL]: NORMAL,
        [DESVIADO]: DESVIADO,
      },
      {
        x: 1,
        y: 1,
        tipo: CAMBIO,
        [DESVIADO]: NORMAL,
      },
    ],
  },
  {
    x: 1,
    y: 1,
    tipo: CAMBIO,
    idSector: 'cruceDobleCambio',
    dependencias: [
      {
        x: 0,
        y: 0,
        tipo: CAMBIO,
        [NORMAL]: NORMAL,
        [DESVIADO]: DESVIADO,
      },
      {
        x: 0,
        y: 1,
        tipo: CAMBIO,
        [DESVIADO]: NORMAL,
      },
    ],
  },
  {
    x: 0,
    y: 0,
    dir: W,
    tipo: SENAL,
    idSector: 'cruceDobleCambio',
    dependencias: [
      {
        x: 0,
        y: 0,
        tipo: CAMBIO,
        [NORMAL]: {
          der: ROJO,
        },
        [DESVIADO]: {
          primaria: ROJO,
          der: AMARILLO,
        },
      },
      {
        x: 1,
        y: 0,
        tipo: CAMBIO,
        [DESVIADO]: {
          primaria: ROJO,
          der: ROJO,
        },
      },
    ],
  },
  {
    x: 1,
    y: 0,
    dir: E,
    tipo: SENAL,
    idSector: 'cruceDobleCambio',
    dependencias: [
      {
        x: 1,
        y: 0,
        tipo: CAMBIO,
        [NORMAL]: {
          izq: ROJO,
        },
        [DESVIADO]: {
          primaria: ROJO,
          izq: AMARILLO,
        },
      },
      {
        x: 0,
        y: 0,
        tipo: CAMBIO,
        [DESVIADO]: {
          primaria: ROJO,
          izq: ROJO,
        },
      },
    ],
  },
  {
    x: 0,
    y: 1,
    dir: W,
    tipo: SENAL,
    idSector: 'cruceDobleCambio',
    dependencias: [
      {
        x: 0,
        y: 1,
        tipo: CAMBIO,
        [NORMAL]: {
          izq: ROJO,
        },
        [DESVIADO]: {
          primaria: ROJO,
          izq: AMARILLO,
        },
      },
      {
        x: 1,
        y: 1,
        tipo: CAMBIO,
        [DESVIADO]: {
          primaria: ROJO,
          izq: ROJO,
        },
      },
    ],
  },
  {
    x: 1,
    y: 1,
    dir: E,
    tipo: SENAL,
    idSector: 'cruceDobleCambio',
    dependencias: [
      {
        x: 1,
        y: 1,
        tipo: CAMBIO,
        [NORMAL]: {
          der: ROJO,
        },
        [DESVIADO]: {
          primaria: ROJO,
          der: AMARILLO,
        },
      },
      {
        x: 0,
        y: 1,
        tipo: CAMBIO,
        [DESVIADO]: {
          primaria: ROJO,
          der: ROJO,
        },
      },
    ],
  },
  {
    x: 0,
    y: 0,
    dir: W,
    tipo: SENAL,
    idSector: 'senalesEncadenadas',
    dependencias: [
      {
        x: 3,
        y: 0,
        dir: W,
        tipo: SENAL,
        luces: [
          {
            luzSource: PRIMARIA,
            cuando: ROJO,
            luzTarget: PRIMARIA,
            estado: AMARILLO,
          },
        ],
      },
    ],
  },
];
