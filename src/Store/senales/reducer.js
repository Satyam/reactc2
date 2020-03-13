import { createReducer } from '@reduxjs/toolkit';
import { senales } from 'Store/data.js';
import { plainSetLuzEstado, setLuzManual } from './actions';

export default createReducer(senales || [], {
  [plainSetLuzEstado]: (state, action) => {
    const { idSenal, luz, estado } = action.payload;
    state[idSenal][luz].estado = estado;
  },
  [setLuzManual]: (state, action) => {
    const { idSenal, luz, manual } = action.payload;
    state[idSenal][luz].manual = manual;
  },
});
