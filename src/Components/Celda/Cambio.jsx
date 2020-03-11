import React from 'react';

import Tramo from './Tramo';

export default function Cambio({ celda }) {
  return (
    <g>
      <Tramo key="punta" dir={celda.punta.dir} />
      {Object.keys(celda.ramas).map(nombre => (
        <Tramo
          key={nombre}
          dir={celda.ramas[nombre].dir}
          estilo={celda.posicion === nombre ? 'tramo-normal' : 'tramo-muerto'}
        />
      ))}
    </g>
  );
}
