import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selSemaforo, selSemaforos, selModoSemaforo } from './selectors';
import { setAspectoSenal, setModoSemaforo } from './actions';

export const useSemaforo = (idSemaforo) =>
  useSelector((state) => selSemaforo(state, idSemaforo));

export const useSemaforos = (celda) =>
  useSelector((state) => selSemaforos(state, celda));

export const useSetAspectoSenal = () => {
  const dispatch = useDispatch();
  return (idSemaforo, senal, aspecto) =>
    dispatch(setAspectoSenal(idSemaforo, senal, aspecto));
};

export const useModoSemaforo = (idCelda) => {
  const modoSemaforo = useSelector((state) => selModoSemaforo(state, idCelda));
  const dispatch = useDispatch();
  return [
    modoSemaforo,
    useCallback((modo) => dispatch(setModoSemaforo(idCelda, modo)), [
      idCelda,
      dispatch,
    ]),
  ];
};
