import { createEntityAdapter } from '@reduxjs/toolkit';

export default createEntityAdapter({
  selectId: (bloque) => bloque.idBloque,
});
