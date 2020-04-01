import React from 'react';
import { useCelda, useBloqueOcupado } from 'Store';
import Tramo from './Tramo';

export default function Cruce({ idCelda }) {
  const celda = useCelda(idCelda);
  const ocupado = useBloqueOcupado(celda.idBloque) || celda.idTren;
  return (
    <g>
      {celda.linea1.puntas.map((dir, index) => (
        <Tramo
          dir={dir}
          key={`l1${index}`}
          estilo={ocupado ? 'tramo-ocupado' : 'tramo-normal'}
        />
      ))}
      {celda.linea2.puntas.map((dir, index) => (
        <Tramo
          dir={dir}
          key={`l1${index}`}
          estilo={ocupado ? 'tramo-ocupado' : 'tramo-normal'}
        />
      ))}
    </g>
  );
}
