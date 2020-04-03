import React, { useEffect, useState } from 'react';
import { Train } from 'Components/Icons';

import { useTren, usePlay } from 'Store';

import { CENTRO_CELDA } from 'Components/common';
import styles from './styles.module.css';

const FACTOR_VEL = 1000;

export default function Tren({ celda }) {
  const [tren, moveTren] = useTren(celda.idTren);
  const [timer, setTimer] = useState();
  const [isPlaying] = usePlay();

  useEffect(() => {
    if (!tren) return;
    if (isPlaying) {
      const speed = tren.speed;
      if (speed === 0) return;
      const long = celda.longitud || 1;
      const t = (speed ? long / speed : 5) * FACTOR_VEL;
      if (timer) clearTimeout(timer);
      setTimer(
        setTimeout(() => {
          console.log('move', t, tren.x);
          moveTren();
        }, t)
      );
    } else {
      if (timer) clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [celda, tren, isPlaying]);

  return (
    <g transform={`translate(${CENTRO_CELDA - 8}, ${CENTRO_CELDA - 8})`}>
      <circle cx={8} cy={8} r={9} className={styles.tren}>
        <title>{celda.idTren}</title>
      </circle>
      <Train size="16px" />
    </g>
  );
}
