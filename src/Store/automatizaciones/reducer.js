import { createReducer } from '@reduxjs/toolkit';
import { loadSector } from 'Store/sectores/actions';

import adapter from './adapter';

export default createReducer(adapter.getInitialState(), {
  [loadSector.fulfilled]: (state, action) => {
    adapter.addMany(state, action.payload.automatizaciones || []);
  },
});
