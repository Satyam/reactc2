import { buildId } from 'Utils';

import {
  selCelda,
  selSenal,
  selEnclavamientos,
  selEnclavamientosActive,
  selSenalIsManual,
  selCeldaIsManual,
} from 'Store/selectors';

import { VERDE, CAMBIO, SENAL, NORMAL, CENTRO } from 'Store/data';

import { doSetCambio, doSetLuzEstado } from 'Store/actions';

export function setEnclavamientos(idOrigen, tipoOrigen, force) {
  return (dispatch, getState) => {
    const browseEnclavamientos = origen => {
      const idSector = origen.idSector;
      const enclavamientos = selEnclavamientos(getState(), idSector);
      return enclavamientos.reduce((r, encl) => {
        const { x, y, dir, tipo, dependencias } = encl;
        const idTarget = buildId({ idSector, x, y, dir });
        if (!force && idTarget === idOrigen) return r;
        switch (tipo) {
          case CAMBIO: {
            const celdaTarget = selCelda(getState(), idTarget);
            return dependencias.reduce((r1, dep) => {
              const idSource = buildId({ idSector, x: dep.x, y: dep.y });
              const celdaSource = selCelda(getState(), idSource);
              const posicionEsperada =
                dep[celdaSource.posicion] ||
                (celdaTarget.tipo === CAMBIO ? NORMAL : CENTRO);
              if (posicionEsperada === celdaTarget.posicion) return r1;
              if (selCeldaIsManual(getState(), idTarget)) return r1;
              return r1 || !!dispatch(doSetCambio(idTarget, posicionEsperada));
            }, r);
          }
          case SENAL: {
            const senalTarget = selSenal(getState(), idTarget);
            if (selSenalIsManual(getState(), idTarget)) return r;
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
                        nuevoEstado[luzAfectada] = Math.max(
                          nuevoEstado[luzAfectada],
                          estado
                        );
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
            return Object.keys(nuevoEstado).reduce((r2, luz) => {
              if (!(luz in senalTarget)) return r2;
              if (senalTarget[luz] === nuevoEstado[luz]) return r2;

              return (
                r2 ||
                !!dispatch(doSetLuzEstado(idTarget, luz, nuevoEstado[luz]))
              );
            }, r);
          }

          default:
            throw new Error(
              `Celda ${idTarget} tiene enclavamiento desconocido ${tipo}`
            );
        }
      }, false);
    };

    if (!selEnclavamientosActive(getState())) return;
    const entity =
      tipoOrigen === CAMBIO
        ? selCelda(getState(), idOrigen)
        : selSenal(getState(), idOrigen);
    if (entity.manual) return;
    let countDown = 9;
    while (countDown && browseEnclavamientos(entity)) countDown--;
    console.log({ countDown });
    if (!countDown) throw new Error(`Enclavamiento en loop por ${idOrigen}`);
    return !!countDown;
  };
}
