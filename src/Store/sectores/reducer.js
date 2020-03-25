import { createReducer } from '@reduxjs/toolkit';
import { sectores } from 'Store/data';
import { loadData } from 'Store/actions';

export default createReducer(
  {},
  {
    [loadData]: state =>
      sectores.reduce((ss, s) => {
        const idSector = s.idSector;
        return {
          ...ss,
          [idSector]: s,
        };
      }, state),
  }
);
