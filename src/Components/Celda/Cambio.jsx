import React from 'react';
import { useCelda, useBloqueOcupado } from 'Store';
import Tramo from './Tramo';

export default function Cambio({ idCelda }) {
  const celda = useCelda(idCelda);
  const ocupado = useBloqueOcupado(celda.idBloque) || celda.idTren;
  return (
    <g>
      <Tramo
        key="punta"
        dir={celda.punta}
        estilo={ocupado ? 'tramo-ocupado' : 'tramo-normal'}
      />
      {celda.ramas.map((dir, idx) => (
        <Tramo
          key={dir}
          dir={dir}
          estilo={
            celda.posicion === idx
              ? ocupado
                ? 'tramo-ocupado'
                : 'tramo-normal'
              : 'tramo-muerto'
          }
        />
      ))}
    </g>
  );
}
Cambio.whyDidYouRender = false;
