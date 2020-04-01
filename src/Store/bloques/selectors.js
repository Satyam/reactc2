import { createSelector } from '@reduxjs/toolkit';

export const selBloque = (state, idBloque) => state.bloques[idBloque];
export const selBloqueOcupado = createSelector(
  state => state.bloques,
  (state, idBloque) => idBloque,
  (bloques, idBloque) => {
    const bloque = bloques[idBloque];
    return bloque && bloque.idTren;
  }
);
