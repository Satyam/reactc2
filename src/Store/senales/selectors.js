export const selSenal = (state, idSenal) => state.senales[idSenal];
export const selSenalIsManual = (state, idSenal) =>
  state.senales[idSenal].manual;

export const selSenales = (state, idSector, x, y) =>
  Object.values(state.senales).filter(
    senal => senal.idSector === idSector && senal.x === x && senal.y === y
  );
