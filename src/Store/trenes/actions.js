import { createAction } from '@reduxjs/toolkit';
import { selCelda, selSenal, selCurrentSector } from 'Store/selectors';
import {
  removeTrenFromCelda,
  addTrenToCelda,
  setAlarma,
  setEnclavamientos,
  setAviso,
} from 'Store/actions';
import { buildId } from 'Utils';

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
  N,
  NE,
  E,
  SE,
  S,
  SW,
  W,
  NW,
  INFO,
  WARNING,
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
      idSector: celda.idSector,
    },
  })
);

export function addTren(celda, dir, maxSpeed = 1) {
  return (dispatch) => {
    const idTren = `_tren_${id++}`;
    const { idCelda } = celda;
    dispatch(
      setAviso(INFO, idCelda, idTren, `Parte tren ${idTren} desde ${idCelda}`)
    );
    dispatch(doAddTren(celda, dir, maxSpeed, idTren));
    dispatch(addTrenToCelda(idCelda, idTren));
    dispatch(setEnclavamientos(idCelda, BLOQUE));
  };
}

export const doDelTren = createAction('doDelTren');

export function delTren(tren) {
  return (dispatch) => {
    const { idTren, idCelda } = tren;
    if (idCelda) dispatch(removeTrenFromCelda(idCelda, idTren));
    dispatch(
      setAviso(INFO, idCelda, idTren, `Borrado el tren ${idTren} en ${idCelda}`)
    );
    dispatch(doDelTren(tren.idTren));
  };
}

export function delTrenes() {
  return (dispatch, getState) => {
    selTrenes(getState()).forEach((tren) => dispatch(delTren(tren)));
  };
}

export const setTren = createAction('setTren');

function nextCoords(x, y, dir) {
  switch (dir) {
    case N:
      return [x, y - 1, S];
    case NE:
      return [x + 1, y - 1, SW];
    case E:
      return [x + 1, y, W];
    case SE:
      return [x + 1, y + 1, NW];
    case S:
      return [x, y + 1, N];
    case SW:
      return [x - 1, y + 1, NE];
    case W:
      return [x - 1, y, E];
    case NW:
      return [x - 1, y - 1, SE];
    default:
  }
}

function solveNewDir(newDir, newCelda) {
  function other({ puntas }) {
    if (puntas.includes(newDir)) {
      return puntas[0] === newDir ? puntas[1] : puntas[0];
    } else return;
  }
  switch (newCelda.tipo) {
    case LINEA:
      return other(newCelda);
    case CAMBIO:
    case TRIPLE:
      if (newCelda.punta === newDir) return newCelda.ramas[newCelda.posicion];
      else if (newCelda.ramas[newCelda.posicion] === newDir)
        return newCelda.punta;
      else return;
    case PARAGOLPE:
      if (newCelda.punta === newDir) return 'X';
      else return;
    case CRUCE:
      return other(newCelda.linea1) || other(newCelda.linea2);
    default:
      break;
  }
}

export function moveTren(idTren) {
  return (dispatch, getState) => {
    const tren = selTren(getState(), idTren);
    if (!tren) return;
    if (tren.dir === 'X') {
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
          const newPermiso = [IZQ, CENTRO, DER].reduce((permiso, luz) => {
            return luz in newSenal ? Math.min(permiso, newSenal[luz]) : permiso;
          }, ROJO);
          switch (newPermiso) {
            case ROJO:
              if (tren.speed)
                dispatch(
                  setAviso(
                    WARNING,
                    tren.idCelda,
                    idTren,
                    `Tren ${idTren} detenido en ${tren.idCelda}`
                  )
                );
              dispatch(setTren({ idTren, speed: 0 }));

              return;
            case AMARILLO:
              if (tren.speed === 0) {
                dispatch(
                  setAviso(
                    INFO,
                    tren.idCelda,
                    idTren,
                    `Tren ${idTren} reanuda la marcha en ${tren.idCelda}`
                  )
                );
                dispatch(setTren({ idTren, speed: tren.maxSpeed / 2 }));
                return;
              }
              nextSpeed = tren.maxSpeed / 2;
              break;
            case VERDE:
              if (tren.speed === 0) {
                dispatch(
                  setAviso(
                    INFO,
                    tren.idCelda,
                    idTren,
                    `Tren ${idTren} reanuda la marcha en ${tren.idCelda}`
                  )
                );
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
          return;
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
          return;
        }
        const nextDir = solveNewDir(newDir, newCelda);
        if (!nextDir) {
          dispatch(
            setAlarma(
              newCelda.idCelda,
              idTren,
              `Tren ${idTren} no encuentra vía correspondiente en celda ${newCelda.idCelda}`
            )
          );
          return;
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
  return (dispatch, getState) => {
    const idSector = selCurrentSector(getState());
    return Promise.all(
      selTrenes(getState(), idSector).map((tren) =>
        dispatch(moveTren(tren.idTren))
      )
    );
  };
}
