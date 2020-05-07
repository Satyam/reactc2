import React, { useEffect } from 'react';
import { useResize } from 'Utils';

import { useSector, useCeldas } from 'Store';

import Celda from 'Components/Celda';
import loadingIcon from 'Components/Icons/loading.gif';
import { LOADED } from 'Store/constantes';

import styles from './styles.module.css';

function ActualSector({ sector }) {
  const celdas = useCeldas(sector.idSector);
  const size = useResize();
  const { descrCorta, minX, maxX, minY, maxY } = sector;
  const ancho = maxX - minX + 1;
  const alto = maxY - minY + 1;
  const cellWidth = Math.min(Math.ceil((size.width - 50) / ancho), 200);
  const padLeft = (size.width - ancho * cellWidth) / 2;
  const padTop = Math.max(0, -minY * cellWidth) + 60; // 60 to allow for space for menu

  useEffect(() => {
    document.title = `CTC - ${descrCorta}`;
  });
  const attrs = {
    minX,
    maxX,
    minY,
    maxY,
    cellWidth,
    padLeft,
    padTop,
  };
  return (
    <>
      <div className={styles.sector}>
        {celdas.map((c) => (
          <Celda key={c.idCelda} idCelda={c.idCelda} {...attrs} />
        ))}
      </div>
      <div style={{ height: (alto + 2) * cellWidth }}></div>
    </>
  );
}

export default function Sector({ idSector }) {
  const { sector, loading, error, load } = useSector(idSector);

  useEffect(() => {
    if (!error && loading !== LOADED) load();
  }, [error, load, loading]);

  if (error) {
    return <pre>Error cargando 'sector': {JSON.stringify(error, null, 2)}</pre>;
  }
  if (loading !== LOADED) {
    return <img alt="loading..." src={loadingIcon} />;
  }
  return <ActualSector sector={sector} />;
}
