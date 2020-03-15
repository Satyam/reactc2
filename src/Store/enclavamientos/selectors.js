export const selEnclavamientos = (state, idSector) => {
  const { _pendientes, ...enclavamientos } = state.enclavamientos;
  return Object.keys(enclavamientos).reduce((sel, key) => {
    const e = enclavamientos[key];
    return e.idSector === idSector
      ? {
          ...sel,
          [key]: e,
        }
      : sel;
  }, {});
};
// export const selEnclavamiento = (state, id) => state.enclavamientos[id];
export const selPendiente = (state, id) =>
  state.enclavamientos._pendientes.includes(id);
