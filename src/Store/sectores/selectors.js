export const selSectores = state => Object.values(state.sectores);
export const selSector = (state, idSector) => state.sectores[idSector];
