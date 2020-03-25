import { createSelector } from '@reduxjs/toolkit';

export const selCelda = (state, idCelda) => state.celdas[idCelda];
export const selCeldaIsManual = (state, idCelda) =>
  !!state.celdas[idCelda].manual;
export const selCeldas = createSelector(
  (state, idSector) =>
    Object.values(state.celdas).filter(celda => celda.idSector === idSector),
  celdas => celdas
);
