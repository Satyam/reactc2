import { createAction } from '@reduxjs/toolkit';

export const setBloqueOcupado = createAction(
  'setBloqueOcupado',
  (idBloque, idTren) => ({
    payload: {
      idBloque,
      idTren,
    },
  })
);
