import { createSelector } from '@reduxjs/toolkit';

export const selEnclavamientos = createSelector(
  (state, idSector) =>
    Object.values(state.enclavamientos).filter(e => e.idSector === idSector),
  enclavamientos => enclavamientos
);

export const selEnclavamiento = (state, idOrigen) =>
  state.enclavamientos[idOrigen];
