import { createSelector } from '@reduxjs/toolkit';

export const selEnclavamientos = createSelector(
  (state, idSector) =>
    state.enclavamientos.filter(e => e.idSector === idSector),
  enclavamientos => enclavamientos
);

export const selEnclavamiento = (state, el) =>
  state.enclavamientos.find(
    e =>
      e.idSector === el.idSector &&
      e.x === el.x &&
      e.y === el.y &&
      e.dir === el.dir
  );
