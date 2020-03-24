import { createReducer } from '@reduxjs/toolkit';
import { celdas } from 'Store/data';
import { loadData, plainSetCambio, setCambioManual } from 'Store/actions';
import { buildId } from 'Utils';

export default createReducer(
  {},
  {
    [loadData]: state =>
      celdas.reduce((cs, c) => {
        const idCelda = buildId(c);
        if (cs[idCelda])
          throw new Error(
            `Definición de celda en [${c.x},${c.y}] de ${c.idSector} repetida.`
          );
        return {
          ...cs,
          [idCelda]: {
            ...c,
            idCelda,
            posicion: c.posicionInicial,
          },
        };
      }, state),
    [plainSetCambio]: (state, action) => {
      const { idCelda, posicion } = action.payload;
      state[idCelda].posicion = posicion;
    },
    [setCambioManual]: (state, action) => {
      const { idCelda, manual } = action.payload;
      state[idCelda].manual = manual;
    },
  }
);
