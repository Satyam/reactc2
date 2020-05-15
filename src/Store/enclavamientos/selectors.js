import { createSelector } from '@reduxjs/toolkit';
import { currentSector } from 'Store/options';
import { selBloqueOcupado } from 'Store/bloques/selectors';
import { selSemaforo } from 'Store/semaforos/selectors';
import { selCelda } from 'Store/celdas/selectors';
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
              let idTren;
              let celda;
              if (dep.bloque) {
                const idBloque = buildIdBloque(idSector, dep.bloque);
                idTren = selBloqueOcupado(state, idBloque);
              } else {
                const idCelda = buildId({ idSector, ...dep });
                celda = selCelda(idCelda);
                idTren = celda.idTren;
              }
              if (idTren) {
                return salida.concat({
                  ...celda,
                  ...dep,
                  idTren,
                });
              }
              break;
            case SEMAFORO:
              const idSemaforo = buildId({ ...dep, idSector });
              const semaforo = selSemaforo(state, idSemaforo);

              const aspecto = dep.senal
                ? semaforo[dep.senal]
                : [IZQ, CENTRO, DER].reduce((permiso, senal) => {
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
