import { createReducer } from '@reduxjs/toolkit';
import { celdas } from 'Store/data';
import {
  doSetPosicion,
  doSetCambioManual,
  doRemoveTrenFromCelda,
  doAddTrenToCelda,
  setRebota,
} from 'Store/actions';

export default createReducer(celdas, {
  [doSetPosicion]: (state, action) => {
    const { idCelda, posicion } = action.payload;
    state[idCelda].posicion = posicion;
  },
  [doSetCambioManual]: (state, action) => {
    const { idCelda, manual } = action.payload;
    state[idCelda].manual = manual;
  },
  [doRemoveTrenFromCelda]: (state, action) => {
    state[action.payload.idCelda].idTren = undefined;
  },
  [doAddTrenToCelda]: (state, action) => {
    const { idCelda, idTren } = action.payload;
    state[idCelda].idTren = idTren;
  },
  [setRebota]: (state, action) => {
    const { idCelda, rebota } = action.payload;
    state[idCelda].rebota = rebota;
  },
});
