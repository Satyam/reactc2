import { createReducer } from '@reduxjs/toolkit';
import { addTren, doSetTren, doDelTren } from './actions';

export default createReducer(
  {},
  {
    [addTren]: (state, { payload }) => {
      state[payload.idTren] = payload;
    },
    [doSetTren]: (state, { payload }) => {
      state[payload.idTren] = {
        ...state[payload.idTren],
        ...payload,
      };
    },
    [doDelTren]: (state, { payload: idTren }) => {
      delete state[idTren];
    },
  }
);
