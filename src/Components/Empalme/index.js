import React from 'react';
import { buildId } from 'Utils';
import { useEmpalme } from 'Store';

export default function Empalme({ celda, dir }) {
  const idPunta = buildId({
    ...celda,
    dir,
  });
  const empalme = useEmpalme(idPunta);

  return empalme ? (
    <text x="0" y="95">
      {idPunta}
    </text>
  ) : null;
}
