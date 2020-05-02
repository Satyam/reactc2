import { createAction } from '@reduxjs/toolkit';

import { clearPendientes, runAutomatizaciones } from 'Store/actions';
import { selModoSemaforo, selSemaforo } from './selectors';
import { AUTOMATICO, BLOQUEADO, ALTO, IZQ, CENTRO, DER } from 'Store/data';

const UPDATE_SEMAFORO = 'updateSemaforo';
export const updateSemaforo = createAction(UPDATE_SEMAFORO);

export function doSetAspectoSenal(idSemaforo, senal, aspecto) {
  return (dispatch, getState) => {
    const semaforo = selSemaforo(getState(), idSemaforo);
    if (!semaforo[senal]) {
      throw new Error(`Semaforo ${idSemaforo} no tiene senal ${senal}`);
    }
    if (semaforo[senal] === aspecto) return false;
    return dispatch(
      updateSemaforo({
        ...semaforo,
        [senal]: aspecto,
      })
    );
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

export function setModoSemaforo(idSemaforo, modo) {
  return (dispatch, getState) => {
    const semaforo = selSemaforo(getState(), idSemaforo);
    if (modo === BLOQUEADO) {
      dispatch(
        updateSemaforo(
          [IZQ, CENTRO, DER].reduce(
            (s, dir) => (dir in semaforo ? { ...s, [dir]: ALTO } : s),
            { idSemaforo, modo }
          )
        )
      );
    } else {
      dispatch(updateSemaforo({ idSemaforo, modo }));
    }
    if (selModoSemaforo(getState(), idSemaforo) === AUTOMATICO) {
      dispatch(runAutomatizaciones());
    }
  };
}
