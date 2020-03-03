import React from 'react';
import { lineaShape } from 'Components/shapes';

import Tramo from './Tramo';

export default function Linea({ celda }) {
  return (
    <g>
      <Tramo dir={celda.desde.dir} />
      <Tramo dir={celda.hacia.dir} />
    </g>
  );
}

Linea.propTypes = {
  celda: lineaShape,
};
