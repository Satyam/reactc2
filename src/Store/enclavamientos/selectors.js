export const selEnclavamientos = (state, idSector) =>
  state.enclavamientos.filter(e => e.idSector === idSector);
