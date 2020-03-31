import React from 'react';
import { useCelda } from 'Store';
import Tramo from './Tramo';
import { CENTRO_CELDA, ANCHO_CELDA } from 'Components/common';

export default function Paragolpe({ idCelda }) {
  const celda = useCelda(idCelda);
  return (
    <g>
      <Tramo
        dir={celda.punta}
        estilo={celda.idTren ? 'tramo-ocupado' : 'tramo-normal'}
      />
      <circle
        cx={CENTRO_CELDA}
        cy={CENTRO_CELDA}
        r={ANCHO_CELDA / 10}
        fill={celda.idTren ? 'yellow' : 'black'}
      />
    </g>
  );
}
