import React from 'react';

import Tramo from './Tramo';

export default function Cambio({ celda }) {
  return (
    <g>
      <Tramo key="punta" dir={celda.punta} />
      {Object.keys(celda.ramas).map(nombre => (
        <Tramo
          key={nombre}
          dir={celda.ramas[nombre]}
          estilo={
            celda.idTren
              ? 'tramo-ocupado'
              : celda.posicion === nombre
              ? 'tramo-normal'
              : 'tramo-muerto'
          }
        />
      ))}
    </g>
  );
}
