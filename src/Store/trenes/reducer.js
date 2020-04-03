import { createReducer } from '@reduxjs/toolkit';
import { doAddTren, setTren, doDelTren } from './actions';

export default createReducer(
  {},
  {
    [doAddTren]: (state, { payload }) => {
      state[payload.idTren] = payload;
    },
    [setTren]: (state, { payload }) => {
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
