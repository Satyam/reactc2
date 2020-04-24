import { createAction } from '@reduxjs/toolkit';

import { clearPendientes, runAutomatizaciones } from 'Store/actions';
import { selSemaforo } from 'Store/selectors';
import { selModoSemaforo } from './selectors';
import { AUTOMATICO } from '../data';

export const plainSetAspectoSenal = createAction(
  'setAspectoSenal',
  (idSemaforo, senal, aspecto) => ({
    payload: {
      idSemaforo,
      senal,
      aspecto,
    },
  })
);

export function doSetAspectoSenal(idSemaforo, senal, aspecto) {
  return (dispatch, getState) => {
    const semaforo = selSemaforo(getState(), idSemaforo);
    if (!semaforo[senal]) {
      throw new Error(`Semaforo ${idSemaforo} no tiene senal ${senal}`);
    }
    if (semaforo[senal] === aspecto) return false;
    return dispatch(plainSetAspectoSenal(idSemaforo, senal, aspecto));
  };
}

export function setAspectoSenal(idSemaforo, senal, aspecto) {
  return (dispatch, getState) => {
    dispatch(doSetAspectoSenal(idSemaforo, senal, aspecto));
    if (selModoSemaforo(getState(), idSemaforo) === AUTOMATICO) {
      dispatch(runAutomatizaciones(idSemaforo));
    }
    return dispatch(clearPendientes());
  };
}

export const doSetModoSemaforo = createAction(
  'setModoSemaforo',
  (idSemaforo, modo) => ({
    payload: {
      idSemaforo,
      modo,
    },
  })
);

export function setModoSemaforo(idSemaforo, modo) {
  return (dispatch, getState) => {
    dispatch(doSetModoSemaforo(idSemaforo, modo));
    if (selModoSemaforo(getState(), idSemaforo) === AUTOMATICO) {
      dispatch(runAutomatizaciones(idSemaforo));
    }
  };
}
