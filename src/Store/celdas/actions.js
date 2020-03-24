import { createAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import {
  setPendiente,
  setEnclavamientos,
  clearPendientes,
} from 'Store/actions';
import { selCelda, selPendiente, selCeldaIsManual } from 'Store/selectors';
import { CAMBIO, TRIPLE } from 'Store/data';

export const plainSetCambio = createAction(
  'setCambio',
  (idCelda, posicion) => ({
    payload: {
      idCelda,
      posicion,
    },
  })
);

export function doSetCambio(idCelda, posicion) {
  return async (dispatch, getState) => {
    const celda = selCelda(getState(), idCelda);
    if (celda.tipo !== CAMBIO && celda.tipo !== TRIPLE) {
      throw new Error(`Celda ${idCelda}  no es un cambio`);
    }
    if (celda.posicion === posicion) {
      return false;
    }
    if (selPendiente(getState(), idCelda)) return false;
    await dispatch(setPendiente(idCelda));
    return await dispatch(plainSetCambio(idCelda, posicion));
  };
}

export function setCambio(idCelda, posicion) {
  return async (dispatch, getState) => {
    await dispatch(doSetCambio(idCelda, posicion));
    if (!selCeldaIsManual(getState(), idCelda)) {
      await dispatch(setEnclavamientos(idCelda, CAMBIO));
    }
    return await dispatch(clearPendientes());
  };
}

export const setCambioManual = createAction(
  'setCambioManual',
  (idCelda, manual) => ({
    payload: {
      idCelda,
      manual,
    },
  })
);

export const useSetCambio = () => {
  const dispatch = useDispatch();
  return (idCelda, posicion) => dispatch(setCambio(idCelda, posicion));
};
