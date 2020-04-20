import React from 'react';
import classNames from 'classnames';

import { isPlainClick, buildId, useLongPress } from 'Utils';

import {
  useCelda,
  useShowCoords,
  useEstado,
  useBloque,
  useSetPosicion,
} from 'Store';
import Senal from 'Components/Senal';
import { CAMBIO, TRIPLE, NORMAL, DESVIADO, IZQ, CENTRO, DER } from 'Store/data';

import { ANCHO_CELDA, DIR } from 'Components/common';
import styles from './styles.module.css';

import Linea from './Linea';
import Cambio from './Cambio';
import Triple from './Triple';
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
  const bloque = useBloque(celda.idBloque);
  const [showCoords] = useShowCoords();
  const { showEstado } = useEstado();
  const longPressProps = useLongPress({
    onClick: (ev) => {
      if (isPlainClick(ev)) {
        switch (celda.tipo) {
          case CAMBIO:
            setPosicion(celda.posicion === NORMAL ? DESVIADO : NORMAL);
            break;
          case TRIPLE:
            switch (celda.posicion) {
              case IZQ:
                setPosicion(CENTRO);
                break;
              case CENTRO:
                setPosicion(DER);
                break;
              case DER:
                setPosicion(IZQ);
                break;

              default:
            }
            break;
          default:
            break;
        }
      }
    },
    onLongPress: (ev) => {
      if (isPlainClick(ev)) {
        showEstado({
          tipo: celda.tipo,
          idCelda,
          placement,
        });
      }
    },
  });

  if (!cellWidth || !celda) return null;
  const placement = celda.x > cellsAcross / 2 ? 'left' : 'right';

  const label = celda.desc || (showCoords ? `[${celda.x},${celda.y}]` : '');
  const title = [];
  if (celda.descr) {
    title.push(`Celda: ${celda.descr}`);
  }
  title.push(`Coordenadas: [${celda.x},${celda.y}]`);

  if (bloque) {
    title.push(`Bloque: ${bloque.descr}`);
  }
  if (celda.idTren) {
    title.push(`Con tren ${celda.idTren}`);
  }

  const Renderer = {
    linea: Linea,
    cambio: Cambio,
    paragolpe: Paragolpe,
    cruce: Cruce,
    triple: Triple,
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
          {label}
        </text>
        {bloque && (
          <text textAnchor="end" x={95} y={95} className={styles.text}>
            {bloque.descr}
          </text>
        )}
        <Renderer idCelda={idCelda} />
        {DIR.map((dir) => (
          <Senal
            key={dir}
            idSenal={buildId({
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
