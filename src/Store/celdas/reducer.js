import { createReducer, createEntityAdapter } from '@reduxjs/toolkit';
import { loadSector } from 'Store/sectores/actions';

import adapter from './adapter';
import { buildId } from 'Utils';

import { updateCelda } from 'Store/actions';

export const celdaAdapter = createEntityAdapter({
  selectId: buildId,
});

export default createReducer(adapter.getInitialState(), {
  [loadSector.fulfilled]: (state, action) => {
    adapter.setAll(state, action.payload.celdas);
  },
  [updateCelda]: adapter.upsertOne,
});
