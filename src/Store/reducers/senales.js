import { createReducer } from '@reduxjs/toolkit';
import { senales } from '../data.json';
import { setLuzEstado, setLuzManual } from '../actions'
const senalesReducer = createReducer(senales, {
  [setLuzEstado]: (state, action) => {
    const {
      idSenal,
      luz,
      estado,
    } = action.payload;
    state[idSenal][luz].estado = estado;
  },
  [setLuzManual]: (state, action) => {
    const {
      idSenal,
      luz,
      manual,
    } = action.payload;
    state[idSenal][luz].manual = manual;
  }
});

export default senalesReducer;