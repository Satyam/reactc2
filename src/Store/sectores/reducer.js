import { createReducer } from '@reduxjs/toolkit';
import { sectores } from 'Store/data';

export default createReducer(sectores || [], {
  '@@INIT': () =>
    sectores.reduce((ss, s) => {
      const idSector = s.idSector;
      if (ss[idSector])
        throw new Error(`Definición de sector  ${idSector} repetida.`);
      return {
        ...ss,
        [idSector]: s,
      };
    }, {}),
});
