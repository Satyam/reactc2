import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export const selSenal = (state, idSenal) => state.senales[idSenal];
export const selSenalIsManual = (state, idSenal) =>
  state.senales[idSenal].manual;

export const selSenales = createSelector(
  (state, celda) =>
    Object.values(state.senales).filter(
      senal =>
        senal.idSector === celda.idSector &&
        senal.x === celda.x &&
        senal.y === celda.y
    ),
  senales => senales
);

export const useSenal = idSenal =>
  useSelector(state => selSenal(state, idSenal));

export const useSenales = celda =>
  useSelector(state => selSenales(state, celda));
