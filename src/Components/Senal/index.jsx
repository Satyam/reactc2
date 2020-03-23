import React, { useState } from 'react';
import classNames from 'classnames';
import { useEstado } from 'Components/Estado';

import isPlainClick from 'Utils/isPlainClick';
import { buildIdCelda, buildIdSenal } from 'Utils/buildKeys';
import { CENTRO_CELDA, ANG } from 'Components/common';
import { SENAL } from 'Store/data';

import styles from './styles.module.css';

export default function Senal({ senal, placement }) {
  const showEstado = useEstado();
  const [timer, setTimer] = useState(false);

  if (!senal) return null;

  const onMouseDown = ev => {
    if (isPlainClick(ev)) {
      if (timer) window.clearTimeout(timer);
      setTimer(
        window.setTimeout(() => {
          setTimer(false);
          showEstado({
            tipo: SENAL,
            idCelda: buildIdCelda(senal.idSector, senal.x, senal.y),
            idSenal: buildIdSenal(senal.idSector, senal.x, senal.y, senal.dir),
            placement,
            showJson: true,
          });
        }, 300)
      );
    }
  };
  const onMouseUp = ev => {
    if (isPlainClick(ev)) {
      if (timer) {
        window.clearTimeout(timer);
        showEstado({
          tipo: SENAL,
          idCelda: buildIdCelda(senal.idSector, senal.x, senal.y),
          idSenal: buildIdSenal(senal.idSector, senal.x, senal.y, senal.dir),
          placement,
          showJson: false,
        });
      }
    }
  };

  const onClick = ev => {
    if (isPlainClick(ev)) {
      setTimer(false);
    }
  };

  const { dir, centro, izq, der } = senal;
  /*
  Todos estos calculos son a ojo, lo cual hace bastante irrelevante las
  constances como ANCHO_CELDA y demas porque deberían hacerse proporcional
  y ajustarse segun se quiera
  */
  const r = 5;
  const y = 38;
  const xTope = 95;
  /* eslint-disable no-mixed-operators */
  const x1 = xTope - 2 * r;
  const x2 = x1 + 2 - 2 * r;
  /* eslint-enable no-mixed-operators */

  return (
    <g
      className={classNames(styles.senal, {
        [styles.manual]: !senal.soloManual && senal.manual,
      })}
      transform={`rotate(${ANG[dir]}, ${CENTRO_CELDA}, ${CENTRO_CELDA})`}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <line x1={xTope} y1={y} x2={x2 + r} y2={y} />
      <line x1={xTope} y1={y - r} x2={xTope} y2={y + r} />
      <circle
        className={styles[centro]}
        cx={izq || der ? x2 : x1}
        cy={y}
        r={r}
      />
      {izq && <circle className={styles[izq]} cx={x1} cy={y + r} r={r} />}
      {der && <circle className={styles[der]} cx={x1} cy={y - r} r={r} />}
    </g>
  );
}
