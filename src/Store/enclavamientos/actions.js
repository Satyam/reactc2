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
  return async (dispatch, getState) => {
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

    function enclavamientosCambio(idTarget, dependencias) {
      const celdaTarget = selCelda(getState(), idTarget);
      return dependencias.reduce((p1, dep) => {
        const idSource = buildId({ idSector, x: dep.x, y: dep.y });
        const celdaSource = selCelda(getState(), idSource);
        const posicionEsperada =
          dep[celdaSource.posicion] ||
          (celdaTarget.tipo === CAMBIO ? NORMAL : CENTRO);
        if (posicionEsperada === celdaTarget.posicion) return p1;
        if (selCeldaIsManual(getState(), idTarget)) return p1;
        return p1.then(
          (r1) => !!dispatch(doSetCambio(idTarget, posicionEsperada)) || r1
        );
      }, Promise.resolve(false));
    }

    function enclavamientosSenal(idTarget, dependencias) {
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
      return Object.keys(nuevoEstado).reduce((p2, luz) => {
        if (!(luz in senalTarget)) return p2;
        if (senalTarget[luz] === nuevoEstado[luz]) return p2;

        return p2.then(
          (r2) =>
            !!dispatch(doSetLuzEstado(idTarget, luz, nuevoEstado[luz])) || r2
        );
      }, Promise.resolve(false));
    }

    const browseEnclavamientos = () => {
      const enclavamientos = selEnclavamientos(getState(), idSector);
      return enclavamientos.reduce((p, encl) => {
        const { x, y, dir, tipo, dependencias } = encl;
        const idTarget = buildId({ idSector, x, y, dir });
        if (!force && idTarget === idOrigen) return p;
        switch (tipo) {
          case CAMBIO:
            return p.then(
              (r) => enclavamientosCambio(idTarget, dependencias) || r
            );
          case SENAL:
            return p.then(
              (r) => enclavamientosSenal(idTarget, dependencias) || r
            );
          default:
            throw new Error(
              `Celda ${idTarget} tiene enclavamiento desconocido ${tipo}`
            );
        }
      }, Promise.resolve(false));
    };

    let countDown = 9;
    while (countDown && (await browseEnclavamientos())) countDown--;
    if (!countDown) throw new Error(`Enclavamiento en loop por ${idOrigen}`);
    return !!countDown;
  };
}
