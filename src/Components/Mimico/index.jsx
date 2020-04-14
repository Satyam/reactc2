import React from 'react';
import { useParams } from 'react-router-dom';
import Sector from 'Components/Sector';
import Estado from 'Components/Estado';
import Alarma from 'Components/Alarma';
import { useCurrentSector } from 'Store';

export default function Mimico() {
  const { idSector } = useParams();
  const [currentIdSector, setCurrentIdSector] = useCurrentSector();

  if (idSector !== currentIdSector) {
    setCurrentIdSector(idSector);
    return null;
  }
  return (
    <>
      <Estado />
      <Sector idSector={idSector} />
      <Alarma />
    </>
  );
}
