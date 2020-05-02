import { createReducer } from '@reduxjs/toolkit';
import { updateSemaforo } from './actions';
import { loadSector } from 'Store/sectores/actions';

import adapter from './adapter';

export default createReducer(adapter.getInitialState(), {
  [loadSector.fulfilled]: (state, action) => {
    adapter.setAll(state, action.payload.semaforos);
  },
  [updateSemaforo]: adapter.upsertOne,
});
