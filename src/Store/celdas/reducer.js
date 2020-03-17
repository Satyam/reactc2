import { createReducer } from '@reduxjs/toolkit';
import { celdas } from 'Store/data';
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
  '@@INIT': state => {
    Object.keys(state).forEach(idCelda => {
      const celda = state[idCelda];
      if (celda.posicionInicial) {
        celda.posicion = celda.posicionInicial;
      }
    });
  },
});
