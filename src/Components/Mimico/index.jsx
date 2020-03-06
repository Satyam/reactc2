import React from 'react';
import { useParams } from 'react-router-dom';
import Sector from 'Components/Sector';
import { EstadoProvider } from 'Components/Estado';

export default function Mimico() {
  const { idSector } = useParams();
  return (
    <EstadoProvider>
      <Sector idSector={idSector} />
    </EstadoProvider>
  );
}
