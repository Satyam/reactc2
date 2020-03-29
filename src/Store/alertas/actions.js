import { createAction } from '@reduxjs/toolkit';
import { play } from 'Store/actions';

export const doSetAlarma = createAction(
  'doSetAlarma',
  (idCelda, idTren, msg) => ({
    payload: {
      idCelda,
      idTren,
      msg,
      time: Date.now(),
    },
  })
);
export function setAlarma(...props) {
  return async (dispatch, getState) => {
    dispatch(doSetAlarma(...props));
    dispatch(play(false));
  };
}
