import React from 'react';
import { buildId, nombreEntity } from 'Utils';
import { useEmpalme, useCelda } from 'Store';
import { CENTRO_CELDA } from 'Components/common';

import styles from './styles.module.css';

function ActualEmpalme({ celda, empalme }) {
  const otraCelda = useCelda(
    buildId({
      idSector: celda.idSector,
      x: empalme.x,
      y: empalme.y,
    })
  );
  return (
    <g>
      <path
        d="M 33,-10 L 51,0 33,10 z"
        transform={`translate(${CENTRO_CELDA},${CENTRO_CELDA})`}
        className={styles.flecha}
      >
        {' '}
        <title>{`Continúa en: ${nombreEntity({
          ...otraCelda,
          dir: empalme.dir,
        })}`}</title>
      </path>
    </g>
  );
}
export default function Empalme({ celda, dir }) {
  const idPunta = buildId({
    ...celda,
    dir,
  });
  const empalme = useEmpalme(idPunta);
  return empalme ? <ActualEmpalme celda={celda} empalme={empalme} /> : null;
}
