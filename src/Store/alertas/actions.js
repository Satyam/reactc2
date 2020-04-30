import { createAction } from '@reduxjs/toolkit';
import { playRate } from 'Store/options';
import { DANGER } from 'Store/data';

export const doSetAlarma = createAction('doSetAlarma');

export function setAlarma(idCelda, numero, msg) {
  return (dispatch) => {
    dispatch(setAviso(DANGER, idCelda, numero, msg));
    dispatch(doSetAlarma({ idCelda, numero, msg, fecha: Date.now() }));
    dispatch(playRate.action(0));
  };
}

export const clearAlarma = createAction('clearAlarma');

export const setAviso = createAction(
  'setAviso',
  (nivel, idCelda, numero, msg) => ({
    payload: {
      nivel,
      idCelda,
      numero,
      msg,
      fecha: Date.now(),
    },
  })
);

export const clearAvisos = createAction('clearAvisos');

export const clearAviso = createAction('clearAviso');
