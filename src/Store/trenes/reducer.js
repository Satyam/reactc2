import { createReducer } from '@reduxjs/toolkit';
import { addTren, setTren, delTren } from './actions';

export default createReducer(
  {},
  {
    [addTren]: (state, { payload }) => {
      state[payload.idTren] = payload;
    },
    [setTren]: (state, { payload }) => {
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
