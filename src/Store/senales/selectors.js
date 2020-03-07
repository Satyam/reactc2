export const selSenal = (state, idSenal) => state.senales[idSenal];
export const selSenalIsManual = (state, idSenal, luz) =>
  state.senales[idSenal][luz].manual;
