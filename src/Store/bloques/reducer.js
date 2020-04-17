import { createReducer } from '@reduxjs/toolkit';
import { bloques } from 'Store/data';

import { setBloqueOcupado } from './actions';

export default createReducer(bloques, {
  [setBloqueOcupado]: (state, action) => {
    const { idBloque, ...rest } = action.payload;
    state[idBloque] = {
      ...state[idBloque],
      ...rest,
    };
  },
});
