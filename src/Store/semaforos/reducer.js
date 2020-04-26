import { createReducer } from '@reduxjs/toolkit';
import { semaforos } from 'Store/data';
import { plainSetAspectoSenal, doSetModoSemaforo } from 'Store/actions';
import { BLOQUEADO, ALTO } from 'Store/data';
export default createReducer(semaforos, {
  [plainSetAspectoSenal]: (state, action) => {
    const { idSemaforo, senal, aspecto } = action.payload;
    state[idSemaforo][senal] = aspecto;
  },
  [doSetModoSemaforo]: (state, action) => {
    const { idSemaforo, modo } = action.payload;
    const next = state[idSemaforo];
    next.modo = modo;
    if (modo === BLOQUEADO) {
      if ('izq' in next) next.izq = ALTO;
      if ('centro' in next) next.centro = ALTO;
      if ('der' in next) next.der = ALTO;
    }
    state[idSemaforo] = next;
  },
});
