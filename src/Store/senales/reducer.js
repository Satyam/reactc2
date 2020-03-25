import { createReducer } from '@reduxjs/toolkit';
import { senales } from 'Store/data';
import { loadData, plainSetLuzEstado, setSenalManual } from 'Store/actions';
import { buildId } from 'Utils';

export default createReducer(
  {},
  {
    [plainSetLuzEstado]: (state, action) => {
      const { idSenal, luz, estado } = action.payload;
      state[idSenal][luz] = estado;
    },
    [setSenalManual]: (state, action) => {
      const { idSenal, manual } = action.payload;
      state[idSenal].manual = manual;
    },
    [loadData]: state =>
      senales.reduce((ss, s) => {
        const idSenal = buildId(s);
        return {
          ...ss,
          [idSenal]: {
            ...s,
            idSenal,
          },
        };
      }, state),
  }
);
