import { createReducer } from '@reduxjs/toolkit';
import { loadSector } from 'Store/sectores/actions';
import enclavamientosAdapter from './adapter';

export default createReducer(enclavamientosAdapter.getInitialState(), {
  [loadSector.fulfilled]: (state, action) => {
    enclavamientosAdapter.setAll(state, action.payload.enclavamientos);
  },
});
