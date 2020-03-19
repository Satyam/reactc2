import { createReducer } from '@reduxjs/toolkit';
import { senales } from 'Store/data';
import { plainSetLuzEstado, setSenalManual } from './actions';
import { buildIdSenal } from 'Utils/buildKeys';

export default createReducer(senales || [], {
  [plainSetLuzEstado]: (state, action) => {
    const { idSenal, luz, estado } = action.payload;
    state[idSenal][luz] = estado;
  },
  [setSenalManual]: (state, action) => {
    const { idSenal, manual } = action.payload;
    state[idSenal].manual = manual;
  },
  '@@INIT': () =>
    senales.reduce((ss, s) => {
      const idSenal = buildIdSenal(s.idSector, s.x, s.y, s.dir);
      if (ss[idSenal])
        throw new Error(
          `Definición de señal en [${s.x},${s.y}] de ${s.idSector} repetida.`
        );
      return {
        ...ss,
        [idSenal]: {
          ...s,
          idSenal,
        },
      };
    }, {}),
});
