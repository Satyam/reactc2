import React from 'react';

import Tramo from './Tramo';

export default function Linea({ celda }) {
  return (
    <g>
      <Tramo dir={celda.desde} />
      <Tramo dir={celda.hacia} />
    </g>
  );
}
