
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import splitCoords from 'Utils/splitCoords';
import isPlainClick from 'Utils/isPlainClick';

import Senal from 'Components/Senal';
import { clickCelda } from 'Store/actions';

import { ANCHO_CELDA } from 'Components/common';
import styles from './styles.module.css';

import Linea from './Linea';
import Cambio from './Cambio';
import Triple from './Triple';
import Paragolpe from './Paragolpe';
import Cruce from './Cruce';

export default function Celda({ idCelda }) {
  const celda = useSelector(state => state.celdas[idCelda]);
  const estado = useSelector(state => state.estado);

  const dispatch = useDispatch();

  if (!celda) return null;
  const onClick = tipo => ev => isPlainClick(ev) && dispatch(clickCelda({ idCelda, tipo }));

  const [x, y] = splitCoords(celda.coords);
  const label = celda.descr || `[${x},${y}]`;
  const Renderer = {
    linea: Linea,
    cambio: Cambio,
    paragolpe: Paragolpe,
    cruce: Cruce,
    triple: Triple,
  }[celda.tipo];
  return (
    <g
      transform={`translate(${x * ANCHO_CELDA}, ${y * ANCHO_CELDA})`}
      onClick={onClick(celda.tipo)}
    >
      <rect
        x="0"
        y="0"
        width={ANCHO_CELDA}
        height={ANCHO_CELDA}
        className={classNames(styles.rect, {
          [styles.manual]: celda.manual,
          [styles.seleccionada]: estado.tipo && idCelda === estado.idCelda,
        })}
      />
      <Renderer celda={celda} />
      <text className={styles.text} x="5" y="95">
        {label}
      </text>
      {celda.senales
        ? celda.senales.map(idSenal => <Senal idSenal={idSenal} key={idSenal} />)
        : null}
    </g>
  );
}

Celda.propTypes = {
  idCelda: PropTypes.string,
};
