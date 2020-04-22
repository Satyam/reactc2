import React from 'react';
import classNames from 'classnames';

import { isPlainClick, buildId, nombreEntity } from 'Utils';
import { CENTRO_CELDA, ANG } from 'Components/common';
import { SEMAFORO } from 'Store/data';
import { useEstado, useSemaforo } from 'Store';
import styles from './styles.module.css';

const aspectos = ['', 'verde', 'amarillo', 'rojo'];

export default function Semaforo({ idSemaforo, placement }) {
  const semaforo = useSemaforo(idSemaforo);
  const { showEstado } = useEstado();
  if (!semaforo) return null;

  const { idSector, x, y, dir, centro, izq, der } = semaforo;

  const onClick = (ev) =>
    isPlainClick(ev) &&
    showEstado({
      tipo: SEMAFORO,
      idCelda: buildId({
        idSector,
        x,
        y,
      }),
      idSemaforo: buildId(semaforo),
      placement,
    });

  /*
  Todos estos calculos son a ojo, lo cual hace bastante irrelevante las
  constances como ANCHO_CELDA y demas porque deberían hacerse proporcional
  y ajustarse segun se quiera
  */
  const r = 5;
  const cy = 38;
  const xTope = 95;
  /* eslint-disable no-mixed-operators */
  const x1 = xTope - 2 * r;
  const x2 = x1 + 2 - 2 * r;
  /* eslint-enable no-mixed-operators */

  return (
    <g
      className={classNames(styles.semaforo, {
        [styles.manual]: !semaforo.soloManual && semaforo.manual,
      })}
      transform={`rotate(${ANG[dir]}, ${CENTRO_CELDA}, ${CENTRO_CELDA})`}
      onClick={onClick}
    >
      <title>{nombreEntity(semaforo)}</title>
      <line x1={xTope} y1={cy} x2={x2 + r} y2={cy} />
      <line x1={xTope} y1={cy - r} x2={xTope} y2={cy + r} />
      <circle
        className={styles[aspectos[centro]]}
        cx={izq || der ? x2 : x1}
        cy={cy}
        r={r}
      />
      {izq && (
        <circle className={styles[aspectos[izq]]} cx={x1} cy={cy + r} r={r} />
      )}
      {der && (
        <circle className={styles[aspectos[der]]} cx={x1} cy={cy - r} r={r} />
      )}
    </g>
  );
}
