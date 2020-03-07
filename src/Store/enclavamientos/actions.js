import map from 'lodash/map';
import { createAction } from '@reduxjs/toolkit';

import {
  selCelda,
  selEnclavamiento,
  selSenalIsManual,
  selEnclavamientosActive,
} from 'Store/selectors';

import { doSetCambio, doSetLuzEstado } from 'Store/actions';

export const setPendiente = createAction('setPendiente');
export const clearPendientes = createAction('clearPendientes');

export function setEnclavamientos(idCelda) {
  return async (dispatch, getState) => {
    if (!selEnclavamientosActive(getState())) return;
    const celda = selCelda(getState(), idCelda);
    if (celda.manual || !celda.enclavamientos) return;
    await Promise.all(
      celda.enclavamientos.map(async idEnclavamiento => {
        const enclavamiento = selEnclavamiento(getState(), idEnclavamiento);
        switch (enclavamiento.tipo) {
          case 'apareados':
            await dispatch(
              doSetCambio(enclavamiento.celda, enclavamiento[celda.posicion])
            );
            return;
          case 'senalCambio': {
            const caso = enclavamiento[celda.posicion];
            const idSenal = enclavamiento.senal;
            await Promise.all(
              map(
                caso,
                // prettier-ignore
                async (estado, luz) => {
                  if (selSenalIsManual(getState(), idSenal, luz)) return;
                  await dispatch(doSetLuzEstado(idSenal, luz, estado));
                }
              )
            );
            return;
          }
          default:
            throw new Error(
              `Celda ${idCelda} tiene enclavamiento desconocido ${enclavamiento.tipo}`
            );
        }
      })
    );
  };
}
