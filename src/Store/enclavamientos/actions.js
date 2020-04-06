import { buildId, buildIdBloque } from 'Utils';

import {
  selCelda,
  selSenal,
  selEnclavamientos,
  selEnclavamientosActive,
  selSenalIsManual,
  selCeldaIsManual,
  selBloqueOcupado,
} from 'Store/selectors';

import { VERDE, ROJO, CAMBIO, SENAL, BLOQUE, NORMAL, CENTRO } from 'Store/data';

import { doSetCambio, doSetLuzEstado } from 'Store/actions';

export function setEnclavamientos(idOrigen, tipoOrigen, force) {
  return (dispatch, getState) => {
    function enclavamientosCambio(idTarget, idSector, dependencias) {
      const celdaTarget = selCelda(getState(), idTarget);
      return dependencias.reduce((r1, dep) => {
        const idSource = buildId({ idSector, x: dep.x, y: dep.y });
        const celdaSource = selCelda(getState(), idSource);
        const posicionEsperada =
          dep[celdaSource.posicion] ||
          (celdaTarget.tipo === CAMBIO ? NORMAL : CENTRO);
        if (posicionEsperada === celdaTarget.posicion) return r1;
        if (selCeldaIsManual(getState(), idTarget)) return r1;
        return !!dispatch(doSetCambio(idTarget, posicionEsperada)) || r1;
      }, false);
    }

    function enclavamientosSenal(idTarget, idSector, dependencias) {
      const senalTarget = selSenal(getState(), idTarget);
      if (selSenalIsManual(getState(), idTarget)) return false;
      const nuevoEstado = {
        izq: VERDE,
        centro: VERDE,
        der: VERDE,
      };
      dependencias.forEach((dep) => {
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
            Object.keys(estadoBuscado).forEach((luz) => {
              nuevoEstado[luz] = Math.max(nuevoEstado[luz], estadoBuscado[luz]);
            });
            break;
          case SENAL:
            const senalSource = selSenal(getState(), idSource);
            dep.luces.forEach(({ luzOrigen, cuando, luzAfectada, estado }) => {
              if (senalSource[luzOrigen] === cuando) {
                nuevoEstado[luzAfectada] = Math.max(
                  nuevoEstado[luzAfectada],
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
              nuevoEstado[dep.luzAfectada] = ROJO;
            }
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
          !!dispatch(doSetLuzEstado(idTarget, luz, nuevoEstado[luz])) || r2
        );
      }, false);
    }

    const browseEnclavamientos = (idSector) => {
      const enclavamientos = selEnclavamientos(getState(), idSector);
      return enclavamientos.reduce((r, encl) => {
        const { x, y, dir, tipo, dependencias } = encl;
        const idTarget = buildId({ idSector, x, y, dir });
        if (!force && idTarget === idOrigen) return r;
        switch (tipo) {
          case CAMBIO:
            return enclavamientosCambio(idTarget, idSector, dependencias) || r;
          case SENAL:
            return enclavamientosSenal(idTarget, idSector, dependencias) || r;
          default:
            throw new Error(
              `Celda ${idTarget} tiene enclavamiento desconocido ${tipo}`
            );
        }
      }, false);
    };

    if (!selEnclavamientosActive(getState())) return;
    let idSector;
    switch (tipoOrigen) {
      case CAMBIO:
        {
          const entity = selCelda(getState(), idOrigen);
          if (entity.manual) return;
          idSector = entity.idSector;
        }
        break;
      case SENAL:
        {
          const entity = selSenal(getState(), idOrigen);
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
    let countDown = 9;
    while (countDown && browseEnclavamientos(idSector)) countDown--;
    if (!countDown) throw new Error(`Enclavamiento en loop por ${idOrigen}`);
    return !!countDown;
  };
}
