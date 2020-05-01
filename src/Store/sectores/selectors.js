import sectorAdapter from './adapter';
import { UNLOADED } from 'Store/data';
const selectors = sectorAdapter.getSelectors((state) => state.sectores);

export const selSector = selectors.selectById;
export const selSectorLoading = (state, idSector) =>
  state.sectores.loadStatusEachSector[idSector] || UNLOADED;
export const selErrorSector = (state) => state.sectores.errorSector;

export const selSectores = selectors.selectAll;
export const selSectoresLoading = (state) => state.sectores.loadStatusSectores;
export const selErrorSectores = (state) => state.sectores.errorSectores;
