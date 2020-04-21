import { createSelector } from '@reduxjs/toolkit';
import { NORMAL } from 'Store/data';

export const selCelda = createSelector(
  (state) => state.celdas,
  (_, idCelda) => idCelda,
  (celdas, idCelda) => ({
    posicion: NORMAL,
    ...celdas[idCelda],
  })
);

export const selCeldaIsManual = (state, idCelda) =>
  !!state.celdas[idCelda].manual;

export const selCeldas = createSelector(
  (state) => state.celdas,
  (state, idSector) => idSector,
  (celdas, idSector) =>
    Object.values(celdas).filter((celda) => celda.idSector === idSector)
);
