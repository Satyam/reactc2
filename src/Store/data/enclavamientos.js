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
} from './constantes';
/* eslint-ENable no-unused-vars*/

export const enclavamientos = [
  {
    idTarget: 'constitucion:4,4',
    tipo: CAMBIO,
    idSector: 'constitucion',
    dependencias: [
      {
        idSource: 'constitucion:5,5',
        tipo: CAMBIO,
        [NORMAL]: NORMAL,
        [DESVIADO]: DESVIADO,
      },
      {
        idSource: 'constitucion:4,5',
        tipo: CAMBIO,
        [DESVIADO]: NORMAL,
      },
    ],
  },
  {
    idTarget: 'constitucion:4,5',
    tipo: CAMBIO,
    idSector: 'constitucion',
    dependencias: [
      {
        idSource: 'constitucion:5,4',
        tipo: CAMBIO,
        [NORMAL]: NORMAL,
        [DESVIADO]: DESVIADO,
      },
    ],
  },
  {
    idTarget: 'constitucion:5,4',
    tipo: CAMBIO,
    idSector: 'constitucion',
    dependencias: [
      {
        idSource: 'constitucion:4,5',
        tipo: CAMBIO,
        [NORMAL]: NORMAL,
        [DESVIADO]: DESVIADO,
      },
    ],
  },
  {
    idTarget: 'constitucion:5,5',
    tipo: CAMBIO,
    idSector: 'constitucion',
    dependencias: [
      {
        idSource: 'constitucion:4,4',
        tipo: CAMBIO,
        [NORMAL]: NORMAL,
        [DESVIADO]: DESVIADO,
      },
      {
        idSource: 'constitucion:4,5',
        tipo: CAMBIO,
        [DESVIADO]: NORMAL,
      },
    ],
  },
  {
    idTarget: 'constitucion:2,4:W',
    tipo: SENAL,
    idSector: 'constitucion',
    dependencias: [
      {
        idSource: 'constitucion:2,4',
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
    idTarget: 'constitucion:4,4:W',
    tipo: SENAL,
    idSector: 'constitucion',
    dependencias: [
      {
        idSource: 'constitucion:4,4',
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
        idSource: 'constitucion:5,4',
        tipo: CAMBIO,
        [DESVIADO]: {
          primaria: ROJO,
          der: ROJO,
        },
      },
    ],
  },
  {
    idTarget: 'constitucion:8,3:SE',
    tipo: SENAL,
    idSector: 'constitucion',
    dependencias: [
      {
        idSource: 'constitucion:8,3',
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
    idTarget: 'simpleDesvio:0,0:W',
    tipo: SENAL,
    idSector: 'simpleDesvio',
    dependencias: [
      {
        idSource: 'simpleDesvio:0,0',
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
    idTarget: 'cruceDobleCambio:0,0',
    tipo: CAMBIO,
    idSector: 'cruceDobleCambio',
    dependencias: [
      {
        idSource: 'cruceDobleCambio:1,1',
        tipo: CAMBIO,
        [NORMAL]: NORMAL,
        [DESVIADO]: DESVIADO,
      },
      {
        idSource: 'cruceDobleCambio:0,1',
        tipo: CAMBIO,
        [DESVIADO]: NORMAL,
      },
    ],
  },
  {
    idTarget: 'cruceDobleCambio:0,1',
    tipo: CAMBIO,
    idSector: 'cruceDobleCambio',
    dependencias: [
      {
        idSource: 'cruceDobleCambio:1,0',
        tipo: CAMBIO,
        [NORMAL]: NORMAL,
        [DESVIADO]: DESVIADO,
      },
      {
        idSource: 'cruceDobleCambio:0,0',
        tipo: CAMBIO,
        [DESVIADO]: NORMAL,
      },
    ],
  },
  {
    idTarget: 'cruceDobleCambio:1,0',
    tipo: CAMBIO,
    idSector: 'cruceDobleCambio',
    dependencias: [
      {
        idSource: 'cruceDobleCambio:0,1',
        tipo: CAMBIO,
        [NORMAL]: NORMAL,
        [DESVIADO]: DESVIADO,
      },
      {
        idSource: 'cruceDobleCambio:1,1',
        tipo: CAMBIO,
        [DESVIADO]: NORMAL,
      },
    ],
  },
  {
    idTarget: 'cruceDobleCambio:1,1',
    tipo: CAMBIO,
    idSector: 'cruceDobleCambio',
    dependencias: [
      {
        idSource: 'cruceDobleCambio:0,0',
        tipo: CAMBIO,
        [NORMAL]: NORMAL,
        [DESVIADO]: DESVIADO,
      },
      {
        idSource: 'cruceDobleCambio:0,1',
        tipo: CAMBIO,
        [DESVIADO]: NORMAL,
      },
    ],
  },
  {
    idTarget: 'cruceDobleCambio:0,0:W',
    tipo: SENAL,
    idSector: 'cruceDobleCambio',
    dependencias: [
      {
        idSource: 'cruceDobleCambio:0,0',
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
        idSource: 'cruceDobleCambio:1,0',
        tipo: CAMBIO,
        [DESVIADO]: {
          primaria: ROJO,
          der: ROJO,
        },
      },
    ],
  },
  {
    idTarget: 'cruceDobleCambio:1,0:E',
    tipo: SENAL,
    idSector: 'cruceDobleCambio',
    dependencias: [
      {
        idSource: 'cruceDobleCambio:1,0',
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
        idSource: 'cruceDobleCambio:0,0',
        tipo: CAMBIO,
        [DESVIADO]: {
          primaria: ROJO,
          izq: ROJO,
        },
      },
    ],
  },
  {
    idTarget: 'cruceDobleCambio:0,1:W',
    tipo: SENAL,
    idSector: 'cruceDobleCambio',
    dependencias: [
      {
        idSource: 'cruceDobleCambio:0,1',
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
        idSource: 'cruceDobleCambio:1,1',
        tipo: CAMBIO,
        [DESVIADO]: {
          primaria: ROJO,
          izq: ROJO,
        },
      },
    ],
  },
  {
    idTarget: 'cruceDobleCambio:1,1:E',
    tipo: SENAL,
    idSector: 'cruceDobleCambio',
    dependencias: [
      {
        idSource: 'cruceDobleCambio:1,1',
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
        idSource: 'cruceDobleCambio:0,1',
        tipo: CAMBIO,
        [DESVIADO]: {
          primaria: ROJO,
          der: ROJO,
        },
      },
    ],
  },
  {
    idTarget: 'senalesEncadenadas:0,0:W',
    tipo: SENAL,
    idSector: 'senalesEncadenadas',
    dependencias: [
      {
        idSource: 'senalesEncadenadas:3,0:W',
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
