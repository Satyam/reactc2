import { createAction } from '@reduxjs/toolkit';
import { selCelda, selSenal } from 'Store/selectors';
import {
  removeTrenFromCelda,
  addTrenToCelda,
  setAlarma,
  setEnclavamientos,
} from 'Store/actions';
import { buildId, nextCoords } from 'Utils';

import {
  LINEA,
  CAMBIO,
  TRIPLE,
  CRUCE,
  PARAGOLPE,
  IZQ,
  CENTRO,
  DER,
  ROJO,
  AMARILLO,
  VERDE,
} from 'Store/data';
import { selTren, selTrenes, selBloqueOcupado } from 'Store/selectors';
import { BLOQUE } from '../data/constantes';

let id = 0;
export const doAddTren = createAction(
  'addTren',
  (celda, dir, maxSpeed, idTren) => ({
    payload: {
      idCelda: celda.idCelda,
      x: celda.x,
      y: celda.y,
      dir,
      speed: maxSpeed,
      maxSpeed,
      idTren,
    },
  })
);

export function addTren(celda, dir, maxSpeed = 1) {
  return (dispatch) => {
    const idTren = `_tren_${id++}`;
    dispatch(doAddTren(celda, dir, maxSpeed, idTren));
    dispatch(addTrenToCelda(celda.idCelda, idTren));
    dispatch(setEnclavamientos(celda.idCelda, BLOQUE));
  };
}

export const doDelTren = createAction('doDelTren');

export function delTren(tren) {
  return (dispatch) => {
    if (tren.idCelda) dispatch(removeTrenFromCelda(tren.idCelda, tren.idTren));
    dispatch(doDelTren(tren.idTren));
  };
}

export function delTrenes() {
  return (dispatch, getState) => {
    selTrenes(getState()).forEach((tren) => dispatch(delTren(tren)));
  };
}

export const setTren = createAction('setTren');

export function moveTren(idTren) {
  return (dispatch, getState) => {
    const tren = selTren(getState(), idTren);
    if (!tren) return;
    if (!tren.dir) {
      return dispatch(delTren(tren));
    }

    const oldCelda = selCelda(getState(), tren.idCelda);
    if (tren.falta) {
      dispatch(
        setTren({
          idTren,
          falta: tren.speed > tren.falta ? 0 : tren.falta - tren.speed,
        })
      );
      return;
    }
    const [newX, newY, newDir] = nextCoords(tren.x, tren.y, tren.dir);
    let nextDir = newDir;
    let nextSpeed = tren.speed;

    if (oldCelda.x !== newX || oldCelda.y !== newY) {
      const newIdCelda = buildId({
        idSector: oldCelda.idSector,
        x: newX,
        y: newY,
      });
      const newIdSenal = buildId({
        idSector: oldCelda.idSector,
        x: newX,
        y: newY,
        dir: newDir,
      });
      const newCelda = selCelda(getState(), newIdCelda);

      if (newCelda) {
        const newSenal = selSenal(getState(), newIdSenal);
        if (newSenal) {
          debugger;
          const newPermiso = [IZQ, CENTRO, DER].reduce((permiso, luz) => {
            return luz in newSenal ? Math.min(permiso, newSenal[luz]) : permiso;
          }, ROJO);
          switch (newPermiso) {
            case ROJO:
              dispatch(setTren({ idTren, speed: 0 }));
              return;
            case AMARILLO:
              if (tren.speed === 0) {
                dispatch(setTren({ idTren, speed: tren.maxSpeed / 2 }));
                return;
              }
              nextSpeed = tren.maxSpeed / 2;
              break;
            case VERDE:
              if (tren.speed === 0) {
                dispatch(setTren({ idTren, speed: tren.maxSpeed }));
                return;
              }
              nextSpeed = tren.maxSpeed;
              break;
            default:
              throw new Error(
                `Señal ${newIdSenal} dá señal imposible ${newPermiso}`
              );
          }
        }

        if (newCelda.idTren) {
          dispatch(
            setAlarma(
              newIdCelda,
              idTren,
              `Colisión en ${newCelda.idCelda} entre ${idTren} y ${newCelda.idTren}`
            )
          );
        }
        const trenEnBloque = selBloqueOcupado(getState(), newCelda.idBloque);
        if (trenEnBloque && trenEnBloque !== idTren) {
          dispatch(
            setAlarma(
              newIdCelda,
              idTren,
              `Tren ${idTren} invade el bloque ${newCelda.idBloque} ocupado por ${trenEnBloque}`
            )
          );
        }
        switch (newCelda.tipo) {
          case LINEA:
            if (newCelda.puntas.includes(newDir)) {
              nextDir =
                newCelda.puntas[0] === newDir
                  ? newCelda.puntas[1]
                  : newCelda.puntas[0];
            } else {
              dispatch(
                setAlarma(
                  newIdCelda,
                  idTren,
                  `Tren ${idTren} no encuentra vía correspondiente en celda ${newIdCelda}`
                )
              );
            }
            break;
          case CAMBIO:
          case TRIPLE:
            if (newCelda.punta === newDir)
              nextDir = newCelda.ramas[newCelda.posicion];
            else if (newCelda.ramas[newCelda.posicion] === newDir)
              nextDir = newCelda.punta;
            else {
              dispatch(
                setAlarma(
                  newIdCelda,
                  idTren,
                  `Tren ${idTren} no encuentra vía correspondiente en celda ${newIdCelda}`
                )
              );
            }
            break;
          case PARAGOLPE:
            if (newCelda.punta === newDir) nextDir = null;
            else {
              dispatch(
                setAlarma(
                  newIdCelda,
                  idTren,
                  `Tren ${idTren} no encuentra vía correspondiente en celda ${newIdCelda}`
                )
              );
            }
            break;
          case CRUCE:
            if (newCelda.linea1.puntas.includes(newDir)) {
              nextDir =
                newCelda.linea1.puntas[0] === newDir
                  ? newCelda.linea1.puntas[1]
                  : newCelda.linea1.puntas[0];
            } else if (newCelda.linea2.puntas.includes(newDir)) {
              nextDir =
                newCelda.linea2.puntas[0] === newDir
                  ? newCelda.linea2.puntas[1]
                  : newCelda.linea2.puntas[0];
            } else {
              dispatch(
                setAlarma(
                  newIdCelda,
                  idTren,
                  `Tren ${idTren} no encuentra vía correspondiente en celda ${newIdCelda}`
                )
              );
            }
            break;
          default:
            break;
        }
        dispatch(removeTrenFromCelda(oldCelda.idCelda, idTren));
        dispatch(addTrenToCelda(newIdCelda, idTren));
        dispatch(
          setTren({
            idTren,
            dir: nextDir,
            x: newX,
            y: newY,
            speed: nextSpeed,
            idCelda: newIdCelda,
            falta: newCelda.longitud || 1,
          })
        );
      } else {
        dispatch(delTren(tren));
      }
    } else dispatch(setTren(tren));
    dispatch(setEnclavamientos(tren.idCelda, BLOQUE));
  };
}

export function moveTrenes() {
  return (dispatch, getState) =>
    selTrenes(getState()).forEach((tren) => {
      window.requestAnimationFrame(() => dispatch(moveTren(tren.idTren)));
    });
}
