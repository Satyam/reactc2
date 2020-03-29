import { createAction } from '@reduxjs/toolkit';
import { selCelda } from 'Store/selectors';
import { removeTrenFromCelda, addTrenToCelda } from 'Store/actions';
import { buildId } from 'Utils';

import { LINEA, CAMBIO, TRIPLE, CRUCE, PARAGOLPE } from 'Store/data';

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

export const doDelTren = createAction('doDelTren');

export function delTren(tren) {
  return (dispatch, getState) => {
    dispatch(removeTrenFromCelda(tren.idCelda, tren.idTren));
    dispatch(doDelTren(tren.idTren));
  };
}

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
        if (newCelda.idTren) {
          throw new Error(
            `Colisión en ${newCelda.idCelda} entre ${tren.idTren} y ${newCelda.idTren}`
          );
        }
        switch (newCelda.tipo) {
          case LINEA:
            if (newCelda.puntas.includes(tren.dir)) {
              tren.dir =
                newCelda.puntas[0] === tren.dir
                  ? newCelda.puntas[1]
                  : newCelda.puntas[0];
            } else {
              debugger;
              throw new Error(
                `Tren ${tren.idTren} no encuentra vía correspondiente en celda ${newIdCelda}`
              );
            }
            break;
          case CAMBIO:
          case TRIPLE:
            if (newCelda.punta === tren.dir)
              tren.dir = newCelda.ramas[newCelda.posicion];
            else if (newCelda.ramas[newCelda.posicion] === tren.dir)
              tren.dir = newCelda.punta;
            else {
              debugger;
              throw new Error(
                `Tren ${tren.idTren} no encuentra vía correspondiente en celda ${newIdCelda}`
              );
            }
            break;
          case PARAGOLPE:
            if (newCelda.punta === tren.dir) tren.dir = null;
            else {
              debugger;
              throw new Error(
                `Tren ${tren.idTren} no encuentra vía correspondiente en celda ${newIdCelda}`
              );
            }
            break;
          case CRUCE:
            if (newCelda.linea1.puntas.includes(tren.dir)) {
              tren.dir =
                newCelda.linea1.puntas[0] === tren.dir
                  ? newCelda.linea1.puntas[1]
                  : newCelda.linea1.puntas[0];
            } else if (newCelda.linea2.puntas.includes(tren.dir)) {
              tren.dir =
                newCelda.linea2.puntas[0] === tren.dir
                  ? newCelda.linea2.puntas[1]
                  : newCelda.linea2.puntas[0];
            } else {
              debugger;
              throw new Error(
                `Tren ${tren.idTren} no encuentra vía correspondiente en celda ${newIdCelda}`
              );
            }
            break;
          default:
            break;
        }
        dispatch(addTrenToCelda(newIdCelda, tren.idTren));
        dispatch(
          doSetTren({
            ...tren,
            idCelda: newIdCelda,
          })
        );
      } else {
        dispatch(doDelTren(tren.idTren));
      }
    } else dispatch(doSetTren(tren));
  };
}
