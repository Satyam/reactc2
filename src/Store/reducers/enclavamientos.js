import { createReducer } from '@reduxjs/toolkit';
import { enclavamientos } from '../data.json';

const enclavamientosReducer = createReducer(enclavamientos, {});

export default enclavamientosReducer;