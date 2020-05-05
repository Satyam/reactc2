import { createEntityAdapter } from '@reduxjs/toolkit';

export default createEntityAdapter({
  selectId: (empalme) => empalme.idPunta,
});
