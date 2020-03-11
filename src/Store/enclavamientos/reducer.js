import { createReducer } from '@reduxjs/toolkit';
import { enclavamientos } from '../data.json';
import { setPendiente, clearPendientes, guardarPrevio } from './actions';

export default createReducer(enclavamientos || [], {
  [setPendiente]: (state, action) => {
    if (!state._pendientes) state._pendientes = [];
    state._pendientes.push(action.payload);
  },
  [clearPendientes]: state => {
    state._pendientes = [];
  },
  [guardarPrevio]: (state, action) => {
    const { _prev, idEnclavamiento } = action.payload;
    state[idEnclavamiento]._prev = _prev;
  },
});
