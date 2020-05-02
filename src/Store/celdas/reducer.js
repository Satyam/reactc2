import { createReducer } from '@reduxjs/toolkit';
import { loadSector } from 'Store/sectores/actions';

import adapter from './adapter';

import { updateCelda } from 'Store/actions';

export default createReducer(adapter.getInitialState(), {
  [loadSector.fulfilled]: (state, action) => {
    adapter.addMany(state, action.payload.celdas);
  },
  [updateCelda]: adapter.upsertOne,
});
