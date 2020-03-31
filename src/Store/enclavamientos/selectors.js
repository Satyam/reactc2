import { createSelector } from '@reduxjs/toolkit';
import { CAMBIO, SENAL } from 'Store/data';

export const selEnclavamientos = createSelector(
  state => state.enclavamientos,
  (state, idSector) => idSector,
  (enclavamientos, idSector) =>
    Object.values(enclavamientos)
      .filter(e => e.idSector === idSector)
      .sort((a, b) => {
        if (a.tipo === CAMBIO && b.tipo === SENAL) return -1;
        if (a.tipo === SENAL && b.tipo === CAMBIO) return 1;
        return 0;
      })
);

export const selEnclavamiento = (state, idOrigen) =>
  state.enclavamientos[idOrigen];
