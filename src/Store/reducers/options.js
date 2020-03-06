import { createReducer } from '@reduxjs/toolkit';
import { showMensajes, showTeletipo } from '../actions';

const optionsReducer = createReducer(
  {},
  {
    [showMensajes]: (state, action) => {
      state.showMensajes = action.payload;
    },
    [showTeletipo]: (state, action) => {
      state.showTeletipo = action.payload;
    },
  }
);

export default optionsReducer;
