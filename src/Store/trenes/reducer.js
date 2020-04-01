import { createReducer } from '@reduxjs/toolkit';
import { doAddTren, doSetTren, doDelTren } from './actions';

export default createReducer(
  {},
  {
    [doAddTren]: (state, { payload }) => {
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
