import { createAction } from '@reduxjs/toolkit';

import {
  setPendiente,
  runAutomatizaciones,
  clearPendientes,
  setBloqueOcupado,
} from 'Store/actions';
import { selCelda, selPendiente, selCeldaIsManual } from 'Store/selectors';
import { CAMBIO } from 'Store/data';

const UPDATE_CELDA = 'updateCelda';
export const updateCelda = createAction(UPDATE_CELDA);

const doSetPosicion = createAction(UPDATE_CELDA, (idCelda, posicion) => ({
  payload: {
    idCelda,
    posicion,
  },
}));

export function rawSetPosicion(idCelda, posicion) {
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
    return dispatch(doSetPosicion(idCelda, posicion));
  };
}

export function setPosicion(idCelda, posicion) {
  return (dispatch, getState) => {
    dispatch(rawSetPosicion(idCelda, posicion));
    if (!selCeldaIsManual(getState(), idCelda)) {
      dispatch(runAutomatizaciones(idCelda));
    }
    return dispatch(clearPendientes());
  };
}

export const doSetCambioManual = createAction(
  UPDATE_CELDA,
  (idCelda, manual) => ({
    payload: {
      idCelda,
      manual,
    },
  })
);

export function setCambioManual(idCelda, manual) {
  return (dispatch, getState) => {
    dispatch(doSetCambioManual(idCelda, manual));
    if (!selCeldaIsManual(getState(), idCelda)) {
      dispatch(runAutomatizaciones());
    }
  };
}

export const doRemoveTrenFromCelda = createAction(UPDATE_CELDA, (idCelda) => ({
  payload: {
    idCelda,
    idTren: null,
  },
}));

export function removeTrenFromCelda(idCelda) {
  return (dispatch, getState) => {
    dispatch(doRemoveTrenFromCelda(idCelda));
    const celda = selCelda(getState(), idCelda);
    if (celda.idBloque) {
      dispatch(setBloqueOcupado(celda.idBloque, false));
    }
  };
}

export const doAddTrenToCelda = createAction(
  UPDATE_CELDA,
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

export const setRebota = createAction(UPDATE_CELDA, (idCelda, rebota) => ({
  payload: {
    idCelda,
    rebota,
  },
}));
