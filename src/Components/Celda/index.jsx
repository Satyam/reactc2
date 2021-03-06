import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import { buildId, useLongPress } from 'Utils';

import {
  useCelda,
  useShowCoords,
  useEstado,
  useBloque,
  useSetPosicion,
  useToggleRebota,
  useCondicionesFaltantes,
} from 'Store';
import Semaforo from 'Components/Semaforo';
import { LINEA, CAMBIO, PARAGOLPE, CRUCE, EMPALME } from 'Store/constantes';

import { ANCHO_CELDA, CENTRO_CELDA, ANG } from 'Components/common';
import styles from './styles.module.css';

import Linea from './Linea';
import Cambio from './Cambio';
import Paragolpe from './Paragolpe';
import Cruce from './Cruce';
import Empalme from './Empalme';
import { Despachador, Tren } from 'Components/Trenes';
import CondicionesFaltantes from 'Components/Enclavamientos';

export function ActualCelda({
  celda,
  minX,
  maxX,
  minY,
  maxY,
  cellWidth,
  padLeft,
  padTop,
}) {
  const idCelda = celda.idCelda;
  const setPosicion = useSetPosicion(idCelda);
  const toggleRebota = useToggleRebota(idCelda);
  const bloque = useBloque(celda.idBloque);
  const [showCoords] = useShowCoords();
  const { showEstado } = useEstado();
  const condicionesFaltantes = useCondicionesFaltantes(idCelda);
  const [showFaltantes, setShowFaltantes] = useState();
  const longPressProps = useLongPress({
    onClick: (ev) => {
      switch (celda.tipo) {
        case CAMBIO:
          if (condicionesFaltantes.length && !celda.manual) {
            setShowFaltantes(true);
          } else {
            setPosicion((celda.posicion + 1) % celda.ramas.length);
          }
          break;
        case PARAGOLPE:
          toggleRebota();
          break;
        default:
          break;
      }
    },
    onLongPress: (ev) => {
      showEstado({
        tipo: celda.tipo,
        idCelda,
        placement,
      });
    },
  });

  useEffect(() => {
    if (showFaltantes && !condicionesFaltantes.length) {
      setShowFaltantes(false);
    }
  }, [showFaltantes, condicionesFaltantes.length]);

  if (!cellWidth || !celda) return null;
  const placement = celda.x > (maxX - minX) / 2 ? 'left' : 'right';

  const coords = showCoords ? `[${celda.x},${celda.y}]` : '';
  const title = [];
  if (celda.nombre) {
    title.push(`Celda: ${celda.nombre}`);
  }
  title.push(`Coordenadas: [${celda.x},${celda.y}]`);

  if (bloque) {
    title.push(`Bloque: ${bloque.nombre}`);
  }
  if (celda.idTren) {
    title.push(`Con tren ${celda.idTren}`);
  }

  let Renderer;
  let dirs;

  switch (celda.tipo) {
    case LINEA:
      dirs = celda.puntas;
      Renderer = Linea;
      break;
    case CAMBIO:
      dirs = celda.ramas.concat(celda.punta);
      Renderer = Cambio;
      break;
    case PARAGOLPE:
      dirs = [celda.punta];
      Renderer = Paragolpe;
      break;
    case CRUCE:
      dirs = celda.linea1.puntas.concat(celda.linea2.puntas);
      Renderer = Cruce;
      break;
    case EMPALME:
      Renderer = Empalme;
      dirs = [];
      break;
    default:
  }

  return (
    <>
      <div
        id={idCelda}
        className={classNames(styles.rect, {
          [styles.manual]: celda.manual,
        })}
        style={{
          left: padLeft + celda.x * cellWidth,
          top: celda.y * cellWidth + padTop,
          width: cellWidth,
          height: cellWidth,
        }}
        title={title.join('\n')}
        {...longPressProps}
      >
        <svg
          viewBox={`0 0 ${ANCHO_CELDA} ${ANCHO_CELDA}`}
          width={cellWidth}
          height={cellWidth}
          className={styles.svg}
        >
          <text x="0" y="95" className={styles.text}>
            {coords}
          </text>
          {celda.nombre && (
            <text textAnchor="end" x={95} y={95} className={styles.text}>
              {celda.nombre}
            </text>
          )}
          <Renderer idCelda={idCelda} />
          {dirs.map((dir) => (
            <g
              key={dir}
              transform={`rotate(${ANG[dir]}, ${CENTRO_CELDA}, ${CENTRO_CELDA})`}
            >
              <Semaforo
                idSemaforo={buildId({
                  ...celda,
                  dir,
                })}
                placement={placement}
              />
              {!!celda.despachador && <Despachador celda={celda} dir={dir} />}
            </g>
          ))}
          {celda.idTren ? <Tren celda={celda} /> : null}
        </svg>
      </div>
      {showFaltantes && (
        <CondicionesFaltantes
          idCelda={idCelda}
          setShowFaltantes={setShowFaltantes}
        />
      )}
    </>
  );
}

export default function Celda({ idCelda, ...rest }) {
  const celda = useCelda(idCelda);
  if (celda) {
    return <ActualCelda celda={celda} {...rest} />;
  }
  return null;
}

Celda.whyDidYouRender = false;
