import { createReducer } from '@reduxjs/toolkit';
import { senales } from 'Store/data';
import { plainSetLuzEstado, setSenalManual } from './actions';

export default createReducer(senales || [], {
  [plainSetLuzEstado]: (state, action) => {
    const { idSenal, luz, estado } = action.payload;
    state[idSenal][luz] = estado;
  },
  [setSenalManual]: (state, action) => {
    const { idSenal, manual } = action.payload;
    state[idSenal].manual = manual;
  },
});
