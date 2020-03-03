import { createReducer } from '@reduxjs/toolkit';
import { celdas } from '../data.json';

const celdasReducer = createReducer(celdas, {});

export default celdasReducer;