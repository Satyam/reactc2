import { createReducer } from '@reduxjs/toolkit';
import { enclavamientosActive, showTeletipo, showCoords } from './actions';

export default createReducer(
  { enclavamientosActive: true, showCoords: true },
  {
    [enclavamientosActive]: (state, action) => {
      state.enclavamientosActive = action.payload;
    },
    [showTeletipo]: (state, action) => {
      state.showTeletipo = action.payload;
    },
    [showCoords]: (state, action) => {
      state.showCoords = action.payload;
    },
  }
);
