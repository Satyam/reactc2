import { createReducer } from '@reduxjs/toolkit';
import { sectores } from 'Store/data';
import { loadData } from 'Store/actions';

export default createReducer(
  {},
  {
    [loadData]: state =>
      sectores.reduce((ss, s) => {
        const idSector = s.idSector;
        if (ss[idSector])
          throw new Error(`Definición de sector  ${idSector} repetida.`);
        return {
          ...ss,
          [idSector]: s,
        };
      }, state),
  }
);
