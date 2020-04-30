import sectorAdapter from './adapter';

const selectors = sectorAdapter.getSelectors((state) => state.sectores);

export const selSector = selectors.selectById;
export const selSectorLoading = (state) => state.sectores.loadStatusSector;
export const selErrorSector = (state) => state.sectores.errorSector;

export const selSectores = selectors.selectAll;
export const selSectoresLoading = (state) => state.sectores.loadStatusSectores;
export const selErrorSectores = (state) => state.sectores.errorSectores;
