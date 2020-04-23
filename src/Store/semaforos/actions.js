import { createAction } from '@reduxjs/toolkit';

import { clearPendientes, runAutomatizaciones } from 'Store/actions';
import { selSemaforo } from 'Store/selectors';
import { selSemaforoIsManual } from './selectors';

export const plainSetSenalEstado = createAction(
  'setSenalEstado',
  (idSemaforo, senal, estado) => ({
    payload: {
      idSemaforo,
      senal,
      estado,
    },
  })
);

export function doSetSenalEstado(idSemaforo, senal, estado) {
  return (dispatch, getState) => {
    const semaforo = selSemaforo(getState(), idSemaforo);
    if (!semaforo[senal]) {
      throw new Error(`Semaforo ${idSemaforo} no tiene senal ${senal}`);
    }
    if (semaforo[senal] === estado) return false;
    return dispatch(plainSetSenalEstado(idSemaforo, senal, estado));
  };
}

export function setSenalEstado(idSemaforo, senal, estado) {
  return (dispatch, getState) => {
    dispatch(doSetSenalEstado(idSemaforo, senal, estado));
    if (!selSemaforoIsManual(getState(), idSemaforo)) {
      dispatch(runAutomatizaciones(idSemaforo));
    }
    return dispatch(clearPendientes());
  };
}

export const setSemaforoManual = createAction(
  'setSemaforoManual',
  (idSemaforo, manual) => ({
    payload: {
      idSemaforo,
      manual,
    },
  })
);
