import { buildId } from 'Utils';

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
      const idSector = origen.idSector;
      const enclavamientos = selEnclavamientos(getState(), idSector);
      return solvePromises(enclavamientos, encl => {
        const { x, y, dir, tipo, dependencias } = encl;
        const idTarget = buildId({ idSector, x, y, dir });
        if (!force && idTarget === idOrigen) return false;
        switch (tipo) {
          case CAMBIO: {
            const celdaTarget = selCelda(getState(), idTarget);
            return solvePromises(dependencias, dep => {
              const idSource = buildId({ idSector, x: dep.x, y: dep.y });
              const celdaSource = selCelda(getState(), idSource);
              const posicionEsperada = dep[celdaSource.posicion];

              if (posicionEsperada === celdaTarget.posicion) return false;
              if (selCeldaIsManual(getState(), idTarget)) return false;
              return dispatch(doSetCambio(idTarget, posicionEsperada));
            });
          }
          case SENAL: {
            const senalTarget = selSenal(getState(), idTarget);
            if (selSenalIsManual(getState(), idTarget)) return false;
            const nuevoEstado = {
              izq: VERDE,
              centro: VERDE,
              der: VERDE,
            };
            dependencias.forEach(dep => {
              const idSource = buildId({
                idSector,
                x: dep.x,
                y: dep.y,
                dir: dep.dir,
              });
              switch (dep.tipo) {
                case CAMBIO:
                  const celdaSource = selCelda(getState(), idSource);
                  const estadoBuscado = dep[celdaSource.posicion] || {};
                  Object.keys(estadoBuscado).forEach(luz => {
                    nuevoEstado[luz] = Math.max(
                      nuevoEstado[luz],
                      estadoBuscado[luz]
                    );
                  });
                  break;
                case SENAL:
                  const senalSource = selSenal(getState(), idSource);
                  dep.luces.forEach(
                    ({ luzOrigen, cuando, luzAfectada, estado }) => {
                      if (senalSource[luzOrigen] === cuando) {
                        switch (estado) {
                          case ROJO:
                            nuevoEstado[luzAfectada] = ROJO;
                            break;
                          case AMARILLO:
                            if (nuevoEstado[luzAfectada] === VERDE)
                              nuevoEstado[luzAfectada] = AMARILLO;
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
                  if (senalTarget[luz] === nuevoEstado[luz]) return false;

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
