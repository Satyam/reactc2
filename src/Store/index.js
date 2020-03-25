import { configureStore } from '@reduxjs/toolkit';

import celdas from './celdas/reducer';
import enclavamientos from './enclavamientos/reducer';
import options from './options/reducer';
import pendientes from './pendientes/reducer';
import sectores from './sectores/reducer';
import senales from './senales/reducer';

export default configureStore({
  reducer: {
    celdas,
    enclavamientos,
    options,
    pendientes,
    sectores,
    senales,
  },
});

export * from './celdas/hooks';
export * from './enclavamientos/hooks';
export * from './options/hooks';
export * from './sectores/hooks';
export * from './senales/hooks';
