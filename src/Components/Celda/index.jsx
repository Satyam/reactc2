import React from 'react';
import classNames from 'classnames';

import { buildId, useLongPress } from 'Utils';

import {
  useCelda,
  useShowCoords,
  useEstado,
  useBloque,
  useSetPosicion,
  useToggleRebota,
} from 'Store';
import Semaforo from 'Components/Semaforo';
import { CAMBIO, PARAGOLPE } from 'Store/data';

import { ANCHO_CELDA, DIR } from 'Components/common';
import styles from './styles.module.css';

import Linea from './Linea';
import Cambio from './Cambio';
import Paragolpe from './Paragolpe';
import Cruce from './Cruce';
import { Despachador, Tren } from 'Components/Trenes';

export default function Celda({
  idCelda,
  cellsAcross,
  cellWidth,
  padLeft,
  padTop,
}) {
  const celda = useCelda(idCelda);
  const setPosicion = useSetPosicion(idCelda);
  const toggleRebota = useToggleRebota(idCelda);
  const bloque = useBloque(celda.idBloque);
  const [showCoords] = useShowCoords();
  const { showEstado } = useEstado();
  const longPressProps = useLongPress({
    onClick: (ev) => {
      switch (celda.tipo) {
        case CAMBIO:
          setPosicion((celda.posicion + 1) % celda.ramas.length);
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

  if (!cellWidth || !celda) return null;
  const placement = celda.x > cellsAcross / 2 ? 'left' : 'right';

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

  const Renderer = {
    linea: Linea,
    cambio: Cambio,
    paragolpe: Paragolpe,
    cruce: Cruce,
  }[celda.tipo];
  return (
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
        {DIR.map((dir) => (
          <Semaforo
            key={dir}
            idSemaforo={buildId({
              ...celda,
              dir,
            })}
            placement={placement}
          />
        ))}
        {Array.isArray(celda.despachador) && <Despachador celda={celda} />}
        {celda.idTren ? <Tren celda={celda} /> : null}
      </svg>
    </div>
  );
}

Celda.whyDidYouRender = false;
