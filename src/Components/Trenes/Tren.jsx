import React from 'react';
import { Train } from 'Components/Icons';
import { useTren } from 'Store';

import { CENTRO_CELDA } from 'Components/common';
import styles from './styles.module.css';

export default function Tren({ celda }) {
  const tren = useTren(celda.idTren);
  const relSpeed = tren.speed / (tren.maxSpeed || 1);

  return (
    <g transform={`translate(${CENTRO_CELDA - 8}, ${CENTRO_CELDA - 8})`}>
      <circle cx={8} cy={8} r={9} className={styles.tren}>
        <title>{`${celda.idTren}\nVelocidad: ${tren.speed}\nFalta: ${tren.falta}`}</title>
      </circle>
      <path
        d="M 8 0 A 8 8 90 1 0 8 16 z"
        className={
          relSpeed && relSpeed !== 1 ? styles.halfSpeed : styles.transparent
        }
      />
      <Train color={relSpeed ? 'black' : 'red'} size="16px" />
    </g>
  );
}
