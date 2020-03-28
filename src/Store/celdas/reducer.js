import { createReducer } from '@reduxjs/toolkit';
import { celdas } from 'Store/data';
import {
  plainSetCambio,
  setCambioManual,
  addTren,
  removeTrenFromCelda,
  addTrenToCelda,
} from 'Store/actions';

export default createReducer(celdas, {
  [plainSetCambio]: (state, action) => {
    const { idCelda, posicion } = action.payload;
    state[idCelda].posicion = posicion;
  },
  [setCambioManual]: (state, action) => {
    const { idCelda, manual } = action.payload;
    state[idCelda].manual = manual;
  },
  [addTren]: (state, action) => {
    const { idCelda, idTren } = action.payload;
    state[idCelda].idTren = idTren;
  },
  [removeTrenFromCelda]: (state, action) => {
    state[action.payload.idCelda].idTren = undefined;
  },
  [addTrenToCelda]: (state, action) => {
    const { idCelda, idTren } = action.payload;
    state[idCelda].idTren = idTren;
  },
});
