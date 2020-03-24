import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { isPlainClick } from 'Utils';

import { selCelda, selShowCoords, selSenales } from 'Store/selectors';
import { showEstado } from 'Store/actions';
import Senal from 'Components/Senal';

import { ANCHO_CELDA } from 'Components/common';
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

  const dispatch = useDispatch();
  if (!cellWidth || !celda) return null;
  const placement = celda.x > cellsAcross / 2 ? 'left' : 'right';

  const onClick = tipo => ev =>
    isPlainClick(ev) &&
    dispatch(
      showEstado({
        tipo,
        idCelda,
        placement,
      })
    );

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
      id={idCelda}
      className={classNames(styles.rect, {
        [styles.manual]: celda.manual,
      })}
      style={{
        left: padLeft + celda.x * cellWidth,
        top: celda.y * cellWidth,
        width: cellWidth,
        height: cellWidth,
      }}
      onClick={onClick(celda.tipo)}
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
