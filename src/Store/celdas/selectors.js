import { createSelector } from '@reduxjs/toolkit';

export const selCelda = (state, idCelda) => state.celdas[idCelda];

export const selCeldaIsManual = (state, idCelda) =>
  !!state.celdas[idCelda].manual;

export const selCeldas = createSelector(
  state => state.celdas,
  (state, idSector) => idSector,
  (celdas, idSector) =>
    Object.values(celdas).filter(celda => celda.idSector === idSector)
);
