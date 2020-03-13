import { createAction } from '@reduxjs/toolkit';

import {
  setPendiente,
  clearPendientes,
  setEnclavamientos,
} from 'Store/actions';
import { selPendiente, selSenal } from 'Store/selectors';
import { selSenalIsManual } from './selectors';

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
  return async (dispatch, getState) => {
    const senal = selSenal(getState(), idSenal);
    if (!senal[luz]) {
      throw new Error(`Señal ${idSenal} no tiene luz ${luz}`);
    }
    if (senal[luz].estado === estado) return;
    const idLuz = `${idSenal}:${luz}`;
    if (selPendiente(getState(), idLuz)) {
      throw new Error(`Senal ${idSenal} error: loop por enclavamiento`);
    }
    await dispatch(setPendiente(idLuz));
    await dispatch(plainSetLuzEstado(idSenal, luz, estado));
  };
}

export function setLuzEstado(idSenal, luz, estado) {
  return async (dispatch, getState) => {
    await dispatch(doSetLuzEstado(idSenal, luz, estado));
    if (!selSenalIsManual(getState(), idSenal, luz)) {
      await dispatch(setEnclavamientos(idSenal, 'senal'));
    }
    await dispatch(clearPendientes());
  };
}

export const setLuzManual = createAction(
  'setLuzManual',
  (idSenal, luz, manual) => ({
    payload: {
      idSenal,
      luz,
      manual,
    },
  })
);
