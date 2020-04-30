import { createSelector } from '@reduxjs/toolkit';
import { CAMBIO, SEMAFORO } from 'Store/data';
import { currentSector } from 'Store/options';

export const selAutomatizaciones = createSelector(
  (state) => state.automatizaciones,
  currentSector.selector,
  (automatizaciones, idSector) =>
    Object.values(automatizaciones)
      .filter((e) => e.idSector === idSector)
      .sort((a, b) => {
        if (a.tipo === CAMBIO && b.tipo === SEMAFORO) return -1;
        if (a.tipo === SEMAFORO && b.tipo === CAMBIO) return 1;
        return 0;
      })
);

export const selAutomatizacion = (state, idOrigen) =>
  state.automatizaciones[idOrigen];
