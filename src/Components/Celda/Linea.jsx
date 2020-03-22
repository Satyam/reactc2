import React from 'react';

import Tramo from './Tramo';

export default function Linea({ celda }) {
  return (
    <g>
      {celda.puntas.map((dir, index) => (
        <Tramo dir={dir} key={index} />
      ))}
    </g>
  );
}
