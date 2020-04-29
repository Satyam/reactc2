import { createReducer, createEntityAdapter } from '@reduxjs/toolkit';
import { loadSectores } from './actions';

export const sectorAdapter = createEntityAdapter({
  selectId: (sector) => sector.idSector,
  sortComparer: (sa, sb) => {
    var descrA = sa.descrCorta.toUpperCase();
    var descrB = sb.descrCorta.toUpperCase();
    if (descrA < descrB) return -1;
    if (descrA > descrB) return 1;
    return 0;
  },
});
export default createReducer(
  sectorAdapter.getInitialState({
    loading: 'unloaded',
  }),
  {
    [loadSectores.pending]: (state, action) => {
      if (state.loading === 'unloaded') {
        state.loading = 'pending';
      }
    },
    [loadSectores.fulfilled]: (state, action) => {
      if (state.loading === 'pending') {
        // Or, call them as "mutating" helpers in a case reducer
        sectorAdapter.setAll(state, action.payload);
        state.loading = 'loaded';
      }
    },
  }
);
