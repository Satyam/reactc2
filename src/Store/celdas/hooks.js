import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { setCambioManual, setPosicion } from './actions';
import { selCelda, selCeldas, selCeldaIsManual } from './selectors';

export const useCelda = (idCelda) =>
  useSelector((state) => selCelda(state, idCelda));

export const useCeldas = (idSector) =>
  useSelector((state) => selCeldas(state, idSector));

export const useCeldaManual = (idCelda) => {
  const celdaIsManual = useSelector((state) =>
    selCeldaIsManual(state, idCelda)
  );
  const dispatch = useDispatch();
  const toggleCeldaManual = useCallback(
    () => dispatch(setCambioManual(idCelda, !celdaIsManual)),
    [idCelda, dispatch, celdaIsManual]
  );
  return [celdaIsManual, toggleCeldaManual];
};

export const useSetPosicion = (idCelda) => {
  const dispatch = useDispatch();
  return (posicion) => dispatch(setPosicion(idCelda, posicion));
};
