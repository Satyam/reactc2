import { createAction } from '@reduxjs/toolkit';

export const setBloqueOcupado = createAction(
  'setBloqueOcupado',
  (idBloque, ocupado) => ({
    payload: {
      idBloque,
      ocupado,
    },
  })
);
