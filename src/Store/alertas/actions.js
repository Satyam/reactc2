import { createAction } from '@reduxjs/toolkit';
import { setPlayRate } from 'Store/actions';

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
  return (dispatch, getState) => {
    dispatch(doSetAlarma(...props));
    dispatch(setPlayRate(0));
  };
}
