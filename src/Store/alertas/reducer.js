import { createReducer } from '@reduxjs/toolkit';

import {
  doSetAlarma,
  clearAlarma,
  setAviso,
  clearAviso,
  clearAvisos,
} from 'Store/actions';

export default createReducer(
  { alarma: {}, avisos: [] },
  {
    [doSetAlarma]: (state, action) => {
      state.alarma = action.payload;
    },
    [clearAlarma]: (state) => {
      state.alarma = {};
    },
    [setAviso]: (state, action) => {
      state.avisos.unshift(action.payload);
    },
    [clearAviso]: (state, action) => {
      const idx = state.avisos.findIndex((av) => av.fecha === action.payload);
      if (idx !== -1) state.avisos.splice(idx, 1);
    },
    [clearAvisos]: (state) => {
      state.avisos = [];
    },
  }
);
