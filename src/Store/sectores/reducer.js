import { createReducer } from '@reduxjs/toolkit';
import { sectores } from '../data.json';

export default createReducer(sectores || [], {});
