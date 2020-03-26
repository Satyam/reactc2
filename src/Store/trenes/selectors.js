export const selTrenes = state => Object.values(state.trenes);
export const selTren = (state, idTren) => state.trenes[idTren];
