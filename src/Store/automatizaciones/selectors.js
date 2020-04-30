import { createSelector } from '@reduxjs/toolkit';

import { currentSector } from 'Store/options';

import adapter from './adapter';

const selectors = adapter.getSelectors((state) => state.automatizaciones);

export const selAutomatizaciones = createSelector(
  selectors.selectAll,
  currentSector.selector,
  (automatizaciones, idSector) =>
    Object.values(automatizaciones).filter((e) => e.idSector === idSector)
);

export const selAutomatizacion = selectors.selectById;
