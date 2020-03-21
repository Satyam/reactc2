import React from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import ReactResizeDetector from 'react-resize-detector';

import { selSector, selCeldas } from 'Store/selectors';

import Celda from 'Components/Celda';
import loading from 'Components/Icons/loading.gif';
import styles from './styles.module.css';

export default function Sector({ idSector }) {
  const sector = useSelector(state => selSector(state, idSector));
  const celdas = useSelector(state => selCeldas(state, idSector));

  if (!sector) return <img alt="loading..." src={loading} />;

  const { ancho, descrCorta } = sector;
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
              {celdas.map(c => (
                <Celda
                  key={c.idCelda}
                  idCelda={c.idCelda}
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
