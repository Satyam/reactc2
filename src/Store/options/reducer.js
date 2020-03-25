import { createReducer } from '@reduxjs/toolkit';
import {
  enclavamientosActive,
  showTeletipo,
  showCoords,
  showEstado,
  hideEstado,
  showConfig,
} from './actions';

export default createReducer(
  { enclavamientosActive: true, showCoords: true, showEstado: { show: false } },
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
    [showEstado]: (state, action) => {
      state.showEstado = {
        ...action.payload,
        show: true,
      };
    },
    [hideEstado]: state => {
      state.showEstado = { show: false };
    },
    [showConfig]: (state, action) => {
      state.showConfig = action.payload;
    },
  }
);
