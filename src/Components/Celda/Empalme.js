import React from 'react';
import Tramo from './Tramo';
import { useCelda } from 'Store';
import { buildId, nombreEntity } from 'Utils';
import { CENTRO_CELDA } from 'Components/common';
import styles from './styles.module.css';

export default function Empalme({ idCelda }) {
  const celda = useCelda(idCelda);
  const otraCelda = useCelda(
    buildId({
      idSector: celda.idSector,
      x: celda.otro.x,
      y: celda.otro.y,
    })
  );
  return (
    <g>
      <text
        x={CENTRO_CELDA}
        y={CENTRO_CELDA - 5}
        textAnchor="middle"
        className={styles.empalme}
      >
        Continúa en:
      </text>
      <text
        x={CENTRO_CELDA}
        y={CENTRO_CELDA + 15}
        textAnchor="middle"
        className={styles.empalme}
      >
        {nombreEntity(otraCelda)}
      </text>
      <Tramo dir={celda.punta} estilo={'tramo-empalme'} />
    </g>
  );
}
