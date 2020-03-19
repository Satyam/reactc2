import React from 'react';
import { useParams } from 'react-router-dom';
import Sector from 'Components/Sector';

export default function Mimico() {
  const { idSector } = useParams();
  return <Sector idSector={idSector} />;
}
