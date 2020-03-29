import React from 'react';

import { isPlainClick } from 'Utils';
import { CENTRO_CELDA, ANG } from 'Components/common';
import { CAMBIO, TRIPLE } from 'Store/data';
import { useAddTren } from 'Store';

import styles from './styles.module.css';

// const WIDTH = 16;

// const X = {
//   N: CENTRO_CELDA - WIDTH,
//   NE: 0,
//   E: 0,
//   SE: 0,
//   S: CENTRO_CELDA,
//   SW: ANCHO_CELDA - WIDTH,
//   W: ANCHO_CELDA - WIDTH,
//   NW: ANCHO_CELDA - WIDTH,
// };

// const Y = {
//   N: ANCHO_CELDA - WIDTH,
//   NE: ANCHO_CELDA - WIDTH,
//   E: CENTRO_CELDA,
//   SE: 0,
//   S: 0,
//   SW: 0,
//   W: CENTRO_CELDA,
//   NW: ANCHO_CELDA - WIDTH,
// };

export default function Despachador({ celda }) {
  const addTren = useAddTren(celda);
  const despacha = dir => ev => {
    if (isPlainClick(ev)) {
      if (celda.idTren) return;
      addTren(dir);
    }
  };

  let dirs = [];

  if (!celda.idTren) {
    switch (celda.tipo) {
      case TRIPLE:
      case CAMBIO:
        celda.despachador.forEach(dir => {
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
        {dirs.map(dir => {
          return (
            <g
              className={styles.flechaDespachador}
              onClick={despacha(dir)}
              key={dir}
              transform={`rotate(${ANG[dir]}, ${CENTRO_CELDA}, ${CENTRO_CELDA})`}
            >
              <path
                d="M 15,-8 L 23,0 15,8 z"
                transform={`translate(${CENTRO_CELDA},${CENTRO_CELDA})`}
              />
            </g>
          );
        })}
      </>
    )
  );
}
