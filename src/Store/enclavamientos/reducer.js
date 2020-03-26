import { createReducer } from '@reduxjs/toolkit';
import { loadData } from 'Store/actions';
import { enclavamientos } from 'Store/data';
import { buildId } from 'Utils';

export default createReducer(
  {},
  {
    [loadData]: state =>
      enclavamientos.reduce((es, e) => {
        const idEncl = buildId(e);
        return {
          ...es,
          [idEncl]: {
            ...e,
            idEncl,
          },
        };
      }, state),
  }
);
