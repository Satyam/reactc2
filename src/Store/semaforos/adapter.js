import { createEntityAdapter } from '@reduxjs/toolkit';

export default createEntityAdapter({
  selectId: (semaforo) => semaforo.idSemaforo,
});
