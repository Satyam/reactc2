import React from 'react';

import Tramo from './Tramo';

export default function Cruce({ celda }) {
  return (
    <g>
      <Tramo dir={celda.l1.desde} />
      <Tramo dir={celda.l1.hacia} />
      <Tramo dir={celda.l2.desde} />
      <Tramo dir={celda.l2.hacia} />
    </g>
  );
}
