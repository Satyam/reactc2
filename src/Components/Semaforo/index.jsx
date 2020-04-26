import React from 'react';
import classNames from 'classnames';

import { buildId, nombreEntity, useLongPress } from 'Utils';
import { CENTRO_CELDA, ANG } from 'Components/common';
import { SEMAFORO, MANIOBRA, BLOQUEADO, AUTOMATICO } from 'Store/data';
import { useEstado, useSemaforo, useModoSemaforo } from 'Store';
import styles from './styles.module.css';

const estilosAspectos = ['', 'verde', 'amarillo', 'rojo'];

export default function Semaforo({ idSemaforo, placement }) {
  const semaforo = useSemaforo(idSemaforo);
  const [modoSemaforo, setModoSemaforo] = useModoSemaforo(idSemaforo);
  const { idSector, x, y, dir, centro, izq, der } = semaforo || {};
  const { showEstado } = useEstado();
  const longPressProps = useLongPress({
    onClick: () => {
      if (semaforo.soloManiobra) {
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
      } else {
        setModoSemaforo(modoSemaforo === AUTOMATICO ? BLOQUEADO : AUTOMATICO);
      }
    },
    onLongPress: (ev) =>
      showEstado({
        tipo: SEMAFORO,
        idCelda: buildId({
          idSector,
          x,
          y,
        }),
        idSemaforo: buildId(semaforo),
        placement,
      }),
  });
  if (!semaforo) return null;

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
        [styles.maniobra]: !semaforo.soloManiobra && modoSemaforo === MANIOBRA,
        [styles.blink]: !semaforo.soloManiobra && modoSemaforo === BLOQUEADO,
      })}
      transform={`rotate(${ANG[dir]}, ${CENTRO_CELDA}, ${CENTRO_CELDA})`}
      {...longPressProps}
    >
      <title>{nombreEntity(semaforo)}</title>
      <line x1={xTope} y1={cy} x2={x2 + r} y2={cy} />
      <line x1={xTope} y1={cy - r} x2={xTope} y2={cy + r} />
      <circle
        className={styles[estilosAspectos[centro]]}
        cx={izq || der ? x2 : x1}
        cy={cy}
        r={r}
      />
      {izq && (
        <circle
          className={styles[estilosAspectos[izq]]}
          cx={x1}
          cy={cy + r}
          r={r}
        />
      )}
      {der && (
        <circle
          className={styles[estilosAspectos[der]]}
          cx={x1}
          cy={cy - r}
          r={r}
        />
      )}
    </g>
  );
}
