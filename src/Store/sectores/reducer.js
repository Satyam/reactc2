import { createReducer } from '@reduxjs/toolkit';
import { sectores } from 'Store/data.js';

export default createReducer(sectores || [], {});
