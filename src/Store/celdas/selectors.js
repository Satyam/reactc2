export const selCelda = (state, idCelda) => state.celdas[idCelda];
export const selCeldaIsManual = (state, idCelda) =>
  !!state.celdas[idCelda].manual;
