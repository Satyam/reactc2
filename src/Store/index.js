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
