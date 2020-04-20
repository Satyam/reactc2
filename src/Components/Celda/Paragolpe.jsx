import React from 'react';
import { useCelda, useBloqueOcupado } from 'Store';
import Tramo from './Tramo';
import { CENTRO_CELDA, ANCHO_CELDA } from 'Components/common';

export default function Paragolpe({ idCelda }) {
  const celda = useCelda(idCelda);
  const ocupado = useBloqueOcupado(celda.idBloque) || celda.idTren;
  return (
    <g>
      <Tramo
        dir={celda.punta}
        estilo={ocupado ? 'tramo-ocupado' : 'tramo-normal'}
      />
      <circle
        cx={CENTRO_CELDA}
        cy={CENTRO_CELDA}
        r={ANCHO_CELDA / 10}
        fill={ocupado ? 'yellow' : 'black'}
      />
      {celda.rebota && (
        <circle
          cx={CENTRO_CELDA}
          cy={CENTRO_CELDA}
          r={ANCHO_CELDA / 15}
          fill={'white'}
        />
      )}
    </g>
  );
}
