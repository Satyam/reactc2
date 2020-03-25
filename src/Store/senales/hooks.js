import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selSenal, selSenales, selSenalIsManual } from './selectors';
import { setLuzEstado, setSenalManual } from './actions';

export const useSenal = idSenal =>
  useSelector(state => selSenal(state, idSenal));

export const useSenales = celda =>
  useSelector(state => selSenales(state, celda));

export const useSetLuz = idSenal => {
  const dispatch = useDispatch();
  return (luz, estado) => dispatch(setLuzEstado(idSenal, luz, estado));
};

export const useSenalManual = idCelda => {
  const senalIsManual = useSelector(state => selSenalIsManual(state, idCelda));
  const dispatch = useDispatch();
  const toggleSenalManual = useCallback(
    () => dispatch(setSenalManual(idCelda, !senalIsManual)),
    [idCelda, dispatch, senalIsManual]
  );
  return [senalIsManual, toggleSenalManual];
};
