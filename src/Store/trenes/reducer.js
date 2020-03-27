import { createReducer } from '@reduxjs/toolkit';
import { addTren, doSetTren, delTren } from './actions';

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
    [delTren]: (state, { payload: idTren }) => {
      delete state[idTren];
    },
  }
);
