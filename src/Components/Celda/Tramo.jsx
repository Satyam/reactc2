
import React from 'react';
import PropTypes from 'prop-types';

import { CENTRO_CELDA, X, Y } from 'Components/common';
import styles from './styles.module.css';

export default function Tramo({
  dir,
  estilo = 'tramo-normal',
}) {
  return (
    <line x1={CENTRO_CELDA} y1={CENTRO_CELDA} x2={X[dir]} y2={Y[dir]} className={styles[estilo]} />
  );
}

Tramo.propTypes = {
  dir: PropTypes.string.isRequired,
  estilo: PropTypes.string,
};
