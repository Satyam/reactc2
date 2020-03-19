export const buildIdCelda = (idSector, x, y) => `${idSector}:${x},${y}`;
export const buildIdSenal = (idSector, x, y, dir) =>
  `${buildIdCelda(idSector, x, y)}:${dir}`;
