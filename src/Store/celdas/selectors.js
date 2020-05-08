import { createSelector } from '@reduxjs/toolkit';
import { NORMAL, CAMBIO } from 'Store/constantes';

import { currentSector } from 'Store/options';
import adapter from './adapter';

const selectors = adapter.getSelectors((state) => state.celdas);

export const selCeldas = createSelector(
  selectors.selectAll,
  currentSector.selector,
  (celdas, idSector) => celdas.filter((e) => e.idSector === idSector)
);

export const selCelda = createSelector(selectors.selectById, (celda) => {
  if (celda)
    return celda.tipo === CAMBIO
      ? {
          posicion: NORMAL,
          ...celda,
        }
      : celda;
});

export const selCeldaIsManual = createSelector(
  selectors.selectById,
  (celda) => celda && celda.manual
);
