import React from 'react';

import Tramo from './Tramo';

export default function Linea({ celda }) {
  return (
    <g>
      <Tramo dir={celda.desde.dir} />
      <Tramo dir={celda.hacia.dir} />
    </g>
  );
}
