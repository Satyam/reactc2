import React from 'react';
import { Train } from 'Components/Icons';

import { CENTRO_CELDA } from 'Components/common';
import styles from './styles.module.css';

export default function Tren({ celda }) {
  return (
    <g transform={`translate(${CENTRO_CELDA - 8}, ${CENTRO_CELDA - 8})`}>
      <circle cx={8} cy={8} r={9} className={styles.tren}>
        <title>{celda.idTren}</title>
      </circle>
      <Train size="16px" />
    </g>
  );
}
