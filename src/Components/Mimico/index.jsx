import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sector from 'Components/Sector';
import Estado from 'Components/Estado';
import Alarma from 'Components/Alarma';
import { useCurrentSector } from 'Store';

export default function Mimico() {
  const { idSector } = useParams();
  const [currentIdSector, setCurrentIdSector] = useCurrentSector();

  useEffect(() => {
    if (idSector !== currentIdSector) {
      setCurrentIdSector(idSector);
    }
  }, [idSector, currentIdSector, setCurrentIdSector]);

  return currentIdSector ? (
    <>
      <Estado />
      <Sector idSector={currentIdSector} />
      <Alarma />
    </>
  ) : null;
}
