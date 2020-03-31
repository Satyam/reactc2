import React from 'react';
import { useCelda } from 'Store';
import Tramo from './Tramo';

export default function Linea({ idCelda }) {
  const celda = useCelda(idCelda);
  return (
    <g>
      {celda.puntas.map((dir, index) => (
        <Tramo
          dir={dir}
          key={index}
          estilo={celda.idTren ? 'tramo-ocupado' : 'tramo-normal'}
        />
      ))}
    </g>
  );
}

Linea.whyDidYouRender = false;
