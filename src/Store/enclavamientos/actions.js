import {
  selCelda,
  selSenal,
  selEnclavamientos,
  selEnclavamientosActive,
  selSenalIsManual,
  selCeldaIsManual,
} from 'Store/selectors';
import { VERDE, AMARILLO, ROJO, CAMBIO, SENAL } from 'Store/data';

import { doSetCambio, doSetLuzEstado } from 'Store/actions';

const solvePromises = (arr, fn) =>
  Promise.all(arr.map(fn)).then(results => results.find(result => !!result));

export function setEnclavamientos(idOrigen, tipoOrigen, force) {
  return async (dispatch, getState) => {
    const browseEnclavamientos = origen => {
      const enclavamientos = selEnclavamientos(getState(), origen.idSector);
      return solvePromises(enclavamientos, encl => {
        const { idTarget, tipo, dependencias } = encl;
        if (!force && idTarget === idOrigen) return false;
        const celdaTarget = selCelda(getState(), idTarget);
        switch (tipo) {
          case CAMBIO: {
            return solvePromises(dependencias, dep => {
              const celdaSource = selCelda(getState(), dep.idSource);
              const posicionEsperada =
                dep[celdaSource.posicion] || celdaTarget.posicionInicial;

              if (posicionEsperada === celdaTarget.posicion) return false;
              if (selCeldaIsManual(getState(), idTarget)) return false;
              return dispatch(doSetCambio(idTarget, posicionEsperada));
            });
          }
          case SENAL: {
            const senalTarget = selSenal(getState(), idTarget);
            const nuevoEstado = {
              izq: VERDE,
              primaria: VERDE,
              der: VERDE,
            };
            dependencias.forEach(dep => {
              switch (dep.tipo) {
                case CAMBIO:
                  const celdaSource = selCelda(getState(), dep.idSource);
                  const estadoBuscado = dep[celdaSource.posicion] || {};
                  Object.keys(estadoBuscado).forEach(luz => {
                    switch (estadoBuscado[luz]) {
                      case ROJO:
                        nuevoEstado[luz] = ROJO;
                        break;
                      case AMARILLO:
                        if (nuevoEstado[luz] === VERDE)
                          nuevoEstado[luz] = AMARILLO;
                        break;
                      default:
                        break;
                    }
                  });
                  break;
                case SENAL:
                  const senalSource = selSenal(getState(), dep.idSource);
                  dep.luces.forEach(
                    ({ luzSource, cuando, luzTarget, estado }) => {
                      if (senalSource[luzSource].estado === cuando) {
                        switch (estado) {
                          case ROJO:
                            nuevoEstado[luzTarget] = ROJO;
                            break;
                          case AMARILLO:
                            if (nuevoEstado[luzTarget] === VERDE)
                              nuevoEstado[luzTarget] = AMARILLO;
                            break;
                          default:
                            break;
                        }
                      }
                    }
                  );
                  break;
                default:
                  throw new Error(
                    `Dependencia ${dep.idSource} de ${idTarget} tiene tipo desconocido: ${dep.tipo}`
                  );
              }
            });
            return Promise.all(
              Object.keys(nuevoEstado).map(luz => {
                if (luz in senalTarget) {
                  if (senalTarget[luz].estado === nuevoEstado[luz])
                    return false;
                  if (selSenalIsManual(getState(), idTarget, luz)) return false;

                  return dispatch(
                    doSetLuzEstado(idTarget, luz, nuevoEstado[luz])
                  );
                }
                return false;
              })
            ).then(results => results.find(result => !!result));
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
    if (!countDown) throw new Error(`Enclavamiento en loop por ${idOrigen}`);
    return !!countDown;
  };
}
