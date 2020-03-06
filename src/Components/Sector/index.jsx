import React from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import ReactResizeDetector from 'react-resize-detector';

import Celda from 'Components/Celda';
import styles from './styles.module.css';

export default function Sector({ idSector }) {
  const sector = useSelector(state => state.sectores[idSector]);

  if (!sector) return <img alt="loading..." src="/icons/loading.gif" />;

  const { ancho, celdas, descrCorta } = sector;
  return (
    <div>
      <Helmet>
        <title>{descrCorta}</title>
      </Helmet>
      <ReactResizeDetector handleWidth>
        {({ width }) => (
          <div className={styles.sector}>
            {celdas.map(idCelda => (
              <Celda
                key={idCelda}
                idCelda={idCelda}
                cellsAcross={ancho}
                cellWidth={Math.floor(width / ancho)}
              />
            ))}
          </div>
        )}
      </ReactResizeDetector>
    </div>
  );
}
