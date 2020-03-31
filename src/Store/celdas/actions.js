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
  return (dispatch, getState) => {
    const celda = selCelda(getState(), idCelda);
    if (celda.tipo !== CAMBIO && celda.tipo !== TRIPLE) {
      throw new Error(`Celda ${idCelda}  no es un cambio`);
    }
    if (celda.posicion === posicion) {
      return false;
    }
    if (selPendiente(getState(), idCelda)) return false;
    dispatch(setPendiente(idCelda));
    return dispatch(plainSetCambio(idCelda, posicion));
  };
}

export function setCambio(idCelda, posicion) {
  return (dispatch, getState) => {
    dispatch(doSetCambio(idCelda, posicion));
    if (!selCeldaIsManual(getState(), idCelda)) {
      dispatch(setEnclavamientos(idCelda, CAMBIO));
    }
    return dispatch(clearPendientes());
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

export const removeTrenFromCelda = createAction(
  'removeTrenFromCelda',
  (idCelda, idTren) => ({
    payload: {
      idCelda,
      idTren,
    },
  })
);

export const addTrenToCelda = createAction(
  'addTrenToCelda',
  (idCelda, idTren) => ({
    payload: {
      idCelda,
      idTren,
    },
  })
);
