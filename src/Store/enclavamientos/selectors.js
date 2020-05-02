import { createSelector } from '@reduxjs/toolkit';
import { currentSector } from 'Store/options';
import { selBloqueOcupado } from 'Store/bloques/selectors';
import { selSemaforo } from 'Store/semaforos/selectors';
import { buildId, buildIdBloque } from 'Utils';
import { BLOQUE, SEMAFORO, IZQ, CENTRO, DER, ALTO } from 'Store/constantes';
import adapter from './adapter';

const selectors = adapter.getSelectors((state) => state.enclavamientos);

export const selEnclavamientos = selectors.selectAll;
export const selEnclavamiento = selectors.selectById;

export const selCondicionesFaltantes = createSelector(
  (state) => state,
  currentSector.selector,
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
