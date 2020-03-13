import { createReducer } from '@reduxjs/toolkit';
import { enclavamientos } from 'Store/data.js';
import { setPendiente, clearPendientes } from './actions';

export default createReducer(enclavamientos || [], {
  [setPendiente]: (state, action) => {
    state._pendientes.push(action.payload);
  },
  [clearPendientes]: state => {
    state._pendientes = [];
  },
  '@@INIT': state => {
    state._pendientes = [];
  },
});
