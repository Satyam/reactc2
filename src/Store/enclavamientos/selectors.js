import { createSelector } from '@reduxjs/toolkit';

export const selEnclavamientos = createSelector(
  (state, idSector) =>
    state.enclavamientos.filter(e => e.idSector === idSector),
  enclavamientos => enclavamientos
);
