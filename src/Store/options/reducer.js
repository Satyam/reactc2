import { createReducer } from '@reduxjs/toolkit';
import { enclavamientosActive, showTeletipo } from './actions';

export default createReducer(
  { enclavamientosActive: true },
  {
    [enclavamientosActive]: (state, action) => {
      state.enclavamientosActive = action.payload;
    },
    [showTeletipo]: (state, action) => {
      state.showTeletipo = action.payload;
    },
  }
);
