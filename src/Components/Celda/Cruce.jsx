import React from 'react';

import Tramo from './Tramo';

export default function Cruce({ celda }) {
  return (
    <g>
      {celda.linea1.puntas.map((dir, index) => (
        <Tramo dir={dir} key={`l1${index}`} />
      ))}
      {celda.linea2.puntas.map((dir, index) => (
        <Tramo dir={dir} key={`l1${index}`} />
      ))}
    </g>
  );
}
