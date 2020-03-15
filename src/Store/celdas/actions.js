import { createAction } from '@reduxjs/toolkit';

import {
  setPendiente,
  setEnclavamientos,
  clearPendientes,
} from 'Store/actions';
import { selCelda, selPendiente, selCeldaIsManual } from 'Store/selectors';
import { CAMBIO, TRIPLE } from 'Store/data';
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
    if (celda.tipo !== CAMBIO && celda.tipo !== TRIPLE) {
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
  };
}

export function setCambio(idCelda, posicion) {
  return async (dispatch, getState) => {
    await dispatch(doSetCambio(idCelda, posicion));
    if (!selCeldaIsManual(getState(), idCelda)) {
      await dispatch(setEnclavamientos(idCelda, CAMBIO));
    }
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
