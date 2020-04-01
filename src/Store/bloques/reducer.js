import { createReducer } from '@reduxjs/toolkit';
import { bloques } from 'Store/data';

import { setBloqueOcupado } from './actions';

export default createReducer(bloques, {
  [setBloqueOcupado]: (state, action) => {
    const { idBloque, ocupado } = action.payload;
    state[idBloque].ocupado = ocupado;
  },
});
