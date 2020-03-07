export const selEnclavamiento = (state, id) => state.enclavamientos[id];
export const selPendiente = (state, id) =>
  state.enclavamientos._pendientes &&
  state.enclavamientos._pendientes.includes[id];
