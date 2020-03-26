import { createAction } from '@reduxjs/toolkit';

let id = 0;
export const addTren = createAction('addTren', ({ x, y, dir, speed }) => ({
  payload: { x, y, dir, speed, next: Date.now(), idTren: `_tren_${id++}` },
}));
export const setTren = createAction('setTren');
export const delTren = createAction('delTren');
