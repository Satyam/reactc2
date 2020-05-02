import { createSelector } from '@reduxjs/toolkit';

import adapter from './adapter';

const selectors = adapter.getSelectors((state) => state.bloques);

export const selBloque = selectors.selectById;

export const selBloqueOcupado = createSelector(
  selectors.selectById,
  (bloque) => bloque && bloque.idTren
);
