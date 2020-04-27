import { createReducer } from '@reduxjs/toolkit';
import { showEstado, hideEstado } from './actions';

import {
  showConfig,
  showCoords,
  automatizacionesActive,
  showTeletipo,
  playRate,
  currentSector,
} from './';

export default createReducer(
  {
    [automatizacionesActive]: automatizacionesActive.default,
    [showCoords]: showCoords.default,
    showEstado: { show: false },
    [playRate]: playRate.default,
    [showTeletipo]: showTeletipo.default,
    [showConfig]: showConfig.default,
  },
  {
    [automatizacionesActive]: automatizacionesActive.reducer,
    [showTeletipo]: showTeletipo.reducer,
    [showCoords]: showCoords.reducer,
    [showEstado]: (state, action) => {
      state.showEstado = {
        ...action.payload,
        show: true,
      };
    },
    [hideEstado]: (state) => {
      state.showEstado = { show: false };
    },
    [showConfig]: showConfig.reducer,
    [playRate]: playRate.reducer,
    [currentSector]: currentSector.reducer,
  }
);
