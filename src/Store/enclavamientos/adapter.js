import { createEntityAdapter } from '@reduxjs/toolkit';

export default createEntityAdapter({
  selectId: (enclavamiento) => enclavamiento.idEncl,
});
