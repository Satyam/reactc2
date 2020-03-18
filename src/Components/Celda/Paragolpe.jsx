import React from 'react';

import Tramo from './Tramo';
import { CENTRO_CELDA, ANCHO_CELDA } from 'Components/common';

export default function Paragolpe({ celda }) {
  return (
    <g>
      <Tramo dir={celda.desde} />
      <circle cx={CENTRO_CELDA} cy={CENTRO_CELDA} r={ANCHO_CELDA / 10} />
    </g>
  );
}
