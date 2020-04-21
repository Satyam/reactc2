import React from 'react';
import { useCelda, useBloqueOcupado } from 'Store';
import Tramo from './Tramo';
import { CENTRO_CELDA, ANCHO_CELDA, ANG } from 'Components/common';

import styles from './styles.module.css';
export default function Paragolpe({ idCelda }) {
  const celda = useCelda(idCelda);
  const ocupado = useBloqueOcupado(celda.idBloque) || celda.idTren;
  return (
    <g>
      <Tramo
        dir={celda.punta}
        estilo={ocupado ? 'tramo-ocupado' : 'tramo-normal'}
      />
      <circle
        cx={CENTRO_CELDA}
        cy={CENTRO_CELDA}
        r={ANCHO_CELDA / 10}
        fill={ocupado ? 'yellow' : 'black'}
      />
      {celda.rebota && (
        <line
          x1={CENTRO_CELDA + ANCHO_CELDA / 6}
          y1={CENTRO_CELDA - ANCHO_CELDA / 10}
          x2={CENTRO_CELDA + ANCHO_CELDA / 6}
          y2={CENTRO_CELDA + ANCHO_CELDA / 10}
          className={styles.rebota}
          transform={`rotate(${
            ANG[celda.punta] + 180
          }, ${CENTRO_CELDA}, ${CENTRO_CELDA})`}
        />
      )}
    </g>
  );
}
