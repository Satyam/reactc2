import { createEntityAdapter } from '@reduxjs/toolkit';
import { CAMBIO, SEMAFORO } from 'Store/constantes';

export default createEntityAdapter({
  selectId: (automatizacion) => automatizacion.idAutom,
  sortComparer: (a, b) => {
    if (a.tipo === CAMBIO && b.tipo === SEMAFORO) return -1;
    if (a.tipo === SEMAFORO && b.tipo === CAMBIO) return 1;
    return 0;
  },
});
