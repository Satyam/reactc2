import { createReducer } from '@reduxjs/toolkit';
import { closeEstado, clickCelda, clickSenal } from '../actions';

const estadoReducer = createReducer({}, {
  [closeEstado]: () => ({}),
  [clickCelda]: (state, action) => action.payload,
  [clickSenal]: (state, action) => action.payload,
});

export default estadoReducer;