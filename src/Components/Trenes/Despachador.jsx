import React from 'react';

import { isPlainClick } from 'Utils';
import { CENTRO_CELDA, ANG } from 'Components/common';
import { CAMBIO } from 'Store/data';
import { useAddTren, useBloqueOcupado } from 'Store';

import styles from './styles.module.css';

export default function Despachador({ celda }) {
  const addTren = useAddTren();
  const bloqueOcupado = useBloqueOcupado(celda.idBloque);
  const despacha = (dir) => (ev) => {
    if (isPlainClick(ev)) {
      if (celda.idTren) return;
      addTren(celda, dir);
    }
  };

  let dirs = [];

  if (!(celda.idTren || bloqueOcupado)) {
    switch (celda.tipo) {
      case CAMBIO:
        celda.despachador.forEach((dir) => {
          if (dir === celda.punta) dirs.push(dir);
          if (dir === celda.ramas[celda.posicion]) dirs.push(dir);
        });
        break;
      default:
        dirs = celda.despachador;
        break;
    }
  }
  return (
    !celda.idTren && (
      <>
        <circle
          cx={CENTRO_CELDA}
          cy={CENTRO_CELDA}
          r={9}
          className={styles.trenDespachador}
        />
        {celda.rebota && (
          <circle cx={CENTRO_CELDA} cy={CENTRO_CELDA} r={5} fill={'gray'} />
        )}
        {dirs.map((dir) => {
          return (
            <g
              className={styles.flechaDespachador}
              onClick={despacha(dir)}
              key={dir}
              transform={`rotate(${ANG[dir]}, ${CENTRO_CELDA}, ${CENTRO_CELDA})`}
            >
              <path
                d="M 11,-12 L 29,0 11,12 z"
                transform={`translate(${CENTRO_CELDA},${CENTRO_CELDA})`}
              />
            </g>
          );
        })}
      </>
    )
  );
}
