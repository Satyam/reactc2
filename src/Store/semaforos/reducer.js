import { createReducer } from '@reduxjs/toolkit';
import { semaforos } from 'Store/data';
import { plainSetSenalEstado, setSemaforoManual } from 'Store/actions';

export default createReducer(semaforos, {
  [plainSetSenalEstado]: (state, action) => {
    const { idSemaforo, senal, estado } = action.payload;
    state[idSemaforo][senal] = estado;
  },
  [setSemaforoManual]: (state, action) => {
    const { idSemaforo, manual } = action.payload;
    state[idSemaforo].manual = manual;
  },
});
