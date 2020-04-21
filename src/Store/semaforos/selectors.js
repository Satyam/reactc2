import { createSelector } from '@reduxjs/toolkit';

export const selSemaforo = (state, idSemaforo) => state.semaforos[idSemaforo];

export const selSemaforoIsManual = (state, idSemaforo) =>
  state.semaforos[idSemaforo].manual;

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
