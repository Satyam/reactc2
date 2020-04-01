import React from 'react';
import { useCelda, useBloqueOcupado } from 'Store';
import Tramo from './Tramo';

export default function Linea({ idCelda }) {
  const celda = useCelda(idCelda);
  const ocupado = useBloqueOcupado(celda.idBloque) || celda.idTren;
  return (
    <g>
      {celda.puntas.map((dir, index) => (
        <Tramo
          dir={dir}
          key={index}
          estilo={ocupado ? 'tramo-ocupado' : 'tramo-normal'}
        />
      ))}
    </g>
  );
}

Linea.whyDidYouRender = false;
