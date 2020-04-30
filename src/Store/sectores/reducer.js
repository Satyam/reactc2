import { createReducer, createEntityAdapter } from '@reduxjs/toolkit';
import { loadSectores } from './actions';
import { UNLOADED, LOADED, LOADING } from 'Store/data';

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
    loading: UNLOADED,
  }),
  {
    [loadSectores.pending]: (state, action) => {
      if (state.loading === UNLOADED) {
        state.loading = LOADING;
        state.error = null;
      }
    },
    [loadSectores.fulfilled]: (state, action) => {
      if (state.loading === LOADING) {
        // Or, call them as "mutating" helpers in a case reducer
        sectorAdapter.setAll(state, action.payload);
        state.loading = LOADED;
      }
    },
    [loadSectores.rejected]: (state, action) => {
      state.loading = UNLOADED;
      state.error = action.error;
    },
  }
);
