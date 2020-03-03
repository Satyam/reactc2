import { configureStore } from '@reduxjs/toolkit';

import sectoresReducer from './reducers/sectores';
import celdasReducer from './reducers/celdas';
import senalesReducer from './reducers/senales';
import enclavamientosReducer from './reducers/enclavamientos';
import estadoReducer from './reducers/estado';


export default configureStore({
  reducer: {
    sectores: sectoresReducer,
    celdas: celdasReducer,
    senales: senalesReducer,
    enclavamientos: enclavamientosReducer,
    estado: estadoReducer,
  },
});
