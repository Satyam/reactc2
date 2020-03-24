import { createSelector } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { setCambioManual } from './actions';

export const selCelda = (state, idCelda) => state.celdas[idCelda];
export const selCeldaIsManual = (state, idCelda) =>
  !!state.celdas[idCelda].manual;
export const selCeldas = createSelector(
  (state, idSector) =>
    Object.values(state.celdas).filter(celda => celda.idSector === idSector),
  celdas => celdas
);
export const useCelda = idCelda =>
  useSelector(state => selCelda(state, idCelda));

export const useCeldas = idSector =>
  useSelector(state => selCeldas(state, idSector));

export const useCeldaManual = idCelda => {
  const celdaIsManual = useSelector(state => selCeldaIsManual(state, idCelda));
  const dispatch = useDispatch();
  const toggleCeldaManual = useCallback(
    () => dispatch(setCambioManual(idCelda, !celdaIsManual)),
    [idCelda, dispatch, celdaIsManual]
  );
  return [celdaIsManual, toggleCeldaManual];
};
