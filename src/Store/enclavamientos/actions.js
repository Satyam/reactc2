import map from 'lodash/map';
import { createAction } from '@reduxjs/toolkit';

import {
  selCelda,
  selSenal,
  selEnclavamiento,
  selSenalIsManual,
  selEnclavamientosActive,
} from 'Store/selectors';

import { doSetCambio, doSetLuzEstado } from 'Store/actions';

export const setPendiente = createAction('setPendiente');
export const clearPendientes = createAction('clearPendientes');
export const guardarPrevio = createAction('guardarPrevio');

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
            if (caso.guardar) {
              const senal = selSenal(getState(), idSenal);
              const _prev = Object.keys(senal).reduce((_p, luz) => {
                if (luz === 'dir') return _p;
                return {
                  ..._p,
                  [luz]: senal[luz].estado,
                };
              }, {});
              dispatch(
                guardarPrevio({
                  _prev,
                  idEnclavamiento,
                })
              );
            }
            if (caso.previo) {
              if (!enclavamiento._prev) {
                console.error(idEnclavamiento, enclavamiento);
              } else {
                await Promise.all(
                  map(enclavamiento._prev, async (estado, luz) => {
                    await dispatch(doSetLuzEstado(idSenal, luz, estado));
                  })
                );
                dispatch(guardarPrevio({ _prev: false, idEnclavamiento }));
              }
            } else {
              await Promise.all(
                map(
                  caso,
                  // prettier-ignore
                  async (estado, luz) => {
                  if (luz === 'guardar') return;
                  if (selSenalIsManual(getState(), idSenal, luz)) return;
                  await dispatch(doSetLuzEstado(idSenal, luz, estado));
                }
                )
              );
            }
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
