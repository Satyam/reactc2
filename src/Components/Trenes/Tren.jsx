import React, { useEffect, useState } from 'react';

import { useTren } from 'Store';

import { CENTRO_CELDA } from 'Components/common';
import styles from './styles.module.css';
import { nextCoords } from 'Utils';

const FACTOR_VEL = 1000;

export default function Tren({ celda }) {
  const [tren, setTren] = useTren(celda.idTren);
  const [timer, setTimer] = useState();
  useEffect(() => {
    const speed = tren.speed || tren.maxSpeed || 1;
    const long = celda.longitud || 1;
    const t = (long / speed) * FACTOR_VEL;
    if (timer) clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        const [x, y] = nextCoords(tren.x, tren.y, tren.dir);
        setTren({ speed, x, y });
      }, t)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [celda, tren]);

  return (
    <g className={styles.tren}>
      <circle cx={CENTRO_CELDA} cy={CENTRO_CELDA} r={5}>
        <title>{celda.idTren}</title>
      </circle>
    </g>
  );
}
