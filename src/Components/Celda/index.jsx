import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import isPlainClick from 'Utils/isPlainClick';
import sanitize from 'Utils/sanitize';
import { buildIdCelda } from 'Utils/buildKeys';

import { selCelda, selShowCoords, selSenales } from 'Store/selectors';

import Senal from 'Components/Senal';
import { useEstado } from 'Components/Estado';

import { ANCHO_CELDA } from 'Components/common';
import { CAMBIO } from 'Store/data';
import styles from './styles.module.css';

import Linea from './Linea';
import Cambio from './Cambio';
import Triple from './Triple';
import Paragolpe from './Paragolpe';
import Cruce from './Cruce';

export default function Celda({ idCelda, cellsAcross, cellWidth, padLeft }) {
  const celda = useSelector(state => selCelda(state, idCelda));
  const showCoords = useSelector(selShowCoords);
  const senales = useSelector(state =>
    selSenales(state, celda.idSector, celda.x, celda.y)
  );
  const showEstado = useEstado();
  const [timer, setTimer] = useState(false);

  if (!cellWidth || !celda) return null;
  const placement = celda.x > cellsAcross / 2 ? 'left' : 'right';

  const onMouseDown = ev => {
    if (isPlainClick(ev)) {
      if (timer) window.clearTimeout(timer);
      setTimer(
        window.setTimeout(() => {
          setTimer(false);
          showEstado({
            tipo: CAMBIO,
            idCelda: buildIdCelda(celda.idSector, celda.x, celda.y),
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
          tipo: CAMBIO,
          idCelda: buildIdCelda(celda.idSector, celda.x, celda.y),
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

  const label = celda.descr || (showCoords ? `[${celda.x},${celda.y}]` : '');
  const Renderer = {
    linea: Linea,
    cambio: Cambio,
    paragolpe: Paragolpe,
    cruce: Cruce,
    triple: Triple,
  }[celda.tipo];
  return (
    <div
      id={sanitize(idCelda)}
      className={classNames(styles.rect, {
        [styles.manual]: celda.manual,
      })}
      style={{
        left: padLeft + celda.x * cellWidth,
        top: celda.y * cellWidth,
        width: cellWidth,
        height: cellWidth,
      }}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <svg
        viewBox={`0 0 ${ANCHO_CELDA} ${ANCHO_CELDA}`}
        width={cellWidth}
        height={cellWidth}
        className={styles.svg}
      >
        <text x="0" y="95" className={styles.text}>
          {label}
        </text>
        <Renderer celda={celda} />
        {senales
          ? senales.map(senal => (
              <Senal senal={senal} key={senal.dir} placement={placement} />
            ))
          : null}
      </svg>
    </div>
  );
}

Celda.propTypes = {
  idCelda: PropTypes.string,
};
