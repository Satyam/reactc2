import { sectorAdapter } from './reducer';

const selectors = sectorAdapter.getSelectors((state) => state.sectores);
export const selSectores = (state) => selectors.selectAll(state);
export const selSector = (state, idSector) =>
  selectors.selectById(state, idSector);
export const selSectoresLoading = (state) => state.sectores.loading;
export const selErroresLoading = (state) => state.sectores.error;
