import { createReducer } from '@reduxjs/toolkit';
import { senales } from '../data.json';
import { doSetLuzEstado, setLuzManual } from './actions';

export default createReducer(senales || [], {
  [doSetLuzEstado]: (state, action) => {
    const { idSenal, luz, estado } = action.payload;
    state[idSenal][luz].estado = estado;
  },
  [setLuzManual]: (state, action) => {
    const { idSenal, luz, manual } = action.payload;
    state[idSenal][luz].manual = manual;
  },
});
