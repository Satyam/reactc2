import React from 'react';

import map from 'lodash/map';

import Tramo from './Tramo';

export default function Cambio({ celda }) {
  return (
    <g>
      <Tramo key="punta" dir={celda.punta.dir} />
      {map(celda.ramas, (rama, nombre) => (
        <Tramo
          key={nombre}
          dir={rama.dir}
          estilo={celda.posicion === nombre ? 'tramo-normal' : 'tramo-muerto'}
        />
      ))}
    </g>
  );
}
