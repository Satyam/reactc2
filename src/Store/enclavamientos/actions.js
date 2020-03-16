import {
  selCelda,
  selSenal,
  selEnclavamientos,
  selEnclavamientosActive,
} from 'Store/selectors';
import { VERDE, AMARILLO, ROJO, CAMBIO, SENAL } from 'Store/data';

import { doSetCambio, doSetLuzEstado } from 'Store/actions';

const solvePromises = (arr, fn) =>
  Promise.all(arr.map(fn)).then(results => results.find(result => !!result));

export function setEnclavamientos(idOrigen, tipoOrigen) {
  return async (dispatch, getState) => {
    const browseEnclavamientos = origen => {
      const enclavamientos = selEnclavamientos(getState(), origen.idSector);
      return solvePromises(enclavamientos, encl => {
        const { idTarget, tipo, dependencias } = encl;
        if (idTarget === idOrigen) return false;
        const celdaTarget = selCelda(getState(), idTarget);
        switch (tipo) {
          case CAMBIO: {
            return solvePromises(dependencias, source => {
              const celdaSource = selCelda(getState(), source.idSource);
              const posicionEsperada =
                source[celdaSource.posicion] || celdaTarget.posicionInicial;

              if (posicionEsperada === celdaTarget.posicion) return false;
              return dispatch(doSetCambio(idTarget, posicionEsperada));
            });
          }
          case SENAL: {
            const senalTarget = selSenal(getState(), idTarget);
            return solvePromises(dependencias, source => {
              const celdaSource = selCelda(getState(), source.idSource);
              const estados = source[celdaSource.posicion];
              console.log(1, { idTarget, idSource: source.idSource, estados });
              const nuevoEstado = Object.keys(estados || []).reduce(
                (nuevoEstado, luz) => {
                  console.log(2, { luz, estado: estados[luz], nuevoEstado });
                  debugger;
                  switch (estados[luz]) {
                    case ROJO:
                      return {
                        ...nuevoEstado,
                        [luz]: ROJO,
                      };
                    case AMARILLO:
                      return nuevoEstado[luz] === VERDE
                        ? {
                            ...nuevoEstado,
                            [luz]: AMARILLO,
                          }
                        : nuevoEstado;
                    default:
                      return nuevoEstado;
                  }
                },
                {
                  izq: VERDE,
                  primaria: VERDE,
                  der: VERDE,
                }
              );
              return Promise.all(
                Object.keys(nuevoEstado).map(luz => {
                  if (luz in senalTarget) {
                    if (senalTarget[luz].estado === nuevoEstado[luz])
                      return false;
                    console.log(3, {
                      idTarget,
                      luz,
                      estado: nuevoEstado[luz],
                    });
                    debugger;
                    return dispatch(
                      doSetLuzEstado(idTarget, luz, nuevoEstado[luz])
                    );
                  }
                  return false;
                })
              ).then(results => results.find(result => !!result));
            });
          }

          default:
            throw new Error(
              `Celda ${idTarget} tiene enclavamiento desconocido ${tipo}`
            );
        }
      });
    };

    if (!selEnclavamientosActive(getState())) return;
    const entity =
      tipoOrigen === CAMBIO
        ? selCelda(getState(), idOrigen)
        : selSenal(getState(), idOrigen);
    if (entity.manual) return;
    let countDown = 4;
    do {
      countDown--;
    } while (countDown && (await browseEnclavamientos(entity)));
    console.log(idOrigen, countDown);
    return !countDown;
  };
}
