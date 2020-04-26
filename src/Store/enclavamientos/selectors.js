import { createSelector } from '@reduxjs/toolkit';
import { selCurrentSector } from '../options/selectors';

export const selEnclavamientos = createSelector(
  (state) => state.enclavamientos,
  selCurrentSector,
  (enclavamientos, idSector) =>
    Object.values(enclavamientos).filter((e) => e.idSector === idSector)
);

export const selEnclavamiento = (state, idOrigen) =>
  state.enclavamientos[idOrigen];
