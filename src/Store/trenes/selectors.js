export const selTrenes = (state, idSector) =>
  Object.values(state.trenes).filter((tren) =>
    idSector ? tren.idSector === idSector : true
  );
export const selTren = (state, idTren) => state.trenes[idTren];
