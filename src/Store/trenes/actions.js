import { createAction } from '@reduxjs/toolkit';
import { selCelda, selSemaforo } from 'Store/selectors';
import {
  removeTrenFromCelda,
  addTrenToCelda,
  setAlarma,
  runAutomatizaciones,
  setAviso,
} from 'Store/actions';
import { currentSector } from '../options';
import { buildId, nombreEntity } from 'Utils';

import {
  LINEA,
  CAMBIO,
  CRUCE,
  PARAGOLPE,
  IZQ,
  CENTRO,
  DER,
  ALTO,
  PRECAUCION,
  LIBRE,
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

let id = 100;
export const doAddTren = createAction(
  'addTren',
  (celda, dir, maxSpeed, idTren, numero) => ({
    payload: {
      idCelda: celda.idCelda,
      x: celda.x,
      y: celda.y,
      dir,
      speed: maxSpeed,
      maxSpeed,
      idTren,
      idSector: celda.idSector,
      numero,
    },
  })
);

export function addTren(celda, dir, maxSpeed = 1) {
  return (dispatch) => {
    const numero = id;
    id += 2;
    const idTren = `_tren_${numero}`;
    const { idCelda } = celda;
    dispatch(
      setAviso(
        INFO,
        idCelda,
        numero,
        `Parte tren ${numero} desde ${nombreEntity(celda)}`
      )
    );
    dispatch(doAddTren(celda, dir, maxSpeed, idTren, numero));
    dispatch(addTrenToCelda(idCelda, idTren));
    dispatch(runAutomatizaciones());
  };
}

export const doDelTren = createAction('doDelTren');

export function delTren(tren) {
  return (dispatch, getState) => {
    const { idTren, idCelda, numero } = tren;
    const celda = selCelda(getState(), idCelda);
    if (idCelda) dispatch(removeTrenFromCelda(idCelda, idTren));
    dispatch(
      setAviso(
        INFO,
        idCelda,
        numero,
        `Borrado el tren ${numero} en ${nombreEntity(celda)}`
      )
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
      if (newCelda.punta === newDir) return newCelda.ramas[newCelda.posicion];
      else if (newCelda.ramas[newCelda.posicion] === newDir)
        return newCelda.punta;
      else return;
    case PARAGOLPE:
      if (newCelda.rebota) return newCelda.punta;
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
      const newIdSemaforo = buildId({
        idSector: oldCelda.idSector,
        x: newX,
        y: newY,
        dir: newDir,
      });
      const newCelda = selCelda(getState(), newIdCelda);

      if (newCelda) {
        const newSemaforo = selSemaforo(getState(), newIdSemaforo);
        if (newSemaforo) {
          const newPermiso = [IZQ, CENTRO, DER].reduce((permiso, senal) => {
            return senal in newSemaforo
              ? Math.min(permiso, newSemaforo[senal])
              : permiso;
          }, ALTO);
          switch (newPermiso) {
            case ALTO:
              if (tren.speed)
                dispatch(
                  setAviso(
                    WARNING,
                    tren.idCelda,
                    tren.numero,
                    `Tren ${tren.numero} detenido en ${nombreEntity(oldCelda)}`
                  )
                );
              dispatch(setTren({ idTren, speed: 0 }));

              return;
            case PRECAUCION:
              if (tren.speed === 0) {
                dispatch(
                  setAviso(
                    INFO,
                    tren.idCelda,
                    tren.numero,
                    `Tren ${tren.numero} reanuda la marcha en ${nombreEntity(
                      oldCelda
                    )}`
                  )
                );
                dispatch(setTren({ idTren, speed: tren.maxSpeed / 2 }));
                return;
              }
              nextSpeed = tren.maxSpeed / 2;
              break;
            case LIBRE:
              if (tren.speed === 0) {
                dispatch(
                  setAviso(
                    INFO,
                    tren.idCelda,
                    tren.numero,
                    `Tren ${tren.numero} reanuda la marcha en ${nombreEntity(
                      oldCelda
                    )}`
                  )
                );
                dispatch(setTren({ idTren, speed: tren.maxSpeed }));
                return;
              }
              nextSpeed = tren.maxSpeed;
              break;
            default:
              throw new Error(
                `Semáforo ${newIdSemaforo} dá semáforo imposible ${newPermiso}`
              );
          }
        }

        if (newCelda.idTren) {
          const newTren = selTren(getState(), newCelda.idTren);
          dispatch(
            setAlarma(
              newIdCelda,
              tren.numero,
              `Colisión en ${nombreEntity(newCelda)} entre trenes ${
                tren.numero
              } y ${newTren.numero}`
            )
          );
          return;
        }
        const trenEnBloque = selBloqueOcupado(getState(), newCelda.idBloque);
        if (trenEnBloque && trenEnBloque !== idTren) {
          const newTren = selTren(getState(), trenEnBloque);
          dispatch(
            setAlarma(
              newIdCelda,
              tren.numero,
              `Tren ${tren.numero} invade el bloque ${newCelda.idBloque} ocupado por el tren ${newTren.numero}`
            )
          );
          return;
        }
        const nextDir = solveNewDir(newDir, newCelda);
        if (!nextDir) {
          dispatch(
            setAlarma(
              newCelda.idCelda,
              tren.numero,
              `Tren ${
                tren.numero
              } no encuentra vía correspondiente en celda ${nombreEntity(
                newCelda
              )}`
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
    dispatch(runAutomatizaciones());
  };
}

export function moveTrenes() {
  return (dispatch, getState) => {
    const idSector = currentSector.selector(getState());
    return Promise.all(
      selTrenes(getState(), idSector).map((tren) =>
        dispatch(moveTren(tren.idTren))
      )
    );
  };
}
