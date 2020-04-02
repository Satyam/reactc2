import { createAction } from '@reduxjs/toolkit';

import { clearPendientes, setEnclavamientos } from 'Store/actions';
import { selSenal } from 'Store/selectors';
import { selSenalIsManual } from './selectors';
import { SENAL } from 'Store/data';

export const plainSetLuzEstado = createAction(
  'setLuzEstado',
  (idSenal, luz, estado) => ({
    payload: {
      idSenal,
      luz,
      estado,
    },
  })
);

export function doSetLuzEstado(idSenal, luz, estado) {
  return (dispatch, getState) => {
    const senal = selSenal(getState(), idSenal);
    if (!senal[luz]) {
      throw new Error(`Señal ${idSenal} no tiene luz ${luz}`);
    }
    if (senal[luz] === estado) return false;
    return dispatch(plainSetLuzEstado(idSenal, luz, estado));
  };
}

export function setLuzEstado(idSenal, luz, estado) {
  return (dispatch, getState) => {
    dispatch(doSetLuzEstado(idSenal, luz, estado));
    if (!selSenalIsManual(getState(), idSenal)) {
      dispatch(setEnclavamientos(idSenal, SENAL));
    }
    return dispatch(clearPendientes());
  };
}

export const setSenalManual = createAction(
  'setSenalManual',
  (idSenal, manual) => ({
    payload: {
      idSenal,
      manual,
    },
  })
);
