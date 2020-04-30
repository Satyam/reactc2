import { createAsyncThunk } from '@reduxjs/toolkit';
import { selSectoresLoading, selSectorLoading } from './selectors';
import { UNLOADED } from 'Store/data';
export const loadSectores = createAsyncThunk(
  'loadSectores',
  () =>
    import(
      /* webpackChunkName: "sectores" */ 'Store/data/_salida/_sectores'
    ).then((data) => data.default),
  {
    condition: (_, { getState }) => {
      return selSectoresLoading(getState()) === UNLOADED;
    },
  }
);

export const loadSector = createAsyncThunk(
  'loadSector',
  (idSector) =>
    import(
      /* webpackChunkName: "[request]" */ `Store/data/_salida/${idSector}`
    ),
  {
    condition: (_, { getState }) => {
      return selSectorLoading(getState()) === UNLOADED;
    },
  }
);
