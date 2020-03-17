import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { useEstado } from 'Components/Estado';

import isPlainClick from 'Utils/isPlainClick';
import { CENTRO_CELDA, ANG } from 'Components/common';
import { SENAL } from 'Store/data';

import { selSenal } from 'Store/selectors';
import styles from './styles.module.css';

export default function Senal({ idSenal, idCelda, placement }) {
  const senal = useSelector(state => selSenal(state, idSenal));
  const showEstado = useEstado();

  if (!senal) return null;

  const onClick = ev =>
    isPlainClick(ev) &&
    showEstado({
      tipo: SENAL,
      idCelda,
      idSenal,
      placement,
    });

  const { dir, primaria, izq, der } = senal;
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
        [styles.manual]: senal.manual,
      })}
      transform={`rotate(${ANG[dir]}, ${CENTRO_CELDA}, ${CENTRO_CELDA})`}
      onClick={onClick}
    >
      <line x1={xTope} y1={y} x2={x2 + r} y2={y} />
      <line x1={xTope} y1={y - r} x2={xTope} y2={y + r} />
      <circle
        className={classNames(styles.primaria, styles[primaria.estado])}
        cx={izq || der ? x2 : x1}
        cy={y}
        r={r}
      />
      {izq && (
        <circle
          className={classNames(styles.izq, styles[izq.estado])}
          cx={x1}
          cy={y + r}
          r={r}
        />
      )}
      {der && (
        <circle
          className={classNames(styles.der, styles[der.estado])}
          cx={x1}
          cy={y - r}
          r={r}
        />
      )}
    </g>
  );
}
