import { createSelector } from '@reduxjs/toolkit';
import { selCurrentSector } from '../options/selectors';
import { selBloqueOcupado } from '../bloques/selectors';
import { selSemaforo } from '../semaforos/selectors';
import { buildId, buildIdBloque } from 'Utils';
import { BLOQUE, SEMAFORO, IZQ, CENTRO, DER, ALTO } from 'Store/data';

export const selEnclavamientos = createSelector(
  (state) => state.enclavamientos,
  selCurrentSector,
  (enclavamientos, idSector) =>
    Object.values(enclavamientos).filter((e) => e.idSector === idSector)
);

export const selEnclavamiento = (state, idOrigen) =>
  state.enclavamientos[idOrigen];

export const selCondicionesFaltantes = createSelector(
  (state) => state,
  selCurrentSector,
  selEnclavamiento,
  (state, idSector, encl) =>
    encl
      ? encl.deps.reduce((salida, dep) => {
          switch (dep.tipo) {
            case BLOQUE:
              const idBloque = buildIdBloque(idSector, dep.bloque);
              const idTren = selBloqueOcupado(state, idBloque);
              if (idTren) {
                return salida.concat({
                  ...dep,
                  idTren,
                  idBloque,
                });
              }
              break;
            case SEMAFORO:
              const idSemaforo = buildId({ ...dep, idSector });
              const semaforo = selSemaforo(state, idSemaforo);
              const aspecto = [IZQ, CENTRO, DER].reduce((permiso, senal) => {
                return senal in semaforo
                  ? Math.min(permiso, semaforo[senal])
                  : permiso;
              }, ALTO);
              if (aspecto !== dep.aspecto) {
                return salida.concat({
                  ...dep,
                  ...semaforo,
                });
              }
              break;
            default:
              break;
          }
          return salida;
        }, [])
      : []
);
