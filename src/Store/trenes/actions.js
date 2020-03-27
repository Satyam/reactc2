import { createAction } from '@reduxjs/toolkit';
import { selCelda } from 'Store/selectors';
import { removeTrenFromCelda, addTrenToCelda } from 'Store/actions';
import { buildId } from 'Utils';

let id = 0;
export const addTren = createAction('addTren', (celda, dir, maxSpeed) => ({
  payload: {
    idCelda: celda.idCelda,
    x: celda.x,
    y: celda.y,
    dir,
    maxSpeed,
    idTren: `_tren_${id++}`,
  },
}));
export const delTren = createAction('delTren');

export const doSetTren = createAction('doSetTren');

export function setTren(tren) {
  return async (dispatch, getState) => {
    const oldCelda = selCelda(getState(), tren.idCelda);
    if (oldCelda.x !== tren.x || oldCelda.y !== tren.y) {
      dispatch(removeTrenFromCelda(oldCelda.idCelda, tren.idTren));
      const newIdCelda = buildId({
        idSector: oldCelda.idSector,
        x: tren.x,
        y: tren.y,
      });
      const newCelda = selCelda(getState(), newIdCelda);
      if (newCelda) {
        dispatch(addTrenToCelda(newIdCelda, tren.idTren));
        dispatch(
          doSetTren({
            ...tren,
            idCelda: newIdCelda,
          })
        );
      } else {
        dispatch(delTren(tren.idTren));
      }
    } else dispatch(doSetTren(tren));
  };
}
