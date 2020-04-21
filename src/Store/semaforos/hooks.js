import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selSemaforo, selSemaforos, selSemaforoIsManual } from './selectors';
import { setSenalEstado, setSemaforoManual } from './actions';

export const useSemaforo = (idSemaforo) =>
  useSelector((state) => selSemaforo(state, idSemaforo));

export const useSemaforos = (celda) =>
  useSelector((state) => selSemaforos(state, celda));

export const useSetSenal = () => {
  const dispatch = useDispatch();
  return (idSemaforo, senal, estado) =>
    dispatch(setSenalEstado(idSemaforo, senal, estado));
};

export const useSemaforoManual = (idCelda) => {
  const semaforoIsManual = useSelector((state) =>
    selSemaforoIsManual(state, idCelda)
  );
  const dispatch = useDispatch();
  const toggleSemaforoManual = useCallback(
    () => dispatch(setSemaforoManual(idCelda, !semaforoIsManual)),
    [idCelda, dispatch, semaforoIsManual]
  );
  return [semaforoIsManual, toggleSemaforoManual];
};
