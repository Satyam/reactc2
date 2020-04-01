import { configureStore } from '@reduxjs/toolkit';

import alertas from './alertas/reducer';
import bloques from './bloques/reducer';
import celdas from './celdas/reducer';
import enclavamientos from './enclavamientos/reducer';
import options from './options/reducer';
import pendientes from './pendientes/reducer';
import sectores from './sectores/reducer';
import senales from './senales/reducer';
import trenes from './trenes/reducer';

export default configureStore({
  reducer: {
    alertas,
    bloques,
    celdas,
    enclavamientos,
    options,
    pendientes,
    sectores,
    senales,
    trenes,
  },
});

export * from './alertas/hooks';
export * from './bloques/hooks';
export * from './celdas/hooks';
export * from './enclavamientos/hooks';
export * from './options/hooks';
export * from './sectores/hooks';
export * from './senales/hooks';
export * from './trenes/hooks';
