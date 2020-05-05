import { configureStore } from '@reduxjs/toolkit';

import alertas from './alertas/reducer';
import bloques from './bloques/reducer';
import celdas from './celdas/reducer';
import automatizaciones from './automatizaciones/reducer';
import empalmes from './empalmes/reducer';
import enclavamientos from './enclavamientos/reducer';
import options from './options/reducer';
import pendientes from './pendientes/reducer';
import sectores from './sectores/reducer';
import semaforos from './semaforos/reducer';
import trenes from './trenes/reducer';

export default configureStore({
  reducer: {
    alertas,
    bloques,
    celdas,
    automatizaciones,
    empalmes,
    enclavamientos,
    options,
    pendientes,
    sectores,
    semaforos,
    trenes,
  },
});

export * from './alertas/hooks';
export * from './bloques/hooks';
export * from './celdas/hooks';
export * from './enclavamientos/hooks';
export * from './automatizaciones/hooks';
export * from './options/hooks';
export * from './sectores/hooks';
export * from './semaforos/hooks';
export * from './trenes/hooks';
