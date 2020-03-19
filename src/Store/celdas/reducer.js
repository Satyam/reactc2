import { createReducer } from '@reduxjs/toolkit';
import { celdas } from 'Store/data';
import { plainSetCambio, setCambioManual } from './actions';
import { buildIdCelda } from 'Utils/buildKeys';

export default createReducer(
  {},
  {
    [plainSetCambio]: (state, action) => {
      const { idCelda, posicion } = action.payload;
      state[idCelda].posicion = posicion;
    },
    [setCambioManual]: (state, action) => {
      const { idCelda, manual } = action.payload;
      state[idCelda].manual = manual;
    },
    '@@INIT': () =>
      celdas.reduce((cs, c) => {
        const idCelda = buildIdCelda(c.idSector, c.x, c.y);
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
      }, {}),
  }
);
