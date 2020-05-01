import { createSelector } from '@reduxjs/toolkit';
import { NORMAL } from 'Store/data';

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
    return {
      posicion: NORMAL,
      ...celda,
    };
});

export const selCeldaIsManual = createSelector(
  selectors.selectById,
  (celda) => celda && celda.manual
);

// export const selCeldas = createSelector(
//   (state) => state.celdas,
//   (state, idSector) => idSector,
//   (celdas, idSector) =>
//     Object.values(celdas).filter((celda) => celda.idSector === idSector)
// );
