import { createAsyncThunk } from '@reduxjs/toolkit';
import { selSectoresLoading } from './selectors';
export const loadSectores = createAsyncThunk(
  'loadSectores',
  () => import('Store/data/_salida/sectores').then((data) => data.default),
  {
    condition: (_, { getState }) => {
      return selSectoresLoading(getState()) === 'unloaded';
    },
  }
);
