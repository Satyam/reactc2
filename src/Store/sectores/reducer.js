import { createReducer } from '@reduxjs/toolkit';
import { UNLOADED, LOADED, LOADING } from 'Store/data';

import sectorAdapter from './adapter';
import { loadSector, loadSectores } from './actions';

export default createReducer(
  sectorAdapter.getInitialState({
    loadStatusSectores: UNLOADED,
    loadStatusEachSector: {},
  }),
  {
    [loadSectores.pending]: (state) => {
      if (state.loadStatusSectores === UNLOADED) {
        state.loadStatusSectores = LOADING;
        state.errorSectores = null;
      }
    },
    [loadSectores.fulfilled]: (state, action) => {
      if (state.loadStatusSectores === LOADING) {
        sectorAdapter.setAll(state, action.payload);
        state.loadStatusSectores = LOADED;
      }
    },
    [loadSectores.rejected]: (state, action) => {
      state.loadStatusSectores = UNLOADED;
      state.errorSectores = action.error;
    },
    [loadSector.pending]: (state, action) => {
      const idSector = action.meta.arg;
      const loadStatus = state.loadStatusEachSector[idSector];
      if (!loadStatus || loadStatus === UNLOADED) {
        state.loadStatusEachSector[idSector] = LOADING;
        state.errorSector = null;
      }
    },
    [loadSector.fulfilled]: (state, action) => {
      const idSector = action.meta.arg;
      if (state.loadStatusEachSector[idSector] === LOADING) {
        state.loadStatusEachSector[idSector] = LOADED;
      }
    },
    [loadSector.rejected]: (state, action) => {
      state.loadStatusEachSector[action.meta.arg] = UNLOADED;
      state.errorSector = action.error;
    },
  }
);
