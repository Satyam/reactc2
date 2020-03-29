import { createReducer } from '@reduxjs/toolkit';

import { doSetAlarma } from 'Store/actions';

export default createReducer(
  {},
  {
    [doSetAlarma]: (_, action) => action.payload,
  }
);
