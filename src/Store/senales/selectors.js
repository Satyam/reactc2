import { createSelector } from '@reduxjs/toolkit';

export const selSenal = (state, idSenal) => state.senales[idSenal];
export const selSenalIsManual = (state, idSenal) =>
  state.senales[idSenal].manual;

export const selSenales = createSelector(
  state => state.senales,
  (state, celda) => celda,
  (senales, celda) =>
    Object.values(senales).filter(
      senal =>
        senal.idSector === celda.idSector &&
        senal.x === celda.x &&
        senal.y === celda.y
    )
);
