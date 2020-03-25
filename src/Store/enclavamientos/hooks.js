import { setEnclavamientos } from './actions';
import { selEnclavamiento } from './selectors';
import { useDispatch, useSelector } from 'react-redux';

export const useSetEnclavamientos = (idOrigen, tipo) => {
  const dispatch = useDispatch();
  return force => dispatch(setEnclavamientos(idOrigen, tipo, force));
};

export const useSelEnclavamiento = idOrigen =>
  useSelector(state => selEnclavamiento(state, idOrigen));
