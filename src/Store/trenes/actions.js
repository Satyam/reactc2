import { createAction } from '@reduxjs/toolkit';
import { selCelda } from 'Store/selectors';
import { removeTrenFromCelda, addTrenToCelda, setAlarma } from 'Store/actions';
import { buildId } from 'Utils';

import { LINEA, CAMBIO, TRIPLE, CRUCE, PARAGOLPE } from 'Store/data';
import { selTrenes, selBloqueOcupado } from 'Store/selectors';

let id = 0;
export const doAddTren = createAction(
  'addTren',
  (celda, dir, maxSpeed, idTren) => ({
    payload: {
      idCelda: celda.idCelda,
      x: celda.x,
      y: celda.y,
      dir,
      maxSpeed,
      idTren,
    },
  })
);

export function addTren(celda, dir, maxSpeed) {
  return dispatch => {
    const idTren = `_tren_${id++}`;
    dispatch(doAddTren(celda, dir, maxSpeed, idTren));
    dispatch(addTrenToCelda(celda.idCelda, idTren));
  };
}

export const doDelTren = createAction('doDelTren');

export function delTren(tren) {
  return dispatch => {
    if (tren.idCelda) dispatch(removeTrenFromCelda(tren.idCelda, tren.idTren));
    dispatch(doDelTren(tren.idTren));
  };
}

export function delTrenes() {
  return (dispatch, getState) => {
    selTrenes(getState()).forEach(tren => dispatch(delTren(tren)));
  };
}

export const doSetTren = createAction('doSetTren');

export function setTren(tren) {
  return (dispatch, getState) => {
    const oldCelda = selCelda(getState(), tren.idCelda);
    if (oldCelda.x !== tren.x || oldCelda.y !== tren.y) {
      const newIdCelda = buildId({
        idSector: oldCelda.idSector,
        x: tren.x,
        y: tren.y,
      });
      const newCelda = selCelda(getState(), newIdCelda);

      if (newCelda) {
        const trenEnBloque = selBloqueOcupado(getState(), newCelda.idBloque);
        if (newCelda.idTren || (trenEnBloque && trenEnBloque !== tren.idTren)) {
          dispatch(
            setAlarma(
              newIdCelda,
              tren.idTren,
              `Colisión en ${newCelda.idCelda} entre ${tren.idTren} y ${newCelda.idTren}`
            )
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
              dispatch(
                setAlarma(
                  newIdCelda,
                  tren.idTren,
                  `Tren ${tren.idTren} no encuentra vía correspondiente en celda ${newIdCelda}`
                )
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
              dispatch(
                setAlarma(
                  newIdCelda,
                  tren.idTren,
                  `Tren ${tren.idTren} no encuentra vía correspondiente en celda ${newIdCelda}`
                )
              );
            }
            break;
          case PARAGOLPE:
            if (newCelda.punta === tren.dir) tren.dir = null;
            else {
              dispatch(
                setAlarma(
                  newIdCelda,
                  tren.idTren,
                  `Tren ${tren.idTren} no encuentra vía correspondiente en celda ${newIdCelda}`
                )
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
              dispatch(
                setAlarma(
                  newIdCelda,
                  tren.idTren,
                  `Tren ${tren.idTren} no encuentra vía correspondiente en celda ${newIdCelda}`
                )
              );
            }
            break;
          default:
            break;
        }
        dispatch(removeTrenFromCelda(oldCelda.idCelda, tren.idTren));
        dispatch(addTrenToCelda(newIdCelda, tren.idTren));
        dispatch(
          doSetTren({
            ...tren,
            idCelda: newIdCelda,
          })
        );
      } else {
        dispatch(delTren(tren));
      }
    } else dispatch(doSetTren(tren));
  };
}
