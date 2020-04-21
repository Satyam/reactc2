import { createAction } from '@reduxjs/toolkit';

import {
  setPendiente,
  setAutomatizaciones,
  clearPendientes,
  setBloqueOcupado,
} from 'Store/actions';
import { selCelda, selPendiente, selCeldaIsManual } from 'Store/selectors';
import { CAMBIO } from 'Store/data';

export const plainSetCambio = createAction(
  'setPosicion',
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
    if (celda.tipo !== CAMBIO) {
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

export function setPosicion(idCelda, posicion) {
  return (dispatch, getState) => {
    dispatch(doSetCambio(idCelda, posicion));
    if (!selCeldaIsManual(getState(), idCelda)) {
      dispatch(setAutomatizaciones(idCelda, CAMBIO));
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

export const doRemoveTrenFromCelda = createAction(
  'removeTrenFromCelda',
  (idCelda, idTren) => ({
    payload: {
      idCelda,
      idTren,
    },
  })
);
export function removeTrenFromCelda(idCelda, idTren) {
  return (dispatch, getState) => {
    dispatch(doRemoveTrenFromCelda(idCelda, idTren));
    const celda = selCelda(getState(), idCelda);
    if (celda.idBloque) {
      dispatch(setBloqueOcupado(celda.idBloque, false));
    }
  };
}

export const doAddTrenToCelda = createAction(
  'addTrenToCelda',
  (idCelda, idTren) => ({
    payload: {
      idCelda,
      idTren,
    },
  })
);

export function addTrenToCelda(idCelda, idTren) {
  return (dispatch, getState) => {
    dispatch(doAddTrenToCelda(idCelda, idTren));
    const celda = selCelda(getState(), idCelda);
    if (celda.idBloque) {
      dispatch(setBloqueOcupado(celda.idBloque, idTren));
    }
  };
}

export const setRebota = createAction('setRebota', (idCelda, rebota) => ({
  payload: {
    idCelda,
    rebota,
  },
}));
