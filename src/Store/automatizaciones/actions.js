import { buildId, buildIdBloque } from 'Utils';

import {
  selCelda,
  selSemaforo,
  selAutomatizaciones,
  selAutomatizacionesActive,
  selSemaforoIsManual,
  selCeldaIsManual,
  selBloqueOcupado,
  selBloque,
} from 'Store/selectors';

import {
  LIBRE,
  ALTO,
  CAMBIO,
  SEMAFORO,
  BLOQUE,
  FIJO,
  IZQ,
  CENTRO,
  DER,
} from 'Store/data';

import { doSetCambio, doSetSenalEstado, setBloqueOcupado } from 'Store/actions';

export function setAutomatizaciones(idOrigen, tipoOrigen, force) {
  return async (dispatch, getState) => {
    if (!selAutomatizacionesActive(getState())) return;
    let idSector;
    switch (tipoOrigen) {
      case CAMBIO:
        {
          const entity = selCelda(getState(), idOrigen);
          if (entity.manual) return;
          idSector = entity.idSector;
        }
        break;
      case SEMAFORO:
        {
          const entity = selSemaforo(getState(), idOrigen);
          if (entity.manual) return;
          idSector = entity.idSector;
        }
        break;
      case BLOQUE:
        {
          const entity = selCelda(getState(), idOrigen);
          idSector = entity.idSector;
        }
        break;
      default:
        break;
    }

    function automatizacionesCambio(idTarget, deps) {
      const celdaTarget = selCelda(getState(), idTarget);
      return deps.reduce((p1, dep) => {
        const idSource = buildId({ idSector, x: dep.x, y: dep.y });
        const celdaSource = selCelda(getState(), idSource);
        const alt = dep.alts.find((alt) => alt.cuando === celdaSource.posicion);
        if (!alt) return p1;
        const posicionEsperada = alt.estado;
        if (posicionEsperada === celdaTarget.posicion) return p1;
        if (selCeldaIsManual(getState(), idTarget)) return p1;
        return p1.then(
          (r1) => !!dispatch(doSetCambio(idTarget, posicionEsperada)) || r1
        );
      }, Promise.resolve(false));
    }

    function automatizacionesSemaforo(idTarget, deps) {
      const semaforoTarget = selSemaforo(getState(), idTarget);
      if (selSemaforoIsManual(getState(), idTarget)) return false;
      const nuevoEstado = {
        izq: LIBRE,
        centro: LIBRE,
        der: LIBRE,
      };
      deps.forEach((dep) => {
        const idSource = buildId({
          idSector,
          x: dep.x,
          y: dep.y,
          dir: dep.dir,
        });
        switch (dep.tipo) {
          case CAMBIO:
            const celdaSource = selCelda(getState(), idSource);
            const alt = dep.alts.find(
              (alt) => alt.cuando === celdaSource.posicion
            );
            if (alt) {
              Object.keys(nuevoEstado).forEach((senal) => {
                if (alt[senal])
                  nuevoEstado[senal] = Math.max(nuevoEstado[senal], alt[senal]);
              });
            }
            break;
          case SEMAFORO:
            const semaforoSource = selSemaforo(getState(), idSource);
            const estadoSource = [IZQ, CENTRO, DER].reduce((permiso, senal) => {
              return senal in semaforoSource
                ? Math.min(permiso, semaforoSource[senal])
                : permiso;
            }, ALTO);
            dep.senales.forEach(({ cuando, senalAfectada, estado }) => {
              if (estadoSource === cuando) {
                nuevoEstado[senalAfectada] = Math.max(
                  nuevoEstado[senalAfectada],
                  estado
                );
              }
            });
            break;
          case BLOQUE:
            const ocupado = !!selBloqueOcupado(
              getState(),
              buildIdBloque(idSector, dep.bloque)
            );
            if (ocupado) {
              nuevoEstado[dep.senalAfectada] = ALTO;
            }
            break;
          case FIJO:
            nuevoEstado[dep.senalAfectada] = Math.max(
              dep.estado,
              nuevoEstado[dep.senalAfectada]
            );
            break;
          default:
            throw new Error(
              `Dependencia ${dep.idSource} de ${idTarget} tiene tipo desconocido: ${dep.tipo}`
            );
        }
      });
      return Object.keys(nuevoEstado).reduce((p2, senal) => {
        if (!(senal in semaforoTarget)) return p2;
        if (semaforoTarget[senal] === nuevoEstado[senal]) return p2;

        return p2.then(
          (r2) =>
            !!dispatch(doSetSenalEstado(idTarget, senal, nuevoEstado[senal])) ||
            r2
        );
      }, Promise.resolve(false));
    }

    const automatizacionesBloque = (idTarget, deps) => {
      const bloqueTarget = selBloque(getState(), idTarget);
      deps.reduce(
        (p3, dep) => {
          switch (dep.tipo) {
            case BLOQUE:
              const idSource = buildId({ idSector, x: dep.x, y: dep.y });
              const celdaSource = selCelda(getState(), idSource);
              if (celdaSource.posicion === dep.posicion) {
                const bloqueSource = selBloque(
                  getState(),
                  buildIdBloque(idSector, dep.bloque)
                );
                if (bloqueSource.idTren && !bloqueSource.vecino) {
                  return dispatch(
                    setBloqueOcupado(idTarget, bloqueSource.idTren, true)
                  );
                }
              }
              return p3;
            default:
              throw new Error(
                `Dependencia de  ${idTarget} tiene tipo desconocido: ${dep.tipo}`
              );
          }
        },
        bloqueTarget.vecino
          ? dispatch(setBloqueOcupado(idTarget, false, false))
          : Promise.resolve(false)
      );
    };

    const browseAutomatizaciones = () => {
      const automatizaciones = selAutomatizaciones(getState(), idSector);
      return automatizaciones.reduce((p, autom) => {
        const { x, y, dir, tipo, deps, bloque } = autom;
        const idTarget =
          tipo === BLOQUE
            ? buildIdBloque(idSector, bloque)
            : buildId({ idSector, x, y, dir });
        if (!force && idTarget === idOrigen) return p;
        switch (tipo) {
          case CAMBIO:
            return p.then((r) => automatizacionesCambio(idTarget, deps) || r);
          case SEMAFORO:
            return p.then((r) => automatizacionesSemaforo(idTarget, deps) || r);
          case BLOQUE:
            return p.then((r) => automatizacionesBloque(idTarget, deps) || r);
          default:
            throw new Error(
              `Celda ${idTarget} tiene automatización desconocido ${tipo}`
            );
        }
      }, Promise.resolve(false));
    };

    let countDown = 9;
    while (countDown && (await browseAutomatizaciones())) countDown--;
    if (!countDown) throw new Error(`Automatización en loop por ${idOrigen}`);
    return !!countDown;
  };
}
