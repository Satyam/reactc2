import React from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import ReactResizeDetector from 'react-resize-detector';

import { selSector } from 'Store/selectors';

import Celda from 'Components/Celda';
import styles from './styles.module.css';

export default function Sector({ idSector }) {
  const sector = useSelector(state => selSector(state, idSector));

  if (!sector) return <img alt="loading..." src="/icons/loading.gif" />;

  const { ancho, celdas, descrCorta } = sector;
  return (
    <div>
      <Helmet>
        <title>{descrCorta}</title>
      </Helmet>
      <ReactResizeDetector handleWidth>
        {({ width }) => {
          const cellWidth = Math.min(
            Math.floor(width / ancho),
            ancho > 8 ? 100 : 200
          );
          const padLeft = (width - ancho * cellWidth) / 2;
          return (
            <div className={styles.sector}>
              {celdas.map(idCelda => (
                <Celda
                  key={idCelda}
                  idCelda={idCelda}
                  cellsAcross={ancho}
                  cellWidth={cellWidth}
                  padLeft={padLeft}
                />
              ))}
            </div>
          );
        }}
      </ReactResizeDetector>
    </div>
  );
}
