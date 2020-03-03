import React from 'react';
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import Celda from 'Components/Celda';

import { ANCHO_CELDA } from 'Components/common';

export default function Sector({ idSector }) {
  const sector = useSelector(state => state.sectores[idSector]);

  if (!sector) return <img alt="loading..." src="/icons/loading.gif" />;

  const { ancho, alto, celdas, descrCorta } = sector;
  return (
    <div>
      <Helmet>
        <title>
          {descrCorta}
        </title>
      </Helmet>
      <svg viewBox={`0 0 ${ancho * ANCHO_CELDA} ${alto * ANCHO_CELDA}`}>
        {celdas.map(idCelda => <Celda key={idCelda} idCelda={idCelda} />)}
      </svg>
    </div>
  );
}

Sector.propTypes = {
  idSector: PropTypes.string.isRequired,
};
