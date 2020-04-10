import { createAction } from '@reduxjs/toolkit';
import { setPlayRate } from 'Store/actions';
import { DANGER } from 'Store/data';

export const doSetAlarma = createAction('doSetAlarma');

export function setAlarma(idCelda, idTren, msg) {
  return (dispatch) => {
    dispatch(setAviso(DANGER, idCelda, idTren, msg));
    dispatch(doSetAlarma({ idCelda, idTren, msg, fecha: Date.now() }));
    dispatch(setPlayRate(0));
  };
}

export const clearAlarma = createAction('clearAlarma');

export const setAviso = createAction(
  'setAviso',
  (nivel, idCelda, idTren, msg) => ({
    payload: {
      nivel,
      idCelda,
      idTren,
      msg,
      fecha: Date.now(),
    },
  })
);

export const clearAvisos = createAction('clearAvisos');

export const clearAviso = createAction('clearAviso');
