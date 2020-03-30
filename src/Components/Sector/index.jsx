import React from 'react';
import { Helmet } from 'react-helmet';
import { useResize } from 'Utils';

import { useSector, useCeldas } from 'Store';

import Celda from 'Components/Celda';
import styles from './styles.module.css';

export default function Sector({ idSector }) {
  const sector = useSector(idSector);
  const celdas = useCeldas(idSector);
  const size = useResize();
  const { ancho, descrCorta } = sector;
  const cellWidth = Math.min(
    Math.floor(size.width / ancho),
    ancho > 8 ? 100 : 200
  );
  const padLeft = (size.width - ancho * cellWidth) / 2;

  return (
    <div>
      <Helmet>
        <title>{descrCorta}</title>
      </Helmet>
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
    </div>
  );
}
