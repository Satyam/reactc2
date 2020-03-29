import React from 'react';
import { useParams } from 'react-router-dom';
import Sector from 'Components/Sector';
import Estado from 'Components/Estado';
import Alarma from 'Components/Alarma';

export default function Mimico() {
  const { idSector } = useParams();
  return (
    <>
      <Estado />
      <Sector idSector={idSector} />
      <Alarma />
    </>
  );
}
