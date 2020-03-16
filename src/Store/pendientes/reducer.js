import { createReducer } from '@reduxjs/toolkit';
import { setPendiente, clearPendientes } from './actions';

export default createReducer([], {
  [setPendiente]: (state, action) => {
    state.push(action.payload);
  },
  [clearPendientes]: () => [],
});
