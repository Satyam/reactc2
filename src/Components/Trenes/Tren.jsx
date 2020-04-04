import React from 'react';
import { Train } from 'Components/Icons';
import { useTren } from 'Store';

import { CENTRO_CELDA } from 'Components/common';
import styles from './styles.module.css';

export default function Tren({ celda }) {
  const tren = useTren(celda.idTren);
  let color = 'gray';
  switch (tren.speed) {
    case 0:
      color = 'red';
      break;
    case 1:
      color = 'black';
      break;
    default:
      break;
  }
  return (
    <g transform={`translate(${CENTRO_CELDA - 8}, ${CENTRO_CELDA - 8})`}>
      <circle cx={8} cy={8} r={9} className={styles.tren}>
        <title>{`${celda.idTren}\nVelocidad: ${tren.speed}\nFalta: ${tren.falta}`}</title>
      </circle>
      <Train color={color} size="16px" />
    </g>
  );
}
