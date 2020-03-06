import { createAction } from '@reduxjs/toolkit';

export const setCambio = createAction('setCambio', (idCelda, posicion) => ({
  payload: {
    idCelda,
    posicion,
  },
}));
export const setCambioManual = createAction(
  'setCambioManual',
  (idCelda, manual) => ({
    payload: {
      idCelda,
      manual,
    },
  })
);
export const closeEstado = createAction('closeEstado');
export const setLuzEstado = createAction(
  'setLuzEstado',
  (idSenal, luz, estado) => ({
    payload: {
      idSenal,
      luz,
      estado,
    },
  })
);
export const setLuzManual = createAction(
  'setLuzManual',
  (idSenal, luz, manual) => ({
    payload: {
      idSenal,
      luz,
      manual,
    },
  })
);
