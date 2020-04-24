import { createReducer } from '@reduxjs/toolkit';
import { semaforos } from 'Store/data';
import { plainSetAspectoSenal, doSetModoSemaforo } from 'Store/actions';

export default createReducer(semaforos, {
  [plainSetAspectoSenal]: (state, action) => {
    const { idSemaforo, senal, aspecto } = action.payload;
    state[idSemaforo][senal] = aspecto;
  },
  [doSetModoSemaforo]: (state, action) => {
    const { idSemaforo, modo } = action.payload;
    state[idSemaforo].modo = modo;
  },
});
