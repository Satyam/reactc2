import React from 'react';

import Tramo from './Tramo';

export default function Cruce({ celda }) {
  return (
    <g>
      {celda.linea1.puntas.map(dir => (
        <Tramo dir={dir} />
      ))}
      {celda.linea2.puntas.map(dir => (
        <Tramo dir={dir} />
      ))}
    </g>
  );
}
