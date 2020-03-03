import { createReducer } from '@reduxjs/toolkit';
import { senales } from '../data.json';

const senalesReducer = createReducer(senales, {});

export default senalesReducer;