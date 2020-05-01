import { createEntityAdapter } from '@reduxjs/toolkit';

export default createEntityAdapter({
  selectId: (celda) => celda.idCelda,
});
