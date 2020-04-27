import { buildId, buildIdBloque } from 'Utils';

import {
  selCelda,
  selSemaforo,
  selAutomatizacion,
  selAutomatizaciones,
  selBloqueOcupado,
  selBloque,
} from 'Store/selectors';

import { automatizacionesActive } from '../options';

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
  AUTOMATICO,
} from 'Store/data';

import {
  rawSetPosicion,
  doSetAspectoSenal,
  setBloqueOcupado,
} from 'Store/actions';

function automate(dispatch, getState, idTarget, autom) {
  const idSector = autom.idSector;

  function automatizacionesCambio(idTarget, deps) {
    const celdaTarget = selCelda(getState(), idTarget);
    return deps.reduce((p1, dep) => {
      const idSource = buildId({ idSector, x: dep.x, y: dep.y });
      const celdaSource = selCelda(getState(), idSource);
      const alt = dep.alts.find((alt) => alt.cuando === celdaSource.posicion);
      if (!alt) return p1;
      const posicionEsperada = alt.posicion;
      if (posicionEsperada === celdaTarget.posicion) return p1;
      if (celdaTarget.manual) return p1;
      return p1.then(
        (r1) => !!dispatch(rawSetPosicion(idTarget, posicionEsperada)) || r1
      );
    }, Promise.resolve(false));
  }

  function automatizacionesSemaforo(idTarget, deps) {
    const semaforoTarget = selSemaforo(getState(), idTarget);
    if (semaforoTarget.modo !== AUTOMATICO) return false;
    const aspectoEsperado = {
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
            Object.keys(aspectoEsperado).forEach((senal) => {
              if (alt[senal])
                aspectoEsperado[senal] = Math.max(
                  aspectoEsperado[senal],
                  alt[senal]
                );
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
          dep.senales.forEach(({ cuando, senalAfectada, aspecto }) => {
            if (estadoSource === cuando) {
              aspectoEsperado[senalAfectada] = Math.max(
                aspectoEsperado[senalAfectada],
                aspecto
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
            aspectoEsperado[dep.senalAfectada] = ALTO;
          }
          break;
        case FIJO:
          aspectoEsperado[dep.senalAfectada] = Math.max(
            dep.aspecto,
            aspectoEsperado[dep.senalAfectada]
          );
          break;
        default:
          throw new Error(
            `Dependencia ${dep.idSource} de ${idTarget} tiene tipo desconocido: ${dep.tipo}`
          );
      }
    });
    return Object.keys(aspectoEsperado).reduce((p2, senal) => {
      if (!(senal in semaforoTarget)) return p2;
      if (semaforoTarget[senal] === aspectoEsperado[senal]) return p2;

      return p2.then(
        (r2) =>
          !!dispatch(
            doSetAspectoSenal(idTarget, senal, aspectoEsperado[senal])
          ) || r2
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

  switch (autom.tipo) {
    case CAMBIO:
      return automatizacionesCambio(idTarget, autom.deps);
    case SEMAFORO:
      return automatizacionesSemaforo(idTarget, autom.deps);
    case BLOQUE:
      return automatizacionesBloque(idTarget, autom.deps);
    default:
      throw new Error(
        `Celda ${idTarget} tiene automatización desconocido ${autom.tipo}`
      );
  }
}

export function runAutomatizacion(idTarget) {
  return async (dispatch, getState) => {
    const autom = selAutomatizacion(getState(), idTarget);
    automate(dispatch, getState, idTarget, autom);
  };
}

export function runAutomatizaciones(idOrigen) {
  return async (dispatch, getState) => {
    if (!automatizacionesActive.selector(getState())) return;

    const browseAutomatizaciones = () => {
      const automatizaciones = selAutomatizaciones(getState());
      return automatizaciones.reduce((p, autom) => {
        const { x, y, dir, tipo, bloque, idSector } = autom;
        const idTarget =
          tipo === BLOQUE
            ? buildIdBloque(idSector, bloque)
            : buildId({ idSector, x, y, dir });
        if (idOrigen && idTarget === idOrigen) return p;
        return p.then(
          (r) => automate(dispatch, getState, idTarget, autom) || r
        );
      }, Promise.resolve(false));
    };

    let countDown = 9;
    while (countDown && (await browseAutomatizaciones())) countDown--;
    if (!countDown) throw new Error(`Automatización en loop por ${idOrigen}`);
    return !!countDown;
  };
}
