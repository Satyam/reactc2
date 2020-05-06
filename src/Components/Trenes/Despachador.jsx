import React from 'react';

import { isPlainClick, holdPropagation } from 'Utils';
import { CENTRO_CELDA } from 'Components/common';
import { CAMBIO } from 'Store/constantes';
import { useAddTren, useBloqueOcupado } from 'Store';

import styles from './styles.module.css';

function ActualDespachador({ celda, dir }) {
  const addTren = useAddTren();
  const bloqueOcupado = useBloqueOcupado(celda.idBloque);
  const despacha = (ev) => {
    if (isPlainClick(ev)) {
      if (celda.idTren) return;
      addTren(celda, dir);
    }
  };
  return (
    <>
      <circle
        cx={CENTRO_CELDA}
        cy={CENTRO_CELDA}
        r={9}
        className={styles.trenDespachador}
      />
      {!bloqueOcupado && (
        <g
          className={styles.flechaDespachador}
          onClick={despacha}
          {...holdPropagation}
        >
          <path
            d="M 11,-12 L 29,0 11,12 z"
            transform={`translate(${CENTRO_CELDA},${CENTRO_CELDA})`}
          />
        </g>
      )}
    </>
  );
}

export default function Despachador({ celda, dir }) {
  return Array.isArray(celda.despachador) &&
    celda.despachador.includes(dir) &&
    !celda.idTren &&
    (celda.tipo !== CAMBIO ||
      celda.punta === dir ||
      celda.ramas[celda.posicion] === dir) ? (
    <ActualDespachador celda={celda} dir={dir} />
  ) : null;
}
