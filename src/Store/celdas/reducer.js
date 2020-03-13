import { createReducer } from '@reduxjs/toolkit';
import { celdas } from 'Store/data.js';
import { plainSetCambio, setCambioManual } from './actions';

export default createReducer(celdas || [], {
  [plainSetCambio]: (state, action) => {
    const { idCelda, posicion } = action.payload;
    state[idCelda].posicion = posicion;
  },
  [setCambioManual]: (state, action) => {
    const { idCelda, manual } = action.payload;
    state[idCelda].manual = manual;
  },
});
