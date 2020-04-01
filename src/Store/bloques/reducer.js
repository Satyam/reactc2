import { createReducer } from '@reduxjs/toolkit';
import { bloques } from 'Store/data';

import { setBloqueOcupado } from './actions';

export default createReducer(bloques, {
  [setBloqueOcupado]: (state, action) => {
    const { idBloque, idTren } = action.payload;
    state[idBloque].idTren = idTren;
  },
});
