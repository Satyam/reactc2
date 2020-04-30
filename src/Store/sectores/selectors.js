import { sectorAdapter } from './reducer';
const selectors = sectorAdapter.getSelectors((state) => state.sectores);
export const selSectores = (state) => selectors.selectAll(state);
export const selSector = (state, idSector) =>
  selectors.selectById(state, idSector);
export const selSectoresLoading = (state) => state.sectores.loadStatusSectores;
export const selErrorSectores = (state) => state.sectores.errorSectores;
export const selErrorSector = (state) => state.sectores.errorSector;

export const selSectorLoading = (state) => state.sectores.loadStatusSector;
