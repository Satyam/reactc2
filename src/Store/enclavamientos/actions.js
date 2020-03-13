import { createAction } from '@reduxjs/toolkit';

import {
  selCelda,
  selSenal,
  selEnclavamientos,
  selEnclavamientosActive,
} from 'Store/selectors';

import { doSetCambio, doSetLuzEstado } from 'Store/actions';

export const setPendiente = createAction('setPendiente');
export const clearPendientes = createAction('clearPendientes');

export function setEnclavamientos(idOrigen, tipoOrigen) {
  return (dispatch, getState) => {
    const browseEnclavamientos = origen => {
      const enclavamientos = selEnclavamientos(getState());
      return Promise.all(
        Object.keys(enclavamientos).map(idTarget => {
          const { tipo, ...dependencias } = enclavamientos[idTarget];
          switch (tipo) {
            case 'cambio':
              const celdaTarget = selCelda(getState(), idTarget);
              return Object.keys(dependencias).find(idCeldaSource => {
                const celdaSource = selCelda(getState(), idCeldaSource);
                const posicionEsperada =
                  dependencias[idCeldaSource][celdaSource.posicion];
                if (posicionEsperada === celdaTarget.posicion) return false;
                console.log(idTarget, celdaTarget.posicion, posicionEsperada);
                return dispatch(doSetCambio(idCeldaSource, posicionEsperada));
              });
            case 'senal': {
              const senalTarget = selSenal(getState(), idTarget);
              return Promise.all(
                Object.keys(dependencias).map(idCeldaSource => {
                  const celdaSource = selCelda(getState(), idCeldaSource);
                  const estados =
                    dependencias[idCeldaSource][celdaSource.posicion];
                  const nuevoEstado = Object.keys(estados).reduce(
                    (nuevoEstado, luz) => {
                      switch (estados[luz]) {
                        case 'rojo':
                          return {
                            ...nuevoEstado,
                            [luz]: 'rojo',
                          };
                        case 'amarillo':
                          return nuevoEstado[luz] === 'verde'
                            ? {
                                ...nuevoEstado,
                                [luz]: 'amarillo',
                              }
                            : nuevoEstado;
                        default:
                          return nuevoEstado;
                      }
                    },
                    {
                      izq: 'verde',
                      primaria: 'verde',
                      der: 'verde',
                    }
                  );
                  return Promise.all(
                    Object.keys(nuevoEstado).map(luz => {
                      if (luz in senalTarget) {
                        if (senalTarget[luz].estado === nuevoEstado[luz])
                          return false;
                        return dispatch(
                          doSetLuzEstado(idTarget, luz, nuevoEstado[luz])
                        );
                      }
                      return false;
                    })
                  );
                })
              );
            }
            default:
              throw new Error(
                `Celda ${idTarget} tiene enclavamiento desconocido ${tipo}`
              );
          }
        })
      );
    };

    if (!selEnclavamientosActive(getState())) return;
    switch (tipoOrigen) {
      case 'cambio':
        const idCelda = idOrigen;
        const celda = selCelda(getState(), idCelda);
        if (celda.manual) return;
        return browseEnclavamientos(celda);

      case 'senal':
        const idSenal = idOrigen;
        const senal = selSenal(getState(), idSenal);
        if (senal.manual) return;
        return browseEnclavamientos(senal);
      default:
        console.error(
          `Llamado setEnclavamientos con id: ${idOrigen}, tipo: ${tipoOrigen}`
        );
        return;
    }
  };
}
