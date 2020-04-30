import { createReducer } from '@reduxjs/toolkit';
import { UNLOADED, LOADED, LOADING } from 'Store/data';

import sectorAdapter from './adapter';
import { loadSector, loadSectores } from './actions';

export default createReducer(
  sectorAdapter.getInitialState({
    loadStatusSectores: UNLOADED,
    loadStatusSector: UNLOADED,
  }),
  {
    [loadSectores.pending]: (state) => {
      if (state.loadStatusSectores === UNLOADED) {
        state.loadStatusSectores = LOADING;
        state.error = null;
      }
    },
    [loadSectores.fulfilled]: (state, action) => {
      if (state.loadStatusSectores === LOADING) {
        // Or, call them as "mutating" helpers in a case reducer
        sectorAdapter.setAll(state, action.payload);
        state.loadStatusSectores = LOADED;
      }
    },
    [loadSectores.rejected]: (state, action) => {
      state.loadStatusSectores = UNLOADED;
      state.errorSectores = action.error;
    },
    [loadSector.pending]: (state, action) => {
      console.log('loadSector.pending', action);
      if (state.loadStatusSector === UNLOADED) {
        state.loadStatusSector = LOADING;
        state.error = null;
      }
    },
    [loadSector.fulfilled]: (state, action) => {
      console.log('loadSector.fulfilled', action);
      if (state.loadStatusSector === LOADING) {
        state.loadStatusSector = LOADED;
      }
    },
    [loadSector.rejected]: (state, action) => {
      console.log('loadSector.rejected', action);
      state.loadStatusSectores = UNLOADED;
      state.errorSector = action.error;
    },
  }
);
