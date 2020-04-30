import { createSelector } from '@reduxjs/toolkit';
import { AUTOMATICO } from 'Store/data/constantes';
export const selSemaforo = (state, idSemaforo) => state.semaforos[idSemaforo];

export const selModoSemaforo = (state, idSemaforo) => {
  const semaforo = selSemaforo(state, idSemaforo);
  return (semaforo && semaforo.modo) || AUTOMATICO;
};

export const selSemaforos = createSelector(
  (state) => state.semaforos,
  (state, celda) => celda,
  (semaforos, celda) => {
    const ss = Object.values(semaforos).filter(
      (semaforo) =>
        semaforo.idSector === celda.idSector &&
        semaforo.x === celda.x &&
        semaforo.y === celda.y
    );
    if (ss.length) return ss;
    return null;
  }
);
