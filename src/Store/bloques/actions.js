import { createAction } from '@reduxjs/toolkit';

export const setBloqueOcupado = createAction(
  'setBloqueOcupado',
  (idBloque, idTren, vecino) => ({
    payload: {
      idBloque,
      idTren,
      vecino,
    },
  })
);
