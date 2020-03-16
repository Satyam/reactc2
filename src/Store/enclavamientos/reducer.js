import { createReducer } from '@reduxjs/toolkit';
import { enclavamientos } from 'Store/data.js';

export default createReducer(enclavamientos || [], {});
