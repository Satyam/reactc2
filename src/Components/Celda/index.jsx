import React from 'react';
import classNames from 'classnames';

import { isPlainClick } from 'Utils';

import { useCelda, useShowCoords, useEstado } from 'Store';
import Senal from 'Components/Senal';

import { ANCHO_CELDA, DIR } from 'Components/common';
import styles from './styles.module.css';

import Linea from './Linea';
import Cambio from './Cambio';
import Triple from './Triple';
import Paragolpe from './Paragolpe';
import Cruce from './Cruce';
import { Despachador, Tren } from 'Components/Trenes';

export default function Celda({ idCelda, cellsAcross, cellWidth, padLeft }) {
  const celda = useCelda(idCelda);
  const [showCoords] = useShowCoords();
  const { showEstado } = useEstado();
  if (!cellWidth || !celda) return null;
  const placement = celda.x > cellsAcross / 2 ? 'left' : 'right';

  const onClick = tipo => ev =>
    isPlainClick(ev) &&
    showEstado({
      tipo,
      idCelda,
      placement,
    });

  const label = celda.descr || (showCoords ? `[${celda.x},${celda.y}]` : '');
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
        top: celda.y * cellWidth,
        width: cellWidth,
        height: cellWidth,
      }}
      onClick={onClick(celda.tipo)}
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
        <Renderer idCelda={idCelda} />
        {DIR.map(dir => (
          <Senal
            key={dir}
            idSenal={`${idCelda}_${dir}`}
            placement={placement}
          />
        ))}
        {Array.isArray(celda.despachador) && <Despachador celda={celda} />}
        {celda.idTren ? <Tren celda={celda} /> : null}
      </svg>
    </div>
  );
}

Celda.whyDidYouRender = true;
