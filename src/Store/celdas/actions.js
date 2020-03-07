import { createAction } from '@reduxjs/toolkit';

import { setPendiente, setEnclavamientos, clearPendientes } from '../actions';
import { selCelda, selPendiente } from '../selectors';

export const plainSetCambio = createAction(
  'setCambio',
  (idCelda, posicion) => ({
    payload: {
      idCelda,
      posicion,
    },
  })
);

export function doSetCambio(idCelda, posicion) {
  return async (dispatch, getState) => {
    const celda = selCelda(getState(), idCelda);
    if (celda.tipo !== 'cambio' && celda.tipo !== 'triple') {
      throw new Error(`Celda ${idCelda}  no es un cambio`);
    }
    if (celda.posicion === posicion) {
      return;
    }
    if (selPendiente(getState(), idCelda)) {
      throw new Error(`Celda ${idCelda} error: loop por enclavamiento`);
    }
    await dispatch(setPendiente(idCelda));
    await dispatch(plainSetCambio(idCelda, posicion));
    await dispatch(setEnclavamientos(idCelda));
  };
}

export function setCambio(idCelda, posicion) {
  return async dispatch => {
    await dispatch(doSetCambio(idCelda, posicion));
    await dispatch(clearPendientes());
  };
}

export const setCambioManual = createAction(
  'setCambioManual',
  (idCelda, manual) => ({
    payload: {
      idCelda,
      manual,
    },
  })
);
