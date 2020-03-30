import { createSelector } from '@reduxjs/toolkit';

export const selEnclavamientos = createSelector(
  state => state.enclavamientos,
  (state, idSector) => idSector,
  (enclavamientos, idSector) =>
    Object.values(enclavamientos).filter(e => e.idSector === idSector)
);

export const selEnclavamiento = (state, idOrigen) =>
  state.enclavamientos[idOrigen];
