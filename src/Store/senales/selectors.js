export const selSenal = (state, idSenal) => state.senales[idSenal];
export const selSenalIsManual = (state, idSenal) =>
  state.senales[idSenal].manual;
