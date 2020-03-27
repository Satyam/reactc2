import React from 'react';
import { Train } from 'Components/Icons';
import classNames from 'classnames';

import { isPlainClick } from 'Utils';
import { CENTRO_CELDA, ANG } from 'Components/common';

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

export default function Despachador({ celda, dir }) {
  const addTren = useAddTren(celda, dir);
  const onClick = ev => {
    if (isPlainClick(ev)) {
      if (celda.idTren) return;
      addTren(1);
    }
  };
  return (
    <g
      className={classNames(styles.train, { [styles.disabled]: celda.idTren })}
      onClick={onClick}
      transform={`rotate(${ANG[dir]}, ${CENTRO_CELDA}, ${CENTRO_CELDA}) translate(3,30)`}
    >
      <Train size="16px" />
      <path d="M 16,3 L 22,8 16,13 z" />
    </g>
  );
}
