import React from 'react';

import Sector from 'Components/Sector';
import { EstadoProvider } from 'Components/Estado';

export default function Mimico({ idSector }) {
  return (
    <EstadoProvider>
      <Sector idSector={idSector} />
    </EstadoProvider>
  );
}
