import { createAction } from '@reduxjs/toolkit';

import { clearPendientes } from 'Store/actions';

export const doSetLuzEstado = createAction(
  'setLuzEstado',
  (idSenal, luz, estado) => ({
    payload: {
      idSenal,
      luz,
      estado,
    },
  })
);

export function setLuzEstado(idSenal, luz, estado) {
  return async dispatch => {
    await dispatch(doSetLuzEstado(idSenal, luz, estado));
    await dispatch(clearPendientes());
  };
}

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
