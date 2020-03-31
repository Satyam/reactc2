import React from 'react';
import { useCelda } from 'Store';
import Tramo from './Tramo';

export default function Cambio({ idCelda }) {
  const celda = useCelda(idCelda);
  return (
    <g>
      <Tramo
        key="punta"
        dir={celda.punta}
        estilo={celda.idTren ? 'tramo-ocupado' : 'tramo-normal'}
      />
      {Object.keys(celda.ramas).map(nombre => (
        <Tramo
          key={nombre}
          dir={celda.ramas[nombre]}
          estilo={
            celda.posicion === nombre
              ? celda.idTren
                ? 'tramo-ocupado'
                : 'tramo-normal'
              : 'tramo-muerto'
          }
        />
      ))}
    </g>
  );
}
Cambio.whyDidYouRender = false;
