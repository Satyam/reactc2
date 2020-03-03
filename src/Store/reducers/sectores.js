import { createReducer } from '@reduxjs/toolkit';
import { sectores } from '../data.json';

const sectoresReducer = createReducer(sectores, {});

export default sectoresReducer;