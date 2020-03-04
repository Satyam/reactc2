import { createReducer } from '@reduxjs/toolkit';
import { celdas } from '../data.json';
import { setCambio, setCambioManual } from '../actions'

const celdasReducer = createReducer(celdas, {
  [setCambio]: (state, action) => {
    const { idCelda, posicion } = action.payload;
    state[idCelda].posicion = posicion;
  },
  [setCambioManual]: (state, action) => {
    const { idCelda, manual } = action.payload;
    state[idCelda].manual = manual;
  }

});

export default celdasReducer;