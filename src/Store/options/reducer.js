import { createReducer } from '@reduxjs/toolkit';
import {
  automatizacionesActive,
  showTeletipo,
  showCoords,
  showEstado,
  hideEstado,
  showConfig,
  setPlayRate,
  setCurrentSector,
} from './actions';

export default createReducer(
  {
    automatizacionesActive: true,
    showCoords: true,
    showEstado: { show: false },
    playRate: 1,
    showTeletipo: true,
  },
  {
    [automatizacionesActive]: (state, action) => {
      state.automatizacionesActive = action.payload;
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
    [hideEstado]: (state) => {
      state.showEstado = { show: false };
    },
    [showConfig]: (state, action) => {
      state.showConfig = action.payload;
    },
    [setPlayRate]: (state, action) => {
      state.playRate = action.payload;
    },
    [setCurrentSector]: (state, action) => {
      state.currIdSector = action.payload;
    },
  }
);
