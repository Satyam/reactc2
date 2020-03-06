import React from 'react';

import Tramo from './Tramo';

export default function Cruce({ celda }) {
  return (
    <g>
      <Tramo dir={celda.l1.desde.dir} />
      <Tramo dir={celda.l1.hacia.dir} />
      <Tramo dir={celda.l2.desde.dir} />
      <Tramo dir={celda.l2.hacia.dir} />
    </g>
  );
}
