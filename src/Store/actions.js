import { createAction } from '@reduxjs/toolkit';

export const loadData = createAction('loadCeldas');

export * from './celdas/actions';
export * from './enclavamientos/actions';
export * from './options/actions';
export * from './pendientes/actions';
export * from './sectores/actions';
export * from './senales/actions';
