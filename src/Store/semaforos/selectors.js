import { createSelector } from '@reduxjs/toolkit';
import { AUTOMATICO } from 'Store/data/constantes';
import adapter from './adapter';

const selectors = adapter.getSelectors((state) => state.semaforos);

export const selSemaforo = selectors.selectById;

export const selModoSemaforo = createSelector(
  selectors.selectById,
  (semaforo) => (semaforo && semaforo.modo) || AUTOMATICO
);

export const selSemaforos = createSelector(
  selectors.selectAll,
  (_, celda) => celda,
  (semaforos, celda) => {
    const ss = semaforos.filter(
      (semaforo) =>
        semaforo.idSector === celda.idSector &&
        semaforo.x === celda.x &&
        semaforo.y === celda.y
    );
    if (ss.length) return ss;
    return null;
  }
);
