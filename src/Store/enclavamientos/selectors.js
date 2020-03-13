export const selEnclavamientos = state => {
  const { _pendientes, ...enclavamientos } = state.enclavamientos;
  return enclavamientos;
};
// export const selEnclavamiento = (state, id) => state.enclavamientos[id];
export const selPendiente = (state, id) =>
  state.enclavamientos._pendientes.includes[id];
